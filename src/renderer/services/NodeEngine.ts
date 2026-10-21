// src/services/NodeEngine.ts
import { Component, Service } from '@pandino/decorators'

@Component({ name: 'node.engine.service', immediate: true })
@Service({ interfaces: ['NodeEngine'] })
export class NodeEngine {
  private executors = new Map<string, NodeExecutor>()
  
  registerExecutor(nodeType: string, executor: NodeExecutor) {
    this.executors.set(nodeType, executor)
  }
  
  executeNode(nodeType: string, context: ExecutionContext): Map<string, unknown> {
    const executor = this.executors.get(nodeType)
    if (!executor) {
      throw new Error(`No executor found for node type: ${nodeType}`)
    }
    return executor.execute(context)
  }
  
  executeFrame() {
    // Execute all nodes in current frame
    // This would be called from the execution loop
  }
}