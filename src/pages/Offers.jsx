import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Accent from '../components/Accent'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const HERO_IMG = 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=80'

export default function Offers() {
  const { t } = useTranslation()

  const loans = [
    { name: t('simulation.tabImmo'), rate: '3.5%', bx: 'bx-home', desc: 'Finanzieren Sie Ihre Immobilie zu Top-Konditionen', color: 'text-blue-600' },
    { name: t('simulation.tabAuto'), rate: '4.2%', bx: 'bx-car', desc: 'Ihr Traumauto mit flexibler Finanzierung', color: 'text-[#3A2A20]' },
    { name: t('simulation.tabPrivat'), rate: '5.9%', bx: 'bx-user', desc: 'Für persönliche Wünsche und Projekte', color: 'text-purple-600' },
  ]

  const accounts = [
    { key: 'basic', price: t('offers.free'), features: ['feature1', 'feature2', 'feature3', 'feature4'], highlight: false, bx: 'bx-user' },
    { key: 'plus', price: '€4.99', features: ['feature1', 'feature2', 'feature3', 'feature4', 'feature5'], highlight: true, bx: 'bx-diamond' },
    { key: 'premium', price: '€12.99', features: ['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6'], highlight: false, bx: 'bx-crown' },
  ]

  const savings = [
    { name: 'Standard Sparkonto', rate: '2.5%', desc: 'Flexible Einlagen, tägliche Verfügbarkeit', color: 'from-[#3A2A20] to-[#E8793F]', bx: 'bx-piggy-bank' },
    { name: 'Premium Sparkonto', rate: '3.8%', desc: '12-Monats Bindung, maximale Rendite', color: 'from-[#8F3510] to-[#3A2A20]', bx: 'bx-trending-up' },
  ]

  const creditCards = [
    { name: 'Classic', bx: 'bx-credit-card', color: 'from-gray-600 to-gray-800', benefits: ['Kostenlose Kontoführung', 'Visa Weltweit', '0,5% Cashback', 'Online-Banking'] },
    { name: 'Gold', bx: 'bx-credit-card-front', color: 'from-yellow-500 to-amber-600', benefits: ['Kostenlose Kontoführung', 'Visa Weltweit', '1% Cashback', 'Reiseversicherung', 'Lounge Zugang'] },
    { name: 'Platinum', bx: 'bx-diamond', color: 'from-[#121110] to-[#3A2A20]', benefits: ['Kostenlose Kontoführung', 'Visa Weltweit', '2% Cashback', 'Concierge', 'Priority Boarding', 'Exklusive Angebote'] },
  ]

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
            <motion.div variants={fadeUp}><Badge className="mb-6"><i className="bx bx-package text-sm mr-1" />{t('offers.heroSub')}</Badge></motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight"><Accent>{t('offers.heroTitle')}</Accent></motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Current Accounts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-[#121110] tracking-tight"><Accent>{t('offers.currentAccounts')}</Accent></motion.h2>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {accounts.map(({ key, price, features, highlight, bx }) => (
              <motion.div key={key} variants={fadeUp}>
                <Card className={`p-8 relative h-full flex flex-col ${highlight ? 'border-2 border-[#D2511A] ring-4 ring-[#D2511A]/10 shadow-2xl shadow-[#D2511A]/10' : 'border border-gray-100 shadow-md hover:shadow-xl'} transition-all duration-300`}>
                  {highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge>{t('offers.recommended')}</Badge>
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${highlight ? 'bg-[#D2511A] shadow-lg shadow-[#D2511A]/30' : 'bg-gray-100'}`}>
                    <i className={`bx ${bx} text-2xl ${highlight ? 'text-[#121110]' : 'text-[#3A2A20]'}`} />
                  </div>
                  <h3 className="font-black text-2xl text-[#121110] mb-2 tracking-tight">{t(`offers.${key}.name`)}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-3xl font-black ${highlight ? 'text-[#D2511A]' : 'text-[#121110]'}`}>{price}</span>
                    {price !== t('offers.free') && <span className="text-gray-400 text-sm">{t('offers.perMonth')}</span>}
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <div className="w-5 h-5 rounded-full bg-[#D2511A]/15 flex items-center justify-center shrink-0">
                          <Check size={12} className="text-[#D2511A]" />
                        </div>
                        {t(`offers.${key}.${f}`)}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`block w-full text-center py-3 rounded-full font-semibold transition-all hover:scale-105 text-sm ${highlight ? 'bg-[#D2511A] text-[#121110] hover:shadow-[0_0_20px_rgba(210,81,26,0.4)] shadow-md shadow-[#D2511A]/20' : 'border-2 border-[#121110] text-[#121110] hover:bg-[#121110] hover:text-white'}`}
                  >
                    {t('offers.openAccount')}
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Savings */}
      <section className="py-20 bg-[#EBE2D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-3xl font-extrabold text-[#121110] text-center mb-12 tracking-tight"><Accent>{t('offers.savingsAccounts')}</Accent></motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            {savings.map((s) => (
              <motion.div key={s.name} variants={fadeUp}>
                <div className={`bg-gradient-to-br ${s.color} rounded-3xl p-8 text-white shadow-2xl shadow-black/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                    <i className={`bx ${s.bx} text-[#D2511A] text-3xl`} />
                  </div>
                  <h3 className="text-xl font-black mb-2 tracking-tight">{s.name}</h3>
                  <div className="text-5xl font-black text-[#D2511A] mb-2">{s.rate}</div>
                  <p className="text-white/70 text-sm mb-6 leading-relaxed">{s.desc}</p>
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-[#D2511A] text-[#121110] font-bold px-6 py-2.5 rounded-full hover:scale-105 transition-all text-sm shadow-lg shadow-black/10">
                    {t('offers.openAccount')} <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Credit Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-3xl font-extrabold text-[#121110] text-center mb-12 tracking-tight"><Accent>{t('offers.creditCards')}</Accent></motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {creditCards.map((card) => (
              <motion.div key={card.name} variants={fadeUp}>
                <Card className="p-6 h-full flex flex-col border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <i className={`bx ${card.bx} text-white text-2xl`} />
                  </div>
                  <h3 className="font-black text-xl text-[#121110] mb-4 tracking-tight">{card.name}</h3>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {card.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <div className="w-5 h-5 rounded-full bg-[#D2511A]/15 flex items-center justify-center shrink-0">
                          <Check size={12} className="text-[#D2511A]" />
                        </div>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="block w-full text-center bg-[#D2511A] text-[#121110] font-semibold py-2.5 rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(210,81,26,0.3)] transition-all text-sm shadow-md shadow-[#D2511A]/15">
                    {t('offers.learnMore')}
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Loans */}
      <section className="py-20 bg-[#EBE2D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-3xl font-extrabold text-[#121110] text-center mb-12 tracking-tight"><Accent>{t('offers.loansSection')}</Accent></motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {loans.map((loan) => (
              <motion.div key={loan.name} variants={fadeUp}>
                <Card className="p-6 h-full flex flex-col border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-b from-white to-gray-50">
                  <div className="w-12 h-12 rounded-2xl bg-[#121110]/5 flex items-center justify-center mb-4">
                    <i className={`bx ${loan.bx} ${loan.color} text-2xl`} />
                  </div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Zinssatz ab</div>
                  <div className="text-4xl font-black text-[#D2511A] mb-2">{loan.rate}</div>
                  <h3 className="font-bold text-xl text-[#121110] mb-2 tracking-tight">{loan.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 flex-1 leading-relaxed">{loan.desc}</p>
                  <Link to="/simulation" className="block w-full text-center border-2 border-[#D2511A] text-[#121110] font-semibold py-2.5 rounded-full hover:bg-[#D2511A] hover:scale-105 transition-all text-sm">
                    <i className="bx bx-calculator mr-1" />
                    {t('offers.simulate')}
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Business CTA */}
      <section className="py-20 bg-gradient-to-br from-[#121110] to-[#3A2A20]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-4">
              <div className="w-16 h-16 rounded-2xl bg-[#D2511A]/15 flex items-center justify-center mx-auto">
                <i className="bx bx-buildings text-[#D2511A] text-3xl" />
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-white mb-4 tracking-tight"><Accent>{t('offers.businessSection')}</Accent></motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 mb-8 leading-relaxed">Maßgeschneiderte Lösungen für Ihr Unternehmen — von der Startup-Phase bis zum Konzern.</motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-[#D2511A] text-[#121110] font-bold px-6 py-3 rounded-full hover:scale-105 transition-all shadow-lg shadow-black/10">
                {t('offers.learnMore')} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
