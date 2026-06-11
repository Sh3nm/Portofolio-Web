"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1] as const

const marqueeItems = [
  "Full Stack Developer",
  "React",
  "Next.js",
  "TypeScript",
  "Golang",
  "NestJS",
  "PostgreSQL",
  "GSAP",
]

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const indicatorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(indicatorRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 1.2,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className={cn("relative", "isolate", "min-h-[88dvh] md:min-h-[92dvh]", "flex flex-col justify-center")}
    >
      {/* ghost backdrop word */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 -z-10 hidden select-none overflow-hidden text-center md:block"
      >
        <span className="text-stroke-faint whitespace-nowrap text-[18vw] font-bold leading-none tracking-tighter">
          SHENMUE
        </span>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:py-28">
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
              className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-teal-400"
            >
              <span>Portfolio {new Date().getFullYear()}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
              className="mt-6 text-pretty text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
            >
              Hi, I&apos;m Shen.
              <span className="mt-2 block bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent">
                Full Stack
              </span>
              <span className="text-stroke-teal block">Developer</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.25 }}
              className="mt-6 max-w-prose text-balance text-muted-foreground"
            >
              I craft performant web experiences blending motion and clarity. I love building clean interfaces with
              delightful micro-interactions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.4 }}
              className="mt-8 flex items-center gap-3"
            >
              <Button
                className="bg-teal-600 text-white shadow-[0_0_24px_rgba(13,148,136,0.35)] hover:bg-teal-700"
                asChild
              >
                <a href="#projects" aria-label="See projects">
                  See Projects
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-teal-500/60 bg-transparent text-teal-300 hover:bg-teal-500/10"
              >
                <a href="#contact" aria-label="Get in touch">
                  Get in touch
                </a>
              </Button>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.55 }}
              className="mt-12 grid max-w-md grid-cols-3 gap-3 border-t pt-6"
            >
              {[
                ["04+", "Projects shipped"],
                ["14", "Technologies"],
                ["3rd", "Year CS @ ITS"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-2xl font-semibold text-teal-400 md:text-3xl">{value}</dd>
                  <dd className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.2 }}
            className="md:col-span-5"
          >
            <div className="relative">
              {/* rotated echo frame */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -rotate-3 rounded-xl border-2 border-teal-500/40"
              />
              <div
                aria-hidden="true"
                className="absolute -inset-6 -z-10 rounded-full bg-teal-500/10 blur-3xl"
              />
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-card/40 backdrop-blur">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Profile.jpg" alt="Portrait" className="h-full w-full object-cover" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"
                />
              </div>
              <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                /// Huraira Shenmue Mahanee
              </p>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 md:bottom-24">
          <div ref={indicatorRef} className="flex flex-col items-center text-xs text-muted-foreground">
            <span>Scroll</span>
            <svg width="20" height="28" viewBox="0 0 20 28" aria-hidden="true" className="mt-1">
              <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" fill="none" />
              <circle cx="10" cy="8" r="2" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {/* skills marquee */}
      <div className="border-y bg-card/30 backdrop-blur">
        <div className="flex overflow-hidden" aria-hidden="true">
          <div className="animate-marquee flex shrink-0 items-center gap-8 py-3 pr-8">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-8 whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
              >
                {item}
                <span className="text-teal-500">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
