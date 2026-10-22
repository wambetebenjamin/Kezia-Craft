# Kezia Craft

Handmade in Africa. Delivered to your door.

Kezia Craft is an East African artisan marketplace connecting makers with local and international
buyers. This repository is the Next.js 16 storefront, built on the design system of the uploaded
`fancy-master.zip` template: same fonts, same palette, same button and heading patterns, new content.

- Live routes: `/`, `/shop`, `/product/[slug]`, `/artisans`, `/artisan/[slug]`, `/cart`, `/checkout`,
  `/orders`, `/sell`, `/login`, `/register`, `/about`, `/legal/privacy-policy`, `/legal/terms`,
  `/legal/cookie-policy`, `/500`, plus a branded 404 (`app/not-found.tsx`) and a 500 error boundary
  (`app/error.tsx`).
- API routes: `/api/products/list`, `/api/orders/place`, `/api/sellers/apply`, `/api/reviews/add`,
  `/api/newsletter/subscribe`, `/api/send-enquiry`, `/api/auth/[...nextauth]`.

## Template fidelity

The uploaded zip is a 2018 Bootstrap 4 theme (`fancy-master/`, kept untouched in this repo as a
read-only reference, see `docs/zip-structure.md`). It has no CSS custom properties, no `@font-face`
rules for text fonts, no loading screen, cookie banner, captcha, legal pages, 404 or 500 page, and its
"API" is two PHP scripts. Those were built fresh, using the template's own visual language:

| Template source | Value inherited | Where it lives now |
| --- | --- | --- |
| `scss/_variables.scss` `$pop` | `'Poppins', sans-serif` | `--font-sans`, loaded in `app/layout.tsx` |
| `scss/_variables.scss` `$play` | `'Playfair Display', serif` | `--font-display`, used for the wordmark and hero |
| `$baseColor` | `#2bc0a4` | `--color-primary` |
| `$dip` | `#232d37` | `--color-ink` |
| `$pfont` | `#51545f` | `--color-body` |
| Gradient stops | `#744fff`, `#21d397`, `#20d497` | `--color-brand`, `--color-leaf`, `--color-leaf-bright` |
| Grey scale | `#b5aec4`, `#f7f7f7`, `#e5e5e5`, `#ebebeb`, `#eeeef0`, `#7f7f7f` | `--color-muted`, `--color-mist`, `--color-line`, `--color-shell`, `--color-smoke`, `--color-ash` |
| Footer / hero dark surfaces | `#131627`, `#2b2e3d`, `#1e1e27` | `--color-night`, `--color-night-soft`, `--color-plum` |
| Accents | `#f43535`, `#f0c605`, `#8f6247` | `--color-alert`, `--color-honey`, `--color-terracotta` |
| `.read_btn`, `.tp_btn`, `.bg_btn`, `.submit_btn` | 46px tall, 3px radius, gradient sweep | `.read_btn`, `.tp_btn`, `.bg_btn`, `.submit_btn` in `app/globals.css` |
| `.main_title`, `.center_title`, `.b_center_title` | 40px/48px headings, 16px/26px lede | same class names, responsive scale |
| `box-shadow` set | `0 25px 49px rgba(58,74,88,.1)` | `--shadow-card`, `--shadow-float`, `--shadow-lift` |

No new colours, fonts, radii or shadow recipes were introduced. Every token above is declared in the
Tailwind v4 `@theme` block in `app/globals.css`.

Deviations from the numbered brief, and why:

- `@vercel/blob` is pinned to `2.8.2`. The brief's `0.29.4` does not exist on the npm registry.
- `next-auth` is `5.0.0-beta.32` rather than `5.0.0-beta.28`: beta.28 pulls `@auth/core` with
  critical advisories in `npm audit`. beta.32 also declares Next 16 support. `.npmrc` still sets
  `legacy-peer-deps=true` because beta.32 peers nodemailer 7/8 while we run 10.
