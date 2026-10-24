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
