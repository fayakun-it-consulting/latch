// src/services/FlowsService.ts
import { Component, Service } from '@pandino/decorators'

@Component({ name: 'flows.service', immediate: true })
@Service({ interfaces: ['FlowsService'] })
export class FlowsService {
  private flows = new Map<string, Flow>()
  
  saveFlow(flowId: string, flow: Flow) {
    this.flows.set(flowId, flow)
  }
  
  getFlow(flowId: string): Flow | null {
    return this.flows.get(flowId) || null
  }
  
  getAllFlows(): Flow[] {
    return Array.from(this.flows.values())
  }
  
  addNode(node: Node) {
    // Implementation for adding a node to current flow
  }
  
  addConnection(connection: Connection) {
    // Implementation for adding a connection to current flow
  }
}

// Dummy types for now
interface Flow {
  id: string
  name: string
  nodes: Node[]
  connections: Connection[]
}

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