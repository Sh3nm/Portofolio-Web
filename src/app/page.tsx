import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"
import TechStackSection from "@/components/tech-stack-section"
import ProjectsGrid from "@/components/projects-grid"
import ContactSection from "@/components/contact-section"

export const metadata: Metadata = {
  title: "Portfolio — Your Name",
  description: "Personal website built with Next.js, Tailwind, and GSAP.",
}

export default function Page() {
  return (
    <main className="min-h-dvh">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="#hero" className="font-semibold text-balance">
            Shenmue
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <a href="#about" className="text-sm hover:underline underline-offset-4">
              About
            </a>
            <a href="#tech-stack" className="text-sm hover:underline underline-offset-4">
              Tech Stack
            </a>
            <a href="#projects" className="text-sm hover:underline underline-offset-4">
              Projects
            </a>
            <a href="#contact" className="text-sm hover:underline underline-offset-4">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
              <a href="#contact" aria-label="Go to contact">
                Hire Me
              </a>
            </Button>
          </div>
        </div>
      </header>

      <section id="hero" aria-label="Hero">
        <Hero />
      </section>

      <section id="about" aria-label="About">
        <AboutSection />
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
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground flex items-center justify-between">
          <p>&copy; {new Date().getFullYear()} Shen</p>
          <p>Built with Next.js, Tailwind, and GSAP</p>
        </div>
      </footer>
    </main>
  )
}
