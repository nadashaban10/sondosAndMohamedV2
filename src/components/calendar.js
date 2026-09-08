function icsEscape(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

export function downloadWeddingCalendar({ summary, location, description }) {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mohamed and Sondos//Wedding//EN',
    'BEGIN:VEVENT',
    'UID:mohamed-sondos-20260920@wedding',
    'DTSTAMP:20260101T000000Z',
    'DTSTART:20260920T183000Z',
    'DTEND:20260920T203000Z',
    `SUMMARY:${icsEscape(summary)}`,
    `LOCATION:${icsEscape(location)}`,
    `DESCRIPTION:${icsEscape(description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'mohamed-sondos-wedding.ics'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.setTimeout(() => URL.revokeObjectURL(a.href), 4000)
}
