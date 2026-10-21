export const SITE = {
  name: 'Kezia Craft',
  tagline: 'Handmade in Africa. Delivered to your door.',
  description:
    'Kezia Craft is an East African artisan marketplace connecting makers in Kenya, Uganda and Tanzania with local and international buyers.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kezia-craft.vercel.app',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '254112272061',
  email: 'hello@keziacraft.co.ke',
  county: 'Nairobi, Kenya',
} as const

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Kezia Craft, I'd like to know more about your marketplace"

export const whatsappLink = (message: string = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message).replace(/'/g, '%27')}`

export const CATEGORIES = [
  { name: 'Weaving', slug: 'weaving', icon: 'Layers' },
  { name: 'Pottery', slug: 'pottery', icon: 'Circle' },
  { name: 'Beadwork', slug: 'beadwork', icon: 'Sparkles' },
  { name: 'Leather', slug: 'leather', icon: 'Briefcase' },
  { name: 'Woodcarving', slug: 'woodcarving', icon: 'Hammer' },
  { name: 'Textiles', slug: 'textiles', icon: 'Scissors' },
  { name: 'Jewellery', slug: 'jewellery', icon: 'Gem' },
  { name: 'Baskets', slug: 'baskets', icon: 'Package' },
] as const

export const COUNTIES = [
  'Nairobi',
  'Kisumu',
  'Mombasa',
  'Kiambu',
  'Machakos',
  'Kajiado',
  'Nakuru',
  'Uasin Gishu',
  'Kisii',
  'Kakamega',
  'Meru',
  'Kilifi',
] as const

export const REGIONS = ['Nairobi', 'Kisumu', 'Mombasa', 'Kajiado', 'Eldoret', 'Machakos'] as const

export const CRAFT_TYPES = [
  'Weaving',
  'Pottery',
  'Beadwork',
  'Leather',
  'Woodcarving',
  'Textiles',
  'Jewellery',
  'Baskets',
] as const

export const formatKES = (value: number) =>
  `KES ${new Intl.NumberFormat('en-KE', { maximumFractionDigits: 0 }).format(value)}`

export const FREE_SHIPPING_THRESHOLD = 5000
export const SHIPPING_ESTIMATE = 350
