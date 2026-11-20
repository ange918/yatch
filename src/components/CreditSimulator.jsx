import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { fmtCurrency, fmtPercent } from '../i18n/format'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const TABS = [
  { key: 'immo', minAmount: 50000, maxAmount: 2000000, defaultAmount: 300000, minDuration: 12, maxDuration: 360, defaultDuration: 240, rate: 3.5 },
  { key: 'auto', minAmount: 5000, maxAmount: 150000, defaultAmount: 25000, minDuration: 12, maxDuration: 84, defaultDuration: 60, rate: 4.2 },
  { key: 'privat', minAmount: 1000, maxAmount: 75000, defaultAmount: 15000, minDuration: 6, maxDuration: 84, defaultDuration: 48, rate: 5.9 },
]

export default function CreditSimulator() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language || 'de'
  const formatCurrency = (n) => fmtCurrency(n, lang)
  const [tabIndex, setTabIndex] = useState(0)
  const tab = TABS[tabIndex]
  const [amount, setAmount] = useState(tab.defaultAmount)
  const [duration, setDuration] = useState(tab.defaultDuration)
  const [insurance, setInsurance] = useState(false)

  const handleTabChange = (i) => {
    setTabIndex(i)
    setAmount(TABS[i].defaultAmount)
    setDuration(TABS[i].defaultDuration)
  }

  const { monthly, totalCost, totalInterest } = useMemo(() => {
    const rate = (tab.rate + (insurance ? 0.3 : 0)) / 100 / 12
    const n = duration
    const m = rate === 0 ? amount / n : (amount * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1)
    return { monthly: m, totalCost: m * n, totalInterest: (m * n) - amount }
  }, [amount, duration, insurance, tab])

  return (
    <div className="bg-white rounded-[24px] shadow-[0_24px_60px_-15px_rgba(18,17,16,0.09)] border border-[#121110]/10 overflow-hidden">
      <div className="flex bg-[#FAF8F3] border-b border-[#121110]/8 p-1.5 gap-1.5">
        {['simulation.tabImmo', 'simulation.tabAuto', 'simulation.tabPrivat'].map((label, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleTabChange(i)}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
              tabIndex === i
                ? 'bg-[#121110] text-white'
                : 'text-[#575148] hover:text-[#121110] hover:bg-[#121110]/5'
            }`}
          >
            {t(label)}
          </button>
        ))}
      </div>

      <div className="p-6 lg:p-8 grid lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
          <div>
            <div className="flex justify-between mb-3">
              <label className="text-sm font-bold text-[#121110]">{t('simulation.loanAmount')}</label>
              <span className="font-extrabold text-[#121110] tabular-nums">{formatCurrency(amount)}</span>
            </div>
            <input
              type="range"
              min={tab.minAmount}
              max={tab.maxAmount}
              step={500}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between mb-3">
              <label className="text-sm font-bold text-[#121110]">{t('simulation.duration')}</label>
              <span className="font-extrabold text-[#121110] tabular-nums">{duration} {t('heroPreview.monthsUnit')}</span>
            </div>
            <input
              type="range"
              min={tab.minDuration}
              max={tab.maxDuration}
              step={6}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>
          <div className="p-4 bg-[#FAF8F3] border border-[#121110]/8 rounded-xl flex justify-between items-center">
            <span className="text-sm font-medium text-[#4A453E]">{t('simulation.interestRate')}</span>
            <span className="font-extrabold text-[#121110] tabular-nums">{fmtPercent(tab.rate, lang)}</span>
          </div>
          <label className="flex items-center gap-3 p-4 bg-white border border-[#121110]/12 rounded-xl cursor-pointer hover:border-[#D2511A] transition-colors">
            <input
              type="checkbox"
              checked={insurance}
              onChange={(e) => setInsurance(e.target.checked)}
              className="accent-[#D2511A] w-4 h-4"
            />
            <span className="text-sm font-semibold text-[#121110]">{t('simulation.insurance')}</span>
          </label>
        </div>

        <div className="lg:col-span-5 bg-[#FAF8F3] border border-[#121110]/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#8A8175]">
              {t('simulation.monthlyPayment')}
            </p>
            <p className="text-4xl font-extrabold text-[#D2511A] mt-2 mb-6 tabular-nums">
              {fmtCurrency(monthly, lang, 2)}
            </p>
            <div className="space-y-3 border-t border-[#121110]/10 pt-4 text-sm">
              <div className="flex justify-between text-[#575148]">
                <span>{t('simulation.totalCost')}</span>
                <span className="font-bold text-[#121110] tabular-nums">{formatCurrency(totalCost)}</span>
              </div>
              <div className="flex justify-between text-[#575148]">
                <span>{t('simulation.totalInterest')}</span>
                <span className="font-bold text-[#D2511A] tabular-nums">{formatCurrency(totalInterest)}</span>
              </div>
            </div>
          </div>
          <Link
            to={`/contact?amount=${amount}&duration=${duration}&subject=${tab.key === 'immo' ? 'loan' : tab.key}`}
            className="mt-6 inline-flex items-center justify-center gap-2 w-full bg-[#121110] text-white font-bold py-3.5 px-6 rounded-full hover:bg-[#D2511A] transition-colors text-sm"
          >
            <span>{t('simulation.applyNow')}</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}