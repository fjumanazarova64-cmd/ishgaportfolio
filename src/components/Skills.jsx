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

function SkillBar({ skill, visible, delay }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => setWidth(skill.level), delay)
      return () => clearTimeout(timeout)
    }
  }, [visible, skill.level, delay])

  return (
    <div className="glass rounded-xl p-5 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <div>
            <div className="font-bold text-white group-hover:text-gradient transition-all">{skill.name}</div>
            <div className="text-gray-500 text-xs">{skill.desc}</div>
          </div>
        </div>
        <span className="font-mono text-purple-400 font-bold text-sm">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

export default function Skills({ t }) {
  const [ref, visible] = useVisible()

  return (
    <section id="skills" className="relative py-24 px-4 bg-gradient-to-b from-transparent via-[#0A0C1A]/50 to-transparent">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-mono text-purple-500 text-sm tracking-widest uppercase mb-3">{t.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-gradient">{t.title}</span>
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-neon rounded-full mx-auto" />
          <p className="mt-6 text-gray-400 max-w-xl mx-auto">{t.description}</p>
        </div>

        {/* Skills grid */}
        <div className="grid gap-4">
          {t.items.map((skill, i) => (
            <div
              key={skill.name}
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <SkillBar skill={skill} visible={visible} delay={i * 150 + 300} />
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full border border-purple-500/20">
            <span className="text-2xl">✨</span>
            <span className="text-gray-400 font-mono text-sm">Always learning new things...</span>
          </div>
        </div>
      </div>
    </section>
  )
}