- `nodemailer` is `10.1.7` rather than `6.10.1`, and `jspdf` is `4.2.1` rather than `3.0.1`, because
  the pinned versions carry high and critical advisories. `npm audit --audit-level=high` now reports
  zero vulnerabilities. `@types/nodemailer` is dropped because nodemailer 10 ships its own types.
- `motion-dom` and `motion-utils` are overridden to `12.18.2` because `framer-motion@12.18.0` breaks
  when npm hoists a newer `motion-dom`.
- `@tailwindcss/postcss@4.1.10` is added as a dev dependency, required by Tailwind v4.
- `npm run lint` runs ESLint 9 with `typescript-eslint` instead of `next lint`, which Next 16
  removed. `eslint-config-next` is deliberately not used: its `fast-glob` chain depends on `braces`,
  which has an open high severity advisory with no published fix, and the brief requires a clean
  `npm audit`. Type checking plus `next build` cover the Next.js specific rules.
- Google Fonts are linked in `app/layout.tsx` rather than `next/font`, because the template itself
  loads them over the network and the build environment has no access to `fonts.googleapis.com`.

## Getting started

```bash
npm ci
cp .env.example .env.local   # then fill in what you need
npm run dev                  # http://localhost:3000
```

Node 24 is expected (`.nvmrc`). Without optional credentials the site still runs: reCAPTCHA passes
through, mail is logged instead of sent, and KV persistence is skipped.

Demo buyer for `/login`: `buyer@keziacraft.co.ke` / `kezia2026`.

## Environment variables

All variables from the brief live in `.env.example`: `NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`,
`NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `PEXELS_API_KEY`,
`KV_REST_API_URL`, `KV_REST_API_TOKEN`, `BLOB_READ_WRITE_TOKEN`, `SMTP_HOST`, `SMTP_PORT`,
`SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`.

`RECAPTCHA_SECRET_KEY` is read only in `lib/recaptcha.ts` on the server. Google OAuth is enabled
automatically when `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are present.

## Project layout

```
app/                 routes, API handlers, global styles
components/          UI, split by feature (home, shop, product, cart, checkout, sell, auth)
lib/                 data, catalog queries, cart store, auth, recaptcha, mail, zod schemas
public/images/       Pexels photography, see image-credits.md
fancy-master/        untouched uploaded template (design reference only)
docs/                zip structure and audit notes
```

## Quality checks

```bash
npx tsc --noEmit
npm run build
npm audit --audit-level=high
```

Responsive behaviour was authored mobile first against the breakpoints in the brief (375px, 390px,
430px, 768px, 1024px, 1280px, 1536px). The category strip scrolls horizontally with CSS snap, product
imagery keeps a 4:3 ratio at every width, and the cart and checkout are single column below `lg`.

## Images

Every photo in `public/images` comes from Pexels under the Pexels License. Filenames, subjects and
photo IDs are listed in `image-credits.md`.

## Demo behaviour and limitations

The marketplace runs end to end without third party accounts, so reviewers can click through every
flow:

- **Accounts**: `lib/accounts.ts` keeps registered buyers in memory with scrypt hashed passwords and
  seeds the demo buyer. Accounts reset when the server restarts. Point `authorize` at a database
  before launch.
- **Orders, reviews, applications, enquiries**: each route validates input with Zod, verifies
  reCAPTCHA (pass through when `RECAPTCHA_SECRET_KEY` is unset), writes to Vercel KV when configured,
  and emails through Nodemailer when SMTP is configured. Order prices are always recomputed from the
  catalogue, never trusted from the client.
- **Order history**: `/orders` reads a seeded set of orders so the status badges can be reviewed.
- **Payments**: M-Pesa and card are clearly labelled placeholders. No money moves.
- **Images**: product and artisan photography lives in `public/images` and follows the product being
  sold. Named stock portraits are used for the fictional makers and team; replace them with the real
  makers before launch.

## Legal

The legal pages are practical drafts written for a Kenyan marketplace and cover the KDPA 2019, but
they are not a substitute for review by a Kenyan lawyer before launch.
