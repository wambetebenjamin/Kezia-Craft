import Link from 'next/link'
import { SITE, whatsappLink } from '@/lib/site'

export type LegalSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}) {
  return (
    <>
      <section className="border-b border-line bg-mist py-8 sm:py-12">
        <div className="container-kc">
          <nav aria-label="Breadcrumb" className="text-xs text-ash">
            <Link href="/" className="transition hover:text-primary">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-ink">Legal</span>
            <span aria-hidden="true"> / </span>
            <span className="text-ink">{title}</span>
          </nav>
          <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl">{title}</h1>
          <p className="mt-2 text-xs uppercase tracking-[0.1em] text-ash">Last updated {updated}</p>
        </div>
      </section>

      <section className="section-kc bg-white">
        <div className="container-kc">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_16rem]">
            <article className="max-w-3xl">
              <p className="text-sm leading-relaxed text-body sm:text-base">{intro}</p>

              {sections.map((section, index) => (
                <section key={section.heading} className="mt-7">
                  <h2 className="text-lg text-ink sm:text-xl">
                    {index + 1}. {section.heading}
                  </h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph.slice(0, 20)} className="mt-2 text-sm leading-relaxed text-body">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-2 space-y-1.5">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet.slice(0, 20)}
                          className="flex gap-2 text-sm leading-relaxed text-body"
                        >
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <div className="mt-9 rounded-lg border border-line bg-mist p-5">
                <h2 className="text-base font-semibold text-ink">Questions about this policy</h2>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Email {SITE.email} or message us on{' '}
                  <a
                    href={whatsappLink('Hi Kezia Craft, I have a question about your legal policies.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary hover:underline"
                  >
                    WhatsApp +254 112 272 061
                  </a>
                  . Our data protection contact replies within five working days.
                </p>
              </div>
            </article>

            <aside className="hidden lg:block">
              <nav aria-label="On this page" className="sticky top-[90px] rounded-lg border border-line p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ash">On this page</p>
                <ol className="mt-3 space-y-2">
                  {sections.map((section, index) => (
                    <li key={section.heading} className="text-xs leading-relaxed text-body">
                      {index + 1}. {section.heading}
                    </li>
                  ))}
                </ol>
                <div className="mt-4 space-y-1.5 border-t border-line pt-3">
                  <Link href="/legal/privacy-policy" className="block text-xs text-body transition hover:text-primary">
                    Privacy policy
                  </Link>
                  <Link href="/legal/terms" className="block text-xs text-body transition hover:text-primary">
                    Terms of service
                  </Link>
                  <Link href="/legal/cookie-policy" className="block text-xs text-body transition hover:text-primary">
                    Cookie policy
                  </Link>
                </div>
              </nav>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
