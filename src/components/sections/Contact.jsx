import { useState, useCallback, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { SOCIAL_LINKS } from '../../utils/constants'
import Button from '../common/Button'
import styles from './Contact.module.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const { theme } = useTheme()
  const [mapKey, setMapKey] = useState(() => `${theme}-map`)
  useEffect(() => {
    setMapKey(`${theme}-map-${Date.now()}`)
  }, [theme])
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const validate = useCallback(() => {
    const e = {}
    if (!form.name.trim()) e.name = t('contact.form.validation.name_required')
    if (!form.email.trim()) e.email = t('contact.form.validation.email_required')
    else if (!EMAIL_RE.test(form.email)) e.email = t('contact.form.validation.email_invalid')
    if (!form.message.trim()) e.message = t('contact.form.validation.message_required')
    return e
  }, [form, t])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSending(true)
    // Simulate send
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
    setForm({ name: '', email: '', phone: '', projectType: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }, [validate])

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="section-subtitle">{t('contact.subtitle')}</p>
      </div>

      <motion.div
        ref={ref}
        className={styles.grid}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={`${styles.field} ${errors.name ? styles.fieldError : ''}`}>
            <label htmlFor="name">{t('contact.form.name')}</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={`${styles.field} ${errors.email ? styles.fieldError : ''}`}>
            <label htmlFor="email">{t('contact.form.email')}</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">{t('contact.form.phone')}</label>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
          </div>

          <div className={styles.field}>
            <label htmlFor="projectType">{t('contact.form.project_type')}</label>
            <select id="projectType" name="projectType" value={form.projectType} onChange={handleChange}>
              <option value="">—</option>
              <option value="website">{t('contact.form.project_types.website')}</option>
              <option value="mobile">{t('contact.form.project_types.mobile')}</option>
              <option value="webapp">{t('contact.form.project_types.webapp')}</option>
              <option value="other">{t('contact.form.project_types.other')}</option>
            </select>
          </div>

          <div className={`${styles.field} ${errors.message ? styles.fieldError : ''}`}>
            <label htmlFor="message">{t('contact.form.message')}</label>
            <textarea id="message" name="message" value={form.message} onChange={handleChange} />
            {errors.message && <span className={styles.error}>{errors.message}</span>}
          </div>

          <Button type="submit" loading={sending}>
            {sending ? t('contact.form.sending') : t('contact.form.submit')}
          </Button>

          {sent && <div className={styles.success}>{t('contact.form.success')}</div>}
        </form>

        <div className={styles.info}>
          <div className={styles.infoCard}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📍</span>
              <div>
                <div className={styles.infoLabel}>Adresa</div>
                <div className={styles.infoText}>{t('contact.info.address')}</div>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>✉️</span>
              <div>
                <div className={styles.infoLabel}>Email</div>
                <div className={styles.infoText}>{t('contact.info.email')}</div>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📞</span>
              <div>
                <div className={styles.infoLabel}>Telefon</div>
                <div className={styles.infoText}>{t('contact.info.phone')}</div>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🕐</span>
              <div>
                <div className={styles.infoLabel}>Radno vreme</div>
                <div className={styles.infoText}>{t('contact.info.hours')}</div>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <a href={SOCIAL_LINKS.linkedin} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
              <a href={SOCIAL_LINKS.github} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub">gh</a>
              <a href={SOCIAL_LINKS.instagram} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
            </div>
          </div>

          <div className={styles.map}>
            <iframe
              key={mapKey}
              title="Kneza Miloša, Beograd mapa"
              width="100%"
              height="320"
              style={{
                border: 0,
                borderRadius: 12,
                filter: theme === 'dark' ? 'invert(90%) hue-rotate(180deg)' : 'none',
                transition: 'filter 0.3s'
              }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?hl=en&q=Kneza%20Milo%C5%A1a%2C%20Beograd&ie=UTF8&t=m&z=15&iwloc=B&output=embed"
            ></iframe>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
