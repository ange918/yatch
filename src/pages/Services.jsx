import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Accent from '../components/Accent'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const HERO_IMG = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80'

const ONLINE_FEATURES = [
  { bx: 'bx-mobile-alt', title: 'Mobile Banking App', desc: 'iOS & Android, über 4,8 Sterne' },
  { bx: 'bx-transfer', title: 'Sofortüberweisungen', desc: 'SEPA-Instant unter 10 Sekunden' },
  { bx: 'bx-credit-card', title: 'Virtuelle Karte', desc: 'Sofort verfügbar, vollständig sicher' },
  { bx: 'bx-bar-chart-alt-2', title: 'Ausgabenanalyse', desc: 'Verstehen Sie Ihr Ausgabeverhalten' },
  { bx: 'bx-refresh', title: 'Daueraufträge', desc: 'Automatisieren Sie regelmäßige Zahlungen' },
  { bx: 'bx-bell', title: 'Push-Benachrichtigungen', desc: 'Informiert über jede Transaktion' },
]

const INTL_FEATURES = [
  { bx: 'bx-globe', title: 'SWIFT-Überweisungen', desc: 'Zahlungen in 150+ Länder' },
  { bx: 'bx-dollar-circle', title: 'Multi-Währungskonto', desc: 'EUR, USD, GBP und mehr' },
  { bx: 'bx-shield-quarter', title: 'Reiseversicherung', desc: 'Weltweiter Schutz für Ihre Reisen' },
  { bx: 'bx-trending-up', title: 'Devisenhandel', desc: 'Günstige Wechselkurse' },
]

const BUSINESS_FEATURES = [
  { bx: 'bx-group', title: 'Gehaltsabrechnung', desc: 'Automatisierte Lohnzahlungen' },
  { bx: 'bx-receipt', title: 'Rechnungsstellung', desc: 'Professionelle Rechnungen in Minuten' },
  { bx: 'bx-buildings', title: 'Geschäftskredite', desc: 'Flexible Finanzierung für Ihr Wachstum' },
  { bx: 'bx-user-voice', title: 'Persönlicher Berater', desc: 'Dedizierter Ansprechpartner' },
]

const DIGITAL_TOOLS = [
  { bx: 'bx-wallet', title: 'Budgetplaner', desc: 'Setzen und verfolgen Sie Budgetziele' },
  { bx: 'bx-target-lock', title: 'Sparziele', desc: 'Automatisches Sparen für Ihre Träume' },
  { bx: 'bx-category', title: 'Ausgabenkategorien', desc: 'Detaillierte Kategorisierung' },
  { bx: 'bx-bell-plus', title: 'Smart Alerts', desc: 'Intelligente Finanzbenachrichtigungen' },
]

const SUPPORT = [
  { bx: 'bx-chat', title: 'Live-Chat', desc: 'Mo–Fr 8–22 Uhr, Sa–So 9–18 Uhr', gradient: 'from-[#3A2A20] to-[#E8793F]' },
  { bx: 'bx-phone', title: '+49 69 1234 5678', desc: 'Mo–Fr 8–20 Uhr', gradient: 'from-blue-500 to-blue-700' },
  { bx: 'bx-envelope', title: 'support@kreditwelt.de', desc: 'Antwort innerhalb 24h', gradient: 'from-purple-500 to-purple-700' },
  { bx: 'bx-map-pin', title: 'Bankstraße 1, Frankfurt', desc: 'Mo–Fr 9–18 Uhr, Sa 10–14 Uhr', gradient: 'from-orange-500 to-red-500' },
]

const SECURITY = [
  { bx: 'bx-lock-alt', title: '256-bit SSL Verschlüsselung', desc: 'Bankgrade Sicherheit für all Ihre Daten' },
  { bx: 'bx-shield', title: 'BaFin Reguliert', desc: 'Vollständig autorisiert und überwacht' },
  { bx: 'bx-key', title: '2-Faktor-Authentifizierung', desc: 'Zusätzlicher Schutz für Ihr Konto' },
  { bx: 'bx-fingerprint', title: 'Biometrischer Login', desc: 'Face ID und Fingerabdruck-Zugang' },
]

function ServiceSection({ title, items, bg = 'bg-[#EBE2D1]' }) {
  return (
    <section className={`py-16 ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-2xl font-extrabold text-[#121110] mb-8 tracking-tight flex items-center gap-3"
        >
          <div className="w-1 h-8 rounded-full bg-[#D2511A]" />
          {title}
        </motion.h2>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {items.map(({ bx, title: t, desc }) => (
            <motion.div key={t} variants={fadeUp}>
              <Card className="p-5 flex items-start gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 bg-gradient-to-b from-white to-gray-50/50">
                <div className="w-11 h-11 rounded-xl bg-[#D2511A]/10 flex items-center justify-center shrink-0">
                  <i className={`bx ${bx} text-[#3A2A20] text-2xl`} />
                </div>
                <div>
                  <p className="font-bold text-[#121110] mb-1 text-sm leading-tight">{t}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default function Services() {
  const { t } = useTranslation()

  return (
    <div className="pt-16">
      {/* Hero */}
      <section
        className="relative py-36 text-center overflow-hidden hero-bg"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#8F3510]/90 via-[#121110]/88 to-[#3A2A20]/80 backdrop-blur-[1px]" />
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}><Badge className="mb-6"><i className="bx bx-star text-sm mr-1" />{t('services.heroSub')}</Badge></motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight"><Accent>{t('services.heroTitle')}</Accent></motion.h1>
          </motion.div>
        </div>
      </section>

      <ServiceSection title={t('services.onlineTitle')} items={ONLINE_FEATURES} bg="bg-white" />
      <ServiceSection title={t('services.intlTitle')} items={INTL_FEATURES} />
      <ServiceSection title={t('services.businessTitle')} items={BUSINESS_FEATURES} bg="bg-white" />
      <ServiceSection title={t('services.digitalTitle')} items={DIGITAL_TOOLS} />

      {/* Support */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-extrabold text-[#121110] text-center mb-10 tracking-tight"
          ><Accent>{t('services.supportTitle')}</Accent></motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {SUPPORT.map((s) => (
              <motion.div key={s.title} variants={fadeUp}>
                <div className={`bg-gradient-to-br ${s.gradient} rounded-2xl p-6 text-white text-center hover:-translate-y-1 transition-all duration-300 shadow-lg`}>
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-3">
                    <i className={`bx ${s.bx} text-white text-2xl`} />
                  </div>
                  <p className="font-bold text-sm leading-tight mb-1">{s.title}</p>
                  <p className="text-white/70 text-xs">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 bg-[#121110] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#D2511A] rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-extrabold text-white text-center mb-12 tracking-tight"
          ><Accent>{t('services.securityTitle')}</Accent></motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {SECURITY.map((s) => (
              <motion.div key={s.title} variants={fadeUp} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#D2511A]/10 flex items-center justify-center mx-auto mb-4 border border-[#D2511A]/20">
                  <i className={`bx ${s.bx} text-[#D2511A] text-3xl`} />
                </div>
                <p className="font-bold text-white mb-2 text-sm leading-tight">{s.title}</p>
                <p className="text-white/50 text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
