import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'
import BlurText from './BlurText'

const items = [
  {
    icon: <Phone size={22} />,
    label: '电话',
    value: '请联系邮箱获取',
  },
  {
    icon: <Mail size={22} />,
    label: '邮箱',
    value: 'wwt666@example.com',
    action: 'mailto:wwt666@example.com',
  },
  {
    icon: <MapPin size={22} />,
    label: '地点',
    value: '中国 · 在线协作',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="max-w-[1700px] mx-auto px-6 lg:px-10">
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold text-warm-orange uppercase tracking-wider">
            联系方式
          </span>
          <BlurText
            text="一起构建世界"
            delay={80}
            animateBy="words"
            direction="bottom"
            as="h2"
            className="text-4xl lg:text-5xl font-bold text-charcoal mt-3 mb-4"
          />
          <BlurText
            text="如果你有世界观搭建、角色设计、场景构建的需求，欢迎联系。"
            delay={30}
            animateBy="words"
            direction="top"
            className="text-lg text-slate-warm/70 max-w-xl mx-auto"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass rounded-3xl p-8 md:p-10">
            <div className="space-y-6">
              {items.map((item) => {
                const content = (
                  <div className="flex items-start gap-5 group">
                    <div className="w-11 h-11 rounded-xl bg-warm-orange/10 flex items-center justify-center text-warm-orange flex-shrink-0 group-hover:bg-warm-orange group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm text-slate-warm/60 mb-1">{item.label}</div>
                      <div className="text-charcoal font-medium text-lg">{item.value}</div>
                    </div>
                  </div>
                )

                if (item.action) {
                  return (
                    <a
                      key={item.label}
                      href={item.action}
                      className="block p-4 rounded-2xl hover:bg-white/50 transition-colors -mx-2"
                    >
                      {content}
                    </a>
                  )
                }

                return (
                  <div key={item.label} className="p-4 -mx-2">
                    {content}
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
