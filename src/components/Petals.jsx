import { useEffect, useState } from 'react'

const COLORS = ['rgba(var(--rgb-accent), 0.92)', 'rgba(var(--rgb-primary), 0.78)', 'rgba(var(--rgb-accent-soft), 0.8)']

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return reduced
}

function buildPetals(count) {
  const n = Math.min(Math.max(count, 4), 14)
  return Array.from({ length: n }, (_, i) => {
    const t = n <= 1 ? 0.5 : i / (n - 1)
    return {
      id: i,
      left: `${6 + t * 82}%`,
      top: `${14 + ((i * 2) % 5) * 13}%`,
      delay: `${i * 0.42}s`,
      duration: `${4.4 + (i % 3) * 0.9}s`,
      slowDuration: `${18 + (i % 5) * 5}s`,
      driftX: `${(i % 2 === 0 ? 1 : -1) * (8 + (i % 5) * 5)}px`,
      size: `${6 + (i % 3) * 3}px`,
      color: COLORS[i % 3],
    }
  })
}

export default function Petals({ count = 8, className = '' }) {
  const reducedMotion = usePrefersReducedMotion()
  const items = buildPetals(count)

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()} aria-hidden>
      <div className="pointer-events-none absolute inset-0 min-h-0 w-full">
        {items.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-tl-full rounded-br-full animate-float-petal pointer-events-none will-change-transform"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.color,
              '--petal-drift-x': p.driftX,
              animationDelay: p.delay,
              animationDuration: reducedMotion ? p.slowDuration : p.duration,
            }}
          />
        ))}
      </div>
    </div>
  )
}
