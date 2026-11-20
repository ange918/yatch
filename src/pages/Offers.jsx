import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Accent from '../components/Accent'
import PageHero from '../components/PageHero'
import { fmtPercent } from '../i18n/format'
import Card from '../components/ui/Card'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

export default function Offers() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language || 'de'

  const loans = [
    { name: t('simulation.tabImmo'), rate: 3.5, bx: 'bx-home', desc: t('offers.immoDesc'), subject: 'loan' },
    { name: t('simulation.tabAuto'), rate: 4.2, bx: 'bx-car', desc: t('offers.autoDesc'), subject: 'auto' },
    { name: t('simulation.tabPrivat'), rate: 5.9, bx: 'bx-user', desc: t('offers.privatDesc'), subject: 'privat' },
  ]

  return (
    <div>
      <PageHero eyebrow={t('offers.heroSub')} title={t('offers.heroTitle')} />

      {/* Loans */}
      <section className="py-16 sm:py-20 bg-[#EBE2D1]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl sm:text-4xl font-extrabold text-[#121110] text-center mb-12 tracking-tight"
          >
            <Accent editorial>{t('offers.loansSection')}</Accent>
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {loans.map((loan) => (
              <motion.div key={loan.name} variants={fadeUp}>
                <Card className="p-7 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#D2511A]/10 flex items-center justify-center mb-5">
                      <i className={`bx ${loan.bx} text-[#D2511A] text-2xl`} />
                    </div>
                    <p className="text-[11px] font-bold text-[#8A8175] uppercase tracking-wider mb-1">
                      {t('offers.rateFrom')}
                    </p>
                    <div className="text-4xl font-extrabold text-[#121110] mb-3 tabular-nums">
                      <span className="text-[#D2511A]">{fmtPercent(loan.rate, lang)}</span>
                    </div>
                    <h3 className="font-bold text-xl text-[#121110] mb-2 tracking-tight">{loan.name}</h3>
                    <p className="text-[#4A453E] text-sm mb-6 leading-relaxed">{loan.desc}</p>
                  </div>
                  <Link
                    to="/simulation"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#121110] text-white font-bold py-3 px-5 rounded-full hover:bg-[#D2511A] transition-colors text-sm"
                  >
                    <span>{t('offers.simulate')}</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Business CTA */}
      <section className="py-20 bg-white border-t border-[#121110]/8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[#D2511A]/10 flex items-center justify-center mx-auto">
                <i className="bx bx-buildings text-[#D2511A] text-2xl" />
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-[#121110] mb-4 tracking-tight">
              <Accent editorial>{t('offers.businessSection')}</Accent>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#4A453E] max-w-2xl mx-auto mb-8 leading-relaxed">
              {t('offers.businessText')}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#121110] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#D2511A] transition-colors text-sm"
              >
                {t('offers.learnMore')} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
