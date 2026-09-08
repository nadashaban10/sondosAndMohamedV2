import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../context/LanguageProvider'

export default function ShareButton() {
  const { copy, isArabic } = useLanguage()
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!toast) return undefined
    const id = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(id)
  }, [toast])

  const handleShare = async () => {
    const data = {
      title: copy.namesLine,
      text: copy.shareText,
      url: window.location.href,
    }
    try {
      if (navigator.share) {
        await navigator.share(data)
        return
      }
      await navigator.clipboard.writeText(window.location.href)
      setToast(copy.shareCopied)
    } catch (e) {}
  }

  return (
    <>
      <button type="button" className="outline-btn inline-flex min-h-11 items-center gap-2.5" onClick={handleShare}>
        <EnvelopeIcon />
        {copy.shareCta}
      </button>

      {createPortal(
        <div className={`invite-toast ${toast ? 'show' : ''} ${isArabic ? 'font-arabic' : 'font-serif'}`} role="status" aria-live="polite">
          {toast}
        </div>,
        document.body,
      )}
    </>
  )
}

function EnvelopeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.25" y="6.25" width="17.5" height="11.5" rx="1.4" stroke="currentColor" strokeWidth="1.25" />
      <path d="M4.2 7.1 12 13.1l7.8-6" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  )
}
