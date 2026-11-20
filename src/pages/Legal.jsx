import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Accent from '../components/Accent'
import PageHero from '../components/PageHero'

const TAB_ICONS = {
  privacy: 'bx-shield-alt-2',
  terms: 'bx-file',
  cookies: 'bx-cookie',
  regulatory: 'bx-badge-check',
}

export default function Legal() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('privacy')

  const tabs = [
    { key: 'privacy', label: t('legal.privacy') },
    { key: 'terms', label: t('legal.terms') },
    { key: 'cookies', label: t('legal.cookies') },
    { key: 'regulatory', label: t('legal.regulatory') },
  ]

  const content = {
    privacy: { title: t('legal.privacy'), sections: t('legal.content.privacy', { returnObjects: true }) },
    terms: { title: t('legal.terms'), sections: t('legal.content.terms', { returnObjects: true }) },
    cookies: { title: t('legal.cookies'), sections: t('legal.content.cookies', { returnObjects: true }) },
    regulatory: { title: t('legal.regulatory'), sections: t('legal.content.regulatory', { returnObjects: true }) },
  }

  const active = content[activeTab]

  return (
    <div>
      <PageHero eyebrow={t('legal.heroSub')} title={t('legal.heroTitle')} />

      <section className="py-16 sm:py-20 bg-[#EBE2D1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap sm:flex-nowrap gap-1.5 mb-8 bg-white rounded-2xl p-1.5 border border-[#121110]/10 shadow-[0_12px_30px_-14px_rgba(18,17,16,0.08)]">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-[#121110] text-white'
                    : 'text-[#575148] hover:text-[#121110] hover:bg-[#FAF8F3]'
                }`}
              >
                <i className={`bx ${TAB_ICONS[tab.key]} text-base ${activeTab === tab.key ? 'text-[#D2511A]' : 'text-[#8A8175]'}`} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-[24px] shadow-[0_18px_45px_-15px_rgba(18,17,16,0.08)] border border-[#121110]/10 p-8 sm:p-10"
          >
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#121110]/8">
              <div className="w-10 h-10 rounded-xl bg-[#D2511A]/10 flex items-center justify-center">
                <i className={`bx ${TAB_ICONS[activeTab]} text-[#D2511A] text-xl`} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#121110] tracking-tight">
                <Accent editorial>{active.title}</Accent>
              </h2>
            </div>
            <div className="space-y-6">
              {active.sections.map((section, i) => (
                <div key={i} className="border-b border-[#121110]/8 pb-6 last:border-0 last:pb-0">
                  <h3 className="font-bold text-[#121110] mb-2 flex items-center gap-2">
                    <i className="bx bx-chevron-right text-[#D2511A]" />
                    {section.heading}
                  </h3>
                  <p className="text-[#4A453E] text-sm leading-relaxed pl-6">{section.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
