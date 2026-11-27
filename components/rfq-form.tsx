'use client'

import { useCallback, useEffect, useState } from 'react'
import { CheckCircle2, RefreshCw, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Locale } from '@/lib/i18n'

interface RfqFormProps {
  captchaScope: string
  defaultProduct?: string
  sourcePage?: string
  locale?: Locale
}

export function RfqForm({ captchaScope, defaultProduct = '', sourcePage, locale = 'en' }: RfqFormProps) {
  const isZh = locale === 'zh'
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
        setError(data.error || (isZh ? '提交失败，请检查验证码或表单信息后重试。' : 'Unable to submit inquiry. Please try again.'))
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
      setError(
        isZh
          ? '网络异常，请重试或直接发送邮件至 info@ruizhipetrochemicalequipment.com。'
          : 'Network error. Please try again or email info@ruizhipetrochemicalequipment.com.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submittedId) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-emerald-600" />
        <h3 className="mt-3 text-xl font-semibold text-ink">
          {isZh ? '技术询盘已收到' : 'Engineering Inquiry Received'}
        </h3>
        <p className="mt-2 text-sm text-body">
          {isZh
            ? '感谢您的咨询！我们的工程技术团队将尽快审阅您的工艺参数，并通过邮件或电话与您直接联系。'
            : 'Thank you. Our technical engineering team will review your specifications and respond directly via email or phone.'}
        </p>
        <Button type="button" variant="outline" className="mt-5 rounded-full" onClick={() => setSubmittedId('')}>
          {isZh ? '继续提交新询盘' : 'Submit Another Inquiry'}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-hairline bg-white p-6 shadow-xs sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink">
            {isZh ? '联系人姓名 *' : 'Full Name *'}
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isZh ? '请输入您的姓名' : 'Your name'}
            className="w-full rounded-lg border border-hairline bg-alabaster/50 px-3.5 py-2.5 text-sm text-ink focus:border-navy focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink">
            {isZh ? '企业邮箱 *' : 'Business Email *'}
          </label>
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
          <label className="mb-1.5 block text-xs font-medium text-ink">
            {isZh ? '公司名称 / 总包单位' : 'Company / EPC Contractor'}
          </label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={isZh ? '请输入公司名称' : 'Company name'}
            className="w-full rounded-lg border border-hairline bg-alabaster/50 px-3.5 py-2.5 text-sm text-ink focus:border-navy focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink">
            {isZh ? '联系电话 / 微信' : 'Phone / WhatsApp'}
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+86 ..."
            className="w-full rounded-lg border border-hairline bg-alabaster/50 px-3.5 py-2.5 text-sm text-ink focus:border-navy focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-ink">
          {isZh ? '意向设备 / 型号' : 'Equipment / Model of Interest'}
        </label>
        <input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder={
            isZh
              ? '例如：480m² 管壳式换热器、1000m³ 储罐、精馏塔'
              : 'e.g., 480 m² Shell-and-Tube Heat Exchanger, 1,000 m³ Storage Tank, Distillation Column'
          }
          className="w-full rounded-lg border border-hairline bg-alabaster/50 px-3.5 py-2.5 text-sm text-ink focus:border-navy focus:bg-white focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-ink">
          {isZh ? '工艺工况与技术要求 *' : 'Process Conditions & Technical Requirements *'}
        </label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isZh
              ? '请提供介质、设计压力/温度、容积或换热面积、材质要求（碳钢/SS304/SS316L/合金）及期望交期。'
              : 'Please share medium, design pressure/temperature, volume or heat-transfer area, preferred material (CS/SS304/SS316L/Alloy), and target delivery schedule.'
          }
          className="w-full rounded-lg border border-hairline bg-alabaster/50 px-3.5 py-2.5 text-sm text-ink focus:border-navy focus:bg-white focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-ink">
          {isZh ? '图形验证码 *' : 'Verification Code *'}
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <input
            required
            maxLength={4}
            value={captchaCode}
            onChange={(e) => setCaptchaCode(e.target.value.toUpperCase())}
            placeholder={isZh ? '4位验证码' : '4-char code'}
            aria-label={isZh ? '4位图形验证码' : '4-character verification code'}
            className="w-36 rounded-lg border border-hairline bg-alabaster/50 px-3.5 py-2.5 font-mono text-sm uppercase tracking-widest text-ink focus:border-navy focus:bg-white focus:outline-none"
          />
          {captchaImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={captchaImage}
              alt={isZh ? '4位图形验证码' : '4-character verification code'}
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
            {isZh ? '刷新' : 'Refresh'}
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
        {submitting
          ? isZh
            ? '正在提交技术询盘...'
            : 'Submitting Engineering Inquiry...'
          : isZh
            ? '提交技术询盘'
            : 'Submit Technical Inquiry'}
      </Button>
    </form>
  )
}
