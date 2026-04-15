import { useState, useMemo, useCallback, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import Badge from '../common/Badge'
import Button from '../common/Button'
import Modal from '../common/Modal'
import styles from './Portfolio.module.css'

const BADGE_COLORS = ['blue', 'green', 'purple', 'orange']

const FILTERS = ['filter_all', 'filter_websites', 'filter_mobile', 'filter_webapps']
const FILTER_MAP = { filter_all: 'all', filter_websites: 'websites', filter_mobile: 'mobile', filter_webapps: 'webapps' }
const ICONS = { websites: '🌐', mobile: '📱', webapps: '⚙️' }

const ProjectCard = memo(function ProjectCard({ project, onClick }) {
  const { t } = useTranslation()
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={styles.card}
      onClick={onClick}
    >
      <div
        className={styles.image}
        style={project.image ? {
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        } : {}}
      >
        <div className={styles.overlay} style={{ background: project.image ? 'rgba(30,30,46,0.55)' : 'transparent' }}>
          <span className={styles.imagePlaceholder}>{ICONS[project.category]}</span>
        </div>
      </div>
      <div className={styles.body}>
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
        <h2 className="section-title">{t('portfolio.title')}</h2>
        <p className="section-subtitle">{t('portfolio.subtitle')}</p>
      </div>

      <div className={styles.filters}>
        {FILTERS.map(f => (
          <button
            key={f}
            className={`${styles.filterBtn} ${filter === FILTER_MAP[f] ? styles.filterActive : ''}`}
            onClick={() => setFilter(FILTER_MAP[f])}
          >
            {t(`portfolio.${f}`)}
          </button>
        ))}
      </div>

      <motion.div
        ref={ref}
        className={styles.grid}
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.name}
      >
        {selectedProject && (
          <>
            <div
              className={styles.modalImage}
              style={selectedProject.image ? {
                backgroundImage: `url(${selectedProject.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
              } : {}}
            >
              <div className={styles.overlay} style={{ background: selectedProject.image ? 'rgba(30,30,46,0.55)' : 'transparent', borderRadius: 8 }}>
                <span className={styles.imagePlaceholder}>{ICONS[selectedProject.category]}</span>
              </div>
            </div>
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
