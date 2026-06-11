"use client"

import { motion } from "framer-motion"
import { Starfield } from "@/components/starfield"

export default function StarfieldBackground() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-0 -z-10"
    >
      <Starfield
        starColor="rgba(232, 250, 247, 0.9)"
        bgColor="rgb(20, 20, 20)"
        speed={0.6}
        quantity={420}
        mouseAdjust
        easing={20}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 10% -10%, rgba(13,148,136,0.18), transparent 60%), radial-gradient(1200px 600px at 100% 10%, rgba(245,158,11,0.10), transparent 60%)",
        }}
      />
    </motion.div>
  )
}
