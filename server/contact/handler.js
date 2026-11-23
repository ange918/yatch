import { resolveMailer } from './mail.js'
import { buildConfirmationMessage, buildMessage } from './template.js'
import { validatePayload } from './validate.js'
import { allowRequest } from './rate-limit.js'
import { MAX_BODY_BYTES } from './limits.js'

const defaultStore = new Map()

function json(data, status, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders,
    },
  })
}

function clientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim().slice(0, 64) || 'unknown'
  return (request.headers.get('x-real-ip') || 'local').slice(0, 64)
}

function originAllowed(request) {
  const origin = request.headers.get('origin')
  if (!origin) return true
  let originHost
  try {
    originHost = new URL(origin).host
  } catch {
    return false
  }
  const hosts = [
    request.headers.get('x-forwarded-host'),
    request.headers.get('host'),
  ]
  return hosts.some((value) => value && value.split(',')[0].trim() === originHost)
}

export async function handleContactRequest(request, options = {}) {
  const env = options.env ?? process.env
  const now = (options.now ?? Date.now)()
  const store = options.rateLimitStore ?? defaultStore

  if (request.method !== 'POST') {
    return json({ ok: false, error: 'method' }, 405, { Allow: 'POST' })
  }
  if (!originAllowed(request)) {
    return json({ ok: false, error: 'forbidden' }, 403)
  }

  const contentType = request.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    return json({ ok: false, error: 'validation' }, 415)
  }
  const declared = Number(request.headers.get('content-length') || 0)
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'validation' }, 413)
  }

  if (!allowRequest(store, clientIp(request), now, options.limits)) {
    return json({ ok: false, error: 'rate_limit' }, 429)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'validation' }, 400)
  }

  const parsed = validatePayload(body, now)
  if (parsed.dropped) return json({ ok: true }, 200)
  if (!parsed.ok) return json({ ok: false, error: parsed.error }, parsed.status)

  const message = buildMessage(parsed.data, env, now)
  const confirmation = buildConfirmationMessage(parsed.data, env, now)
  if (!message || !confirmation) {
    console.error('[contact] bad_recipient')
    return json({ ok: false, error: 'send_failed' }, 503)
  }

  let send = options.sendMail
  if (!send) {
    const mailer = resolveMailer(env, options.fetchImpl)
    if (!mailer || mailer.error) {
      console.error('[contact] mail_not_configured', mailer?.error || 'missing_provider')
      return json({ ok: false, error: 'send_failed' }, 503)
    }
    send = (payload) => mailer.send(payload)
  }

  try {
    await send(message)
    await send(confirmation)
  } catch (error) {
    console.error('[contact] send_failed', error?.code || error?.name || 'error')
    return json({ ok: false, error: 'send_failed' }, 502)
  }

  return json({ ok: true }, 200)
}
