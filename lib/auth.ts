import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import type { Provider } from 'next-auth/providers'
import { verifyAccount } from '@/lib/accounts'

const DEMO_EMAIL = 'buyer@keziacraft.co.ke'
const DEMO_PASSWORD = 'kezia2026'

const providers: Provider[] = [
  Credentials({
    name: 'Email and password',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    authorize: async (credentials) => {
      const email = typeof credentials?.email === 'string' ? credentials.email : ''
      const password = typeof credentials?.password === 'string' ? credentials.password : ''

      if (!email || !password) return null

      const account = verifyAccount(email, password)

      if (!account) return null

      return {
        id: account.id,
        name: account.name,
        email: account.email,
        image: null,
      }
    },
  }),
]

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
}

/**
 * NEXTAUTH_SECRET signs the session cookie and must be set in every deployed
 * environment. The fallback keeps local previews working; a warning is logged
 * so a missing secret is never silent in production.
 */
const secret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET

if (!secret) {
  console.warn(
    '[kezia-craft] NEXTAUTH_SECRET is not set. Using a preview fallback. Set NEXTAUTH_SECRET before going live.'
  )
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  secret: secret ?? 'kezia-craft-preview-secret-set-NEXTAUTH_SECRET',
  session: { strategy: 'jwt' },
  trustHost: true,
  pages: { signIn: '/login' },
  callbacks: {
    authorized: async ({ auth }) => Boolean(auth),
  },
})

export const DEMO_CREDENTIALS = { email: DEMO_EMAIL, password: DEMO_PASSWORD }
