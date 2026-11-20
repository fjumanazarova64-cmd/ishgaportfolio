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

export default function About({ t }) {
  const [ref, visible] = useVisible()

  return (
    <section id="about" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-mono text-purple-500 text-sm tracking-widest uppercase mb-3">{t.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-gradient">{t.title}</span>
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-neon rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Avatar / visual */}
          <div className={`flex justify-center transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-neon opacity-20 blur-2xl animate-pulse-slow" />

              {/* Avatar container */}
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full border-gradient flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="/farangiz.jpg"
                    alt="Farangiz Jumanazarova"
                    className="w-full h-full object-cover object-center scale-110"
                  />
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-2 -right-4 glass px-3 py-1.5 rounded-full border border-purple-500/30 text-xs font-mono text-purple-300 animate-float">
                {'<HTML />'}
              </div>
              <div className="absolute -bottom-2 -left-4 glass px-3 py-1.5 rounded-full border border-blue-500/30 text-xs font-mono text-blue-300" style={{ animation: 'float 6s ease-in-out 1s infinite' }}>
                {'{CSS}'}
              </div>
              <div className="absolute top-1/2 -right-8 glass px-3 py-1.5 rounded-full border border-green-500/30 text-xs font-mono text-green-300" style={{ animation: 'float 6s ease-in-out 2s infinite' }}>
                {'JS()'}
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className={`space-y-6 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <p className="text-gray-300 text-lg leading-relaxed">{t.p1}</p>
            <p className="text-gray-400 leading-relaxed">{t.p2}</p>
            <p className="text-gray-400 leading-relaxed">{t.p3}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 pt-4">
              {[t.tag1, t.tag2, t.tag3].map((tag, i) => (
                <span
                  key={i}
                  className="glass px-4 py-2 rounded-full text-sm font-mono border border-purple-500/20 text-purple-300"
                >
                  # {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { n: '3+', l: 'Projects' },
                { n: '5+', l: 'Technologies' },
                { n: '1+', l: 'Year Learning' },
              ].map((s, i) => (
                <div key={i} className="glass rounded-xl p-4 text-center border border-purple-500/10 hover:border-purple-500/30 transition-colors">
                  <div className="text-2xl font-black text-gradient">{s.n}</div>
                  <div className="text-gray-500 text-xs mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
