'use client'

import { useState } from 'react'
import { Check, Loader2, Send } from 'lucide-react'
import { useRecaptcha } from '@/components/recaptcha'
import { CRAFT_TYPES, COUNTIES, whatsappLink } from '@/lib/site'

const emptyForm = {
  name: '',
  email: '',
  craftType: '',
  county: '',
  phone: '',
  bio: '',
  sampleProduct: '',
}

export function SellerForm() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [reference, setReference] = useState('')
  const { execute, challenge, revealChallenge } = useRecaptcha('seller_application')

  const update = (key: keyof typeof emptyForm, value: string) =>
    setForm((current) => ({ ...current, [key]: value }))

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const token = await execute()

    try {
      const response = await fetch('/api/sellers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, captchaToken: token }),
      })
      const data = (await response.json()) as {
        message?: string
        error?: string
        applicationId?: string
        requiresChallenge?: boolean
      }

      if (!response.ok) {
        if (data.requiresChallenge) revealChallenge()
        setStatus('error')
        setMessage(data.error ?? 'We could not send your application. Please try again.')
        return
      }

      setStatus('success')
      setReference(data.applicationId ?? '')
      setMessage(data.message ?? 'Application received.')
      setForm(emptyForm)
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again or message us on WhatsApp.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-line bg-white p-6 text-center shadow-card sm:p-8">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-xl text-ink">Asante sana, we have your application</h3>
        <p className="mt-2 text-sm leading-relaxed text-body">{message}</p>
        {reference && (
          <p className="mt-2 text-xs uppercase tracking-[0.1em] text-ash">Reference {reference}</p>
        )}
        <a
          href={whatsappLink('Hi Kezia Craft, I have just applied to sell on the marketplace.')}
          target="_blank"
          rel="noopener noreferrer"
          className="bg_btn mt-5"
        >
          Talk to our team on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-lg border border-line bg-white p-5 shadow-card sm:p-7"
      noValidate
    >
      <h2 className="text-xl text-ink sm:text-2xl">Apply to sell</h2>
      <p className="mt-1 text-sm text-body">
        Tell us about your craft. We review every application within three working days and call you
        for a short conversation.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="seller-name" className="field-label">
            Your name
          </label>
          <input
            id="seller-name"
            required
            value={form.name}
            onChange={(event) => update('name', event.target.value)}
            className="field-input"
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="seller-phone" className="field-label">
            Phone or WhatsApp
          </label>
          <input
            id="seller-phone"
            type="tel"
            required
            value={form.phone}
            onChange={(event) => update('phone', event.target.value)}
            className="field-input"
            autoComplete="tel"
            placeholder="0712 345 678"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="seller-email" className="field-label">
            Email
          </label>
          <input
            id="seller-email"
            type="email"
            required
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
            className="field-input"
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="seller-craft" className="field-label">
            Craft type
          </label>
          <select
            id="seller-craft"
            required
            value={form.craftType}
            onChange={(event) => update('craftType', event.target.value)}
            className="field-input"
          >
            <option value="">Select your craft</option>
            {CRAFT_TYPES.map((craft) => (
              <option key={craft} value={craft}>
                {craft}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="seller-county" className="field-label">
            County
          </label>
          <select
            id="seller-county"
            required
            value={form.county}
            onChange={(event) => update('county', event.target.value)}
            className="field-input"
          >
            <option value="">Select your county</option>
            {COUNTIES.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="seller-bio" className="field-label">
            Short bio
          </label>
          <textarea
            id="seller-bio"
            required
            minLength={30}
            rows={4}
            value={form.bio}
            onChange={(event) => update('bio', event.target.value)}
            className="field-input resize-y"
            placeholder="How did you learn your craft, who do you work with, and what makes your studio different?"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="seller-sample" className="field-label">
            Sample product description
          </label>
          <textarea
            id="seller-sample"
            required
            minLength={20}
            rows={3}
            value={form.sampleProduct}
            onChange={(event) => update('sampleProduct', event.target.value)}
            className="field-input resize-y"
            placeholder="Describe one piece you would list first, including materials, size and how long it takes to make."
          />
        </div>
      </div>

      {status === 'error' && message && (
        <p role="alert" className="mt-4 rounded-md bg-alert/10 p-3 text-sm text-alert">
          {message}
        </p>
      )}
      {challenge}

      <button type="submit" disabled={status === 'loading'} className="submit_btn mt-5 w-full">
        {status === 'loading' ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" aria-hidden="true" /> Submit application
          </>
        )}
      </button>
      <p className="mt-3 text-xs leading-relaxed text-ash">
        By applying you agree to our{' '}
        <a href="/legal/terms" className="text-primary hover:underline">
          marketplace terms
        </a>
        . We never share your details with other buyers.
      </p>
    </form>
  )
}
