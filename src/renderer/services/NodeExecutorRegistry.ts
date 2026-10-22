// src/renderer/services/NodeExecutorRegistry.ts
import { Component, Service } from '@pandino/decorators'
import type { NodeExecutor } from '@/interfaces/NodeExecutor'

// The registry imports all executors and exposes a map.
@Component({ name: 'node.executor.registry', immediate: true })
@Service({ interfaces: ['NodeExecutorRegistry'] })
export class NodeExecutorRegistry {
  /**
   * Map of node type → executor instance.
   */
  readonly executors = new Map<string, NodeExecutor>()

  constructor() {
    // Import all executors here.  Add a new import line when you create a new node.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const addExecutor = require('./executors/AddNodeExecutor').AddNodeExecutor
    const multiplyExecutor = require('./executors/MultiplyNodeExecutor').MultiplyNodeExecutor
    const oscExecutor = require('./executors/OscillatorNodeExecutor').OscillatorNodeExecutor
    const shaderExecutor = require('./executors/ShaderExecutor').ShaderExecutor
    const textGenExecutor = require('./executors/TextGenerateExecutor').TextGenerateExecutor
    const wsExecutor = require('./executors/WebSocketExecutor').WebSocketExecutor

    this.registerExecutor('add', new addExecutor())
    this.registerExecutor('multiply', new multiplyExecutor())
    this.registerExecutor('oscillator', new oscExecutor())
    this.registerExecutor('shader', new shaderExecutor())
    this.registerExecutor('textGenerate', new textGenExecutor())
    this.registerExecutor('websocket', new wsExecutor())
  }

  registerExecutor(nodeType: string, executor: NodeExecutor) {
    this.executors.set(nodeType, executor)
  }
}
