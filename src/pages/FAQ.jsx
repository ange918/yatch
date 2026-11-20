import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Accordion from '../components/ui/Accordion'
import Accent from '../components/Accent'
import PageHero from '../components/PageHero'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const stagger = { visible: { transition: { staggerChildren: 0.06 } } }

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
    <div>
      <PageHero eyebrow={t('faq.heroSub')} title={t('faq.heroTitle')}>
        <div className="max-w-xl mx-auto relative">
          <i className="bx bx-search absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6359] text-xl" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('faq.searchPlaceholder')}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-[#121110]/12 text-[#121110] placeholder:text-[#8A8175] text-sm focus:outline-none focus:border-[#D2511A] shadow-[0_14px_38px_-14px_rgba(18,17,16,0.08)] font-medium"
          />
        </div>
      </PageHero>

      <section className="py-16 bg-[#EBE2D1]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#121110] text-white'
                    : 'bg-white text-[#575148] hover:text-[#121110] border border-[#121110]/10'
                }`}
              >
                <i className={`bx ${CAT_ICONS[cat]} text-base ${activeCategory === cat ? 'text-[#D2511A]' : 'text-[#8A8175]'}`} />
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
              <div className="text-center py-16 bg-white rounded-[24px] border border-[#121110]/10">
                <i className="bx bx-search text-[#8A8175] text-4xl mb-3 block" />
                <p className="text-[#4A453E] font-medium">{t('faq.noResults')}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-[#121110]/8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[#D2511A]/10 flex items-center justify-center mx-auto">
                <i className="bx bx-support text-[#D2511A] text-2xl" />
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-[#121110] mb-4 tracking-tight">
              <Accent editorial>{t('faq.ctaTitle')}</Accent>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#4A453E] mb-8 leading-relaxed">{t('faq.ctaText')}</motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#121110] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#D2511A] transition-colors text-sm"
              >
                <i className="bx bx-chat text-lg" />
                {t('faq.ctaButton')} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
