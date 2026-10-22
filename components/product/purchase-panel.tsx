'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Heart, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart, useWishlist } from '@/lib/cart'
import { formatKES } from '@/lib/site'
import type { Product } from '@/lib/data'

export function PurchasePanel({
  product,
  artisanName,
}: {
  product: Pick<Product, 'id' | 'slug' | 'name' | 'price' | 'image' | 'materials' | 'dimensions' | 'care'>
  artisanName: string
}) {
  const [quantity, setQuantity] = useState(1)
  const [bounced, setBounced] = useState(false)
  const [added, setAdded] = useState(false)
  const addItem = useCart((state) => state.addItem)
  const wishlist = useWishlist((state) => state.ids)
  const toggleWishlist = useWishlist((state) => state.toggle)
  const inWishlist = wishlist.includes(product.id)

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        artisan: artisanName,
        price: product.price,
        image: product.image,
      },
      quantity
    )
    setBounced(true)
    setAdded(true)
    window.setTimeout(() => setBounced(false), 320)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{artisanName}</p>
      <h1 className="mt-2 text-2xl leading-tight text-ink sm:text-3xl lg:text-4xl">{product.name}</h1>
      <p className="mt-3 text-xl font-semibold text-ink sm:text-2xl">{formatKES(product.price)}</p>

      <dl className="mt-5 space-y-2 border-y border-line py-4 text-sm">
        <div className="flex gap-2">
          <dt className="w-32 shrink-0 text-ash">Materials</dt>
          <dd className="text-body">{product.materials}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-32 shrink-0 text-ash">Dimensions</dt>
          <dd className="text-body">{product.dimensions}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-32 shrink-0 text-ash">Care</dt>
          <dd className="text-body">{product.care}</dd>
        </div>
      </dl>

      <span aria-live="polite" className="sr-only">
        {added ? `${product.name} added to your cart` : ''}
      </span>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="flex min-h-[46px] items-center rounded-md border border-line">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            aria-label="Decrease quantity"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-ink transition hover:text-primary disabled:opacity-40"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span aria-live="polite" className="w-10 text-center text-sm font-semibold text-ink">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(20, value + 1))}
            aria-label="Increase quantity"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-ink transition hover:text-primary"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="submit_btn min-w-[180px] flex-1 transition-transform duration-300 sm:flex-none"
          style={{ transform: bounced ? 'translateY(-3px) scale(0.97)' : undefined }}
        >
          {added ? (
            <>
              <Check className="mr-2 h-4 w-4" aria-hidden="true" /> Added to cart
            </>
          ) : (
            <>
              <ShoppingBag className="mr-2 h-4 w-4" aria-hidden="true" /> Add to Cart
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={inWishlist}
          className={`tp_btn min-h-[46px] w-full sm:w-auto ${inWishlist ? 'text-primary' : ''}`}
        >
          <Heart
            className={`mr-2 h-4 w-4 ${inWishlist ? 'fill-primary text-primary' : ''}`}
            aria-hidden="true"
          />
          {inWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
        </button>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-ash">
        {inWishlist
          ? 'Saved to your wishlist on this device, so you can come back to it later.'
          : 'Free delivery in Nairobi on orders over KES 5,000. Countrywide delivery in 2 to 5 days.'}
      </p>

      <Link href="/cart" className="more_btn mt-3 inline-block">
        View your cart
      </Link>
    </div>
  )
}
