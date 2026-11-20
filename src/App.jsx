import { useState } from 'react'
import { content } from './data/content'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Goals from './components/Goals'
import Contact from './components/Contact'

export default function App() {
  const [lang, setLang] = useState('uz')
  const t = content[lang]

  return (
    <div className="relative min-h-screen bg-[#080A12] overflow-x-hidden">
      {/* Animated background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Particle canvas */}
      <ParticleBackground />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(137, 87, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(137, 87, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Navbar lang={lang} setLang={setLang} t={t.nav} />

        <main>
          <Hero t={t.hero} />
          <About t={t.about} />
          <Skills t={t.skills} />
          <Projects t={t.projects} />
          <Education t={t.education} />
          <Goals t={t.goals} />
          <Contact t={t.contact} />
        </main>
      </div>
    </div>
  )
}
