'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, ShoppingBag, User, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { Logo } from '@/components/logo'
import { useCart } from '@/lib/cart'

const NAV = [
  { href: '/shop', label: 'Shop' },
  { href: '/artisans', label: 'Artisans' },
  { href: '/sell', label: 'Sell with us' },
  { href: '/about', label: 'About' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const count = useCart((state) => state.count)
  const { status } = useSession()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    const onScroll = () => setScrolled(window.scrollY > 12)

    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const cartCount = mounted ? count() : 0

  return (
    <>
      <header
        className={`sticky top-0 z-[9990] w-full border-b border-line/70 bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? 'shadow-[0_6px_24px_rgba(35,45,55,0.08)]' : ''
        }`}
      >
        <div className="container-kc flex h-[70px] items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Main" className="hidden md:flex md:items-center md:gap-7">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`link-underline relative inline-flex min-h-[44px] items-center text-sm font-medium ${
                    active ? 'text-primary' : 'text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href={status === 'authenticated' ? '/orders' : '/login'}
              className="hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-ink transition hover:bg-mist hover:text-primary sm:flex"
              aria-label={status === 'authenticated' ? 'Your orders' : 'Log in'}
            >
              <User className="h-5 w-5" />
            </Link>

            <Link
              href="/cart"
              className="relative flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-ink transition hover:bg-mist hover:text-primary"
              aria-label={`Shopping cart, ${cartCount} items`}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-ink transition hover:bg-mist md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside the header so backdrop-filter cannot clip the fixed drawer. */}
      {open && (
        <div className="fixed inset-0 z-[9995] md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-plum/50"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col rounded-l-2xl bg-white p-5 shadow-float"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-ink transition hover:bg-mist"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-7 flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center rounded-lg px-3 text-base font-medium text-ink transition hover:bg-mist hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/orders"
                onClick={() => setOpen(false)}
                className="flex min-h-[48px] items-center rounded-lg px-3 text-base font-medium text-ink transition hover:bg-mist hover:text-primary"
              >
                Orders
              </Link>
              <Link
                href={status === 'authenticated' ? '/orders' : '/login'}
                onClick={() => setOpen(false)}
                className="flex min-h-[48px] items-center rounded-lg px-3 text-base font-medium text-ink transition hover:bg-mist hover:text-primary"
              >
                {status === 'authenticated' ? 'My account' : 'Log in'}
              </Link>
            </nav>

            <div className="mt-auto grid gap-2 border-t border-line pt-5">
              <Link href="/shop" onClick={() => setOpen(false)} className="bg_btn w-full">
                Shop Now
              </Link>
              <Link href="/sell" onClick={() => setOpen(false)} className="tp_btn w-full">
                Sell on Kezia Craft
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
