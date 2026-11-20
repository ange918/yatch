import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Accent from '../components/Accent'
import PageHero from '../components/PageHero'
import Card from '../components/ui/Card'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

const ONLINE_FEATURES = [
  { bx: 'bx-transfer', k: 'on1' },
  { bx: 'bx-credit-card', k: 'on2' },
  { bx: 'bx-bar-chart-alt-2', k: 'on3' },
  { bx: 'bx-refresh', k: 'on4' },
  { bx: 'bx-bell', k: 'on5' },
]

const INTL_FEATURES = [
  { bx: 'bx-globe', k: 'in1' },
  { bx: 'bx-dollar-circle', k: 'in2' },
  { bx: 'bx-shield-quarter', k: 'in3' },
  { bx: 'bx-trending-up', k: 'in4' },
]

const BUSINESS_FEATURES = [
  { bx: 'bx-group', k: 'bz1' },
  { bx: 'bx-receipt', k: 'bz2' },
  { bx: 'bx-buildings', k: 'bz3' },
  { bx: 'bx-user-voice', k: 'bz4' },
]

const DIGITAL_TOOLS = [
  { bx: 'bx-wallet', k: 'dg1' },
  { bx: 'bx-target-lock', k: 'dg2' },
  { bx: 'bx-category', k: 'dg3' },
  { bx: 'bx-bell-plus', k: 'dg4' },
]

const SUPPORT = [
  { bx: 'bx-chat', k: 'sp1' },
  { bx: 'bx-phone', k: 'sp2', title: '+41 79 923 92 59', href: 'tel:+41799239259' },
  { bx: 'bx-envelope', k: 'sp3', title: 'contact@krediiwelt.com', href: 'mailto:contact@krediiwelt.com' },
  { bx: 'bx-map-pin', k: 'sp4', title: 'Bankstraße 1, Frankfurt' },
]

const SECURITY = [
  { bx: 'bx-lock-alt', k: 'sc1' },
  { bx: 'bx-shield', k: 'sc2' },
]

function ServiceSection({ title, items, bg = 'bg-[#EBE2D1]' }) {
  const { t } = useTranslation()
  return (
    <section className={`py-16 ${bg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-2xl sm:text-3xl font-extrabold text-[#121110] mb-8 tracking-tight"
        >
          <Accent editorial>{title}</Accent>
        </motion.h2>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {items.map(({ bx, k }) => (
            <motion.div key={k} variants={fadeUp}>
              <Card className="p-5 flex items-start gap-4 h-full">
                <div className="w-11 h-11 rounded-xl bg-[#D2511A]/10 flex items-center justify-center shrink-0">
                  <i className={`bx ${bx} text-[#D2511A] text-xl`} />
                </div>
                <div>
                  <p className="font-bold text-[#121110] mb-1 text-sm leading-tight">{t(`svc.${k}.title`)}</p>
                  <p className="text-[#4A453E] text-xs leading-relaxed">{t(`svc.${k}.desc`)}</p>
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
    <div>
      <PageHero eyebrow={t('services.heroSub')} title={t('services.heroTitle')} />

      <ServiceSection title={t('services.onlineTitle')} items={ONLINE_FEATURES} bg="bg-white" />
      <ServiceSection title={t('services.intlTitle')} items={INTL_FEATURES} />
      <ServiceSection title={t('services.businessTitle')} items={BUSINESS_FEATURES} bg="bg-white" />
      <ServiceSection title={t('services.digitalTitle')} items={DIGITAL_TOOLS} />

      {/* Support */}
      <section className="py-20 bg-white border-t border-[#121110]/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl sm:text-3xl font-extrabold text-[#121110] text-center mb-10 tracking-tight"
          >
            <Accent editorial>{t('services.supportTitle')}</Accent>
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {SUPPORT.map((s) => (
              <motion.div key={s.k} variants={fadeUp}>
                <Card className="p-6 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-xl bg-[#D2511A]/10 flex items-center justify-center mx-auto mb-3">
                    <i className={`bx ${s.bx} text-[#D2511A] text-2xl`} />
                  </div>
                  {s.href ? (
                    <a href={s.href} className="font-bold text-sm text-[#121110] hover:text-[#D2511A] transition-colors leading-tight mb-1">
                      {s.title}
                    </a>
                  ) : (
                    <p className="font-bold text-sm text-[#121110] leading-tight mb-1">{s.title || t(`svc.${s.k}.title`)}</p>
                  )}
                  <p className="text-[#6B6359] text-xs">{t(`svc.${s.k}.desc`)}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 bg-[#121110]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-12 tracking-tight"
          >
            <Accent editorial>{t('services.securityTitle')}</Accent>
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            {SECURITY.map((s) => (
              <motion.div key={s.k} variants={fadeUp} className="text-center p-6 rounded-[24px] border border-white/10 bg-white/[0.03]">
                <div className="w-14 h-14 rounded-2xl bg-[#D2511A]/15 flex items-center justify-center mx-auto mb-4">
                  <i className={`bx ${s.bx} text-[#D2511A] text-2xl`} />
                </div>
                <p className="font-bold text-white mb-2 text-sm leading-tight">{t(`svc.${s.k}.title`)}</p>
                <p className="text-white/60 text-xs leading-relaxed">{t(`svc.${s.k}.desc`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
