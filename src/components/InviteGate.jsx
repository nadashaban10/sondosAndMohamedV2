import { useEffect, useState } from 'react'
import { QURAN } from '../invitationData'
import MixedName from './MixedName'
import Petals from './Petals'
import { useLanguage } from '../context/LanguageProvider'
import { useMusic } from '../context/MusicProvider'

const IMG_FLORA = '/images/flora.png'
const IMG_FLOWER = '/images/flower.png'
const IMG_FLOWERRR = '/images/flowerrr.png'

function GateBackdropBotanicals() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-[18%] top-[2%] w-[min(46vw,230px)] rotate-[-18deg]">
        <img
          src={IMG_FLOWERRR}
          alt=""
          className="w-full max-w-none opacity-[0.5] mix-blend-multiply will-change-transform motion-safe:animate-float-flora"
          style={{ animationDelay: '0.35s' }}
          decoding="async"
        />
      </div>
      <div className="absolute -right-[14%] top-[18%] w-[min(42vw,210px)] rotate-[12deg]">
        <img
          src={IMG_FLOWER}
          alt=""
          className="w-full max-w-none opacity-[0.52] mix-blend-multiply will-change-transform motion-safe:animate-float-flora-alt"
          style={{ animationDelay: '1.1s' }}
          decoding="async"
        />
      </div>
      <div className="absolute bottom-[12%] -right-[12%] w-[min(62vw,340px)]">
        <img
          src={IMG_FLORA}
          alt=""
          className="w-full max-w-none opacity-[0.62] mix-blend-multiply will-change-transform motion-safe:animate-float-flora"
          style={{ animationDelay: '0.8s' }}
          decoding="async"
        />
      </div>
    </div>
  )
}

function OrnamentRule() {
  return (
    <svg className="mx-auto mt-5 mb-1 h-[18px] w-[180px] max-w-[62%]" viewBox="0 0 200 18" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" className="text-gold">
        <line x1="0" y1="9" x2="76" y2="9" />
        <circle cx="84" cy="9" r="1.6" fill="currentColor" stroke="none" />
        <path d="M100 2 L107 9 L100 16 L93 9 Z" />
        <circle cx="116" cy="9" r="1.6" fill="currentColor" stroke="none" />
        <line x1="124" y1="9" x2="200" y2="9" />
      </g>
    </svg>
  )
}

