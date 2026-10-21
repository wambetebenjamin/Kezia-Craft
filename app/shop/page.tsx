import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { ProductCard } from '@/components/product-card'
import { FilterSidebar } from '@/components/shop/filter-sidebar'
import { SortSelect } from '@/components/shop/sort-select'
import { Pagination } from '@/components/shop/pagination'
import { Reveal } from '@/components/reveal'
import { filterOptions, PRICE_BANDS, queryProducts, SORT_OPTIONS, type SortOption } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Shop handmade goods',
  description:
    'Browse baskets, pottery, beadwork, leather goods, textiles and jewellery handmade by East African artisans. Prices in Kenyan shillings.',
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value ?? undefined

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const resolved = await searchParams

  const category = first(resolved.category)
  const region = first(resolved.region)
  const priceBand = first(resolved.price)
  const rating = Number(first(resolved.rating) ?? 0)
  const sort = (first(resolved.sort) ?? 'newest') as SortOption
  const page = Number(first(resolved.page) ?? 1)
  const search = first(resolved.q) ?? ''

  const band = PRICE_BANDS.find((item) => item.id === priceBand)

  const result = queryProducts({
    category,
    region,
    minPrice: band?.min,
    maxPrice: band?.max,
    minRating: rating,
    sort: SORT_OPTIONS.some((option) => option.value === sort) ? sort : 'newest',
    search,
    page,
    pageSize: 9,
  })

  return (
    <>
      <section className="border-b border-line bg-mist py-8 sm:py-12">
        <div className="container-kc">
          <nav aria-label="Breadcrumb" className="text-xs text-ash">
            <Link href="/" className="transition hover:text-primary">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-ink">Shop</span>
            {category && category !== 'All' && (
              <>
                <span aria-hidden="true"> / </span>
                <span className="text-ink">{category}</span>
              </>
            )}
          </nav>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="main_title max-w-2xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl">
                {category && category !== 'All' ? `${category} made by hand` : 'Shop handmade goods'}
              </h1>
              <p>
                {result.total} pieces from artisan workshops across East Africa. Every price is set
                by the maker.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <SortSelect />
            </div>
          </div>
        </div>
      </section>

      <section className="section-kc bg-white">
        <div className="container-kc">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <Suspense fallback={<div className="h-12 w-full lg:w-64" />}>
              <FilterSidebar
                categories={filterOptions.categories}
                regions={filterOptions.regions}
                resultCount={result.total}
              />
            </Suspense>

            <div className="min-w-0 flex-1">
              {result.items.length === 0 ? (
                <div className="rounded-lg border border-dashed border-line bg-mist p-8 text-center">
                  <h2 className="text-lg text-ink">No pieces match those filters yet</h2>
                  <p className="mt-2 text-sm text-body">
                    Try a wider price range or another region. New work is added every week.
                  </p>
                  <Link href="/shop" className="bg_btn mt-5">
                    Reset filters
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                  {result.items.map((product, index) => (
                    <Reveal key={product.id} delay={(index % 3) * 0.07} y={24} scale={0.98}>
                      <ProductCard product={product} priority={index < 3} />
                    </Reveal>
                  ))}
                </div>
              )}

              <Pagination
                page={result.page}
                totalPages={result.totalPages}
                params={{
                  category,
                  region,
                  price: priceBand,
                  rating: rating ? String(rating) : undefined,
                  sort: sort === 'newest' ? undefined : sort,
                  q: search || undefined,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
