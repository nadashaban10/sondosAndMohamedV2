/** Keeps Latin initials (like S) from scrambling inside Arabic names. */
export default function MixedName({ text }) {
  const parts = String(text ?? '').split(/([A-Za-z]+)/)
  return parts.map((part, i) => {
    if (!part) return null
    if (/^[A-Za-z]+$/.test(part)) {
      return (
        <span key={i} className="names-latin" dir="ltr" lang="en">
          {part}
        </span>
      )
    }
    return (
      <span key={i} dir="rtl" lang="ar">
        {part}
      </span>
    )
  })
}
