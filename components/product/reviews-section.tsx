'use client'

import { useMemo, useState } from 'react'
import { StarRating } from '@/components/star-rating'
import { ReviewForm } from '@/components/product/review-form'
import type { Review } from '@/lib/data'

export function ReviewsSection({
  productSlug,
  initialReviews,
  rating,
  reviewCount,
}: {
  productSlug: string
  initialReviews: Review[]
  rating: number
  reviewCount: number
}) {
  const [items, setItems] = useState<Review[]>(initialReviews)

  const breakdown = useMemo(() => {
    const counts = [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: items.filter((review) => review.rating === stars).length,
    }))
    const total = items.length || 1
    return counts.map((entry) => ({
      ...entry,
      percent: Math.round((entry.count / total) * 100),
    }))
  }, [items])

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section-kc bg-mist">
      <div className="container-kc">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 id="reviews-title" className="text-2xl text-ink sm:text-3xl">
              Reviews from buyers
            </h2>
            <div className="mt-4 flex items-center gap-4">
              <p className="font-display text-4xl text-ink">{rating.toFixed(1)}</p>
              <div>
                <StarRating rating={rating} size={18} />
                <p className="mt-1 text-xs text-ash">
                {reviewCount} verified {reviewCount === 1 ? 'review' : 'reviews'}
              </p>
              </div>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-ash">
              Star split from the {items.length} most recent written {items.length === 1 ? 'review' : 'reviews'}.
            </p>

            <div className="mt-4 space-y-2">
              {breakdown.map((entry) => (
                <div key={entry.stars} className="flex items-center gap-3">
                  <span className="w-12 shrink-0 text-xs text-body">{entry.stars} star</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                    <span
                      className="block h-full rounded-full bg-primary transition-[width] duration-700"
                      style={{ width: `${entry.percent}%` }}
                    />
                  </span>
                  <span className="w-8 shrink-0 text-right text-xs text-ash">{entry.count}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {items.map((review) => (
                <article key={review.id} className="rounded-lg border border-line bg-white p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-ink">{review.name}</p>
                    <StarRating rating={review.rating} size={13} />
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.1em] text-ash">
                    {review.location} · {new Date(review.createdAt).toLocaleDateString('en-KE', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-body">{review.comment}</p>
                </article>
              ))}
              {items.length < reviewCount && items.length > 0 && (
                <p className="text-xs text-ash">
                  Showing the {items.length} most recent written reviews of {reviewCount} total.
                </p>
              )}
              {items.length === 0 && (
                <p className="rounded-lg border border-dashed border-line p-4 text-sm text-body">
                  No reviews yet. Be the first to tell other buyers about this piece.
                </p>
              )}
            </div>
          </div>

          <div>
            <ReviewForm
              productSlug={productSlug}
              onAdded={(review) =>
                setItems((current) => [
                  {
                    ...review,
                    location: 'Kenya',
                    productSlug,
                  },
                  ...current,
                ])
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}
