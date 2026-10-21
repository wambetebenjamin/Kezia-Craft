'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Check, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { formatKES } from '@/lib/site'
import { StarRating } from '@/components/star-rating'
import type { Product } from '@/lib/data'

type CardProduct = Pick<
  Product,
  'id' | 'slug' | 'name' | 'price' | 'image' | 'rating' | 'reviewCount'
> & {
  artisanName: string
  priority?: boolean
}

export function ProductCard({ product, priority = false }: { product: CardProduct; priority?: boolean }) {
  const addItem = useCart((state) => state.addItem)
  const [bounced, setBounced] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      artisan: product.artisanName,
      price: product.price,
      image: product.image,
    })
    setBounced(true)
    setAdded(true)
    window.setTimeout(() => setBounced(false), 320)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <article className="card-kc group flex h-full flex-col overflow-hidden">
      <Link href={`/product/${product.slug}`} className="block focus-visible:outline-offset-4">
        <div className="card-media">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
          {product.artisanName}
        </p>
        <h3 className="mt-1 text-lg leading-snug text-ink sm:text-xl">
          <Link href={`/product/${product.slug}`} className="transition hover:text-primary">
            {product.name}
          </Link>
        </h3>

        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-base font-semibold text-ink">{formatKES(product.price)}</p>
          <StarRating rating={product.rating} showValue count={product.reviewCount} size={13} />
        </div>

        <span aria-live="polite" className="sr-only">
          {added ? `${product.name} added to your cart` : ''}
        </span>
        <button
          type="button"
          onClick={handleAdd}
          className="submit_btn mt-4 w-full transition-transform duration-300"
          style={{ transform: bounced ? 'translateY(-3px) scale(0.97)' : undefined }}
          aria-label={`Add ${product.name} to cart`}
        >
          {added ? (
            <>
              <Check className="mr-2 h-4 w-4" aria-hidden="true" /> Added
            </>
          ) : (
            <>
              <ShoppingBag className="mr-2 h-4 w-4" aria-hidden="true" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </article>
  )
}
