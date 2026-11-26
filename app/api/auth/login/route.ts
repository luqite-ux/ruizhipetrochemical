import { NextResponse, type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'
import { SESSION_COOKIE } from '@/lib/admin-session'

const SESSION_DAYS = 7

function redirectError(req: NextRequest, message: string) {
  const url = new URL('/admin/login', req.url)
  url.searchParams.set('error', message)
  return NextResponse.redirect(url, 303)
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || ''
    let email = ''
    let password = ''

    if (contentType.includes('application/json')) {
      const body = await req.json()
      email = String(body.email || '').trim().toLowerCase()
      password = String(body.password || '')
    } else {
      const form = await req.formData()
      email = String(form.get('email') || '').trim().toLowerCase()
      password = String(form.get('password') || '')
    }

    if (!email || !password) {
      return redirectError(req, 'Email and password are required.')
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || '5e874773-b846-4fa2-ba06-56de93fb51c4'

    if (!supabaseUrl || !serviceKey) {
      return redirectError(req, 'Authentication service is not configured.')
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    const { data: user, error: lookupErr } = await supabase
      .from('admin_users')
      .select('id, email, password_hash, role, is_active, tenant_id')
      .eq('email', email)
      .maybeSingle()

    if (lookupErr || !user) {
      return redirectError(req, 'Invalid email or password.')
    }

    if (!user.is_active) {
      return redirectError(req, 'This account has been deactivated.')
    }

    // Ensure customer account belongs to this tenant (or is superadmin)
    if (user.role !== 'superadmin' && user.tenant_id && user.tenant_id !== tenantId) {
      return redirectError(req, 'This account does not have access to this site.')
    }

    const ok = await bcrypt.compare(password, user.password_hash)
    if (!ok) {
      return redirectError(req, 'Invalid email or password.')
    }

    const token = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null
    const ua = req.headers.get('user-agent') || null

    const { error: sessErr } = await supabase.from('admin_user_sessions').insert({
      admin_user_id: user.id,
      token,
      expires_at: expiresAt.toISOString(),
      ip,
      user_agent: ua,
    })

    if (sessErr) {
      return redirectError(req, 'Failed to create login session. Please try again.')
    }

    await supabase
      .from('admin_users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', user.id)

    const res = NextResponse.redirect(new URL('/admin', req.url), 303)
    const isProd = process.env.NODE_ENV === 'production'
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    })
    res.cookies.set('hq_tenant_id', user.tenant_id || tenantId, {
      httpOnly: false,
      secure: isProd,
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    })
    return res
  } catch {
    return redirectError(req, 'Unexpected login error. Please try again.')
  }
}
