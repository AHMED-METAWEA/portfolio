import { MotionConfig } from 'framer-motion'
import About from './components/About'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Journey from './components/Journey'
import Navbar from './components/Navbar'
import NeuralBackground from './components/NeuralBackground'
import Projects from './components/Projects'
import Skills from './components/Skills'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>
      <NeuralBackground />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
