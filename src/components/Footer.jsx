import { BLESSING } from '../invitationData'

function HeartMark() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
      <path
        d="M7 11.1C6.7 10.9 1.2 7.35 1.2 4.05 1.2 2.35 2.45 1.1 4.1 1.1c.95 0 1.8.45 2.3 1.15C6.9 1.55 7.75 1.1 8.7 1.1c1.65 0 2.9 1.25 2.9 2.95 0 3.3-5.5 6.85-5.8 7.05Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="px-6 pb-24 pt-6 text-center sm:pb-28">
      <div className="blessing-frame animate-fade-up">
        <span className="blessing-heart is-top">
          <HeartMark />
        </span>
        <p className="quote-ar mx-auto max-w-[24ch] font-arabic text-[16px] leading-[2.1]" dir="rtl" lang="ar">
          بَارَكَ اللهُ لَهُمَا وَبَارَكَ عَلَيْهِمَا
          <br />
          وَجَمَعَ بَيْنَهُمَا فِي خَيْر
        </p>
        <p className="mx-auto mt-3 max-w-md font-serif text-sm italic leading-relaxed text-muted sm:text-[15px]">
          {BLESSING.en}
        </p>
        <span className="blessing-heart is-bottom">
          <HeartMark />
        </span>
      </div>
    </footer>
  )
}