export default function InviteGate({ onOpen }) {
  const { copy, invitation, isArabic } = useLanguage()
  const { play } = useMusic()
  const [opened, setOpened] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtml = html.style.overflow
    const prevBody = body.style.overflow
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prevHtml
      body.style.overflow = prevBody
    }
  }, [])

  if (opened) return null

  return (
    <div className="invite-gate" role="dialog" aria-modal="true" aria-label={copy.openInvite}>
      <div className="absolute inset-0">
        <img src={invitation.coupleImage} alt="" className="h-full w-full object-cover" loading="eager" />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 85% 55% at 50% 15%, rgba(var(--rgb-accent-soft), 0.18) 0%, transparent 50%),
              linear-gradient(165deg, rgba(var(--rgb-surface), 0.22) 0%, rgba(var(--rgb-background), 0.42) 45%, rgba(var(--rgb-primary), 0.28) 100%)
            `,
          }}
        />
      </div>

      <div
        className="invite-gate-scroll"
        style={closing ? { opacity: 0, transform: 'scale(0.98) translateY(12px)', transition: 'opacity 700ms ease, transform 700ms ease' } : { opacity: 1, transition: 'opacity 700ms ease, transform 700ms ease' }}
      >
        <div
          className="relative flex min-h-full w-full flex-col px-6 pt-[max(5rem,calc(env(safe-area-inset-top)+3.75rem))] pb-[max(8rem,calc(env(safe-area-inset-bottom)+6.5rem))] text-ink backdrop-blur-xl sm:px-10"
          style={{
            background: 'linear-gradient(180deg, rgba(var(--rgb-surface), 0.82) 0%, rgba(var(--rgb-background), 0.78) 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.35)',
          }}
        >
          <GateBackdropBotanicals />
          <Petals count={10} className="z-[1] opacity-70" />

          <div
            className="pointer-events-none absolute left-6 right-6 top-0 z-[2] h-px sm:left-10 sm:right-10"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(var(--rgb-accent), 0.5), transparent)' }}
            aria-hidden
          />

          <div className="relative z-[2] flex flex-col">

          <blockquote className="mx-auto mt-2 max-w-xl text-center font-arabic text-ink animate-fade-up anim-delay-1" dir="rtl" lang="ar">
            <p className="mb-3 text-[clamp(0.95rem,3.2vw,1.18rem)] leading-relaxed tracking-wide">{QURAN.basmala}</p>
            <p className="text-[clamp(0.88rem,3vw,1.12rem)] leading-[1.85]">{QURAN.verse}</p>
          </blockquote>

          <p className="mx-auto mt-3 max-w-md text-center font-serif text-[13px] italic leading-relaxed text-ink sm:text-[15px] animate-fade-up anim-delay-2">
            {QURAN.verseEn}
          </p>
          <p className={`mt-4 text-center text-[11px] tracking-[0.32em] text-rose animate-fade-up anim-delay-1 ${isArabic ? 'font-arabic tracking-[0.12em] text-sm normal-case' : 'font-sans uppercase'}`}>
            {isArabic ? QURAN.ref : QURAN.refEn}
          </p>

          <OrnamentRule />

          <h1 className={`names mx-auto mt-5 text-center animate-fade-up anim-delay-3 ${isArabic ? 'is-ar' : ''}`}>
            <span className="block">{isArabic ? <MixedName text={copy.nameFirst} /> : copy.nameFirst}</span>
            <span className="names-amp my-2 block leading-none" style={{ fontSize: '0.72em' }}>
              &amp;
            </span>
            <span className="block">{isArabic ? <MixedName text={copy.nameSecond} /> : copy.nameSecond}</span>
          </h1>

          <div className="mx-auto mt-6 max-w-md space-y-4 text-center animate-fade-up anim-delay-3">
            {isArabic ? (
              <p className="font-arabic text-[clamp(0.98rem,3.4vw,1.15rem)] leading-[1.95] tracking-normal text-rose" dir="rtl" lang="ar">
                {copy.photoCaption}
              </p>
            ) : (
              <p className="font-serif text-[15px] italic leading-relaxed text-rose sm:text-base">
                {copy.photoCaption}
              </p>
            )}
            {isArabic ? (
              <p className="font-ruqaa text-[clamp(1.1rem,4vw,1.35rem)] leading-[1.9] tracking-normal text-rose" dir="rtl" lang="ar">
                {copy.childhoodQuote}
              </p>
            ) : (
              <p className="font-serif text-base italic leading-relaxed text-rose sm:text-lg">
                {copy.childhoodQuote}
              </p>
            )}
          </div>

          <div className="gate-details mx-auto mt-5 w-full max-w-[18.5rem] text-center animate-fade-up anim-delay-4">
            <p
              className={`text-[12px] leading-snug sm:text-[13px] ${
                isArabic
                  ? 'font-arabic tracking-normal'
                  : 'font-sans uppercase tracking-[0.16em]'
              }`}
            >
              {copy.weekday}
              <span className="mx-1.5 text-gold" aria-hidden>
                ·
              </span>
              {copy.date}
            </p>
            <p
              className={`mt-1.5 text-[1.35rem] leading-none sm:text-[1.45rem] ${
                isArabic ? 'font-arabic' : 'font-serif font-light tracking-[0.12em]'
              }`}
            >
              {copy.time}
            </p>

            <div className="mx-auto my-3 flex items-center justify-center gap-2" aria-hidden>
              <span className="h-px w-10 bg-gold/40" />
              <span className="block h-[5px] w-[5px] rotate-45 bg-gold/70" />
              <span className="h-px w-10 bg-gold/40" />
            </div>

            <p className={`text-[15px] leading-snug sm:text-base ${isArabic ? 'font-arabic' : 'font-serif tracking-[0.04em]'}`}>
              {copy.venueName}
            </p>
            {!isArabic ? (
              <p className="mt-0.5 font-arabic text-[13px] leading-snug" dir="rtl" lang="ar">
                {copy.venueArabicName}
              </p>
            ) : null}
            <p className={`mt-1 text-[12px] leading-snug text-muted sm:text-[13px] ${isArabic ? 'font-arabic' : 'font-serif'}`}>
              {copy.venueArea}
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center pb-4">
            <button
              type="button"
              className={`min-h-14 rounded-full px-12 font-sans text-[12px] uppercase tracking-[0.18em] text-rose shadow-[0_10px_28px_var(--shadow-ink)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_var(--shadow-ink)] ${isArabic ? 'font-arabic text-base tracking-[0.08em] normal-case' : ''}`}
              style={{
                border: '1.5px solid var(--border-strong)',
                background: 'linear-gradient(180deg, rgba(var(--rgb-surface), 0.92), rgba(var(--rgb-background), 0.72))',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 10px 28px var(--shadow-ink)',
              }}
              onClick={() => {
                if (closing) return
                play()
                setClosing(true)
                window.setTimeout(() => {
                  setOpened(true)
                  onOpen?.()
                }, 680)
              }}
            >
              {copy.openInvite}
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
