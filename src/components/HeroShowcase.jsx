import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, FileText, LayoutDashboard, Car, Home as HomeIcon, Wallet, RefreshCw } from 'lucide-react'
import { fmtCurrency, fmtPercent } from '../i18n/format'

const SCENARIOS = [
  {
    id: 'privat',
    subject: 'privat',
    icon: Wallet,
    amount: 15000,
    duration: 48,
    rate: 2.9,
    monthly: 331.38,
    interestShare: 11,
    curvePoints: [100, 78, 54, 28, 4],
  },
  {
    id: 'auto',
    subject: 'auto',
    icon: Car,
    amount: 24000,
    duration: 60,
    rate: 2.45,
    monthly: 425.4,
    interestShare: 9,
    curvePoints: [100, 81, 61, 39, 14],
  },
  {
    id: 'immo',
    subject: 'loan',
    icon: HomeIcon,
    amount: 180000,
    duration: 240,
    rate: 3.15,
    monthly: 1011.65,
    interestShare: 26,
    curvePoints: [100, 86, 68, 45, 16],
  },
  {
    id: 'umschuldung',
    subject: 'privat',
    icon: RefreshCw,
    amount: 35000,
    duration: 72,
    rate: 3.4,
    monthly: 538.12,
    interestShare: 14,
    curvePoints: [100, 82, 62, 37, 8],
  },
]

function buildSvgPath(points) {
  const width = 260
  const height = 84
  const padX = 12
  const padY = 10
  const usableW = width - padX * 2
  const usableH = height - padY * 2

  const coords = points.map((val, idx) => {
    const x = padX + (idx / (points.length - 1)) * usableW
    const y = padY + ((100 - val) / 100) * usableH
    return { x, y }
  })

  let d = `M ${coords[0].x} ${coords[0].y}`
  for (let i = 0; i < coords.length - 1; i++) {
    const curr = coords[i]
    const next = coords[i + 1]
    const cx = (curr.x + next.x) / 2
    d += ` C ${cx} ${curr.y}, ${cx} ${next.y}, ${next.x} ${next.y}`
  }

  const area = `${d} L ${coords[coords.length - 1].x} ${height - padY} L ${coords[0].x} ${height - padY} Z`
  return { line: d, area, coords }
}

