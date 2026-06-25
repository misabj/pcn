import { useState, useEffect, useMemo, useCallback, memo } from 'react'
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile
}

const ProjectCard = memo(function ProjectCard({ project, index, onClick, isMobile }) {
  const { t } = useTranslation()
  const bgStyle = getProjectBackground(project, index)

  const image = project.image && (
    <img
      className={styles.projectImg}
      src={project.image}
      alt={project.name}
      width="900"
      height="675"
      loading="lazy"
      decoding="async"
    />
  )

  const cardContent = (
    <>
      <div
        className={`${styles.image} ${project.image ? styles.hasImage : ''}`}
        style={project.image ? undefined : bgStyle}
      >
        {image}
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
    </>
  )

  if (isMobile) {
    return (
      <div className={styles.card} onClick={onClick}>
        {cardContent}
      </div>
    )
  }

  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={styles.card}
      onClick={onClick}
    >
      {cardContent}
    </motion.div>
  )
})

export default function Portfolio() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const { ref, isVisible } = useScrollAnimation()
  const isMobile = useIsMobile()

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

        {isMobile ? (
          <div ref={ref} className={styles.grid}>
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={i}
                onClick={() => handleProjectClick(project)}
                isMobile={true}
              />
            ))}
          </div>
        ) : (
          <motion.div
            ref={ref}
            className={styles.grid}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } }
            }}
          >
            <AnimatePresence mode="wait">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  index={i}
                  onClick={() => handleProjectClick(project)}
                  isMobile={false}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
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
