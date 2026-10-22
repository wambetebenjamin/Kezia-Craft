import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

export type Account = {
  id: string
  name: string
  email: string
  salt: string
  hash: string
  createdAt: string
}

type AccountStore = Map<string, Account>

const globalWithAccounts = globalThis as typeof globalThis & {
  __keziaAccounts?: AccountStore
}

const store: AccountStore = (globalWithAccounts.__keziaAccounts ??= new Map<string, Account>())

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString('hex')
}

function normalise(email: string) {
  return email.trim().toLowerCase()
}

export function createAccount({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}): { ok: true; account: Omit<Account, 'salt' | 'hash'> } | { ok: false; error: string } {
  const key = normalise(email)

  if (store.has(key)) {
    return { ok: false, error: 'An account with this email already exists. Please log in.' }
  }

  const salt = randomBytes(16).toString('hex')
  const account: Account = {
    id: `buyer-${Date.now().toString(36)}`,
    name: name.trim(),
    email: key,
    salt,
    hash: hashPassword(password, salt),
    createdAt: new Date().toISOString(),
  }

  store.set(key, account)

  return {
    ok: true,
    account: { id: account.id, name: account.name, email: account.email, createdAt: account.createdAt },
  }
}

export function verifyAccount(email: string, password: string) {
  const account = store.get(normalise(email))
  if (!account) return null

  const candidate = Buffer.from(hashPassword(password, account.salt), 'hex')
  const expected = Buffer.from(account.hash, 'hex')

  if (candidate.length !== expected.length) return null
  if (!timingSafeEqual(candidate, expected)) return null

  return { id: account.id, name: account.name, email: account.email }
}

// Seeded buyer so the storefront can be reviewed without registering.
if (!store.has('buyer@keziacraft.co.ke')) {
  const salt = randomBytes(16).toString('hex')
  store.set('buyer@keziacraft.co.ke', {
    id: 'buyer-1',
    name: 'Amani Wanjala',
    email: 'buyer@keziacraft.co.ke',
    salt,
    hash: hashPassword('kezia2026', salt),
    createdAt: new Date('2026-01-12').toISOString(),
  })
}
