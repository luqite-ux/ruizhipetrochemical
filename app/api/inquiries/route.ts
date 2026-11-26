import crypto from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { TENANT_ID } from '@/lib/supabase'

const CAPTCHA_SECRET =
  process.env.INQUIRY_CAPTCHA_SECRET ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'ruizhi-captcha-signing-key-2026'
const consumedMemory = new Set<string>()

function signChallenge(challengeId: string, scope: string, code: string, exp: number) {
  return crypto
    .createHmac('sha256', CAPTCHA_SECRET)
    .update(`${challengeId}|${scope}|${code.toUpperCase()}|${exp}`)
    .digest('hex')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const company = String(body.company || '').trim()
    const phone = String(body.phone || '').trim()
    const product = String(body.product || '').trim()
    const message = String(body.message || '').trim()
    const captchaCode = String(body.captchaCode || '').trim().toUpperCase()
    const captchaScope = String(body.captchaScope || '').trim()
    const challengeToken = String(body.challengeToken || '').trim()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and project requirements are required.' }, { status: 400 })
    }
    if (!captchaCode || !captchaScope || !challengeToken) {
      return NextResponse.json({ error: 'Please enter the 4-character verification code.' }, { status: 400 })
    }

    let parsed: { id: string; scope: string; exp: number; sig: string }
    try {
      parsed = JSON.parse(Buffer.from(challengeToken, 'base64url').toString('utf8'))
    } catch {
      return NextResponse.json({ error: 'Invalid verification challenge. Please refresh the code.' }, { status: 400 })
    }

    if (!parsed?.id || parsed.scope !== captchaScope || !Number.isFinite(parsed.exp) || Date.now() > parsed.exp) {
      return NextResponse.json({ error: 'Verification code expired or mismatched. Please refresh.' }, { status: 400 })
    }

    const expectedSig = signChallenge(parsed.id, parsed.scope, captchaCode, parsed.exp)
    const sigOk =
      parsed.sig.length === expectedSig.length &&
      crypto.timingSafeEqual(Buffer.from(parsed.sig, 'utf8'), Buffer.from(expectedSig, 'utf8'))

    if (!sigOk) {
      return NextResponse.json({ error: 'Incorrect verification code. Please try again.' }, { status: 400 })
    }
    if (consumedMemory.has(parsed.id)) {
      return NextResponse.json({ error: 'Verification code already used. Please refresh.' }, { status: 409 })
    }

    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!sbUrl || !sbKey || !TENANT_ID) {
      return NextResponse.json({ error: 'Inquiry service is temporarily unavailable.' }, { status: 503 })
    }

    const supabase = createClient(sbUrl, sbKey, { auth: { persistSession: false, autoRefreshToken: false } })

    const { error: challengeErr } = await supabase.from('inquiry_captcha_challenges').insert({
      id: parsed.id,
      tenant_id: TENANT_ID,
      scope: captchaScope,
      consumed_at: new Date().toISOString(),
      expires_at: new Date(parsed.exp).toISOString(),
    })
    if (challengeErr) {
      if (challengeErr.code === '23505') {
        return NextResponse.json({ error: 'Verification code already used. Please refresh.' }, { status: 409 })
      }
      if (!challengeErr.message?.includes('does not exist') && !challengeErr.message?.includes('schema cache')) {
        return NextResponse.json({ error: 'Verification failed. Please refresh and try again.' }, { status: 400 })
      }
    }
    consumedMemory.add(parsed.id)

    const fullMessage = [product ? `Equipment / Model: ${product}` : '', message].filter(Boolean).join('\n\n')
    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        tenant_id: TENANT_ID,
        name,
        email,
        company: company || null,
        phone: phone || null,
        message: fullMessage,
        source_page: String(body.sourcePage || captchaScope),
        status: 'new',
      })
      .select('id')
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Unable to submit inquiry right now. Please email info@ruizhipetrochemicalequipment.com.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, id: data?.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 })
  }
}
