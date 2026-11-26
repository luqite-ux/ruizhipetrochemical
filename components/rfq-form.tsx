'use client'

import { useCallback, useEffect, useState } from 'react'
import { CheckCircle2, RefreshCw, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RfqFormProps {
  captchaScope: string
  defaultProduct?: string
  sourcePage?: string
}

export function RfqForm({ captchaScope, defaultProduct = '', sourcePage }: RfqFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [product, setProduct] = useState(defaultProduct)
  const [message, setMessage] = useState('')
  const [captchaCode, setCaptchaCode] = useState('')
  const [challengeToken, setChallengeToken] = useState('')
  const [captchaImage, setCaptchaImage] = useState('')
  const [loadingCaptcha, setLoadingCaptcha] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [submittedId, setSubmittedId] = useState('')

  const loadCaptcha = useCallback(async () => {
    setLoadingCaptcha(true)
    try {
      const res = await fetch(`/api/captcha?scope=${encodeURIComponent(captchaScope)}`, { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setChallengeToken(data.challengeToken || '')
        setCaptchaImage(data.image || '')
        setCaptchaCode('')
      }
    } finally {
      setLoadingCaptcha(false)
    }
  }, [captchaScope])

  useEffect(() => {
    loadCaptcha()
  }, [loadCaptcha])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          phone,
          product,
          message,
          captchaCode,
          captchaScope,
          challengeToken,
          sourcePage: sourcePage || captchaScope,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Unable to submit inquiry. Please try again.')
        await loadCaptcha()
        return
      }
      setSubmittedId(data.id || 'submitted')
      setName('')
      setEmail('')
      setCompany('')
      setPhone('')
      setMessage('')
      await loadCaptcha()
    } catch {
      setError('Network error. Please try again or email info@ruizhipetrochemicalequipment.com.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submittedId) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-emerald-600" />
        <h3 className="mt-3 text-xl font-semibold text-ink">Engineering Inquiry Received</h3>
        <p className="mt-2 text-sm text-body">
          Thank you. Our technical engineering team will review your specifications and respond directly via email or phone.
        </p>
        <Button type="button" variant="outline" className="mt-5 rounded-full" onClick={() => setSubmittedId('')}>
          Submit Another Inquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-hairline bg-white p-6 shadow-xs sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink">Full Name *</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-hairline bg-alabaster/50 px-3.5 py-2.5 text-sm text-ink focus:border-navy focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink">Business Email *</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full rounded-lg border border-hairline bg-alabaster/50 px-3.5 py-2.5 text-sm text-ink focus:border-navy focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink">Company / EPC Contractor</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company name"
            className="w-full rounded-lg border border-hairline bg-alabaster/50 px-3.5 py-2.5 text-sm text-ink focus:border-navy focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink">Phone / WhatsApp</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 / +86 ..."
            className="w-full rounded-lg border border-hairline bg-alabaster/50 px-3.5 py-2.5 text-sm text-ink focus:border-navy focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-ink">Equipment / Model of Interest</label>
        <input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="e.g., 480 m² Shell-and-Tube Heat Exchanger, 1,000 m³ Storage Tank, Distillation Column"
          className="w-full rounded-lg border border-hairline bg-alabaster/50 px-3.5 py-2.5 text-sm text-ink focus:border-navy focus:bg-white focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-ink">Process Conditions & Technical Requirements *</label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please share medium, design pressure/temperature, volume or heat-transfer area, preferred material (CS/SS304/SS316L/Alloy), and target delivery schedule."
          className="w-full rounded-lg border border-hairline bg-alabaster/50 px-3.5 py-2.5 text-sm text-ink focus:border-navy focus:bg-white focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-ink">Verification Code *</label>
        <div className="flex flex-wrap items-center gap-3">
          <input
            required
            maxLength={4}
            value={captchaCode}
            onChange={(e) => setCaptchaCode(e.target.value.toUpperCase())}
            placeholder="4-char code"
            aria-label="4-character verification code"
            className="w-36 rounded-lg border border-hairline bg-alabaster/50 px-3.5 py-2.5 font-mono text-sm uppercase tracking-widest text-ink focus:border-navy focus:bg-white focus:outline-none"
          />
          {captchaImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={captchaImage}
              alt="4-character verification code"
              width={148}
              height={46}
              className="h-[46px] w-[148px] rounded-lg border border-hairline bg-alabaster"
            />
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={loadCaptcha}
            disabled={loadingCaptcha}
            className="h-10 rounded-lg"
          >
            <RefreshCw className={`mr-1.5 size-3.5 ${loadingCaptcha ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-crimson">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-navy py-5 text-sm font-medium text-white hover:bg-navy/90"
      >
        <Send className="mr-2 size-4" />
        {submitting ? 'Submitting Engineering Inquiry...' : 'Submit Technical Inquiry'}
      </Button>
    </form>
  )
}
