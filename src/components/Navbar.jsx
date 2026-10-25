import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import Flag from './Flag'

const LANGS = ['DE', 'FR', 'NL', 'EN']

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const changeLang = (lang) => {
    i18n.changeLanguage(lang.toLowerCase())
    setLangOpen(false)
  }

  const currentLang = i18n.language.slice(0, 2).toUpperCase()

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/simulation', label: t('nav.simulation') },
    { to: '/offers', label: t('nav.offers') },
    { to: '/services', label: t('nav.services') },
    { to: '/contact', label: t('nav.contact') },
    { to: '/faq', label: t('nav.faq') },
  ]

  const isActive = (to) => location.pathname === to

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-[#121110]/80 shadow-lg border-b border-white/10' : 'backdrop-blur-md bg-[#121110]/60'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D2511A] flex items-center justify-center">
              <span className="text-[#121110] font-black text-sm">K</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Finanzkredit</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(l.to) ? 'text-[#D2511A]' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-white/80 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Flag code={currentLang} /> <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-[#121110] border border-white/10 rounded-xl overflow-hidden shadow-xl">
                  {LANGS.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLang(lang)}
                      className={`flex items-center justify-center w-full px-4 py-2.5 text-sm transition-colors ${currentLang === lang ? 'text-[#D2511A] bg-white/5' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
                    >
                      <Flag code={lang} />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link to="/contact" className="px-4 py-2 text-sm font-semibold bg-[#D2511A] text-[#121110] rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(210,81,26,0.4)] transition-all">
              {t('nav.apply')}
            </Link>
          </div>

          <button className="lg:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'} text-2xl`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#121110]/95 backdrop-blur-xl border-t border-white/10 px-4 pb-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`block py-3 text-sm font-medium border-b border-white/5 ${isActive(l.to) ? 'text-[#D2511A]' : 'text-white/80'}`}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-wrap gap-2 mt-4">
            {LANGS.map((lang) => (
              <button
                key={lang}
                onClick={() => changeLang(lang)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${currentLang === lang ? 'bg-[#D2511A] text-[#121110] border-[#D2511A]' : 'text-white/70 border-white/20 hover:border-white/40'}`}
              >
                <Flag code={lang} />
              </button>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <Link to="/contact" className="flex-1 text-center py-2.5 text-sm font-semibold bg-[#D2511A] text-[#121110] rounded-full">
              {t('nav.apply')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
