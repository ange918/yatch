import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, CheckCircle, Trophy } from 'lucide-react'
import Accent from '../components/Accent'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { LOANS } from '../data/loans'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

const HERO_IMG = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80'

const STATS = [
  { key: 'clients', bx: 'bx-group', value: '1M+' },
  { key: 'years', bx: 'bx-history', value: '20' },
  { key: 'countries', bx: 'bx-globe', value: '4' },
  { key: 'assets', bx: 'bx-line-chart', value: '€10B' },
  { key: 'employees', bx: 'bx-building-house', value: '200+' },
  { key: 'rating', bx: 'bx-star', value: '4.8' },
]

const APP_FEATURES = [
  { key: 'feature1', bx: 'bx-bell' },
  { key: 'feature2', bx: 'bx-fingerprint' },
  { key: 'feature3', bx: 'bx-bar-chart-alt-2' },
  { key: 'feature4', bx: 'bx-zap' },
]

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-20">
        <div
          className="absolute -inset-4 hero-bg blur-[6px]"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-[#121110]/65" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-6">
              <Badge className="text-sm px-4 py-2 text-[#F5D5C2]!"><Trophy size={16} />{t('hero.badge')}</Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.05] tracking-tight"
            >
              <Accent>{t('hero.headline')}</Accent>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              {t('hero.subtext')}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/offers"
                className="inline-flex items-center justify-center gap-2 bg-[#D2511A] text-[#121110] font-bold px-8 py-4 rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(210,81,26,0.5)] transition-all text-base sm:text-lg"
              >
                <i className="bx bx-list-ul text-xl" />
                {t('hero.cta1')}
              </Link>
              <Link
                to="/simulation"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 hover:border-white/70 transition-all text-base sm:text-lg"
              >
                <i className="bx bx-calculator text-xl" />
                {t('hero.cta2')}
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} className="text-white/50 text-sm flex items-center justify-center gap-2">
              <CheckCircle size={16} className="text-[#D2511A]" />
              {t('hero.trustText')}
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#EBE2D1] to-transparent" />
      </section>

      {/* Loan products — image card grid */}
      <section className="py-20 bg-[#EBE2D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="mb-3">
              <Badge><i className="bx bx-money-withdraw text-sm mr-1" />{t('loans.sectionBadge')}</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121110] tracking-tight">
              <Accent>{t('loans.sectionTitle')}</Accent>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 mt-3 max-w-xl mx-auto">
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
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-[#121110] tracking-tight mb-3"><Accent>{t('testimonials.title')}</Accent></motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 font-medium">{t('testimonials.subtitle')}</motion.p>
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
              Bereit loszulegen?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 mb-8 text-lg">
              Beantragen Sie Ihren Wunschkredit in wenigen Minuten.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#D2511A] text-[#121110] font-bold px-8 py-4 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(210,81,26,0.4)] transition-all text-base sm:text-lg shadow-lg shadow-[#D2511A]/20"
              >
                {t('nav.apply')} <ArrowRight size={20} />
              </Link>
              <Link
                to="/simulation"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#121110] text-[#121110] font-bold px-8 py-4 rounded-full hover:bg-[#121110] hover:text-white transition-all text-base sm:text-lg"
              >
                <i className="bx bx-calculator text-xl" />
                {t('nav.simulation')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
