const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
]

function getMonthGrid(year, monthIndex) {
  const first = new Date(year, monthIndex, 1)
  const startDow = (first.getDay() + 6) % 7
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

export default function WeddingCalendar({ date = new Date(), label = 'Celebration', saveLabel = 'Save the date', arabic = false }) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const weeks = getMonthGrid(year, month)
  const monthName = arabic ? MONTHS_AR[month] : MONTHS[month]
  const weekdays = arabic ? ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-[24px] border bg-white/30 shadow-[0_16px_48px_var(--shadow-accent)] backdrop-blur-md transition-shadow duration-500 hover:shadow-lg" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: 'rgba(var(--rgb-accent),0.15)', background: 'radial-gradient(480px 120px at 50% 0%, rgba(var(--rgb-accent),0.12), transparent 60%)' }}>
        <div>
          <div className={`mb-1.5 font-sans text-[10px] uppercase tracking-[0.45em] text-dim ${arabic ? 'font-arabic tracking-[0.16em] text-xs normal-case' : ''}`}>
            {label}
          </div>
          <div className={`font-serif text-3xl font-light text-ink sm:text-4xl ${arabic ? 'font-arabic' : ''}`}>
            {monthName} {day}, {year}
          </div>
        </div>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="rgba(var(--rgb-accent),0.9)" strokeWidth="1.2" fill="rgba(var(--rgb-accent),0.12)" />
        </svg>
      </div>

      <div className="px-5 py-5">
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {weekdays.map((d, i) => (
            <div key={`${d}-${i}`} className="font-sans text-[10px] uppercase tracking-[0.28em] text-dim">
              {d}
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1.5 text-center">
          {weeks.flat().map((cell, idx) => {
            const isSelected = cell === day
            return (
              <div key={idx} className="flex items-center justify-center">
                <div
                  className={[
                    'flex h-9 w-9 items-center justify-center rounded-full text-base sm:h-10 sm:w-10',
                    isSelected
                      ? 'text-ink shadow-[0_8px_22px_var(--shadow-accent)]'
                      : cell != null
                        ? 'bg-white/55 text-ink/80'
                        : 'text-transparent',
                  ].join(' ')}
                  style={
                    isSelected
                      ? { background: 'linear-gradient(145deg, rgba(var(--rgb-accent),0.2), rgba(var(--rgb-accent-soft),0.18))', border: '1px solid rgba(var(--rgb-accent),0.45)' }
                      : cell != null
                        ? { border: '1px solid rgba(var(--rgb-accent),0.12)' }
                        : { border: '1px solid transparent' }
                  }
                >
                  {cell ?? '·'}
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-5 flex items-center justify-center gap-3">
          <span className="h-px w-8" style={{ background: 'rgba(var(--rgb-accent),0.25)' }} />
          <div className={`font-sans text-[10px] uppercase tracking-[0.4em] text-gold ${arabic ? 'font-arabic tracking-[0.14em] text-xs normal-case' : ''}`}>
            {saveLabel}
          </div>
          <span className="h-px w-8" style={{ background: 'rgba(var(--rgb-accent),0.25)' }} />
        </div>
      </div>
    </div>
  )
}
