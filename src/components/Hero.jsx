import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useCountdown } from './useCountdown'
import { downloadWeddingCalendar } from './calendar'
import Petals from './Petals'
import ShareButton from './ShareButton'
import MixedName from './MixedName'
import { useLanguage } from '../context/LanguageProvider'

function CountCell({ label, value }) {
  return (
    <div className="countdown-cell">
      <div className="font-serif text-rose" style={{ fontSize: 'clamp(26px, 6vw, 38px)', fontWeight: 300 }}>
        {String(value).padStart(2, '0')}
      </div>
      <div className="mt-1 font-sans text-[9px] uppercase tracking-[0.32em] text-dim sm:text-[10px] rtl:font-arabic rtl:normal-case">{label}</div>
    </div>
  )
}

export default function Hero() {
  const { copy, invitation, isArabic } = useLanguage()
  const start = new Date(invitation.weddingDate)
  const { d, h, m, s } = useCountdown(start.getTime())
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!toast) return undefined
    const id = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(id)
  }, [toast])

  const handleAddCalendar = () => {
    downloadWeddingCalendar({
      summary: copy.calendarSummary,
      location: copy.calendarLocation,
      description: copy.calendarDescription,
    })
    setToast(copy.calendarSaved)
  }

  return (
    <section id="hero" className="snap-panel relative flex flex-col items-center justify-center bg-transparent px-5 pb-10 pt-[max(4.75rem,calc(env(safe-area-inset-top)+3.5rem))] sm:px-8 sm:pb-12 sm:pt-20">
      <Petals count={9} className="z-0 opacity-[0.5] motion-safe:animate-fade-in" />

      <div className="relative z-[1] flex w-full flex-col items-center justify-center">
        <p
          className={`mb-6 text-center sm:mb-8 animate-fade-in ${
            isArabic
              ? 'quote-ar font-ruqaa text-[clamp(1.15rem,3.6vw,1.45rem)] font-normal tracking-normal leading-[1.9]'
              : 'font-sans text-[10px] uppercase tracking-[0.48em] text-gold'
          }`}
          dir={isArabic ? 'rtl' : undefined}
          lang={isArabic ? 'ar' : undefined}
        >
          {copy.kicker}
        </p>

        <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14">
          <div className="relative flex justify-center animate-fade-up lg:justify-end">
            <div className="relative w-full max-w-[380px]">
              <span className="frame-ornament top-0 left-0 rounded-tl-[4px] border-l-2 border-t-2" aria-hidden />
              <span className="frame-ornament top-0 right-0 rounded-tr-[4px] border-r-2 border-t-2" aria-hidden />
              <span className="frame-ornament bottom-0 left-0 rounded-bl-[4px] border-b-2 border-l-2" aria-hidden />
              <span className="frame-ornament bottom-0 right-0 rounded-br-[4px] border-b-2 border-r-2" aria-hidden />

              <div
                className="relative rounded-[8px] p-[10px] animate-float-slow sm:p-3"
                style={{
                  background: 'linear-gradient(145deg, rgba(var(--rgb-accent),0.14), rgba(var(--rgb-primary),0.08))',
                  boxShadow: '0 28px 80px var(--shadow-ink)',
                }}
              >
                <div className="rounded-[6px] p-[6px]" style={{ border: '2px solid rgba(var(--rgb-accent), 0.6)', boxShadow: 'inset 0 0 0 1px rgba(var(--rgb-surface),0.55)' }}>
                  <div className="relative overflow-hidden rounded-[4px]">
                    <img
                      src={invitation.coupleImage}
                      alt={copy.coupleAlt}
                      className="aspect-[3/4] w-full object-cover object-[center_42%] transition-transform duration-[1.2s] ease-out hover:scale-[1.02]"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
              {isArabic ? (
                <p className="mt-5 text-center font-arabic text-[clamp(1rem,3.6vw,1.2rem)] leading-[1.95] text-rose" dir="rtl" lang="ar">
                  {copy.photoCaption}
                </p>
              ) : (
                <p className="mt-5 text-center font-serif text-[15px] italic leading-relaxed text-rose sm:text-base">
                  {copy.photoCaption}
                </p>
              )}
              {isArabic ? (
                <p className="mt-4 text-center font-ruqaa text-[clamp(1.15rem,4.2vw,1.45rem)] leading-[1.9] text-rose" dir="rtl" lang="ar">
                  {copy.childhoodQuote}
                </p>
              ) : (
                <p className="mt-4 text-center font-serif text-base italic leading-relaxed text-rose sm:text-lg">
                  {copy.childhoodQuote}
                </p>
              )}
            </div>
          </div>

          <div className={`space-y-7 text-center animate-fade-up anim-delay-2 lg:text-start`}>
            <h1 className={`names ${isArabic ? 'is-ar' : ''}`}>
              {isArabic ? <MixedName text={copy.nameFirst} /> : copy.nameFirst}{' '}
              <span className="names-amp">&amp;</span>{' '}
              {isArabic ? <MixedName text={copy.nameSecond} /> : copy.nameSecond}
            </h1>

            <p className={`text-lg tracking-wide text-rose sm:text-xl ${isArabic ? 'font-arabic' : 'font-serif italic'}`}>
              {copy.inviteLine}
            </p>

            <div className="space-y-1.5">
              <p className={`font-sans text-base tracking-[0.18em] text-rose sm:text-lg ${isArabic ? 'font-arabic tracking-normal normal-case' : 'uppercase'}`}>
                {copy.weekday} · {copy.date}
              </p>
              <p className={`font-sans text-sm tracking-[0.18em] text-rose ${isArabic ? 'font-arabic tracking-[0.08em] normal-case text-base' : 'uppercase'}`}>
                {copy.time} · {copy.venueName}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:justify-start">
                <CountCell label={copy.days} value={d} />
                <CountCell label={copy.hours} value={h} />
                <CountCell label={copy.minutes} value={m} />
                <CountCell label={copy.seconds} value={s} />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-1 lg:justify-start">
              <button type="button" className="outline-btn" onClick={handleAddCalendar}>
                {copy.addCalendar}
              </button>
              <ShareButton />
            </div>
          </div>
        </div>
      </div>
      {createPortal(
        <div className={`invite-toast ${toast ? 'show' : ''} ${isArabic ? 'font-arabic' : 'font-serif'}`} role="status" aria-live="polite">
          {toast}
        </div>,
        document.body,
      )}
    </section>
  )
}
