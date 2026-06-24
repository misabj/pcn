import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from '../common/CustomCursor'
import styles from './Layout.module.css'

export default function Layout({ children }) {
  return (
    <>
      <CustomCursor />
      <div className={styles.grain} />
      <div className={styles.ambientGlow} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
