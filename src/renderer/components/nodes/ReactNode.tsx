// src/renderer/components/nodes/ReactNode.tsx
import React, { useState, useCallback } from 'react'
import { useService } from '@pandino/react-hooks'
import { NodeSpec } from '@/interfaces/NodeSpec'
import { NodeView } from '@/renderer/components/controls/NodeView'
import { TexturePreview } from '@/renderer/components/preview/TexturePreview'
import { useNodeEngine } from '@/renderer/services/NodeEngineProvider' // will be created

interface ReactNodeProps {
  nodeId: string
  nodeType: string
  position: { x: number; y: number }
}

export const ReactNode: React.FC<ReactNodeProps> = ({ nodeId, nodeType, position }) => {
  const { service: nodeRegistry } = useService<NodeRegistry>('NodeRegistry')
  const { service: nodeEngine } = useService<NodeEngine>('NodeEngine')
  const [collapsed, setCollapsed] = useState(false)

  const nodeSpec = nodeRegistry?.getNodeSpec(nodeType)
  if (!nodeSpec) return <div className="node-placeholder">Missing node</div>

  // Build a simple execution context for demo purposes
  const ctx = {
    nodeId,
    inputs: {},
    controls: {},
    definition: nodeSpec,
    deltaTime: 0,
    totalTime: 0,
    frameCount: 0,
    // Helper methods – stubbed for now
    num: (key: string, def = 0) => def,
    str: (key: string, def = '') => def
  }

  const outputs = nodeEngine?.executeNode(nodeType, ctx) ?? new Map()

  const renderInputs = () => (
    nodeSpec.inputs.map((input) => (
      <div key={input.id} className="node-port node-port-left">
        <div className="handle handle-left" />
        <label>{input.label}</label>
      </div>
    ))
  )

  const renderOutputs = () => (
    nodeSpec.outputs.map((output) => (
      <div key={output.id} className="node-port node-port-right">
        <label>{output.label}</label>
        <div className="handle handle-right" />
      </div>
    ))
  )

  const renderBody = () => {
    if (nodeSpec.ui) {
      const values: Record<string, unknown> = {}
      return <NodeView nodeId={nodeId} definition={nodeSpec} values={values} surface="node" />
    }
    if (nodeSpec.outputs.some((o) => o.type === 'texture')) {
      return <TexturePreview nodeId={nodeId} width={120} height={80} showPlaceholder />
    }
    return <div className="node-content-placeholder">{nodeSpec.label}</div>
  }

  return (
    <div
      className={`react-node ${collapsed ? 'collapsed' : ''}`}
      style={{ left: position.x, top: position.y }}
   >
      <div className="node-header" onDoubleClick={() => setCollapsed(!collapsed)}>
        <span className="node-icon">{nodeSpec.category}</span>
        <span className="node-title">{nodeSpec.label}</span>
      </div>
      {!collapsed && (
        <div className="node-body">
          <div className="inputs">{renderInputs()}</div>
          <div className="content">{renderBody()}</div>
          <div className="outputs">{renderOutputs()}</div>
        </div>
      )}
    </div>
  )
}
