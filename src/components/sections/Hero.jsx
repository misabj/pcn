import { useRef, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '../common/Button'
import Magnetic from '../common/Magnetic'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  const titleWords = t('hero.title').split(' ')

  return (
    <section ref={containerRef} className={styles.hero}>
      <motion.div className={styles.photoBg} style={{ y, opacity }}>
        <img src="/hero-gold-bg.webp" alt="" aria-hidden="true" />
      </motion.div>
      <motion.div className={styles.heroSheen} style={{ opacity }} />
      <motion.div className={styles.bgPattern} style={{ y, opacity }} />

      <motion.div
        className={styles.container}
        style={{ opacity, scale }}
      >
        <div className={styles.content}>
          <motion.p
            className={styles.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('hero.label', 'Digital Agency')}
          </motion.p>

          <h1>
            {titleWords.map((word, i) => (
              <Fragment key={i}>
                <span className={styles.wordWrapper}>
                  <motion.span
                    className={styles.word}
                    initial={{ y: '100%', rotateX: -90 }}
                    animate={{ y: 0, rotateX: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.4 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
                {i < titleWords.length - 1 && ' '}
              </Fragment>
            ))}
          </h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Magnetic>
              <Button href="/#portfolio">{t('hero.cta_portfolio')}</Button>
            </Magnetic>
            <Magnetic>
              <Button variant="outline" href="/#contact">{t('hero.cta_contact')}</Button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <div className={styles.scrollLine}>
          <span />
        </div>
      </motion.div>
    </section>
  )
}
