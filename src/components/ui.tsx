import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.21, 0.61, 0.35, 1] as const

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string } & Omit<
  HTMLMotionProps<'div'>,
  'children'
>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.65, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
}: {
  eyebrow: string
  title: string
  highlight?: string
  description?: string
  align?: 'center' | 'left'
}) {
  const alignCls = align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start'
  return (
    <Reveal className={`mb-12 flex max-w-2xl flex-col gap-4 md:mb-16 ${alignCls}`}>
      <span className="eyebrow inline-flex items-center gap-3">
        <span className="h-px w-6 bg-accent/60" />
        {eyebrow}
        <span className="h-px w-6 bg-accent/60" />
      </span>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {description && <p className="text-base leading-relaxed text-fg-muted md:text-lg">{description}</p>}
    </Reveal>
  )
}

export function Section({
  id,
  children,
  className = '',
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`relative py-20 md:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
