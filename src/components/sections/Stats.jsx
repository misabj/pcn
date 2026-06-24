import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation, useCountUp } from '../../hooks/useScrollAnimation'
import { STATS } from '../../utils/constants'
import styles from './Stats.module.css'

function StatItem({ value, suffix, labelKey, startCounting, index }) {
  const { t } = useTranslation()
  const { count, start } = useCountUp(value, 2000, true)

  useEffect(() => {
    if (startCounting) start()
  }, [startCounting, start])

  return (
    <motion.div
      className={styles.stat}
      initial={{ opacity: 0, y: 40 }}
      animate={startCounting ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.value}>{count}{suffix}</div>
      <div className={styles.label}>{t(`stats.${labelKey}`)}</div>
    </motion.div>
  )
}

export default function Stats() {
  const { ref, isVisible } = useScrollAnimation(0.3)

  return (
    <section className={styles.section}>
      <motion.div
        ref={ref}
        className={styles.grid}
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {STATS.map((stat, i) => (
          <StatItem
            key={stat.key}
            value={stat.value}
            suffix={stat.suffix}
            labelKey={stat.key}
            startCounting={isVisible}
            index={i}
          />
        ))}
      </motion.div>
    </section>
  )
}
