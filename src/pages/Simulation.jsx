import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import CreditSimulator from '../components/CreditSimulator'
import PageHero from '../components/PageHero'

const FEATURES = ['f1', 'f2', 'f3', 'f4']

export default function Simulation() {
  const { t } = useTranslation()
  return (
    <div>
      <PageHero eyebrow={t('simulation.heroSub')} title={t('simulation.heroTitle')}>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-semibold text-[#575148]">
          {FEATURES.map((k, idx) => (
            <span key={k} className="inline-flex items-center gap-3">
              {idx > 0 && <span className="text-[#B8AFA3]" aria-hidden="true">·</span>}
              <span className={idx === 0 ? 'text-[#D2511A]' : 'text-[#3A2A20]'}>{t(`simulation.${k}`)}</span>
            </span>
          ))}
        </div>
      </PageHero>

      <section className="py-16 sm:py-20 bg-[#EBE2D1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <CreditSimulator />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
