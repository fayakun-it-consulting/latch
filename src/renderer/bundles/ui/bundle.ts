// src/renderer/bundles/ui/bundle.ts
import type { BundleActivator, BundleContext } from '@pandino/pandino'

class UIEngineBundleActivator implements BundleActivator {
  async start(context: BundleContext) {
    // Register UI‑related services here (e.g., drag‑and‑drop, styling)
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
