export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer'
  const variants = {
    primary: 'bg-[#D2511A] text-[#121110] hover:scale-105 hover:shadow-[0_0_20px_rgba(210,81,26,0.4)] focus:ring-[#D2511A] px-6 py-3',
    secondary: 'bg-transparent border-2 border-[#D2511A] text-[#D2511A] hover:bg-[#D2511A] hover:text-[#121110] hover:scale-105 px-6 py-3',
    dark: 'bg-[#121110] text-white hover:bg-[#3A2A20] hover:scale-105 px-6 py-3',
    ghost: 'bg-white/10 text-white border border-white/20 hover:bg-white/20 px-6 py-3',
    sm: 'bg-[#D2511A] text-[#121110] hover:scale-105 px-4 py-2 text-sm',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
