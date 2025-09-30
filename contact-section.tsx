"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
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

          start: "top 85%",
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div className="rounded-2xl border p-8 md:p-12 bg-card/70">
        <h2 className="text-3xl md:text-4xl font-semibold">Let’s work together</h2>
        <p className="mt-3 text-muted-foreground max-w-prose">
          Have an idea or project in mind? I’m open to freelance and collaborations. Drop me a message and I’ll get back
          to you soon.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
            <a href="mailto:hello@example.com" aria-label="Email me">
              Email me
            </a>
          </Button>
          
          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <a 
              href="https://www.linkedin.com/in/hurairashenmuemahanee/" 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-lg bg-background border overflow-hidden hover:scale-110 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
              aria-label="LinkedIn Profile"
            >
              <img 
                src="/Linkedin.svg" 
                alt="LinkedIn" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </a>
            
            <a 
              href="https://github.com/sh3nm" 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-lg bg-background border overflow-hidden hover:scale-110 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
              aria-label="GitHub Profile"
            >
              <img 
                src="/Github.svg" 
                alt="GitHub" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </a>
            
            <a 
              href="https://instagram.com/shnmsega" 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-lg bg-background border overflow-hidden hover:scale-110 hover:bg-pink-50 hover:border-pink-300 transition-all duration-200 group"
              aria-label="Instagram Profile"
            >
              <img 
                src="/Instagram.svg" 
                alt="Instagram" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
