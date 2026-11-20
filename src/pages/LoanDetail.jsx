import { useState, useRef, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, Lock, FileText, ArrowLeft } from 'lucide-react'
import Accent from '../components/Accent'
import Card from '../components/ui/Card'
import { FormError, Honeypot } from '../components/FormGuards'
import { filesPayload, requestErrorMessage, submitRequest } from '../lib/contactApi'
import { LOANS } from '../data/loans'
import { fmtCurrency, fmtPercent } from '../i18n/format'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

function FileUpload({ label, fieldName, file, preview, onChange, onClear, clickText, hintText, readyText }) {
  const inputRef = useRef(null)
  return (
    <div className="flex-1">
      <label className="block text-[10px] font-bold text-[#6B6359] uppercase tracking-widest mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      {!file ? (
        <div
          onClick={() => inputRef.current.click()}
          className="border-2 border-dashed border-[#121110]/15 bg-[#FAF8F3] rounded-2xl p-5 text-center cursor-pointer transition-colors hover:border-[#D2511A]/50 hover:bg-white"
        >
          <div className="w-9 h-9 bg-white border border-[#121110]/8 rounded-full flex items-center justify-center mx-auto mb-2">
            <i className="bx bx-cloud-upload text-[#D2511A] text-lg" />
          </div>
          <p className="text-[13px] font-semibold text-[#121110]">{clickText}</p>
          <p className="text-[11px] text-[#6B6359] mt-1">{hintText}</p>
          <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={(e) => e.target.files[0] && onChange(fieldName, e.target.files[0])} />
        </div>
      ) : (
        <div className="relative border border-[#D2511A]/30 bg-[#D2511A]/5 rounded-2xl p-4 flex items-center gap-3">
          {preview && preview !== 'pdf' ? (
            <img src={preview} className="w-11 h-11 object-cover rounded-xl" alt="" />
          ) : (
            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center border border-[#121110]/10"><FileText className="text-[#D2511A]" size={18} /></div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#121110] truncate">{file.name}</p>
            <p className="text-[10px] text-[#6B6359] uppercase font-bold tracking-tight">{readyText}</p>
          </div>
          <button type="button" onClick={() => onClear(fieldName)} className="p-1.5 hover:bg-red-50 text-[#6B6359] hover:text-red-500 rounded-full transition-colors"><X size={14} /></button>
        </div>
      )}
    </div>
  )
}

export default function LoanDetail() {
  const { slug } = useParams()
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const loan = LOANS.find(l => l.slug === slug)

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    subject: loan?.subject || '',
    message: '', amount: '', duration: ''
  })
  const [files, setFiles] = useState({ id_front: null, id_back: null })
  const [previews, setPreviews] = useState({ id_front: null, id_back: null })
  const [honeypot, setHoneypot] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const startedAt = useRef(0)
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

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
    if (loading || !loan) return
    setError('')
    setLoading(true)
    try {
      const uploaded = await filesPayload(files)
      await submitRequest({
        form: 'loan',
        lang: (i18n.resolvedLanguage || i18n.language || 'de').slice(0, 2),
        page: `${location.pathname}${location.search}`,
        startedAt: startedAt.current,
        company_website: honeypot,
        fields: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          amount: form.amount,
          duration: form.duration,
          message: form.message,
          product: form.subject || loan.subject,
          loanSlug: loan.slug,
        },
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

  if (!loan) {
    return (
      <div className="pt-32 pb-20 text-center bg-[#EBE2D1]">
        <p className="text-[#4A453E] text-lg mb-6">{t('loanDetail.notFound')}</p>
        <Link to="/offers" className="text-[#D2511A] font-bold hover:underline">← {t('loanDetail.notFoundLink')}</Link>
      </div>
    )
  }

  const loanName = t(`loans.${loan.slug}.name`)
  const loanIntro = t(`loans.${loan.slug}.intro`)
  const loanRateLabel = t(`loans.${loan.slug}.rateLabel`)
  const benefits = loan.benefitIcons.map((icon, i) => ({
    icon,
    title: t(`loans.${loan.slug}.b${i + 1}.title`),
    desc: t(`loans.${loan.slug}.b${i + 1}.desc`),
  }))

  const inputCls = "w-full bg-[#FAF8F3] border border-[#121110]/10 focus:bg-white focus:border-[#D2511A] rounded-2xl px-4 py-3.5 text-sm text-[#121110] outline-none transition-colors"

  return (
    <div>
      {/* Editorial Light Hero */}
      <section className="relative bg-gradient-to-b from-[#F7F4EC] via-[#F3EDE0] to-[#EBE2D1] pt-24 sm:pt-32 pb-16 border-b border-[#121110]/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}>
              <Link to="/offers" className="inline-flex items-center gap-2 text-[#575148] hover:text-[#121110] text-xs font-bold uppercase tracking-wider mb-6 transition-colors">
                <ArrowLeft size={14} /> {t('loanDetail.backToOffers')}
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.14em] text-[#D2511A] mb-3">
              {loanRateLabel}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              style={{ textWrap: 'balance' }}
              className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-extrabold text-[#121110] mb-4 tracking-tight leading-[1.06]"
            >
              <Accent editorial>{loanName}</Accent>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[#4A453E] text-base sm:text-lg max-w-2xl leading-relaxed">
              {loanIntro}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 inline-flex items-baseline gap-3 bg-white border border-[#121110]/10 rounded-2xl px-6 py-4 shadow-[0_14px_38px_-14px_rgba(18,17,16,0.08)]">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#D2511A] tabular-nums">
                {loan.from ? `${t('offers.fromWord')} ` : ''}
                {loan.unit === 'eur' ? fmtCurrency(loan.rate, i18n.language) : fmtPercent(loan.rate, i18n.language)}
              </span>
              <span className="text-[#6B6359] text-xs sm:text-sm font-medium">{loanRateLabel}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {benefits.map((b) => (
              <motion.div key={b.title} variants={fadeUp}>
                <div className="p-6 bg-[#FAF8F3] border border-[#121110]/8 rounded-[20px] h-full">
                  <div className="w-11 h-11 rounded-xl bg-[#D2511A]/10 flex items-center justify-center mb-4">
                    <i className={`bx ${b.icon} text-[#D2511A] text-xl`} />
                  </div>
                  <h3 className="font-bold text-[#121110] mb-1.5 text-sm">{b.title}</h3>
                  <p className="text-[#4A453E] text-xs leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-[#EBE2D1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid lg:grid-cols-5 gap-10 items-start"
          >
            {/* Left info panel */}
            <motion.div variants={fadeUp} className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-3xl font-extrabold text-[#121110] tracking-tight mb-2">
                  <Accent editorial>{t('loanDetail.applyTitle')}</Accent>
                </h2>
                <p className="text-[#4A453E] leading-relaxed text-sm">
                  {t('loanDetail.applySubtitle')}
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: 'bx-time', key: 'trust1' },
                  { icon: 'bx-lock', key: 'trust2' },
                  { icon: 'bx-user-check', key: 'trust3' },
                  { icon: 'bx-check-shield', key: 'trust4' },
                ].map(item => (
                  <div key={item.key} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#D2511A]/10 flex items-center justify-center shrink-0">
                      <i className={`bx ${item.icon} text-[#D2511A] text-lg`} />
                    </div>
                    <span className="text-sm text-[#3A2A20] font-medium">{t(`loanDetail.${item.key}`)}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-[20px] p-5 border border-[#121110]/10">
                <h4 className="font-bold text-[#121110] mb-3 text-sm">{t('loanDetail.acceptedDocs')}</h4>
                <ul className="space-y-2">
                  {['doc1', 'doc2', 'doc3', 'doc4'].map(key => (
                    <li key={key} className="flex items-center gap-2 text-xs text-[#4A453E]">
                      <CheckCircle size={12} className="text-[#D2511A] shrink-0" />
                      {t(`loanDetail.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-[24px] p-12 text-center shadow-[0_18px_45px_-15px_rgba(18,17,16,0.08)] border border-[#121110]/10"
                  >
                    <div className="w-20 h-20 bg-[#D2511A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-[#D2511A]" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-[#121110] mb-4"><Accent editorial>{t('loanDetail.successTitle')}</Accent></h2>
                    <p className="text-[#4A453E] mb-8">{t('loanDetail.successText')}</p>
                    <button onClick={() => { setSubmitted(false); setError('') }} className="font-bold text-[#D2511A] hover:underline text-sm">{t('loanDetail.successReset')}</button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Card hover={false} className="p-8">
                      <form onSubmit={handleSubmit} className="relative space-y-5">
                        <Honeypot value={honeypot} onChange={setHoneypot} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('loanDetail.firstName')}</label>
                            <input className={inputCls} value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('loanDetail.lastName')}</label>
                            <input className={inputCls} value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('loanDetail.email')} <span className="text-red-500">{t('loanDetail.required')}</span></label>
                          <input type="email" required className={inputCls} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('loanDetail.phone')}</label>
                          <input type="tel" className={inputCls} placeholder="+41 …" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('loanDetail.amount')}</label>
                            <input type="number" className={`${inputCls} tabular-nums`} value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('loanDetail.duration')}</label>
                            <input type="number" className={`${inputCls} tabular-nums`} value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-[#6B6359] uppercase tracking-widest ml-1">{t('loanDetail.message')} <span className="text-red-500">{t('loanDetail.required')}</span></label>
                          <textarea rows={4} required className={`${inputCls} resize-none`} placeholder={t('loanDetail.messagePlaceholder')} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                        </div>

                        <div className="pt-3 border-t border-[#121110]/8">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 bg-[#121110] rounded-lg flex items-center justify-center">
                              <i className="bx bx-id-card text-[#D2511A] text-sm" />
                            </div>
                            <h3 className="font-bold text-[#121110] text-sm">{t('loanDetail.kyc')}</h3>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-4">
                            <FileUpload
                              label={t('loanDetail.kycFront')} fieldName="id_front"
                              file={files.id_front} preview={previews.id_front}
                              onChange={handleFile} onClear={(f) => setFiles({ ...files, [f]: null })}
                              clickText={t('loanDetail.uploadClick')} hintText={t('loanDetail.uploadHint')} readyText={t('loanDetail.uploadReady')}
                            />
                            <FileUpload
                              label={t('loanDetail.kycBack')} fieldName="id_back"
                              file={files.id_back} preview={previews.id_back}
                              onChange={handleFile} onClear={(f) => setFiles({ ...files, [f]: null })}
                              clickText={t('loanDetail.uploadClick')} hintText={t('loanDetail.uploadHint')} readyText={t('loanDetail.uploadReady')}
                            />
                          </div>
                        </div>

                        <FormError>{error}</FormError>
                        <button type="submit" disabled={loading} aria-busy={loading} className="w-full bg-[#121110] hover:bg-[#D2511A] text-white font-bold py-4 rounded-full transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer">
                          {loading ? <><i className="bx bx-loader-alt bx-spin text-lg" /> {t('loanDetail.sending')}</> : <><i className="bx bx-paper-plane text-lg" /> {t('loanDetail.send')}</>}
                        </button>
                        <p className="text-[11px] text-center text-[#6B6359] flex items-center justify-center gap-1.5">
                          <Lock size={11} /> {t('loanDetail.privacy')}
                        </p>
                      </form>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