export default function HeroShowcase() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language || 'de'
  const [selectedId, setSelectedId] = useState('auto')

  const active = SCENARIOS.find((s) => s.id === selectedId) || SCENARIOS[1]
  const { line, area, coords } = buildSvgPath(active.curvePoints)

  const circumference = 2 * Math.PI * 30
  const interestArc = (active.interestShare / 100) * circumference
  const principalArc = circumference - interestArc

  return (
    <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-left">
      {/* Left: Interactive Dashboard Preview */}
      <div className="lg:col-span-8 bg-white rounded-[24px] border border-[#121110]/10 shadow-[0_24px_60px_-15px_rgba(18,17,16,0.09)] overflow-hidden flex flex-col">
        <div className="px-5 py-3 border-b border-[#121110]/8 bg-[#FAF8F3] text-xs text-[#6B6359]">
          {t('heroPreview.disclaimer')}
        </div>

        {/* Browser Bar */}
        <div className="px-5 py-3 border-b border-[#121110]/8 flex items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E56B55]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8B84B]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#56B470]" />
          </div>
          <div className="flex-1 max-w-xs bg-[#F5F2EB] border border-[#121110]/8 rounded-lg px-3 py-1 text-[11px] text-[#575148] truncate text-center font-medium">
            app.krediiwelt.com/simulation
          </div>
          <span className="text-[11px] font-semibold text-[#6B6359] whitespace-nowrap shrink-0">
            {t('heroPreview.exampleTag')}
          </span>
        </div>

        {/* Dashboard Body */}
        <div className="grid grid-cols-1 sm:grid-cols-12 flex-1">
          {/* Sidebar */}
          <div className="sm:col-span-4 bg-[#FAF8F3] border-b sm:border-b-0 sm:border-r border-[#121110]/8 p-4 flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-5 px-2">
                <div className="w-6 h-6 rounded-md bg-[#D2511A] flex items-center justify-center shrink-0">
                  <span className="text-white font-black text-xs">K</span>
                </div>
                <span className="font-bold text-sm text-[#121110] tracking-tight">Finanzkredit</span>
              </div>

              <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-[#8A8175] mb-2">
                {t('heroPreview.menuLabel')}
              </p>

              <div className="space-y-1">
                {SCENARIOS.map((item) => {
                  const Icon = item.icon
                  const isCurrent = item.id === active.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                        isCurrent
                          ? 'bg-[#121110] text-white'
                          : 'text-[#575148] hover:bg-[#121110]/5 hover:text-[#121110]'
                      }`}
                    >
                      <Icon size={14} className={isCurrent ? 'text-[#D2511A]' : 'text-[#8A8175]'} />
                      <span className="truncate">{t(`heroPreview.scenarios.${item.id}`)}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="px-2 pt-3 border-t border-[#121110]/8 hidden sm:flex items-center gap-2 text-[11px] text-[#6B6359]">
              <LayoutDashboard size={13} className="text-[#D2511A] shrink-0" />
              <span className="truncate">{t('heroPreview.instantCalc')}</span>
            </div>
          </div>

          {/* Main Dashboard Area */}
          <div className="sm:col-span-8 p-5 sm:p-6 flex flex-col justify-between gap-5 bg-white">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8175] mb-1">
                  {t('heroPreview.viewLabel')}
                </p>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#121110] tracking-tight">
                  {t('heroPreview.dashboardTitle')}
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-[#4A453E] border border-[#121110]/12 rounded-lg px-2.5 py-1 bg-[#FAF8F3] whitespace-nowrap shrink-0">
                {t('heroPreview.currency')}
              </span>
            </div>

            {/* 3 KPIs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-[#121110]/8 bg-[#FCFAF6] p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8175] truncate">
                  {t('heroPreview.kpiAmount')}
                </p>
                <p className="text-base sm:text-lg font-extrabold text-[#121110] mt-1 tabular-nums truncate">
                  {fmtCurrency(active.amount, lang)}
                </p>
                <p className="text-[11px] text-[#6B6359] mt-0.5 tabular-nums">
                  {active.duration} {t('heroPreview.monthsUnit')}
                </p>
              </div>
              <div className="rounded-xl border border-[#121110]/8 bg-[#FCFAF6] p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8175] truncate">
                  {t('heroPreview.kpiMonthly')}
                </p>
                <p className="text-base sm:text-lg font-extrabold text-[#D2511A] mt-1 tabular-nums truncate">
                  {fmtCurrency(Math.round(active.monthly), lang)}
                </p>
                <p className="text-[11px] text-[#6B6359] mt-0.5 truncate">
                  {t('heroPreview.perMonth')}
                </p>
              </div>
              <div className="rounded-xl border border-[#121110]/8 bg-[#FCFAF6] p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8175] truncate">
                  {t('heroPreview.kpiRate')}
                </p>
                <p className="text-base sm:text-lg font-extrabold text-[#121110] mt-1 tabular-nums truncate">
                  {fmtPercent(active.rate, lang)}
                </p>
                <p className="text-[11px] text-[#6B6359] mt-0.5 truncate">
                  {t('heroPreview.fixedRate')}
                </p>
              </div>
            </div>

            {/* Bottom Charts */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-7 rounded-xl border border-[#121110]/8 bg-[#FCFAF6] p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <p className="text-xs font-bold text-[#121110]">{t('heroPreview.chartTitle')}</p>
                  <span className="text-[11px] text-[#6B6359]">{t('heroPreview.chartSub')}</span>
                </div>
                <svg viewBox="0 0 260 88" className="w-full h-20 overflow-visible" aria-hidden="true">
                  <defs>
                    <linearGradient id="heroCurveFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D2511A" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#D2511A" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d={area} fill="url(#heroCurveFill)" />
                  <path d={line} fill="none" stroke="#D2511A" strokeWidth="2.25" strokeLinecap="round" />
                  {coords.map((pt, i) => (
                    <circle key={i} cx={pt.x} cy={pt.y} r="3" fill="#FFFFFF" stroke="#D2511A" strokeWidth="2" />
                  ))}
                </svg>
                <div className="flex justify-between text-[10px] text-[#8A8175] font-medium tabular-nums mt-1 px-1">
                  <span>0 %</span>
                  <span>25 %</span>
                  <span>50 %</span>
                  <span>75 %</span>
                  <span>100 %</span>
                </div>
              </div>

              <div className="sm:col-span-5 rounded-xl border border-[#121110]/8 bg-[#FCFAF6] p-4 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-[#121110]">{t('heroPreview.splitTitle')}</p>
                  <p className="text-[11px] text-[#6B6359]">{t('heroPreview.splitSub')}</p>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <svg viewBox="0 0 80 80" className="w-16 h-16 shrink-0 -rotate-90" aria-hidden="true">
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#121110" strokeWidth="10" strokeDasharray={`${principalArc} ${circumference}`} />
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#D2511A" strokeWidth="10" strokeDasharray={`${interestArc} ${circumference}`} strokeDashoffset={-principalArc} />
                  </svg>
                  <div className="text-[11px] space-y-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[#121110] font-semibold tabular-nums">
                      <span className="w-2 h-2 rounded-xs bg-[#121110] shrink-0" />
                      <span className="truncate">{100 - active.interestShare}% {t('heroPreview.principal')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#575148] font-semibold tabular-nums">
                      <span className="w-2 h-2 rounded-xs bg-[#D2511A] shrink-0" />
                      <span className="truncate">{active.interestShare}% {t('heroPreview.interest')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Offer PDF Sheet Preview */}
      <div className="lg:col-span-4 bg-white rounded-[24px] border border-[#121110]/10 shadow-[0_24px_60px_-15px_rgba(18,17,16,0.09)] p-5 sm:p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#121110]/8">
          <div className="flex items-center gap-2 text-xs font-bold text-[#121110]">
            <FileText size={15} className="text-[#D2511A] shrink-0" />
            <span>{t('heroPreview.sheetTitle')}</span>
          </div>
          <span className="text-[11px] font-semibold text-[#6B6359]">
            {t('heroPreview.exampleTag')}
          </span>
        </div>

        <div className="my-4 rounded-2xl border border-[#121110]/8 bg-[#FAF8F3] p-5 flex-1 flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#121110]/8">
              <div>
                <p className="text-sm font-extrabold text-[#D2511A] tracking-tight">Finanzkredit AG</p>
                <p className="text-[11px] text-[#6B6359] mt-0.5">Zurich · Frankfurt</p>
                <p className="text-[11px] text-[#6B6359]">contact@krediiwelt.com</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-[#121110]">{t('heroPreview.docType')}</p>
                <p className="text-[11px] text-[#6B6359] tabular-nums mt-0.5">FK-2026-042</p>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-[11px] text-[#6B6359]">
                {t('heroPreview.purposeLabel')} · <span className="font-semibold text-[#121110]">{t(`heroPreview.scenarios.${active.id}`)}</span>
              </p>

              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex justify-between text-[#575148]">
                  <span>{t('heroPreview.kpiAmount')}</span>
                  <span className="font-semibold text-[#121110] tabular-nums">{fmtCurrency(active.amount, lang)}</span>
                </div>
                <div className="flex justify-between text-[#575148]">
                  <span>{t('heroPreview.durationLabel')}</span>
                  <span className="font-semibold text-[#121110] tabular-nums">{active.duration} {t('heroPreview.monthsUnit')}</span>
                </div>
                <div className="flex justify-between text-[#575148]">
                  <span>{t('heroPreview.kpiRate')}</span>
                  <span className="font-semibold text-[#121110] tabular-nums">{fmtPercent(active.rate, lang)}</span>
                </div>
                <div className="flex justify-between text-[#575148]">
                  <span>{t('heroPreview.feesLabel')}</span>
                  <span className="font-semibold text-[#121110] tabular-nums">{fmtCurrency(0, lang)}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="pt-3 border-t border-[#121110]/12 flex items-baseline justify-between">
              <span className="text-xs font-bold text-[#121110]">{t('heroPreview.kpiMonthly')}</span>
              <span className="text-lg font-extrabold text-[#D2511A] tabular-nums">
                {fmtCurrency(active.monthly, lang)}
              </span>
            </div>
            <p className="text-[11px] text-[#8F3510] mt-3 leading-relaxed">
              {t('heroPreview.docNote')}
            </p>
          </div>
        </div>

        <Link
          to={`/contact?amount=${active.amount}&duration=${active.duration}&subject=${active.subject}`}
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#121110] text-white text-xs font-bold hover:bg-[#D2511A] transition-colors whitespace-nowrap shrink-0"
        >
          <span>{t('heroPreview.applyWithOffer')}</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  )
}
