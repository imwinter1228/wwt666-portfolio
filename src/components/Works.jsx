import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Maximize2, X } from 'lucide-react'
import BlurText from './BlurText'

const posters = [
  { title: '城市副本入口', image: '/assets/posters/portal.png', desc: '城市中隐蔽的副本入口，连接现实与异界的门扉' },
  { title: '副本光幕', image: '/assets/posters/light-curtain.png', desc: '笼罩副本区域的神秘光幕，是障壁也是警告' },
  { title: '红色公告屏', image: '/assets/posters/announcement.png', desc: '紧急状态下的城市公告，红色警示笼罩天际' },
  { title: '街道中央空地', image: '/assets/posters/street.png', desc: '商业街核心区域，副本降临后的主战场' },
  { title: '恐慌角落', image: '/assets/posters/corner.png', desc: '商铺角落里聚集的恐慌人群，绝望中的微光' },
  { title: '狼藉都市', image: '/assets/posters/ruins.png', desc: '被战火蹂躏后的城市商业街，一片废墟' },
  { title: '全景鸟瞰', image: '/assets/posters/ruins-wide.png', desc: '广角视角下的城市残骸，宏大叙事展开' },
]

function Lightbox({ image, title, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-charcoal/90 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full glass text-white hover:bg-white/20 transition-colors"
      >
        <X size={24} />
      </button>
      <img
        src={image}
        alt={title}
        className="max-w-full max-h-[85vh] object-contain rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <p className="absolute bottom-8 text-white/80 text-lg font-medium">{title}</p>
    </motion.div>
  )
}

export default function Works() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="works" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1700px] mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <span className="text-sm font-semibold text-warm-orange uppercase tracking-wider">
            作品案例
          </span>
          <BlurText
            text="场景与视觉"
            delay={45}
            animateBy="letters" direction="bottom" as="h2"
            className="text-4xl lg:text-5xl font-bold text-warm-white mt-3 mb-4"
          />
          <BlurText
            text="从副本入口到城市废墟，每一帧画面都是对世界观的视觉诠释。点击可放大查看高清细节。"
            delay={25}
            animateBy="words" direction="top" className="text-lg text-warm-gray/70 max-w-2xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="glass rounded-2xl overflow-hidden group cursor-pointer">
            <div className="aspect-video bg-charcoal/5 relative overflow-hidden">
              <video
                muted
                loop
                playsInline
                poster="/assets/posters/street.png"
                className="w-full h-full object-cover"
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0 }}
              >
                <source src="/assets/videos/hero.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-charcoal/20 flex items-center justify-center group-hover:bg-charcoal/10 transition-colors">
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={28} fill="white" className="text-white ml-1" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-warm-white mb-1">城市商业街哥布林袭击场景</h3>
              <p className="text-warm-gray/70 text-sm">
                商业街副本降临·哥布林入侵城市 — 第一人称叙事运镜，展现副本打开瞬间的氛围。
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {posters.map((poster, i) => (
            <motion.div
              key={poster.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.06 }}
              className="group cursor-pointer"
              onClick={() => setLightbox(poster)}
            >
              <div className="glass rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-500 hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden bg-dark-surface relative">
                  <img
                    src={poster.image}
                    alt={poster.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors flex items-center justify-center">
                    <Maximize2
                      size={20}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-warm-white mb-1">{poster.title}</h3>
                  <p className="text-xs text-warm-gray/60 line-clamp-2">{poster.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox image={lightbox.image} title={lightbox.title} onClose={() => setLightbox(null)} />
      )}
    </section>
  )
}
