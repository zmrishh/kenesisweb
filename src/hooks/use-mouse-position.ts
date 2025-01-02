import { useState, useEffect, useCallback, RefObject } from 'react'

export function useMousePosition(containerRef: RefObject<HTMLElement>) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [containerRef])

  const initializeTracking = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    container.addEventListener('mousemove', handleMouseMove)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [containerRef, handleMouseMove])

  useEffect(() => {
    const cleanup = initializeTracking()
    return () => {
      if (cleanup) cleanup()
    }
  }, [initializeTracking])

  return {
    x: position.x,
    y: position.y,
    initializeTracking
  }
}
