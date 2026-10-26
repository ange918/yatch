import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Accent from '../components/Accent'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const HERO_IMG = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80'

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
  { bx: 'bx-chat', k: 'sp1', gradient: 'from-[#3A2A20] to-[#E8793F]' },
  { bx: 'bx-phone', k: 'sp2', title: '+49 69 1234 5678', gradient: 'from-blue-500 to-blue-700' },
  { bx: 'bx-envelope', k: 'sp3', title: 'support@kreditwelt.de', gradient: 'from-purple-500 to-purple-700' },
  { bx: 'bx-map-pin', k: 'sp4', title: 'Bankstraße 1, Frankfurt', gradient: 'from-orange-500 to-red-500' },
]

const SECURITY = [
  { bx: 'bx-lock-alt', k: 'sc1' },
  { bx: 'bx-shield', k: 'sc2' },
]

function ServiceSection({ title, items, bg = 'bg-[#EBE2D1]' }) {
  const { t } = useTranslation()
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
          {items.map(({ bx, k }) => (
            <motion.div key={k} variants={fadeUp}>
              <Card className="p-5 flex items-start gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 bg-gradient-to-b from-white to-gray-50/50">
                <div className="w-11 h-11 rounded-xl bg-[#D2511A]/10 flex items-center justify-center shrink-0">
                  <i className={`bx ${bx} text-[#3A2A20] text-2xl`} />
                </div>
                <div>
                  <p className="font-bold text-[#121110] mb-1 text-sm leading-tight">{t(`svc.${k}.title`)}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{t(`svc.${k}.desc`)}</p>
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
              <motion.div key={s.k} variants={fadeUp}>
                <div className={`bg-gradient-to-br ${s.gradient} rounded-2xl p-6 text-white text-center hover:-translate-y-1 transition-all duration-300 shadow-lg`}>
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-3">
                    <i className={`bx ${s.bx} text-white text-2xl`} />
                  </div>
                  <p className="font-bold text-sm leading-tight mb-1">{s.title || t(`svc.${s.k}.title`)}</p>
                  <p className="text-white/70 text-xs">{t(`svc.${s.k}.desc`)}</p>
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
              <motion.div key={s.k} variants={fadeUp} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#D2511A]/10 flex items-center justify-center mx-auto mb-4 border border-[#D2511A]/20">
                  <i className={`bx ${s.bx} text-[#D2511A] text-3xl`} />
                </div>
                <p className="font-bold text-white mb-2 text-sm leading-tight">{t(`svc.${s.k}.title`)}</p>
                <p className="text-white/50 text-xs leading-relaxed">{t(`svc.${s.k}.desc`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
