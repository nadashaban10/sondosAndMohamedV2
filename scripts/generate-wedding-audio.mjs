/**
 * Generates a gentle looping piano-like WAV for the invitation.
 * Replace public/audio/wedding-music.mp3 with your own track anytime.
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'audio')
const sampleRate = 22050
const bpm = 52
const beat = 60 / bpm

const midiToFreq = (m) => 440 * 2 ** ((m - 69) / 12)

// Pachelbel-inspired D major progression, voiced softly
const chords = [
  [62, 66, 69, 74],
  [57, 61, 64, 69],
  [59, 62, 66, 71],
  [54, 57, 61, 66],
  [55, 59, 62, 67],
  [62, 66, 69, 74],
  [55, 59, 62, 67],
  [57, 61, 64, 69],
]

function envelope(t, dur, a = 0.08, d = 0.18, s = 0.42, r = 0.55) {
  if (t < 0 || t > dur) return 0
  if (t < a) return t / a
  if (t < a + d) return 1 - ((t - a) / d) * (1 - s)
  if (t > dur - r) return s * Math.max(0, (dur - t) / r)
  return s
}

function render() {
  const cycles = 1
  const chordDur = beat * 4
  const duration = chords.length * chordDur * cycles + 1.2
  const total = Math.floor(duration * sampleRate)
  const left = new Float32Array(total)
  const right = new Float32Array(total)

  const addNote = (freq, start, dur, amp, pan) => {
    const n0 = Math.floor(start * sampleRate)
    const n1 = Math.min(total, n0 + Math.floor(dur * sampleRate))
    for (let i = n0; i < n1; i++) {
      const t = (i - n0) / sampleRate
      const env = envelope(t, dur)
      const trem = 1 + 0.012 * Math.sin(2 * Math.PI * 4.2 * t)
      const sample =
        Math.sin(2 * Math.PI * freq * t) * 0.72 +
        Math.sin(2 * Math.PI * freq * 2 * t) * 0.16 +
        Math.sin(2 * Math.PI * freq * 3 * t) * 0.05
      const v = sample * env * amp * trem
      left[i] += v * (1 - pan)
      right[i] += v * pan
    }
  }

  for (let cycle = 0; cycle < cycles; cycle++) {
    chords.forEach((chord, ci) => {
      const start = cycle * chords.length * chordDur + ci * chordDur + 0.15
      chord.forEach((midi, ni) => {
        const freq = midiToFreq(midi)
        const stagger = ni * 0.22
        const dur = chordDur * 0.92 - stagger * 0.15
        const amp = ni === 0 ? 0.11 : ni === 3 ? 0.09 : 0.08
        const pan = 0.28 + ni * 0.14
        addNote(freq, start + stagger, dur, amp, pan)
      })
    })
  }

  const samples = new Int16Array(total * 2)
  for (let i = 0; i < total; i++) {
    const fade =
      i < sampleRate * 0.4
        ? i / (sampleRate * 0.4)
        : i > total - sampleRate * 0.8
          ? (total - i) / (sampleRate * 0.8)
          : 1
    samples[i * 2] = Math.max(-32767, Math.min(32767, left[i] * fade * 32767))
    samples[i * 2 + 1] = Math.max(-32767, Math.min(32767, right[i] * fade * 32767))
  }

  const bytes = samples.byteLength
  const buffer = Buffer.alloc(44 + bytes)
  buffer.write('RIFF', 0)
  buffer.writeUInt32LE(36 + bytes, 4)
  buffer.write('WAVE', 8)
  buffer.write('fmt ', 12)
  buffer.writeUInt32LE(16, 16)
  buffer.writeUInt16LE(1, 20)
  buffer.writeUInt16LE(2, 22)
  buffer.writeUInt32LE(sampleRate, 24)
  buffer.writeUInt32LE(sampleRate * 4, 28)
  buffer.writeUInt16LE(4, 32)
  buffer.writeUInt16LE(16, 34)
  buffer.write('data', 36)
  buffer.writeUInt32LE(bytes, 40)
  Buffer.from(samples.buffer).copy(buffer, 44)
  return buffer
}

mkdirSync(outDir, { recursive: true })
const wav = render()
writeFileSync(join(outDir, 'wedding-music.wav'), wav)
console.log(`Wrote ${wav.length} bytes to public/audio/wedding-music.wav`)
