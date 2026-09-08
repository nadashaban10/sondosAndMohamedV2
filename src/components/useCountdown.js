import { useState, useEffect } from 'react'
export function useCountdown(targetDate) {
  const [diff, setDiff] = useState(targetDate - Date.now())
  useEffect(() => {
    const timer = setInterval(() => setDiff(targetDate - Date.now()), 1000)
    return () => clearInterval(timer)
  }, [targetDate])
  const total = Math.max(0, diff)
  return {
    d: Math.floor(total / (1000 * 60 * 60 * 24)),
    h: Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    m: Math.floor((total % (1000 * 60 * 60)) / (1000 * 60)),
    s: Math.floor((total % (1000 * 60)) / 1000),
  }
}
