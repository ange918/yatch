import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react'
import Accent from '../components/Accent'
import CreditSimulator from '../components/CreditSimulator'
import Card from '../components/ui/Card'
import { LOANS } from '../data/loans'
import heroBg from '../assets/images/hero_banking_bg_1795449680872.jpg'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const STATS = [
  { key: 'clients', bx: 'bx-group', value: '1M+' },
  { key: 'years', bx: 'bx-history', value: '20' },
  { key: 'countries', bx: 'bx-globe', value: '4' },
  { key: 'assets', bx: 'bx-line-chart', value: '€10B' },
  { key: 'employees', bx: 'bx-building-house', value: '200+' },
  { key: 'rating', bx: 'bx-star', value: '4.8' },
]

export default function Home() {
  const { t } = useTranslation()
  const highlights = t('hero.highlights', { returnObjects: true })

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#121110] min-h-[520px] sm:min-h-[600px] flex items-center pt-28 sm:pt-36 pb-16 sm:pb-24 border-b border-[#121110]/15">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#121110]/65 via-[#121110]/45 to-[#121110]/75"
        />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.h1
              variants={fadeUp}
              style={{ textWrap: 'balance' }}
              className="text-[clamp(2.35rem,5.2vw,4.5rem)] font-extrabold text-white leading-[1.05] tracking-tight max-w-4xl mx-auto drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)]"
            >
              {t('hero.headlinePrefix')}
              <span className="font-serif-editorial italic text-[#F27D42]">
                {t('hero.headlineItalic')}
              </span>
              {t('hero.headlineSuffix')}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mt-6 leading-relaxed font-normal drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]"
            >
              {t('hero.subtext')}
            </motion.p>

            {Array.isArray(highlights) && highlights.length > 0 && (
              <motion.div
                variants={fadeUp}
                className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-semibold text-white/90"
              >
                {highlights.map((item, idx) => (
                  <span key={item} className="inline-flex items-center gap-3">
                    {idx > 0 && <span className="text-white/45" aria-hidden="true">·</span>}
                    <span className={idx === 0 ? 'text-[#F27D42]' : 'text-white/95'}>{item}</span>
                  </span>
                ))}
              </motion.div>
            )}

            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center items-center">
              <Link
                to="/simulation"
                className="inline-flex items-center justify-center gap-2 bg-[#D2511A] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#E8662E] transition-colors text-sm whitespace-nowrap shrink-0 shadow-lg"
              >
                <span>{t('hero.cta2')}</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/offers"
                className="inline-flex items-center justify-center gap-2 bg-white/95 text-[#121110] font-bold px-7 py-3.5 rounded-full hover:bg-white transition-colors text-sm whitespace-nowrap shrink-0 shadow-lg"
              >
                <span>{t('hero.cta1')}</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Simulation */}
      <section id="simulation" className="py-16 sm:py-20 bg-[#EBE2D1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-10">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.14em] text-[#D2511A] mb-3">
              {t('simulation.heroSub')}
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-[#121110] tracking-tight">
              <Accent editorial>{t('simulation.heroTitle')}</Accent>
            </motion.h2>
          </motion.div>
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

      {/* Loan products — image card grid */}
      <section className="py-20 bg-[#FAF8F3] border-t border-[#121110]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.14em] text-[#D2511A] mb-3">
              {t('loans.sectionBadge')}
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121110] tracking-tight">
              <Accent editorial>{t('loans.sectionTitle')}</Accent>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#4A453E] mt-3 max-w-xl mx-auto">
              {t('loans.sectionSubtitle')}
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {LOANS.map((loan) => (
              <motion.div key={loan.slug} variants={fadeUp}>
                <Link
                  to={`/kredite/${loan.slug}`}
                  className="block group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={loan.img}
                      alt={t(`loans.${loan.slug}.name`)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-black text-[#121110] mb-1 tracking-tight group-hover:text-[#3A2A20] transition-colors">
                      {t(`loans.${loan.slug}.name`)}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">{t(`loans.${loan.slug}.shortDesc`)}</p>
                    <span className="inline-flex items-center gap-1.5 text-[#3A2A20] font-bold text-sm group-hover:gap-3 transition-all">
                      {t('loans.learnMore')} <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#121110] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#D2511A] rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E8793F] rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {STATS.map(({ key, bx, value }) => (
              <motion.div key={key} variants={fadeUp} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#D2511A]/10 flex items-center justify-center mx-auto mb-3">
                  <i className={`bx ${bx} text-[#D2511A] text-2xl`} />
                </div>
                <div className="text-2xl font-extrabold text-[#D2511A] mb-1">{value}</div>
                <p className="text-white/60 text-xs font-medium">{t(`stats.${key}`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-[#121110] tracking-tight mb-3"><Accent editorial>{t('testimonials.title')}</Accent></motion.h2>
            <motion.p variants={fadeUp} className="text-[#4A453E] font-medium">{t('testimonials.subtitle')}</motion.p>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { key: 't1', photo: '/portraits/testimonial-1.png' },
              { key: 't2', photo: '/portraits/testimonial-2.png' },
              { key: 't3', photo: '/portraits/testimonial-3.png' },
            ].map(({ key, photo }) => (
              <motion.div key={key} variants={fadeUp}>
                <Card className="p-6 h-full flex flex-col bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-5 italic flex-1">"{t(`testimonials.${key}.text`)}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <img
                      src={photo}
                      alt={t(`testimonials.${key}.name`)}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#D2511A]/30 shrink-0"
                    />
                    <div>
                      <p className="font-bold text-[#121110] text-sm">{t(`testimonials.${key}.name`)}</p>
                      <p className="text-xs text-gray-400">{t(`testimonials.${key}.role`)}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#EBE2D1]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-[#121110] mb-4 tracking-tight">
              <Accent editorial>{t('home.ctaTitle')}</Accent>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#4A453E] mb-8 text-lg">
              {t('home.ctaText')}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3.5 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#121110] text-white font-bold px-8 py-4 rounded-full hover:bg-[#D2511A] transition-colors text-sm sm:text-base shadow-sm"
              >
                {t('nav.apply')} <ArrowRight size={18} />
              </Link>
              <Link
                to="/simulation"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#121110] border border-[#121110]/15 font-bold px-8 py-4 rounded-full hover:border-[#121110]/40 transition-colors text-sm sm:text-base shadow-sm"
              >
                <i className="bx bx-calculator text-lg" />
                {t('nav.simulation')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
