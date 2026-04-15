import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import styles from './Process.module.css'

export default function Process() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation(0.2)
  const steps = t('process.steps', { returnObjects: true })

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className="section-title">{t('process.title')}</h2>
        <p className="section-subtitle">{t('process.subtitle')}</p>
      </div>

      <div className={styles.timeline} ref={ref}>
        <div className={styles.line} />
        <div
          className={styles.progress}
          style={{ height: isVisible ? '100%' : '0%' }}
        />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            className={styles.step}
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <div className={`${styles.number} ${isVisible ? styles.numberActive : ''}`}>
              {i + 1}
            </div>
            <div className={styles.content}>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
