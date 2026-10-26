import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Star, CheckCircle } from 'lucide-react'
import Accent from '../components/Accent'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const HERO_IMG = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80'

const STATS = [
  { key: 'clients', bx: 'bx-group', value: '1M+' },
  { key: 'years', bx: 'bx-history', value: '20' },
  { key: 'countries', bx: 'bx-globe', value: 'EU' },
  { key: 'assets', bx: 'bx-line-chart', value: '€10B' },
  { key: 'employees', bx: 'bx-building-house', value: '200+' },
  { key: 'rating', bx: 'bx-star', value: '4.8' },
]

const TEAM_PHOTOS = [
  '/portraits/team-1.png',
  '/portraits/team-2.png',
  '/portraits/team-3.png',
  '/portraits/team-4.png',
  '/portraits/team-5.png',
  '/portraits/team-6.png',
]

export default function About() {
  const { t } = useTranslation()

  const milestones = ['milestone1', 'milestone2', 'milestone3', 'milestone4', 'milestone5']
  const members = ['member1', 'member2', 'member3', 'member4', 'member5', 'member6']

  const awards = [
    { k: 'award1', org: 'Handelsblatt', bx: 'bx-trophy' },
    { k: 'award2', org: 'Financial Times', bx: 'bx-medal' },
    { k: 'award3', org: 'Bundesverband Banken', bx: 'bx-bulb' },
    { k: 'award4', org: 'Focus Money', bx: 'bx-heart' },
  ]

  const press = [
    { name: 'Handelsblatt', k: 'press1' },
    { name: 'Financial Times', k: 'press2' },
    { name: 'Süddeutsche Zeitung', k: 'press3' },
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
            <motion.div variants={fadeUp} className="mb-4">
              <Badge className="mb-6">{t('about.heroSub')}</Badge>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              <Accent>{t('about.heroTitle')}</Accent>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-lg max-w-xl mx-auto">
              {t('about.tagline')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#D2511A]/10 flex items-center justify-center">
                    <i className="bx bx-target-lock text-[#D2511A] text-xl" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#121110] tracking-tight"><Accent>{t('about.missionTitle')}</Accent></h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-13">{t('about.missionText')}</p>
              </motion.div>
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#8F3510]/10 flex items-center justify-center">
                    <i className="bx bx-telescope text-[#8F3510] text-xl" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#121110] tracking-tight"><Accent>{t('about.visionTitle')}</Accent></h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{t('about.visionText')}</p>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <div className="bg-gradient-to-br from-[#121110] to-[#3A2A20] rounded-3xl p-10 text-white shadow-2xl shadow-[#121110]/20">
                <div className="text-center">
                  <i className="bx bx-line-chart text-[#D2511A] text-5xl mb-4" />
                  <div className="text-6xl font-black text-[#D2511A] mb-2">{t('about.aumValue')}</div>
                  <div className="text-white/70 mb-6">{t('about.aum')}</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <div className="text-white/50 text-sm">{t('about.happyClients')}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#121110] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#D2511A] rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {STATS.map(({ key, bx, value }) => (
              <div key={key} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#D2511A]/10 flex items-center justify-center mx-auto mb-3">
                  <i className={`bx ${bx} text-[#D2511A] text-2xl`} />
                </div>
                <div className="text-2xl font-black text-[#D2511A] mb-1">{value}</div>
                <p className="text-white/60 text-xs font-medium">{t(`stats.${key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#EBE2D1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl sm:text-4xl font-extrabold text-[#121110] text-center mb-16 tracking-tight"
          >
            <Accent>{t('about.historyTitle')}</Accent>
          </motion.h2>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 sm:-translate-x-0.5 w-0.5 bg-gradient-to-b from-[#D2511A] to-[#3A2A20] top-0 bottom-0" />
            <div className="space-y-10">
              {milestones.map((key, i) => (
                <motion.div
                  key={key}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className={`flex items-start gap-6 sm:gap-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} pl-12 sm:pl-0`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                    <Card className="inline-block p-5 max-w-xs text-left shadow-md hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
                      <Badge color="dark" className="mb-2">{t(`about.${key}.year`)}</Badge>
                      <h3 className="font-bold text-[#121110] mb-1">{t(`about.${key}.title`)}</h3>
                      <p className="text-gray-500 text-sm">{t(`about.${key}.desc`)}</p>
                    </Card>
                  </div>
                  <div className="absolute left-4 sm:static w-5 h-5 rounded-full bg-[#D2511A] border-4 border-white shadow-lg shadow-[#D2511A]/30 shrink-0 sm:mt-5 z-10" />
                  <div className="flex-1 hidden sm:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-[#121110] mb-2 tracking-tight"><Accent>{t('about.teamTitle')}</Accent></motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 font-medium">{t('about.teamSub')}</motion.p>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5"
          >
            {members.map((key, i) => (
              <motion.div key={key} variants={fadeUp}>
                <Card className="p-5 text-center hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-gray-50">
                  <img
                    src={TEAM_PHOTOS[i]}
                    alt={t(`about.${key}.name`)}
                    className="w-16 h-16 rounded-2xl mx-auto mb-3 object-cover shadow-lg"
                  />
                  <p className="font-bold text-[#121110] text-sm leading-tight">{t(`about.${key}.name`)}</p>
                  <p className="text-gray-400 text-xs mt-1 leading-tight">{t(`about.${key}.role`)}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-[#EBE2D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-extrabold text-[#121110] text-center mb-12 tracking-tight"
          ><Accent>{t('about.awardsTitle')}</Accent></motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-4 gap-5"
          >
            {awards.map((award) => (
              <motion.div key={award.k} variants={fadeUp}>
                <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-gray-50 border border-gray-100">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D2511A] to-[#E8793F] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#D2511A]/20">
                    <i className={`bx ${award.bx} text-white text-2xl`} />
                  </div>
                  <p className="font-bold text-[#121110] text-sm mb-1 leading-tight">{t(`about.${award.k}`)}</p>
                  <p className="text-gray-400 text-xs">{award.org}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Press */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-extrabold text-[#121110] text-center mb-12 tracking-tight"
          ><Accent>{t('about.pressTitle')}</Accent></motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {press.map((item) => (
              <motion.div key={item.name} variants={fadeUp}>
                <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <CheckCircle className="text-[#D2511A] mb-3" size={22} />
                  <p className="text-gray-600 italic text-sm mb-4 leading-relaxed">{t(`about.${item.k}`)}</p>
                  <p className="font-bold text-[#121110] text-sm">{item.name}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
