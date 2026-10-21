// src/components/controls/NodeView.tsx
import React from 'react'
import { useService } from '@pandino/react-hooks'
import { ReactControl } from './ReactControl'

interface NodeViewProps {
  nodeId: string
  definition: NodeSpec
  values: Record<string, any>
  surface: 'node' | 'panel'
}

export const NodeView: React.FC<NodeViewProps> = ({ nodeId, definition, values, surface }) => {
  const { service: nodeRegistry } = useService<NodeRegistry>('NodeRegistry')
  
  // Use declarative UI schema if available
  if (definition.ui) {
    return (
      <div className="node-view">
        {definition.ui.controls?.map(control => (
          <ReactControl
            key={control.id}
            control={control}
            value={values[control.id]}
            onChange={(value) => {
              // Handle control value change
            }}
          />
        ))}
      </div>
    )
  }
  
  // Fallback to simple rendering
  return (
    <div className="node-view-fallback">
      <div className="node-view-content">
        Node content for {definition.label}
      </div>
    </div>
  )
}