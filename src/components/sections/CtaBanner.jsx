import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import Button from '../common/Button'
import styles from './CtaBanner.module.css'

export default function CtaBanner() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className={styles.section}>
      <div className={`${styles.blob} ${styles.blobLeft}`} />
      <div className={`${styles.blob} ${styles.blobRight}`} />

      <motion.div
        ref={ref}
        className={styles.inner}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.title}>{t('cta.title')}</h2>
        <p className={styles.subtitle}>{t('cta.subtitle')}</p>
        <Button href="/#contact">{t('cta.button')}</Button>
      </motion.div>
    </section>
  )
}
