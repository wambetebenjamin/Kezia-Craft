'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { PRICE_BANDS } from '@/lib/catalog'
import { StarRating } from '@/components/star-rating'

type FilterSidebarProps = {
  categories: string[]
  regions: string[]
  resultCount: number
}

const RATINGS = [
  { value: '4', label: '4 stars and up' },
  { value: '5', label: '5 stars only' },
]

export function FilterSidebar({ categories, regions, resultCount }: FilterSidebarProps) {
  const router = useRouter()
  const params = useSearchParams()
  const [open, setOpen] = useState(false)

  const category = params.get('category') ?? 'All'
  const region = params.get('region') ?? 'All'
  const price = params.get('price') ?? ''
  const rating = params.get('rating') ?? ''

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(params.toString())
      if (!value || value === 'All' || value === '') next.delete(key)
      else next.set(key, value)
      next.delete('page')
      setOpen(false)
      router.push(`/shop?${next.toString()}`, { scroll: false })
    },
    [params, router]
  )

  const clearAll = () => router.push('/shop', { scroll: false })

  const activeCount =
    (category !== 'All' ? 1 : 0) +
    (region !== 'All' ? 1 : 0) +
    (price ? 1 : 0) +
    (rating ? 1 : 0)

  const body = (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink">
          {resultCount} {resultCount === 1 ? 'piece' : 'pieces'}
        </p>
        {activeCount > 0 && (
          <button type="button" onClick={clearAll} className="text-xs font-medium text-primary hover:underline">
            Clear all
          </button>
        )}
      </div>

      <fieldset>
        <legend className="pb-3 text-sm font-semibold text-ink">Category</legend>
        <div className="space-y-1">
          {categories.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setParam('category', option)}
              aria-pressed={category === option}
              className={`flex min-h-[44px] w-full items-center justify-between rounded-md px-3 text-left text-sm transition ${
                category === option
                  ? 'bg-primary/10 font-medium text-primary'
                  : 'text-body hover:bg-mist hover:text-ink'
              }`}
            >
              {option}
              {category === option && <span aria-hidden="true">&#10003;</span>}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="pb-3 text-sm font-semibold text-ink">Price Range</legend>
        <div className="space-y-1">
          {PRICE_BANDS.map((band) => (
            <button
              key={band.id}
              type="button"
              onClick={() => setParam('price', price === band.id ? null : band.id)}
              aria-pressed={price === band.id}
              className={`flex min-h-[44px] w-full items-center gap-2 rounded-md px-3 text-left text-sm transition ${
                price === band.id ? 'bg-primary/10 font-medium text-primary' : 'text-body hover:bg-mist hover:text-ink'
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                  price === band.id ? 'border-primary bg-primary' : 'border-line'
                }`}
              >
                {price === band.id && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>
              {band.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="pb-3 text-sm font-semibold text-ink">Region</legend>
        <div className="space-y-1">
          {regions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setParam('region', option)}
              aria-pressed={region === option}
              className={`flex min-h-[44px] w-full items-center justify-between rounded-md px-3 text-left text-sm transition ${
                region === option
                  ? 'bg-primary/10 font-medium text-primary'
                  : 'text-body hover:bg-mist hover:text-ink'
              }`}
            >
              {option}
              {region === option && <span aria-hidden="true">&#10003;</span>}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="pb-3 text-sm font-semibold text-ink">Rating</legend>
        <div className="space-y-1">
          {RATINGS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setParam('rating', rating === option.value ? null : option.value)}
              aria-pressed={rating === option.value}
              className={`flex min-h-[44px] w-full items-center gap-2 rounded-md px-3 text-left text-sm transition ${
                rating === option.value
                  ? 'bg-primary/10 font-medium text-primary'
                  : 'text-body hover:bg-mist hover:text-ink'
              }`}
            >
              <StarRating rating={Number(option.value)} size={13} />
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="tp_btn w-full lg:hidden"
        aria-expanded={open}
        aria-controls="shop-filters"
      >
        <SlidersHorizontal className="mr-2 h-4 w-4" aria-hidden="true" />
        Filters{activeCount > 0 ? ` (${activeCount})` : ''}
      </button>

      <aside
        id="shop-filters"
        aria-label="Product filters"
        className="hidden w-full shrink-0 lg:block lg:w-64"
      >
        <div className="sticky top-[90px] rounded-lg border border-line bg-white p-5">{body}</div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-[9995] flex items-end justify-center bg-plum/50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="filters-title"
            className="relative max-h-[88vh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 pb-safe shadow-float sm:max-w-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="filters-title" className="text-lg text-ink">
                Filter products
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-ash transition hover:bg-mist hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {body}
            <button type="button" onClick={() => setOpen(false)} className="bg_btn mt-6 w-full">
              Show {resultCount} results
            </button>
          </div>
        </div>
      )}
    </>
  )
}
