import { useState, useEffect } from 'react'

export default function Navbar({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'about', label: t.about },
    { id: 'skills', label: t.skills },
    { id: 'projects', label: t.projects },
    { id: 'education', label: t.education },
    { id: 'goals', label: t.goals },
    { id: 'contact', label: t.contact },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPos = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPos) {
          setActive(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lang])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080A12]/90 backdrop-blur-xl border-b border-purple-500/10 shadow-lg shadow-purple-500/5'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="font-mono text-lg font-bold cursor-pointer select-none"
              onClick={() => scrollTo('home')}
            >
              <span className="text-gradient">FARANGIZ</span>
              <span className="text-gray-400">.dev</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`nav-link text-sm font-medium transition-colors duration-200 ${
                    active === item.id
                      ? 'text-gradient active'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* GitHub icon */}
              <a
                href="https://github.com/fjumanazarova64-cmd"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg glass border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/50 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Telegram icon */}
              <a
                href="https://t.me/l9farangiz"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg glass border border-blue-500/20 text-gray-400 hover:text-white hover:border-blue-500/50 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
                </svg>
              </a>
              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'uz' ? 'en' : 'uz')}
                className="relative flex items-center bg-[#171329] border border-purple-500/20 rounded-full p-1 cursor-pointer hover:border-purple-500/50 transition-all duration-300"
              >
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all duration-300 ${
                  lang === 'uz'
                    ? 'bg-gradient-neon text-white shadow-lg'
                    : 'text-gray-500 hover:text-gray-300'
                }`}>UZ</span>
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all duration-300 ${
                  lang === 'en'
                    ? 'bg-gradient-neon text-white shadow-lg'
                    : 'text-gray-500 hover:text-gray-300'
                }`}>EN</span>
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-purple-500/10 transition-colors"
              >
                <div className={`w-5 h-0.5 bg-purple-400 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <div className={`w-5 h-0.5 bg-purple-400 mt-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-5 h-0.5 bg-purple-400 mt-1 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-72 bg-[#0D0A1A] border-l border-purple-500/20 p-6 pt-20 mobile-menu ${menuOpen ? 'open' : ''}`}>
          <div className="flex flex-col gap-4">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  active === item.id
                    ? 'bg-purple-500/20 text-gradient border border-purple-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="text-purple-500 font-mono text-sm mr-2">0{i + 1}.</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
