import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { TECH_STACK } from '../../utils/constants'
import TextReveal from '../common/TextReveal'
import styles from './About.module.css'

const AVATARS = ['👨‍💻', '👩‍🎨', '📱']

export default function About() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const containerRef = useRef(null)
  const team = t('about.team', { returnObjects: true })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section id="about" className={styles.section} ref={containerRef}>
      <motion.div className={styles.statement} style={{ y }}>
        <TextReveal as="p" delay={0}>
          {t('about.statement', 'PCN is an independent digital studio crafting meaningful brand experiences through strategy, design, and technology.')}
        </TextReveal>
        <p className={styles.statement2}>
          {t('about.statement2', 'We design for longevity — clarity first, craft always, built to scale.')}
        </p>
      </motion.div>

      <motion.div
        ref={ref}
        className={styles.teamGrid}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        {team.map((member, i) => (
          <motion.div
            key={i}
            className={styles.member}
            variants={{
              hidden: { opacity: 0, y: 60, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
            }}
            whileHover={{ y: -8 }}
          >
            <motion.div
              className={styles.avatar}
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              {AVATARS[i]}
            </motion.div>
            <h3 className={styles.memberName}>{member.name}</h3>
            <p className={styles.memberRole}>{member.role}</p>
            <p className={styles.memberBio}>{member.bio}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.techSection}>
        <motion.h3
          className={styles.techTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('about.tech_title', 'Tech Stack')}
        </motion.h3>
        <div className={styles.techGrid}>
          {TECH_STACK.map((tech, i) => (
            <motion.span
              key={tech}
              className={styles.techBadge}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.1, y: -4 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
