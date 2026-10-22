// src/renderer/services/NodeEngine.ts
import type { BundleContext } from '@pandino/pandino'
import { NodeExecutorRegistry } from './NodeExecutorRegistry'
import type { NodeExecutor } from '@/interfaces/NodeExecutor'
import type { ExecutionContext } from '@/interfaces/NodeSpec'

export class NodeEngine {
  private executors = new Map<string, NodeExecutor>()

  constructor(context: BundleContext) {
    // Pull the registry from Pandino
    const registry = context.getService<NodeExecutorRegistry>('NodeExecutorRegistry')
    if (!registry) {
      throw new Error('NodeExecutorRegistry service not available')
    }

    // Register each executor from the registry
    for (const [type, executor] of registry.executors.entries()) {
      this.registerExecutor(type, executor)
    }
  }

  registerExecutor(nodeType: string, executor: NodeExecutor) {
    this.executors.set(nodeType, executor)
  }

  /**
   * Execute a single node.
   * @param nodeType The type string that identifies the executor.
   * @param ctx The execution context supplied by the engine.
   */
  executeNode(nodeType: string, ctx: ExecutionContext): Map<string, unknown> {
    const executor = this.executors.get(nodeType)
    if (!executor) {
      throw new Error(`No executor registered for node type "${nodeType}"`)
    }
    return executor.execute(ctx)
  }

  /**
   * Execute an entire flow. This is a very thin wrapper; the heavy lifting
   * (topological sorting, frame looping) lives in the ExecutionEngine.
   */
  executeFlow(flow: Flow): void {
    // TODO: Implement topo‑sort and frame loop
  }
}

// Dummy Flow type for illustration – replace with your actual Flow interface
interface Flow {
  id: string
  nodes: { id: string; type: string; position: { x: number; y: number } }[]
  connections: any[]
}
