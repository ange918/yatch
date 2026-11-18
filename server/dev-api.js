import http from 'node:http'
import fs from 'node:fs'
import { handleContactRequest } from './contact/handler.js'

function loadEnvFile(file) {
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

loadEnvFile('.env')
loadEnvFile('.env.local')

const port = Number(process.env.API_PORT || 3001)
const hasRealTransport = Boolean(
  (process.env.RESEND_API_KEY || '').trim()
  || (process.env.SMTP_HOST || '').trim(),
)
const sink = process.env.CONTACT_DEV_SINK === '1' || !hasRealTransport

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
  if (nodeReq.headers.host) headers.set('x-forwarded-host', nodeReq.headers.host)
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

const server = http.createServer(async (nodeReq, nodeRes) => {
  try {
    const chunks = []
    for await (const chunk of nodeReq) chunks.push(chunk)
    const body = Buffer.concat(chunks)
    const host = nodeReq.headers.host || `127.0.0.1:${port}`
    const request = new Request(`http://${host}${nodeReq.url}`, {
      method: nodeReq.method,
      headers: nodeHeaders(nodeReq),
      body: nodeReq.method === 'GET' || nodeReq.method === 'HEAD' ? undefined : body,
    })
    const response = await handleContactRequest(request, {
      limits: { windowMs: 60_000, max: 30 },
      ...(sink ? { sendMail: devSendMail } : {}),
    })
    nodeRes.statusCode = response.status
    response.headers.forEach((value, key) => nodeRes.setHeader(key, value))
    nodeRes.end(Buffer.from(await response.arrayBuffer()))
  } catch (error) {
    console.error('[contact:dev] crash', error?.name || 'error')
    nodeRes.statusCode = 500
    nodeRes.setHeader('Content-Type', 'application/json; charset=utf-8')
    nodeRes.end(JSON.stringify({ ok: false, error: 'send_failed' }))
  }
})

server.listen(port, '127.0.0.1', () => {
  const mode = sink ? 'simulation (aucun e-mail réel)' : 'envoi réel'
  console.log(`[contact:dev] http://127.0.0.1:${port}/api/contact — ${mode}`)
})
