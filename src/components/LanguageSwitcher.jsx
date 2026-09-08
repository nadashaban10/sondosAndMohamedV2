import { useLanguage } from '../context/LanguageProvider'

export default function LanguageSwitcher() {
  const { lang, setLang, copy } = useLanguage()

  return (
    <div
      className="fixed top-[max(0.7rem,env(safe-area-inset-top))] end-[max(0.7rem,env(safe-area-inset-end))] z-[101]"
    >
      <div
        className="flex items-center gap-0.5 rounded-full border border-gold/35 bg-paper/80 px-1 py-0.5 shadow-[0_8px_24px_var(--shadow-ink)] backdrop-blur-md"
        role="group"
        aria-label={copy.langLabel}
      >
        <LangButton
          active={lang === 'en'}
          onClick={() => setLang('en')}
          label={copy.langEn}
          lang="en"
        />
        <span className="h-2.5 w-px bg-gold/40" aria-hidden />
        <LangButton
          active={lang === 'ar'}
          onClick={() => setLang('ar')}
          label={copy.langAr}
          lang="ar"
        />
      </div>
    </div>
  )
}

function LangButton({ active, onClick, label, lang }) {
  return (
    <button
      type="button"
      lang={lang}
      onClick={onClick}
      aria-pressed={active}
      className={[
        'h-8 min-w-8 rounded-full px-2 font-sans text-[10px] tracking-[0.12em] transition-colors duration-300 touch-manipulation',
        active ? 'bg-rose/10 text-ink' : 'text-muted hover:text-ink',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
