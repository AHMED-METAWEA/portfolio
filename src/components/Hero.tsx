import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, Download, Mail, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { heroChips, profile } from '../data/portfolio'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

const ease = [0.21, 0.61, 0.35, 1] as const

function RotatingRole() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2800)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={profile.roles[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease }}
          className="inline-block whitespace-nowrap"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Portrait() {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative mx-auto aspect-square w-[16.5rem] sm:w-[20rem] lg:w-[23rem]">
      {/* glow */}
      <div className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.28),transparent)] blur-2xl" />
      {/* rotating ring */}
      <div className="absolute -inset-[3px] animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,rgba(45,212,191,0.9),rgba(56,189,248,0.1),rgba(45,212,191,0.05),rgba(94,234,212,0.9),rgba(45,212,191,0.9))]" />
      {/* orbit */}
      <div className="absolute -inset-7 rounded-full border border-dashed border-white/[0.07]" />
      <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-ink-950 bg-ink-800">
        {!failed ? (
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLoaded(true)}
            width={736}
            height={736}
            fetchPriority="high"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="relative grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,#123a3a,#0b0f17_65%)]">
            <div className="grid-bg absolute inset-0 opacity-60" />
            <span className="relative font-display text-7xl font-bold tracking-tight text-gradient sm:text-8xl">{profile.initials}</span>
          </div>
        )}
      </div>

      {heroChips.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 + i * 0.15, duration: 0.5, ease }}
          className={`absolute z-10 ${
            c.position === 'top' ? '-left-4 top-6 sm:-left-10 animate-float' : '-right-3 bottom-10 sm:-right-10 animate-float-delayed'
          }`}
        >
          <div className="rounded-xl border border-white/10 bg-ink-900/85 px-3.5 py-2 font-mono text-[0.72rem] text-accent-soft shadow-xl shadow-black/40 backdrop-blur-md sm:text-xs">
            {c.label}
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease }}
        className="absolute -bottom-5 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-accent/25 bg-ink-900/90 px-4 py-2 text-xs font-medium text-fg shadow-xl shadow-black/40 backdrop-blur-md">
          <BadgeCheck size={15} className="text-accent" />
          AWS Certified ML Engineer
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  }

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 md:pt-32">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-[1]" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[0.07] px-4 py-1.5 text-[0.8rem] font-medium text-accent-soft">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" />
              {profile.availability}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-[4.1rem]"
          >
            Hi, I'm <span className="block text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 font-display text-xl font-medium text-fg/90 sm:text-2xl lg:text-[1.75rem]">
            <RotatingRole />
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href="#projects" className="btn btn-primary">
              View my work <ArrowRight size={18} />
            </a>
            <a href={profile.resume} download className="btn btn-outline">
              <Download size={18} /> Download CV
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
            <div className="flex items-center gap-2">
              {[
                { href: profile.github, label: 'GitHub', icon: <GithubIcon size={18} /> },
                { href: profile.linkedin, label: 'LinkedIn', icon: <LinkedinIcon size={17} /> },
                { href: `mailto:${profile.email}`, label: 'Email', icon: <Mail size={18} /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-fg-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent-soft"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm text-fg-muted">
              <MapPin size={15} className="text-accent" /> {profile.location}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="flex justify-center"
        >
          <Portrait />
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fg-subtle transition-colors hover:text-accent md:flex"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.3em]">SCROLL</span>
        <span className="relative h-9 w-5 rounded-full border border-current">
          <motion.span
            className="absolute left-1/2 top-1.5 h-1.5 w-1 -translate-x-1/2 rounded-full bg-current"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </a>
    </section>
  )
}
