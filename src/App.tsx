import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import Services from './components/Services'
import SelectedWork from './components/SelectedWork'
import Process from './components/Process'
import DNA from './components/DNA'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TechMarquee />
      <Services />
      <SelectedWork />
      <Process />
      <DNA />
      <Contact />
      <Footer />
    </main>
  )
}
