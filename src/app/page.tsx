"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Preloader from "@/components/ui/preloader"
import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"
import ExperienceSection from "@/components/experience-section"
import TechStackSection from "@/components/tech-stack-section"
import ProjectsGrid from "@/components/projects-grid"
import ContactSection from "@/components/contact-section"

const navItems = [
  { href: "#about", label: "About", index: "01" },
  { href: "#experience", label: "Journey", index: "02" },
  { href: "#tech-stack", label: "Stack", index: "03" },
  { href: "#projects", label: "Work", index: "04" },
  { href: "#contact", label: "Contact", index: "05" },
]

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <main className="min-h-dvh">
        <header className="fixed inset-x-0 top-4 z-40 px-4">
          <div className="mx-auto flex max-w-3xl items-center justify-between rounded-full border bg-background/60 py-2 pl-5 pr-2 backdrop-blur supports-[backdrop-filter]:bg-background/50">
            <Link href="#hero" className="flex items-center gap-2 font-semibold tracking-tight">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(13,148,136,0.8)]" />
              Shenmue
            </Link>
            <nav className="hidden items-center gap-5 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-teal-400"
                >
                  <span className="mr-1 text-teal-500/70">{item.index}</span>
                  <span className="underline-offset-4 group-hover:underline">{item.label}</span>
                </a>
              ))}
            </nav>
            <Button asChild size="sm" className="rounded-full bg-teal-600 text-white hover:bg-teal-700">
              <a href="#contact" aria-label="Go to contact">
                Hire Me
              </a>
            </Button>
          </div>
        </header>

        <section id="hero" aria-label="Hero">
          <Hero />
        </section>

        <section id="about" aria-label="About">
          <AboutSection />
        </section>

        <section id="experience" aria-label="Experience">
          <ExperienceSection />
        </section>

        <section id="tech-stack" aria-label="Tech Stack">
          <TechStackSection />
        </section>

        <section id="projects" aria-label="Projects">
          <ProjectsGrid />
        </section>

        <section id="contact" aria-label="Contact">
          <ContactSection />
        </section>

        <footer className="border-t">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Shen <span className="text-teal-500">✦</span> Surabaya, ID
            </p>
            <p>Next.js / Tailwind / GSAP</p>
            <a href="#hero" className="transition-colors hover:text-teal-400" aria-label="Back to top">
              Back to top ↑
            </a>
          </div>
        </footer>
      </main>
    </>
  )
}
