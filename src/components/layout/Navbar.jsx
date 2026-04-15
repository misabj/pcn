import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { LANGUAGES, NAV_LINKS } from '../../utils/constants'
import styles from './Navbar.module.css'

export default function Navbar({ theme, toggleTheme }) {
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

  const LanguageSwitcher = () => (
    <div className={styles.langSwitcher}>
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          className={`${styles.langBtn} ${i18n.language === code ? styles.langBtnActive : ''}`}
          onClick={() => changeLang(code)}
        >
          {label}
        </button>
      ))}
    </div>
  )

  const ThemeButton = () => (
    <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
      <motion.span
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </motion.span>
    </button>
  )

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <a href="/" className={styles.logo}>
            <span className={styles.bracket}>&lt;</span>
            PCN
            <span className={styles.slash}> /</span>
            <span className={styles.bracket}>&gt;</span>
          </a>

          {/* Jezici i tema levo od hamburgera na mobilnom */}
          <div className={styles.mobileActions}>
            <LanguageSwitcher />
            <ThemeButton />
          </div>

          <div className={styles.links}>
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
          </div>

          {/* Jezici i tema desno na desktopu */}
          <div className={styles.actions}>
            <LanguageSwitcher />
            <ThemeButton />
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
              {/* Dugmad za jezik i temu više nisu u hamburger meniju na mobilnom */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
