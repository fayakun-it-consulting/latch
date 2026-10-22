// src/renderer/services/ai/ModelRegistryService.ts
import { Component, Service } from '@pandino/decorators'

@Component({ name: 'ai.model.registry.service', immediate: true })
@Service({ interfaces: ['ModelRegistryService'] })
export class ModelRegistryService {
  private models = new Map<string, any>()

  registerModel(modelId: string, model: any) {
    this.models.set(modelId, model)
  }

  getModel(modelId: string): any {
    return this.models.get(modelId)
  }

  getModelNames(): string[] {
    return Array.from(this.models.keys())
  }

  unregisterModel(modelId: string) {
    this.models.delete(modelId)
  }
}
