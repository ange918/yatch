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

const LOCALES = {
  de: 'de-DE',
  fr: 'fr-FR',
  nl: 'nl-NL',
  en: 'en-GB',
}

export const ANNUAL_INTEREST_RATE = 3

const CONFIRM_COPY = {
  fr: {
    subject: 'Finanzkredit — Confirmation de votre demande de crédit',
    eyebrow: 'FINANZKREDIT',
    title: 'Votre demande a bien été envoyée',
    greeting: (name) => (name ? `Bonjour ${name},` : 'Bonjour,'),
    intro: 'Nous vous confirmons la bonne réception de votre demande de financement. Un conseiller Finanzkredit étudie votre dossier et vous recontactera sous 24 heures ouvrées.',
    summaryTitle: 'Rappel du calcul de votre mensualité',
    monthlyLabel: 'Mensualité estimée',
    perMonth: '/ mois',
    amountLabel: 'Montant demandé',
    durationLabel: 'Durée',
    monthsUnit: 'mois',
    rateLabel: 'Taux d’intérêt annuel fixe',
    interestLabel: 'Total des intérêts',
    totalLabel: 'Coût total du crédit',
    productLabel: 'Offre concernée',
    noCalcTitle: 'Rappel des conditions indicatives',
    noCalcBody: 'Votre demande sera étudiée avec notre taux annuel fixe de 3,0 %. Un conseiller vous transmettra le calcul détaillé de votre mensualité lors de l’échange.',
    note: 'Ce calcul est établi à titre indicatif sur la base du taux annuel de 3,0 %. Vos pièces justificatives restent strictement confidentielles.',
    footer: 'Besoin de compléter votre dossier ? Répondez simplement à cet e-mail ou contactez-nous au +41 79 923 92 59.',
    signature: 'L’équipe Finanzkredit',
  },
  de: {
    subject: 'Finanzkredit — Bestätigung Ihrer Kreditanfrage',
    eyebrow: 'FINANZKREDIT',
    title: 'Ihre Anfrage wurde erfolgreich gesendet',
    greeting: (name) => (name ? `Guten Tag ${name},` : 'Guten Tag,'),
    intro: 'wir bestätigen den Eingang Ihrer Finanzierungsanfrage. Ein Berater von Finanzkredit prüft Ihre Angaben und meldet sich innerhalb von 24 Stunden bei Ihnen.',
    summaryTitle: 'Übersicht Ihrer monatlichen Rate',
    monthlyLabel: 'Geschätzte Monatsrate',
    perMonth: '/ Monat',
    amountLabel: 'Kreditbetrag',
    durationLabel: 'Laufzeit',
    monthsUnit: 'Monate',
    rateLabel: 'Fester Jahreszinssatz',
    interestLabel: 'Zinskosten gesamt',
    totalLabel: 'Gesamtkreditbetrag',
    productLabel: 'Gewähltes Angebot',
    noCalcTitle: 'Hinweis zu unseren Konditionen',
    noCalcBody: 'Ihre Anfrage wird mit unserem festen Jahreszinssatz von 3,0 % geprüft. Ihren individuellen Ratenplan erhalten Sie direkt von Ihrem Berater.',
    note: 'Diese Berechnung dient als unverbindliche Orientierung auf Basis des festen Zinssatzes von 3,0 % p. a. Ihre Unterlagen werden streng vertraulich behandelt.',
    footer: 'Sie haben noch Fragen? Antworten Sie einfach auf diese E-Mail oder erreichen Sie uns unter +41 79 923 92 59.',
    signature: 'Ihr Finanzkredit-Team',
  },
  nl: {
    subject: 'Finanzkredit — Bevestiging van uw kredietaanvraag',
    eyebrow: 'FINANZKREDIT',
    title: 'Uw aanvraag is succesvol verzonden',
    greeting: (name) => (name ? `Beste ${name},` : 'Beste,'),
    intro: 'wij bevestigen de goede ontvangst van uw kredietaanvraag. Een adviseur van Finanzkredit bekijkt uw dossier en neemt binnen 24 uur contact met u op.',
    summaryTitle: 'Overzicht van uw maandbedrag',
    monthlyLabel: 'Geschat maandbedrag',
    perMonth: '/ maand',
    amountLabel: 'Aangevraagd bedrag',
    durationLabel: 'Looptijd',
    monthsUnit: 'maanden',
    rateLabel: 'Vaste jaarlijkse rentevoet',
    interestLabel: 'Totale rentekosten',
    totalLabel: 'Totale kredietkosten',
    productLabel: 'Gekozen aanbod',
    noCalcTitle: 'Overzicht van de voorwaarden',
    noCalcBody: 'Uw aanvraag wordt beoordeeld tegen onze vaste jaarlijkse rentevoet van 3,0 %. Uw adviseur bezorgt u een gedetailleerde berekening van uw maandbedrag.',
    note: 'Deze berekening is indicatief op basis van het vaste jaarlijkse tarief van 3,0 %. Uw documenten worden strikt vertrouwelijk verwerkt.',
    footer: 'Heeft u nog vragen? Beantwoord gerust deze e-mail of bel ons op +41 79 923 92 59.',
    signature: 'Het Finanzkredit-team',
  },
  en: {
    subject: 'Finanzkredit — Confirmation of your loan application',
    eyebrow: 'FINANZKREDIT',
    title: 'Your application has been received',
    greeting: (name) => (name ? `Hello ${name},` : 'Hello,'),
    intro: 'we confirm that your financing application has been successfully received. A Finanzkredit advisor is reviewing your file and will contact you within 24 hours.',
    summaryTitle: 'Monthly Payment Summary',
    monthlyLabel: 'Estimated monthly payment',
    perMonth: '/ month',
    amountLabel: 'Requested amount',
    durationLabel: 'Duration',
    monthsUnit: 'months',
    rateLabel: 'Fixed annual interest rate',
    interestLabel: 'Total interest',
    totalLabel: 'Total cost of credit',
    productLabel: 'Selected offer',
    noCalcTitle: 'Indicative Rate Summary',
    noCalcBody: 'Your application is reviewed at our fixed annual interest rate of 3.0%. Your advisor will share your detailed monthly repayment schedule shortly.',
    note: 'This calculation is indicative based on our 3.0% fixed annual interest rate. All submitted documents remain strictly confidential.',
    footer: 'Need to add details to your request? Simply reply to this email or call us at +41 79 923 92 59.',
    signature: 'The Finanzkredit Team',
  },
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

function fmtCurrency(value, lang, digits = 0) {
  const locale = LOCALES[lang] || LOCALES.de
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)
}

