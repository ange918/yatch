import { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, ChevronRight, ShieldCheck, Lock, Globe, FileText, Phone, MessageCircle, Mail } from 'lucide-react'
import Accent from '../components/Accent'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

function FileUpload({ label, fieldName, file, preview, onChange, onClear }) {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  return (
    <div className="flex-1">
      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
        {label} <span className="text-red-400">*</span>
      </label>
      {!file ? (
        <div
          onClick={() => inputRef.current.click()}
          className="border-2 border-dashed border-gray-100 rounded-2xl p-6 text-center cursor-pointer transition-all hover:bg-gray-50"
        >
          <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="bx bx-cloud-upload text-gray-400 text-xl" />
          </div>
          <p className="text-[13px] font-semibold text-gray-500">{t('loanDetail.uploadClick')}</p>
          <p className="text-[11px] text-gray-400 mt-1">{t('loanDetail.uploadHint')}</p>
          <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={(e) => e.target.files[0] && onChange(fieldName, e.target.files[0])} />
        </div>
      ) : (
        <div className="relative border border-[#D2511A]/30 bg-[#D2511A]/5 rounded-2xl p-4 flex items-center gap-3">
          {preview && preview !== 'pdf' ? (
            <img src={preview} className="w-12 h-12 object-cover rounded-xl" alt="" />
          ) : (
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-100"><FileText className="text-[#D2511A]" size={20} /></div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-700 truncate">{file.name}</p>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">{t('loanDetail.uploadReady')}</p>
          </div>
          <button onClick={() => onClear(fieldName)} className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"><X size={16} /></button>
        </div>
      )}
    </div>
  )
}

export default function Contact() {
  const { t } = useTranslation()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const [form, setForm] = useState({
    firstName: '', lastName: '',
    email: '',
    address: '',
    amount: queryParams.get('amount') || '',
    duration: queryParams.get('duration') || '',
    profession: '',
    income: '',
    purpose: '',
  })
  const [files, setFiles] = useState({ id_front: null, id_back: null })
  const [previews, setPreviews] = useState({ id_front: null, id_back: null })
  const [loading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleFile = (field, file) => {
    setFiles(prev => ({ ...prev, [field]: file }))
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setPreviews(p => ({ ...p, [field]: e.target.result }))
      reader.readAsDataURL(file)
    } else {
      setPreviews(p => ({ ...p, [field]: 'pdf' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(t('apply.unavailable'))
  }

  const inputCls = "w-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#D2511A] rounded-2xl px-5 py-4 text-sm transition-all outline-none"

  return (
    <div className="pt-20 bg-[#EBE2D1]">
      <section className="relative py-28 text-center bg-[#121110] overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="relative max-w-4xl mx-auto px-4">
          <Badge className="mb-6 bg-[#D2511A]/10 text-[#D2511A] border-[#D2511A]/20">{t('apply.badge')}</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6"><Accent>{t('apply.title')}</Accent></h1>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('apply.subtitle')}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-16 pb-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-[32px] p-12 text-center shadow-sm border border-gray-100">
                  <div className="w-20 h-20 bg-[#D2511A]/10 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} className="text-[#D2511A]" /></div>
                  <h2 className="text-2xl font-black text-[#121110] mb-4">{t('apply.successTitle')}</h2>
                  <p className="text-gray-500 mb-8">{t('apply.successText')}</p>
                  <button onClick={() => setSubmitted(false)} className="font-bold text-[#D2511A] hover:underline">{t('apply.successReset')}</button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Card className="p-8 md:p-10 rounded-[32px] shadow-sm border-gray-100">
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-[#D2511A] rounded-xl flex items-center justify-center shadow-lg shadow-[#D2511A]/20">
                      <i className="bx bx-edit-alt text-white text-xl" />
                    </div>
                    <h2 className="text-2xl font-black text-[#121110]">{t('apply.formTitle')}</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* 1. Vor- und Nachname */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('apply.firstName')} <span className="text-red-400">*</span></label>
                        <input required className={inputCls} placeholder={`${t('apply.eg')} Max`} value={form.firstName} onChange={f('firstName')} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('apply.lastName')} <span className="text-red-400">*</span></label>
                        <input required className={inputCls} placeholder={t('apply.lastNamePh')} value={form.lastName} onChange={f('lastName')} />
                      </div>
                    </div>

                    {/* 2. E-Mail */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('apply.email')} <span className="text-red-400">*</span></label>
                      <input type="email" required className={inputCls} placeholder={t('apply.emailPh')} value={form.email} onChange={f('email')} />
                    </div>

                    {/* 3. Vollständige Adresse */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('apply.address')} <span className="text-red-400">*</span></label>
                      <textarea required rows={3} className={`${inputCls} resize-none`} placeholder={t('apply.addressPh')} value={form.address} onChange={f('address')} />
                    </div>

                    {/* 3. Kreditbetrag & Laufzeit */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('apply.amount')} <span className="text-red-400">*</span></label>
                        <input type="number" required min="500" className={inputCls} placeholder={`${t('apply.eg')} 15 000`} value={form.amount} onChange={f('amount')} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('apply.duration')} <span className="text-red-400">*</span></label>
                        <input type="number" required min="6" max="360" className={inputCls} placeholder={`${t('apply.eg')} 60`} value={form.duration} onChange={f('duration')} />
                      </div>
                    </div>

                    {/* 4. Beruf */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('apply.profession')} <span className="text-red-400">*</span></label>
                      <input required className={inputCls} placeholder={t('apply.professionPh')} value={form.profession} onChange={f('profession')} />
                    </div>

                    {/* 5. Netto-Monatseinkommen */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('apply.income')} <span className="text-red-400">*</span></label>
                      <input type="number" required min="0" className={inputCls} placeholder={`${t('apply.eg')} 3 200`} value={form.income} onChange={f('income')} />
                    </div>

                    {/* 6. Verwendungszweck */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('apply.purpose')} <span className="text-red-400">*</span></label>
                      <select required className={`${inputCls} appearance-none cursor-pointer`} value={form.purpose} onChange={f('purpose')}>
                        <option value="">{t('apply.purposeChoose')}</option>
                        <option value="Auto">{t('apply.purposes.car')}</option>
                        <option value="Immobilien">{t('apply.purposes.realEstate')}</option>
                        <option value="Renovierung">{t('apply.purposes.renovation')}</option>
                        <option value="Konsum">{t('apply.purposes.consumption')}</option>
                        <option value="Sonstiges">{t('apply.purposes.other')}</option>
                      </select>
                    </div>

                    {/* 7. KYC Upload */}
                    <div className="pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-[#121110] rounded-lg flex items-center justify-center"><i className="bx bx-id-card text-[#D2511A]" /></div>
                        <h3 className="font-bold text-[#121110]">{t('apply.kyc')}</h3>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4">
                        <FileUpload label={t('loanDetail.kycFront')} fieldName="id_front" file={files.id_front} preview={previews.id_front} onChange={handleFile} onClear={(f2) => setFiles({ ...files, [f2]: null })} />
                        <FileUpload label={t('loanDetail.kycBack')} fieldName="id_back" file={files.id_back} preview={previews.id_back} onChange={handleFile} onClear={(f2) => setFiles({ ...files, [f2]: null })} />
                      </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-[#D2511A] hover:bg-[#B4430F] text-[#121110] font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#D2511A]/20 active:scale-95 disabled:opacity-50">
                      {loading ? t('apply.sending') : <><i className="bx bx-paper-plane text-xl" /> {t('apply.send')}</>}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 flex items-center justify-center gap-1.5"><Lock size={10} /> {t('apply.privacy')}</p>
                  </form>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 rounded-[24px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-50 text-[#D2511A] rounded-lg flex items-center justify-center"><i className="bx bx-phone" /></div>
                <h3 className="font-bold text-[#121110]">{t('apply.contactTitle')}</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2"><Phone size={16} className="text-[#D2511A]" /><a href="tel:+4915222422310" className="hover:text-[#D2511A] transition-colors font-medium">+49 152 22422310</a></li>
                <li className="flex items-center gap-2"><MessageCircle size={16} className="text-[#D2511A]" /><a href="https://wa.me/491755312515" target="_blank" rel="noopener noreferrer" className="hover:text-[#D2511A] transition-colors font-medium">+49 175 5312515</a></li>
                <li className="flex items-center gap-2"><Mail size={16} className="text-[#D2511A]" /><a href="mailto:kontakt@krediwelt.com" className="hover:text-[#D2511A] transition-colors font-medium">kontakt@krediwelt.com</a></li>
              </ul>
            </Card>

            <Card className="p-6 rounded-[24px]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-50 text-[#D2511A] rounded-lg flex items-center justify-center"><ShieldCheck size={18} /></div>
                <h3 className="font-bold text-[#121110]">{t('apply.docsTitle')}</h3>
              </div>
              <ul className="space-y-4">
                {['doc1', 'doc2', 'doc3', 'doc4'].map(k => t(`loanDetail.${k}`)).map(doc => (
                  <li key={doc} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <div className="w-5 h-5 bg-[#D2511A]/10 rounded-full flex items-center justify-center"><CheckCircle size={12} className="text-[#D2511A]" /></div>
                    {doc}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 rounded-[24px]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center"><i className="bx bx-help-circle" /></div>
                <h3 className="font-bold text-[#121110]">{t('apply.faqTitle')}</h3>
              </div>
              <div className="space-y-2">
                {['faq1', 'faq2', 'faq3'].map(k => t(`apply.${k}`)).map(q => (
                  <Link key={q} to="/faq" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                    <span className="text-[13px] text-gray-600 font-medium group-hover:text-[#D2511A] transition-colors">{q}</span>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-[#D2511A]" />
                  </Link>
                ))}
                <Link to="/faq" className="block text-center text-[13px] font-bold text-[#D2511A] mt-4 hover:underline">{t('apply.faqAll')}</Link>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-40 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2"><Lock size={18} /><span className="text-xs font-bold">{t('apply.trust1')}</span></div>
          <div className="flex items-center gap-2"><ShieldCheck size={18} /><span className="text-xs font-bold">{t('apply.trust2')}</span></div>
          <div className="flex items-center gap-2"><Globe size={18} /><span className="text-xs font-bold">{t('apply.trust3')}</span></div>
          <div className="flex items-center gap-2"><CheckCircle size={18} /><span className="text-xs font-bold">{t('apply.trust4')}</span></div>
        </div>
      </div>
    </div>
  )
}
