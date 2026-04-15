import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { TECH_STACK } from '../../utils/constants'
import Card from '../common/Card'
import styles from './About.module.css'

const AVATARS = ['👨‍💻', '👩‍🎨', '📱']

export default function About() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const team = t('about.team', { returnObjects: true })

  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <h2 className="section-title">{t('about.title')}</h2>
        <p className="section-subtitle">{t('about.subtitle')}</p>
      </div>

      <p className={styles.story}>{t('about.story')}</p>

      <motion.div
        ref={ref}
        className={styles.team}
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
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <Card gradient className={styles.member}>
              <div className={styles.avatar}>{AVATARS[i]}</div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
              <p className={styles.memberBio}>{member.bio}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.techSection}>
        <h3 className={styles.techTitle}>Tech Stack</h3>
        <div className={styles.techGrid}>
          {TECH_STACK.map((tech) => (
            <motion.span
              key={tech}
              className={styles.techBadge}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
