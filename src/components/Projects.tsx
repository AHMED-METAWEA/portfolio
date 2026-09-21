import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Bot, FlaskConical, Languages, ScanEye, ScanSearch, TextCursorInput, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { projects, type Project, type ProjectCategory, type ProjectIcon } from '../data/portfolio'
import { GithubIcon } from './BrandIcons'
import { Reveal, Section, SectionHeading } from './ui'

const icons: Record<ProjectIcon, React.ReactNode> = {
  agents: <Bot size={20} />,
  skin: <ScanSearch size={20} />,
  vision: <ScanEye size={20} />,
  translate: <Languages size={20} />,
  lab: <FlaskConical size={20} />,
  text: <TextCursorInput size={20} />,
}

const filters: ('All' | ProjectCategory)[] = ['All', 'Agents & LLMs', 'Computer Vision', 'NLP', 'Healthcare AI']

function RepoLink({ href, title }: { href: string; title: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${title} source code on GitHub`}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 text-fg-muted transition-all hover:border-accent/50 hover:text-accent-soft group-hover:text-fg"
    >
      <ArrowUpRight size={17} />
    </a>
  )
}

function Label({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <p className={`font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] ${accent ? 'text-accent' : 'text-fg-subtle'}`}>
      {children}
    </p>
  )
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
      {items.map((s) => (
        <li key={s} className="chip">
          {s}
        </li>
      ))}
    </ul>
  )
}

function CodeLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-accent-soft"
    >
      <GithubIcon size={16} /> View code
      <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  )
}

const pipeline = ['Ingest · files / Sheets / DB', 'Clean · human-in-the-loop', 'Analyze · KPIs & RFM', 'Forecast · back-tested', 'Predict · churn risk', 'Monitor · alerts & RCA']

function FeaturedCard({ p }: { p: Project }) {
  return (
    <article className="card card-hover group overflow-hidden">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.16),transparent)]" />
      <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.25fr_0.9fr] lg:p-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="icon-tile">{icons[p.icon]}</div>
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-accent-soft">
                {p.badge}
              </span>
            </div>
            <RepoLink href={p.repo} title={p.title} />
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{p.title}</h3>
            <p className="mt-1.5 text-fg-muted">{p.subtitle}</p>
          </div>
          <div className="space-y-2">
            <Label>Problem</Label>
            <p className="leading-relaxed text-fg-muted">{p.problem}</p>
          </div>
          <div className="space-y-2">
            <Label accent>Solution</Label>
            <p className="leading-relaxed text-fg/90">{p.solution}</p>
          </div>
          {p.highlights && (
            <ul className="space-y-3">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[0.95rem] leading-relaxed text-fg-muted">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          )}
          <Stack items={p.stack} />
          <div className="pt-1">
            <CodeLink href={p.repo} />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-3 gap-3">
            {p.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-white/[0.07] bg-ink-900/60 p-3.5 text-center sm:p-4">
                <div className="font-display text-xl font-bold text-gradient sm:text-2xl">{m.value}</div>
                <div className="mt-1 text-[0.7rem] leading-snug text-fg-muted sm:text-xs">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="relative flex-1 rounded-2xl border border-white/[0.07] bg-ink-900/60 p-5 sm:p-6">
            <Label accent>Agent pipeline</Label>
            <ol className="relative mt-5 space-y-3">
              <span className="absolute bottom-3 left-[0.6rem] top-3 w-px bg-gradient-to-b from-accent/60 via-accent/25 to-accent-2/50" aria-hidden="true" />
              {pipeline.map((step, i) => {
                const [name, detail] = step.split(' · ')
                return (
                  <motion.li
                    key={step}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                    className="relative flex items-center gap-4"
                  >
                    <span className="relative z-10 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-accent/50 bg-ink-900">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    <span className="text-sm">
                      <span className="font-medium text-fg">{name}</span>
                      <span className="text-fg-subtle"> — {detail}</span>
                    </span>
                  </motion.li>
                )
              })}
            </ol>
            <div className="mt-5 rounded-xl border border-dashed border-accent/25 bg-accent/[0.05] px-4 py-3 text-xs leading-relaxed text-fg-muted">
              <span className="font-mono text-accent-soft">LLM layer</span> narrates the computed results — it never
              invents the numbers.
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="card card-hover group flex h-full flex-col gap-6 p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="icon-tile">{icons[p.icon]}</div>
          {p.badge && (
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-fg-muted">
              {p.badge}
            </span>
          )}
        </div>
        <RepoLink href={p.repo} title={p.title} />
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold tracking-tight text-fg sm:text-[1.4rem]">{p.title}</h3>
        <p className="mt-1 text-sm text-fg-muted">{p.subtitle}</p>
      </div>

      <div className="space-y-2">
        <Label>Problem</Label>
        <p className="text-[0.95rem] leading-relaxed text-fg-muted">{p.problem}</p>
      </div>
      <div className="space-y-2">
        <Label accent>Solution</Label>
        <p className="text-[0.95rem] leading-relaxed text-fg/90">{p.solution}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {p.metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-accent/15 bg-accent/[0.045] px-4 py-3">
            <div className="font-display text-xl font-bold text-gradient">{m.value}</div>
            <div className="mt-0.5 text-xs text-fg-muted">{m.label}</div>
          </div>
        ))}
      </div>

      {p.role && (
        <p className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-fg-muted">
          <UserRound size={16} className="mt-0.5 shrink-0 text-accent" />
          <span>
            <span className="font-medium text-fg">My role: </span>
            {p.role}
          </span>
        </p>
      )}

      <div className="mt-auto space-y-5">
        <Stack items={p.stack} />
        <div className="border-t border-white/[0.06] pt-4">
          <CodeLink href={p.repo} />
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  )

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Selected"
        highlight="work"
        description="End-to-end AI systems — each one taken from data and modeling through to a working app or API."
      />

      <Reveal className="mb-10 flex justify-center">
        <div role="tablist" aria-label="Filter projects" className="flex max-w-full flex-wrap justify-center gap-1 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-1.5">
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`relative shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                filter === f ? 'text-ink-950' : 'text-fg-muted hover:text-fg'
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent to-[#22b8e0]"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="grid gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.21, 0.61, 0.35, 1] }}
              className={p.featured && filter === 'All' ? 'lg:col-span-2' : ''}
            >
              {p.featured && filter === 'All' ? <FeaturedCard p={p} /> : <ProjectCard p={p} />}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Reveal className="mt-12 flex justify-center">
        <a href="https://github.com/AHMED-METAWEA" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          <GithubIcon size={18} /> More on GitHub <ArrowUpRight size={16} />
        </a>
      </Reveal>
    </Section>
  )
}
