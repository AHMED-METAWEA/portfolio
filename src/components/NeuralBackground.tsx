import { useEffect, useRef } from 'react'

/**
 * Subtle animated "neural network" backdrop: drifting nodes that link
 * when close. Fixed behind the page, pauses when the tab is hidden and
 * renders a single static frame for users who prefer reduced motion.
 */
export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let running = true
    let started = false
    const mouse = { x: -9999, y: -9999 }

    type Node = { x: number; y: number; vx: number; vy: number; r: number }
    let nodes: Node[] = []

    const LINK = 140

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(80, Math.max(18, Math.floor((width * height) / 17000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LINK) {
            const alpha = (1 - d / LINK) * 0.16
            ctx.strokeStyle = `rgba(94, 234, 212, ${alpha})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        const glow = md < 160 ? 1 - md / 160 : 0
        ctx.fillStyle = `rgba(${glow > 0 ? '94, 234, 212' : '160, 180, 200'}, ${0.35 + glow * 0.55})`
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r + glow * 1.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = () => {
      if (!running) return
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < -20) n.x = width + 20
        if (n.x > width + 20) n.x = -20
        if (n.y < -20) n.y = height + 20
        if (n.y > height + 20) n.y = -20
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    const onResize = () => {
      init()
      if (reduced) draw()
    }
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!reduced && started) {
        running = true
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(step)
      }
    }

    init()
    // Start after the page has settled so the animation never competes with first paint.
    const start = () => {
      started = true
      if (reduced) draw()
      else if (running && !document.hidden) raf = requestAnimationFrame(step)
    }
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
    const startTimer = window.setTimeout(() => {
      if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 1500 })
      else start()
    }, 900)

    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      running = false
      window.clearTimeout(startTimer)
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-950" />
      <div className="absolute -top-40 left-1/2 h-[42rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.13),transparent)]" />
      <div className="absolute -right-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.07),transparent)]" />
      <div className="absolute -left-48 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.06),transparent)]" />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,7,11,0.7)_100%)]" />
    </div>
  )
}
