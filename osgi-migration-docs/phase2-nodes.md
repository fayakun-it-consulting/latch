# Phase 2: Node System Migration

## Objective
Migrate node definitions and execution engine to Pandino architecture.

## Implementation Steps

### 1. Node Definition Migration

#### 1.1 Convert Node Definitions to Services
- Convert existing node definitions (`registry/<category>/<id>/node.ts`) to Pandino services
- Implement service registration patterns
- Define service interfaces for node specifications

#### 1.2 Create Node Executor Services
- Transform node executors into declarative Pandino services
- Implement service lifecycle management
- Create service properties for node configuration

### 2. Execution Engine Migration

#### 2.1 Convert Execution Engine to Bundle
- Migrate `ExecutionEngine.ts` to Pandino bundle structure
- Replace Vue Flow integration with React-based canvas
- Implement service-based node execution with proper lifecycle management

#### 2.2 Implement Service-based Node Execution
- Create service registry for node executors
- Implement execution loop using service discovery
- Handle node lifecycle events through Pandino

### 3. State Management Migration

#### 3.1 Replace Pinia Stores with Pandino Services
- Convert flow management to Pandino service
- Migrate node definitions to Pandino service
- Implement runtime state management via Pandino

#### 3.2 Create Service Registry for Core State
- Flows service
- Nodes service  
- Runtime service
- UI service
- History service
- Assets service

## Implementation Tasks

### Task 1: Convert Node Definitions to Services
Transform a node definition from Vue to Pandino service:

```typescript
// Before (Vue)
// registry/math/add/node.ts
import { defineNode } from '@/engine/defineNode'

export default defineNode({
  id: 'add',
  category: 'math',
  label: 'Add',
  inputs: [
    { id: 'a', type: 'number', label: 'A' },
    { id: 'b', type: 'number', label: 'B' }
  ],
  outputs: [
    { id: 'sum', type: 'number', label: 'Sum' }
  ],
  executor: (ctx) => {
    const a = ctx.num('a')
    const b = ctx.num('b')
    return new Map([['sum', a + b]])
  }
})

// After (Pandino)
// bundles/registry/math/add/bundle.ts
import { Component, Service } from '@pandino/decorators'
import { NodeSpec } from '@/interfaces/NodeSpec'
import { NodeExecutor } from '@/interfaces/NodeExecutor'

@Component({ name: 'math.add.node', immediate: true })
@Service({ interfaces: ['NodeSpec'] })
export class AddNodeSpec implements NodeSpec {
  id = 'add'
  category = 'math'
  label = 'Add'
  inputs = [
    { id: 'a', type: 'number', label: 'A' },
    { id: 'b', type: 'number', label: 'B' }
  ]
  outputs = [
    { id: 'sum', type: 'number', label: 'Sum' }
  ]
}

@Component({ name: 'math.add.executor', immediate: true })
@Service({ interfaces: ['NodeExecutor'] })
export class AddNodeExecutor implements NodeExecutor {
  execute(ctx: ExecutionContext): Map<string, unknown> {
    const a = ctx.num('a')
    const b = ctx.num('b')
    return new Map([['sum', a + b]])
  }
}
```

### Task 2: Implement Node Engine Bundle
Create the node engine bundle structure:

```typescript
// bundles/engine/bundle.ts
import type { BundleActivator, BundleContext } from '@pandino/pandino'

class NodeEngineBundleActivator implements BundleActivator {
  async start(context: BundleContext) {
    // Register node engine service
    context.registerService('NodeEngine', new NodeEngine())
    
    // Register service tracker for node executors
    const tracker = new ServiceTracker<NodeExecutor>(
      context, 
      'NodeExecutor', 
      {
        addingService: (ref) => context.getService(ref),
        removedService: (ref, svc) => context.ungetService(ref)
      }
    )
    tracker.open()
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
```

### Task 3: Create Node Engine Service
Implement the core node engine logic:

```typescript
// bundles/engine/NodeEngine.ts
import { ServiceComponentRuntime } from '@pandino/pandino'

export class NodeEngine {
  private executors = new Map<string, NodeExecutor>()
  
  registerExecutor(nodeType: string, executor: NodeExecutor) {
    this.executors.set(nodeType, executor)
  }
  
  executeNode(nodeType: string, context: ExecutionContext): Map<string, unknown> {
    const executor = this.executors.get(nodeType)
    if (!executor) {
      throw new Error(`No executor found for node type: ${nodeType}`)
    }
    return executor.execute(context)
  }
}
```

### Task 4: Create Service Registry for Core State
Implement Pinia store replacements as Pandino services:

```typescript
// bundles/registry/flows/FlowsService.ts
import { Component, Service } from '@pandino/decorators'

@Component({ name: 'flows.service', immediate: true })
@Service({ interfaces: ['FlowsService'] })
export class FlowsService {
  private flows = new Map<string, Flow>()
  
  saveFlow(flowId: string, flow: Flow) {
    this.flows.set(flowId, flow)
  }
  
  getFlow(flowId: string): Flow | null {
    return this.flows.get(flowId) || null
  }
  
  getAllFlows(): Flow[] {
    return Array.from(this.flows.values())
  }
}
```

### Task 5: Implement Service Discovery in Execution Loop
Create the execution loop that discovers and uses services:

```typescript
// bundles/engine/ExecutionLoop.ts
import { useService } from '@pandino/react-hooks'

export function useExecutionLoop() {
  const { service: nodeEngine } = useService<NodeEngine>('NodeEngine')
  
  const executeFrame = useCallback(() => {
    if (!nodeEngine) return
    
    // Get all available node executors
    const executorRefs = context.getServiceReferences<NodeExecutor>('NodeExecutor')
    
    // Execute nodes in topological order
    // ...
  }, [nodeEngine])
  
  return { executeFrame }
}
```

## Next Steps

1. Begin with Task 1: Convert Node Definitions to Services
2. Proceed to Task 2: Implement Node Engine Bundle
3. Implement Task 3: Create Node Engine Service
4. Complete Task 4: Create Service Registry for Core State
5. Finalize Task 5: Implement Service Discovery in Execution Loop