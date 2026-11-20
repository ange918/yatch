import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Star, CheckCircle } from 'lucide-react'
import Accent from '../components/Accent'
import PageHero from '../components/PageHero'
import Card from '../components/ui/Card'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

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
    <div>
      <PageHero
        eyebrow={t('about.heroSub')}
        title={t('about.heroTitle')}
        subtitle={t('about.tagline')}
      />

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="lg:col-span-7 space-y-10"
            >
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D2511A]/10 flex items-center justify-center shrink-0">
                    <i className="bx bx-target-lock text-[#D2511A] text-xl" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121110] tracking-tight">
                    <Accent editorial>{t('about.missionTitle')}</Accent>
                  </h2>
                </div>
                <p className="text-[#4A453E] leading-relaxed pl-13">{t('about.missionText')}</p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D2511A]/10 flex items-center justify-center shrink-0">
                    <i className="bx bx-telescope text-[#D2511A] text-xl" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121110] tracking-tight">
                    <Accent editorial>{t('about.visionTitle')}</Accent>
                  </h2>
                </div>
                <p className="text-[#4A453E] leading-relaxed pl-13">{t('about.visionText')}</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-5"
            >
              <div className="bg-[#FAF8F3] border border-[#121110]/10 rounded-[24px] p-10 text-center shadow-[0_24px_60px_-15px_rgba(18,17,16,0.08)]">
                <div className="w-12 h-12 rounded-2xl bg-[#D2511A]/10 flex items-center justify-center mx-auto mb-5">
                  <i className="bx bx-line-chart text-[#D2511A] text-2xl" />
                </div>
                <div className="text-5xl sm:text-6xl font-extrabold text-[#121110] mb-2 tabular-nums">
                  {t('about.aumValue')}
                </div>
                <div className="text-[#4A453E] text-sm font-medium mb-6">{t('about.aum')}</div>
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#D2511A] fill-[#D2511A]" />)}
                </div>
                <div className="text-[#6B6359] text-xs font-semibold">{t('about.happyClients')}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#121110]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {STATS.map(({ key, bx, value }) => (
              <div key={key} className="text-center">
                <div className="w-11 h-11 rounded-xl bg-[#D2511A]/15 flex items-center justify-center mx-auto mb-3">
                  <i className={`bx ${bx} text-[#D2511A] text-xl`} />
                </div>
                <div className="text-2xl font-extrabold text-white mb-1 tabular-nums">{value}</div>
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
            <Accent editorial>{t('about.historyTitle')}</Accent>
          </motion.h2>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 sm:-translate-x-0.5 w-0.5 bg-[#121110]/15 top-0 bottom-0" />
            <div className="space-y-10">
              {milestones.map((key, i) => (
                <motion.div
                  key={key}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className={`flex items-start gap-6 sm:gap-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} pl-12 sm:pl-0`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                    <Card className="inline-block p-6 max-w-xs text-left">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#D2511A] mb-2 tabular-nums">
                        {t(`about.${key}.year`)}
                      </p>
                      <h3 className="font-bold text-[#121110] mb-1.5">{t(`about.${key}.title`)}</h3>
                      <p className="text-[#4A453E] text-sm leading-relaxed">{t(`about.${key}.desc`)}</p>
                    </Card>
                  </div>
                  <div className="absolute left-4 sm:static w-4 h-4 rounded-full bg-[#D2511A] border-4 border-[#EBE2D1] shrink-0 sm:mt-6 z-10" />
                  <div className="flex-1 hidden sm:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-[#121110] mb-2 tracking-tight">
              <Accent editorial>{t('about.teamTitle')}</Accent>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#4A453E] font-medium">{t('about.teamSub')}</motion.p>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5"
          >
            {members.map((key, i) => (
              <motion.div key={key} variants={fadeUp}>
                <Card className="p-5 text-center h-full">
                  <img
                    src={TEAM_PHOTOS[i]}
                    alt={t(`about.${key}.name`)}
                    className="w-16 h-16 rounded-2xl mx-auto mb-3 object-cover border border-[#121110]/10"
                  />
                  <p className="font-bold text-[#121110] text-sm leading-tight">{t(`about.${key}.name`)}</p>
                  <p className="text-[#6B6359] text-xs mt-1 leading-tight">{t(`about.${key}.role`)}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-[#EBE2D1]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-extrabold text-[#121110] text-center mb-12 tracking-tight"
          >
            <Accent editorial>{t('about.awardsTitle')}</Accent>
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-4 gap-5"
          >
            {awards.map((award) => (
              <motion.div key={award.k} variants={fadeUp}>
                <Card className="p-6 text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#D2511A]/10 flex items-center justify-center mx-auto mb-4">
                    <i className={`bx ${award.bx} text-[#D2511A] text-2xl`} />
                  </div>
                  <p className="font-bold text-[#121110] text-sm mb-1 leading-tight">{t(`about.${award.k}`)}</p>
                  <p className="text-[#6B6359] text-xs">{award.org}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Press */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-extrabold text-[#121110] text-center mb-12 tracking-tight"
          >
            <Accent editorial>{t('about.pressTitle')}</Accent>
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {press.map((item) => (
              <motion.div key={item.name} variants={fadeUp}>
                <Card className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <CheckCircle className="text-[#D2511A] mb-3" size={20} />
                    <p className="text-[#4A453E] italic text-sm mb-4 leading-relaxed">{t(`about.${item.k}`)}</p>
                  </div>
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
