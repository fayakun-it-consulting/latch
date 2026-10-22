# Phase 3: UI Migration

## Objective
Replace Vue UI components with React components using Pandino services.

## Implementation Steps

### 1. Canvas and Node Rendering

#### 1.1 Create React-based Node Rendering System
- Implement React component for node rendering
- Replace Vue BaseNode component with React equivalent
- Implement React hooks for service consumption

#### 1.2 Implement Node Preview Components
- Migrate node preview components to React
- Create service-based preview rendering
- Implement dynamic preview updates

### 2. Controls and UI Components

#### 2.1 Convert Control Components to React
- Transform Vue control components to React
- Implement declarative UI schema rendering in React
- Migrate control rendering logic to React

#### 2.2 Migrate UI Panels and Editors
- Convert Vue UI panels to React components
- Implement React-based editor interfaces
- Migrate property panels and configuration UI

### 3. Canvas Interactions

#### 3.1 Implement React-based Canvas
- Create React-based canvas with drag-and-drop capabilities
- Replace Vue Flow components with React equivalents
- Implement connection handling in React

#### 3.2 Migrate Connection Handling
- Convert connection logic to React
- Implement visual wire drawing in React
- Handle node connection events

## Implementation Tasks

### Task 1: Create React Node Component
Create a React-based equivalent of BaseNode.vue:

```typescript
// src/components/nodes/ReactNode.tsx
import React, { useState, useEffect } from 'react'
import { useService } from '@pandino/react-hooks'
import type { NodeSpec } from '@/interfaces/NodeSpec'
import type { NodeExecutor } from '@/interfaces/NodeExecutor'

interface ReactNodeProps {
  nodeId: string
  nodeType: string
  position: { x: number; y: number }
}

export const ReactNode: React.FC<ReactNodeProps> = ({ nodeId, nodeType, position }) => {
  const { service: nodeSpec } = useService<NodeSpec>(nodeType)
  const { service: nodeExecutor } = useService<NodeExecutor>(nodeType)
  
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isEditingLabel, setIsEditingLabel] = useState(false)
  const [label, setLabel] = useState('')
  
  // Handle node execution
  const executeNode = () => {
    if (nodeExecutor) {
      // Execute node logic using service
      // ...
    }
  }
  
  if (!nodeSpec) {
    return <div className="node-placeholder">Node not found</div>
  }
  
  return (
    <div className={`react-node ${isCollapsed ? 'collapsed' : ''}`} style={{ left: position.x, top: position.y }}>
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
}
```

### Task 2: Implement React Canvas Component
Create a React-based canvas implementation:

```typescript
// src/components/canvas/ReactCanvas.tsx
import React, { useState, useEffect, useCallback } from 'react'
import { useService } from '@pandino/react-hooks'
import { ReactNode } from './ReactNode'

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
```

### Task 3: Convert Control Components to React
Create React equivalents of Vue control components:

```typescript
// src/components/controls/ReactControl.tsx
import React from 'react'

interface ControlProps {
  control: ControlDefinition
  value: any
  onChange: (value: any) => void
}

export const ReactControl: React.FC<ControlProps> = ({ control, value, onChange }) => {
  switch (control.type) {
    case 'slider':
      return (
        <div className="control-slider">
          <label>{control.label}</label>
          <input 
            type="range" 
            min={control.props?.min || 0}
            max={control.props?.max || 1}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
          />
        </div>
      )
      
    case 'toggle':
      return (
        <div className="control-toggle">
          <label>{control.label}</label>
          <input 
            type="checkbox" 
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
          />
        </div>
      )
      
    case 'select':
      return (
        <div className="control-select">
          <label>{control.label}</label>
          <select value={value} onChange={(e) => onChange(e.target.value)}>
            {control.props?.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )
      
    default:
      return <div className="control-default">{control.label}</div>
  }
}
```

### Task 4: Create Service-based UI Components
Implement components that consume Pandino services:

```typescript
// src/components/ui/NodeSelector.tsx
import React, { useState, useEffect } from 'react'
import { useService } from '@pandino/react-hooks'

export const NodeSelector: React.FC = () => {
  const { service: nodeRegistry } = useService<NodeRegistry>('NodeRegistry')
  
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  useEffect(() => {
    if (nodeRegistry) {
      const allCategories = nodeRegistry.getAllCategories()
      setCategories(allCategories)
    }
  }, [nodeRegistry])
  
  const filteredNodes = selectedCategory === 'all' 
    ? nodeRegistry?.getAllNodes() 
    : nodeRegistry?.getNodesByCategory(selectedCategory)
  
  return (
    <div className="node-selector">
      <div className="category-tabs">
        <button 
          className={selectedCategory === 'all' ? 'active' : ''}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            className={selectedCategory === category.id ? 'active' : ''}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      <div className="node-list">
        {filteredNodes?.map(node => (
          <div key={node.id} className="node-item">
            <div className="node-icon">{node.category}</div>
            <span className="node-label">{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Task 5: Implement Canvas Interaction System
Create the React-based interaction system:

```typescript
// src/components/canvas/CanvasInteraction.tsx
import React, { useRef, useCallback } from 'react'

export const CanvasInteraction: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }, [])
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && canvasRef.current) {
      // Handle canvas panning
      // ...
    }
  }, [isDragging])
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
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
      {/* Canvas content */}
    </div>
  )
}
```


## Updated Implementation

- Added **ReactControl** and **NodeView** components for declarative UI rendering.
- Implemented **TexturePreview** and **CanvasInteraction** for node previews and drag‑and‑drop.
- Updated **ReactNode** to render ports, body, and collapse state using the new control schema.
- Created **ReactCanvas** to load nodes and connections from the `FlowsService` and render them with `ReactNode`.
- Updated the UI bundle to register any UI‑specific services.

## Next Steps (continued)

- Wire the canvas interaction into the main App component.
- Implement the missing connection rendering (SVG paths).
- Add unit tests for the new UI components.
