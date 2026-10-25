import { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, ChevronRight, ShieldCheck, Lock, Globe, FileText, Phone, MessageCircle, Mail } from 'lucide-react'
import Accent from '../components/Accent'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

function FileUpload({ label, fieldName, file, preview, onChange, onClear }) {
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
          <p className="text-[13px] font-semibold text-gray-500">Klicken oder Datei ablegen</p>
          <p className="text-[11px] text-gray-400 mt-1">JPG, PNG oder PDF · max 10 MB</p>
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
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">Bereit zum Senden</p>
          </div>
          <button onClick={() => onClear(fieldName)} className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"><X size={16} /></button>
        </div>
      )}
    </div>
  )
}

export default function Contact() {
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
    alert("Das Formular ist derzeit nicht verfügbar.")
  }

  const inputCls = "w-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#D2511A] rounded-2xl px-5 py-4 text-sm transition-all outline-none"

  return (
    <div className="pt-20 bg-[#EBE2D1]">
      <section className="relative py-28 text-center bg-[#121110] overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="relative max-w-4xl mx-auto px-4">
          <Badge className="mb-6 bg-[#D2511A]/10 text-[#D2511A] border-[#D2511A]/20">KREDITANTRAG</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6"><Accent>Jetzt Kredit beantragen</Accent></h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Füllen Sie das Formular vollständig aus. Unser Team meldet sich innerhalb von 24 Stunden bei Ihnen.</p>
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
                  <h2 className="text-2xl font-black text-[#121110] mb-4">Antrag gesendet!</h2>
                  <p className="text-gray-500 mb-8">Vielen Dank. Einer unserer Berater wird sich innerhalb von 24 Stunden bei Ihnen melden.</p>
                  <button onClick={() => setSubmitted(false)} className="font-bold text-[#D2511A] hover:underline">Neuen Antrag senden</button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Card className="p-8 md:p-10 rounded-[32px] shadow-sm border-gray-100">
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-[#D2511A] rounded-xl flex items-center justify-center shadow-lg shadow-[#D2511A]/20">
                      <i className="bx bx-edit-alt text-white text-xl" />
                    </div>
                    <h2 className="text-2xl font-black text-[#121110]">Kreditantrag</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* 1. Vor- und Nachname */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Vorname <span className="text-red-400">*</span></label>
                        <input required className={inputCls} placeholder="z. B. Max" value={form.firstName} onChange={f('firstName')} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nachname <span className="text-red-400">*</span></label>
                        <input required className={inputCls} placeholder="z. B. Mustermann" value={form.lastName} onChange={f('lastName')} />
                      </div>
                    </div>

                    {/* 2. E-Mail */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">E-Mail-Adresse <span className="text-red-400">*</span></label>
                      <input type="email" required className={inputCls} placeholder="z. B. max@beispiel.de" value={form.email} onChange={f('email')} />
                    </div>

                    {/* 3. Vollständige Adresse */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Vollständige Adresse <span className="text-red-400">*</span></label>
                      <textarea required rows={3} className={`${inputCls} resize-none`} placeholder="Straße, Hausnummer, PLZ, Stadt, Land" value={form.address} onChange={f('address')} />
                    </div>

                    {/* 3. Kreditbetrag & Laufzeit */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Kreditbetrag (€) <span className="text-red-400">*</span></label>
                        <input type="number" required min="500" className={inputCls} placeholder="z. B. 15 000" value={form.amount} onChange={f('amount')} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Laufzeit (Monate) <span className="text-red-400">*</span></label>
                        <input type="number" required min="6" max="360" className={inputCls} placeholder="z. B. 60" value={form.duration} onChange={f('duration')} />
                      </div>
                    </div>

                    {/* 4. Beruf */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Beruf <span className="text-red-400">*</span></label>
                      <input required className={inputCls} placeholder="z. B. Ingenieur, Lehrer, Selbstständig…" value={form.profession} onChange={f('profession')} />
                    </div>

                    {/* 5. Netto-Monatseinkommen */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Netto-Monatseinkommen (€) <span className="text-red-400">*</span></label>
                      <input type="number" required min="0" className={inputCls} placeholder="z. B. 3 200" value={form.income} onChange={f('income')} />
                    </div>

                    {/* 6. Verwendungszweck */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Verwendungszweck <span className="text-red-400">*</span></label>
                      <select required className={`${inputCls} appearance-none cursor-pointer`} value={form.purpose} onChange={f('purpose')}>
                        <option value="">— Bitte wählen —</option>
                        <option value="Auto">Auto</option>
                        <option value="Immobilien">Immobilien</option>
                        <option value="Renovierung">Renovierung</option>
                        <option value="Konsum">Konsum</option>
                        <option value="Sonstiges">Sonstiges</option>
                      </select>
                    </div>

                    {/* 7. KYC Upload */}
                    <div className="pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-[#121110] rounded-lg flex items-center justify-center"><i className="bx bx-id-card text-[#D2511A]" /></div>
                        <h3 className="font-bold text-[#121110]">Ausweisdokument (KYC)</h3>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4">
                        <FileUpload label="Vorderseite" fieldName="id_front" file={files.id_front} preview={previews.id_front} onChange={handleFile} onClear={(f2) => setFiles({ ...files, [f2]: null })} />
                        <FileUpload label="Rückseite" fieldName="id_back" file={files.id_back} preview={previews.id_back} onChange={handleFile} onClear={(f2) => setFiles({ ...files, [f2]: null })} />
                      </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-[#D2511A] hover:bg-[#B4430F] text-[#121110] font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#D2511A]/20 active:scale-95 disabled:opacity-50">
                      {loading ? 'Wird gesendet...' : <><i className="bx bx-paper-plane text-xl" /> Antrag absenden</>}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 flex items-center justify-center gap-1.5"><Lock size={10} /> Ihre Daten werden verschlüsselt und vertraulich behandelt (DSGVO).</p>
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
                <h3 className="font-bold text-[#121110]">Kontakt</h3>
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
                <h3 className="font-bold text-[#121110]">Akzeptierte Dokumente</h3>
              </div>
              <ul className="space-y-4">
                {['Nationaler Personalausweis', 'Biometrischer Reisepass', 'Aufenthaltstitel (EU)', 'Europäischer Führerschein'].map(doc => (
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
                <h3 className="font-bold text-[#121110]">Häufige Fragen</h3>
              </div>
              <div className="space-y-2">
                {['Wie beantrage ich einen Kredit?', 'Welche Dokumente benötige ich?', 'Wie lange dauert die Bearbeitung?'].map(q => (
                  <Link key={q} to="/faq" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                    <span className="text-[13px] text-gray-600 font-medium group-hover:text-[#D2511A] transition-colors">{q}</span>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-[#D2511A]" />
                  </Link>
                ))}
                <Link to="/faq" className="block text-center text-[13px] font-bold text-[#D2511A] mt-4 hover:underline">Alle FAQs ansehen →</Link>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-40 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2"><Lock size={18} /><span className="text-xs font-bold">256-bit Verschlüsselung</span></div>
          <div className="flex items-center gap-2"><ShieldCheck size={18} /><span className="text-xs font-bold">BaFin reguliert</span></div>
          <div className="flex items-center gap-2"><Globe size={18} /><span className="text-xs font-bold">Einlagensicherung bis €100.000</span></div>
          <div className="flex items-center gap-2"><CheckCircle size={18} /><span className="text-xs font-bold">ISO 27001 zertifiziert</span></div>
        </div>
      </div>
    </div>
  )
}
