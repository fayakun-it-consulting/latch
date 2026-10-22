// src/renderer/components/canvas/CanvasInteraction.tsx
import React, { useRef, useCallback, useState } from 'react'

export const CanvasInteraction: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsPanning(true)
    setPanStart({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning || !canvasRef.current) return
    const dx = e.clientX - panStart.x
    const dy = e.clientY - panStart.y
    // Update canvas view transform – placeholder logic
    canvasRef.current.style.transform = `translate(${dx}px, ${dy}px)`
  }, [isPanning, panStart])

  const handleMouseUp = useCallback(() => {
    setIsPanning(false)
  }, [])

  return (
    <div
      ref={canvasRef}
      className="canvas-interaction"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Canvas content rendered by ReactCanvas component */}
      <div className="canvas-content" />
    </div>
  )
}
