import { useState, useMemo, useCallback, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import Badge from '../common/Badge'
import Modal from '../common/Modal'
import Magnetic from '../common/Magnetic'
import TextReveal from '../common/TextReveal'
import { getProjectBackground } from '../../utils/gradients'
import styles from './Portfolio.module.css'

const BADGE_COLORS = ['blue', 'green', 'purple', 'orange']

const FILTERS = ['filter_all', 'filter_websites', 'filter_mobile', 'filter_webapps']
const FILTER_MAP = { filter_all: 'all', filter_websites: 'websites', filter_mobile: 'mobile', filter_webapps: 'webapps' }
const ICONS = { websites: '🌐', mobile: '📱', webapps: '⚙️' }
const YEAR = new Date().getFullYear()

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

const ProjectCard = memo(function ProjectCard({ project, index, onClick }) {
  const { t } = useTranslation()
  const bgStyle = getProjectBackground(project, index)

  return (
    <motion.div
      layout
      variants={cardVariants}
      exit={{ opacity: 0, y: 60 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={styles.card}
      onClick={onClick}
    >
      <div
        className={`${styles.image} ${project.image ? styles.hasImage : ''}`}
        style={project.image ? undefined : bgStyle}
      >
        {project.image && (
          <img
            className={styles.projectImg}
            src={project.image}
            alt={project.name}
            width="900"
            height="675"
            loading={index < 4 ? 'eager' : 'lazy'}
            decoding="async"
          />
        )}
        <span className={styles.blob} />
        {!project.image && (
          <span className={styles.imagePlaceholder}>{ICONS[project.category]}</span>
        )}
        <div className={styles.overlay}>
          <span className={styles.viewProject}>{t('portfolio.view_project', 'View Project')}</span>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{t(`portfolio.${project.category}`)}</span>
          <span className={styles.year}>{YEAR}</span>
        </div>
        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.desc}>{project.desc}</p>
        <div className={styles.tags}>
          {project.tech.map((tech, i) => (
            <Badge key={tech} color={BADGE_COLORS[i % BADGE_COLORS.length]}>{tech}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  )
})

export default function Portfolio() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const { ref, isVisible } = useScrollAnimation()

  const projects = t('portfolio.projects', { returnObjects: true })

  const filtered = useMemo(() => {
    if (filter === 'all') return projects
    return projects.filter(p => p.category === filter)
  }, [filter, projects])

  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project)
  }, [])

  return (
    <section id="portfolio" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className="label">{t('portfolio.label', 'Selected work')}</p>
            <TextReveal as="h2" className="section-title">
              {t('portfolio.title')}
            </TextReveal>
          </div>
          <p className={styles.intro}>{t('portfolio.subtitle')}</p>
        </div>

        <div className={styles.filters}>
          {FILTERS.map(f => (
            <Magnetic key={f} strength={0.15}>
              <button
                className={`${styles.filterBtn} ${filter === FILTER_MAP[f] ? styles.filterActive : ''}`}
                onClick={() => setFilter(FILTER_MAP[f])}
              >
                {t(`portfolio.${f}`)}
              </button>
            </Magnetic>
          ))}
        </div>

        <motion.div
          ref={ref}
          className={styles.grid}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={i}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.name}
      >
        {selectedProject && (
          <>
            {selectedProject.image ? (
              <div
                className={styles.modalImage}
                style={{
                  backgroundImage: `url(${selectedProject.image})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: 'var(--bg-primary)',
                }}
              />
            ) : (
              <div
                className={styles.modalImage}
                style={{ background: getProjectBackground(selectedProject, 0).background }}
              >
                <span className={styles.imagePlaceholder}>{ICONS[selectedProject.category]}</span>
              </div>
            )}
            <p className={styles.modalDesc}>{selectedProject.desc}</p>
            <p className={styles.modalTechLabel}>{t('portfolio.technologies')}:</p>
            <div className={styles.modalTags}>
              {selectedProject.tech.map((tech, i) => (
                <Badge key={tech} color={BADGE_COLORS[i % BADGE_COLORS.length]}>{tech}</Badge>
              ))}
            </div>
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.livePreviewBtn}
              >
                {t('portfolio.view_project', 'Live Preview')}
              </a>
            </div>
          </>
        )}
      </Modal>
    </section>
  )
}
