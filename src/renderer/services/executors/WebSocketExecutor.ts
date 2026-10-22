// src/renderer/services/executors/WebSocketExecutor.ts
import { NodeExecutor } from '@/interfaces/NodeExecutor'
import type { ExecutionContext } from '@/interfaces/NodeSpec'

export class WebSocketExecutor implements NodeExecutor {
  execute(ctx: ExecutionContext): Map<string, unknown> {
    const url = ctx.str('url', '')
    const socket = new WebSocket(url)
    socket.onmessage = (e) => {
      // TODO: dispatch message to the engine / node output
    }
    return new Map([['socket', socket]])
  }
}