function fmtPercent(value, lang) {
  const locale = LOCALES[lang] || LOCALES.de
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100)
}

export function calculateMonthlySummary(amountValue, durationValue) {
  const amount = Number(amountValue)
  const duration = Number(durationValue)
  if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(duration) || duration <= 0) {
    return null
  }
  const monthlyRate = (ANNUAL_INTEREST_RATE / 100) / 12
  const monthly = monthlyRate === 0
    ? amount / duration
    : (amount * monthlyRate * Math.pow(1 + monthlyRate, duration)) / (Math.pow(1 + monthlyRate, duration) - 1)
  const totalCost = monthly * duration
  const totalInterest = totalCost - amount
  return {
    amount,
    duration,
    rate: ANNUAL_INTEREST_RATE,
    monthly,
    totalCost,
    totalInterest,
  }
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
  const summary = calculateMonthlySummary(data.amount, data.duration)
  if (summary) {
    add('Taux appliqué', `${summary.rate} %`)
    add('Mensualité estimée', `${fmtCurrency(summary.monthly, 'fr', 2)} / mois`)
  }
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

export function buildConfirmationMessage(data, env, now) {
  if (!isEmail(data.email)) return null
  const replyTo = recipientOf(env)
  if (!isEmail(replyTo)) return null

  const lang = CONFIRM_COPY[data.lang] ? data.lang : 'fr'
  const copy = CONFIRM_COPY[lang]
  const fullName = [data.firstName, data.lastName]
    .filter(Boolean)
    .join(' ')
    .replace(/[\r\n<>]/g, '')
    .trim()
  const summary = calculateMonthlySummary(data.amount, data.duration)
  const received = formatWhen(now)

  const summaryRows = []
  if (data.product) {
    summaryRows.push([copy.productLabel, PRODUCT_LABEL[data.product] || data.product])
  }
  if (summary) {
    summaryRows.push([copy.amountLabel, fmtCurrency(summary.amount, lang, 0)])
    summaryRows.push([copy.durationLabel, `${summary.duration} ${copy.monthsUnit}`])
    summaryRows.push([copy.rateLabel, fmtPercent(summary.rate, lang)])
    summaryRows.push([copy.interestLabel, fmtCurrency(summary.totalInterest, lang, 0)])
    summaryRows.push([copy.totalLabel, fmtCurrency(summary.totalCost, lang, 0)])
  } else {
    if (data.amount) summaryRows.push([copy.amountLabel, fmtCurrency(Number(data.amount), lang, 0)])
    if (data.duration) summaryRows.push([copy.durationLabel, `${data.duration} ${copy.monthsUnit}`])
    summaryRows.push([copy.rateLabel, fmtPercent(ANNUAL_INTEREST_RATE, lang)])
  }

  const textLines = [
    copy.title,
    `${received} (Europe/Paris)`,
    '',
    copy.greeting(fullName),
    '',
    copy.intro,
    '',
  ]

  if (summary) {
    textLines.push(copy.summaryTitle)
    textLines.push(`${copy.monthlyLabel} : ${fmtCurrency(summary.monthly, lang, 2)} ${copy.perMonth}`)
    for (const [label, value] of summaryRows) {
      textLines.push(`${label} : ${value}`)
    }
    textLines.push('')
    textLines.push(copy.note)
  } else {
    textLines.push(copy.noCalcTitle)
    for (const [label, value] of summaryRows) {
      textLines.push(`${label} : ${value}`)
    }
    textLines.push(copy.noCalcBody)
  }

  textLines.push('', copy.footer, '', copy.signature)

  const htmlRows = summaryRows.map(([label, value]) => (
    `<tr>
      <th align="left" style="padding:8px 0;border-bottom:1px solid #EBE2D1;color:#575148;font-size:13px;font-weight:600">${escapeHtml(label)}</th>
      <td align="right" style="padding:8px 0;border-bottom:1px solid #EBE2D1;color:#121110;font-size:14px;font-weight:700">${escapeHtml(value)}</td>
    </tr>`
  )).join('')

  const monthlyBlockHtml = summary
    ? `<div style="margin:24px 0;padding:22px 24px;background:#FAF8F3;border:1px solid #E5DCCB;border-radius:14px">
        <p style="margin:0 0 6px;color:#8A8175;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">${escapeHtml(copy.summaryTitle)}</p>
        <p style="margin:0 0 14px;color:#D2511A;font-size:28px;font-weight:800;line-height:1.15">${escapeHtml(fmtCurrency(summary.monthly, lang, 2))} <span style="font-size:14px;color:#575148;font-weight:600">${escapeHtml(copy.perMonth)}</span></p>
        <p style="margin:0 0 12px;color:#575148;font-size:13px">${escapeHtml(copy.monthlyLabel)}</p>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">${htmlRows}</table>
        <p style="margin:14px 0 0;color:#6B6359;font-size:12px;line-height:1.5">${escapeHtml(copy.note)}</p>
      </div>`
    : `<div style="margin:24px 0;padding:22px 24px;background:#FAF8F3;border:1px solid #E5DCCB;border-radius:14px">
        <p style="margin:0 0 10px;color:#121110;font-size:15px;font-weight:700">${escapeHtml(copy.noCalcTitle)}</p>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">${htmlRows}</table>
        <p style="margin:14px 0 0;color:#4A453E;font-size:13px;line-height:1.5">${escapeHtml(copy.noCalcBody)}</p>
      </div>`

  const html = `<!DOCTYPE html>
<html lang="${escapeHtml(lang)}">
<body style="margin:0;padding:24px;background:#f6f3ee;font-family:Arial,Helvetica,sans-serif;color:#121110">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E5DCCB">
    <tr>
      <td style="background:#121110;padding:22px 24px">
        <p style="margin:0;color:#D2511A;font-size:12px;letter-spacing:.08em;font-weight:700">${escapeHtml(copy.eyebrow)}</p>
        <h1 style="margin:8px 0 0;color:#ffffff;font-size:20px;line-height:1.25">${escapeHtml(copy.title)}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:24px">
        <p style="margin:0 0 12px;color:#121110;font-size:15px;font-weight:700">${escapeHtml(copy.greeting(fullName))}</p>
        <p style="margin:0;color:#4A453E;font-size:14px;line-height:1.6">${escapeHtml(copy.intro)}</p>
        ${monthlyBlockHtml}
        <p style="margin:0 0 16px;color:#575148;font-size:13px;line-height:1.5">${escapeHtml(copy.footer)}</p>
        <p style="margin:0;color:#121110;font-size:14px;font-weight:700">${escapeHtml(copy.signature)}</p>
      </td>
    </tr>
  </table>
</body>
</html>`

  return {
    to: data.email,
    replyTo,
    subject: copy.subject,
    text: textLines.join('\n'),
    html,
    attachments: [],
  }
}
