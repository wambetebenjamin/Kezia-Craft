import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { Suspense } from 'react'
import { ArtisanFilterBar } from '@/components/artisans/filter-bar'
import { Reveal } from '@/components/reveal'
import { StarRating } from '@/components/star-rating'
import { artisans, productsByArtisan } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Artisan directory',
  description:
    'Meet the weavers, potters, beadworkers, leather workers and carvers behind Kezia Craft. Filter by region and craft type.',
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value ?? undefined

export default async function ArtisansPage({ searchParams }: { searchParams: SearchParams }) {
  const resolved = await searchParams
  const region = first(resolved.region) ?? 'All'
  const craft = first(resolved.craft) ?? 'All'

  const regions = ['All', ...Array.from(new Set(artisans.map((artisan) => artisan.region)))]
  const crafts = ['All', ...Array.from(new Set(artisans.map((artisan) => artisan.craft)))]

  const filtered = artisans.filter((artisan) => {
    if (region !== 'All' && artisan.region !== region) return false
    if (craft !== 'All' && artisan.craft !== craft) return false
    return true
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
            <span className="text-ink">Artisans</span>
          </nav>
          <div className="main_title mt-3 max-w-3xl">
            <span className="eyebrow">Artisan directory</span>
            <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl">Meet the makers of East Africa</h1>
            <p>
              Every studio on Kezia Craft is visited by our team. These are the weavers, potters,
              beadworkers and carvers who set their own prices and keep their own stories.
            </p>
          </div>
        </div>
      </section>

      <section className="section-kc bg-white">
        <div className="container-kc">
          <Suspense fallback={<div className="h-40 w-full" />}>
            <ArtisanFilterBar regions={regions} crafts={crafts} total={filtered.length} />
          </Suspense>

          {filtered.length === 0 ? (
            <div className="mt-8 rounded-lg border border-dashed border-line bg-mist p-8 text-center">
              <h2 className="text-lg text-ink">No artisans match those filters</h2>
              <p className="mt-2 text-sm text-body">Try a different region or craft type.</p>
              <Link href="/artisans" className="bg_btn mt-5">
                Show all artisans
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((artisan, index) => {
                const count = productsByArtisan(artisan.slug).length
                return (
                  <Reveal key={artisan.slug} delay={(index % 3) * 0.08} y={28} as="article">
                    <div className="card-kc flex h-full flex-col overflow-hidden">
                      <Link href={`/artisan/${artisan.slug}`} className="block">
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                          <Image
                            src={artisan.portrait}
                            alt={`${artisan.name}, ${artisan.craft} artisan in ${artisan.region}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                            className="object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex flex-1 flex-col p-4 sm:p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h2 className="text-lg text-ink sm:text-xl">
                            <Link href={`/artisan/${artisan.slug}`} className="transition hover:text-primary">
                              {artisan.name}
                            </Link>
                          </h2>
                          <StarRating rating={artisan.rating} size={13} showValue />
                        </div>
                        <p className="mt-1 flex items-center gap-1 text-xs text-ash">
                          <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                          {artisan.region} · {artisan.craft}
                        </p>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{artisan.shortBio}</p>
                        <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
                          <span className="text-xs text-ash">
                            {count} {count === 1 ? 'product' : 'products'} listed
                          </span>
                          <Link
                            href={`/artisan/${artisan.slug}`}
                            className="more_btn inline-flex items-center gap-1"
                          >
                            View shop <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
