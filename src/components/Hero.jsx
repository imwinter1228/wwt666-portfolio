import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const stats = [
  { value: '7+', label: '世界观项目' },
  { value: '40+', label: '角色设计' },
  { value: '3', label: '创作年限' },
]

export default function Hero() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/posters/street.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-cream-100/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-orange/10 via-transparent to-warm-yellow/10" />
      </div>

      <div className="relative z-10 max-w-[1700px] mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <span className="w-2 h-2 rounded-full bg-warm-orange animate-pulse" />
              <span className="text-sm font-medium text-charcoal">
                AI 创作 · 世界观构建
              </span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-none">
              <span className="bg-gradient-to-r from-warm-orange via-warm-yellow to-warm-orange bg-clip-text text-transparent text-shadow">
                wwt666
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-warm/80 max-w-xl mb-10 leading-relaxed">
              AI 设计师 · 从世界观到角色，用模型构建幻想世界。
              专注于 3D 动漫角色设定、城市副本场景与叙事视觉表达。
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="glass rounded-2xl px-6 py-4 backdrop-blur-xl"
                >
                  <div className="text-2xl font-bold text-warm-orange">{stat.value}</div>
                  <div className="text-sm text-slate-warm mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#characters"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/80 hover:text-white transition-colors"
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  )
}
