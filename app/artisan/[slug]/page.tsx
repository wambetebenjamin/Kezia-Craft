import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Award, MapPin, MessageCircle, Sparkles } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'
import { StarRating } from '@/components/star-rating'
import { artisans, getArtisan, productsByArtisan } from '@/lib/data'
import { whatsappLink } from '@/lib/site'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return artisans.map((artisan) => ({ slug: artisan.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const artisan = getArtisan(slug)

  if (!artisan) return { title: 'Artisan not found' }

  return {
    title: `${artisan.name}, ${artisan.craft} artisan in ${artisan.region}`,
    description: artisan.shortBio,
    openGraph: {
      title: artisan.name,
      description: artisan.shortBio,
      images: [{ url: artisan.cover, width: 1200, height: 800, alt: artisan.name }],
    },
  }
}

export default async function ArtisanPage({ params }: { params: Params }) {
  const { slug } = await params
  const artisan = getArtisan(slug)

  if (!artisan) notFound()

  const artisanProducts = productsByArtisan(artisan.slug)

  return (
    <>
      <section className="relative">
        <div className="relative h-36 w-full overflow-hidden sm:h-48 lg:h-64">
          <Image
            src={artisan.cover}
            alt={`${artisan.name} studio in ${artisan.region}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-plum/70 to-plum/10" />
        </div>

        <div className="container-kc">
          <div className="-mt-12 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-card sm:h-32 sm:w-32">
              <Image
                src={artisan.portrait}
                alt={artisan.name}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 pb-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl text-ink sm:text-3xl lg:text-4xl">{artisan.name}</h1>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-body">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                    {artisan.region}, Kenya
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                    {artisan.craft} specialist
                  </span>
                </p>
                <div className="mt-2">
                  <StarRating rating={artisan.rating} showValue size={14} />
                </div>
              </div>
              <a
                href={whatsappLink(
                  `Hi ${artisan.name}, I found your studio on Kezia Craft and would like to ask about your work.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="bg_btn w-full sm:w-auto"
              >
                <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                Contact Artisan
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-kc bg-white">
        <div className="container-kc">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <h2 className="text-xl text-ink sm:text-2xl">The maker story</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-body sm:text-base">
                {artisan.story.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <aside className="rounded-lg border border-line bg-mist p-5">
              <h2 className="text-base font-semibold text-ink">At a glance</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-ash">Craft speciality</dt>
                  <dd className="text-body">{artisan.craft}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-ash">Years active</dt>
                  <dd className="text-body">{artisan.yearsActive} years</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-ash">Products listed</dt>
                  <dd className="text-body">{artisanProducts.length}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-ash">Awards and recognition</dt>
                  <dd>
                    <ul className="mt-1 space-y-1.5">
                      {artisan.awards.map((award) => (
                        <li key={award} className="flex gap-2 text-body">
                          <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                          <span>{award}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
              <a
                href={whatsappLink(`Hi ${artisan.name}, I would like to order a custom piece.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="tp_btn mt-5 w-full"
              >
                Ask about a custom order
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-kc bg-mist">
        <div className="container-kc">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl text-ink sm:text-3xl">Work from this studio</h2>
              <p className="mt-1 text-sm text-body">
                {artisanProducts.length} {artisanProducts.length === 1 ? 'piece' : 'pieces'} currently
                available
              </p>
            </div>
            <Link href="/artisans" className="more_btn">
              Browse all artisans
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {artisanProducts.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 0.07} y={24}>
                <ProductCard product={{ ...product, artisanName: artisan.name }} />
              </Reveal>
            ))}
          </div>

          {artisanProducts.length === 0 && (
            <p className="mt-6 rounded-lg border border-dashed border-line bg-white p-6 text-sm text-body">
              This studio is preparing a new collection. Message the maker on WhatsApp to be first to
              know.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
