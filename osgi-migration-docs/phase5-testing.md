# Phase 5: Integration and Testing

## Objective
Complete integration and thorough testing of the migrated system.

## Implementation Steps

### 1. Bundle Integration
#### 1.1 Bundle Loading and Management
- Implement comprehensive bundle loading system
- Create bundle lifecycle management
- Implement service discovery and resolution

#### 1.2 Dependency Resolution
- Set up proper service dependencies between bundles
- Implement lazy loading of bundles when needed
- Create bundle dependency graphs

### 2. Performance Testing
#### 2.1 Node Performance
- Test performance with 500+ nodes
- Verify memory management with Pandino's service lifecycle
- Optimize service registration and lookup

#### 2.2 UI Performance
- Test canvas rendering performance
- Verify responsive UI interactions
- Optimize React component rendering

### 3. Feature Testing
#### 3.1 Node Functionality
- Test all node types and their functionality
- Verify node connections and data flow
- Test node execution with different configurations

#### 3.2 UI Components
- Test all UI components and interactions
- Verify canvas operations (drag, drop, connect)
- Test property panels and configuration

#### 3.3 Service Integration
- Test service discovery and usage
- Verify service lifecycle management
- Test cross-service communication

## Implementation Tasks

### Task 1: Create Bundle Management System
Create a comprehensive system for managing Pandino bundles:

```typescript
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
      import('../bundles/engine/bundle'),
      import('../bundles/registry/bundle'),
      import('../bundles/ui/bundle'),
      import('../bundles/audio/bundle'),
      import('../bundles/visual/bundle'),
      import('../bundles/ai/bundle'),
      import('../bundles/connections/bundle'),
      import('../bundles/persistence/bundle')
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
```

### Task 2: Implement Service Discovery System
Create a service discovery system for the React application:

```typescript
// src/hooks/useServiceDiscovery.ts
import { useState, useEffect } from 'react'
import { useBundleContext } from '@pandino/react-hooks'

export function useServiceDiscovery<T>(serviceInterface: string, filter?: string) {
  const context = useBundleContext()
  const [services, setServices] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    if (!context) {
      setLoading(false)
      return
    }
    
    try {
      const serviceRefs = context.getServiceReferences<T>(serviceInterface, filter)
      const serviceInstances = serviceRefs.map(ref => context.getService(ref))
      setServices(serviceInstances)
      setLoading(false)
    } catch (err) {
      setError(err as Error)
      setLoading(false)
    }
  }, [context, serviceInterface, filter])
  
  return { services, loading, error }
}
```

### Task 3: Create Performance Monitoring System
Implement performance monitoring for node execution:

```typescript
// src/services/PerformanceMonitor.ts
import { Component, Service } from '@pandino/decorators'

@Component({ name: 'performance.monitor.service', immediate: true })
@Service({ interfaces: ['PerformanceMonitor'] })
export class PerformanceMonitor {
  private performanceData = new Map<string, PerformanceData>()
  
  recordNodeExecution(nodeId: string, executionTime: number, memoryUsage?: number) {
    const data = this.performanceData.get(nodeId) || {
      executionTimes: [],
      memoryUsage: [],
      lastExecution: Date.now()
    }
    
    data.executionTimes.push(executionTime)
    if (memoryUsage) {
      data.memoryUsage.push(memoryUsage)
    }
    data.lastExecution = Date.now()
    
    this.performanceData.set(nodeId, data)
  }
  
  getNodePerformance(nodeId: string): PerformanceData | null {
    return this.performanceData.get(nodeId) || null
  }
  
  getAverageExecutionTime(nodeId: string): number {
    const data = this.performanceData.get(nodeId)
    if (!data || data.executionTimes.length === 0) return 0
    
    const sum = data.executionTimes.reduce((acc, time) => acc + time, 0)
    return sum / data.executionTimes.length
  }
  
  getPerformanceReport(): PerformanceReport {
    const reports: NodePerformanceReport[] = []
    
    for (const [nodeId, data] of this.performanceData.entries()) {
      reports.push({
        nodeId,
        avgExecutionTime: this.getAverageExecutionTime(nodeId),
        lastExecution: data.lastExecution,
        executionCount: data.executionTimes.length
      })
    }
    
    return {
      reports,
      timestamp: Date.now()
    }
  }
}

interface PerformanceData {
  executionTimes: number[]
  memoryUsage: number[]
  lastExecution: number
}

interface PerformanceReport {
  reports: NodePerformanceReport[]
  timestamp: number
}

interface NodePerformanceReport {
  nodeId: string
  avgExecutionTime: number
  lastExecution: number
  executionCount: number
}
```

