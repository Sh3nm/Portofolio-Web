"use client"

import { useEffect, useRef } from "react"
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

const categories = [
  { key: "frontend" as const, title: "Frontend", code: "FE" },
  { key: "backend" as const, title: "Backend", code: "BE" },
  { key: "database" as const, title: "Database", code: "DB" },
  { key: "tools" as const, title: "Tools", code: "TL" },
]

export default function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLDivElement | null>(null)
  const categoriesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "restart none none none",
        },
      })

      gsap.from(categoriesRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "restart none none none",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div ref={headingRef}>
        <SectionHeading index="03" label="Stack" title="Tools of the Trade" />
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, categoryIndex) => (
          <div
            key={category.key}
            ref={(el) => {
              if (el) categoriesRef.current[categoryIndex] = el
            }}
            className="group/panel relative overflow-hidden rounded-xl border bg-card/40 p-5 backdrop-blur transition-colors duration-300 hover:border-teal-500/50"
          >
            <span
              aria-hidden="true"
              className="text-stroke-faint pointer-events-none absolute -right-2 -top-4 select-none text-7xl font-bold tracking-tighter"
            >
              {category.code}
            </span>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-teal-400">0{categoryIndex + 1}</span>
              <h3 className="font-medium uppercase tracking-[0.2em]">{category.title}</h3>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              {techStack
                .filter((tech) => tech.category === category.key)
                .map((tech) => (
                  <div
                    key={tech.name}
                    className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-teal-500/30 hover:bg-teal-500/5"
                  >
                    <div className="h-9 w-9 overflow-hidden rounded-lg border bg-background transition-transform group-hover:scale-110">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={tech.icon} alt={`${tech.name} icon`} className="h-full w-full object-cover" />
                    </div>
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
