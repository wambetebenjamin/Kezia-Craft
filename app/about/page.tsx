import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, HandHeart, Leaf, MapPin, Users } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { EnquiryForm } from '@/components/enquiry-form'
import { ImpactCounter } from '@/components/home/impact-counter'
import { whatsappLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Our story',
  description:
    'Kezia Craft connects East African artisans with local and international buyers. Read our mission, impact story, team and partners.',
}

const values = [
  {
    Icon: HandHeart,
    title: 'The maker comes first',
    copy: 'Makers set their own prices and are paid within 48 hours of delivery. No consignment, no waiting.',
  },
  {
    Icon: Leaf,
    title: 'Materials close to home',
    copy: 'Sisal from Kiambu, clay from Lake Victoria, fallen olive wood from the Rift Valley, hides from Limuru.',
  },
  {
    Icon: Users,
    title: 'Craft as a livelihood',
    copy: 'We train and employ young people in every studio we work with, with a focus on women led workshops.',
  },
  {
    Icon: MapPin,
    title: 'Rooted, not extracted',
    copy: 'Every product page names the maker and the region. Buyers know exactly whose hands made their piece.',
  },
]

const team = [
  {
    name: 'Keziah Wambui',
    role: 'Founder and CEO',
    location: 'Nairobi',
    image: '/images/team-keziah.jpg',
    bio: 'Grew up between a weaving cooperative in Gatundu and a market stall in Nairobi.',
  },
  {
    name: 'Otieno Were',
    role: 'Head of maker success',
    location: 'Kisumu',
    image: '/images/team-otieno.jpg',
    bio: 'Former leather workshop owner who now visits every new studio on Lake Victoria.',
  },
  {
    name: 'Halima Mwinyi',
    role: 'Quality and storytelling',
    location: 'Mombasa',
    image: '/images/team-halima.jpg',
    bio: 'Writes the maker stories and checks every product before it is listed.',
  },
  {
    name: 'Naserian Sironka',
    role: 'Logistics and community',
    location: 'Kajiado',
    image: '/images/team-naserian.jpg',
    bio: 'Coordinates courier pickups from workshops and runs our beadwork training circle.',
  },
]

const partners = [
  { name: 'Kenya Craft Council', detail: 'Craft standards and artisan certification' },
  { name: 'Maasai Craft Trust', detail: 'Community enterprise and beadwork training' },
  { name: 'Sarakasi Trust', detail: 'Youth arts and market access programmes' },
  { name: 'Lake Victoria Artisans Network', detail: 'Pottery and weaving cooperatives in Kisumu' },
  { name: 'Kenya National Chamber of Commerce', detail: 'Export readiness and trade advice' },
  { name: 'Mombasa Swahili Craft Expo', detail: 'Coastal market showcases twice a year' },
]

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-mist py-10 sm:py-14">
        <div className="container-kc">
          <nav aria-label="Breadcrumb" className="text-xs text-ash">
            <Link href="/" className="transition hover:text-primary">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-ink">About</span>
          </nav>
          <div className="mt-4 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Our story</span>
              <h1 className="mt-2 text-2xl leading-tight sm:text-3xl lg:text-4xl">
                A marketplace built with makers, not around them
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
                Kezia Craft began in 2019 with a stall of kiondo baskets and a WhatsApp group of
                eleven weavers in Kiambu. Today we work with 480 makers across 47 counties, selling
                to buyers in Kenya and 26 other countries.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link href="/artisans" className="bg_btn w-full sm:w-auto">
                  Meet the makers
                </Link>
                <Link href="/sell" className="tp_btn w-full sm:w-auto">
                  Sell with us
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src="/images/hero-market.jpg"
                alt="Handmade crafts on display at a Kenyan market"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-kc bg-white">
        <div className="container-kc">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="eyebrow">Our mission</span>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl">
                Handmade in Africa. Delivered to your door.
              </h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-body sm:text-base">
              <p>
                Craft in East Africa is not a hobby. It is a livelihood that supports families,
                pays school fees and keeps knowledge moving between generations. Yet most makers
                still sell at the roadside or through middlemen who take the larger share.
              </p>
              <p>
                Kezia Craft exists to change that. We photograph and write up every collection with
                the maker, price it honestly and deliver it to buyers who care where things come
                from. In return, makers keep the majority of every sale.
              </p>
              <p>
                We are a small Kenyan company. Our team visits studios in person, answers the
                WhatsApp line ourselves and reinvests a share of every order into training for young
                people entering the craft.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ImpactCounter />

      <section className="section-kc bg-white">
        <div className="container-kc">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">What we hold to</span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl">Four things we do not compromise</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, copy }, index) => (
              <Reveal key={title} delay={index * 0.08} y={22}>
                <div className="h-full rounded-lg border border-line bg-mist p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-ink">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-kc bg-mist">
        <div className="container-kc">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">The team</span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl">Small team, wide map</h2>
            <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
              Four people, one WhatsApp line and a lot of bus tickets between Nairobi, Kisumu,
              Mombasa and Kajiado.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.08} y={26}>
                <div className="card-kc h-full overflow-hidden">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg text-ink">{member.name}</h3>
                    <p className="text-xs uppercase tracking-[0.1em] text-primary">{member.role}</p>
                    <p className="mt-1 text-xs text-ash">{member.location}</p>
                    <p className="mt-2 text-sm leading-relaxed text-body">{member.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-kc bg-white">
        <div className="container-kc">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <div>
              <span className="eyebrow">Partners</span>
              <h2 className="mt-2 text-2xl sm:text-3xl">Organisations we work with</h2>
              <p className="mt-3 text-sm leading-relaxed text-body">
                We work alongside craft councils, community trusts and trade bodies who share our
                commitment to fair pay and honest storytelling.
              </p>
              <a
                href={whatsappLink('Hi Kezia Craft, I would like to explore a partnership.')}
                target="_blank"
                rel="noopener noreferrer"
                className="more_btn mt-4 inline-flex items-center gap-1"
              >
                Partner with us <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="rounded-lg border border-line bg-mist p-4 transition hover:border-primary/40"
                >
                  <p className="font-display text-lg text-ink">{partner.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-body">{partner.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-kc bg-mist">
        <div className="container-kc">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-start">
            <div>
              <span className="eyebrow">Contact</span>
              <h2 className="mt-2 text-2xl sm:text-3xl">Talk to a person, not a bot</h2>
              <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
                Our team in Nairobi answers the WhatsApp line between 8am and 6pm, Monday to
                Saturday. For orders, include your order number so we can help faster.
              </p>
              <dl className="mt-5 space-y-3 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-ash">Email</dt>
                  <dd className="text-ink">hello@keziacraft.co.ke</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-ash">WhatsApp</dt>
                  <dd>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline"
                    >
                      +254 112 272 061
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-ash">Studio visits</dt>
                  <dd className="text-ink">By appointment, Nairobi</dd>
                </div>
              </dl>
            </div>

            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  )
}
