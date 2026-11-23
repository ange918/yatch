import assert from 'node:assert/strict'
import fs from 'node:fs'
import { after, before, test } from 'node:test'
import contactFunction from '../api/contact.js'
import { handleContactRequest } from '../server/contact/handler.js'
import { resolveMailer } from '../server/contact/mail.js'
import { defaultRecipient } from '../server/contact/limits.js'

const originalError = console.error
before(() => {
  console.error = () => {}
})
after(() => {
  console.error = originalError
})

function jsonRequest(body, headers = {}) {
  return new Request('http://127.0.0.1/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })
}

function validContact(overrides = {}) {
  return {
    form: 'contact',
    lang: 'fr',
    page: '/contact?amount=15000&duration=60&subject=auto',
    startedAt: Date.now() - 10_000,
    company_website: '',
    fields: {
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean@exemple.fr',
      address: '1 rue de la Paix\n75001 Paris',
      amount: '15000',
      duration: '60',
      profession: 'Ingénieur',
      income: '3200',
      purpose: 'Auto',
      product: 'auto',
    },
    ...overrides,
  }
}

const PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

async function post(body, options = {}) {
  const sent = []
  const res = await handleContactRequest(jsonRequest(body, options.headers), {
    env: options.env ?? { CONTACT_TO_EMAIL: 'contact@krediiwelt.com' },
    rateLimitStore: options.rateLimitStore ?? new Map(),
    now: options.now,
    sendMail: options.sendMail === undefined
      ? async (message) => { sent.push(message) }
      : options.sendMail,
    fetchImpl: options.fetchImpl,
    limits: options.limits,
  })
  return { res, sent, body: await res.json() }
}

test('succès : e-mail complet, reply-to du client, destinataire par défaut', async () => {
  const { res, sent, body } = await post({
    ...validContact(),
    files: { id_front: { name: 'recto.png', type: 'image/png', data: PNG } },
  }, { env: {} })
  assert.equal(res.status, 200)
  assert.equal(body.ok, true)
  assert.equal(sent.length, 2)
  assert.equal(sent[0].to, defaultRecipient())
  assert.equal(defaultRecipient(), 'contact@krediiwelt.com')
  assert.equal(sent[0].replyTo, 'jean@exemple.fr')
  assert.match(sent[0].subject, /Jean Dupont/)
  assert.match(sent[0].text, /1 rue de la Paix/)
  assert.match(sent[0].text, /Français \(fr\)/)
  assert.match(sent[0].text, /\/contact\?amount=15000/)
  assert.match(sent[0].text, /Voiture/)
  assert.match(sent[0].text, /Auto \(simulateur\)/)
  assert.match(sent[0].html, /Jean/)
  assert.equal(sent[0].html.includes('<script>'), false)
  assert.equal(sent[0].attachments.length, 1)
  assert.equal(sent[0].attachments[0].filename.endsWith('.png'), true)
  assert.ok(Buffer.isBuffer(sent[0].attachments[0].content))

  // Confirmation e-mail sent to the applicant with 3% monthly payment reminder
  assert.equal(sent[1].to, 'jean@exemple.fr')
  assert.equal(sent[1].replyTo, 'contact@krediiwelt.com')
  assert.match(sent[1].subject, /Confirmation de votre demande/)
  assert.match(sent[1].text, /Bonjour Jean Dupont/)
  assert.match(sent[1].text, /269,53/)
  assert.match(sent[1].text, /3,0\s*%/)
  assert.match(sent[1].text, /60 mois/)
  assert.match(sent[1].html, /269,53/)
  assert.equal(sent[1].attachments.length, 0)
})

test('succès : demande d’une fiche crédit et confirmation localisée', async () => {
  const { res, sent, body } = await post({
    form: 'loan',
    lang: 'de',
    page: '/kredite/autokredit',
    startedAt: Date.now() - 5000,
    company_website: '',
    fields: {
      firstName: 'Max',
      lastName: 'Mustermann',
      email: 'max@beispiel.de',
      phone: '+49 152 22422310',
      amount: '8000',
      duration: '48',
      message: 'Je souhaite financer un véhicule.',
      product: 'Autokredit',
      loanSlug: 'autokredit',
    },
  })
  assert.equal(res.status, 200)
  assert.equal(body.ok, true)
  assert.equal(sent.length, 2)
  assert.equal(sent[0].replyTo, 'max@beispiel.de')
  assert.match(sent[0].text, /Allemand \(de\)/)
  assert.match(sent[0].text, /\/kredite\/autokredit/)
  assert.match(sent[0].text, /Autokredit/)
  assert.match(sent[0].html, /Mustermann/)

  assert.equal(sent[1].to, 'max@beispiel.de')
  assert.equal(sent[1].replyTo, 'contact@krediiwelt.com')
  assert.match(sent[1].subject, /Bestätigung Ihrer Kreditanfrage/)
  assert.match(sent[1].text, /Guten Tag Max Mustermann/)
  assert.match(sent[1].text, /177,07/)
  assert.match(sent[1].text, /3,0\s*%/)
  assert.match(sent[1].html, /177,07/)
})

test('succès : demande fiche crédit sans montant ni durée gérée sans erreur', async () => {
  const { res, sent, body } = await post({
    form: 'loan',
    lang: 'en',
    page: '/kredite/konsumentenkredit',
    startedAt: Date.now() - 5000,
    company_website: '',
    fields: {
      email: 'alex@example.com',
      message: 'Please send me information.',
      product: 'Konsumentenkredit',
      loanSlug: 'konsumentenkredit',
    },
  })
  assert.equal(res.status, 200)
  assert.equal(body.ok, true)
  assert.equal(sent.length, 2)
  assert.equal(sent[1].to, 'alex@example.com')
  assert.match(sent[1].subject, /Confirmation of your loan application/)
  assert.match(sent[1].text, /3\.0%/)
  assert.equal(sent[1].text.includes('NaN'), false)
  assert.equal(sent[1].html.includes('NaN'), false)
})

test('erreur : le transport échoue, pas de confirmation', async () => {
  const { res, body } = await post(validContact(), {
    sendMail: async () => {
      throw Object.assign(new Error('smtp down'), { code: 'ECONNECTION' })
    },
  })
  assert.equal(res.status, 502)
  assert.equal(body.ok, false)
  assert.equal(body.error, 'send_failed')
})

test('champ invalide : e-mail refusé, rien n’est envoyé', async () => {
  const payload = validContact()
  payload.fields = { ...payload.fields, email: 'pas-un-email' }
  const { res, sent, body } = await post(payload)
  assert.equal(res.status, 400)
  assert.equal(body.ok, false)
  assert.equal(body.error, 'validation')
  assert.equal(sent.length, 0)
})

test('spam : honeypot ignoré sans envoi', async () => {
  const { res, sent, body } = await post(validContact({ company_website: 'https://spam.example' }))
  assert.equal(res.status, 200)
  assert.equal(body.ok, true)
  assert.equal(sent.length, 0)
})

test('spam : envoi trop rapide et plafond par IP', async () => {
  const tooFast = validContact({ startedAt: Date.now() })
  const fast = await post(tooFast)
  assert.equal(fast.res.status, 400)
  assert.equal(fast.body.error, 'spam')
  assert.equal(fast.sent.length, 0)

  const store = new Map()
  const now = () => 1_700_000_000_000
  const payload = validContact({ startedAt: now() - 10_000 })
  for (let i = 0; i < 5; i += 1) {
    const ok = await post(payload, { rateLimitStore: store, now })
    assert.equal(ok.res.status, 200)
  }
  const blocked = await post(payload, { rateLimitStore: store, now })
  assert.equal(blocked.res.status, 429)
  assert.equal(blocked.body.error, 'rate_limit')
  assert.equal(blocked.sent.length, 0)
})

test('html échappé et fournisseur : Resend prioritaire, SMTP en repli, sans config', async () => {
  const payload = validContact()
  payload.fields = { ...payload.fields, firstName: 'Jean <script>' }
  const { sent } = await post(payload)
  assert.match(sent[0].html, /Jean &lt;script&gt;/)
  assert.equal(sent[0].html.includes('<script>'), false)
  assert.match(sent[0].text, /Jean <script>/)
  assert.equal(sent[1].html.includes('<script>'), false)

  const both = resolveMailer({
    RESEND_API_KEY: 're_test',
    MAIL_FROM: 'Finanzkredit <contact@krediiwelt.com>',
    SMTP_HOST: 'smtp.example.com',
    SMTP_PORT: '587',
    SMTP_USER: 'user@krediiwelt.com',
    SMTP_PASS: 'secret',
  })
  assert.equal(both.provider, 'resend')

  const smtp = resolveMailer({
    SMTP_HOST: 'smtp.example.com',
    SMTP_PORT: '465',
    SMTP_USER: 'user@krediiwelt.com',
    SMTP_PASS: 'secret',
  })
  assert.equal(smtp.provider, 'smtp')
  assert.equal(smtp.from, 'user@krediiwelt.com')

  const missingFrom = resolveMailer({ RESEND_API_KEY: 're_test' })
  assert.equal(missingFrom.error, 'missing_from')

  const calls = []
  const sentViaResend = await handleContactRequest(jsonRequest(validContact()), {
    env: {
      RESEND_API_KEY: 're_test_key',
      MAIL_FROM: 'Finanzkredit <contact@krediiwelt.com>',
      CONTACT_TO_EMAIL: 'contact@krediiwelt.com',
      SMTP_HOST: 'smtp.example.com',
      SMTP_PORT: '587',
      SMTP_USER: 'user',
      SMTP_PASS: 'secret',
    },
    rateLimitStore: new Map(),
    fetchImpl: async (url, init) => {
      calls.push({ url, init })
      return new Response(JSON.stringify({ id: 'email_1' }), { status: 200 })
    },
  })
  assert.equal(sentViaResend.status, 200)
  assert.equal(calls.length, 2)
  assert.equal(calls[0].url, 'https://api.resend.com/emails')
  const mail = JSON.parse(calls[0].init.body)
  assert.deepEqual(mail.to, ['contact@krediiwelt.com'])
  assert.equal(mail.reply_to, 'jean@exemple.fr')
  assert.equal(calls[0].init.headers.Authorization, 'Bearer re_test_key')

  const confirmMail = JSON.parse(calls[1].init.body)
  assert.deepEqual(confirmMail.to, ['jean@exemple.fr'])
  assert.equal(confirmMail.reply_to, 'contact@krediiwelt.com')
  assert.match(confirmMail.text, /269,53/)

  const unconfigured = await handleContactRequest(jsonRequest(validContact()), {
    env: {},
    rateLimitStore: new Map(),
  })
  assert.equal(unconfigured.status, 503)
  assert.equal((await unconfigured.json()).error, 'send_failed')
})

test('le rewrite SPA ne capture pas /api', () => {
  const config = JSON.parse(fs.readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
  const spa = config.rewrites.filter((rule) => rule.destination === '/index.html')
  assert.deepEqual(spa.map((rule) => rule.source), ['/((?!api/).*)'])
  assert.equal(config.rewrites.some((rule) => rule.source.startsWith('/api')), false)
  const re = /^\/((?!api\/).*)$/
  assert.equal(re.test('/api/contact'), false)
  assert.equal(re.test('/contact'), true)
  assert.equal(re.test('/kredite/autokredit'), true)
  assert.equal(re.test('/simulation'), true)
  assert.equal(re.test('/'), true)
  assert.equal(typeof contactFunction.fetch, 'function')
  assert.equal(config.functions['api/contact.js'].maxDuration, 15)
})
