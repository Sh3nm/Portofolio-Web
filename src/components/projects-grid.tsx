"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card } from "@/components/ui/card"
import SectionHeading from "@/components/section-heading"

gsap.registerPlugin(ScrollTrigger)

type Project = {
  title: string
  description: string
  href: string
  imageAlt: string
  image: string
  tags: string[]
}

const projects: Project[] = [
  {
    title: "Evermos E-commerce Golang API",
    description: "Creating Evermos ecommerce backend using Go, Gorm, Fiber and MySQL.",
    href: "https://github.com/Sh3nm/Evermos_GolangAPI",
    imageAlt: "Postman Overview",
    image: "/projects/evermos-backend-postman.png",
    tags: ["Go", "Fiber", "MySQL"],
  },
  {
    title: "Jadwal Sholat Web App",
    description:
      "A web app for displaying daily Islamic prayer times based on the user's location. Developed using Next.js and Tailwind CSS and integrate with external API",
    href: "https://waktu-sholat-bice.vercel.app/",
    imageAlt: "Jadwal Sholat",
    image: "/projects/waktu-sholat.png",
    tags: ["Next.js", "Tailwind", "REST API"],
  },
  {
    title: "OKCLEAN - Web Cleaning Service Company Profile",
    description:
      "A company profile website created for a cleaning service business. The frontend is built using HTML, CSS, and JavaScript, while the backend is implemented with PHP to handle data processing and contact form submissions. Designed to provide customers with clear information about services, pricing, and business details.",
    href: "https://cleaning-service-blond.vercel.app/",
    imageAlt: "Web Cleaning Service",
    image: "/projects/okclean.png",
    tags: ["HTML/CSS", "JavaScript", "PHP"],
  },
  {
    title: "Brain Tumor Detection",
    description:
      "This project focuses on detecting and classifying brain tumor types from MRI images using deep learning techniques. The dataset is annotated in YOLO format and supports two primary tasks: identifying the location of the tumor through object detection, and classifying the tumor",
    href: "https://huggingface.co/spaces/cashewwww/Brain-Tumor",
    imageAlt: "Brain Tumor Detection",
    image: "/projects/braintumor-detection.png",
    tags: ["Deep Learning", "YOLO", "Python"],
  },
]

export default function ProjectsGrid() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<HTMLDivElement[] | null[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          toggleActions: "restart none none none",
          trigger: sectionRef.current,
          start: "top 80%",
        },
      })

      cardsRef.current.forEach((el, i) => {
        if (!el) return
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleHover = (idx: number, entering: boolean) => {
    const card = cardsRef.current[idx]
    if (!card) return
    gsap.to(card, {
      y: entering ? -6 : 0,
      scale: entering ? 1.02 : 1,
      rotateX: entering ? 1 : 0,
      boxShadow: entering ? "0 16px 40px rgba(13,148,136,0.25)" : "0 1px 0 rgba(0,0,0,0.05)",
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 600,
    })
  }

  return (
    <div ref={sectionRef} className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading index="04" label="Work" title="Selected Projects" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          ({String(projects.length).padStart(2, "0")}) projects
        </span>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Card
            key={p.title}
            ref={(el) => {
              if (el) cardsRef.current[i] = el
            }}
            onMouseEnter={() => handleHover(i, true)}
            onMouseLeave={() => handleHover(i, false)}
            className="group overflow-hidden border bg-card/60 backdrop-blur transition-colors duration-300 hover:border-teal-500/50"
          >
            <div className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.imageAlt}
                className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"
              />
              <span className="absolute left-4 top-3 font-mono text-xs uppercase tracking-[0.3em] text-teal-300">
                /{String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-medium leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-teal-500/30 bg-teal-500/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-teal-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center font-mono text-xs uppercase tracking-[0.2em] text-teal-400 transition-colors hover:text-teal-300"
                aria-label={`Open ${p.title}`}
              >
                View project
                <svg
                  className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" />
                </svg>
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
