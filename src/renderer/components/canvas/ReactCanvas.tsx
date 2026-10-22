// src/renderer/components/canvas/ReactCanvas.tsx
import React, { useState } from 'react'
import { ReactNode } from '../nodes/ReactNode'
import { useFlowsService } from '@/renderer/services/FlowsService' // custom hook

export const ReactCanvas: React.FC = () => {
  const { nodes, connections } = useFlowsService()
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  return (
    <div className="react-canvas">
      {nodes.map((node) => (
        <ReactNode
          key={node.id}
          nodeId={node.id}
          nodeType={node.type}
          position={node.position}
        />
      ))}
      {/* TODO: render connections as SVG paths */}
      {/* TODO: handle selection, drag‑and‑drop */}
    </div>
  )
}
