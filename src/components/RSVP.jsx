import { useState } from 'react'
import Petals from './Petals'
import MixedName from './MixedName'
import { useLanguage } from '../context/LanguageProvider'

const INITIAL = {
  name: '',
  attending: 'yes',
  message: '',
}

export default function RSVP() {
  const { copy, invitation, isArabic } = useLanguage()
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await fetch(invitation.rsvpUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          family: form.message.trim() || 'N/A',
          attendance: form.attending === 'yes' ? 'yes' : 'no',
        }),
      })
      setSubmitted(true)
    } catch (err) {
      console.error('RSVP Error:', err)
      setError(copy.rsvpError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="rsvp" className="snap-panel relative flex flex-col items-center justify-center overflow-hidden bg-transparent px-5 py-14 pb-28 sm:px-8 sm:pb-32">
      <Petals count={6} className="z-0 opacity-[0.38] motion-safe:animate-fade-in" />

      <div className="relative z-[1] mx-auto w-full max-w-xl">
        <div className="divider mb-10 animate-fade-up">{copy.rsvpKicker}</div>

        {submitted ? (
          <article
            className="overflow-hidden rounded-[28px] text-center animate-scale-in backdrop-blur-md"
            style={{
              border: '1px solid rgba(var(--rgb-accent),0.28)',
              background: 'rgba(255,255,255,0.38)',
              boxShadow: '0 28px 70px var(--shadow-accent)',
            }}
          >
            <div className="relative h-52 overflow-hidden sm:h-64">
              <img
                src={invitation.coupleImage}
                alt={copy.coupleAlt}
                className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
                style={form.attending === 'yes' ? undefined : { filter: 'saturate(0.78) brightness(1.06)' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    form.attending === 'yes'
                      ? 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(var(--rgb-surface),0.18) 42%, rgba(var(--rgb-surface),0.96) 100%)'
                      : 'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(var(--rgb-background),0.42) 48%, rgba(var(--rgb-surface),0.97) 100%)',
                }}
              />
              <img
                src="/images/flora.png"
                alt=""
                className="pointer-events-none absolute -bottom-8 -end-10 w-40 opacity-40 mix-blend-multiply"
                aria-hidden
              />
            </div>

            <div className="relative -mt-16 px-7 pb-10 sm:px-10">
              <div
                className="mx-auto mb-5 h-[5.25rem] w-[5.25rem] overflow-hidden rounded-full shadow-[0_12px_32px_var(--shadow-ink)] sm:h-24 sm:w-24"
                style={{ border: '3px solid rgba(255,255,255,0.92)', boxShadow: '0 0 0 1px rgba(var(--rgb-accent),0.35), 0 12px 32px var(--shadow-ink)' }}
              >
                <img src={invitation.coupleImage} alt="" className="h-full w-full object-cover object-[center_38%]" />
              </div>

              <p className={`names-line text-[clamp(1.1rem,3vw,1.45rem)] ${isArabic ? 'is-ar' : ''}`}>
                {isArabic ? <MixedName text={copy.namesLine} /> : copy.namesLine}
              </p>
              <h2 className={`mt-3 font-light leading-tight text-ink ${isArabic ? 'font-arabic text-[1.85rem] sm:text-3xl' : 'font-serif text-[1.85rem] sm:text-[2.2rem]'}`}>
                {form.attending === 'yes' ? copy.rsvpThanksYes : copy.rsvpThanksNo}
              </h2>
              {form.name.trim() ? (
                <p className={`mt-3 text-base text-rose ${isArabic ? 'font-arabic' : 'font-serif italic'}`}>
                  {isArabic ? `${form.name.trim()}،` : `Dear ${form.name.trim()},`}
                </p>
              ) : null}
              <p
                className={`mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-muted ${isArabic ? 'font-arabic text-base leading-[1.9]' : 'font-serif italic'}`}
              >
                {form.attending === 'yes' ? copy.rsvpReceived : copy.rsvpDeclined}
              </p>
              <p className={`names-line mt-5 ${isArabic ? 'text-lg' : 'text-[1.65rem] leading-none'}`}>
                {copy.rsvpThanks}
              </p>
              <p className={`names-line mt-1 text-[clamp(1.05rem,2.8vw,1.35rem)] ${isArabic ? 'is-ar' : ''}`}>
                {isArabic ? <MixedName text={copy.namesLine} /> : copy.namesLine}
              </p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, rgba(var(--rgb-accent),0.65))' }} />
                <span className={`text-[10px] uppercase tracking-[0.32em] text-dim ${isArabic ? 'font-arabic tracking-[0.1em] normal-case' : ''}`}>
                  {copy.dateShort}
                </span>
                <span className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, rgba(var(--rgb-accent),0.65))' }} />
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  className="outline-btn"
                  onClick={() => {
                    setSubmitted(false)
                    setError('')
                  }}
                >
                  {copy.rsvpEdit}
                </button>
              </div>
            </div>
          </article>
        ) : (
          <div
            className="relative rounded-[28px] p-8 animate-fade-up anim-delay-1 backdrop-blur-md sm:p-10"
            style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-glass)', boxShadow: '0 22px 65px var(--shadow-accent)' }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className={`mb-1 block font-sans text-[10px] uppercase tracking-[0.28em] text-dim ${isArabic ? 'font-arabic tracking-[0.1em] text-sm normal-case' : ''}`}>
                  {copy.rsvpName}
                </label>
                <input className="form-input" required placeholder={copy.rsvpNamePh} value={form.name} onChange={(e) => set('name', e.target.value)} />
              </div>

              <div>
                <p className={`mb-4 font-sans text-[10px] uppercase tracking-[0.28em] text-dim ${isArabic ? 'font-arabic tracking-[0.1em] text-sm normal-case' : ''}`}>
                  {copy.rsvpAttend}
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    ['yes', copy.rsvpYes],
                    ['no', copy.rsvpNo],
                  ].map(([val, label]) => (
                    <button type="button" key={val} onClick={() => set('attending', val)} className={`rsvp-option ${form.attending === val ? 'selected' : ''}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`mb-1 block font-sans text-[10px] uppercase tracking-[0.28em] text-dim ${isArabic ? 'font-arabic tracking-[0.1em] text-sm normal-case' : ''}`}>
                  {copy.rsvpMessage}
                </label>
                <textarea className="form-input resize-none" rows={3} placeholder={copy.rsvpMessagePh} value={form.message} onChange={(e) => set('message', e.target.value)} />
              </div>

              {error ? <p className="text-center text-sm italic text-rose">{error}</p> : null}

              <div className="pt-1 text-center">
                <button
                  type="submit"
                  className={`rose-btn ${loading ? 'is-loading' : ''}`}
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <span className="inline-flex items-center justify-center gap-3">
                      <span className="btn-spinner" aria-hidden />
                      <span>{copy.rsvpSending}</span>
                    </span>
                  ) : (
                    copy.rsvpSubmit
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
