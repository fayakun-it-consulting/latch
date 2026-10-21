// src/components/nodes/ReactNode.tsx
import React, { useState } from 'react'
import { useService } from '@pandino/react-hooks'
import type { NodeSpec } from '@/interfaces/NodeSpec'

interface ReactNodeProps {
  nodeId: string
  nodeType: string
  position: { x: number; y: number }
}

export const ReactNode: React.FC<ReactNodeProps> = ({ nodeId, nodeType, position }) => {
  const { service: nodeSpec } = useService<NodeSpec>(nodeType)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isEditingLabel, setIsEditingLabel] = useState(false)
  const [label, setLabel] = useState('')
  
  if (!nodeSpec) {
    return <div className="node-placeholder">Node not found</div>
  }
  
  return (
    <div 
      className={`react-node ${isCollapsed ? 'collapsed' : ''}`} 
      style={{ left: position.x, top: position.y }}
    >
      {/* Node Header */}
      <div className="node-header">
        <div className="node-icon">
          {nodeSpec.category} {/* Category icon */}
        </div>
        {isEditingLabel ? (
          <input 
            type="text" 
            value={label} 
            onChange={(e) => setLabel(e.target.value)}
            onBlur={() => setIsEditingLabel(false)}
            autoFocus
          />
        ) : (
          <span 
            className="node-title"
            onDoubleClick={() => setIsEditingLabel(true)}
          >
            {nodeSpec.label}
          </span>
        )}
      </div>
      
      {/* Node Body */}
      <div className="node-body">
        {/* Port Inputs */}
        {nodeSpec.inputs.map(input => (
          <div key={input.id} className="input-port">
            <div className="port-handle" />
            <label>{input.label}</label>
          </div>
        ))}
        
        {/* Node Preview or Controls */}
        {renderNodeContent(nodeSpec)}
        
        {/* Port Outputs */}
        {nodeSpec.outputs.map(output => (
          <div key={output.id} className="output-port">
            <label>{output.label}</label>
            <div className="port-handle" />
          </div>
        ))}
      </div>
    </div>
  )
}

// Render node-specific content based on type
const renderNodeContent = (nodeSpec: NodeSpec) => {
  // Render preview, controls, etc.
  // Based on node type, UI schema, or custom component
  return <div className="node-content">Node content for {nodeSpec.label}</div>
}