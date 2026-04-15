import { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Button from '../common/Button'
import styles from './Hero.module.css'

const CODE_LINES = [
  { num: 1, tokens: [{ type: 'keyword', text: 'const ' }, { type: 'variable', text: 'agency' }, { type: 'bracket', text: ' = ' }, { type: 'bracket', text: '{' }] },
  { num: 2, tokens: [{ type: 'bracket', text: '  ' }, { type: 'constant', text: 'name' }, { type: 'bracket', text: ': ' }, { type: 'str', text: '"PCN"' }, { type: 'bracket', text: ',' }] },
  { num: 3, tokens: [{ type: 'bracket', text: '  ' }, { type: 'constant', text: 'meaning' }, { type: 'bracket', text: ': ' }, { type: 'str', text: '"Pixel | Code | Network"' }, { type: 'bracket', text: ',' }] },
  { num: 4, tokens: [{ type: 'bracket', text: '  ' }, { type: 'constant', text: 'location' }, { type: 'bracket', text: ': ' }, { type: 'str', text: '"Belgrade, Serbia"' }, { type: 'bracket', text: ',' }] },
  { num: 5, tokens: [{ type: 'bracket', text: '  ' }, { type: 'func', text: 'build' }, { type: 'bracket', text: ': (' }, { type: 'variable', text: 'ideas' }, { type: 'bracket', text: ') => ' }, { type: 'bracket', text: '{' }] },
  { num: 6, tokens: [{ type: 'bracket', text: '    ' }, { type: 'keyword', text: 'return ' }, { type: 'variable', text: 'ideas' }, { type: 'bracket', text: '.' }, { type: 'func', text: 'map' }, { type: 'bracket', text: '(' }, { type: 'variable', text: 'idea' }, { type: 'bracket', text: ' => ' }] },
  { num: 7, tokens: [{ type: 'bracket', text: '      ' }, { type: 'func', text: 'transform' }, { type: 'bracket', text: '(' }, { type: 'variable', text: 'idea' }, { type: 'bracket', text: ', ' }, { type: 'str', text: '"digital"' }, { type: 'bracket', text: ')' }] },
  { num: 8, tokens: [{ type: 'bracket', text: '    )' }] },
  { num: 9, tokens: [{ type: 'bracket', text: '  }' }] },
  { num: 10, tokens: [{ type: 'bracket', text: '};' }] },
  { num: 11, tokens: [] },
  { num: 12, tokens: [{ type: 'comment', text: '// Ready to start your project? 🚀' }] }
]

const PARTICLES = [
  '{ }', '< />', '( )', '[ ]', '=>', '&&', '||',
  'div', 'src', 'fn', '0x', '++', '##', '/**/'
]

export default function Hero() {
  const { t } = useTranslation()
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (visibleLines < CODE_LINES.length) {
      const timer = setTimeout(() => setVisibleLines(v => v + 1), 200)
      return () => clearTimeout(timer)
    }
  }, [visibleLines])

  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      text: PARTICLES[i % PARTICLES.length],
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${8 + Math.random() * 12}s`,
        animation: `float ${8 + Math.random() * 12}s ease-in-out infinite`,
        fontSize: `${0.6 + Math.random() * 0.6}rem`
      }
    })), []
  )

  return (
    <section className={styles.hero}>
      <div className={styles.videoBg}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster=""
        >
          <source
            src="/hero-video.mp4"
            type="video/mp4"
          />
        </video>
        <div className={styles.videoOverlay} />
      </div>

      <div className={styles.particles}>
        {particles.map(p => (
          <span key={p.id} className={styles.particle} style={p.style}>{p.text}</span>
        ))}
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.subtitle')}</p>
          <div className={styles.ctas}>
            <Button href="/#portfolio">{t('hero.cta_portfolio')}</Button>
            <Button variant="outline" href="/#contact">{t('hero.cta_contact')}</Button>
          </div>
        </motion.div>

        <motion.div
          className={styles.editor}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <div className={styles.editorHeader}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
            <span className={styles.editorTab}>pcn.config.js</span>
          </div>
          <div className={styles.editorBody}>
            {CODE_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={line.num} className={styles.line}>
                <span className={styles.lineNum}>{line.num}</span>
                <span>
                  {line.tokens.map((token, j) => (
                    <span key={j} className={styles[token.type]}>{token.text}</span>
                  ))}
                  {i === visibleLines - 1 && <span className={styles.cursor} />}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className={styles.scroll}>
        <div className={styles.scrollIcon}>
          <div className={styles.scrollDot} />
        </div>
        <span>{t('hero.scroll_down')}</span>
      </div>
    </section>
  )
}
