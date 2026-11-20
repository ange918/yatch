// Colors the last word of a title in the brand orange, with optional editorial italic serif styling.
export default function Accent({ children, editorial = false }) {
  if (typeof children !== 'string') return children
  const accentClass = editorial
    ? 'font-serif-editorial italic text-[#D2511A]'
    : 'text-[#D2511A]'
  const words = children.trim().split(' ')
  if (words.length < 2) return <span className={accentClass}>{children}</span>
  const last = words.pop()
  return (
    <>
      {words.join(' ')} <span className={accentClass}>{last}</span>
    </>
  )
}
