import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { INVITATION } from '../invitationData'

const MusicContext = createContext(null)

export function MusicProvider({ children }) {
  const audioRef = useRef(null)
  const userPausedRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [available, setAvailable] = useState(true)

  const tryPlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return false
    try {
      await audio.play()
      setIsPlaying(true)
      setBlocked(false)
      return true
    } catch {
      setIsPlaying(false)
      setBlocked(true)
      return false
    }
  }, [])

  useEffect(() => {
    const sources = [INVITATION.audioSrc, INVITATION.audioFallback].filter(Boolean)
    const audio = new Audio()
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.38
    audio.playsInline = true
    audio.setAttribute('playsinline', 'true')
    audioRef.current = audio

    let sourceIndex = 0
    audio.src = sources[sourceIndex]

    const onError = () => {
      sourceIndex += 1
      if (sourceIndex < sources.length) {
        audio.src = sources[sourceIndex]
        return
      }
      setAvailable(false)
    }
    const onReady = () => {
      tryPlay()
    }
    audio.addEventListener('error', onError)
    audio.addEventListener('canplaythrough', onReady)

    const onFirstGesture = () => {
      if (userPausedRef.current || !audio.paused) return
      tryPlay()
    }
    window.addEventListener('pointerdown', onFirstGesture)
    window.addEventListener('keydown', onFirstGesture)

    return () => {
      audio.removeEventListener('error', onError)
      audio.removeEventListener('canplaythrough', onReady)
      window.removeEventListener('pointerdown', onFirstGesture)
      window.removeEventListener('keydown', onFirstGesture)
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [tryPlay])

  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.paused) {
      userPausedRef.current = true
      audio.pause()
      setIsPlaying(false)
      setBlocked(false)
      return
    }
    userPausedRef.current = false
    await tryPlay()
  }, [tryPlay])

  const value = useMemo(
    () => ({
      isPlaying,
      blocked,
      available,
      toggle,
      play: tryPlay,
    }),
    [isPlaying, blocked, available, toggle, tryPlay],
  )

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used within MusicProvider')
  return ctx
}
