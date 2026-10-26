import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Accordion from '../components/ui/Accordion'
import Badge from '../components/ui/Badge'
import Accent from '../components/Accent'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

const HERO_IMG = 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=1920&q=80'

const CAT_ICONS = {
  all: 'bx-grid-alt',
  accounts: 'bx-user-circle',
  cards: 'bx-credit-card',
  loans: 'bx-wallet',
  transfers: 'bx-transfer',
  security: 'bx-shield-alt-2',
  app: 'bx-mobile-alt',
}

export default function FAQ() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', 'cards', 'loans', 'transfers', 'security']

  const filtered = useMemo(() => {
    const allFaqs = t('faq.items', { returnObjects: true })
    return allFaqs.filter((faq) => {
      const matchCat = activeCategory === 'all' || faq.category === activeCategory
      const matchSearch = !search || faq.q.toLowerCase().includes(search.toLowerCase()) || faq.a.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [search, activeCategory, t])

  return (
    <div className="pt-16">
      {/* Hero */}
      <section
        className="relative py-36 text-center overflow-hidden hero-bg"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#8F3510]/90 via-[#121110]/88 to-[#3A2A20]/80 backdrop-blur-[1px]" />
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
            <motion.div variants={fadeUp}><Badge className="mb-6"><i className="bx bx-help-circle text-sm mr-1" />{t('faq.heroSub')}</Badge></motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight"><Accent>{t('faq.heroTitle')}</Accent></motion.h1>
            <motion.div variants={fadeUp} className="max-w-xl mx-auto relative">
              <i className="bx bx-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('faq.searchPlaceholder')}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#D2511A] shadow-2xl font-medium"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#EBE2D1]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-[#121110] text-[#D2511A] shadow-md' : 'bg-white text-gray-500 hover:text-gray-700 border border-gray-200 hover:shadow-sm'}`}
              >
                <i className={`bx ${CAT_ICONS[cat]} text-base`} />
                {t(`faq.categories.${cat}`)}
              </button>
            ))}
          </div>

          {/* Accordions */}
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-3">
            {filtered.length > 0 ? filtered.map((faq, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Accordion question={faq.q} answer={faq.a} />
              </motion.div>
            )) : (
              <div className="text-center py-16">
                <i className="bx bx-search text-gray-300 text-5xl mb-3 block" />
                <p className="text-gray-500">{t('faq.noResults')}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#121110] to-[#3A2A20]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#D2511A]/15 flex items-center justify-center mx-auto">
                <i className="bx bx-support text-[#D2511A] text-3xl" />
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-white mb-4 tracking-tight"><Accent>{t('faq.ctaTitle')}</Accent></motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 mb-8 leading-relaxed">{t('faq.ctaText')}</motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-[#D2511A] text-[#121110] font-bold px-8 py-4 rounded-full hover:scale-105 hover:shadow-lg transition-all shadow-md shadow-black/10">
                <i className="bx bx-chat text-lg" />
                {t('faq.ctaButton')} <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
