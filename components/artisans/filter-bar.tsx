'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export function ArtisanFilterBar({
  regions,
  crafts,
  total,
}: {
  regions: string[]
  crafts: string[]
  total: number
}) {
  const router = useRouter()
  const params = useSearchParams()

  const region = params.get('region') ?? 'All'
  const craft = params.get('craft') ?? 'All'

  const update = (key: 'region' | 'craft', value: string) => {
    const next = new URLSearchParams(params.toString())
    if (value === 'All') next.delete(key)
    else next.set(key, value)
    const query = next.toString()
    router.push(query ? `/artisans?${query}` : '/artisans', { scroll: false })
  }

  return (
    <div className="rounded-lg border border-line bg-white p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
        <div>
          <label htmlFor="filter-region" className="field-label">
            Region
          </label>
          <select
            id="filter-region"
            value={region}
            onChange={(event) => update('region', event.target.value)}
            className="field-input"
          >
            {regions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-craft" className="field-label">
            Craft type
          </label>
          <select
            id="filter-craft"
            value={craft}
            onChange={(event) => update('craft', event.target.value)}
            className="field-input"
          >
            {crafts.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <p className="text-sm text-body lg:pb-3 lg:text-right">
          {total} {total === 1 ? 'artisan' : 'artisans'} found
        </p>
      </div>
    </div>
  )
}
