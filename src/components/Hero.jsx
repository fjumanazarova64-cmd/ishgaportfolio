import { useState, useEffect, useRef } from 'react'

const ROLES = ['Frontend Developer', 'Creative Thinker', 'Lifelong Learner']

export default function Hero({ t }) {
  const [displayText, setDisplayText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const currentRole = t.roles[roleIndex % t.roles.length]
    let timeout

    if (!isDeleting) {
      if (charIndex < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, charIndex + 1))
          setCharIndex(c => c + 1)
        }, 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, charIndex - 1))
          setCharIndex(c => c - 1)
        }, 40)
      } else {
        setIsDeleting(false)
        setRoleIndex(r => r + 1)
      }
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, roleIndex, t.roles])

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(c => !c), 530)
    return () => clearInterval(interval)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const tech = ['HTML', 'CSS', 'JavaScript', 'React']

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Available badge */}
      <div className="mb-8 flex items-center gap-2 glass px-4 py-2 rounded-full border border-green-500/30">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-green-400 text-sm font-mono">{t.available}</span>
      </div>

      {/* Main text */}
      <div className="text-center max-w-4xl mx-auto relative z-10">
        <p className="text-gray-400 font-mono text-lg mb-2 tracking-widest uppercase">
          {t.greeting}
        </p>

        <h1 className="hero-title text-6xl sm:text-7xl md:text-8xl font-black mb-4 leading-tight">
          <span className="text-white">{t.name.replace('.', '')}</span>
          <span className="text-gradient">.</span>
        </h1>

        {/* Typing animation */}
        <div className="flex items-center justify-center gap-2 mb-8 h-10">
          <span className="text-purple-400 font-mono text-lg">&lt;</span>
          <span className="text-blue-300 font-mono text-xl font-semibold min-w-[280px] text-left sm:text-center">
            {displayText}
            <span
              className="inline-block w-0.5 h-6 bg-purple-400 ml-0.5 align-middle"
              style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
            />
          </span>
          <span className="text-purple-400 font-mono text-lg">/&gt;</span>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-3 leading-relaxed">
          {t.description}
        </p>
        <p className="text-gray-500 text-base max-w-xl mx-auto mb-10 leading-relaxed">
          {t.sub}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tech.map((item, i) => (
            <span
              key={item}
              className="px-4 py-2 glass rounded-full font-mono text-sm font-medium border border-purple-500/20 text-purple-300 hover:border-purple-500/60 hover:text-purple-200 transition-all duration-300 cursor-default"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {item}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('projects')}
            className="btn-primary font-inter flex items-center gap-2 group"
          >
            {t.cta1}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="btn-outline font-inter flex items-center gap-2"
          >
            {t.cta2}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-pulse" />
        <span className="text-gray-500 text-xs font-mono tracking-widest uppercase">scroll</span>
      </div>

      {/* Floating code decorations */}
      <div className="absolute top-20 left-4 md:left-10 text-purple-500/20 font-mono text-xs md:text-sm pointer-events-none select-none hidden sm:block">
        <div>const farangiz = {'{'}</div>
        <div className="ml-4">role: <span className="text-blue-500/40">"Frontend Dev"</span>,</div>
        <div className="ml-4">passion: <span className="text-green-500/40">"Coding"</span>,</div>
        <div>{'}'}</div>
      </div>
      <div className="absolute bottom-20 right-4 md:right-10 text-blue-500/20 font-mono text-xs md:text-sm pointer-events-none select-none hidden sm:block text-right">
        <div>{'<Portfolio'}</div>
        <div className="ml-4">author=<span className="text-purple-500/40">"Farangiz"</span></div>
        <div className="ml-4">year=<span className="text-green-500/40">"2026"</span></div>
        <div>{'/>'}</div>
      </div>
    </section>
  )
}
