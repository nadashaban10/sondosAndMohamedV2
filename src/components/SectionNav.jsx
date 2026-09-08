import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../context/LanguageProvider'

export default function SectionNav({ rootRef }) {
  const { copy } = useLanguage()
  const sections = useMemo(
    () => [
      { id: 'hero', label: copy.navHome },
      { id: 'venue', label: copy.navVenue },
      { id: 'rsvp', label: copy.navRsvp },
    ],
    [copy],
  )
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const root = rootRef?.current
    if (!root) return
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { root, threshold: [0.35, 0.55, 0.72] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rootRef, sections])

  useEffect(() => {
    const onKey = (e) => {
      const idx = sections.findIndex((s) => s.id === active)
      if (e.key === 'ArrowDown' && idx < sections.length - 1) {
        e.preventDefault()
        document.getElementById(sections[idx + 1].id)?.scrollIntoView({ behavior: 'smooth' })
      }
      if (e.key === 'ArrowUp' && idx > 0) {
        e.preventDefault()
        document.getElementById(sections[idx - 1].id)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, sections])

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav className="fixed end-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3 sm:end-6" aria-label="Section navigation">
      {sections.map((s) => {
        const on = active === s.id
        return (
          <button key={s.id} type="button" onClick={() => go(s.id)} className="group relative flex items-center justify-end outline-none" aria-current={on ? 'true' : undefined} aria-label={s.label}>
            <span
              className="pointer-events-none absolute end-8 whitespace-nowrap rounded-full px-3 py-1 font-sans text-[10px] uppercase tracking-[0.25em] opacity-0 transition duration-300 group-hover:opacity-100"
              style={{ background: 'rgba(var(--rgb-primary),0.9)', color: 'var(--color-on-primary)', border: '1px solid rgba(var(--rgb-accent),0.35)' }}
            >
              {s.label}
            </span>
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: on ? 14 : 9,
                height: on ? 14 : 9,
                background: on ? 'linear-gradient(145deg, rgb(var(--rgb-accent-soft)), rgb(var(--rgb-accent)))' : 'rgba(var(--rgb-foreground),0.2)',
                boxShadow: on ? '0 0 0 4px rgba(var(--rgb-accent),0.28)' : 'none',
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}
