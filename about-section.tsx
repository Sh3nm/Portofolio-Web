"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

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
    <div ref={sectionRef} className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">About Me</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          I'm Huraira Shenmue Mahanee, a 3rd Year Computer Science student at Institut Teknologi Sepuluh Nopember.
          I'm eager to contribute to meaningful projects and grow through collaboration.
        </p>
      </div>
    </div>
  )
}