// src/bundles/visual/bundle.ts
import type { BundleActivator, BundleContext } from '@pandino/pandino'

class VisualBundleActivator implements BundleActivator {
  async start(context: BundleContext) {
    // Register visual services
    context.registerService('ThreeJSRendererService', new ThreeJSRendererService())
    context.registerService('TextureService', new TextureService())
    context.registerService('ShaderService', new ShaderService())
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