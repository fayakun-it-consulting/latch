// src/renderer/services/executors/MultiplyNodeExecutor.ts
import { NodeExecutor } from '@/interfaces/NodeExecutor'
import type { ExecutionContext } from '@/interfaces/NodeSpec'

export class MultiplyNodeExecutor implements NodeExecutor {
  execute(ctx: ExecutionContext): Map<string, unknown> {
    const a = ctx.num('a', 1)
    const b = ctx.num('b', 1)
    return new Map([['product', a * b]])
  }
}
