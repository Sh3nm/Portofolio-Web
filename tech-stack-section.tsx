"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

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
  { key: "frontend" as const, title: "FRONTEND", icon: "✨" },
  { key: "backend" as const, title: "BACKEND", icon: "🔧" },
  { key: "database" as const, title: "DATABASE", icon: "🗄️" },
  { key: "tools" as const, title: "TOOLS", icon: "⚙️" },
]

export default function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const categoriesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "restart none none none",
        },
      })

      // Animate categories with stagger
      gsap.from(categoriesRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.2,
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
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl">⭐</span>
          <h2 ref={titleRef} className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
            MY STACK
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, categoryIndex) => (
          <div
            key={category.key}
            ref={(el) => {
              if (el) categoriesRef.current[categoryIndex] = el
            }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-muted-foreground mb-8 tracking-wider">
              {category.title}
            </h3>
            
            <div className="flex flex-col gap-6">
              {techStack
                .filter((tech) => tech.category === category.key)
                .map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-background border overflow-hidden group-hover:scale-110 transition-transform">
                      <img 
                        src={tech.icon} 
                        alt={`${tech.name} icon`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium text-sm">{tech.name}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}