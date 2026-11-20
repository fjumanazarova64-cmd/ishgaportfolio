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

export default function Goals({ t }) {
  const [ref, visible] = useVisible()

  return (
    <section id="goals" className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-mono text-purple-500 text-sm tracking-widest uppercase mb-3">{t.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-gradient">{t.title}</span>
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-neon rounded-full mx-auto" />
        </div>

        {/* Goals list */}
        <div className="space-y-4">
          {t.items.map((goal, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="glass rounded-xl p-5 border border-purple-500/10 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group flex items-center gap-5">
                {/* Number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-neon flex items-center justify-center font-mono font-bold text-sm text-white shadow-lg">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="text-2xl">{goal.icon}</div>

                {/* Text */}
                <p className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium flex-1">
                  {goal.text}
                </p>

                {/* Arrow */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-purple-500/20 group-hover:border-purple-500/60 group-hover:bg-purple-500/10 flex items-center justify-center transition-all duration-300">
                  <svg className="w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
