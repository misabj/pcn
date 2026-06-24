import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import styles from './CustomCursor.module.css'

const SELECTOR = 'a, button, [role="button"], input, textarea, select, .cursor-hover, [data-cursor]'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 })
  const followerX = useSpring(0, { stiffness: 150, damping: 20 })
  const followerY = useSpring(0, { stiffness: 150, damping: 20 })

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      followerX.set(e.clientX)
      followerY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const handleOver = (e) => {
      if (e.target.closest(SELECTOR)) setIsHovering(true)
    }
    const handleOut = (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest(SELECTOR)) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)
    document.body.addEventListener('mouseover', handleOver)
    document.body.addEventListener('mouseout', handleOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mouseover', handleOver)
      document.body.removeEventListener('mouseout', handleOut)
    }
  }, [cursorX, cursorY, followerX, followerY])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <motion.div
        className={styles.cursor}
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0.5 : 1,
        }}
      />
      <motion.div
        className={styles.follower}
        style={{
          x: followerX,
          y: followerY,
          opacity: isVisible ? 1 : 0,
          width: isHovering ? 64 : 40,
          height: isHovering ? 64 : 40,
        }}
      />
    </>
  )
}
