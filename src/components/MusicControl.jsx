import { useLanguage } from '../context/LanguageProvider'
import { useMusic } from '../context/MusicProvider'

export default function MusicControl() {
  const { copy } = useLanguage()
  const { isPlaying, blocked, available, toggle } = useMusic()

  if (!available) return null

  const label = isPlaying ? copy.musicPause : blocked ? copy.musicHint : copy.musicPlay

  return (
    <div className="fixed bottom-[max(1.1rem,env(safe-area-inset-bottom))] start-[max(0.9rem,env(safe-area-inset-start))] z-[101]">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isPlaying}
        aria-label={label}
        title={label}
          className={[
            'flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-paper/70 text-rose shadow-[0_10px_28px_var(--shadow-ink)] backdrop-blur-md transition duration-500 hover:border-gold hover:bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 touch-manipulation',
          blocked && !isPlaying ? 'music-pulse' : '',
        ].join(' ')}
      >
        {isPlaying ? <PauseIcon /> : <NoteIcon />}
      </button>
    </div>
  )
}

function NoteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 18.5a2.5 2.5 0 1 1-2-.5V8.2l10-2.2v8.7a2.5 2.5 0 1 1-2-.5V8.4L9 10.2v8.3Z"
        fill="currentColor"
      />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6" y="5" width="4.2" height="14" rx="1" fill="currentColor" />
      <rect x="13.8" y="5" width="4.2" height="14" rx="1" fill="currentColor" />
    </svg>
  )
}
