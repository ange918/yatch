import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import CreditSimulator from '../components/CreditSimulator'
import Badge from '../components/ui/Badge'
import Accent from '../components/Accent'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const stagger = { visible: { transition: { staggerChildren: 0.15 } } }

const HERO_IMG = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80'

const FEATURES = [
  { bx: 'bx-calculator', label: 'Sofortige Berechnung' },
  { bx: 'bx-slider', label: 'Interaktive Schieberegler' },
  { bx: 'bx-shield-quarter', label: 'Unverbindlich & kostenlos' },
  { bx: 'bx-time-five', label: 'Antwort in 24 Stunden' },
]

export default function Simulation() {
  const { t } = useTranslation()
  return (
    <div className="pt-16">
      <section
        className="relative py-36 text-center overflow-hidden hero-bg"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#8F3510]/90 via-[#121110]/88 to-[#3A2A20]/80 backdrop-blur-[1px]" />
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-4">
              <Badge className="mb-6">
                <i className="bx bx-calculator text-sm mr-1" />
                {t('simulation.heroSub')}
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              <Accent>{t('simulation.heroTitle')}</Accent>
            </motion.h1>
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
              {FEATURES.map(({ bx, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <i className={`bx ${bx} text-[#D2511A] text-2xl`} />
                  <span className="text-white/80 text-xs font-medium text-center leading-tight">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#EBE2D1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <CreditSimulator />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
