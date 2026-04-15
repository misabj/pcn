import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import Card from '../common/Card'
import Button from '../common/Button'
import styles from './Services.module.css'

const SERVICES = [
  { key: 'websites', icon: '</>', color: 'var(--accent-blue)' },
  { key: 'mobile', icon: '📱', color: 'var(--accent-purple)' },
  { key: 'webapps', icon: '⚙️', color: 'var(--accent-green)' }
]

export default function Services() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <h2 className="section-title">{t('services.title')}</h2>
        <p className="section-subtitle">{t('services.subtitle')}</p>
      </div>

      <motion.div
        ref={ref}
        className={styles.grid}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        {SERVICES.map(({ key, icon, color }) => (
          <motion.div
            key={key}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <Card tilt gradient className={styles.card}>
              <div className={styles.icon} style={{ color }}>{icon}</div>
              <h3 className={styles.title}>{t(`services.${key}.title`)}</h3>
              <p className={styles.desc}>{t(`services.${key}.desc`)}</p>
              <div className={styles.bullets}>
                {t(`services.${key}.bullets`, { returnObjects: true }).map((b, i) => (
                  <div key={i} className={styles.bullet}>
                    <span className={styles.bulletDot} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
              <Button variant="ghost" href="/#contact">{t('services.learn_more')} →</Button>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
