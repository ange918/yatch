import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Accordion from '../components/ui/Accordion'
import Badge from '../components/ui/Badge'
import Accent from '../components/Accent'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

const HERO_IMG = 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=1920&q=80'

const CAT_ICONS = {
  all: 'bx-grid-alt',
  accounts: 'bx-user-circle',
  cards: 'bx-credit-card',
  loans: 'bx-wallet',
  transfers: 'bx-transfer',
  security: 'bx-shield-alt-2',
  app: 'bx-mobile-alt',
}

const ALL_FAQS = [
  { category: 'accounts', q: 'Wie eröffne ich ein Konto bei Finanzkredit?', a: 'Die Kontoeröffnung erfolgt vollständig online in weniger als 10 Minuten. Sie benötigen lediglich Ihren Personalausweis oder Reisepass und eine gültige E-Mail-Adresse.' },
  { category: 'accounts', q: 'Welche Kontenarten bietet Finanzkredit an?', a: 'Wir bieten Girokonten (Basic, Plus, Premium), Sparkonten, Geschäftskonten und Gemeinschaftskonten an. Alle Konten können bequem online verwaltet werden.' },
  { category: 'accounts', q: 'Gibt es eine Mindestaltersvoraussetzung?', a: 'Für die Eröffnung eines Kontos müssen Sie mindestens 18 Jahre alt sein. Für Jugendliche unter 18 Jahren bieten wir spezielle Jugendkonten an.' },
  { category: 'accounts', q: 'Kann ich mehrere Konten bei Finanzkredit haben?', a: 'Ja, Sie können bis zu 5 Konten bei Finanzkredit führen, darunter verschiedene Währungskonten, Spar- und Girokonten.' },
  { category: 'cards', q: 'Welche Kreditkarten bietet Finanzkredit an?', a: 'Wir bieten Classic, Gold und Platinum Visa-Kreditkarten an. Alle Karten bieten weltweite Akzeptanz, und unsere Premium-Karten bieten Cashback und Zusatzleistungen.' },
  { category: 'cards', q: 'Wie beantrage ich eine Kreditkarte?', a: 'Die Beantragung erfolgt direkt in Ihrem Online-Banking oder der App. Nach Genehmigung erhalten Sie Ihre Karte innerhalb von 3–5 Werktagen per Post.' },
  { category: 'cards', q: 'Was tue ich, wenn meine Karte verloren geht?', a: 'Sperren Sie Ihre Karte sofort über die App oder unter 0800 123 456 7. Eine Ersatzkarte wird Ihnen innerhalb von 2 Werktagen zugesandt.' },
  { category: 'cards', q: 'Gibt es Auslandsgebühren?', a: 'Bei unseren Plus und Premium Konten fallen keine Auslandsgebühren an. Beim Basic-Konto wird eine Gebühr von 1,5% des Transaktionsbetrags berechnet.' },
  { category: 'loans', q: 'Welche Kreditarten bietet Finanzkredit an?', a: 'Wir bieten Immobilienkredite (ab 3,5% p.a.), Autokredite (ab 4,2% p.a.) und Privatkredite (ab 5,9% p.a.) an. Alle Kredite können im Simulator vorab berechnet werden.' },
  { category: 'loans', q: 'Wie schnell erhalte ich eine Kreditentscheidung?', a: 'Bei Privat- und Autokrediten erhalten Sie in der Regel innerhalb von 24 Stunden eine Entscheidung. Bei Immobilienkrediten dauert die Prüfung 3–5 Werktage.' },
  { category: 'loans', q: 'Kann ich meinen Kredit vorzeitig zurückzahlen?', a: 'Ja, eine vorzeitige Rückzahlung ist jederzeit möglich. Bei Privatkrediten fallen keine Vorfälligkeitsentschädigungen an.' },
  { category: 'loans', q: 'Welche Unterlagen benötige ich für einen Kreditantrag?', a: 'Sie benötigen einen gültigen Ausweis, aktuelle Gehaltsabrechnungen (letzte 3 Monate) und Kontoauszüge (letzte 3 Monate).' },
  { category: 'transfers', q: 'Wie lange dauert eine SEPA-Überweisung?', a: 'Standard-SEPA-Überweisungen werden innerhalb von 1 Werktag ausgeführt. Mit SEPA-Instant sind Überweisungen innerhalb von 10 Sekunden möglich.' },
  { category: 'transfers', q: 'Was sind die Überweisungslimits?', a: 'Das Standard-Tageslimit beträgt €50.000. Für höhere Beträge können Sie uns kontaktieren, um individuelle Limits zu vereinbaren.' },
  { category: 'transfers', q: 'Kann ich Überweisungen ins Ausland tätigen?', a: 'Ja, wir bieten SWIFT-Überweisungen in über 150 Länder an. Die Bearbeitungszeit beträgt 1–5 Werktage, abhängig vom Zielland.' },
  { category: 'transfers', q: 'Wie richte ich einen Dauerauftrag ein?', a: 'Daueraufträge können einfach über die App oder das Online-Banking eingerichtet werden. Gehen Sie zu "Überweisungen" > "Dauerauftrag erstellen".' },
  { category: 'security', q: 'Wie sicher sind meine Daten bei Finanzkredit?', a: 'Wir verwenden 256-bit SSL-Verschlüsselung, 2-Faktor-Authentifizierung und sind ISO 27001 zertifiziert. Ihre Einlagen sind bis zu €100.000 gesichert.' },
  { category: 'security', q: 'Was soll ich tun, wenn ich eine verdächtige Aktivität bemerke?', a: 'Sperren Sie sofort Ihr Konto über die App und kontaktieren Sie unseren 24/7 Sicherheitsnotfall-Support unter 0800 987 654 3.' },
  { category: 'app', q: 'Auf welchen Geräten ist die Finanzkredit-App verfügbar?', a: 'Die App ist für iOS (iPhone und iPad) und Android verfügbar und kann kostenlos im App Store bzw. Google Play heruntergeladen werden.' },
  { category: 'app', q: 'Wie aktiviere ich den biometrischen Login?', a: 'Gehen Sie in der App zu "Einstellungen" > "Sicherheit" > "Biometrischer Login" und folgen Sie den Anweisungen zur Aktivierung von Face ID oder Fingerabdruck.' },
  { category: 'app', q: 'Was tue ich, wenn ich mein Passwort vergessen habe?', a: 'Klicken Sie auf "Passwort vergessen" auf der Login-Seite. Sie erhalten eine E-Mail mit einem Link zum Zurücksetzen Ihres Passworts.' },
]

