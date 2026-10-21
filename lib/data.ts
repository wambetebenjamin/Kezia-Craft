export type Artisan = {
  slug: string
  name: string
  region: string
  county: string
  craft: string
  portrait: string
  cover: string
  shortBio: string
  story: string[]
  yearsActive: number
  awards: string[]
  rating: number
  whatsapp: string
  featured: boolean
}

export type Product = {
  id: string
  slug: string
  name: string
  artisanSlug: string
  category: string
  region: string
  price: number
  rating: number
  reviewCount: number
  image: string
  images: string[]
  materials: string
  dimensions: string
  care: string
  description: string
  createdAt: string
  featured: boolean
}

export type Testimonial = {
  name: string
  location: string
  quote: string
  rating: number
  product: string
}

export const artisans: Artisan[] = [
  {
    slug: 'wanjiku-mwangi',
    name: 'Wanjiku Mwangi',
    region: 'Nairobi',
    county: 'Nairobi',
    craft: 'Weaving',
    portrait: '/images/portrait-wanjiku.jpg',
    cover: '/images/weaving-cover.jpg',
    shortBio:
      'Third generation weaver turning sisal from Kiambu farms into kiondo baskets that travel the world.',
    story: [
      'Wanjiku learnt to weave at her grandmothers side in Gatundu, where sisal was harvested, stripped and dried in the courtyard before a single strand was twisted. She still works with sisal from the same farms, buying directly from three women led cooperatives in Kiambu.',
      'Her studio in Kariobangi employs nine weavers, most of them women who began as trainees and now run their own production lines. Every kiondo carries a small leather tag with the name of the person who wove it.',
      'Wanjiku travels to Nairobi trade fairs each season to meet buyers and teaches weekend classes for young people who want to keep the craft alive.',
    ],
    yearsActive: 18,
    awards: ['Kenya Craft Council, Best Weaving Studio 2024', 'Sarakasi Market, Artisan of the Year 2022'],
    rating: 4.9,
    whatsapp: '254112272061',
    featured: true,
  },
  {
    slug: 'akinyi-otieno',
    name: 'Akinyi Otieno',
    region: 'Kisumu',
    county: 'Kisumu',
    craft: 'Pottery',
    portrait: '/images/portrait-akinyi.jpg',
    cover: '/images/pottery-cover.jpg',
    shortBio:
      'A potter working with lake clay, wood fired glazes and shapes borrowed from Luo water jars.',
    story: [
      'Akinyi collects clay from the shores of Lake Victoria, ages it in covered pits behind her workshop and throws each piece by hand on a kick wheel her father built in 1998.',
      'Her work reimagines the agwata water jar as a table piece, keeping the wide shoulders and narrow neck while adding food safe glazes made from local ash.',
      'She trains six apprentices from Kisumu and runs pottery sessions for school groups every Friday afternoon.',
    ],
    yearsActive: 12,
    awards: ['Kisumu Arts Festival, Ceramics Prize 2023'],
    rating: 4.8,
    whatsapp: '254112272061',
    featured: true,
  },
  {
    slug: 'zawadi-hassan',
    name: 'Zawadi Hassan',
    region: 'Mombasa',
    county: 'Mombasa',
    craft: 'Beadwork',
    portrait: '/images/portrait-zawadi.jpg',
    cover: '/images/beadwork-cover.jpg',
    shortBio:
      'Bead artist blending coastal Swahili colour stories with Maasai beadwork techniques.',
    story: [
      'Zawadi grew up in Old Town Mombasa, where the smell of cloves and the sound of taarab drift through the streets. Her beadwork borrows the deep blues and coral reds of coastal doors and pairs them with the tight geometric stitches she learnt from Maasai friends in Kajiado.',
      'Each piece is strung on waxed cotton and finished with hand cast brass findings made by a neighbour in the same lane.',
      'She runs a beadwork circle for twelve young women in Likoni, paying school fees from the proceeds of her collections.',
    ],
    yearsActive: 9,
    awards: ['Swahili Craft Expo, Best Bead Collection 2025'],
    rating: 4.9,
    whatsapp: '254112272061',
    featured: true,
  },
  {
    slug: 'kiptoo-cheruiyot',
    name: 'Kiptoo Cheruiyot',
    region: 'Eldoret',
    county: 'Uasin Gishu',
    craft: 'Woodcarving',
    portrait: '/images/portrait-kiptoo.jpg',
    cover: '/images/portrait-kiptoo.jpg',
    shortBio:
      'Sculptor carving fallen jacaranda and olive wood into figures, bowls and serving boards.',
    story: [
      'Kiptoo works only with wood that has already fallen, sourcing jacaranda, olive and mvule from farms around Eldoret with the permission of the landowners.',
      'He carves with a small set of chisels inherited from his uncle and finishes each piece with beeswax and food safe oil instead of lacquer.',
      'His workshop takes on two apprentices each year and he teaches basic woodwork at the Eldoret technical college on Saturdays.',
    ],
    yearsActive: 21,
    awards: ['Rift Valley Craft Fair, Master Carver 2021', 'Kenya National Museum, Commissioned Sculpture 2023'],
    rating: 4.7,
    whatsapp: '254112272061',
    featured: false,
  },
  {
    slug: 'baraka-njoroge',
    name: 'Baraka Njoroge',
    region: 'Nairobi',
    county: 'Nairobi',
    craft: 'Leather',
    portrait: '/images/portrait-baraka.jpg',
    cover: '/images/leather-cover.jpg',
    shortBio:
      'Leather worker making hand stitched bags from hides tanned in Limuru and hardware cast in Nairobi.',
    story: [
      'Baraka served his apprenticeship in a small bag repair stall on River Road before opening his own workshop in Ngara. He now makes bags, belts and journal covers that are saddle stitched by hand.',
      'He buys vegetable tanned hides from a family tannery in Limuru and has every brass fitting cast by a foundry in Kariokor.',
      'Two apprentices work alongside him and a third joins each January through a local youth programme.',
    ],
    yearsActive: 14,
    awards: ['Nairobi Design Week, Best Accessory 2024'],
    rating: 4.8,
    whatsapp: '254112272061',
    featured: false,
  },
  {
    slug: 'naserian-ole-sironka',
    name: 'Naserian Ole Sironka',
    region: 'Kajiado',
    county: 'Kajiado',
    craft: 'Beadwork',
    portrait: '/images/portrait-naserian.jpg',
    cover: '/images/portrait-naserian.jpg',
    shortBio:
      'Maasai beadworker and cattle keeper translating ceremonial collars into everyday jewellery.',
    story: [
      'Naserian lives outside Kajiado town and keeps a small herd of cattle alongside her beadwork practice. The colours she uses follow the same language as ceremonial collars, with red for bravery and white for peace.',
      'She works with a women led collective of fifteen beadworkers who split every order fairly and reinvest a share into a village water project.',
      'Buyers are welcome to visit the collective on market days and see the work in progress.',
    ],
    yearsActive: 16,
    awards: ['Maasai Craft Trust, Community Enterprise Award 2024'],
    rating: 5,
    whatsapp: '254112272061',
    featured: false,
  },
]

