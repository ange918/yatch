import fs from 'node:fs'
import { handleContactRequest } from './contact/handler.js'

export function loadEnvFile(file) {
  if (!fs.existsSync(file)) return
  const text = fs.readFileSync(file, 'utf8')
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq <= 0) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"'))
      || (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (process.env[key] == null) process.env[key] = value
  }
}

function nodeHeaders(nodeReq) {
  const headers = new Headers()
  for (const [key, value] of Object.entries(nodeReq.headers)) {
    if (value == null) continue
    const lower = key.toLowerCase()
    if (['connection', 'keep-alive', 'transfer-encoding', 'upgrade', 'host', 'content-length'].includes(lower)) {
      continue
    }
    if (Array.isArray(value)) {
      for (const item of value) headers.append(key, item)
    } else {
      headers.set(key, value)
    }
  }
  if (!headers.has('x-forwarded-host') && nodeReq.headers.host) {
    headers.set('x-forwarded-host', nodeReq.headers.host)
  }
  return headers
}

function devSendMail(message) {
  const fail = process.env.CONTACT_DEV_FAIL === '1'
    || message.replyTo.toLowerCase().startsWith('erreur@')
  if (fail) {
    throw Object.assign(new Error('dev_simulated_failure'), { code: 'send_failed' })
  }
  console.log(`[contact:dev] simulation → ${message.to} | reply-to ${message.replyTo} | ${message.subject}`)
  return Promise.resolve()
}

export async function dispatchNodeContact(nodeReq, nodeRes, { devMode = false } = {}) {
  try {
    const chunks = []
    for await (const chunk of nodeReq) chunks.push(chunk)
    const body = Buffer.concat(chunks)
    const host = nodeReq.headers.host || '127.0.0.1:3000'
    const url = nodeReq.originalUrl || nodeReq.url || '/api/contact'
    const request = new Request(`http://${host}${url}`, {
      method: nodeReq.method,
      headers: nodeHeaders(nodeReq),
      body: nodeReq.method === 'GET' || nodeReq.method === 'HEAD' ? undefined : body,
    })

    const hasRealTransport = Boolean(
      (process.env.RESEND_API_KEY || '').trim()
      || (process.env.SMTP_HOST || '').trim(),
    )
    const useSink = process.env.CONTACT_DEV_SINK === '1' || (devMode && !hasRealTransport)

    const response = await handleContactRequest(request, {
      ...(devMode ? { limits: { windowMs: 60_000, max: 30 } } : {}),
      ...(useSink ? { sendMail: devSendMail } : {}),
    })

    nodeRes.statusCode = response.status
    response.headers.forEach((value, key) => nodeRes.setHeader(key, value))
    nodeRes.end(Buffer.from(await response.arrayBuffer()))
  } catch (error) {
    console.error('[contact] crash', error?.name || 'error')
    nodeRes.statusCode = 500
    nodeRes.setHeader('Content-Type', 'application/json; charset=utf-8')
    nodeRes.end(JSON.stringify({ ok: false, error: 'send_failed' }))
  }
}