export default function FAQ() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', 'accounts', 'cards', 'loans', 'transfers', 'security', 'app']

  const filtered = useMemo(() => {
    return ALL_FAQS.filter((faq) => {
      const matchCat = activeCategory === 'all' || faq.category === activeCategory
      const matchSearch = !search || faq.q.toLowerCase().includes(search.toLowerCase()) || faq.a.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [search, activeCategory])

  return (
    <div className="pt-16">
      {/* Hero */}
      <section
        className="relative py-36 text-center overflow-hidden hero-bg"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#8F3510]/90 via-[#121110]/88 to-[#3A2A20]/80 backdrop-blur-[1px]" />
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
            <motion.div variants={fadeUp}><Badge className="mb-6"><i className="bx bx-help-circle text-sm mr-1" />{t('faq.heroSub')}</Badge></motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight"><Accent>{t('faq.heroTitle')}</Accent></motion.h1>
            <motion.div variants={fadeUp} className="max-w-xl mx-auto relative">
              <i className="bx bx-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('faq.searchPlaceholder')}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#D2511A] shadow-2xl font-medium"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#EBE2D1]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-[#121110] text-[#D2511A] shadow-md' : 'bg-white text-gray-500 hover:text-gray-700 border border-gray-200 hover:shadow-sm'}`}
              >
                <i className={`bx ${CAT_ICONS[cat]} text-base`} />
                {t(`faq.categories.${cat}`)}
              </button>
            ))}
          </div>

          {/* Accordions */}
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-3">
            {filtered.length > 0 ? filtered.map((faq, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Accordion question={faq.q} answer={faq.a} />
              </motion.div>
            )) : (
              <div className="text-center py-16">
                <i className="bx bx-search text-gray-300 text-5xl mb-3 block" />
                <p className="text-gray-500">Keine Ergebnisse gefunden.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#121110] to-[#3A2A20]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#D2511A]/15 flex items-center justify-center mx-auto">
                <i className="bx bx-support text-[#D2511A] text-3xl" />
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-white mb-4 tracking-tight"><Accent>{t('faq.ctaTitle')}</Accent></motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 mb-8 leading-relaxed">{t('faq.ctaText')}</motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-[#D2511A] text-[#121110] font-bold px-8 py-4 rounded-full hover:scale-105 hover:shadow-lg transition-all shadow-md shadow-black/10">
                <i className="bx bx-chat text-lg" />
                {t('faq.ctaButton')} <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