export const products: Product[] = [
  {
    id: 'kc-001',
    slug: 'kiondo-sisal-basket',
    name: 'Kiondo Sisal Basket',
    artisanSlug: 'wanjiku-mwangi',
    category: 'Baskets',
    region: 'Nairobi',
    price: 4200,
    rating: 4.9,
    reviewCount: 46,
    image: '/images/baskets-kiondo.jpg',
    images: ['/images/baskets-kiondo.jpg', '/images/baskets-storage.jpg', '/images/weaving-cover.jpg'],
    materials: 'Hand stripped sisal, leather trim',
    dimensions: '36 cm wide x 30 cm high',
    care: 'Dust with a soft brush. Keep dry and reshape by hand if needed.',
    description:
      'A tightly woven kiondo with a vegetable tanned leather rim and handles. Each basket takes about three days to complete and holds its shape for years.',
    createdAt: '2026-09-18',
    featured: true,
  },
  {
    id: 'kc-002',
    slug: 'terracotta-serving-bowls',
    name: 'Terracotta Serving Bowls',
    artisanSlug: 'akinyi-otieno',
    category: 'Pottery',
    region: 'Kisumu',
    price: 3600,
    rating: 4.8,
    reviewCount: 32,
    image: '/images/pottery-serving.jpg',
    images: ['/images/pottery-serving.jpg', '/images/pottery-terracotta.jpg', '/images/pottery-hands.jpg'],
    materials: 'Lake clay, food safe ash glaze',
    dimensions: 'Set of 3, 14 cm to 22 cm wide',
    care: 'Hand wash with warm water. Avoid sudden temperature changes.',
    description:
      'A trio of shallow bowls thrown on the wheel and finished in a warm ash glaze. Perfect for fruit, salads or a shared dinner table.',
    createdAt: '2026-09-24',
    featured: true,
  },
  {
    id: 'kc-003',
    slug: 'maasai-beaded-cuff',
    name: 'Maasai Beaded Cuff',
    artisanSlug: 'zawadi-hassan',
    category: 'Beadwork',
    region: 'Mombasa',
    price: 1850,
    rating: 4.9,
    reviewCount: 71,
    image: '/images/beadwork-cuff.jpg',
    images: ['/images/beadwork-cuff.jpg', '/images/beadwork-hands.jpg', '/images/maasai-necklace.jpg'],
    materials: 'Glass seed beads, waxed cotton, brass clasp',
    dimensions: 'Adjustable, 18 cm to 21 cm wrist',
    care: 'Wipe with a dry cloth. Keep away from perfume and water.',
    description:
      'A wide beaded cuff stitched in the round with a brass clasp. The pattern is worked from memory in the coastal palette of deep blue and coral.',
    createdAt: '2026-10-02',
    featured: true,
  },
  {
    id: 'kc-004',
    slug: 'beaded-drop-earrings',
    name: 'Beaded Drop Earrings',
    artisanSlug: 'zawadi-hassan',
    category: 'Jewellery',
    region: 'Mombasa',
    price: 1250,
    rating: 4.7,
    reviewCount: 28,
    image: '/images/beadwork-earrings.jpg',
    images: ['/images/beadwork-earrings.jpg', '/images/beadwork-cuff.jpg', '/images/beadwork-hands.jpg'],
    materials: 'Glass seed beads, brass hooks',
    dimensions: '6 cm drop',
    care: 'Store flat in the pouch provided. Avoid contact with water.',
    description:
      'Lightweight drop earrings in a warm sunset gradient, stitched bead by bead and finished with nickel free brass hooks.',
    createdAt: '2026-09-08',
    featured: true,
  },
  {
    id: 'kc-005',
    slug: 'handwoven-kikoi-throw',
    name: 'Handwoven Kikoi Throw',
    artisanSlug: 'wanjiku-mwangi',
    category: 'Textiles',
    region: 'Nairobi',
    price: 5800,
    rating: 4.8,
    reviewCount: 19,
    image: '/images/fabric-stack.jpg',
    images: ['/images/fabric-stack.jpg', '/images/fabric-display.jpg', '/images/fabric-market.jpg'],
    materials: 'Handloomed cotton',
    dimensions: '180 cm x 100 cm',
    care: 'Cold hand wash separately. Line dry in shade.',
    description:
      'A soft cotton kikoi woven on a handloom in Nairobi, with a fringed edge and colours drawn from the Rift Valley at dusk.',
    createdAt: '2026-08-29',
    featured: true,
  },
  {
    id: 'kc-006',
    slug: 'kitenge-table-runner',
    name: 'Kitenge Table Runner',
    artisanSlug: 'naserian-ole-sironka',
    category: 'Textiles',
    region: 'Kajiado',
    price: 2400,
    rating: 4.6,
    reviewCount: 23,
    image: '/images/fabric-display.jpg',
    images: ['/images/fabric-display.jpg', '/images/fabric-market.jpg', '/images/fabric-stack.jpg'],
    materials: 'Cotton kitenge, cotton thread',
    dimensions: '200 cm x 35 cm',
    care: 'Machine wash cold on a gentle cycle. Warm iron.',
    description:
      'A bold printed runner finished with a hand turned hem. Each panel is cut from a single length of kitenge so no two runners are identical.',
    createdAt: '2026-09-12',
    featured: true,
  },
  {
    id: 'kc-007',
    slug: 'hand-thrown-clay-jug',
    name: 'Hand Thrown Clay Jug',
    artisanSlug: 'akinyi-otieno',
    category: 'Pottery',
    region: 'Kisumu',
    price: 3200,
    rating: 4.9,
    reviewCount: 14,
    image: '/images/pottery-wheel.jpg',
    images: ['/images/pottery-wheel.jpg', '/images/pottery-serving.jpg', '/images/pottery-hands.jpg'],
    materials: 'Lake clay, natural slip',
    dimensions: '24 cm high, 1.4 litre',
    care: 'Hand wash only. Not for use on direct heat.',
    description:
      'A generous jug shaped after the agwata water jar, with a pulled handle and a soft matte finish.',
    createdAt: '2026-10-06',
    featured: true,
  },
  {
    id: 'kc-008',
    slug: 'sisal-storage-basket',
    name: 'Sisal Storage Basket',
    artisanSlug: 'wanjiku-mwangi',
    category: 'Weaving',
    region: 'Nairobi',
    price: 2900,
    rating: 4.7,
    reviewCount: 37,
    image: '/images/baskets-storage.jpg',
    images: ['/images/baskets-storage.jpg', '/images/baskets-kiondo.jpg', '/images/weaving-cover.jpg'],
    materials: 'Sisal fibre, cotton cord',
    dimensions: '30 cm wide x 26 cm high',
    care: 'Dust regularly. Keep out of damp rooms.',
    description:
      'A deep storage basket with a lid, woven in a simple diagonal pattern that suits a shelf, a nursery or a bathroom corner.',
    createdAt: '2026-09-30',
    featured: true,
  },
  {
    id: 'kc-009',
    slug: 'maasai-ceremonial-collar',
    name: 'Maasai Ceremonial Collar',
    artisanSlug: 'naserian-ole-sironka',
    category: 'Beadwork',
    region: 'Kajiado',
    price: 6800,
    rating: 5,
    reviewCount: 9,
    image: '/images/maasai-necklace.jpg',
    images: ['/images/maasai-necklace.jpg', '/images/beadwork-cuff.jpg', '/images/beadwork-hands.jpg'],
    materials: 'Glass seed beads, leather backing',
    dimensions: '38 cm diameter',
    care: 'Store flat and away from direct sun. Spot clean only.',
    description:
      'A ceremonial collar worked over three weeks in the reds, whites and ochres of Maasai bead language. A statement piece for weddings and celebrations.',
    createdAt: '2026-10-11',
    featured: false,
  },
  {
    id: 'kc-010',
    slug: 'handstitched-leather-weekender',
    name: 'Handstitched Leather Weekender',
    artisanSlug: 'baraka-njoroge',
    category: 'Leather',
    region: 'Nairobi',
    price: 12500,
    rating: 4.8,
    reviewCount: 21,
    image: '/images/leather-workshop.jpg',
    images: ['/images/leather-cover.jpg', '/images/leather-workshop.jpg', '/images/portrait-baraka.jpg'],
    materials: 'Vegetable tanned leather, brass fittings',
    dimensions: '48 cm x 26 cm x 24 cm',
    care: 'Wipe with a dry cloth and condition once a year with leather balm.',
    description:
      'A weekend bag saddle stitched by hand in the Ngara workshop, lined with cotton canvas and fitted with solid brass hardware.',
    createdAt: '2026-09-21',
    featured: false,
  },
  {
    id: 'kc-011',
    slug: 'carved-ebony-figure',
    name: 'Carved Ebony Figure',
    artisanSlug: 'kiptoo-cheruiyot',
    category: 'Woodcarving',
    region: 'Eldoret',
    price: 7400,
    rating: 4.7,
    reviewCount: 11,
    image: '/images/woodcarving-market.jpg',
    images: ['/images/woodcarving-cover.jpg', '/images/woodcarving-studio.jpg', '/images/woodcarving-market.jpg'],
    materials: 'Fallen olive wood, beeswax finish',
    dimensions: '32 cm high',
    care: 'Keep out of direct sun. Refresh with beeswax once a year.',
    description:
      'A slender figure carved from fallen olive wood, shaped with hand chisels and finished with beeswax so the grain stays visible.',
    createdAt: '2026-08-19',
    featured: false,
  },
  {
    id: 'kc-012',
    slug: 'soapstone-serving-bowl',
    name: 'Soapstone Serving Bowl',
    artisanSlug: 'akinyi-otieno',
    category: 'Pottery',
    region: 'Kisumu',
    price: 3100,
    rating: 4.6,
    reviewCount: 16,
    image: '/images/pottery-terracotta.jpg',
    images: ['/images/pottery-terracotta.jpg', '/images/pottery-serving.jpg', '/images/pottery-hands.jpg'],
    materials: 'Kisii soapstone, food safe oil',
    dimensions: '26 cm wide x 9 cm deep',
    care: 'Hand wash and dry fully. Oil occasionally to keep the colour rich.',
    description:
      'A shallow serving bowl carved from soft Kisii soapstone with a smooth interior and a natural matte exterior.',
    createdAt: '2026-09-05',
    featured: false,
  },
]

