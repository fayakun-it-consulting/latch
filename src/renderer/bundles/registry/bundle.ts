// src/bundles/registry/bundle.ts
import type { BundleActivator, BundleContext } from '@pandino/pandino'

class RegistryBundleActivator implements BundleActivator {
  async start(context: BundleContext) {
    // Register node registry service
    context.registerService('NodeRegistry', new NodeRegistry())
  }
}

export default {
  headers: {
    bundleSymbolicName: 'latch.registry',
    bundleVersion: '1.0.0',
    bundleName: 'Node Registry Bundle'
  },
  activator: new RegistryBundleActivator()
}