'use client'

import { useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import { useRecaptcha } from '@/components/recaptcha'

const emptyForm = { name: '', email: '', phone: '', message: '' }

export function EnquiryForm() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const { execute, challenge, revealChallenge } = useRecaptcha('send_enquiry')

  const update = (key: keyof typeof emptyForm, value: string) =>
    setForm((current) => ({ ...current, [key]: value }))

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const token = await execute()

    try {
      const response = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, captchaToken: token }),
      })
      const data = (await response.json()) as {
        message?: string
        error?: string
        requiresChallenge?: boolean
      }

      if (!response.ok) {
        if (data.requiresChallenge) revealChallenge()
        setStatus('error')
        setMessage(data.error ?? 'We could not send your message. Please try again.')
        return
      }

      setStatus('success')
      setMessage(data.message ?? 'Thank you, we will reply shortly.')
      setForm(emptyForm)
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again or message us on WhatsApp.')
    }
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-line bg-white p-5 shadow-card sm:p-7" noValidate>
      <h2 className="text-xl text-ink sm:text-2xl">Send us a message</h2>
      <p className="mt-1 text-sm text-body">
        Questions about an order, a commission or a partnership? We reply within one working day.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="enquiry-name" className="field-label">
            Your name
          </label>
          <input
            id="enquiry-name"
            required
            value={form.name}
            onChange={(event) => update('name', event.target.value)}
            className="field-input"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="enquiry-phone" className="field-label">
            Phone (optional)
          </label>
          <input
            id="enquiry-phone"
            type="tel"
            value={form.phone}
            onChange={(event) => update('phone', event.target.value)}
            className="field-input"
            autoComplete="tel"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-email" className="field-label">
            Email
          </label>
          <input
            id="enquiry-email"
            type="email"
            required
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
            className="field-input"
            autoComplete="email"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-message" className="field-label">
            Message
          </label>
          <textarea
            id="enquiry-message"
            required
            minLength={10}
            rows={4}
            value={form.message}
            onChange={(event) => update('message', event.target.value)}
            className="field-input resize-y"
          />
        </div>
      </div>

      {status === 'success' && (
        <p className="mt-4 rounded-md bg-primary/10 p-3 text-sm text-primary" role="status">
          {message}
        </p>
      )}
      {status !== 'success' && message && (
        <p
          role="status"
          className="mt-4 rounded-md bg-alert/10 p-3 text-sm text-alert"
        >
          {message}
        </p>
      )}
      {challenge}

      <button type="submit" disabled={status === 'loading'} className="submit_btn mt-5 w-full sm:w-auto">
        {status === 'loading' ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" aria-hidden="true" /> Send message
          </>
        )}
      </button>
    </form>
  )
}