export const testimonials: Testimonial[] = [
  {
    name: 'Achieng Odhiambo',
    location: 'Nairobi',
    rating: 5,
    quote:
      'My kiondo arrived in three days, beautifully wrapped with a note from the weaver. It is now the first thing guests ask about when they walk into my house.',
    product: 'Kiondo Sisal Basket',
  },
  {
    name: 'Daniel Mwende',
    location: 'Mombasa',
    rating: 5,
    quote:
      'I bought the beaded cuff for my sister and she has not taken it off since. Knowing the money goes straight to the maker makes it even better.',
    product: 'Maasai Beaded Cuff',
  },
  {
    name: 'Claire Bennett',
    location: 'London, United Kingdom',
    rating: 5,
    quote:
      'Shipping to the UK was simple and the team kept me updated on WhatsApp the whole way. The pottery is even better in person than in the photos.',
    product: 'Terracotta Serving Bowls',
  },
]

export const impactStats = [
  { label: 'Artisans supported', value: 480, suffix: '+' },
  { label: 'Orders fulfilled', value: 12400, suffix: '+' },
  { label: 'Counties reached', value: 47, suffix: '' },
  { label: 'International buyers', value: 26, suffix: '' },
]

export const getArtisan = (slug: string) => artisans.find((a) => a.slug === slug)
export const getProduct = (slug: string) => products.find((p) => p.slug === slug)
export const productsByArtisan = (slug: string) => products.filter((p) => p.artisanSlug === slug)
export const relatedProducts = (product: Product, count = 4) => {
  const pool = products.filter((p) => p.slug !== product.slug)
  const sameCategory = pool.filter((p) => p.category === product.category)
  const sameRegion = pool.filter(
    (p) => p.category !== product.category && p.region === product.region
  )
  const rest = pool.filter(
    (p) => p.category !== product.category && p.region !== product.region
  )

  return [...sameCategory, ...sameRegion, ...rest].slice(0, count)
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered'
export const demoOrders: {
  id: string
  date: string
  total: number
  status: OrderStatus
  items: { name: string; quantity: number; image: string }[]
}[] = [
  {
    id: 'KC-10428',
    date: '2026-10-12',
    total: 6050,
    status: 'Delivered',
    items: [
      { name: 'Kiondo Sisal Basket', quantity: 1, image: '/images/baskets-kiondo.jpg' },
      { name: 'Maasai Beaded Cuff', quantity: 1, image: '/images/beadwork-cuff.jpg' },
    ],
  },
  {
    id: 'KC-10502',
    date: '2026-10-18',
    total: 3600,
    status: 'Shipped',
    items: [{ name: 'Terracotta Serving Bowls', quantity: 1, image: '/images/pottery-serving.jpg' }],
  },
  {
    id: 'KC-10533',
    date: '2026-10-20',
    total: 1250,
    status: 'Pending',
    items: [{ name: 'Beaded Drop Earrings', quantity: 1, image: '/images/beadwork-earrings.jpg' }],
  },
]

export type Review = {
  id: string
  productSlug: string
  name: string
  location: string
  rating: number
  comment: string
  createdAt: string
}

export const reviews: Review[] = [
  {
    id: 'rv-1',
    productSlug: 'kiondo-sisal-basket',
    name: 'Wairimu K.',
    location: 'Nairobi',
    rating: 5,
    comment:
      'The weave is so tight and even. I use it for market runs every Saturday and it still looks new after four months.',
    createdAt: '2026-10-02',
  },
  {
    id: 'rv-2',
    productSlug: 'kiondo-sisal-basket',
    name: 'Peter M.',
    location: 'Nakuru',
    rating: 4,
    comment:
      'Lovely basket and the leather rim is beautifully stitched. Delivery took one day longer than promised but the team kept me updated.',
    createdAt: '2026-09-27',
  },
  {
    id: 'rv-3',
    productSlug: 'kiondo-sisal-basket',
    name: 'Hannah S.',
    location: 'Berlin, Germany',
    rating: 5,
    comment:
      'Shipped to Germany in nine days, packed with real care. The note from Wanjiku made it a gift worth keeping.',
    createdAt: '2026-09-14',
  },
  {
    id: 'rv-4',
    productSlug: 'terracotta-serving-bowls',
    name: 'Joyce N.',
    location: 'Kisumu',
    rating: 5,
    comment: 'These bowls live on our table now. The glaze is warm and they feel sturdy without being heavy.',
    createdAt: '2026-10-05',
  },
  {
    id: 'rv-5',
    productSlug: 'terracotta-serving-bowls',
    name: 'Martin O.',
    location: 'Eldoret',
    rating: 4,
    comment: 'Beautiful set, slightly smaller than I imagined but perfect for salads and fruit.',
    createdAt: '2026-09-19',
  },
  {
    id: 'rv-6',
    productSlug: 'maasai-beaded-cuff',
    name: 'Amina H.',
    location: 'Mombasa',
    rating: 5,
    comment: 'The colours are even richer in person. I have worn it every day for two weeks.',
    createdAt: '2026-10-10',
  },
  {
    id: 'rv-7',
    productSlug: 'handwoven-kikoi-throw',
    name: 'Grace W.',
    location: 'Nairobi',
    rating: 5,
    comment: 'Soft, light and the perfect size for a sofa. Washed it gently once and it kept its colour.',
    createdAt: '2026-09-08',
  },
  {
    id: 'rv-8',
    productSlug: 'hand-thrown-clay-jug',
    name: 'Samuel K.',
    location: 'Thika',
    rating: 5,
    comment: 'We use it for water at every meal. The shape is generous and the handle is comfortable.',
    createdAt: '2026-10-12',
  },
  {
    id: 'rv-9',
    productSlug: 'maasai-ceremonial-collar',
    name: 'Lydia A.',
    location: 'Kajiado',
    rating: 5,
    comment: 'I wore this at my sisters wedding and three people asked where it came from. Truly a piece of art.',
    createdAt: '2026-10-15',
  },
  {
    id: 'rv-10',
    productSlug: 'handstitched-leather-weekender',
    name: 'Brian T.',
    location: 'Nairobi',
    rating: 5,
    comment: 'The stitching is flawless and it has softened beautifully after two trips. Worth every shilling.',
    createdAt: '2026-10-01',
  },
  {
    id: 'rv-11',
    productSlug: 'beaded-drop-earrings',
    name: 'Faith M.',
    location: 'Machakos',
    rating: 5,
    comment: 'So light I forget I am wearing them. The colours go with everything.',
    createdAt: '2026-09-16',
  },
  {
    id: 'rv-12',
    productSlug: 'carved-ebony-figure',
    name: 'Tom R.',
    location: 'London, United Kingdom',
    rating: 4,
    comment: 'A quietly beautiful piece. The grain catches the light in the afternoon.',
    createdAt: '2026-09-02',
  },
]

export const reviewsForProduct = (slug: string) => reviews.filter((review) => review.productSlug === slug)
