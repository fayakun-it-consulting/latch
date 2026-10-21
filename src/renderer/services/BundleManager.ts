// src/services/BundleManager.ts
import { Component, Service } from '@pandino/decorators'
import type { BundleContext, Bundle } from '@pandino/pandino'

@Component({ name: 'bundle.manager.service', immediate: true })
@Service({ interfaces: ['BundleManager'] })
export class BundleManager {
  private bundleContext: BundleContext | null = null
  private installedBundles = new Map<string, Bundle>()
  
  async initialize(context: BundleContext) {
    this.bundleContext = context
    
    // Load all core bundles
    const coreBundles = [
      // We'll load bundles dynamically during development
    ]
    
    for (const bundlePromise of coreBundles) {
      try {
        const bundleModule = await bundlePromise
        const bundle = this.bundleContext.installBundle(bundleModule.default)
        await bundle.start()
        this.installedBundles.set(bundle.getSymbolicName(), bundle)
      } catch (error) {
        console.error('Failed to load bundle:', error)
      }
    }
  }
  
  getBundle(name: string): Bundle | null {
    return this.installedBundles.get(name) || null
  }
  
  getAllBundles(): Bundle[] {
    return Array.from(this.installedBundles.values())
  }
  
  async reloadBundle(name: string) {
    const bundle = this.installedBundles.get(name)
    if (bundle) {
      await bundle.stop()
      await bundle.start()
    }
  }
}