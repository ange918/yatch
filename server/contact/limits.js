export const MIN_FILL_MS = 3000
export const MAX_FILL_MS = 24 * 60 * 60 * 1000
export const RATE_WINDOW_MS = 15 * 60 * 1000
export const RATE_MAX = 5
export const MAX_FILE_BYTES = Math.floor(1.2 * 1024 * 1024)
export const MAX_BODY_BYTES = 4_500_000

const DEFAULT_TO = 'contact@krediiwelt.com'

export function recipientOf(env) {
  const raw = (env.CONTACT_TO_EMAIL ?? '').trim()
  if (!raw) return DEFAULT_TO
  return raw
}

export function defaultRecipient() {
  return DEFAULT_TO
}
