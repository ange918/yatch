import { Phone, MessageCircle, Mail } from 'lucide-react'

export default function TickerBar() {
  return (
    <div className="bg-[#121110] text-white text-xs py-2.5 border-b border-[#3A2A20]">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-1 text-center">
        <span className="flex items-center gap-2 shrink-0">
          <Phone size={14} className="text-[#D2511A]" />
          <span className="text-gray-300">Rufen Sie uns an:</span>
          <a href="tel:+4915222422310" className="font-bold text-white hover:text-[#D2511A] transition-colors">+49 152 22422310</a>
        </span>
        <span className="text-[#3A2A20] hidden sm:inline">|</span>
        <span className="flex items-center gap-2 shrink-0">
          <MessageCircle size={14} className="text-[#D2511A]" />
          <span className="text-gray-300">WhatsApp:</span>
          <a href="https://wa.me/491755312515?text=Hallo%20Finanzkredit,%20ich%20habe%20eine%20Anfrage." target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-[#D2511A] transition-colors">+49 175 5312515</a>
        </span>
        <span className="text-[#3A2A20] hidden sm:inline">|</span>
        <span className="flex items-center gap-2 shrink-0">
          <Mail size={14} className="text-[#D2511A]" />
          <a href="mailto:kontakt@krediiwelt.com" className="font-bold text-white hover:text-[#D2511A] transition-colors">kontakt@krediiwelt.com</a>
        </span>
      </div>
    </div>
  )
}
