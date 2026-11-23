import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, ChevronRight, ShieldCheck, Lock, Globe, FileText, Phone, MessageCircle, Mail } from 'lucide-react'
import PageHero from '../components/PageHero'
import Card from '../components/ui/Card'
import { FormError, Honeypot } from '../components/FormGuards'
import { filesPayload, requestErrorMessage, submitRequest } from '../lib/contactApi'

const PURPOSE_FROM_SUBJECT = { auto: 'Auto', privat: 'Konsum', loan: 'Immobilien', immo: 'Immobilien' }

function FileUpload({ label, fieldName, file, preview, onChange, onClear }) {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  return (
    <div className="flex-1">
      <label className="block text-[10px] font-bold text-[#6B6359] uppercase tracking-widest mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      {!file ? (
        <div
          onClick={() => inputRef.current.click()}
          className="border-2 border-dashed border-[#121110]/15 bg-[#FAF8F3] rounded-2xl p-6 text-center cursor-pointer transition-colors hover:border-[#D2511A]/50 hover:bg-white"
        >
          <div className="w-10 h-10 bg-white border border-[#121110]/8 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="bx bx-cloud-upload text-[#D2511A] text-xl" />
          </div>
          <p className="text-[13px] font-semibold text-[#121110]">{t('loanDetail.uploadClick')}</p>
          <p className="text-[11px] text-[#6B6359] mt-1">{t('loanDetail.uploadHint')}</p>
          <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={(e) => e.target.files[0] && onChange(fieldName, e.target.files[0])} />
        </div>
      ) : (
        <div className="relative border border-[#D2511A]/30 bg-[#D2511A]/5 rounded-2xl p-4 flex items-center gap-3">
          {preview && preview !== 'pdf' ? (
            <img src={preview} className="w-12 h-12 object-cover rounded-xl" alt="" />
          ) : (
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-[#121110]/10"><FileText className="text-[#D2511A]" size={20} /></div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#121110] truncate">{file.name}</p>
            <p className="text-[10px] text-[#6B6359] uppercase font-bold tracking-tight">{t('loanDetail.uploadReady')}</p>
          </div>
          <button type="button" onClick={() => onClear(fieldName)} className="p-1.5 hover:bg-red-50 text-[#6B6359] hover:text-red-500 rounded-full transition-colors"><X size={16} /></button>
        </div>
      )}
    </div>
  )
}

export default function Contact() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const subject = queryParams.get('subject') || ''
  const product = ['auto', 'privat', 'loan', 'immo'].includes(subject) ? subject : ''
  const startedAt = useRef(0)
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const [form, setForm] = useState({
    firstName: '', lastName: '',
    email: '',
    phone: '',
    address: '',
    amount: queryParams.get('amount') || '',
    duration: queryParams.get('duration') || '',
    profession: '',
    income: '',
    purpose: PURPOSE_FROM_SUBJECT[product] || '',
  })
  const [files, setFiles] = useState({ id_front: null, id_back: null })
  const [previews, setPreviews] = useState({ id_front: null, id_back: null })
  const [honeypot, setHoneypot] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setError('')
    setLoading(true)
    try {
      const uploaded = await filesPayload(files)
      await submitRequest({
        form: 'contact',
        lang: (i18n.resolvedLanguage || i18n.language || 'de').slice(0, 2),
        page: `${location.pathname}${location.search}`,
        startedAt: startedAt.current,
        company_website: honeypot,
        fields: { ...form, product },
        files: uploaded,
      })
      setFiles({ id_front: null, id_back: null })
      setPreviews({ id_front: null, id_back: null })
      setSubmitted(true)
    } catch (err) {
      setError(requestErrorMessage(t, err))
    } finally {
      setLoading(false)
    }
  }

  const inputCls = "w-full bg-[#FAF8F3] border border-[#121110]/10 focus:bg-white focus:border-[#D2511A] rounded-2xl px-5 py-4 text-sm text-[#121110] transition-colors outline-none"

  return (
    <div className="bg-[#EBE2D1]">
      <PageHero
        eyebrow={t('apply.badge')}
        title={t('apply.title')}
        subtitle={t('apply.subtitle')}
      />

      <div className="max-w-7xl mx-auto px-4 py-14 sm:py-16 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-[24px] p-12 text-center shadow-[0_24px_60px_-15px_rgba(18,17,16,0.08)] border border-[#121110]/10">
                  <div className="w-20 h-20 bg-[#D2511A]/10 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} className="text-[#D2511A]" /></div>
                  <h2 className="text-2xl font-extrabold text-[#121110] mb-4">{t('apply.successTitle')}</h2>
                  <p className="text-[#4A453E] mb-8">{t('apply.successText')}</p>
                  <button onClick={() => { setSubmitted(false); setError('') }} className="font-bold text-[#D2511A] hover:underline">{t('apply.successReset')}</button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Card hover={false} className="p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#121110]/8">
                      <div className="w-10 h-10 bg-[#D2511A]/10 rounded-xl flex items-center justify-center">
                        <i className="bx bx-edit-alt text-[#D2511A] text-xl" />
                      </div>
                      <h2 className="text-2xl font-extrabold text-[#121110] tracking-tight">{t('apply.formTitle')}</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="relative space-y-6">
                      <Honeypot value={honeypot} onChange={setHoneypot} />

                      {/* 1. First & Last Name */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('apply.firstName')} <span className="text-red-500">*</span></label>
                          <input required className={inputCls} placeholder={`${t('apply.eg')} Max`} value={form.firstName} onChange={f('firstName')} />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('apply.lastName')} <span className="text-red-500">*</span></label>
                          <input required className={inputCls} placeholder={t('apply.lastNamePh')} value={form.lastName} onChange={f('lastName')} />
                        </div>
                      </div>

                      {/* 2. Email & Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('apply.email')} <span className="text-red-500">*</span></label>
                          <input type="email" required className={inputCls} placeholder={t('apply.emailPh')} value={form.email} onChange={f('email')} />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('apply.phone')} <span className="text-red-500">*</span></label>
                          <input type="tel" required minLength={6} maxLength={30} className={inputCls} placeholder={t('apply.phonePh')} value={form.phone} onChange={f('phone')} />
                        </div>
                      </div>

                      {/* 3. Address */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('apply.address')} <span className="text-red-500">*</span></label>
                        <textarea required rows={3} className={`${inputCls} resize-none`} placeholder={t('apply.addressPh')} value={form.address} onChange={f('address')} />
                      </div>

                      {/* 4. Amount & Duration */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('apply.amount')} <span className="text-red-500">*</span></label>
                          <input type="number" required min="500" className={`${inputCls} tabular-nums`} placeholder={`${t('apply.eg')} 15 000`} value={form.amount} onChange={f('amount')} />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('apply.duration')} <span className="text-red-500">*</span></label>
                          <input type="number" required min="6" max="360" className={`${inputCls} tabular-nums`} placeholder={`${t('apply.eg')} 60`} value={form.duration} onChange={f('duration')} />
                        </div>
                      </div>

                      {/* 5. Profession */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('apply.profession')} <span className="text-red-500">*</span></label>
                        <input required className={inputCls} placeholder={t('apply.professionPh')} value={form.profession} onChange={f('profession')} />
                      </div>

                      {/* 6. Net Income */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('apply.income')} <span className="text-red-500">*</span></label>
                        <input type="number" required min="0" className={`${inputCls} tabular-nums`} placeholder={`${t('apply.eg')} 3 200`} value={form.income} onChange={f('income')} />
                      </div>

                      {/* 7. Purpose */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('apply.purpose')} <span className="text-red-500">*</span></label>
                        <select required className={`${inputCls} appearance-none cursor-pointer`} value={form.purpose} onChange={f('purpose')}>
                          <option value="">{t('apply.purposeChoose')}</option>
                          <option value="Auto">{t('apply.purposes.car')}</option>
                          <option value="Immobilien">{t('apply.purposes.realEstate')}</option>
                          <option value="Renovierung">{t('apply.purposes.renovation')}</option>
                          <option value="Konsum">{t('apply.purposes.consumption')}</option>
                          <option value="Sonstiges">{t('apply.purposes.other')}</option>
                        </select>
                      </div>

                      {/* 8. KYC Upload */}
                      <div className="pt-5 border-t border-[#121110]/8">
                        <div className="flex items-center gap-2.5 mb-5">
                          <div className="w-8 h-8 bg-[#121110] rounded-lg flex items-center justify-center"><i className="bx bx-id-card text-[#D2511A]" /></div>
                          <h3 className="font-bold text-[#121110]">{t('apply.kyc')}</h3>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                          <FileUpload label={t('loanDetail.kycFront')} fieldName="id_front" file={files.id_front} preview={previews.id_front} onChange={handleFile} onClear={(f2) => setFiles({ ...files, [f2]: null })} />
                          <FileUpload label={t('loanDetail.kycBack')} fieldName="id_back" file={files.id_back} preview={previews.id_back} onChange={handleFile} onClear={(f2) => setFiles({ ...files, [f2]: null })} />
                        </div>
                      </div>

                      <FormError>{error}</FormError>
                      <button type="submit" disabled={loading} aria-busy={loading} className="w-full bg-[#121110] hover:bg-[#D2511A] text-white font-bold py-4 rounded-full transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                        {loading ? <><i className="bx bx-loader-alt bx-spin text-xl" /> {t('apply.sending')}</> : <><i className="bx bx-paper-plane text-xl" /> {t('apply.send')}</>}
                      </button>
                      <p className="text-[11px] text-center text-[#6B6359] flex items-center justify-center gap-1.5"><Lock size={11} /> {t('apply.privacy')}</p>
                    </form>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card hover={false} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#D2511A]/10 text-[#D2511A] rounded-lg flex items-center justify-center"><i className="bx bx-phone" /></div>
                <h3 className="font-bold text-[#121110]">{t('apply.contactTitle')}</h3>
              </div>
              <ul className="space-y-3 text-sm text-[#4A453E]">
                <li className="flex items-center gap-2"><Phone size={16} className="text-[#D2511A]" /><a href="tel:+41799239259" className="hover:text-[#D2511A] transition-colors font-semibold">+41 79 923 92 59</a></li>
                <li className="flex items-center gap-2"><MessageCircle size={16} className="text-[#D2511A]" /><a href="https://wa.me/41799239259" target="_blank" rel="noopener noreferrer" className="hover:text-[#D2511A] transition-colors font-semibold">+41 79 923 92 59</a></li>
                <li className="flex items-center gap-2"><Mail size={16} className="text-[#D2511A]" /><a href="mailto:contact@krediiwelt.com" className="hover:text-[#D2511A] transition-colors font-semibold">contact@krediiwelt.com</a></li>
              </ul>
            </Card>

            <Card hover={false} className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-[#D2511A]/10 text-[#D2511A] rounded-lg flex items-center justify-center"><ShieldCheck size={18} /></div>
                <h3 className="font-bold text-[#121110]">{t('apply.docsTitle')}</h3>
              </div>
              <ul className="space-y-3.5">
                {['doc1', 'doc2', 'doc3', 'doc4'].map(k => t(`loanDetail.${k}`)).map(doc => (
                  <li key={doc} className="flex items-center gap-3 text-sm text-[#4A453E] font-medium">
                    <div className="w-5 h-5 bg-[#D2511A]/10 rounded-full flex items-center justify-center shrink-0"><CheckCircle size={12} className="text-[#D2511A]" /></div>
                    {doc}
                  </li>
                ))}
              </ul>
            </Card>

            <Card hover={false} className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-[#D2511A]/10 text-[#D2511A] rounded-lg flex items-center justify-center"><i className="bx bx-help-circle" /></div>
                <h3 className="font-bold text-[#121110]">{t('apply.faqTitle')}</h3>
              </div>
              <div className="space-y-1.5">
                {['faq1', 'faq2', 'faq3'].map(k => t(`apply.${k}`)).map(q => (
                  <Link key={q} to="/faq" className="flex items-center justify-between p-3 hover:bg-[#FAF8F3] rounded-xl transition-colors group">
                    <span className="text-[13px] text-[#4A453E] font-medium group-hover:text-[#D2511A] transition-colors">{q}</span>
                    <ChevronRight size={14} className="text-[#8A8175] group-hover:text-[#D2511A]" />
                  </Link>
                ))}
                <Link to="/faq" className="block text-center text-[13px] font-bold text-[#D2511A] mt-4 hover:underline">{t('apply.faqAll')}</Link>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#121110]/10 flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-[#6B6359]">
          <div className="flex items-center gap-2"><Lock size={16} className="text-[#D2511A]" /><span className="text-xs font-semibold">{t('apply.trust1')}</span></div>
          <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#D2511A]" /><span className="text-xs font-semibold">{t('apply.trust2')}</span></div>
          <div className="flex items-center gap-2"><Globe size={16} className="text-[#D2511A]" /><span className="text-xs font-semibold">{t('apply.trust3')}</span></div>
          <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[#D2511A]" /><span className="text-xs font-semibold">{t('apply.trust4')}</span></div>
        </div>
      </div>
    </div>
  )
}
