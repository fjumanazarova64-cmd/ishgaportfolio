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

export default function Education({ t }) {
  const [ref, visible] = useVisible()

  return (
    <section id="education" className="relative py-24 px-4 bg-gradient-to-b from-transparent via-[#0A0C1A]/50 to-transparent">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-mono text-purple-500 text-sm tracking-widest uppercase mb-3">{t.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-gradient">{t.title}</span>
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-neon rounded-full mx-auto" />
        </div>

        {/* Education cards */}
        {t.items.map((edu, i) => (
          <div
            key={i}
            className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="glass rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 relative overflow-hidden group">
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-neon flex items-center justify-center text-4xl shadow-lg neon-glow-purple">
                    {edu.icon}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="text-2xl font-black text-white font-mono">{edu.school}</h3>
                    <span className="font-mono text-xs text-purple-400 glass px-3 py-1 rounded-full border border-purple-500/30 self-start">
                      {edu.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-blue-300 font-semibold">{edu.field}</span>
                    <span className="text-gray-600">·</span>
                    <span className="text-xs font-mono px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      {edu.level}
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{edu.description}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6 relative z-10">
                <div className="flex justify-between text-xs text-gray-500 mb-2 font-mono">
                  <span>Progress</span>
                  <span>35%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-bar-fill transition-all duration-[2s]"
                    style={{ width: visible ? '35%' : '0%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
