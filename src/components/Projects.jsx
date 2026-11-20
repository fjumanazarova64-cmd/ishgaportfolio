import { useEffect, useRef, useState } from 'react'

function useVisible(threshold = 0.1) {
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

const colorMap = {
  purple: {
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    accent: 'text-purple-400',
    iconBg: 'bg-purple-500/10',
  },
  blue: {
    badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    accent: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
  },
  mixed: {
    badge: 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-200 border-purple-500/30',
    accent: 'text-gradient',
    iconBg: 'bg-gradient-to-br from-purple-500/10 to-blue-500/10',
  },
}

export default function Projects({ t }) {
  const [ref, visible] = useVisible()

  return (
    <section id="projects" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-mono text-purple-500 text-sm tracking-widest uppercase mb-3">{t.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-gradient">{t.title}</span>
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-neon rounded-full mx-auto" />
        </div>

        {/* Projects grid — 3 columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((project, i) => {
            const c = colorMap[project.color] || colorMap.purple
            return (
              <div
                key={project.name}
                className={`project-card transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="p-6 h-full flex flex-col">
                  {/* Top row: icon + status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${c.iconBg} flex items-center justify-center text-xl`}>
                      {project.icon}
                    </div>
                    <span className={`text-xs font-mono px-2 py-1 rounded-full border ${c.badge}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg font-black mb-2 font-mono ${c.accent} leading-tight`}>
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2 py-0.5 rounded glass border border-white/10 text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors group"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      <span className="group-hover:underline">GitHub</span>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-400 transition-colors ml-auto"
                    >
                      View ↗
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View all on GitHub */}
        <div className={`text-center mt-12 transition-all duration-700 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a
            href="https://github.com/fjumanazarova64-cmd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-outline"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub'da barchasini ko'rish ↗
          </a>
        </div>
      </div>
    </section>
  )
}
