"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SectionHeading from "@/components/section-heading"

gsap.registerPlugin(ScrollTrigger)

type Experience = {
  company: string
  role: string
  period: string
  current?: boolean
  points: string[]
}

const experiences: Experience[] = [
  {
    company: "Pupuk Kalimantan Timur",
    role: "Software Engineer Intern",
    period: "Jan 2026 - Present",
    current: true,
    points: [
      "Led the development of a full-scale Asset Management System, covering business workflow modeling, database schema design, and system architecture. Built using Laravel and PHP, the system supports 100+ active users and manages more than 500+ assets.",
    ],
  },
  {
    company: "Flexoo Software House",
    role: "Freelance Back End Developer",
    period: "Oct 2025 - Present",
    current: true,
    points: [
      "Building and maintaining server-side features for client websites using Go, GORM, MySQL, and JWT. Developed secure APIs, optimized database interactions, and implemented authentication systems to support scalable and reliable web applications.",
    ],
  },
  {
    company: "Evermos",
    role: "Back End Developer Intern",
    period: "Sep 2025 - Oct 2025",
    points: [
      "Developed and maintained backend services for an e-commerce platform using Go, Fiber, and GORM, supporting scalable and reliable business operations.",
      "Designed and optimized relational database schemas and queries, improving data management efficiency and system performance.",
      "Built RESTful APIs and backend functionalities following software engineering best practices to support future product growth.",
      "Applied problem-solving and debugging techniques to identify and resolve backend issues, enhancing application stability and user experience.",
    ],
  },
  {
    company: "Schematics ITS",
    role: "Head of Partnerships Division",
    period: "Jan 2025 - Dec 2025",
    points: [
      "Led a team to establish and manage partnerships with various organizations to support media collaborations and event publicity.",
      "Contacted and negotiated with 30+ external partners for media publication.",
      "Managed communication and maintained professional relationships with stakeholders.",
      "Coordinated partnership strategies to maximize event exposure and audience reach.",
      "Supervised 12 team members to ensure timely execution of partnership activities.",
    ],
  },
]

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const ghostRef = useRef<HTMLSpanElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  useEffect(() => {
    const mm = gsap.matchMedia(sectionRef)

    // Desktop: pin the section and scrub the track horizontally
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const track = trackRef.current
      if (!track) return

      const distance = () => track.scrollWidth - (track.parentElement?.clientWidth ?? 0)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(experiences.length - 1, Math.round(self.progress * (experiences.length - 1)))
            if (idx !== activeRef.current) {
              activeRef.current = idx
              setActive(idx)
            }
          },
        },
      })

      tl.to(track, { x: () => -distance(), ease: "none" }, 0)
      if (ghostRef.current) tl.to(ghostRef.current, { xPercent: -20, ease: "none" }, 0)
      if (progressRef.current) tl.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0)
    })

    // Mobile / reduced motion: simple vertical reveals
    mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".experience-card", sectionRef.current ?? undefined)
      cards.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        })
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={sectionRef} className="relative overflow-hidden md:min-h-dvh">
      {/* parallax ghost word */}
      <span
        ref={ghostRef}
        aria-hidden="true"
        className="text-stroke-faint pointer-events-none absolute left-4 top-12 -z-10 hidden select-none whitespace-nowrap text-[16vw] font-bold leading-none tracking-tighter md:block"
      >
        THE PATH SO FAR
      </span>

      <div className="mx-auto flex max-w-6xl flex-col px-4 py-20 md:min-h-dvh md:justify-center md:py-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading index="02" label="Journey" title="Experience" />
          <div className="hidden items-baseline gap-1 font-mono text-sm md:flex" aria-hidden="true">
            <span className="text-2xl font-semibold text-teal-400">{String(active + 1).padStart(2, "0")}</span>
            <span className="text-muted-foreground">/ {String(experiences.length).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="mt-10 md:mt-14 md:overflow-visible">
          <div ref={trackRef} className="flex flex-col gap-6 md:w-max md:flex-row md:gap-8">
            {experiences.map((exp, i) => (
              <article
                key={exp.company}
                className={
                  "experience-card group relative shrink-0 overflow-hidden rounded-xl border bg-card/60 p-6 backdrop-blur transition-colors duration-300 md:w-[560px] md:p-8 " +
                  (i === active ? "md:border-teal-500/50 md:shadow-[0_0_40px_rgba(13,148,136,0.12)]" : "")
                }
              >
                <span
                  aria-hidden="true"
                  className="text-stroke-faint pointer-events-none absolute -right-1 -top-5 select-none text-8xl font-bold tracking-tighter"
                >
                  /{String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {exp.period}
                  {exp.current && (
                    <span className="rounded-md border border-teal-500/30 bg-teal-500/5 px-2 py-0.5 text-[10px] tracking-widest text-teal-300">
                      Now
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-xl font-medium leading-snug md:text-2xl">{exp.role}</h3>
                <p className="mt-1 text-lg font-medium text-teal-400">@ {exp.company}</p>

                {exp.points.length === 1 ? (
                  <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">{exp.points[0]}</p>
                ) : (
                  <ul className="mt-4 flex flex-col gap-2">
                    {exp.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span
                          aria-hidden="true"
                          className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-teal-500/70"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* scrub progress bar (desktop) */}
        <div className="mt-10 hidden items-center gap-4 md:flex">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
          <div className="relative h-px flex-1 bg-border">
            <div ref={progressRef} className="absolute inset-0 origin-left bg-teal-500" />
          </div>
          <svg className="h-4 w-4 text-teal-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  )
}
