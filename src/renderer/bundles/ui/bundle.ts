// src/bundles/ui/bundle.ts
import type { BundleActivator, BundleContext } from '@pandino/pandino'

class UIEngineBundleActivator implements BundleActivator {
  async start(context: BundleContext) {
    // Register UI services
    // This would be for UI-related services that need to be registered
  }
}

export default {
  headers: {
    bundleSymbolicName: 'latch.ui',
    bundleVersion: '1.0.0',
    bundleName: 'UI Bundle'
  },
  activator: new UIEngineBundleActivator()
}