// src/bundles/audio/bundle.ts
import type { BundleActivator, BundleContext } from '@pandino/pandino'

class AudioBundleActivator implements BundleActivator {
  async start(context: BundleContext) {
    // Register audio services
    context.registerService('AudioContextService', new WebAudioContextService())
    context.registerService('AudioAnalyzerService', new AudioAnalyzerService())
  }
}

export default {
  headers: {
    bundleSymbolicName: 'latch.audio',
    bundleVersion: '1.0.0',
    bundleName: 'Audio Services Bundle'
  },
  activator: new AudioBundleActivator()
}