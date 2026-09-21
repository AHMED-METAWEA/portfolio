import { ArrowUpRight, Award, BadgeCheck } from 'lucide-react'
import { certifications } from '../data/portfolio'
import { Reveal, Section, SectionHeading } from './ui'

export default function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow="Certifications"
        title="Credentials &"
        highlight="courses"
        description="Industry certifications and specialized programs that back up the hands-on work."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => {
          const Wrapper = c.url ? 'a' : 'div'
          return (
            <Reveal key={c.title} delay={0.05 * i} className="h-full">
              <Wrapper
                {...(c.url ? { href: c.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`card card-hover group flex h-full flex-col p-6 ${
                  c.highlight ? 'border-accent/25 bg-gradient-to-b from-accent/[0.07] to-transparent' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="icon-tile">{c.highlight ? <BadgeCheck size={20} /> : <Award size={20} />}</div>
                  {c.highlight && (
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-accent-soft">
                      Certified
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-[1.05rem] font-semibold leading-snug text-fg">{c.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">
                  {c.issuer}
                  {c.date && <span className="text-fg-subtle"> · {c.date}</span>}
                </p>
                <div className="mt-auto pt-5">
                  {c.url ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-soft/90 transition-colors group-hover:text-accent-soft">
                      View credential
                      <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  ) : (
                    <span className="text-sm text-fg-subtle">Completed</span>
                  )}
                </div>
              </Wrapper>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
