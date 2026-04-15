import { useEffect, useRef, useState, useCallback } from 'react'

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

export function useCountUp(end, duration = 2000, startOnView = false) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(!startOnView)

  const start = useCallback(() => setStarted(true), [])

  useEffect(() => {
    if (!started) return

    let startTime = null
    let animFrame = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        animFrame = requestAnimationFrame(animate)
      }
    }

    animFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrame)
  }, [end, duration, started])

  return { count, start }
}
