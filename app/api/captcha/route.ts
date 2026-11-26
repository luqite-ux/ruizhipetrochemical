import crypto from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'

const CAPTCHA_SECRET =
  process.env.INQUIRY_CAPTCHA_SECRET ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'ruizhi-captcha-signing-key-2026'
const CHARS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'

function signChallenge(challengeId: string, scope: string, code: string, exp: number) {
  return crypto
    .createHmac('sha256', CAPTCHA_SECRET)
    .update(`${challengeId}|${scope}|${code.toUpperCase()}|${exp}`)
    .digest('hex')
}

function renderCaptchaSvg(code: string): string {
  const width = 148
  const height = 46
  const palette = ['#1B3670', '#D92027', '#0F172A', '#1E40AF']
  const glyphs = code
    .split('')
    .map((ch, idx) => {
      const x = 22 + idx * 30 + Math.floor(Math.random() * 5 - 2)
      const y = 32 + Math.floor(Math.random() * 5 - 2)
      const rot = Math.floor(Math.random() * 18 - 9)
      const fill = palette[idx % palette.length]
      return `<text x="${x}" y="${y}" fill="${fill}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="24" font-weight="700" transform="rotate(${rot} ${x} ${y})">${ch}</text>`
    })
    .join('')
  const lines = Array.from({ length: 4 }, () => {
    const x1 = Math.floor(Math.random() * 35)
    const y1 = Math.floor(Math.random() * height)
    const x2 = width - Math.floor(Math.random() * 35)
    const y2 = Math.floor(Math.random() * height)
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#94A3B8" stroke-width="1.1" stroke-opacity="0.55" />`
  }).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="4-character verification code"><rect width="${width}" height="${height}" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1"/>${lines}${glyphs}</svg>`
}

export async function GET(req: NextRequest) {
  const scope = (req.nextUrl.searchParams.get('scope') || 'contact-page').trim().slice(0, 64)
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += CHARS[crypto.randomInt(0, CHARS.length)]
  }
  const challengeId = crypto.randomUUID()
  const exp = Date.now() + 10 * 60 * 1000
  const sig = signChallenge(challengeId, scope, code, exp)
  const token = Buffer.from(JSON.stringify({ id: challengeId, scope, exp, sig }), 'utf8').toString('base64url')
  const svg = renderCaptchaSvg(code)
  const image = `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`

  return NextResponse.json(
    { challengeToken: token, scope, image, expiresAt: new Date(exp).toISOString() },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } }
  )
}
