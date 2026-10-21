import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Leaf, Package, ShieldCheck, Truck } from 'lucide-react'
import { HomeHero } from '@/components/home/hero'
import { CategoryStrip } from '@/components/home/category-strip'
import { ImpactCounter } from '@/components/home/impact-counter'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'
import { StarRating } from '@/components/star-rating'
import { artisans, getArtisan, products, testimonials } from '@/lib/data'

const featured = products.filter((product) => product.featured).slice(0, 8)
const spotlight = artisans.filter((artisan) => artisan.featured).slice(0, 3)

const assurances = [
  {
    Icon: ShieldCheck,
    title: 'Paid maker to buyer',
    copy: 'No middlemen. Makers set their own prices and are paid within 48 hours of delivery.',
  },
  {
    Icon: Truck,
    title: 'Delivery across Kenya',
    copy: 'Nairobi same week, countrywide in 2 to 5 days, and international shipping to 26 countries.',
  },
  {
    Icon: Leaf,
    title: 'Low impact materials',
    copy: 'Sisal, lake clay, fallen wood and vegetable tanned leather sourced close to the workshop.',
  },
  {
    Icon: Package,
    title: 'Packed by hand',
    copy: 'Every order is wrapped by the artisan who made it, with a note from their studio.',
  },
]

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CategoryStrip />

      <section className="section-kc bg-white">
        <div className="container-kc">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="main_title max-w-2xl">
              <span className="eyebrow">Featured this week</span>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl">Fresh from the workshop</h2>
              <p>
                Eight pieces chosen by our curators, each one made by hand in Kenya, Uganda or
                Tanzania.
              </p>
            </div>
            <Link href="/shop" className="more_btn inline-flex items-center gap-1 self-start sm:self-auto">
              View all products <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {featured.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 0.08} y={28} scale={0.98} as="div">
                <ProductCard
                  product={{
                    ...product,
                    artisanName: getArtisan(product.artisanSlug)?.name ?? 'Kezia Craft',
                  }}
                  priority={index < 2}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-kc bg-mist">
        <div className="container-kc">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Meet the makers</span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl">The hands behind the craft</h2>
            <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
              We work directly with artisan studios across the region. Here are three of the makers
              you will meet first.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {spotlight.map((artisan, index) => (
              <Reveal key={artisan.slug} delay={index * 0.12} y={40} as="article">
                <div className="card-kc flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={artisan.portrait}
                      alt={`${artisan.name}, ${artisan.craft} artisan in ${artisan.region}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg text-ink sm:text-xl">{artisan.name}</h3>
                      <StarRating rating={artisan.rating} size={13} showValue />
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-primary">
                      {artisan.craft} · {artisan.region}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-body">
                      {artisan.shortBio}
                    </p>
                    <Link
                      href={`/artisan/${artisan.slug}`}
                      className="more_btn mt-4 inline-flex items-center gap-1"
                    >
                      Visit their shop <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ImpactCounter />

      <section className="section-kc bg-white">
        <div className="container-kc">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">From our buyers</span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl">Words from the doorstep</h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.1} y={26}>
                <figure className="card-kc flex h-full flex-col p-5 sm:p-6">
                  <StarRating rating={testimonial.rating} size={16} />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-body">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 border-t border-line pt-4">
                    <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
                    <p className="text-xs text-ash">{testimonial.location}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-primary">
                      Bought {testimonial.product}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist pb-14 pt-2 sm:pb-20">
        <div className="container-kc">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {assurances.map(({ Icon, title, copy }, index) => (
              <Reveal key={title} delay={index * 0.08} y={20}>
                <div className="h-full rounded-lg border border-line bg-white p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-ink">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl bg-night">
            <div className="grid grid-cols-1 items-center gap-6 p-6 sm:p-10 lg:grid-cols-2 lg:gap-8">
              <div>
                <span className="eyebrow text-leaf">For artisans</span>
                <h2 className="mt-2 text-2xl text-white sm:text-3xl">
                  Your craft deserves a wider market
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  Join 480 makers selling to buyers in Kenya and abroad. Zero listing fees, a simple
                  dashboard and payout support through M-Pesa.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/sell" className="bg_btn w-full sm:w-auto">
                    Apply to sell
                  </Link>
                  <Link
                    href="/artisans"
                    className="tp_btn w-full border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
                  >
                    Browse artisans
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                <Image
                  src="/images/weaving-cover.jpg"
                  alt="A weaver at work in her Nairobi studio"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 560px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
