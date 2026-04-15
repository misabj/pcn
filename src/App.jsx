import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useTheme } from './hooks/useTheme'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import './styles/global.css'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout theme={theme} toggleTheme={toggleTheme}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  )
}
