// src/bundles/persistence/bundle.ts
import type { BundleActivator, BundleContext } from '@pandino/pandino'

class PersistenceBundleActivator implements BundleActivator {
  async start(context: BundleContext) {
    // Register persistence services
    context.registerService('DatabaseService', new DatabaseService())
    context.registerService('FileFormatService', new FileFormatService())
    context.registerService('AssetService', new AssetService())
  }
}

export default {
  headers: {
    bundleSymbolicName: 'latch.persistence',
    bundleVersion: '1.0.0',
    bundleName: 'Persistence Services Bundle'
  },
  activator: new PersistenceBundleActivator()
}