import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin, Truck } from 'lucide-react'
import { ProductGallery } from '@/components/product/gallery'
import { PurchasePanel } from '@/components/product/purchase-panel'
import { ReviewsSection } from '@/components/product/reviews-section'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'
import { StarRating } from '@/components/star-rating'
import {
  getArtisan,
  getProduct,
  products,
  relatedProducts,
  reviewsForProduct,
  type Product,
} from '@/lib/data'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) return { title: 'Product not found' }

  return {
    title: product.name,
    description: `${product.name} by ${getArtisan(product.artisanSlug)?.name ?? 'a Kezia Craft artisan'}. ${product.description}`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image, width: 1200, height: 900, alt: product.name }],
    },
  }
}

function ArtisanCard({ product }: { product: Product }) {
  const artisan = getArtisan(product.artisanSlug)
  if (!artisan) return null

  return (
    <div className="mt-8 flex flex-col gap-4 rounded-lg border border-line bg-white p-4 sm:flex-row sm:items-center sm:p-5">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
        <Image
          src={artisan.portrait}
          alt={artisan.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-[0.12em] text-ash">Meet the maker</p>
        <h2 className="text-lg text-ink">{artisan.name}</h2>
        <p className="text-sm text-body">
          {artisan.craft} · {artisan.region} · {artisan.yearsActive} years of practice
        </p>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-body">{artisan.shortBio}</p>
      </div>
      <Link href={`/artisan/${artisan.slug}`} className="tp_btn w-full shrink-0 sm:w-auto">
        Visit shop
      </Link>
    </div>
  )
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) notFound()

  const artisan = getArtisan(product.artisanSlug)
  const related = relatedProducts(product, 4)
  const productReviews = reviewsForProduct(product.slug)

  return (
    <>
      <div className="border-b border-line bg-mist py-4">
        <div className="container-kc">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-ash">
            <Link href="/" className="transition hover:text-primary">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/shop" className="transition hover:text-primary">
              Shop
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="transition hover:text-primary"
            >
              {product.category}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="section-kc bg-white">
        <div className="container-kc">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            <ProductGallery images={product.images} name={product.name} />

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <StarRating rating={product.rating} showValue count={product.reviewCount} size={15} />
                <a href="#reviews" className="text-xs font-medium text-primary hover:underline">
                  Read reviews
                </a>
              </div>

              <div className="mt-3">
                <PurchasePanel product={product} artisanName={artisan?.name ?? 'Kezia Craft'} />
              </div>

              <div className="mt-5 flex flex-wrap gap-4 text-xs text-body">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                  Made in {product.region}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-primary" aria-hidden="true" />
                  Delivery in 2 to 5 days
                </span>
              </div>

              <ArtisanCard product={product} />
            </div>
          </div>

          <div className="mt-10 max-w-3xl">
            <h2 className="text-xl text-ink sm:text-2xl">About this piece</h2>
            <p className="mt-2 text-sm leading-relaxed text-body sm:text-base">{product.description}</p>
            <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
              {artisan
                ? `Made in ${artisan.name} studio in ${artisan.region}. ${artisan.shortBio}`
                : 'Made by hand in an East African artisan studio.'}
            </p>
          </div>
        </div>
      </section>

      <ReviewsSection
        productSlug={product.slug}
        initialReviews={productReviews}
        rating={product.rating}
        reviewCount={product.reviewCount}
      />

      <section className="section-kc bg-white">
        <div className="container-kc">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl text-ink sm:text-3xl">You may also like</h2>
            <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="more_btn">
              More {product.category.toLowerCase()}
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {related.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.08} y={24}>
                <ProductCard
                  product={{
                    ...item,
                    artisanName: getArtisan(item.artisanSlug)?.name ?? 'Kezia Craft',
                  }}
                />
              </Reveal>
            ))}
          </div>

          <Link href="/shop" className="more_btn mt-8 inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to the shop
          </Link>
        </div>
      </section>
    </>
  )
}
