import { useEffect, useRef, useState } from 'react'

function useVisible(threshold = 0.2) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

export default function Contact({ t }) {
  const [ref, visible] = useVisible()
  const [copied, setCopied] = useState(false)

  const email = 'fjumanazarova64@gmail.com'

  const handleEmailCopy = () => {
    navigator.clipboard.writeText(email).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const contacts = [
    {
      label: t.telegram,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
        </svg>
      ),
      href: 'https://t.me/l9farangiz',
      handle: '@l9farangiz',
      color: 'from-blue-500 to-blue-600',
      glow: 'shadow-blue-500/30',
      hoverBorder: 'hover:border-blue-500/50',
    },
    {
      label: t.github,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      href: 'https://github.com/fjumanazarova64-cmd',
      handle: 'fjumanazarova64-cmd',
      color: 'from-gray-700 to-gray-800',
      glow: 'shadow-gray-500/30',
      hoverBorder: 'hover:border-gray-400/50',
    },
    {
      label: t.email,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: `mailto:${email}`,
      handle: email,
      color: 'from-purple-600 to-purple-700',
      glow: 'shadow-purple-500/30',
      hoverBorder: 'hover:border-purple-500/50',
      onClick: handleEmailCopy,
    },
  ]

  return (
    <section id="contact" className="relative py-24 px-4 bg-gradient-to-b from-transparent via-[#0A0C1A]/50 to-transparent">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-mono text-purple-500 text-sm tracking-widest uppercase mb-3">{t.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-gradient">{t.title}</span>
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-neon rounded-full mx-auto" />
          <p className="mt-6 text-gray-400 text-lg max-w-xl mx-auto">{t.description}</p>
        </div>

        {/* Contact cards */}
        <div className={`grid md:grid-cols-3 gap-6 mb-16 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {contacts.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass rounded-2xl p-6 border border-purple-500/10 ${c.hoverBorder} hover:shadow-xl ${c.glow} transition-all duration-300 group flex flex-col items-center gap-4 text-center hover:-translate-y-2`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {c.icon}
              </div>
              <div>
                <div className="font-semibold text-white mb-1">{c.label}</div>
                <div className="text-gray-500 text-xs font-mono">{c.handle}</div>
              </div>
              <div className="text-xs text-gray-600 group-hover:text-purple-400 transition-colors">
                {c.label === t.email ? (copied ? '✓ Copied!' : 'Click to copy') : 'Open ↗'}
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className={`text-center transition-all duration-700 delay-400 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 font-mono">
            <span>{t.footer}</span>
            <span className="flex items-center gap-1">
              Made with <span className="text-red-400 mx-1">♥</span> by{' '}
              <span className="text-gradient font-bold ml-1">Farangiz</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
