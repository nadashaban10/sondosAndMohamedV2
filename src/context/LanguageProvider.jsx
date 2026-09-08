import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { INVITATION, detectBrowserLanguage } from '../invitationData'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'invite-lang'
const CHOSEN_KEY = 'invite-lang-chosen'

function applyDocumentLang(lang) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.style.colorScheme = 'light'
}

function readInitialLang() {
  try {
    const chosen = localStorage.getItem(CHOSEN_KEY) === '1'
    const stored = localStorage.getItem(STORAGE_KEY)
    if (chosen && (stored === 'ar' || stored === 'en')) return stored
  } catch {
    /* ignore */
  }
  return detectBrowserLanguage()
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const initial = readInitialLang()
    applyDocumentLang(initial)
    return initial
  })

  useEffect(() => {
    applyDocumentLang(lang)
    document.title = INVITATION.copy[lang].documentTitle
  }, [lang])

  const setLang = useCallback((next) => {
    const resolved = next === 'ar' ? 'ar' : 'en'
    setLangState(resolved)
    try {
      localStorage.setItem(STORAGE_KEY, resolved)
      localStorage.setItem(CHOSEN_KEY, '1')
    } catch {
      /* ignore */
    }
  }, [])

  const toggleLang = useCallback(() => {
    setLangState((current) => {
      const resolved = current === 'ar' ? 'en' : 'ar'
      try {
        localStorage.setItem(STORAGE_KEY, resolved)
        localStorage.setItem(CHOSEN_KEY, '1')
      } catch {
        /* ignore */
      }
      return resolved
    })
  }, [])

  const value = useMemo(() => {
    const copy = INVITATION.copy[lang]
    return {
      lang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      isArabic: lang === 'ar',
      setLang,
      toggleLang,
      copy,
      invitation: INVITATION,
    }
  }, [lang, setLang, toggleLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
