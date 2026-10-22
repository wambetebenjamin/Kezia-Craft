import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Package, Truck } from 'lucide-react'
import { auth, signOut } from '@/lib/auth'
import { demoOrders, type OrderStatus } from '@/lib/data'
import { formatKES, whatsappLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Order history',
  description: 'Track your Kezia Craft orders and delivery status.',
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  Pending: 'bg-honey/15 text-[#8a6d00]',
  Confirmed: 'bg-brand/10 text-brand',
  Shipped: 'bg-primary/15 text-primary',
  Delivered: 'bg-leaf/15 text-[#127a48]',
}

export default async function OrdersPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login?callbackUrl=/orders')
  }

  const totalSpent = demoOrders.reduce((total, order) => total + order.total, 0)

  return (
    <>
      <section className="border-b border-line bg-mist py-6 sm:py-8">
        <div className="container-kc">
          <nav aria-label="Breadcrumb" className="text-xs text-ash">
            <Link href="/" className="transition hover:text-primary">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-ink">Orders</span>
          </nav>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl text-ink sm:text-3xl">Your orders</h1>
              <p className="mt-1 text-sm text-body">
                Signed in as {session.user.email}. Every order is packed by the maker.
              </p>
            </div>
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/' })
              }}
            >
              <button type="submit" className="tp_btn w-full sm:w-auto">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section-kc bg-white">
        <div className="container-kc">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-line bg-mist p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-ash">Orders placed</p>
              <p className="mt-1 text-2xl text-ink">{demoOrders.length}</p>
            </div>
            <div className="rounded-lg border border-line bg-mist p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-ash">Total spent</p>
              <p className="mt-1 text-2xl text-ink">{formatKES(totalSpent)}</p>
            </div>
            <div className="rounded-lg border border-line bg-mist p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-ash">Artisans supported</p>
              <p className="mt-1 text-2xl text-ink">4</p>
            </div>
          </div>

          <ul className="mt-8 space-y-4">
            {demoOrders.map((order) => (
              <li key={order.id} className="rounded-lg border border-line bg-white p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">Order {order.id}</p>
                    <p className="text-xs text-ash">
                      Placed{' '}
                      {new Date(order.date).toLocaleDateString('en-KE', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`badge ${STATUS_STYLES[order.status]}`}>{order.status}</span>
                    <p className="text-sm font-semibold text-ink">{formatKES(order.total)}</p>
                  </div>
                </div>

                <ul className="mt-4 space-y-3">
                  {order.items.map((item) => (
                    <li key={item.name} className="flex items-center gap-3">
                      <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-md">
                        <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-ink">{item.name}</p>
                        <p className="text-xs text-ash">Quantity {item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="inline-flex items-center gap-2 text-xs text-body">
                    {order.status === 'Delivered' ? (
                      <>
                        <Package className="h-4 w-4 text-primary" aria-hidden="true" />
                        Delivered and signed for
                      </>
                    ) : (
                      <>
                        <Truck className="h-4 w-4 text-primary" aria-hidden="true" />
                        On the way, we will message you on WhatsApp
                      </>
                    )}
                  </p>
                  <a
                    href={whatsappLink(`Hi Kezia Craft, I have a question about order ${order.id}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="more_btn text-xs"
                  >
                    Ask about this order
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-lg border border-dashed border-line bg-mist p-5 text-center">
            <p className="text-sm text-body">
              Need something else? Browse the latest pieces from our artisans.
            </p>
            <Link href="/shop" className="bg_btn mt-4">
              Shop new arrivals
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
