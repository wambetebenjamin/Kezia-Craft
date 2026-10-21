'use client'

import { useState } from 'react'
import { Loader2, Mail } from 'lucide-react'
import { useRecaptcha } from '@/components/recaptcha'

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const { execute, challenge } = useRecaptcha('newsletter')

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const token = await execute()

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, captchaToken: token }),
      })
      const data = (await response.json()) as { message?: string; error?: string }

      if (!response.ok) {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      setMessage(data.message ?? 'You are on the list. Karibu!')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <form onSubmit={submit} className={`w-full ${compact ? '' : 'max-w-md'}`} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Mail
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ash"
          />
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email address"
            className="field-input pl-9"
            autoComplete="email"
          />
        </div>
        <button type="submit" disabled={status === 'loading'} className="bg_btn shrink-0">
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            'Subscribe'
          )}
        </button>
      </div>
      {message && (
        <p
          role="status"
          className={`pt-2 text-xs ${status === 'success' ? 'text-leaf' : 'text-alert'}`}
        >
          {message}
        </p>
      )}
      {challenge}
    </form>
  )
}
