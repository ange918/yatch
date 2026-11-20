import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Accordion({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white border border-[#121110]/10 rounded-2xl overflow-hidden shadow-[0_6px_20px_-10px_rgba(18,17,16,0.06)]">
      <button
        type="button"
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#FAF8F3] transition-colors cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="font-bold text-[#121110] pr-4 text-sm sm:text-base">{question}</span>
        <ChevronDown
          className={`shrink-0 text-[#D2511A] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>
      <div className={`transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <p className="px-5 pb-5 text-[#4A453E] text-sm leading-relaxed border-t border-[#121110]/6 pt-3">{answer}</p>
      </div>
    </div>
  )
}
