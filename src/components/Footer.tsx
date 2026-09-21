import { ArrowUp, Mail } from 'lucide-react'
import { navLinks, profile } from '../data/portfolio'
import { GithubIcon, KaggleIcon, LinkedinIcon } from './BrandIcons'
import { Logo } from './Navbar'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Logo />
            <p className="text-sm text-fg-muted">{profile.title} · {profile.location}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-sm text-fg-muted transition-colors hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            {[
              { href: profile.github, label: 'GitHub', icon: <GithubIcon size={17} /> },
              { href: profile.linkedin, label: 'LinkedIn', icon: <LinkedinIcon size={16} /> },
              { href: profile.kaggle, label: 'Kaggle', icon: <KaggleIcon size={15} /> },
              { href: `mailto:${profile.email}`, label: 'Email', icon: <Mail size={17} /> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-fg-muted transition-colors hover:border-accent/50 hover:text-accent-soft"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-sm text-fg-subtle sm:flex-row">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-accent-soft">
            Back to top <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  )
}
