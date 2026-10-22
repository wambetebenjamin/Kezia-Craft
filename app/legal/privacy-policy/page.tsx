import type { Metadata } from 'next'
import { LegalPage, type LegalSection } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'How Kezia Craft collects, uses and protects your personal data under the Kenya Data Protection Act 2019.',
}

const sections: LegalSection[] = [
  {
    heading: 'Who we are',
    paragraphs: [
      'Kezia Craft is an artisan marketplace registered in Kenya, with its office in Nairobi. We are the data controller for personal data collected through this website, and we handle that data in line with the Kenya Data Protection Act 2019 (KDPA) and the General Regulations made under it.',
      'Where an artisan sells through the marketplace, the artisan is an independent data controller for the delivery information they need to fulfil your order. We share only what is necessary for that purpose.',
    ],
  },
  {
    heading: 'The personal data we collect',
    bullets: [
      'Account data: name, email address, password (stored only as a salted hash) and, if you choose Google sign in, your Google name and email.',
      'Order data: delivery name, email, phone number, address, county, delivery notes, items ordered and payment method. We never store full card numbers on our servers.',
      'Artisan application data: name, email, phone, craft type, county, biography and sample product descriptions.',
      'Review data: the display name and review text you submit about a product.',
      'Newsletter data: your email address and the date you subscribed.',
      'Technical data: IP address, browser type, device type and pages visited, collected through analytics cookies where you consent.',
    ],
  },
  {
    heading: 'Why we use your data and our lawful basis',
    bullets: [
      'To create your account and keep you logged in. Lawful basis: performance of a contract.',
      'To process, pack and deliver your order and to email you a confirmation. Lawful basis: performance of a contract.',
      'To review artisan applications and contact applicants. Lawful basis: legitimate interest and, where required, consent.',
      'To protect the site against spam and abuse using reCAPTCHA. Lawful basis: legitimate interest in keeping the service secure.',
      'To send our monthly letter, only where you have subscribed. Lawful basis: consent, which you can withdraw at any time.',
      'To understand how the site is used so we can improve it. Lawful basis: consent through the cookie banner.',
    ],
  },
  {
    heading: 'Cookies and similar technologies',
    paragraphs: [
      'We use necessary cookies and local storage to keep your cart, login session and cookie choices working. Analytics and marketing cookies are set only if you accept them in the cookie banner. You can change your choice at any time by clearing the kezia-craft-cookie-consent entry in your browser storage and reloading the page.',
      'See our cookie policy for the full list of categories and storage keys.',
    ],
  },
  {
    heading: 'Who we share data with',
    bullets: [
      'The artisan whose product you ordered, limited to the delivery details needed to pack and send the parcel.',
      'Delivery partners and couriers, limited to name, phone, address and parcel details.',
      'Payment providers, for the purpose of collecting payment. M-Pesa payments are processed by Safaricom, card payments by our payment processor.',
      'Our email provider, for transactional email and the newsletter.',
      'Google, for reCAPTCHA verification and, where configured, Google sign in.',
      'Professional advisers, regulators or law enforcement, where we are legally required to disclose information.',
      'We do not sell your personal data, and we do not share it for third party advertising.',
    ],
  },
  {
    heading: 'International transfers',
    paragraphs: [
      'Some of our service providers process data outside Kenya, including in the European Union and the United States. Where that happens we rely on appropriate safeguards, including contractual clauses that require the recipient to protect your data to a standard consistent with the KDPA.',
    ],
  },
  {
    heading: 'How long we keep data',
    bullets: [
      'Account data: while your account is active, then 12 months after your last order.',
      'Order and payment records: seven years, as required by Kenyan tax and company law.',
      'Artisan applications: 24 months from the date of application.',
      'Newsletter subscriptions: until you unsubscribe, plus 30 days for suppression.',
      'Server logs and analytics: up to 14 months.',
    ],
  },
  {
    heading: 'Your rights under the KDPA',
    paragraphs: ['You can exercise any of the following rights by emailing us. We respond within 30 days.'],
    bullets: [
      'Be informed of how your data is used.',
      'Access a copy of the personal data we hold about you.',
      'Correct data that is inaccurate, incomplete or out of date.',
      'Delete data we no longer have a lawful reason to keep.',
      'Object to, or restrict, processing based on legitimate interest.',
      'Withdraw consent at any time, without affecting earlier processing.',
      'Receive your data in a structured, machine readable format (portability).',
      'Lodge a complaint with the Office of the Data Protection Commissioner in Nairobi.',
    ],
  },
  {
    heading: 'Security',
    paragraphs: [
      'We use HTTPS across the site, hash passwords with scrypt and a unique salt, restrict access to order data to staff who need it, and verify form submissions with reCAPTCHA. No system is completely secure, but if a breach occurs that is likely to result in a risk to your rights, we will notify the Data Protection Commissioner and affected individuals without undue delay.',
    ],
  },
  {
    heading: 'Children',
    paragraphs: [
      'The marketplace is intended for people aged 18 and over. We do not knowingly collect data from children. If you believe a child has provided us with personal data, contact us and we will delete it.',
    ],
  },
  {
    heading: 'Changes to this policy',
    paragraphs: [
      'We update this policy when our practices change. The date at the top of the page always shows the current version, and material changes are announced in our newsletter.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="12 October 2026"
      intro="This policy explains what personal data Kezia Craft collects, why we collect it, who we share it with and the rights you have under the Kenya Data Protection Act 2019."
      sections={sections}
    />
  )
}
