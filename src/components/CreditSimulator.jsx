import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Calculator, Info } from 'lucide-react'

const TABS = [
  { key: 'immo', minAmount: 50000, maxAmount: 2000000, defaultAmount: 300000, minDuration: 12, maxDuration: 360, defaultDuration: 240, rate: 3.5 },
  { key: 'auto', minAmount: 5000, maxAmount: 150000, defaultAmount: 25000, minDuration: 12, maxDuration: 84, defaultDuration: 60, rate: 4.2 },
  { key: 'privat', minAmount: 1000, maxAmount: 75000, defaultAmount: 15000, minDuration: 6, maxDuration: 84, defaultDuration: 48, rate: 5.9 },
]

function formatCurrency(n) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export default function CreditSimulator() {
  const { t } = useTranslation()
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
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="flex border-b border-gray-100">
        {['simulation.tabImmo', 'simulation.tabAuto', 'simulation.tabPrivat'].map((label, i) => (
          <button key={i} onClick={() => handleTabChange(i)} className={`flex-1 py-4 text-sm font-semibold transition-all ${tabIndex === i ? 'bg-[#121110] text-[#D2511A] border-b-2 border-[#D2511A]' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
            {t(label)}
          </button>
        ))}
      </div>

      <div className="p-6 lg:p-8 grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-3"><label className="text-sm font-semibold">{t('simulation.loanAmount')}</label><span className="font-bold">{formatCurrency(amount)}</span></div>
            <input type="range" min={tab.minAmount} max={tab.maxAmount} step={500} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full h-2 bg-gray-200 accent-[#D2511A] cursor-pointer" />
          </div>
          <div>
            <div className="flex justify-between mb-3"><label className="text-sm font-semibold">{t('simulation.duration')}</label><span className="font-bold">{duration} Mo.</span></div>
            <input type="range" min={tab.minDuration} max={tab.maxDuration} step={6} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full h-2 bg-gray-200 accent-[#D2511A] cursor-pointer" />
          </div>
          <div className="p-4 bg-gray-50 rounded-xl flex justify-between items-center"><span className="text-sm">{t('simulation.interestRate')}</span><span className="font-bold">{tab.rate}%</span></div>
          <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-[#D2511A]">
            <input type="checkbox" checked={insurance} onChange={(e) => setInsurance(e.target.checked)} />
            <span className="text-sm font-medium">{t('simulation.insurance')}</span>
          </label>
        </div>

        <div className="bg-gradient-to-br from-[#121110] to-[#3A2A20] rounded-2xl p-6 text-white flex flex-col justify-center">
          <p className="text-sm text-white/70">{t('simulation.monthlyPayment')}</p>
          <p className="text-4xl font-black text-[#D2511A] mb-6">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(monthly)}</p>
          <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between"><span>{t('simulation.totalCost')}</span><span className="font-bold">{formatCurrency(totalCost)}</span></div>
            <div className="flex justify-between"><span>{t('simulation.totalInterest')}</span><span className="font-bold text-[#E8793F]">{formatCurrency(totalInterest)}</span></div>
          </div>
          {/* LIEN DYNAMIQUE VERS CONTACT */}
          <Link 
            to={`/contact?amount=${amount}&duration=${duration}&subject=${tab.key === 'immo' ? 'loan' : tab.key}`} 
            className="mt-6 block w-full text-center bg-[#D2511A] text-[#121110] font-bold py-3 rounded-full hover:scale-105 transition-all"
          >
            {t('simulation.applyNow')}
          </Link>
        </div>
      </div>
    </div>
  )
}