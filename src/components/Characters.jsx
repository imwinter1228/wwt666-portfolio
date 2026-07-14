import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import BorderGlow from './BorderGlow'
import BlurText from './BlurText'

const characters = [
  { name: '林曜', role: '主角 · 觉醒者', image: '/assets/characters/linyao.png', desc: '拥有特殊能力的少年，在末日世界中不断成长' },
  { name: '赵天宇', role: '主角 · 战士', image: '/assets/characters/zhaotianyu.png', desc: '林曜的伙伴，沉稳可靠的战斗者' },
  { name: '跟班', role: '伙伴 · 支援者', image: '/assets/characters/sidekick.png', desc: '灵活机敏的跟随者，战斗中负责情报与支援' },
  { name: '路人甲', role: 'NPC · 市民', image: '/assets/characters/passerby.png', desc: '城市中的普通市民，副本事件中的目击者' },
  { name: '路人乙', role: 'NPC · 市民', image: '/assets/characters/passerby-b.png', desc: '慌乱中求生的普通人，命运的见证者' },
  { name: '路人女子', role: 'NPC · 幸存者', image: '/assets/characters/passerby-girl.png', desc: '在恐慌中保护自己的年轻女性' },
  { name: '路人大姐', role: 'NPC · 市民', image: '/assets/characters/auntie.png', desc: '街头巷尾常见的面善大姐' },
  { name: '小女孩', role: 'NPC · 关键角色', image: '/assets/characters/little-girl.png', desc: '神秘的小女孩，似乎与副本有某种联系' },
]

function CharacterCard({ character, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <div className="glass rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-orange-500/10 transition-shadow duration-500">
        <BorderGlow
          borderRadius={16}
          glowRadius={30}
          edgeSensitivity={25}
          coneSpread={20}
          fillOpacity={0.15}
          glowColor="30 90 65"
          colors={['#f97316', '#fbbf24', '#fb923c']}
        >
          <div className="aspect-[3/4] overflow-hidden bg-cream-200">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </BorderGlow>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-charcoal mb-0.5">{character.name}</h3>
          <p className="text-sm text-warm-orange font-medium mb-2">{character.role}</p>
          <p className="text-sm text-slate-warm/70 leading-relaxed">{character.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Characters() {
  return (
    <section id="characters" className="relative py-24 lg:py-32">
      <div className="max-w-[1700px] mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <span className="text-sm font-semibold text-warm-orange uppercase tracking-wider">
            角色介绍
          </span>
          <BlurText
            text="世界观人物"
            delay={80}
            animateBy="words"
            direction="bottom"
            as="h2"
            className="text-4xl lg:text-5xl font-bold text-charcoal mt-3 mb-4"
          />
          <BlurText
            text="每一个角色背后都是一个完整的故事。从主角到路人，从觉醒者到幸存者，用 3D 动漫风格构建宇宙世界的人物生态。"
            delay={30}
            animateBy="words"
            direction="top"
            className="text-lg text-slate-warm/70 max-w-2xl"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {characters.map((character, index) => (
            <CharacterCard key={character.name} character={character} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
