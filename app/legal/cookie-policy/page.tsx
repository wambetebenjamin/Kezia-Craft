import type { Metadata } from 'next'
import { LegalPage, type LegalSection } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Cookie policy',
  description:
    'The cookies and local storage keys Kezia Craft uses, what each category does and how to change your consent.',
}

const sections: LegalSection[] = [
  {
    heading: 'What cookies are',
    paragraphs: [
      'Cookies are small text files stored in your browser. We also use local storage, which works in a similar way but stays in your browser until it is cleared. Together they let the shop remember your cart, keep you logged in and understand which pages are useful.',
    ],
  },
  {
    heading: 'Necessary cookies and storage',
    paragraphs: ['These are required for the marketplace to work and cannot be switched off.'],
    bullets: [
      'kezia-craft-cart: stores the items in your cart and their quantities.',
      'kezia-craft-wishlist: remembers the products you saved.',
      'kezia-craft-cookie-consent: stores your cookie choices and never leaves your device.',
      'next-auth.session-token: a secure, http only cookie that keeps you logged in.',
      'Strictly necessary security cookies set by Google reCAPTCHA to distinguish people from automated submissions.',
    ],
  },
  {
    heading: 'Functional storage',
    paragraphs: [
      'Functional cookies remember choices such as your last viewed product and whether you have already heard the voice tour. They are optional, and the site still works without them.',
    ],
  },
  {
    heading: 'Analytics cookies',
    paragraphs: [
      'With your consent we use Vercel Analytics and Speed Insights to count visits and measure page performance. Reports are aggregated and do not identify you personally. If you decline, no analytics cookies are set.',
    ],
  },
  {
    heading: 'Marketing cookies',
    paragraphs: [
      'Marketing cookies measure whether our artisan stories reach new buyers on social platforms. They are off by default and only set if you accept marketing cookies in the banner.',
    ],
  },
  {
    heading: 'Third party services',
    bullets: [
      'Google reCAPTCHA protects our forms against spam and may set cookies on pages where a form appears.',
      'Google Fonts serves the Poppins and Playfair Display typefaces. Our font requests do not include tracking cookies.',
      'Stripe or our card processor may set fraud prevention cookies on the hosted payment page only.',
    ],
  },
  {
    heading: 'How to change your choices',
    paragraphs: [
      'Click Manage Preferences in the cookie banner to allow or refuse functional, analytics and marketing storage. Your choice is saved under kezia-craft-cookie-consent. To be asked again, clear that entry in your browser storage (or clear site data) and reload the page.',
      'You can also block or delete cookies in your browser settings. Blocking necessary cookies will stop the cart and login from working.',
    ],
  },
  {
    heading: 'Your rights',
    paragraphs: [
      'Cookie data that can identify you is personal data under the Kenya Data Protection Act 2019. Our privacy policy explains your rights of access, correction, deletion and objection, and how to contact the Office of the Data Protection Commissioner.',
    ],
  },
]

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie policy"
      updated="12 October 2026"
      intro="This policy lists the cookies and local storage keys Kezia Craft uses, grouped by category, and explains how to change your consent."
      sections={sections}
    />
  )
}
