const LOCALES = { de: 'de-DE', en: 'en-GB', fr: 'fr-FR', nl: 'nl-NL' }

export const localeOf = (lng) => LOCALES[(lng || 'de').slice(0, 2)] || LOCALES.de

export const fmtCurrency = (n, lng, digits = 0) =>
  new Intl.NumberFormat(localeOf(lng), { style: 'currency', currency: 'EUR', minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n)

export const fmtPercent = (n, lng) =>
  new Intl.NumberFormat(localeOf(lng), { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n / 100)
