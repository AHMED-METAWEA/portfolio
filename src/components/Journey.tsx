import { Calendar, GraduationCap, MapPin, Rocket, Trophy } from 'lucide-react'
import { timeline, type TimelineKind } from '../data/portfolio'
import { Reveal, Section, SectionHeading } from './ui'

const kindMeta: Record<TimelineKind, { icon: React.ReactNode; label: string }> = {
  training: { icon: <Rocket size={18} />, label: 'Training' },
  education: { icon: <GraduationCap size={18} />, label: 'Education' },
  activity: { icon: <Trophy size={18} />, label: 'Competition' },
}

export default function Journey() {
  return (
    <Section id="journey">
      <SectionHeading eyebrow="Journey" title="Education &" highlight="training" />

      <ol className="relative mx-auto max-w-3xl">
        <span
          className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-gradient-to-b from-accent/70 via-white/10 to-transparent"
          aria-hidden="true"
        />
        {timeline.map((t) => {
          const meta = kindMeta[t.kind]
          return (
            <li key={t.title} className="relative mb-8 pl-16 last:mb-0 sm:pl-20">
              <span className="absolute left-0 top-6 z-10 grid h-11 w-11 place-items-center rounded-2xl border border-accent/35 bg-ink-900 text-accent-soft shadow-[0_0_24px_-4px_rgba(45,212,191,0.45)]">
                {meta.icon}
              </span>
              <Reveal y={18}>
                <div className="card card-hover p-6 sm:p-7">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-accent-soft">
                        {meta.label}
                      </span>
                      <h3 className="mt-3 font-display text-xl font-semibold text-fg">{t.title}</h3>
                      <p className="mt-1 text-[0.95rem] font-medium text-accent-soft/90">{t.org}</p>
                    </div>
                    <div className="flex shrink-0 flex-row flex-wrap gap-x-4 gap-y-1.5 text-sm text-fg-muted sm:flex-col sm:items-end sm:text-right">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={14} className="text-accent" /> {t.date}
                      </span>
                      {t.place && (
                        <span className="inline-flex items-center gap-1.5 text-fg-subtle">
                          <MapPin size={14} /> {t.place}
                        </span>
                      )}
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-5">
                    {t.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[0.95rem] leading-relaxed text-fg-muted">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent/80" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
