'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { SORT_OPTIONS } from '@/lib/catalog'

export function SortSelect() {
  const router = useRouter()
  const params = useSearchParams()
  const current = params.get('sort') ?? 'newest'

  const onChange = (value: string) => {
    const next = new URLSearchParams(params.toString())
    if (value === 'newest') next.delete('sort')
    else next.set('sort', value)
    next.delete('page')
    router.push(`/shop?${next.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.08em] text-ash">
        Sort
      </label>
      <select
        id="sort"
        value={current}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-[44px] rounded-md border border-line bg-white px-3 text-base text-ink transition focus:border-primary focus:outline-none"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
