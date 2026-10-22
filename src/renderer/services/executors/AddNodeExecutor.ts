// src/renderer/services/executors/AddNodeExecutor.ts
import { NodeExecutor } from '@/interfaces/NodeExecutor'
import type { ExecutionContext } from '@/interfaces/NodeSpec'

export class AddNodeExecutor implements NodeExecutor {
  execute(ctx: ExecutionContext): Map<string, unknown> {
    const a = ctx.num('a', 0)
    const b = ctx.num('b', 0)
    return new Map([['sum', a + b]])
  }
}
