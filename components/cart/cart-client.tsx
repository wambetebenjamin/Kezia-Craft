'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { formatKES, FREE_SHIPPING_THRESHOLD, SHIPPING_ESTIMATE } from '@/lib/site'

export function CartClient() {
  const items = useCart((state) => state.items)
  const setQuantity = useCart((state) => state.setQuantity)
  const removeItem = useCart((state) => state.removeItem)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_ESTIMATE
  const total = subtotal + shipping
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  if (!mounted) {
    return (
      <div className="container-kc py-16">
        <div className="h-40 animate-pulse rounded-lg bg-mist" aria-hidden="true" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container-kc py-16 text-center sm:py-24">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mist text-primary">
          <ShoppingBag className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-2xl text-ink">Your cart is empty</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-body">
          Browse baskets, pottery and beadwork from makers across Kenya. Your next favourite piece is
          a few clicks away.
        </p>
        <Link href="/shop" className="bg_btn mt-6">
          Start shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container-kc py-8 sm:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-3 rounded-lg border border-line bg-white p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-4"
              >
                <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-md sm:w-32">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 128px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/product/${item.slug}`}
                    className="text-base font-medium text-ink transition hover:text-primary sm:text-lg"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs uppercase tracking-[0.1em] text-primary">{item.artisan}</p>
                  <p className="mt-1 text-sm font-semibold text-ink">{formatKES(item.price)}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
                  <div className="flex items-center gap-2 rounded-md border border-line">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="flex min-h-[44px] min-w-[44px] items-center justify-center text-ink transition hover:text-primary"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span aria-live="polite" className="w-6 text-center text-sm font-semibold text-ink">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                      className="flex min-h-[44px] min-w-[44px] items-center justify-center text-ink transition hover:text-primary"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-ash transition hover:bg-mist hover:text-alert"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <Link href="/shop" className="more_btn">
              Continue shopping
            </Link>
            <p className="text-xs text-ash">Prices include VAT. Delivery calculated at checkout.</p>
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-line bg-mist p-5 lg:sticky lg:top-[90px]">
          <h2 className="text-lg text-ink">Order summary</h2>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-body">Subtotal</dt>
              <dd className="font-medium text-ink">{formatKES(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-body">Shipping estimate</dt>
              <dd className="font-medium text-ink">
                {shipping === 0 ? 'Free' : formatKES(shipping)}
              </dd>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-base">
              <dt className="font-semibold text-ink">Total</dt>
              <dd className="font-semibold text-ink">{formatKES(total)}</dd>
            </div>
          </dl>

          {remaining > 0 && (
            <p className="mt-3 rounded-md bg-white p-3 text-xs leading-relaxed text-body">
              Add {formatKES(remaining)} more for free delivery in Nairobi.
            </p>
          )}

          <Link href="/checkout" className="bg_btn mt-5 w-full">
            Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>

          <p className="mt-3 text-center text-[11px] leading-relaxed text-ash">
            Pay with M-Pesa or card. Makers are paid within 48 hours of delivery.
          </p>
        </aside>
      </div>
    </div>
  )
}
