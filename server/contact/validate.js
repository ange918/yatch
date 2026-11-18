import { MAX_FILE_BYTES, MAX_FILL_MS, MIN_FILL_MS } from './limits.js'

const EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const LANGS = new Set(['de', 'fr', 'nl', 'en'])
const PURPOSES = new Set(['Auto', 'Immobilien', 'Renovierung', 'Konsum', 'Sonstiges'])
const PRODUCTS = new Set(['immo', 'auto', 'privat', 'loan'])
const MIME_EXT = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'application/pdf': 'pdf',
}

export function isEmail(value) {
  return typeof value === 'string'
    && value.length <= 254
    && !value.includes('..')
    && EMAIL.test(value)
}

function hasControlChar(value, allowWhitespace) {
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i)
    if (code === 127 || code < 32) {
      if (allowWhitespace && (code === 9 || code === 10 || code === 13)) continue
      return true
    }
  }
  return false
}

function cleanLine(value, max, { required = false } = {}) {
  if (value == null || value === '') return required ? null : ''
  if (typeof value !== 'string') return null
  if (hasControlChar(value, false)) return null
  const text = value.trim().replace(/\s+/g, ' ')
  if ((required && !text) || text.length > max) return null
  return text
}

function cleanBlock(value, max, { required = false } = {}) {
  if (value == null || value === '') return required ? null : ''
  if (typeof value !== 'string') return null
  if (hasControlChar(value, true)) return null
  const text = value.replace(/\r\n/g, '\n').trim()
  if ((required && !text) || text.length > max) return null
  return text
}

function requireInteger(value, min, max) {
  let n
  if (typeof value === 'number') n = value
  else if (typeof value === 'string' && /^\d{1,10}$/.test(value.trim())) n = Number(value.trim())
  else return null
  if (!Number.isInteger(n) || n < min || n > max) return null
  return n
}

function optionalInteger(value, min, max) {
  if (value == null || value === '') return { value: '' }
  const n = requireInteger(value, min, max)
  if (n == null) return { error: true }
  return { value: String(n) }
}

function cleanPage(value) {
  const page = cleanLine(value, 200, { required: true })
  if (!page || !page.startsWith('/') || page.startsWith('//')) return null
  if (!/^\/[A-Za-z0-9/_\-.?=&%:+]*$/.test(page)) return null
  return page
}

function matchesMagic(buf, type) {
  if (type === 'image/jpeg') {
    return buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff
  }
  if (type === 'image/png') {
    return buf.length >= 8
      && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47
  }
  if (type === 'application/pdf') {
    return buf.length >= 5 && buf.subarray(0, 5).toString('utf8') === '%PDF-'
  }
  return false
}

function sanitizeFilename(name, ext) {
  const base = String(name || 'document')
    .split(/[/\\]/)
    .pop()
    .replace(/[^A-Za-z0-9._-]/g, '_')
    .replace(/^\.+/, '')
    .slice(0, 60) || 'document'
  const lower = base.toLowerCase()
  if (lower.endsWith(`.${ext}`)) return base
  return `${base}.${ext}`
}

function readFile(file, label) {
  if (file == null || file === '') return { value: null }
  if (typeof file !== 'object' || Array.isArray(file)) return { error: true }
  const type = MIME_EXT[file.type] ? file.type : null
  if (!type) return { error: true }
  if (typeof file.data !== 'string' || file.data.length > Math.ceil(MAX_FILE_BYTES * 1.4)) {
    return { error: true }
  }
  if (!/^[A-Za-z0-9+/=\s]+$/.test(file.data)) return { error: true }
  const buf = Buffer.from(file.data.replace(/\s/g, ''), 'base64')
  if (buf.length === 0 || buf.length > MAX_FILE_BYTES || !matchesMagic(buf, type)) {
    return { error: true }
  }
  return {
    value: {
      filename: sanitizeFilename(file.name, MIME_EXT[type]),
      contentType: type,
      content: buf,
      label,
    },
  }
}

