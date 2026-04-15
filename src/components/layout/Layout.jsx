import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, theme, toggleTheme }) {
  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main style={{ paddingTop: '70px' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}
