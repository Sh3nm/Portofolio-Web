"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SectionHeading from "@/components/section-heading"

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)

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
          start: "top 80%",
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-8 -z-10 select-none overflow-hidden"
      >
        <span className="text-stroke-faint text-[14vw] font-bold leading-none tracking-tighter">ABOUT</span>
      </div>

      <SectionHeading index="01" label="About" title="Who I Am" align="center" />

      <div className="mx-auto mt-10 max-w-4xl text-center">
        <p className="text-pretty text-2xl font-medium leading-relaxed md:text-4xl md:leading-snug">
          I&apos;m <span className="text-teal-400">Huraira Shenmue Mahanee</span>, a 3rd year Computer Science student
          at <span className="text-teal-400">Institut Teknologi Sepuluh Nopember</span>. I&apos;m eager to contribute
          to meaningful projects and grow through{" "}
          <span className="text-stroke-teal font-semibold">collaboration</span>.
        </p>
      </div>
    </div>
  )
}
