// Colors the last word of a title in the brand orange.
export default function Accent({ children }) {
  if (typeof children !== 'string') return children
  const words = children.trim().split(' ')
  if (words.length < 2) return <span className="text-[#D2511A]">{children}</span>
  const last = words.pop()
  return <>{words.join(' ')} <span className="text-[#D2511A]">{last}</span></>
}
