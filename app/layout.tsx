import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { LoadingScreen } from '@/components/loading-screen'
import { CookieConsent } from '@/components/cookie-consent'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { VoiceTour } from '@/components/voice-tour'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Kezia Craft | Handmade in Africa, delivered to your door',
    template: '%s | Kezia Craft',
  },
  description: SITE.description,
  keywords: [
    'Kenyan handmade',
    'East African artisans',
    'Kiondo basket',
    'Maasai beadwork',
    'African pottery',
    'artisan marketplace Kenya',
  ],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Kezia Craft | Handmade in Africa, delivered to your door',
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: 'en_KE',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#2bc0a4',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Providers>
          <LoadingScreen />
          <SiteHeader />
          <main id="main" className="min-h-[60vh]">
            {children}
          </main>
          <SiteFooter />
          <WhatsAppButton />
          <VoiceTour />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  )
}
