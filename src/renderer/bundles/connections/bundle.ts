// src/renderer/bundles/connections/bundle.ts
import type { BundleActivator, BundleContext } from '@pandino/pandino'

class ConnectionsBundleActivator implements BundleActivator {
  async start(context: BundleContext) {
    context.registerService('ConnectionManagerService', new ConnectionManagerService())
    context.registerService('WebSocketService', new WebSocketService())
    context.registerService('MQTTService', new MQTTService())
  }
}

export default {
  headers: {
    bundleSymbolicName: 'latch.connections',
    bundleVersion: '1.0.0',
    bundleName: 'Connection Services Bundle'
  },
  activator: new ConnectionsBundleActivator()
}
