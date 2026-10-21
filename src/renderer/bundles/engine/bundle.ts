// src/bundles/engine/bundle.ts
import type { BundleActivator, BundleContext } from '@pandino/pandino'

class NodeEngineBundleActivator implements BundleActivator {
  async start(context: BundleContext) {
    // Register node engine service
    context.registerService('NodeEngine', new NodeEngine())
    
    // Register node registry service
    context.registerService('NodeRegistry', new NodeRegistry())
    
    // Register flows service
    context.registerService('FlowsService', new FlowsService())
  }
}

export default {
  headers: {
    bundleSymbolicName: 'latch.engine',
    bundleVersion: '1.0.0',
    bundleName: 'Node Engine Bundle'
  },
  activator: new NodeEngineBundleActivator()
}