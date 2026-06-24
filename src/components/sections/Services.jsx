import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import TextReveal from '../common/TextReveal'
import styles from './Services.module.css'

const SERVICES = [
  { key: 'websites', num: '01' },
  { key: 'mobile', num: '02' },
  { key: 'webapps', num: '03' }
]

export default function Services() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="services" className={styles.section} ref={containerRef}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className="label">{t('services.label', 'What we do')}</p>
            <TextReveal as="h2" className="section-title">
              {t('services.title')}
            </TextReveal>
          </div>
          <motion.p
            className={styles.intro}
            style={{ y }}
          >
            {t('services.subtitle')}
          </motion.p>
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
          {SERVICES.map(({ key, num }) => (
            <motion.div
              key={key}
              className={styles.card}
              variants={{
                hidden: { opacity: 0, y: 80 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
              whileHover={{ y: -8 }}
            >
              <span className={styles.number}>{num}</span>
              <h3 className={styles.title}>{t(`services.${key}.title`)}</h3>
              <p className={styles.desc}>{t(`services.${key}.desc`)}</p>
              <ul className={styles.bullets}>
                {t(`services.${key}.bullets`, { returnObjects: true }).map((b, i) => (
                  <li key={i} className={styles.bullet}>{b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
