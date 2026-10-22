// src/renderer/components/preview/TexturePreview.tsx
import React, { useEffect, useRef } from 'react'

interface TexturePreviewProps {
  nodeId: string
  width: number
  height: number
  showPlaceholder?: boolean
}

export const TexturePreview: React.FC<TexturePreviewProps> = ({ nodeId, width, height, showPlaceholder = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!showPlaceholder) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#e0e0e0'
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = '#ccc'
    ctx.lineWidth = 1
    ctx.strokeRect(0, 0, width, height)
    ctx.font = '12px sans-serif'
    ctx.fillStyle = '#888'
    ctx.textAlign = 'center'
    ctx.fillText('Preview', width / 2, height / 2)
  }, [showPlaceholder, width, height])

  if (showPlaceholder) {
    return <canvas ref={canvasRef} width={width} height={height} className="texture-preview-canvas" />
  }

  return <div className="texture-preview-placeholder">No preview available</div>
}
