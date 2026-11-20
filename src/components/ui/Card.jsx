export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`bg-white rounded-[24px] border border-[#121110]/10 shadow-[0_14px_38px_-14px_rgba(18,17,16,0.08)] ${hover ? 'hover:-translate-y-1 hover:shadow-[0_22px_50px_-14px_rgba(18,17,16,0.13)] transition-all duration-300' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
