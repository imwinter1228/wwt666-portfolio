import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Shuffle, Zap } from 'lucide-react'

const modes = [
  {
    id: 'warm',
    label: '暖阳',
    icon: 'sun',
    accent: '#F97316',
    bg: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08), rgba(251, 191, 36, 0.06))',
    desc: '橙色暖调 · 末日余晖中的希望',
  },
  {
    id: 'cool',
    label: '极夜',
    icon: 'moon',
    accent: '#6366F1',
    bg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.06))',
    desc: '靛蓝冷调 · 副本入口的幽光',
  },
  {
    id: 'crimson',
    label: '赤幕',
    icon: 'fire',
    accent: '#DC2626',
    bg: 'linear-gradient(135deg, rgba(220, 38, 38, 0.08), rgba(239, 68, 68, 0.06))',
    desc: '血红警示 · 紧急公告的颜色',
  },
]

export default function Interactive() {
  const [activeMode, setActiveMode] = useState('warm')

  const currentMode = modes.find((m) => m.id === activeMode)

  return (
    <section id="interactive" className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: currentMode?.bg }}
      />
      <div className="max-w-[1700px] mx-auto px-6 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-semibold text-warm-orange uppercase tracking-wider">
            互动体验
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-charcoal mt-3 mb-4">
            风格切换
          </h2>
          <p className="text-lg text-slate-warm/70 max-w-2xl">
            选择不同的世界观色调，感受色彩如何改变场景的情绪与叙事。
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="glass rounded-3xl p-8 w-full lg:w-80 flex-shrink-0">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={22} className="text-warm-orange" />
              <span className="text-sm font-semibold text-slate-warm uppercase tracking-wider">调色板</span>
            </div>

            <div className="space-y-3">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
                    activeMode === mode.id
                      ? 'glass shadow-sm scale-[1.02]'
                      : 'hover:bg-white/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                      style={{ backgroundColor: mode.accent + '18', color: mode.accent }}
                    >
                      <Shuffle size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-charcoal">{mode.label}</div>
                      <div className="text-xs text-slate-warm/60 mt-0.5">{mode.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex-1 glass rounded-3xl p-2 overflow-hidden"
            >
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-cream-200 relative">
                <img
                  src="/assets/posters/portal.png"
                  alt="预览"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 transition-all duration-700 mix-blend-overlay"
                  style={{ backgroundColor: currentMode?.accent + '30' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 glass-dark rounded-t-3xl">
                  <div className="flex items-center gap-3">
                    <Zap size={18} style={{ color: currentMode?.accent }} />
                    <span className="text-white text-sm font-medium">
                      当前模式: {currentMode?.label} — {currentMode?.desc}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
