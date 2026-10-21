// src/services/persistence/DatabaseService.ts
import { Component, Service } from '@pandino/decorators'

@Component({ name: 'database.service', immediate: true })
@Service({ interfaces: ['DatabaseService'] })
export class DatabaseService {
  private db: Dexie | null = null
  
  async init() {
    this.db = new Dexie('latch')
    this.db.version(1).stores({
      flows: 'id, name, createdAt',
      nodes: 'id, flowId',
      connections: 'id, fromNodeId, toNodeId'
    })
  }
  
  async saveFlow(flow: Flow) {
    if (this.db) {
      await this.db.table('flows').put(flow)
    }
  }
  
  async loadFlow(flowId: string): Promise<Flow | null> {
    if (this.db) {
      return this.db.table('flows').get(flowId)
    }
    return null
  }
  
  async saveAsset(asset: Asset) {
    // Save asset logic
  }
  
  async loadAsset(assetId: string): Promise<Asset | null> {
    // Load asset logic
    return null
  }
  
  async dispose() {
    if (this.db) {
      await this.db.close()
    }
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

interface Asset {
  id: string
  name: string
  data: any
}