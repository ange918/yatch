export default function Badge({ children, color = 'green', className = '' }) {
  const colors = {
    green: 'bg-[#D2511A]/10 text-[#3A2A20] border border-[#D2511A]/30',
    blue: 'bg-blue-50 text-blue-700 border border-blue-200',
    dark: 'bg-[#8F3510]/10 text-[#8F3510] border border-[#8F3510]/20',
    gold: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  }
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${colors[color]} ${className}`}>
      {children}
    </span>
  )
}
