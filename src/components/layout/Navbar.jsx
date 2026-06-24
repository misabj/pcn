import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { LANGUAGES, NAV_LINKS } from '../../utils/constants'
import Magnetic from '../common/Magnetic'
import styles from './Navbar.module.css'

function LanguageSwitcher({ currentLang, onChange }) {
  return (
    <div className={styles.langSwitcher}>
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          className={`${styles.langBtn} ${currentLang === code ? styles.langBtnActive : ''}`}
          onClick={() => onChange(code)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const changeLang = useCallback((code) => {
    i18n.changeLanguage(code)
  }, [i18n])

  const handleNavClick = useCallback((e, path) => {
    if (path.startsWith('/#')) {
      e.preventDefault()
      const id = path.slice(2)
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      setDrawerOpen(false)
    }
  }, [])

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <a href="/" className={styles.logo}>
            <span className={styles.bracket}>&lt;</span>
            PCN
            <span className={styles.slash}> /</span>
            <span className={styles.gt}>&gt;</span>
          </a>

          <div className={styles.mobileActions}>
            <LanguageSwitcher currentLang={i18n.language} onChange={changeLang} />
          </div>

          <div className={styles.links}>
            {NAV_LINKS.map(({ key, path }) => (
              <Magnetic key={key} strength={0.2}>
                <a
                  href={path}
                  className={styles.link}
                  onClick={(e) => handleNavClick(e, path)}
                >
                  {t(`nav.${key}`)}
                </a>
              </Magnetic>
            ))}
          </div>

          <div className={styles.actions}>
            <LanguageSwitcher currentLang={i18n.language} onChange={changeLang} />
          </div>

          <button
            className={`${styles.hamburger} ${drawerOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className={styles.drawerOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className={styles.drawer}
              initial={{ x: 280 }}
              animate={{ x: 0 }}
              exit={{ x: 280 }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              {NAV_LINKS.map(({ key, path }) => (
                <a
                  key={key}
                  href={path}
                  className={styles.link}
                  onClick={(e) => handleNavClick(e, path)}
                >
                  {t(`nav.${key}`)}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
