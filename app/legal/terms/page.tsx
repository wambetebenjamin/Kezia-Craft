import type { Metadata } from 'next'
import { LegalPage, type LegalSection } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Terms of service',
  description:
    'Marketplace terms for buyers and sellers using Kezia Craft, a Kenyan artisan marketplace.',
}

const sections: LegalSection[] = [
  {
    heading: 'About these terms',
    paragraphs: [
      'These terms govern your use of the Kezia Craft website and marketplace. By browsing, buying or applying to sell, you agree to them. If you do not agree, please do not use the site.',
      'Kezia Craft is operated by Kezia Craft Limited, a company registered in Kenya with its office in Nairobi. In these terms "we", "us" and "our" mean Kezia Craft, and "you" means a buyer, a visitor or an artisan seller.',
    ],
  },
  {
    heading: 'Accounts',
    bullets: [
      'You must be 18 or older to create an account or place an order.',
      'Provide accurate details and keep your password private. You are responsible for activity on your account.',
      'We may suspend or close an account that breaches these terms, misuses the marketplace or repeatedly cancels confirmed orders.',
    ],
  },
  {
    heading: 'Buyer terms',
    bullets: [
      'Product photographs and descriptions are prepared with the maker. Handmade pieces vary slightly in colour, size and grain, and those variations are part of the craft rather than a fault.',
      'Prices are shown in Kenyan shillings and include VAT where applicable. Delivery is calculated at checkout.',
      'An order is accepted when we send you a confirmation email with an order number. If an item becomes unavailable after that, we will contact you and refund the item in full.',
      'Reviews must reflect a genuine experience. We moderate reviews for abuse, personal data and spam, and we never edit the substance of a review.',
    ],
  },
  {
    heading: 'Artisan terms',
    bullets: [
      'Artisans apply through the seller form. Acceptance is at our discretion and we may ask for photographs or a short call before listing a studio.',
      'Artisans set their own retail prices. Kezia Craft adds a commission, disclosed in your seller agreement, which is deducted from the sale price.',
      'You confirm that every product is handmade or hand finished by you or your studio, and that you have the right to sell the designs and materials used.',
      'Listings must describe materials, dimensions and care accurately. We may edit descriptions for clarity and remove listings that misrepresent a product.',
      'You are responsible for packing orders to a standard that survives courier handling. We arrange and pay for courier pickup under the seller agreement.',
      'Payouts are released within 48 hours of confirmed delivery, or 14 days after dispatch where delivery is not tracked, to the M-Pesa number or bank account on your seller profile.',
      'We may remove a studio from the marketplace for repeated late dispatch, misrepresentation or conduct that harms buyers or other makers.',
    ],
  },
  {
    heading: 'Prohibited items',
    bullets: [
      'No ivory, rhino horn, tortoiseshell, live animals, endangered species products or materials restricted under CITES or Kenyan wildlife law.',
      'No products that infringe intellectual property, including counterfeit brand goods or copied designs.',
      'No weapons, hazardous materials, medicines, food or perishable goods.',
      'No products made with forced or child labour. We will remove any listing that gives us reason to believe otherwise.',
    ],
  },
  {
    heading: 'Delivery',
    paragraphs: [
      'We deliver countrywide in Kenya through vetted couriers, usually within 2 to 5 working days, and internationally to 26 countries. Delivery timelines are estimates and may be affected by weather, customs or courier delays. Risk passes to you on delivery.',
    ],
  },
  {
    heading: 'Returns and refunds',
    bullets: [
      'You may request a return within 14 days of delivery for unused items in their original packaging.',
      'If a piece arrives damaged or is not what you ordered, contact us within 48 hours with photographs. We will arrange a replacement or a full refund, including delivery.',
      'Bespoke or personalised commissions are not eligible for return unless faulty.',
      'Refunds are made to the original payment method within 10 working days of approval. M-Pesa reversals are usually immediate.',
    ],
  },
  {
    heading: 'Payments',
    paragraphs: [
      'Payments are collected through M-Pesa or card at checkout. Card details are handled by our payment processor and never stored on Kezia Craft servers. Where payment fails we will hold your order for 24 hours before releasing the items.',
    ],
  },
  {
    heading: 'Intellectual property',
    paragraphs: [
      'The Kezia Craft name, logo, site design and written content are ours. Product photographs and maker stories are licensed to us by the artisan for use on the marketplace and in our marketing. You may not copy, scrape or resell site content without written permission.',
    ],
  },
  {
    heading: 'Liability',
    paragraphs: [
      'Nothing in these terms limits liability for death or personal injury caused by negligence, fraud, or any liability that cannot be excluded under Kenyan law. Otherwise, our liability for any order is limited to the amount you paid for that order.',
    ],
  },
  {
    heading: 'Disputes and governing law',
    paragraphs: [
      'We ask buyers and artisans to raise any issue with us first, and we will try to resolve it within 14 days. These terms are governed by the laws of Kenya, and the courts of Kenya have exclusive jurisdiction over any dispute that cannot be resolved informally.',
    ],
  },
  {
    heading: 'Changes to these terms',
    paragraphs: [
      'We may update these terms as the marketplace develops. Material changes are announced on the site and, for sellers, by email at least 14 days before they take effect.',
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      updated="12 October 2026"
      intro="These are the marketplace terms for buyers and sellers using Kezia Craft. They sit alongside our privacy policy and cookie policy."
      sections={sections}
    />
  )
}
