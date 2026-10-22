# Template audit

Audit of `fancy-master.zip` against the brief. Paths are relative to the zip root; the extracted
copy lives in `fancy-master/` and is unchanged.

## Checklist

| Requirement | Found in the zip? | Where it lives now |
| --- | --- | --- |
| CSS custom properties | No. The template is Bootstrap 4 plus hand written Sass. There is not a single `--property` in `css/style.css`; colours are Sass variables compiled to literals. | Declared fresh, from the template's own values, in the `@theme` block of `app/globals.css`. Full list below. |
| `@font-face` rules | Only for icon fonts, in three vendor stylesheets. No text font face rules at all; Poppins and Playfair Display are pulled from Google Fonts by `scss/_variables.scss`. | Icon faces are not needed (Lucide SVG icons). Text families are inherited exactly and loaded in `app/layout.tsx`. Details below. |
| Loading screen | Absent. | Built fresh in `components/loading-screen.tsx`: animated loom with seven threads, wordmark, percentage, skip control after 3s, `role="status"`, reduced motion fallback. |
| Cookie consent banner | Absent. | `components/cookie-consent.tsx`, storage key `kezia-craft-cookie-consent`. |
| CAPTCHA integration | Absent. | `components/recaptcha.tsx` (v3 invisible, v2 fallback) and `lib/recaptcha.ts` (server verification only). |
| `/legal/privacy-policy` | Absent (`contact-us.html`, `index.html`, `static.html` only). | `app/legal/privacy-policy/page.tsx`. |
| `/legal/terms` | Absent. | `app/legal/terms/page.tsx`. |
| `/legal/cookie-policy` | Absent. | `app/legal/cookie-policy/page.tsx`. |
| 404 page | Absent. | `app/not-found.tsx`. |
| 500 page | Absent. | `app/error.tsx` (error boundary) and `app/500/page.tsx`. |
| API route files | Two PHP scripts: `api/tweet.php` and `api/config.php`, plus `contact_process.php` at the root. | Replaced by the documented Next.js handlers: `/api/products/list`, `/api/orders/place`, `/api/sellers/apply`, `/api/reviews/add`, `/api/newsletter/subscribe`, `/api/send-enquiry`, `/api/auth/[...nextauth]`. |
| `.env` variables | None. `api/config.php` hard codes Twitter consumer keys and an access token. | `.env.example` carries all 17 variables from the brief, plus `.env.local` for local development (git ignored). |

## CSS custom properties in the rebuild

Colour tokens: `--color-primary`, `--color-brand`, `--color-leaf`, `--color-leaf-bright`,
`--color-ink`, `--color-night`, `--color-night-soft`, `--color-plum`, `--color-body`, `--color-muted`,
`--color-ash`, `--color-mist`, `--color-line`, `--color-shell`, `--color-smoke`, `--color-alert`,
`--color-honey`, `--color-terracotta`, `--color-slate-soft`.

Type tokens: `--font-sans`, `--font-display`.

Shadow tokens: `--shadow-card`, `--shadow-float`, `--shadow-lift`.

Other theme tokens: `--radius-brand`, `--animate-thread`, `--animate-pulse-ring`,
`--animate-marquee-hint`.

Component level variables (defined in `:root`): `--kc-gradient-duo`, `--kc-gradient-sweep`,
`--font-pop`, `--font-play`, `--kc-gutter`, and the runtime `--kc-consent-offset` used to lift the
floating buttons and the checkout bar above the cookie banner.

## Font faces inherited from the zip

| Family | src | Weight | Style | Source |
| --- | --- | --- | --- | --- |
| `FontAwesome` | `../fonts/fontawesome-webfont.{eot,woff2,woff,ttf,svg}?v=4.7.0` | `normal` | `normal` | `css/font-awesome.min.css` |
| `ElegantIcons` | `fonts/ElegantIcons.{eot,woff,ttf,svg}` | `normal` | `normal` | `vendors/elegant-icon/style.css` |
| Themify icons | `fonts/themify.{eot,woff,ttf,svg}` | `normal` | `normal` | `vendors/themify-icon/themify-icons.css` |
| Poppins | Google Fonts, weights 300 to 900 | inherited | inherited | `scss/_variables.scss` `@import` |
| Playfair Display | Google Fonts, weight 400 | inherited | inherited | `scss/_variables.scss` `@import` |

The rebuild keeps the two text families and replaces the icon fonts with `lucide-react` SVGs, because
the marketplace uses more icon shapes than the three FontAwesome/Elegant/Themify sets provide and the
font files are 1.7 MB combined.

## Template assets not reused

`img/` photography, the Revolution Slider, Owl Carousel, parallaxer, counterup and the Twitter feed
scripts are Bootstrap-era dependencies with no place in the Next.js build. Their visual role (hero
photography, card carousels, counters, testimonial sliders) is reproduced with `next/image`,
CSS scroll snap, Framer Motion and GSAP. All photography is replaced with Pexels imagery credited in
`image-credits.md`.
