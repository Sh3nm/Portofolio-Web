"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SectionHeading from "@/components/section-heading"

gsap.registerPlugin(ScrollTrigger)

interface TechStackItem {
  name: string
  icon: string
  category: "frontend" | "backend" | "database" | "tools"
}

const techStack: TechStackItem[] = [
  // Frontend
  { name: "JavaScript", icon: "/js.png", category: "frontend" },
  { name: "TypeScript", icon: "/Typescript.png", category: "frontend" },
  { name: "React", icon: "/React.svg", category: "frontend" },
  { name: "Next.js", icon: "/next.png", category: "frontend" },
  { name: "Tailwind CSS", icon: "/tailwind.png", category: "frontend" },
  { name: "Gsap", icon: "/gsap.png", category: "frontend" },

  // Backend
  { name: "Golang", icon: "/Golang.png", category: "backend" },
  { name: "NestJS", icon: "/nest.svg", category: "backend" },
  { name: "Fiber", icon: "/fIBER.webp", category: "backend" },

  // Database
  { name: "MySQL", icon: "/mysql.svg", category: "database" },
  { name: "PostgreSQL", icon: "/postgreSQL.png", category: "database" },
  { name: "Prisma", icon: "/prisma.png", category: "database" },

  // Tools
  { name: "Git", icon: "/git.png", category: "tools" },
  { name: "Postman", icon: "/Postman Logo.png", category: "tools" },
]

const categoryLabels: Record<TechStackItem["category"], string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  tools: "Tools",
}

// Three orbits: tools hug the core, backend + database mid, frontend outer
const rings: { radius: number; duration: number; items: TechStackItem[] }[] = [
  { radius: 90, duration: 40, items: techStack.filter((t) => t.category === "tools") },
  {
    radius: 180,
    duration: 60,
    items: techStack.filter((t) => t.category === "backend" || t.category === "database"),
  },
  { radius: 270, duration: 80, items: techStack.filter((t) => t.category === "frontend") },
]

export default function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const pulseRef = useRef<HTMLDivElement | null>(null)
  const ringRefs = useRef<(HTMLDivElement | null)[]>([])
  const ringTweens = useRef<gsap.core.Tween[][]>([])
  const [hovered, setHovered] = useState<TechStackItem | null>(null)

  useEffect(() => {
    const mm = gsap.matchMedia(sectionRef)

    mm.add("all", () => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "restart none none none",
        },
      })
    })

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      // stage zooms in once it scrolls into view
      gsap.from(stageRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top 75%",
          toggleActions: "restart none none none",
        },
      })

      // heartbeat pulse behind the core
      gsap.to(pulseRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 2.4,
        repeat: -1,
        ease: "sine.out",
      })

      // orbits: ring rotates, icons counter-rotate to stay upright
      ringRefs.current.forEach((ringEl, i) => {
        if (!ringEl) return
        const dir = i % 2 === 0 ? 1 : -1
        const icons = ringEl.querySelectorAll(".orbit-icon")
        ringTweens.current[i] = [
          gsap.to(ringEl, { rotation: 360 * dir, duration: rings[i].duration, repeat: -1, ease: "none" }),
          gsap.to(icons, { rotation: -360 * dir, duration: rings[i].duration, repeat: -1, ease: "none" }),
        ]
      })

      return () => {
        ringTweens.current = []
      }
    })

    mm.add("(max-width: 767px)", () => {
      const tiles = gsap.utils.toArray<HTMLElement>(".stack-tile", sectionRef.current ?? undefined)
      gsap.from(tiles, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "restart none none none",
        },
      })
    })

    return () => mm.revert()
  }, [])

  const setRingSpeed = (ringIdx: number, paused: boolean) => {
    ringTweens.current[ringIdx]?.forEach((tween) => {
      gsap.to(tween, { timeScale: paused ? 0 : 1, duration: 0.6, ease: "power2.out" })
    })
  }

  return (
    <div ref={sectionRef} className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div ref={headingRef}>
        <SectionHeading index="03" label="Stack" title="Tools of the Trade" align="center" />
      </div>

      {/* ── Desktop: orbital constellation ───────────────────────────── */}
      <div className="hidden md:block">
        <div ref={stageRef} className="relative mx-auto mt-16 h-[600px] w-[600px]">
          {/* core */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div
              ref={pulseRef}
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-teal-500/20"
            />
            <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border border-teal-500/40 bg-card/70 text-center shadow-[0_0_40px_rgba(13,148,136,0.25)] backdrop-blur">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hovered ? hovered.name : "default"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="px-2"
                >
                  {hovered ? (
                    <>
                      <p className="text-sm font-semibold leading-tight">{hovered.name}</p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-teal-400">
                        {categoryLabels[hovered.category]}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-semibold tracking-tight">Shen</p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                        Tech Stack
                      </p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {rings.map((ring, ringIdx) => (
            <div
              key={ringIdx}
              ref={(el) => {
                ringRefs.current[ringIdx] = el
              }}
              className="absolute rounded-full border border-teal-500/15"
              style={{
                width: ring.radius * 2,
                height: ring.radius * 2,
                left: `calc(50% - ${ring.radius}px)`,
                top: `calc(50% - ${ring.radius}px)`,
              }}
            >
              {ring.items.map((tech, i) => {
                const angle = (i / ring.items.length) * Math.PI * 2 - Math.PI / 2
                return (
                  <div
                    key={tech.name}
                    className="absolute"
                    style={{
                      left: `${50 + Math.cos(angle) * 50}%`,
                      top: `${50 + Math.sin(angle) * 50}%`,
                    }}
                  >
                    <div className="orbit-icon -translate-x-1/2 -translate-y-1/2">
                      <button
                        type="button"
                        aria-label={`${tech.name} (${categoryLabels[tech.category]})`}
                        onMouseEnter={() => {
                          setHovered(tech)
                          setRingSpeed(ringIdx, true)
                        }}
                        onMouseLeave={() => {
                          setHovered(null)
                          setRingSpeed(ringIdx, false)
                        }}
                        className={
                          "block h-14 w-14 cursor-pointer overflow-hidden rounded-xl border bg-card/80 p-2 backdrop-blur transition-all duration-300 hover:scale-125 hover:border-teal-500/60 hover:shadow-[0_0_24px_rgba(13,148,136,0.4)] " +
                          (hovered && hovered.name !== tech.name ? "opacity-40" : "")
                        }
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={tech.icon} alt="" className="h-full w-full rounded-md object-cover" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* legend */}
        <div className="mt-12 flex items-center justify-center gap-8">
          {(Object.keys(categoryLabels) as TechStackItem["category"][]).map((cat) => (
            <span
              key={cat}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
            >
              <span className="text-teal-400">{techStack.filter((t) => t.category === cat).length}</span>{" "}
              {categoryLabels[cat]}
            </span>
          ))}
        </div>
      </div>

      {/* ── Mobile / fallback: compact grid ──────────────────────────── */}
      <div className="mt-12 grid grid-cols-2 gap-3 md:hidden">
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="stack-tile flex items-center gap-3 rounded-xl border bg-card/50 p-3 backdrop-blur"
          >
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border bg-background p-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tech.icon} alt="" className="h-full w-full rounded-sm object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium leading-tight">{tech.name}</p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {categoryLabels[tech.category]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
