// src/renderer/bundles/visual/bundle.ts
import type { BundleActivator, BundleContext } from '@pandino/pandino'

class VisualBundleActivator implements BundleActivator {
  async start(context: BundleContext) {
    context.registerService('ThreeJSRendererService', new ThreeJSRendererService())
    // Additional visual services can be registered here
  }
}

export default {
  headers: {
    bundleSymbolicName: 'latch.visual',
    bundleVersion: '1.0.0',
    bundleName: 'Visual Services Bundle'
  },
  activator: new VisualBundleActivator()
}
