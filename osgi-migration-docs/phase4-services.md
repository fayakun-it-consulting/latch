# Phase 4: Services Migration

## Objective
Migrate all service implementations to Pandino bundles.

## Implementation Steps

### 1. Audio Services Migration

#### 1.1 Migrate Tone.js and Meyda Services
- Convert audio processing services to Pandino
- Implement service interfaces for audio handling
- Create service lifecycle management for audio resources

#### 1.2 Implement Audio Node Executors
- Migrate existing audio node executors to Pandino services
- Create service-based audio processing pipelines

### 2. Visual Services Migration

#### 2.1 Migrate Three.js and WebGL Services
- Convert 3D rendering services to Pandino
- Implement texture and shader processing as services
- Create service interfaces for visual operations

#### 2.2 Migrate Visual Node Executors
- Migrate visual node executors to Pandino services
- Implement service-based visual processing

### 3. AI Services Migration

#### 3.1 Migrate Transformers.js, MediaPipe Services
- Convert AI processing services to Pandino
- Implement service interfaces for AI model handling
- Create service lifecycle management for AI resources

#### 3.2 Migrate AI Node Executors
- Migrate AI node executors to Pandino services
- Implement service-based AI processing

### 4. Connection Services Migration

#### 4.1 Migrate Connection Managers
- Convert connection managers (MQTT, WebSocket, HTTP, BLE) to Pandino
- Implement service interfaces for connection handling
- Create service lifecycle management for connections

#### 4.2 Migrate Connection Node Executors
- Migrate connection node executors to Pandino services
- Implement service-based connection processing

### 5. Persistence Services Migration

#### 5.1 Migrate IndexedDB Services
- Convert IndexedDB services to Pandino
- Implement service interfaces for data persistence
- Create service lifecycle management for database connections

#### 5.2 Migrate File Format Services
- Migrate file format handling to Pandino
- Implement service interfaces for file operations
- Create service-based file I/O processing

## Implementation Tasks

### Task 1: Create Audio Service Bundle
Create the audio service bundle structure:

```typescript
// bundles/audio/bundle.ts
import type { BundleActivator, BundleContext } from '@pandino/pandino'

class AudioBundleActivator implements BundleActivator {
  async start(context: BundleContext) {
    // Register audio services
    context.registerService('AudioContextService', new WebAudioContextService())
    context.registerService('AudioAnalyzerService', new AudioAnalyzerService())
    context.registerService('AudioNodeExecutor', new AudioNodeExecutor())
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
```

### Task 2: Implement WebAudioContextService
Create service for managing Web Audio API:

```typescript
// bundles/audio/WebAudioContextService.ts
import { Component, Service } from '@pandino/decorators'

@Component({ name: 'web.audio.context.service', immediate: true })
@Service({ interfaces: ['AudioContextService'] })
export class WebAudioContextService {
  private audioContext: AudioContext | null = null
  
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return this.audioContext
  }
  
  getAudioContext(): AudioContext {
    if (!this.audioContext) {
      throw new Error('Audio context not initialized')
    }
    return this.audioContext
  }
  
  dispose() {
    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
    }
  }
}
```

### Task 3: Migrate Audio Node Executors
Create audio-specific node executors:

```typescript
// bundles/audio/executors/OscillatorNodeExecutor.ts
import { Component, Service } from '@pandino/decorators'
import { NodeExecutor } from '@/interfaces/NodeExecutor'

@Component({ name: 'audio.oscillator.executor', immediate: true })
@Service({ interfaces: ['NodeExecutor'] })
export class OscillatorNodeExecutor implements NodeExecutor {
  execute(ctx: ExecutionContext): Map<string, unknown> {
    const audioContextService = ctx.getService<AudioContextService>('AudioContextService')
    const frequency = ctx.num('frequency', 440)
    const type = ctx.str('type', 'sine')
    
    // Create oscillator node
    const oscillator = audioContextService.getAudioContext().createOscillator()
    oscillator.type = type as OscillatorType
    oscillator.frequency.setValueAtTime(frequency, audioContextService.getAudioContext().currentTime)
    
    // Connect to output
    const destination = audioContextService.getAudioContext().destination
    oscillator.connect(destination)
    
    // Start oscillator
    oscillator.start()
    
    // Return output
    return new Map([['audio', oscillator]])
  }
}
```

### Task 4: Create Visual Service Bundle
Create bundle for visual services:

```typescript
// bundles/visual/bundle.ts
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
```

### Task 5: Implement ThreeJSRendererService
Create service for Three.js rendering:

```typescript
// bundles/visual/ThreeJSRendererService.ts
import { Component, Service } from '@pandino/decorators'

@Component({ name: 'three.js.renderer.service', immediate: true })
@Service({ interfaces: ['ThreeJSRendererService'] })
export class ThreeJSRendererService {
  private renderer: THREE.WebGLRenderer | null = null
  private scene: THREE.Scene | null = null
  private camera: THREE.PerspectiveCamera | null = null
  
  init(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas })
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000)
    
    return { renderer: this.renderer, scene: this.scene, camera: this.camera }
  }
  
  render() {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera)
    }
  }
  
  dispose() {
    this.renderer?.dispose()
    this.renderer = null
    this.scene = null
    this.camera = null
  }
}
```

### Task 6: Migrate AI Services
Create AI service bundle:

