import { useTranslation } from 'react-i18next'
import Marquee from '../common/Marquee'

export default function MarqueeBand() {
  const { t } = useTranslation()
  const items = t('marquee.items', { returnObjects: true }) || []

  return (
    <section style={{ padding: 0 }}>
      <Marquee items={Array.isArray(items) ? items : []} speed={45} />
    </section>
  )
}
