// src/bundles/ai/bundle.ts
import type { BundleActivator, BundleContext } from '@pandino/pandino'

class AIBundleActivator implements BundleActivator {
  async start(context: BundleContext) {
    // Register AI services
    context.registerService('ModelRegistryService', new ModelRegistryService())
    context.registerService('InferenceService', new InferenceService())
  }
}

export default {
  headers: {
    bundleSymbolicName: 'latch.ai',
    bundleVersion: '1.0.0',
    bundleName: 'AI Services Bundle'
  },
  activator: new AIBundleActivator()
}