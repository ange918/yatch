export function Honeypot({ value, onChange }) {
  return (
    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
      <label>
        Website
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    </div>
  )
}

export function FormError({ children }) {
  if (!children) return null
  return (
    <p role="alert" className="text-sm font-medium text-red-700 bg-red-50 border border-red-100 rounded-2xl px-4 py-3">
      {children}
    </p>
  )
}
