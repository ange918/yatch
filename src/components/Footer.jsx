import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Shield, Lock, Award, CheckCircle } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="bg-[#121110] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#D2511A] flex items-center justify-center">
                <span className="text-[#121110] font-black text-sm">K</span>
              </div>
              <span className="font-bold text-xl">Finanzkredit</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">{t('footer.tagline')}</p>
          </div>

          <div>
            <h4 className="font-semibold text-[#D2511A] mb-4 text-sm uppercase tracking-wider">{t('footer.products')}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/offers" className="hover:text-[#D2511A] transition-colors">{t('footer.currentAccount')}</Link></li>
              <li><Link to="/offers" className="hover:text-[#D2511A] transition-colors">{t('footer.savingsAccount')}</Link></li>
              <li><Link to="/offers" className="hover:text-[#D2511A] transition-colors">{t('footer.creditCard')}</Link></li>
              <li><Link to="/offers" className="hover:text-[#D2511A] transition-colors">{t('footer.loans')}</Link></li>
              <li><Link to="/offers" className="hover:text-[#D2511A] transition-colors">{t('footer.investments')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#D2511A] mb-4 text-sm uppercase tracking-wider">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/about" className="hover:text-[#D2511A] transition-colors">{t('footer.about')}</Link></li>
              <li><Link to="/about" className="hover:text-[#D2511A] transition-colors">{t('footer.careers')}</Link></li>
              <li><Link to="/about" className="hover:text-[#D2511A] transition-colors">{t('footer.press')}</Link></li>
              <li><Link to="/about" className="hover:text-[#D2511A] transition-colors">{t('footer.blog')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#D2511A] mb-4 text-sm uppercase tracking-wider">{t('footer.support')}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/faq" className="hover:text-[#D2511A] transition-colors">{t('footer.faq')}</Link></li>
              <li><Link to="/contact" className="hover:text-[#D2511A] transition-colors">{t('footer.contact')}</Link></li>
              <li><Link to="/contact" className="hover:text-[#D2511A] transition-colors">{t('footer.liveChat')}</Link></li>
              <li><Link to="/services" className="hover:text-[#D2511A] transition-colors">{t('footer.security')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#D2511A] mb-4 text-sm uppercase tracking-wider">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/legal" className="hover:text-[#D2511A] transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link to="/legal" className="hover:text-[#D2511A] transition-colors">{t('footer.terms')}</Link></li>
              <li><Link to="/legal" className="hover:text-[#D2511A] transition-colors">{t('footer.cookies')}</Link></li>
              <li><Link to="/legal" className="hover:text-[#D2511A] transition-colors">{t('footer.regulatory')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="py-8 border-b border-white/10">
          <div className="flex flex-wrap gap-6 justify-center">
            {[
              { icon: Lock, label: t('footer.security1') },
              { icon: Shield, label: t('footer.security2') },
              { icon: CheckCircle, label: t('footer.security3') },
              { icon: Award, label: t('footer.security4') },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-white/50">
                <Icon size={14} className="text-[#D2511A]" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Finanzkredit AG. {t('footer.rights')}</p>
          <div className="flex gap-4">
            <Link to="/legal" className="hover:text-white/70 transition-colors">{t('footer.privacy')}</Link>
            <Link to="/legal" className="hover:text-white/70 transition-colors">{t('footer.terms')}</Link>
            <Link to="/legal" className="hover:text-white/70 transition-colors">{t('footer.cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
