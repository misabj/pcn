import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true })
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % items.length)
  }, [items.length])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [paused, next])

  const item = items[current]

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className="section-title">{t('testimonials.title')}</h2>
        <p className="section-subtitle">{t('testimonials.subtitle')}</p>
      </div>

      <div
        className={styles.carousel}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={styles.track}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className={styles.slide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map(n => (
                  <span key={n} className={n <= item.rating ? styles.star : `${styles.star} ${styles.starEmpty}`}>★</span>
                ))}
              </div>
              <p className={styles.text}>{item.text}</p>
              <p className={styles.author}>{item.name}</p>
              <p className={styles.company}>{item.company}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.dots}>
          {items.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
