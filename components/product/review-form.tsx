'use client'

import { useState } from 'react'
import { Loader2, Star } from 'lucide-react'
import { useRecaptcha } from '@/components/recaptcha'

type Review = {
  id: string
  name: string
  location?: string
  rating: number
  comment: string
  createdAt: string
}

export function ReviewForm({
  productSlug,
  onAdded,
}: {
  productSlug: string
  onAdded?: (review: Review) => void
}) {
  const [rating, setRating] = useState(5)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const { execute, challenge, revealChallenge } = useRecaptcha('add_review')

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const token = await execute()

    try {
      const response = await fetch('/api/reviews/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productSlug, name, rating, comment, captchaToken: token }),
      })
      const data = (await response.json()) as {
        message?: string
        error?: string
        requiresChallenge?: boolean
        review?: Review
      }

      if (!response.ok) {
        if (data.requiresChallenge) revealChallenge()
        setStatus('error')
        setMessage(data.error ?? 'We could not save your review. Please try again.')
        return
      }

      setStatus('success')
      setMessage(data.message ?? 'Thank you for your review.')
      if (data.review) onAdded?.(data.review)
      setName('')
      setComment('')
      setRating(5)
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-line bg-white p-5" noValidate>
      <h3 className="text-lg text-ink">Leave a Review</h3>
      <p className="mt-1 text-sm text-body">
        Bought this piece? Tell other buyers how it arrived and how it lives in your home.
      </p>

      <div className="mt-4">
        <span className="field-label">Your rating</span>
        <div className="flex items-center gap-1" role="radiogroup" aria-label="Your rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value} star${value > 1 ? 's' : ''}`}
              onClick={() => setRating(value)}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center"
            >
              <Star
                className={`h-6 w-6 ${value <= rating ? 'fill-honey text-honey' : 'fill-none text-line'}`}
                strokeWidth={1.6}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor="review-name" className="field-label">
          Your name
        </label>
        <input
          id="review-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          minLength={2}
          className="field-input"
          autoComplete="name"
          placeholder="e.g. Wairimu K."
        />
      </div>

      <div className="mt-3">
        <label htmlFor="review-comment" className="field-label">
          Your review
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          required
          minLength={10}
          rows={4}
          className="field-input resize-y"
          placeholder="What did you love about it?"
        />
      </div>

      <button type="submit" disabled={status === 'loading'} className="submit_btn mt-4 w-full sm:w-auto">
        {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : 'Submit review'}
      </button>

      {message && (
        <p
          role="status"
          className={`mt-3 text-sm ${status === 'success' ? 'text-primary' : 'text-alert'}`}
        >
          {message}
        </p>
      )}

      {challenge}
    </form>
  )
}
