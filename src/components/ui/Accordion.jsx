import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Accordion({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-[#121110] pr-4">{question}</span>
        <ChevronDown
          className={`shrink-0 text-[#D2511A] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>
      <div className={`transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <p className="px-5 pb-5 text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}