### Task 4: Implement Comprehensive Testing Framework
Create testing infrastructure for verifying migrated functionality:

```typescript
// src/test/NodeTestSuite.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { TestNode } from './TestNode'
import { NodeExecutor } from '@/interfaces/NodeExecutor'

describe('Node Execution Tests', () => {
  let testNode: TestNode
  
  beforeEach(() => {
    testNode = new TestNode()
  })
  
  it('should execute add node correctly', () => {
    const inputs = { a: 5, b: 3 }
    const result = testNode.execute(inputs)
    
    expect(result.get('sum')).toBe(8)
  })
  
  it('should execute multiply node correctly', () => {
    const inputs = { a: 4, b: 6 }
    const result = testNode.execute(inputs)
    
    expect(result.get('product')).toBe(24)
  })
  
  it('should handle node errors gracefully', () => {
    const inputs = { a: 'invalid', b: 5 }
    expect(() => testNode.execute(inputs)).toThrow()
  })
})

// TestNode implementation for testing
export class TestNode implements NodeExecutor {
  execute(ctx: ExecutionContext): Map<string, unknown> {
    // Implementation for testing
    return new Map([['result', 'test']])
  }
}
```

### Task 5: Create Integration Test Suite
Build integration tests to verify the entire system works together:

```typescript
// src/test/IntegrationTests.ts
describe('LATCH Integration Tests', () => {
  describe('Complete Flow Execution', () => {
    it('should execute a complete flow with multiple nodes', async () => {
      // Setup test flow
      const flow = createTestFlow()
      
      // Execute flow
      const result = await executeTestFlow(flow)
      
      // Verify results
      expect(result).toBeDefined()
      expect(result.nodes).toHaveLength(5)
      expect(result.connections).toHaveLength(4)
    })
    
    it('should handle service dependencies correctly', async () => {
      // Verify services are properly registered
      const audioService = await getService<AudioContextService>('AudioContextService')
      const visualService = await getService<ThreeJSRendererService>('ThreeJSRendererService')
      
      expect(audioService).toBeDefined()
      expect(visualService).toBeDefined()
    })
  })
  
  describe('UI Integration Tests', () => {
    it('should render nodes correctly in React UI', () => {
      // Test node rendering
      const nodeComponent = render(<ReactNode nodeId="test" nodeType="add" />)
      expect(nodeComponent).toBeInTheDocument()
    })
    
    it('should handle canvas interactions properly', () => {
      // Test drag and drop
      const canvas = render(<ReactCanvas />)
      expect(canvas).toBeDefined()
    })
  })
})
```

### Task 6: Implement Memory Management Testing
Create tests to ensure proper resource cleanup:

```typescript
// src/test/MemoryManagementTests.ts
describe('Memory Management Tests', () => {
  it('should clean up audio resources properly', async () => {
    // Create audio context
    const audioService = await getService<AudioContextService>('AudioContextService')
    const context = audioService.init()
    
    // Perform operations
    const oscillator = context.createOscillator()
    oscillator.start()
    
    // Clean up
    oscillator.stop()
    
    // Verify resources are cleaned up
    expect(oscillator.state).toBe('stopped')
  })
  
  it('should dispose of Three.js resources properly', async () => {
    const visualService = await getService<ThreeJSRendererService>('ThreeJSRendererService')
    const { renderer, scene, camera } = visualService.init(document.createElement('canvas'))
    
    // Perform operations
    
    // Dispose resources
    visualService.dispose()
    
    // Verify disposal
    expect(renderer).toBeNull()
  })
})
```

