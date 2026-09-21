import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { FileText, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/portfolio'

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a href="#top" onClick={onClick} className="group inline-flex items-center gap-3">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-accent/30 bg-gradient-to-br from-accent/20 to-accent-2/5 font-display text-sm font-bold tracking-tight text-accent-soft transition-colors group-hover:border-accent/60">
        {profile.initials}
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(45,212,191,0.6)]" />
      </span>
      <span className="sr-only sm:hidden">{profile.name}</span>
      <span className="hidden font-display text-[1.05rem] font-semibold tracking-tight text-fg sm:inline">
        Ahmed<span className="text-accent">.</span>Metawea
      </span>
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-accent via-accent-soft to-accent-2"
      />
      <div
        className={`transition-all duration-300 ${
          scrolled || open
            ? 'border-b border-white/[0.06] bg-ink-950/75 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 md:h-[4.5rem] lg:px-8" aria-label="Main">
          <Logo onClick={() => setOpen(false)} />

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    active === l.id ? 'text-fg' : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  {l.label}
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-accent to-accent-2"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-outline hidden !px-4 !py-2 text-sm sm:inline-flex">
              <FileText size={16} /> Resume
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-fg transition-colors hover:border-accent/50 lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-b border-white/[0.06] bg-ink-950/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-6">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg font-medium transition-colors ${
                      active === l.id ? 'bg-accent/10 text-fg' : 'text-fg-muted hover:bg-white/[0.04] hover:text-fg'
                    }`}
                  >
                    {l.label}
                    <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
              <li className="mt-4">
                <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-primary w-full" onClick={() => setOpen(false)}>
                  <FileText size={18} /> View Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
