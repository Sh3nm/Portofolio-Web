"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

type Project = {
  title: string
  description: string
  href: string
  imageAlt: string
}

const projects: Project[] = [
  {
    title: "Evermos E-commerce Golang API",
    description: "Creating Evermos ecommerce backend using Go, Gorm, Fiber and MySQL.",
    href: "https://github.com/Sh3nm/Evermos_GolangAPI",
    imageAlt: "Postman Overview",
  },
  {
    title: "Jadwal Sholat Web App",
    description: "A web app for displaying daily Islamic prayer times based on the user's location. Developed using Next.js and Tailwind CSS and integrate with external API",
    href: "https://waktu-sholat-bice.vercel.app/",
    imageAlt: "Jadwal Sholat",
  },
  {
    title: "OKCLEAN - Web Cleaning Service Company Profile",
    description: "A company profile website created for a cleaning service business. The frontend is built using HTML, CSS, and JavaScript, while the backend is implemented with PHP to handle data processing and contact form submissions. Designed to provide customers with clear information about services, pricing, and business details.",
    href: "https://cleaning-service-blond.vercel.app/",
    imageAlt: "Web Cleaning Service",
  },
  {
    title: "Brain Tumor Detection",
    description: "This project focuses on detecting and classifying brain tumor types from MRI images using deep learning techniques. The dataset is annotated in YOLO format and supports two primary tasks: identifying the location of the tumor through object detection, and classifying the tumor",
    href: "https://huggingface.co/spaces/cashewwww/Brain-Tumor",
    imageAlt: "Brain Tumor Detection",
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
        // on-scroll reveal
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
      boxShadow: entering ? "0 10px 24px rgba(13,148,136,0.18)" : "0 1px 0 rgba(0,0,0,0.05)",
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 600,
    })
  }

  return (
    <div ref={sectionRef} className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-semibold">Selected Projects</h2>
        <Button
          className="hidden md:inline-flex bg-teal-600 hover:bg-teal-700 text-white"
        >
          View All
        </Button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Card
            key={p.title}
            ref={(el) => {
              if (el) cardsRef.current[i] = el
            }}
            onMouseEnter={() => handleHover(i, true)}
            onMouseLeave={() => handleHover(i, false)}
            className="group overflow-hidden border bg-card/80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/.jpg?height=200&width=600&query=${encodeURIComponent(p.title + " preview")}`}
              alt={p.imageAlt}
              className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="p-4">
              <h3 className="font-medium">{p.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
              <a
                href={p.href}
                className="mt-4 inline-flex items-center text-teal-700 hover:text-teal-800"
                aria-label={`Open ${p.title}`}
              >
                Learn more
                <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
