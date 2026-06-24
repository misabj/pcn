import styles from './Marquee.module.css'

export default function Marquee({ items, speed = 30, direction = 'left' }) {
  const content = items.join(' ✦ ')

  return (
    <div className={styles.marquee} style={{ '--duration': `${speed}s`, '--direction': direction === 'left' ? 'normal' : 'reverse' }}>
      <div className={styles.track}>
        <span className={styles.content}>{content} ✦ </span>
        <span className={styles.content}>{content} ✦ </span>
        <span className={styles.content}>{content} ✦ </span>
        <span className={styles.content}>{content} ✦ </span>
      </div>
    </div>
  )
}
