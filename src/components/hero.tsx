"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const subtitleRef = useRef<HTMLParagraphElement | null>(null)
  const ctaRef = useRef<HTMLDivElement | null>(null)
  const indicatorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      })

      // scroll indicator subtle bounce loop
      gsap.to(indicatorRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 1.2,
      })

      // background parallax on scroll
      if (rootRef.current) {
        gsap.to(rootRef.current, {
          backgroundPositionY: "40%",
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
                      toggleActions: "restart none none none",

            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      }
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className={cn("relative", "isolate", "min-h-[88dvh] md:min-h-[92dvh]", "flex items-center")}
      style={{
        backgroundImage:
          "radial-gradient(1200px 600px at 10% -10%, rgba(13,148,136,0.18), transparent 60%), radial-gradient(1200px 600px at 100% 10%, rgba(245,158,11,0.14), transparent 60%)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 w-full">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10 items-center">
          <div className="md:col-span-7">
            <h1 ref={titleRef} className="text-pretty text-4xl md:text-6xl font-semibold leading-tight">
              Hi, I&apos;m Shen.
              <span className="block text-teal-600">Full Stack Developer</span>
            </h1>
            <p ref={subtitleRef} className="mt-4 max-w-prose text-balance text-muted-foreground">
              I craft performant web experiences blending motion and clarity. I love building clean interfaces with
              delightful micro-interactions.
            </p>
            <div ref={ctaRef} className="mt-8 flex items-center gap-3">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white" asChild>
                <a href="#projects" aria-label="See projects">
                  See Projects
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-teal-600 text-teal-700 hover:bg-teal-50 bg-transparent"
              >
                <a href="#contact" aria-label="Get in touch">
                  Get in touch
                </a>
              </Button>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="aspect-square w-full rounded-xl border bg-card/60 backdrop-blur overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Profile.jpg"
                alt="Portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute left-1/2 bottom-6 -translate-x-1/2 pointer-events-none">
          <div ref={indicatorRef} className="flex flex-col items-center text-xs text-muted-foreground">
            <span>Scroll</span>
            <svg width="20" height="28" viewBox="0 0 20 28" aria-hidden="true" className="mt-1">
              <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" fill="none" />
              <circle cx="10" cy="8" r="2" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
