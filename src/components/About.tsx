import { animate, useInView } from 'framer-motion'
import { Bot, Languages, Rocket, ScanEye } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { about, focusAreas, stats, type FocusIcon } from '../data/portfolio'
import { Reveal, Section, SectionHeading } from './ui'

const icons: Record<FocusIcon, React.ReactNode> = {
  vision: <ScanEye size={20} />,
  nlp: <Languages size={20} />,
  agents: <Bot size={20} />,
  deploy: <Rocket size={20} />,
}

function Counter({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(value.toFixed(decimals))

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, value, decimals])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About me" title={about.heading[0]} highlight={about.heading[1]} />

      <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <Reveal className="flex flex-col gap-5">
          {about.paragraphs.map((p, i) => (
            <p key={i} className={`text-base leading-[1.8] md:text-[1.075rem] ${i === 0 ? 'text-fg/90' : 'text-fg-muted'}`}>
              {p}
            </p>
          ))}
          <div className="mt-3 flex flex-wrap gap-3">
            {about.languages.map((l) => (
              <span key={l.name} className="chip !px-3.5 !py-1.5">
                <span className="font-medium text-fg">{l.name}</span>
                <span className="text-fg-subtle">·</span>
                <span>{l.level}</span>
              </span>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {focusAreas.map((f, i) => (
            <Reveal key={f.title} delay={0.08 * i} className="card card-hover p-6">
              <div className="icon-tile">{icons[f.icon]}</div>
              <h3 className="mt-5 font-display text-lg font-semibold text-fg">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-16 md:mt-20">
        <div className="card grid grid-cols-2 divide-white/[0.06] overflow-hidden md:grid-cols-4 md:divide-x">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center gap-2 px-4 py-8 text-center md:py-10 ${
                i < 2 ? 'border-b border-white/[0.06] md:border-b-0' : ''
              } ${i % 2 === 0 ? 'border-r border-white/[0.06] md:border-r-0' : ''}`}
            >
              <span className="font-display text-3xl font-bold tracking-tight text-gradient sm:text-4xl">
                <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </span>
              <span className="text-xs leading-snug text-fg-muted sm:text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
