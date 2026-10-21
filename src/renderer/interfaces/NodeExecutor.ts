// src/interfaces/NodeExecutor.ts
export interface NodeExecutor {
  execute(ctx: ExecutionContext): Map<string, unknown> | Promise<Map<string, unknown>>
}

export interface NodeRegistry {
  registerNode(nodeSpec: NodeSpec): void
  getNodeSpec(nodeType: string): NodeSpec | null
  getAllNodeSpecs(): NodeSpec[]
}