"use client"

import { useEffect, useRef } from "react"

type Star = [number, number, number, number, number, number, number, boolean]

export interface StarfieldProps {
  starColor?: string
  bgColor?: string
  mouseAdjust?: boolean
  tiltAdjust?: boolean
  easing?: number
  clickToWarp?: boolean
  hyperspace?: boolean
  warpFactor?: number
  opacity?: number
  speed?: number
  quantity?: number
}

export function Starfield({
  starColor = "rgba(255,255,255,1)",
  bgColor = "rgba(0,0,0,1)",
  mouseAdjust = false,
  tiltAdjust = false,
  easing = 1,
  clickToWarp = false,
  hyperspace = false,
  warpFactor = 10,
  opacity = 0.1,
  speed = 1,
  quantity = 512,
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const cursor = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)
  const hyperRef = useRef(hyperspace)

  const sd = useRef({
    w: 0,
    h: 0,
    ctx: null as CanvasRenderingContext2D | null,
    cw: 0,
    ch: 0,
    x: 0,
    y: 0,
    z: 0,
    star: { colorRatio: 0, arr: [] as Star[] },
    prevTime: 0,
  })

  useEffect(() => {
    hyperRef.current = hyperspace
  }, [hyperspace])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const compSpeed = () => (hyperRef.current ? speed * warpFactor : speed)
    const fillColor = () => (hyperRef.current ? `rgba(0,0,0,${opacity})` : bgColor)
    const ratio = quantity / 2

    const measureViewport = () => {
      sd.current.w = parent.clientWidth
      sd.current.h = parent.clientHeight
      sd.current.x = Math.round(sd.current.w / 2)
      sd.current.y = Math.round(sd.current.h / 2)
      sd.current.z = (sd.current.w + sd.current.h) / 2
      sd.current.star.colorRatio = 1 / sd.current.z

      if (cursor.current.x === 0 || cursor.current.y === 0) {
        cursor.current.x = sd.current.x
        cursor.current.y = sd.current.y
      }
      if (mouse.current.x === 0 || mouse.current.y === 0) {
        mouse.current.x = cursor.current.x - sd.current.x
        mouse.current.y = cursor.current.y - sd.current.y
      }
    }

    const setupCanvas = () => {
      measureViewport()
      sd.current.ctx = canvas.getContext("2d")
      canvas.width = sd.current.w
      canvas.height = sd.current.h
      if (sd.current.ctx) {
        sd.current.ctx.fillStyle = fillColor()
        sd.current.ctx.strokeStyle = starColor
      }
    }

    const bigBang = () => {
      if (sd.current.star.arr.length !== quantity) {
        sd.current.star.arr = new Array(quantity).fill(null).map(
          () =>
            [
              Math.random() * sd.current.w * 2 - sd.current.x * 2,
              Math.random() * sd.current.h * 2 - sd.current.y * 2,
              Math.round(Math.random() * sd.current.z),
              0,
              0,
              0,
              0,
              true,
            ] as Star,
        )
      }
    }

    const resize = () => {
      const oldArr = sd.current.star.arr.map((s) => [...s] as Star)
      measureViewport()
      sd.current.cw = sd.current.ctx?.canvas.width ?? 0
      sd.current.ch = sd.current.ctx?.canvas.height ?? 0

      if (sd.current.cw !== sd.current.w || sd.current.ch !== sd.current.h) {
        sd.current.x = Math.round(sd.current.w / 2)
        sd.current.y = Math.round(sd.current.h / 2)
        sd.current.z = (sd.current.w + sd.current.h) / 2
        sd.current.star.colorRatio = 1 / sd.current.z

        const rw = sd.current.cw ? sd.current.w / sd.current.cw : 1
        const rh = sd.current.ch ? sd.current.h / sd.current.ch : 1

        if (sd.current.ctx) {
          sd.current.ctx.canvas.width = sd.current.w
          sd.current.ctx.canvas.height = sd.current.h
        }

        if (!sd.current.star.arr.length) {
          bigBang()
        } else {
          sd.current.star.arr = sd.current.star.arr.map((star, i) => {
            const newStar = [...star] as Star
            newStar[0] = oldArr[i][0] * rw
            newStar[1] = oldArr[i][1] * rh
            newStar[3] = sd.current.x + (newStar[0] / newStar[2]) * ratio
            newStar[4] = sd.current.y + (newStar[1] / newStar[2]) * ratio
            return newStar
          })
        }

        if (sd.current.ctx) {
          sd.current.ctx.fillStyle = fillColor()
          sd.current.ctx.strokeStyle = starColor
        }
      }
    }

    const update = () => {
      mouse.current.x = (cursor.current.x - sd.current.x) / easing
      mouse.current.y = (cursor.current.y - sd.current.y) / easing

      sd.current.star.arr = sd.current.star.arr.map((star) => {
        const newStar = [...star] as Star
        newStar[7] = true
        newStar[5] = newStar[3]
        newStar[6] = newStar[4]
        newStar[0] += mouse.current.x >> 4

        if (newStar[0] > sd.current.x << 1) {
          newStar[0] -= sd.current.w << 1
          newStar[7] = false
        }
        if (newStar[0] < -sd.current.x << 1) {
          newStar[0] += sd.current.w << 1
          newStar[7] = false
        }

        newStar[1] += mouse.current.y >> 4
        if (newStar[1] > sd.current.y << 1) {
          newStar[1] -= sd.current.h << 1
          newStar[7] = false
        }
        if (newStar[1] < -sd.current.y << 1) {
          newStar[1] += sd.current.h << 1
          newStar[7] = false
        }

        newStar[2] -= compSpeed()
        if (newStar[2] > sd.current.z) {
          newStar[2] -= sd.current.z
          newStar[7] = false
        }
        if (newStar[2] < 0) {
          newStar[2] += sd.current.z
          newStar[7] = false
        }

        newStar[3] = sd.current.x + (newStar[0] / newStar[2]) * ratio
        newStar[4] = sd.current.y + (newStar[1] / newStar[2]) * ratio
        return newStar
      })
    }

    const draw = () => {
      const ctx = sd.current.ctx
      if (!ctx) return
      ctx.fillStyle = fillColor()
      ctx.fillRect(0, 0, sd.current.w, sd.current.h)
      ctx.strokeStyle = starColor

      sd.current.star.arr.forEach((star) => {
        if (
          star[5] > 0 &&
          star[5] < sd.current.w &&
          star[6] > 0 &&
          star[6] < sd.current.h &&
          star[7]
        ) {
          ctx.lineWidth = (1 - sd.current.star.colorRatio * star[2]) * 2
          ctx.beginPath()
          ctx.moveTo(star[5], star[6])
          ctx.lineTo(star[3], star[4])
          ctx.stroke()
          ctx.closePath()
        }
      })
    }

    const animate = () => {
      if (sd.current.prevTime === 0) sd.current.prevTime = Date.now()
      resize()
      update()
      draw()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const mouseHandler = (event: MouseEvent) => {
      cursor.current.x = event.pageX || event.clientX + parent.scrollLeft - parent.clientLeft
      cursor.current.y = event.pageY || event.clientY + parent.scrollTop - parent.clientTop
    }

    const tiltHandler = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        cursor.current.x = sd.current.w / 2 + event.gamma * 5
        cursor.current.y = sd.current.h / 2 + event.beta * 5
      }
    }

    const clickHandler = (event: MouseEvent) => {
      if (event.type === "mousedown") hyperRef.current = true
      if (event.type === "mouseup") hyperRef.current = false
    }

    if (mouseAdjust) parent.addEventListener("mousemove", mouseHandler)
    if (tiltAdjust) window.addEventListener("deviceorientation", tiltHandler)
    if (clickToWarp) {
      parent.addEventListener("mousedown", clickHandler)
      parent.addEventListener("mouseup", clickHandler)
    }

    setupCanvas()
    bigBang()
    animate()

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (mouseAdjust) parent.removeEventListener("mousemove", mouseHandler)
      if (tiltAdjust) window.removeEventListener("deviceorientation", tiltHandler)
      if (clickToWarp) {
        parent.removeEventListener("mousedown", clickHandler)
        parent.removeEventListener("mouseup", clickHandler)
      }
    }
  }, [
    starColor,
    bgColor,
    mouseAdjust,
    tiltAdjust,
    easing,
    clickToWarp,
    warpFactor,
    opacity,
    speed,
    quantity,
  ])

  return (
    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} />
    </div>
  )
}
