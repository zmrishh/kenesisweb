import { useRef, useEffect, RefObject } from "react"

export const useMousePositionRef = (containerRef: RefObject<HTMLElement>) => {
  const mousePositionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mousePositionRef.current = {
          x: ev.clientX - rect.left,
          y: ev.clientY - rect.top,
        }
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", updateMousePosition)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", updateMousePosition)
      }
    }
  }, [containerRef])

  return mousePositionRef
}
