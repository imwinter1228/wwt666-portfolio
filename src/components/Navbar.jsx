import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#characters', label: '角色介绍' },
  { href: '#works', label: '作品案例' },
  { href: '#interactive', label: '互动体验' },
  { href: '#contact', label: '联系方式' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1700px] mx-auto px-6 lg:px-10">
        <nav className="flex items-center justify-between h-20 lg:h-24">
          <a href="#top" className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-warm-orange to-warm-yellow flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              W
            </span>
            <span className="text-xl font-semibold tracking-tight text-charcoal">
              wwt666
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-5 py-2.5 rounded-full text-slate-warm hover:text-warm-orange hover:bg-white/60 transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="lg:hidden p-2 rounded-xl hover:bg-white/60 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass border-t border-white/40">
          <ul className="px-6 py-4 space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-slate-warm hover:text-warm-orange hover:bg-white/60 transition-colors font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