### Task 7: Create Performance Benchmark Tests
Implement performance benchmarks for key operations:

```typescript
// src/test/PerformanceBenchmarks.ts
describe('Performance Benchmarks', () => {
  it('should execute 1000 nodes within acceptable time', async () => {
    const start = performance.now()
    
    // Execute large number of nodes
    const largeFlow = createLargeTestFlow(1000)
    await executeTestFlow(largeFlow)
    
    const end = performance.now()
    const executionTime = end - start
    
    // Verify performance requirements
    expect(executionTime).toBeLessThan(1000) // Should complete in < 1 second
  })
  
  it('should render large canvas efficiently', async () => {
    const canvas = document.createElement('canvas')
    const start = performance.now()
    
    // Render large number of nodes
    const largeCanvas = renderLargeCanvas(canvas, 500)
    
    const end = performance.now()
    const renderTime = end - start
    
    // Verify rendering performance
    expect(renderTime).toBeLessThan(50) // Should render in < 50ms
  })
})
```

### Task 8: Implement Error Handling Tests
Create comprehensive error handling tests:

```typescript
// src/test/ErrorHandlingTests.ts
describe('Error Handling Tests', () => {
  it('should handle missing services gracefully', () => {
    // Test when service is not available
    const { service, loading, error } = useService('NonExistentService')
    
    expect(service).toBeNull()
    expect(error).toBeDefined()
  })
  
  it('should handle invalid node configurations', () => {
    // Test with malformed node data
    expect(() => {
      createNodeWithInvalidConfig()
    }).toThrow('Invalid node configuration')
  })
  
  it('should handle resource exhaustion', () => {
    // Test resource limits
    expect(() => {
      allocateExcessiveResources()
    }).toThrow('Resource limit exceeded')
  })
})
```

### Task 9: Create Configuration Management Tests
Implement tests for runtime configuration:

```typescript
// src/test/ConfigurationTests.ts
describe('Configuration Tests', () => {
  it('should load configuration from services', async () => {
    const configService = await getService<ConfigurationAdmin>('ConfigurationAdmin')
    const config = await configService.getConfiguration('latch.settings')
    
    expect(config).toBeDefined()
    expect(config.get('theme')).toBe('dark')
  })
  
  it('should update configuration dynamically', async () => {
    const configService = await getService<ConfigurationAdmin>('ConfigurationAdmin')
    const config = await configService.getConfiguration('latch.settings')
    
    await config.update({ theme: 'light' })
    
    const updatedConfig = await configService.getConfiguration('latch.settings')
    expect(updatedConfig.get('theme')).toBe('light')
  })
})
```

### Task 10: Implement Cross-Platform Compatibility Tests
Test functionality across different environments:

```typescript
// src/test/CrossPlatformTests.ts
describe('Cross-Platform Tests', () => {
  it('should work in browser environment', () => {
    // Test browser-specific features
    expect(typeof window).toBe('object')
    expect(typeof document).toBe('object')
  })
  
  it('should work with Electron environment', async () => {
    // Test Electron-specific features
    if (isElectron()) {
      const electronService = await getService<ElectronService>('ElectronService')
      expect(electronService).toBeDefined()
    }
  })
  
  it('should handle mobile device capabilities', () => {
    // Test mobile-specific features
    expect(navigator.userAgent).toContain('Mobile')
  })
})
```

## Next Steps

1. Begin with Task 1: Create Bundle Management System
2. Proceed to Task 2: Implement Service Discovery System
3. Implement Task 3: Create Performance Monitoring System
4. Complete Task 4: Implement Comprehensive Testing Framework
5. Implement Task 5: Create Integration Test Suite
6. Implement Task 6: Implement Memory Management Testing
7. Implement Task 7: Create Performance Benchmark Tests
8. Implement Task 8: Implement Error Handling Tests
9. Implement Task 9: Create Configuration Management Tests
10. Implement Task 10: Implement Cross-Platform Compatibility Tests

This concludes the implementation plan for Phase 5. The comprehensive testing approach will ensure that the migrated system is stable, performant, and maintains all existing functionality.