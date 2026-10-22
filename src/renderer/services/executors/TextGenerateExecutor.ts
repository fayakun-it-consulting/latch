// src/renderer/services/executors/TextGenerateExecutor.ts
import { NodeExecutor } from '@/interfaces/NodeExecutor'
import type { ExecutionContext } from '@/interfaces/NodeSpec'

export class TextGenerateExecutor implements NodeExecutor {
  async execute(ctx: ExecutionContext): Promise<Map<string, unknown>> {
    const modelRegistry = ctx.getService('ModelRegistryService')
    const model = modelRegistry.getModel('text-generation')
    const prompt = ctx.str('prompt', '')
    if (!model) {
      return new Map([['text', 'Model not available']])
    }
    const result = await model.generate(prompt)
    return new Map([['text', result]])
  }
}
