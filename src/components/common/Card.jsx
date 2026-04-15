import { useState, useCallback, memo } from 'react'
import styles from './Card.module.css'

const Card = memo(function Card({ children, gradient, tilt, className = '' }) {
  const [transform, setTransform] = useState('')

  const handleMouseMove = useCallback((e) => {
    if (!tilt) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTransform(`perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`)
  }, [tilt])

  const handleMouseLeave = useCallback(() => {
    if (!tilt) return
    setTransform('')
  }, [tilt])

  const cls = `${styles.card} ${gradient ? styles.gradient : ''} ${tilt ? styles.tilt : ''} ${className}`

  return (
    <div
      className={cls}
      style={transform ? { transform } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
})

export default Card
