import styles from './Button.module.css'

export default function Button({ children, variant = 'primary', onClick, href, loading, className = '', ...props }) {
  const cls = `${styles.btn} ${styles[variant]} ${loading ? styles.loading : ''} ${className}`

  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={cls} onClick={onClick} disabled={loading} {...props}>
      {loading && <span className={styles.spinner} />}
      {children}
    </button>
  )
}
