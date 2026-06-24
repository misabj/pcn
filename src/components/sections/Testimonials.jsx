import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import TextReveal from '../common/TextReveal'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true })
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const { ref, isVisible } = useScrollAnimation()

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % items.length)
  }, [items.length])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [paused, next])

  const item = items[current]

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.p
          className="label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('testimonials.label', 'Testimonials')}
        </motion.p>
        <TextReveal as="h2" className="section-title" delay={0.1}>
          {t('testimonials.title')}
        </TextReveal>
      </div>

      <motion.div
        ref={ref}
        className={styles.carousel}
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={styles.track}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className={styles.slide}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className={styles.text}>{item.text}</p>
              <div className={styles.meta}>
                <div className={styles.authorInfo}>
                  <p className={styles.author}>{item.name}</p>
                  <p className={styles.company}>{item.company}</p>
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
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
