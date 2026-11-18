import { isEmail } from './validate.js'
import { recipientOf } from './limits.js'

const LANG_LABEL = {
  de: 'Allemand (de)',
  fr: 'Français (fr)',
  nl: 'Néerlandais (nl)',
  en: 'Anglais (en)',
}

const PURPOSE_LABEL = {
  Auto: 'Voiture',
  Immobilien: 'Immobilier',
  Renovierung: 'Rénovation',
  Konsum: 'Consommation',
  Sonstiges: 'Autre',
}

const PRODUCT_LABEL = {
  immo: 'Immobilier (simulateur)',
  auto: 'Auto (simulateur)',
  privat: 'Crédit privé (simulateur)',
  loan: 'Immobilier (simulateur)',
}

const FORM_LABEL = {
  contact: 'Demande de crédit (/contact)',
  loan: 'Demande sur une offre (/kredite)',
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatWhen(now) {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Europe/Paris',
  }).format(new Date(now))
}

function rowsFor(data) {
  const rows = [
    ['Formulaire', FORM_LABEL[data.form] || data.form],
    ['Langue du site', LANG_LABEL[data.lang] || data.lang],
    ['Page d’origine', data.page],
  ]
  const add = (label, value) => {
    if (value) rows.push([label, value])
  }
  add('Prénom', data.firstName)
  add('Nom', data.lastName)
  add('E-mail', data.email)
  add('Téléphone', data.phone)
  add('Adresse', data.address)
  add('Montant (€)', data.amount)
  add('Durée (mois)', data.duration)
  add('Profession', data.profession)
  add('Revenu net mensuel (€)', data.income)
  if (data.purpose) add('Objet du crédit', `${PURPOSE_LABEL[data.purpose] || data.purpose} (${data.purpose})`)
  if (data.product) add('Produit', PRODUCT_LABEL[data.product] || data.product)
  add('Offre (slug)', data.loanSlug)
  add('Message', data.message)
  if (data.attachments.length === 0) {
    rows.push(['Pièces jointes', 'Aucune'])
  } else {
    rows.push(['Pièces jointes', data.attachments.map((file) => file.filename).join(', ')])
  }
  return rows
}

export function buildMessage(data, env, now) {
  const to = recipientOf(env)
  if (!isEmail(to)) return null

  const who = ([data.firstName, data.lastName].filter(Boolean).join(' ') || data.email)
    .replace(/[<>]/g, '')
  const subject = `Finanzkredit — nouvelle demande — ${who}`.slice(0, 180)
  const received = formatWhen(now)
  const rows = rowsFor(data)

  const text = [
    'Nouvelle demande — Finanzkredit',
    `Reçue le : ${received} (Europe/Paris)`,
    '',
    ...rows.map(([label, value]) => `${label} : ${value}`),
    '',
    'Répondez à cet e-mail pour écrire directement au client.',
  ].join('\n')

  const htmlRows = rows.map(([label, value]) => (
    `<tr>
      <th align="left" style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;font-size:13px;vertical-align:top;width:34%">${escapeHtml(label)}</th>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#121110;font-size:14px;white-space:pre-wrap">${escapeHtml(value)}</td>
    </tr>`
  )).join('')

  const html = `<!DOCTYPE html>
<html lang="fr">
<body style="margin:0;padding:24px;background:#f6f3ee;font-family:Arial,Helvetica,sans-serif;color:#121110">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden">
    <tr>
      <td style="background:#121110;padding:20px 24px">
        <p style="margin:0;color:#D2511A;font-size:12px;letter-spacing:.08em;font-weight:700">FINANZKREDIT</p>
        <h1 style="margin:8px 0 0;color:#ffffff;font-size:20px">Nouvelle demande</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 12px 0">
        <p style="margin:12px 12px 4px;color:#666;font-size:13px">Reçue le ${escapeHtml(received)} (Europe/Paris)</p>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">${htmlRows}</table>
        <p style="margin:16px 12px 20px;color:#666;font-size:13px">Répondez à cet e-mail pour écrire directement au client.</p>
      </td>
    </tr>
  </table>
</body>
</html>`

  return {
    to,
    replyTo: data.email,
    subject,
    text,
    html,
    attachments: data.attachments.map((file) => ({
      filename: file.filename,
      contentType: file.contentType,
      content: file.content,
    })),
  }
}
