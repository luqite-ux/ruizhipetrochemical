import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { SESSION_COOKIE } from '@/lib/admin-session'

async function handleLogout(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (token && supabaseUrl && serviceKey) {
    try {
      const supabase = createClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
      await supabase.from('admin_user_sessions').delete().eq('token', token)
    } catch {
      // Ignore cleanup errors on logout
    }
  }

  const res = NextResponse.redirect(new URL('/admin/login', req.url), 303)
  res.cookies.delete(SESSION_COOKIE)
  res.cookies.delete('hq_tenant_id')
  return res
}

export async function GET(req: NextRequest) {
  return handleLogout(req)
}

export async function POST(req: NextRequest) {
  return handleLogout(req)
}
