import Link from 'next/link'
import { Facebook, Instagram, Phone, Twitter, Youtube } from 'lucide-react'
import { Logo } from '@/components/logo'
import { NewsletterForm } from '@/components/newsletter-form'
import { SITE, whatsappLink } from '@/lib/site'

const shopLinks = [
  { href: '/shop', label: 'All products' },
  { href: '/shop?category=Baskets', label: 'Baskets and weaving' },
  { href: '/shop?category=Beadwork', label: 'Beadwork' },
  { href: '/shop?category=Pottery', label: 'Pottery' },
  { href: '/shop?category=Leather', label: 'Leather goods' },
]

const companyLinks = [
  { href: '/artisans', label: 'Meet the makers' },
  { href: '/sell', label: 'Sell on Kezia Craft' },
  { href: '/about', label: 'Our story' },
  { href: '/orders', label: 'Order history' },
  { href: '/login', label: 'Log in' },
]

const legalLinks = [
  { href: '/legal/privacy-policy', label: 'Privacy policy' },
  { href: '/legal/terms', label: 'Terms of service' },
  { href: '/legal/cookie-policy', label: 'Cookie policy' },
]

const socials = [
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://facebook.com', label: 'Facebook', Icon: Facebook },
  { href: 'https://twitter.com', label: 'X', Icon: Twitter },
  { href: 'https://youtube.com', label: 'YouTube', Icon: Youtube },
]

export function SiteFooter() {
  return (
    <footer className="bg-night text-muted">
      <div className="container-kc py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              A marketplace for handmade goods from East African artisans. Every order is packed by
              the maker and paid out directly to them.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 text-muted transition hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Shop">
            <h3 className="pb-4 text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-muted transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="pb-4 text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-muted transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="pb-4 text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Stay close
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              New collections, maker stories and market dates. One short letter a month.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex min-h-[44px] items-center gap-2 text-sm text-muted transition hover:text-primary"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              WhatsApp +254 112 272 061
            </a>
            <p className="mt-2 text-[11px] leading-relaxed text-muted">
              We reply within one working day, Monday to Saturday.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved. {SITE.county}.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-[44px] items-center text-xs text-muted transition hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
