import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function buildHref(params: Record<string, string | undefined>, page: number) {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value && key !== 'page') search.set(key, value)
  })
  if (page > 1) search.set('page', String(page))
  const query = search.toString()
  return query ? `/shop?${query}` : '/shop'
}

export function Pagination({
  page,
  totalPages,
  params,
}: {
  page: number
  totalPages: number
  params: Record<string, string | undefined>
}) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <Link
        href={buildHref(params, Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-line transition ${
          page === 1 ? 'pointer-events-none opacity-40' : 'hover:border-primary hover:text-primary'
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {pages.map((number) => (
        <Link
          key={number}
          href={buildHref(params, number)}
          aria-current={number === page ? 'page' : undefined}
          className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border text-sm font-medium transition ${
            number === page
              ? 'border-primary bg-primary text-white'
              : 'border-line text-ink hover:border-primary hover:text-primary'
          }`}
        >
          {number}
        </Link>
      ))}

      <Link
        href={buildHref(params, Math.min(totalPages, page + 1))}
        aria-disabled={page === totalPages}
        className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-line transition ${
          page === totalPages
            ? 'pointer-events-none opacity-40'
            : 'hover:border-primary hover:text-primary'
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  )
}
