import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { SOCIAL_LINKS } from '../../utils/constants'
import { EMAILJS_CONFIG } from '../../utils/emailjs.config'
import Button from '../common/Button'
import Magnetic from '../common/Magnetic'
import TextReveal from '../common/TextReveal'
import styles from './Contact.module.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sendError, setSendError] = useState(false)

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
    setSendError(false)
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    // Provera da li su EmailJS podaci uneti
    if (
      EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' ||
      EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
      EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
    ) {
      setSending(true)
      await new Promise(r => setTimeout(r, 800))
      setSending(false)
      setSendError(true)
      console.warn('EmailJS nije povezan. Unesi SERVICE_ID, TEMPLATE_ID i PUBLIC_KEY u src/utils/emailjs.config.js')
      return
    }

    setSending(true)
    setSendError(false)

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.SERVICE_ID,
          template_id: EMAILJS_CONFIG.TEMPLATE_ID,
          user_id: EMAILJS_CONFIG.PUBLIC_KEY,
          template_params: {
            from_name: form.name,
            from_email: form.email,
            phone: form.phone || '-',
            project_type: form.projectType || '-',
            message: form.message,
            to_email: EMAILJS_CONFIG.TO_EMAIL
          }
        })
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text)
      }

      setSending(false)
      setSent(true)
      setForm({ name: '', email: '', phone: '', projectType: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    } catch (err) {
      setSending(false)
      setSendError(true)
      console.error('Greška pri slanju poruke:', err)
    }
  }, [validate, form])

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <motion.p
          className="label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('contact.label', 'Get in touch')}
        </motion.p>
        <TextReveal as="h2" className="section-title" delay={0.1}>
          {t('contact.title')}
        </TextReveal>
      </div>

      <motion.div
        ref={ref}
        className={styles.grid}
        initial={{ opacity: 0, y: 60 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {['name', 'email', 'phone'].map((field, i) => (
            <motion.div
              key={field}
              className={`${styles.field} ${errors[field] ? styles.fieldError : ''}`}
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <label htmlFor={field}>{t(`contact.form.${field}`)}</label>
              <input
                id={field}
                name={field}
                type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                value={form[field]}
                onChange={handleChange}
              />
              {errors[field] && <span className={styles.error}>{errors[field]}</span>}
            </motion.div>
          ))}

          <motion.div
            className={styles.field}
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label htmlFor="projectType">{t('contact.form.project_type')}</label>
            <select id="projectType" name="projectType" value={form.projectType} onChange={handleChange}>
              <option value="">—</option>
              <option value="website">{t('contact.form.project_types.website')}</option>
              <option value="mobile">{t('contact.form.project_types.mobile')}</option>
              <option value="webapp">{t('contact.form.project_types.webapp')}</option>
              <option value="other">{t('contact.form.project_types.other')}</option>
            </select>
          </motion.div>

          <motion.div
            className={`${styles.field} ${errors.message ? styles.fieldError : ''}`}
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <label htmlFor="message">{t('contact.form.message')}</label>
            <textarea id="message" name="message" value={form.message} onChange={handleChange} />
            {errors.message && <span className={styles.error}>{errors.message}</span>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Magnetic>
              <Button type="submit" loading={sending}>
                {sending ? t('contact.form.sending') : t('contact.form.submit')}
              </Button>
            </Magnetic>
          </motion.div>

          {sent && (
            <motion.div
              className={styles.success}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {t('contact.form.success')}
            </motion.div>
          )}

          {sendError && (
            <motion.div
              className={styles.sendError}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {t('contact.form.error')}
            </motion.div>
          )}
        </form>

        <motion.div
          className={styles.info}
          initial={{ opacity: 0, x: 30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className={styles.infoCard}>
            {[
              { icon: '📍', label: t('contact.info.address_label', 'Address'), value: t('contact.info.address') },
              { icon: '✉️', label: 'Email', value: t('contact.info.email') },
              { icon: '📞', label: t('contact.info.phone_label', 'Phone'), value: t('contact.info.phone') },
              { icon: '🕐', label: t('contact.info.hours_label', 'Working hours'), value: t('contact.info.hours') }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className={styles.infoItem}
                initial={{ opacity: 0, x: 20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <span className={styles.infoIcon}>{item.icon}</span>
                <div>
                  <div className={styles.infoLabel}>{item.label}</div>
                  <div className={styles.infoText}>{item.value}</div>
                </div>
              </motion.div>
            ))}

            <div className={styles.socialLinks}>
              <Magnetic strength={0.4}>
                <a href={SOCIAL_LINKS.linkedin} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
              </Magnetic>
              <Magnetic strength={0.4}>
                <a href={SOCIAL_LINKS.github} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub">gh</a>
              </Magnetic>
              <Magnetic strength={0.4}>
                <a href={SOCIAL_LINKS.instagram} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
              </Magnetic>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.mapFull}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <iframe
            title="Kneza Miloša, Beograd mapa"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter: 'invert(90%) hue-rotate(180deg)'
            }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?hl=en&q=Kneza%20Milo%C5%A1a%2C%20Beograd&ie=UTF8&t=m&z=15&iwloc=B&output=embed"
          ></iframe>
        </motion.div>
      </motion.div>
    </section>
  )
}
