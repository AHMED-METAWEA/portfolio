import { Boxes, Brain, Cloud, Code2, MessagesSquare, Network, Sparkles } from 'lucide-react'
import { skillGroups, softSkills, type SkillIcon } from '../data/portfolio'
import { Reveal, Section, SectionHeading } from './ui'

const icons: Record<SkillIcon, React.ReactNode> = {
  code: <Code2 size={20} />,
  ml: <Boxes size={20} />,
  dl: <Brain size={20} />,
  nlp: <MessagesSquare size={20} />,
  agents: <Network size={20} />,
  cloud: <Cloud size={20} />,
}

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="Technical"
        highlight="toolkit"
        description="The languages, frameworks and platforms I use to take AI from research to production."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={0.06 * i} className="card card-hover flex flex-col p-6 sm:p-7">
            <div className="flex items-center gap-4">
              <div className="icon-tile">{icons[g.icon]}</div>
              <h3 className="font-display text-lg font-semibold text-fg">{g.title}</h3>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li
                  key={s}
                  className="chip transition-colors hover:border-accent/40 hover:bg-accent/[0.08] hover:text-fg"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <div className="card flex flex-col items-center gap-4 px-6 py-5 sm:flex-row sm:justify-between">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">
            <Sparkles size={15} className="text-accent" /> Soft skills
          </span>
          <ul className="flex flex-wrap justify-center gap-2">
            {softSkills.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
