import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Cookie, X } from 'lucide-react'

export default function CookieBanner() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(() => !localStorage.getItem('cookies-accepted'))

  if (!visible) return null

  const accept = () => {
    localStorage.setItem('cookies-accepted', 'all')
    setVisible(false)
  }
  const decline = () => {
    localStorage.setItem('cookies-accepted', 'none')
    setVisible(false)
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 bg-[#121110] border border-[#3A2A20] rounded-2xl p-5 shadow-2xl">
      <div className="flex items-start gap-3">
        <Cookie className="text-[#D2511A] shrink-0 mt-0.5" size={20} />
        <div className="flex-1">
          <p className="text-white text-sm leading-relaxed">{t('cookie.text')}</p>
          <div className="flex gap-2 mt-4">
            <button onClick={accept} className="flex-1 bg-[#D2511A] text-[#121110] text-xs font-semibold py-2 px-3 rounded-full hover:scale-105 transition-transform">
              {t('cookie.accept')}
            </button>
            <button onClick={decline} className="px-3 py-2 text-xs text-white/60 hover:text-white border border-white/20 rounded-full transition-colors">
              {t('cookie.decline')}
            </button>
          </div>
        </div>
        <button onClick={decline} className="text-white/40 hover:text-white transition-colors"><X size={16} /></button>
      </div>
    </div>
  )
}
