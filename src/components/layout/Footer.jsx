import { useTranslation } from 'react-i18next'
import { SOCIAL_LINKS } from '../../utils/constants'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>&lt;PCN /&gt;</div>
            <p className={styles.tagline}>{t('footer.tagline')}</p>
            <div className={styles.social}>
              <a href={SOCIAL_LINKS.linkedin} className={styles.socialLink} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">in</a>
              <a href={SOCIAL_LINKS.github} className={styles.socialLink} aria-label="GitHub" target="_blank" rel="noopener noreferrer">gh</a>
              <a href={SOCIAL_LINKS.instagram} className={styles.socialLink} aria-label="Instagram" target="_blank" rel="noopener noreferrer">ig</a>
            </div>
          </div>

          <div className={styles.column}>
            <h4>{t('footer.services')}</h4>
            <a href="/#services">{t('footer.links.websites')}</a>
            <a href="/#services">{t('footer.links.mobile')}</a>
            <a href="/#services">{t('footer.links.webapps')}</a>
          </div>

          <div className={styles.column}>
            <h4>{t('footer.company')}</h4>
            <a href="/#about">{t('footer.links.about')}</a>
            <a href="/#portfolio">{t('footer.links.portfolio')}</a>
            <a href="/#contact">{t('footer.links.careers')}</a>
          </div>

          <div className={styles.column}>
            <h4>{t('footer.legal')}</h4>
            <a href="#">{t('footer.links.privacy')}</a>
            <a href="#">{t('footer.links.terms')}</a>
            <a href="#">{t('footer.links.cookies')}</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>© {year} PCN. {t('footer.rights')}</p>
          <p className={styles.madeWith}>{t('footer.made_with')}</p>
        </div>
      </div>
    </footer>
  )
}
