// src/interfaces/NodeSpec.ts
export interface NodeSpec {
  id: string
  category: string
  label: string
  inputs: PortSpec[]
  outputs: PortSpec[]
  controls?: ControlSpec[]
  ui?: UISchema
  requires?: NodeRequirement[]
  connections?: ConnectionSpec[]
}

export interface PortSpec {
  id: string
  type: string
  label: string
}

export interface ControlSpec {
  id: string
  type: string
  label: string
  default?: unknown
  props?: Record<string, unknown>
}

export interface UISchema {
  // Define declarative UI schema properties
  controls?: ControlSpec[]
  layout?: 'horizontal' | 'vertical'
}

export interface ConnectionSpec {
  controlId: string
  required?: boolean
}

export type NodeRequirement = 
  | 'audio'
  | 'webgl'
  | 'serial'
  | 'webgpu'
  | 'ble'
  | 'midi'
  | 'websocket'
  | 'http'
  | 'mqtt'
  | 'osc'

export interface ExecutionContext {
  nodeId: string
  inputs: Record<string, unknown>
  controls: Record<string, unknown>
  definition: NodeSpec
  deltaTime: number
  totalTime: number
  frameCount: number
}