"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const socials = [
  { href: "https://www.linkedin.com/in/hurairashenmuemahanee/", icon: "/Linkedin.svg", label: "LinkedIn Profile" },
  { href: "https://github.com/sh3nm", icon: "/Github.svg", label: "GitHub Profile" },
  { href: "https://instagram.com/shnmsega", icon: "/Instagram.svg", label: "Instagram Profile" },
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  // Assembled at click time so the address never appears in the page or static HTML
  const handleEmail = () => {
    window.location.href = "mailto:" + ["shnmsega", "gmail.com"].join("@")
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          toggleActions: "restart none none none",
          start: "top 85%",
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div className="relative overflow-hidden rounded-2xl border bg-card/60 p-8 backdrop-blur md:p-14">
        {/* teal glow + ghost word */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="text-stroke-faint pointer-events-none absolute -bottom-6 right-4 select-none text-[10rem] font-bold leading-none tracking-tighter md:text-[14rem]"
        >
          HEY
        </span>

        <div className="relative">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-teal-400">
            <span>05</span>
            <span>Contact</span>
          </div>

          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Let&apos;s build
            <span className="text-stroke-teal block">something great</span>
          </h2>

          <p className="mt-4 max-w-prose text-pretty text-muted-foreground">
            Have an idea or project in mind? I&apos;m open to freelance and collaborations. Drop me a message and
            I&apos;ll get back to you soon.
          </p>

          <button
            type="button"
            onClick={handleEmail}
            aria-label="Email me"
            className="group mt-8 inline-flex cursor-pointer items-center gap-3 text-xl font-medium text-teal-400 underline decoration-teal-500/40 underline-offset-8 transition-colors hover:text-teal-300 hover:decoration-teal-400 md:text-3xl"
          >
            Send me an email
            <svg
              className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-8 md:w-8"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" />
              <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <div className="mt-10 flex items-center gap-4 border-t pt-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Elsewhere
            </span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group h-10 w-10 overflow-hidden rounded-lg border bg-background transition-all duration-200 hover:scale-110 hover:border-teal-500/50 hover:shadow-[0_0_16px_rgba(13,148,136,0.3)]"
                aria-label={s.label}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.icon}
                  alt={s.label}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
