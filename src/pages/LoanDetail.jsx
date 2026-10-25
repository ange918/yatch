import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, Lock, FileText, ArrowLeft } from 'lucide-react'
import Accent from '../components/Accent'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { LOANS } from '../data/loans'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

function FileUpload({ label, fieldName, file, preview, onChange, onClear, clickText, hintText, readyText }) {
  const inputRef = useRef(null)
  return (
    <div className="flex-1">
      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
        {label} <span className="text-red-400">*</span>
      </label>
      {!file ? (
        <div
          onClick={() => inputRef.current.click()}
          className="border-2 border-dashed border-gray-100 rounded-2xl p-5 text-center cursor-pointer transition-all hover:bg-gray-50"
        >
          <div className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-2">
            <i className="bx bx-cloud-upload text-gray-400 text-lg" />
          </div>
          <p className="text-[13px] font-semibold text-gray-500">{clickText}</p>
          <p className="text-[11px] text-gray-400 mt-1">{hintText}</p>
          <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={(e) => e.target.files[0] && onChange(fieldName, e.target.files[0])} />
        </div>
      ) : (
        <div className="relative border border-[#D2511A]/30 bg-[#D2511A]/5 rounded-2xl p-4 flex items-center gap-3">
          {preview && preview !== 'pdf' ? (
            <img src={preview} className="w-11 h-11 object-cover rounded-xl" alt="" />
          ) : (
            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center border border-gray-100"><FileText className="text-[#D2511A]" size={18} /></div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-700 truncate">{file.name}</p>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">{readyText}</p>
          </div>
          <button onClick={() => onClear(fieldName)} className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"><X size={14} /></button>
        </div>
      )}
    </div>
  )
}

export default function LoanDetail() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const loan = LOANS.find(l => l.slug === slug)

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    subject: loan?.subject || '',
    message: '', amount: '', duration: ''
  })
  const [files, setFiles] = useState({ id_front: null, id_back: null })
  const [previews, setPreviews] = useState({ id_front: null, id_back: null })
  const [loading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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
    alert("Le formulaire n'est pas disponible pour le moment.")
  }

  if (!loan) {
    return (
      <div className="pt-32 text-center">
        <p className="text-gray-500 text-lg mb-6">{t('loanDetail.notFound')}</p>
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

  return (
    <div className="pt-16">
      {/* Hero */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ backgroundImage: `url(${loan.heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#8F3510]/92 via-[#121110]/88 to-[#3A2A20]/80" />
        <div className="relative max-w-5xl mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}>
              <Link to="/offers" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
                <ArrowLeft size={16} /> {t('loanDetail.backToOffers')}
              </Link>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Badge className="mb-4">{loanRateLabel}</Badge>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              {loanName}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-lg max-w-2xl leading-relaxed">
              {loanIntro}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 inline-flex items-baseline gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4">
              <span className="text-4xl font-black text-[#D2511A]">{loan.rate}</span>
              <span className="text-white/60 text-sm">{loanRateLabel}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <motion.div key={b.title} variants={fadeUp}>
                <div className="p-6 bg-[#EBE2D1] rounded-2xl hover:shadow-md transition-shadow h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#D2511A]/10 flex items-center justify-center mb-4">
                    <i className={`bx ${b.icon} text-[#D2511A] text-2xl`} />
                  </div>
                  <h3 className="font-bold text-[#121110] mb-1 text-sm">{b.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-[#EBE2D1]">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid lg:grid-cols-5 gap-10 items-start">

            {/* Left info panel */}
            <motion.div variants={fadeUp} className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-3xl font-extrabold text-[#121110] tracking-tight mb-2">
                  <Accent>{t('loanDetail.applyTitle')}</Accent>
                </h2>
                <p className="text-gray-500 leading-relaxed text-sm">
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
                    <span className="text-sm text-gray-600 font-medium">{t(`loanDetail.${item.key}`)}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h4 className="font-bold text-[#121110] mb-3 text-sm">{t('loanDetail.acceptedDocs')}</h4>
                <ul className="space-y-2">
                  {['doc1', 'doc2', 'doc3', 'doc4'].map(key => (
                    <li key={key} className="flex items-center gap-2 text-xs text-gray-500">
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
                    className="bg-white rounded-[32px] p-12 text-center shadow-sm border border-gray-100"
                  >
                    <div className="w-20 h-20 bg-[#D2511A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-[#D2511A]" />
                    </div>
                    <h2 className="text-2xl font-black text-[#121110] mb-4"><Accent>{t('loanDetail.successTitle')}</Accent></h2>
                    <p className="text-gray-500 mb-8">{t('loanDetail.successText')}</p>
                    <button onClick={() => setSubmitted(false)} className="font-bold text-[#D2511A] hover:underline text-sm">{t('loanDetail.successReset')}</button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Card className="p-8 rounded-[32px] shadow-sm border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('loanDetail.firstName')}</label>
                          <input className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#D2511A] rounded-2xl px-4 py-3.5 text-sm outline-none transition-all" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('loanDetail.lastName')}</label>
                          <input className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#D2511A] rounded-2xl px-4 py-3.5 text-sm outline-none transition-all" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('loanDetail.email')} <span className="text-red-400">{t('loanDetail.required')}</span></label>
                        <input type="email" required className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#D2511A] rounded-2xl px-4 py-3.5 text-sm outline-none transition-all" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('loanDetail.phone')}</label>
                        <input type="tel" className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#D2511A] rounded-2xl px-4 py-3.5 text-sm outline-none transition-all" placeholder="+49 …" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('loanDetail.amount')}</label>
                          <input type="number" className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#D2511A] rounded-2xl px-4 py-3.5 text-sm outline-none transition-all" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('loanDetail.duration')}</label>
                          <input type="number" className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#D2511A] rounded-2xl px-4 py-3.5 text-sm outline-none transition-all" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('loanDetail.message')} <span className="text-red-400">{t('loanDetail.required')}</span></label>
                        <textarea rows={4} required className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#D2511A] rounded-2xl px-4 py-3.5 text-sm outline-none transition-all resize-none" placeholder={t('loanDetail.messagePlaceholder')} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                      </div>

                      <div className="pt-3 border-t border-gray-50">
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

                      <button type="submit" disabled={loading} className="w-full bg-[#D2511A] hover:bg-[#B4430F] text-[#121110] font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#D2511A]/20 active:scale-95 disabled:opacity-50 text-sm">
                        {loading ? t('loanDetail.sending') : <><i className="bx bx-paper-plane text-lg" /> {t('loanDetail.send')}</>}
                      </button>
                      <p className="text-[11px] text-center text-gray-400 flex items-center justify-center gap-1.5">
                        <Lock size={10} /> {t('loanDetail.privacy')}
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
