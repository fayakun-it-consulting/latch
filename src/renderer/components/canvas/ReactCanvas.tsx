// src/components/canvas/ReactCanvas.tsx
import React, { useState, useEffect, useCallback } from 'react'
import { useService } from '@pandino/react-hooks'
import { ReactNode } from './nodes/ReactNode'

interface Node {
  id: string
  type: string
  position: { x: number; y: number }
  data: Record<string, any>
}

interface Connection {
  id: string
  from: { nodeId: string; portId: string }
  to: { nodeId: string; portId: string }
}

export const ReactCanvas: React.FC = () => {
  const { service: nodeEngine } = useService<NodeEngine>('NodeEngine')
  const { service: flowsService } = useService<FlowsService>('FlowsService')
  
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  
  // Load nodes from flows service
  useEffect(() => {
    const flow = flowsService?.getCurrentFlow()
    if (flow) {
      setNodes(flow.nodes)
      setConnections(flow.connections)
    }
  }, [flowsService])
  
  // Handle node creation
  const handleCreateNode = useCallback((nodeType: string, position: { x: number; y: number }) => {
    if (flowsService) {
      const newNode = {
        id: `node-${Date.now()}`,
        type: nodeType,
        position,
        data: {}
      }
      flowsService.addNode(newNode)
      setNodes(prev => [...prev, newNode])
    }
  }, [flowsService])
  
  // Handle connection creation
  const handleCreateConnection = useCallback((fromNode: string, fromPort: string, toNode: string, toPort: string) => {
    if (flowsService) {
      const newConnection = {
        id: `conn-${Date.now()}`,
        from: { nodeId: fromNode, portId: fromPort },
        to: { nodeId: toNode, portId: toPort }
      }
      flowsService.addConnection(newConnection)
      setConnections(prev => [...prev, newConnection])
    }
  }, [flowsService])
  
  return (
    <div className="react-canvas">
      <div className="canvas-content">
        {nodes.map(node => (
          <ReactNode
            key={node.id}
            nodeId={node.id}
            nodeType={node.type}
            position={node.position}
          />
        ))}
        
        {/* Render connections as SVG lines */}
        {connections.map(conn => (
          <svg key={conn.id} className="connection-line">
            {/* Connection path */}
          </svg>
        ))}
      </div>
      
      {/* Canvas controls */}
      <div className="canvas-controls">
        {/* Zoom, pan, etc. */}
      </div>
    </div>
  )
}