function spam(status = 400) {
  return { ok: false, error: 'spam', status }
}

export function validatePayload(body, now) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, error: 'validation', status: 400 }
  }

  const trap = body.company_website
  if (!(trap == null || trap === '')) {
    return { ok: true, dropped: true }
  }

  const started = typeof body.startedAt === 'number' ? body.startedAt : Number(body.startedAt)
  if (!Number.isFinite(started)) return spam()
  const elapsed = now - started
  if (started > now + 60_000 || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) return spam()

  const form = body.form
  if (form !== 'contact' && form !== 'loan') {
    return { ok: false, error: 'validation', status: 400 }
  }
  if (!LANGS.has(body.lang)) {
    return { ok: false, error: 'validation', status: 400 }
  }
  const page = cleanPage(body.page)
  if (!page) return { ok: false, error: 'validation', status: 400 }

  const fields = body.fields
  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
    return { ok: false, error: 'validation', status: 400 }
  }

  const email = cleanLine(fields.email, 254, { required: true })
  if (!email || !isEmail(email)) return { ok: false, error: 'validation', status: 400 }

  const filesIn = body.files && typeof body.files === 'object' ? body.files : {}
  const front = readFile(filesIn.id_front, 'Pièce d’identité — recto')
  const back = readFile(filesIn.id_back, 'Pièce d’identité — verso')
  if (front.error || back.error) return { ok: false, error: 'validation', status: 400 }

  const common = {
    form,
    lang: body.lang,
    page,
    email,
    firstName: cleanLine(fields.firstName, 80),
    lastName: cleanLine(fields.lastName, 80),
    phone: cleanLine(fields.phone, 30),
    attachments: [front.value, back.value].filter(Boolean),
  }
  if (common.firstName == null || common.lastName == null || common.phone == null) {
    return { ok: false, error: 'validation', status: 400 }
  }
  if (common.phone && !/^[0-9+()./\s-]{6,30}$/.test(common.phone)) {
    return { ok: false, error: 'validation', status: 400 }
  }

  if (form === 'contact') {
    const firstName = cleanLine(fields.firstName, 80, { required: true })
    const lastName = cleanLine(fields.lastName, 80, { required: true })
    const address = cleanBlock(fields.address, 500, { required: true })
    const profession = cleanLine(fields.profession, 120, { required: true })
    const purpose = cleanLine(fields.purpose, 40, { required: true })
    const amount = requireInteger(fields.amount, 500, 5_000_000)
    const duration = requireInteger(fields.duration, 6, 360)
    const income = requireInteger(fields.income, 0, 10_000_000)
    const product = cleanLine(fields.product, 40)
    if (!firstName || !lastName || !address || !profession || !purpose) {
      return { ok: false, error: 'validation', status: 400 }
    }
    if (!PURPOSES.has(purpose) || amount == null || duration == null || income == null) {
      return { ok: false, error: 'validation', status: 400 }
    }
    if (product == null || (product && !PRODUCTS.has(product))) {
      return { ok: false, error: 'validation', status: 400 }
    }
    return {
      ok: true,
      data: {
        ...common,
        firstName,
        lastName,
        address,
        profession,
        purpose,
        amount: String(amount),
        duration: String(duration),
        income: String(income),
        product,
      },
    }
  }

  const message = cleanBlock(fields.message, 5000, { required: true })
  const amount = optionalInteger(fields.amount, 1, 5_000_000)
  const duration = optionalInteger(fields.duration, 1, 480)
  const product = cleanLine(fields.product, 120)
  const loanSlug = cleanLine(fields.loanSlug, 80)
  if (!message || amount.error || duration.error || product == null || loanSlug == null) {
    return { ok: false, error: 'validation', status: 400 }
  }
  if (loanSlug && !/^[A-Za-z0-9_-]+$/.test(loanSlug)) {
    return { ok: false, error: 'validation', status: 400 }
  }
  return {
    ok: true,
    data: {
      ...common,
      message,
      amount: amount.value,
      duration: duration.value,
      product,
      loanSlug,
    },
  }
}
