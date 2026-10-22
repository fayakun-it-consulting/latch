// src/renderer/components/controls/NodeView.tsx
import React from 'react'
import { useService } from '@pandino/react-hooks'
import { ReactControl } from './ReactControl'
import type { NodeSpec } from '@/interfaces/NodeSpec'

interface NodeViewProps {
  nodeId: string
  definition: NodeSpec
  values: Record<string, unknown>
  surface: 'node' | 'panel'
}

export const NodeView: React.FC<NodeViewProps> = ({ nodeId, definition, values, surface }) => {
  if (!definition.ui) return null

  const onChange = (id: string, value: unknown) => {
    // Persist control value – this would talk to the FlowsService
    // Example: context.getService(FlowsService).updateNodeControl(nodeId, id, value)
  }

  return (
    <div className="node-view">
      {definition.ui.controls?.map((control) => (
        <ReactControl
          key={control.id}
          control={control}
          value={values[control.id] ?? control.default}
          onChange={(v) => onChange(control.id, v)}
        />
      ))}
    </div>
  )
}
