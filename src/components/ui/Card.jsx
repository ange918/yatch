export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md border border-gray-100 ${hover ? 'hover:-translate-y-1 hover:shadow-xl transition-all duration-300' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
