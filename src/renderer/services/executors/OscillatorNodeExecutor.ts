// src/renderer/services/executors/OscillatorNodeExecutor.ts
import { NodeExecutor } from '@/interfaces/NodeExecutor'
import type { ExecutionContext } from '@/interfaces/NodeSpec'

export class OscillatorNodeExecutor implements NodeExecutor {
  execute(ctx: ExecutionContext): Map<string, unknown> {
    const audioCtx = ctx.getService('WebAudioContextService').getAudioContext()
    const freq = ctx.num('frequency', 440)
    const type = ctx.str('type', 'sine') as OscillatorType

    const osc = audioCtx.createOscillator()
    osc.type = type
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime)
    osc.connect(audioCtx.destination)
    osc.start()

    return new Map([['osc', osc]])
  }
}
