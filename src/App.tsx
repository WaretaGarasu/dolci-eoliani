import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Contact } from './components/Contact'
import { Faq } from './components/Faq'
import { Hero } from './components/Hero'
import { HomeJsonLd } from './components/JsonLd'
import { Ordering } from './components/Ordering'
import { Products } from './components/Products'
import { SiteLayout } from './components/SiteLayout'
import { Tradition } from './components/Tradition'
import { PRIVACY_PATH } from './data/site'
import { useActiveSection } from './hooks/useActiveSection'
import { useSeo } from './hooks/useSeo'
import { scrollToSection } from './utils/scroll'

export default function App() {
  const activeSection = useActiveSection()
  const location = useLocation()
  const navigate = useNavigate()

  useSeo('home')

  useEffect(() => {
    if (location.hash === '#privacy') {
      navigate(PRIVACY_PATH, { replace: true })
      return
    }
    if (location.hash) {
      scrollToSection(location.hash)
    }
  }, [location.hash, navigate])

  return (
    <SiteLayout activeSection={activeSection}>
      <HomeJsonLd />
      <main id="main-content">
        <Hero />
        <Products />
        <Tradition />
        <Ordering />
        <Faq />
        <Contact />
      </main>
    </SiteLayout>
  )
}
