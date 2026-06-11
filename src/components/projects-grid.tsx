"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SectionHeading from "@/components/section-heading"

const ease = [0.16, 1, 0.3, 1] as const

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
      "A company profile website created for a cleaning service business. The frontend is built using HTML, CSS, and JavaScript, while the backend is implemented with PHP to handle data processing and contact form submissions.",
    href: "https://cleaning-service-blond.vercel.app/",
    imageAlt: "Web Cleaning Service",
    image: "/projects/okclean.png",
    tags: ["HTML/CSS", "JavaScript", "PHP"],
  },
  {
    title: "Brain Tumor Detection",
    description:
      "Detecting and classifying brain tumor types from MRI images using deep learning techniques, with YOLO-format annotations for object detection and classification.",
    href: "https://huggingface.co/spaces/cashewwww/Brain-Tumor",
    imageAlt: "Brain Tumor Detection",
    image: "/projects/braintumor-detection.png",
    tags: ["Deep Learning", "YOLO", "Python"],
  },
]

export default function ProjectsGrid() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const previewRef = useRef<HTMLDivElement | null>(null)
  const quickX = useRef<gsap.QuickToFunc | null>(null)
  const quickY = useRef<gsap.QuickToFunc | null>(null)
  const quickRot = useRef<gsap.QuickToFunc | null>(null)
  const lastX = useRef(0)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (previewRef.current) {
        gsap.set(previewRef.current, { xPercent: -50, yPercent: -50, scale: 0.9, opacity: 0 })
        quickX.current = gsap.quickTo(previewRef.current, "x", { duration: 0.5, ease: "power3" })
        quickY.current = gsap.quickTo(previewRef.current, "y", { duration: 0.5, ease: "power3" })
        quickRot.current = gsap.quickTo(previewRef.current, "rotation", { duration: 0.4, ease: "power2" })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    quickX.current?.(e.clientX)
    quickY.current?.(e.clientY)
    // tilt the preview by horizontal cursor velocity
    const delta = e.clientX - lastX.current
    lastX.current = e.clientX
    quickRot.current?.(Math.max(-8, Math.min(8, delta * 0.5)))
  }

  const showPreview = (idx: number, e: React.MouseEvent) => {
    // first hover: place the preview at the cursor instead of tweening from afar
    if (hovered === null && previewRef.current) {
      gsap.set(previewRef.current, { x: e.clientX, y: e.clientY })
      lastX.current = e.clientX
    }
    setHovered(idx)
    gsap.to(previewRef.current, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" })
  }

  const hidePreview = () => {
    setHovered(null)
    gsap.to(previewRef.current, { scale: 0.9, opacity: 0, duration: 0.3, ease: "power3.out" })
    quickRot.current?.(0)
  }

  return (
    <div ref={sectionRef} className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading index="04" label="Work" title="Selected Projects" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          ({String(projects.length).padStart(2, "0")}) projects
        </span>
      </div>

      {/* ── Desktop: typographic rows + cursor-following preview ─────── */}
      <div className="mt-12 hidden md:block" onMouseMove={handleMouseMove} onMouseLeave={hidePreview}>
        <div className="border-t">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
            >
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${p.title}`}
              onMouseEnter={(e) => showPreview(i, e)}
              className={
                "group flex items-center justify-between gap-8 border-b py-8 transition-opacity duration-300 " +
                (hovered !== null && hovered !== i ? "opacity-30" : "")
              }
            >
              <div className="flex min-w-0 items-baseline gap-6">
                <span className="shrink-0 font-mono text-sm text-teal-500/70">
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3
                    className={
                      "truncate text-2xl font-semibold tracking-tight transition-colors duration-300 lg:text-4xl " +
                      (hovered === i ? "text-teal-400" : "")
                    }
                  >
                    {p.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <svg
                className={
                  "h-8 w-8 shrink-0 text-teal-400 transition-all duration-300 " +
                  (hovered === i ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0")
                }
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" />
                <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" />
              </svg>
            </a>
            </motion.div>
          ))}
        </div>

        {/* floating preview that chases the cursor */}
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-50 h-[220px] w-[340px] overflow-hidden rounded-xl border bg-card shadow-[0_16px_48px_rgba(13,148,136,0.25)]"
        >
          {projects.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={p.title}
              src={p.image}
              alt=""
              className={
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-300 " +
                (hovered === i ? "opacity-100" : "opacity-0")
              }
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-teal-300">
              {hovered !== null ? projects[hovered].description.slice(0, 80) + "…" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* ── Mobile: compact cards ─────────────────────────────────────── */}
      <div className="mt-10 flex flex-col gap-5 md:hidden">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease, delay: i * 0.05 }}
          >
          <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${p.title}`}
            className="group block overflow-hidden rounded-xl border bg-card/60 backdrop-blur"
          >
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.imageAlt} className="h-44 w-full object-cover" />
              <span className="absolute left-3 top-3 font-mono text-xs tracking-[0.3em] text-teal-300">
                /{String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-medium leading-snug">{p.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-teal-500/30 bg-teal-500/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-teal-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
