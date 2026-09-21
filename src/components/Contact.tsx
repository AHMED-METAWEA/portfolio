import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, CircleAlert, Copy, LoaderCircle, Mail, MapPin, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { profile } from '../data/portfolio'
import { GithubIcon, KaggleIcon, LinkedinIcon } from './BrandIcons'
import { Reveal, Section, SectionHeading } from './ui'

/**
 * Form delivery:
 *  - If VITE_WEB3FORMS_KEY is set (free key from https://web3forms.com), messages go through Web3Forms.
 *  - Otherwise they go through FormSubmit (https://formsubmit.co). The very first message triggers a
 *    one-time activation email to the inbox below — click "Activate" once and every later message arrives.
 */
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

type Status = 'idle' | 'sending' | 'sent' | 'error'

async function deliver(data: { name: string; email: string; message: string }) {
  const subject = `Portfolio message from ${data.name}`
  if (WEB3FORMS_KEY) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, from_name: 'Portfolio', ...data }),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok || !json.success) throw new Error('send failed')
    return
  }
  const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...data, _subject: subject, _template: 'table', _captcha: 'false' }),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok || String(json.success) !== 'true') throw new Error('send failed')
}

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    if (fd.get('company')) return // honeypot — bots fill hidden fields
    const data = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
    }
    setStatus('sending')
    try {
      await deliver(data)
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const socials = [
    { href: profile.linkedin, label: 'LinkedIn', handle: 'linkedin.com/in/ahmed-metawea', icon: <LinkedinIcon size={18} /> },
    { href: profile.github, label: 'GitHub', handle: 'github.com/AHMED-METAWEA', icon: <GithubIcon size={18} /> },
    { href: profile.kaggle, label: 'Kaggle', handle: 'kaggle.com/ahmed1metawea', icon: <KaggleIcon size={17} /> },
  ]

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something"
        highlight="together"
        description="Hiring for an AI / ML role, need a model shipped, or want to collaborate on an idea? My inbox is open."
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="flex flex-col gap-5">
          <div className="card p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 animate-pulse-dot rounded-full bg-accent" />
              <h3 className="font-display text-lg font-semibold text-fg">Currently available</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              Open to full-time AI / ML engineering and data science roles, freelance projects and research
              collaborations — on-site in Cairo or remote.
            </p>
          </div>

          <div className="card p-6 sm:p-7">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-fg-subtle">Email</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-w-0 items-center gap-2.5 text-[0.95rem] font-medium text-fg transition-colors hover:text-accent-soft sm:text-base"
              >
                <Mail size={18} className="shrink-0 text-accent" />
                <span className="truncate">{profile.email}</span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 text-fg-muted transition-colors hover:border-accent/50 hover:text-accent-soft"
                aria-label="Copy email address"
              >
                {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
              </button>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-fg-muted">
              <MapPin size={15} className="text-accent" /> {profile.location} · GMT+3
            </p>

            <p className="mt-7 border-t border-white/[0.06] pt-6 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-fg-subtle">
              Elsewhere
            </p>
            <ul className="mt-2 -mx-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-accent/20 bg-accent/[0.07] text-accent-soft">
                      {s.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-fg">{s.label}</span>
                      <span className="block truncate text-xs text-fg-muted">{s.handle}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-fg-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-soft"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="card flex h-full flex-col gap-5 p-6 sm:p-8" noValidate={false}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-fg">Name</span>
                <input name="name" required autoComplete="name" placeholder="Your name" className="input" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-fg">Email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="input" />
              </label>
            </div>
            <label className="flex flex-1 flex-col gap-2">
              <span className="text-sm font-medium text-fg">Message</span>
              <textarea
                name="message"
                required
                rows={6}
                minLength={10}
                placeholder="Tell me about the role, project or idea…"
                className="input min-h-40 flex-1 resize-y"
              />
            </label>
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div className="flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
              <AnimatePresence mode="wait">
                {status === 'sent' && (
                  <motion.p
                    key="sent"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2 text-sm text-accent-soft"
                    role="status"
                  >
                    <Check size={16} /> Thanks — your message is on its way.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-start gap-2 text-sm text-amber-300/90"
                    role="alert"
                  >
                    <CircleAlert size={16} className="mt-0.5 shrink-0" />
                    <span>
                      Couldn't send right now — please email me directly at{' '}
                      <a className="underline underline-offset-2" href={`mailto:${profile.email}`}>
                        {profile.email}
                      </a>
                      .
                    </span>
                  </motion.p>
                )}
                {(status === 'idle' || status === 'sending') && (
                  <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-fg-subtle">
                    I usually reply within a day.
                  </motion.p>
                )}
              </AnimatePresence>
              <button type="submit" disabled={status === 'sending'} className="btn btn-primary disabled:cursor-wait disabled:opacity-70">
                {status === 'sending' ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send message <Send size={17} />
                  </>
                )}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
