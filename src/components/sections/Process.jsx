import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import TextReveal from '../common/TextReveal'
import styles from './Process.module.css'

export default function Process() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation(0.2)
  const containerRef = useRef(null)
  const steps = t('process.steps', { returnObjects: true })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section id="process" className={styles.section} ref={containerRef}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className="label">{t('process.label', 'How we work')}</p>
            <TextReveal as="h2" className="section-title">
              {t('process.title')}
            </TextReveal>
          </div>
          <p className={styles.intro}>{t('process.subtitle')}</p>
        </div>

        <div className={styles.steps} ref={ref}>
          <div className={styles.line}>
            <motion.div className={styles.progress} style={{ height: lineHeight }} />
          </div>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className={styles.step}
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
              <div className={styles.content}>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
