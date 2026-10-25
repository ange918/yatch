const FLAGS = {
  DE: (
    <>
      <rect width="30" height="20" fill="#000" />
      <rect y="6.67" width="30" height="13.33" fill="#DD0000" />
      <rect y="13.33" width="30" height="6.67" fill="#FFCE00" />
    </>
  ),
  FR: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <rect width="10" height="20" fill="#0055A4" />
      <rect x="20" width="10" height="20" fill="#EF4135" />
    </>
  ),
  NL: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="6.67" fill="#AE1C28" />
      <rect y="13.33" width="30" height="6.67" fill="#21468B" />
    </>
  ),
  EN: (
    <>
      <rect width="30" height="20" fill="#012169" />
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#fff" strokeWidth="4" />
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" strokeWidth="1.6" />
      <path d="M15,0 V20 M0,10 H30" stroke="#fff" strokeWidth="6" />
      <path d="M15,0 V20 M0,10 H30" stroke="#C8102E" strokeWidth="3.6" />
    </>
  ),
}

export default function Flag({ code, className = 'w-6 h-4' }) {
  return (
    <svg viewBox="0 0 30 20" className={`${className} rounded-[3px] shrink-0 ring-1 ring-white/20`} role="img" aria-label={code}>
      {FLAGS[code]}
    </svg>
  )
}
