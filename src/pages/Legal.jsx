import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Badge from '../components/ui/Badge'
import Accent from '../components/Accent'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

const HERO_IMG = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1920&q=80'

const TAB_ICONS = {
  privacy: 'bx-shield-alt-2',
  terms: 'bx-file',
  cookies: 'bx-cookie',
  regulatory: 'bx-badge-check',
}

export default function Legal() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('privacy')

  const tabs = [
    { key: 'privacy', label: t('legal.privacy') },
    { key: 'terms', label: t('legal.terms') },
    { key: 'cookies', label: t('legal.cookies') },
    { key: 'regulatory', label: t('legal.regulatory') },
  ]

  const content = {
    privacy: {
      title: t('legal.privacy'),
      sections: [
        { heading: '1. Verantwortlicher', text: 'Finanzkredit AG, Bankstraße 1, 60311 Frankfurt am Main ist der Verantwortliche im Sinne der DSGVO. Kontakt: datenschutz@kreditwelt.de' },
        { heading: '2. Erhobene Daten', text: 'Wir erheben personenbezogene Daten, die Sie uns direkt mitteilen (Name, E-Mail, Telefonnummer) sowie technische Daten (IP-Adresse, Browser-Typ, Zugriffszeiten).' },
        { heading: '3. Verwendungszwecke', text: 'Ihre Daten werden zur Vertragserfüllung, zur Kommunikation mit Ihnen, zur Verbesserung unserer Dienste und zur Einhaltung gesetzlicher Verpflichtungen verarbeitet.' },
        { heading: '4. Datenweitergabe', text: 'Wir geben Ihre Daten nur weiter, soweit dies gesetzlich zulässig oder erforderlich ist. Eine Weitergabe an Dritte zu kommerziellen Zwecken findet nicht statt.' },
        { heading: '5. Ihre Rechte', text: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Wenden Sie sich an datenschutz@kreditwelt.de.' },
        { heading: '6. Cookies', text: 'Wir verwenden Cookies zur Verbesserung der Nutzererfahrung. Weitere Informationen finden Sie in unserer Cookie-Richtlinie.' },
        { heading: '7. Speicherdauer', text: 'Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.' },
      ],
    },
    terms: {
      title: t('legal.terms'),
      sections: [
        { heading: '§ 1 Geltungsbereich', text: 'Diese Allgemeinen Geschäftsbedingungen gelten für alle Leistungen der Finanzkredit AG gegenüber ihren Kunden.' },
        { heading: '§ 2 Vertragsschluss', text: 'Der Vertrag kommt durch Annahme des Angebots des Kunden durch Finanzkredit zustande.' },
        { heading: '§ 3 Leistungen', text: 'Finanzkredit bietet Bankdienstleistungen gemäß dem Kreditwesengesetz (KWG) an, darunter Kontoführung, Zahlungsverkehr, Kreditvermittlung und Anlageberatung.' },
        { heading: '§ 4 Entgelte', text: 'Für unsere Leistungen gelten die im Preisaushang und Preis- und Leistungsverzeichnis angegebenen Entgelte.' },
        { heading: '§ 5 Haftung', text: 'Finanzkredit haftet für Vorsatz und grobe Fahrlässigkeit. Bei leichter Fahrlässigkeit haftet Finanzkredit nur bei Verletzung wesentlicher Vertragspflichten.' },
        { heading: '§ 6 Datenschutz', text: 'Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer Datenschutzerklärung und den geltenden Datenschutzgesetzen.' },
        { heading: '§ 7 Anwendbares Recht', text: 'Es gilt deutsches Recht. Gerichtsstand ist Frankfurt am Main.' },
      ],
    },
    cookies: {
      title: t('legal.cookies'),
      sections: [
        { heading: 'Was sind Cookies?', text: 'Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie unsere Website besuchen. Sie helfen uns, Ihnen ein besseres Erlebnis zu bieten.' },
        { heading: 'Notwendige Cookies', text: 'Diese Cookies sind für den Betrieb unserer Website unbedingt erforderlich und können nicht deaktiviert werden.' },
        { heading: 'Analyse-Cookies', text: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln.' },
        { heading: 'Marketing-Cookies', text: 'Diese Cookies werden verwendet, um Anzeigen zu personalisieren und für Sie relevanter zu machen.' },
        { heading: 'Cookie-Verwaltung', text: 'Sie können Ihre Cookie-Einstellungen jederzeit über die Cookie-Einstellungen anpassen oder Cookies in Ihrem Browser löschen.' },
      ],
    },
    regulatory: {
      title: t('legal.regulatory'),
      sections: [
        { heading: 'BaFin-Zulassung', text: 'Finanzkredit AG ist durch die Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin) als Kreditinstitut gemäß § 32 KWG zugelassen. Lizenz-Nr.: KW-2004-0001.' },
        { heading: 'Einlagensicherung', text: 'Einlagen sind durch den Einlagensicherungsfonds des Bundesverbandes deutscher Banken e.V. bis zu einem Betrag von €100.000 pro Kunde gesichert.' },
        { heading: 'Schlichtungsverfahren', text: 'Bei Streitigkeiten haben Verbraucher die Möglichkeit, den Ombudsmann der privaten Banken anzurufen. Kontakt: ombudsmann@bankenverband.de' },
        { heading: 'MiFID II Compliance', text: 'Finanzkredit AG hält alle Anforderungen der Richtlinie über Märkte für Finanzinstrumente (MiFID II) ein.' },
        { heading: 'DSGVO Compliance', text: 'Wir halten alle Anforderungen der EU-Datenschutz-Grundverordnung (DSGVO) ein. Unser Datenschutzbeauftragter ist unter dpo@kreditwelt.de erreichbar.' },
      ],
    },
  }

  const active = content[activeTab]

  return (
    <div className="pt-16">
      <section
        className="relative py-36 text-center overflow-hidden hero-bg"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#8F3510]/92 via-[#121110]/90 to-[#3A2A20]/80 backdrop-blur-[2px]" />
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
            <motion.div variants={fadeUp}><Badge className="mb-6"><i className="bx bx-shield text-sm mr-1" />{t('legal.heroSub')}</Badge></motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight"><Accent>{t('legal.heroTitle')}</Accent></motion.h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#EBE2D1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2 mb-10 bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeTab === tab.key ? 'bg-[#121110] text-[#D2511A] shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                <i className={`bx ${TAB_ICONS[tab.key]} text-base`} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#D2511A]/10 flex items-center justify-center">
                <i className={`bx ${TAB_ICONS[activeTab]} text-[#D2511A] text-xl`} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#121110] tracking-tight"><Accent>{active.title}</Accent></h2>
            </div>
            <div className="space-y-6">
              {active.sections.map((section, i) => (
                <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <h3 className="font-bold text-[#121110] mb-2 flex items-center gap-2">
                    <i className="bx bx-chevron-right text-[#D2511A]" />
                    {section.heading}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed pl-5">{section.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
