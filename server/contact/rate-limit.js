import { RATE_MAX, RATE_WINDOW_MS } from './limits.js'

/**
 * Plafond en mémoire, par instance. Sur Vercel les instances ne partagent
 * pas cet état : c'est un frein simple, pas un quota global.
 */
export function allowRequest(store, key, now, limits = {}) {
  const windowMs = limits.windowMs ?? RATE_WINDOW_MS
  const max = limits.max ?? RATE_MAX

  if (store.size > 2000) {
    for (const [storedKey, hits] of store) {
      const fresh = hits.filter((stamp) => now - stamp < windowMs)
      if (fresh.length === 0) store.delete(storedKey)
      else store.set(storedKey, fresh)
    }
  }

  const fresh = (store.get(key) || []).filter((stamp) => now - stamp < windowMs)
  if (fresh.length >= max) {
    store.set(key, fresh)
    return false
  }
  fresh.push(now)
  store.set(key, fresh)
  return true
}
