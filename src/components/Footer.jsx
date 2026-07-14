export default function Footer() {
  return (
    <footer className="border-t border-white/30">
      <div className="max-w-[1700px] mx-auto px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-warm-orange to-warm-yellow flex items-center justify-center text-white font-bold text-xs">
              W
            </span>
            <span className="text-sm font-medium text-slate-warm/60">wwt666</span>
          </div>
          <p className="text-sm text-slate-warm/50">
            AI Designer Portfolio · World Building &amp; Character Design
          </p>
          <p className="text-sm text-slate-warm/40">
            © 2026 wwt666
          </p>
        </div>
      </div>
    </footer>
  )
}