```typescript
// bundles/ai/bundle.ts
import type { BundleActivator, BundleContext } from '@pandino/pandino'

class AIBundleActivator implements BundleActivator {
  async start(context: BundleContext) {
    // Register AI services
    context.registerService('ModelRegistryService', new ModelRegistryService())
    context.registerService('InferenceService', new InferenceService())
    context.registerService('AIModelExecutor', new AIModelExecutor())
  }
}

export default {
  headers: {
    bundleSymbolicName: 'latch.ai',
    bundleVersion: '1.0.0',
    bundleName: 'AI Services Bundle'
  },
  activator: new AIBundleActivator()
}
```

### Task 7: Implement Model Registry Service
Create service for managing AI models:

```typescript
// bundles/ai/ModelRegistryService.ts
import { Component, Service } from '@pandino/decorators'

@Component({ name: 'ai.model.registry.service', immediate: true })
@Service({ interfaces: ['ModelRegistryService'] })
export class ModelRegistryService {
  private models = new Map<string, any>()
  
  registerModel(modelId: string, model: any) {
    this.models.set(modelId, model)
  }
  
  getModel(modelId: string): any {
    return this.models.get(modelId)
  }
  
  getModelNames(): string[] {
    return Array.from(this.models.keys())
  }
  
  unregisterModel(modelId: string) {
    this.models.delete(modelId)
  }
}
```

### Task 8: Migrate Connection Services
Create connection service bundle:

```typescript
// bundles/connections/bundle.ts
import type { BundleActivator, BundleContext } from '@pandino/pandino'

class ConnectionBundleActivator implements BundleActivator {
  async start(context: BundleContext) {
    // Register connection services
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
  activator: new ConnectionBundleActivator()
}
```

### Task 9: Implement Connection Manager Service
Create service for managing connections:

```typescript
// bundles/connections/ConnectionManagerService.ts
import { Component, Service } from '@pandino/decorators'

@Component({ name: 'connection.manager.service', immediate: true })
@Service({ interfaces: ['ConnectionManagerService'] })
export class ConnectionManagerService {
  private connections = new Map<string, any>()
  
  createConnection(connectionId: string, type: string, config: any): any {
    let connection
    switch (type) {
      case 'websocket':
        connection = new WebSocketConnection(config)
        break
      case 'mqtt':
        connection = new MQTTConnection(config)
        break
      default:
        throw new Error(`Unsupported connection type: ${type}`)
    }
    
    this.connections.set(connectionId, connection)
    return connection
  }
  
  getConnection(connectionId: string): any {
    return this.connections.get(connectionId)
  }
  
  closeConnection(connectionId: string) {
    const connection = this.connections.get(connectionId)
    if (connection) {
      connection.close()
      this.connections.delete(connectionId)
    }
  }
}
```

### Task 10: Migrate Persistence Services
Create persistence service bundle:

```typescript
// bundles/persistence/bundle.ts
import type { BundleActivator, BundleContext } from '@pandino/pandino'

class PersistenceBundleActivator implements BundleActivator {
  async start(context: BundleContext) {
    // Register persistence services
    context.registerService('DatabaseService', new DatabaseService())
    context.registerService('FileFormatService', new FileFormatService())
    context.registerService('AssetService', new AssetService())
  }
}

export default {
  headers: {
    bundleSymbolicName: 'latch.persistence',
    bundleVersion: '1.0.0',
    bundleName: 'Persistence Services Bundle'
  },
  activator: new PersistenceBundleActivator()
}
```

### Task 11: Implement Database Service
Create service for IndexedDB operations:

```typescript
// bundles/persistence/DatabaseService.ts
import { Component, Service } from '@pandino/decorators'

@Component({ name: 'database.service', immediate: true })
@Service({ interfaces: ['DatabaseService'] })
export class DatabaseService {
  private db: Dexie | null = null
  
  async init() {
    this.db = new Dexie('latch')
    this.db.version(1).stores({
      flows: 'id, name, createdAt',
      nodes: 'id, flowId',
      connections: 'id, fromNodeId, toNodeId'
    })
  }
  
  async saveFlow(flow: Flow) {
    if (this.db) {
      await this.db.table('flows').put(flow)
    }
  }
  
  async loadFlow(flowId: string): Promise<Flow | null> {
    if (this.db) {
      return this.db.table('flows').get(flowId)
    }
    return null
  }
  
  async saveAsset(asset: Asset) {
    // Save asset logic
  }
  
  async loadAsset(assetId: string): Promise<Asset | null> {
    // Load asset logic
    return null
  }
  
  async dispose() {
    if (this.db) {
      await this.db.close()
    }
  }
}
```

## Next Steps

1. Begin with Task 1: Create Audio Service Bundle
2. Proceed to Task 2: Implement WebAudioContextService
3. Implement Task 3: Migrate Audio Node Executors
4. Complete Task 4: Create Visual Service Bundle
5. Implement Task 5: Implement ThreeJSRendererService
6. Continue with Task 6: Migrate AI Services
7. Implement Task 7: Implement Model Registry Service
8. Proceed to Task 8: Migrate Connection Services
9. Implement Task 9: Implement Connection Manager Service
10. Complete Task 10: Migrate Persistence Services
11. Implement Task 11: Implement Database Service

This concludes the implementation plan for Phase 4. Each service bundle will be implemented following the same pattern, ensuring consistency and modularity across the Pandino framework.