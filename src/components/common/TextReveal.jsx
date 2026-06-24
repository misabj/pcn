import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import styles from './TextReveal.module.css'

export default function TextReveal({ children, as: Component = 'span', className = '', delay = 0 }) {
  const { ref, isVisible } = useScrollAnimation(0.3)

  return (
    <Component ref={ref} className={`${styles.wrapper} ${className}`}>
      <motion.span
        className={styles.inner}
        initial={{ y: '100%' }}
        animate={isVisible ? { y: 0 } : { y: '100%' }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </Component>
  )
}
