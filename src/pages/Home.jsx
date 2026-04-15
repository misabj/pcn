import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Hero from '../components/sections/Hero'

const Services = lazy(() => import('../components/sections/Services'))
const Stats = lazy(() => import('../components/sections/Stats'))
const Portfolio = lazy(() => import('../components/sections/Portfolio'))
const Process = lazy(() => import('../components/sections/Process'))
const About = lazy(() => import('../components/sections/About'))
const Testimonials = lazy(() => import('../components/sections/Testimonials'))
const CtaBanner = lazy(() => import('../components/sections/CtaBanner'))
const Contact = lazy(() => import('../components/sections/Contact'))

const Loading = () => (
  <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
    <div style={{
      width: 32, height: 32, margin: '0 auto',
      border: '3px solid var(--border)',
      borderTopColor: 'var(--accent-blue)',
      borderRadius: '50%',
      animation: 'spin 0.6s linear infinite'
    }} />
  </div>
)

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>PCN — Pixel | Code | Network | Web Agencija Beograd</title>
        <meta name="description" content={t('hero.subtitle')} />
        <meta property="og:title" content="PCN — Web Agencija Beograd" />
        <meta property="og:description" content={t('hero.subtitle')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pcn.rs" />
        <link rel="canonical" href="https://pcn.rs" />
      </Helmet>

      <Hero />
      <Suspense fallback={<Loading />}><Services /></Suspense>
      <Suspense fallback={<Loading />}><Stats /></Suspense>
      <Suspense fallback={<Loading />}><Portfolio /></Suspense>
      <Suspense fallback={<Loading />}><Process /></Suspense>
      <Suspense fallback={<Loading />}><About /></Suspense>
      <Suspense fallback={<Loading />}><Testimonials /></Suspense>
      <Suspense fallback={<Loading />}><CtaBanner /></Suspense>
      <Suspense fallback={<Loading />}><Contact /></Suspense>
    </>
  )
}
