# LATCH Migration to React with Pandino OSGi Framework

## Overview

This document outlines the migration plan for transitioning LATCH from its current Vue 3 + TypeScript architecture to a React-based architecture with Pandino OSGi framework integration. The migration aims to leverage Pandino's modular architecture while maintaining all existing functionality.

## Current Architecture (Vue 3)

### Key Components
1. **Node Registry System** - Auto-discovery using glob imports (`registry/nodeRegistry.ts`)
2. **Execution Engine** - Frame-based execution with topological sorting (`engine/ExecutionEngine.ts`)
3. **State Management** - Pinia stores for flows, nodes, runtime, UI, etc.
4. **Node Definition & Behavior** - Co-located node definitions with executors
5. **UI Components** - Vue components for node rendering, controls, and canvas
6. **Services** - Audio, visual, AI, connection management, etc.

## Pandino OSGi Framework Overview

Pandino provides an OSGi-style modular architecture with:
- Service Registry
- Bundle Lifecycle Management
- Dynamic Service Discovery
- Declarative Services (SCR)
- EventAdmin for messaging
- ConfigurationAdmin for runtime configuration

## Migration Strategy

### Phase 1: Foundation & Architecture
**Objective**: Establish React + Pandino foundation while maintaining core functionality

### Phase 2: Node System Migration
**Objective**: Migrate node definitions and execution engine to Pandino architecture

### Phase 3: UI Migration
**Objective**: Replace Vue UI components with React components using Pandino services

### Phase 4: Services Migration
**Objective**: Migrate all service implementations to Pandino bundles

### Phase 5: Integration and Testing
**Objective**: Complete integration and thorough testing

## Implementation Plan

### Phase 1: Foundation & Architecture

#### 1.1 Update Build System
- Replace Vite/Vue build with React build system
- Add Pandino framework dependencies:
  ```bash
  npm install @pandino/pandino @pandino/react-hooks reflect-metadata
  ```
- Configure TypeScript for decorators and metadata

#### 1.2 Core Architecture Redesign
- Create service-oriented architecture with Pandino bundles
- Implement bundle structure for:
  - Node execution engine bundle
  - Registry management bundle
  - UI rendering bundle
  - Service bundles (audio, visual, AI, connections)

#### 1.3 Service Registration System
- Replace Vue components with Pandino services
- Convert node executors into declarative services
- Create service registration patterns for node behavior

### Phase 2: Node System Migration

#### 2.1 Node Definition Migration
- Convert node definitions from `registry/<category>/<id>/node.ts` to Pandino services
- Each node definition becomes a service with:
  - Node specification as service properties
  - Executor implementation as service
  - Lifecycle management via Pandino

#### 2.2 Execution Engine Migration
- Convert `ExecutionEngine.ts` to a Pandino bundle
- Replace Vue Flow integration with React-based canvas
- Implement service-based node execution with proper lifecycle management

#### 2.3 State Management Migration
- Replace Pinia stores with Pandino-managed services
- Create service registry for:
  - Flows service
  - Nodes service
  - Runtime service
  - UI service
  - History service
  - Assets service

### Phase 3: UI Migration

#### 3.1 Canvas and Node Rendering
- Create React-based node rendering system
- Replace `BaseNode.vue` with React component
- Implement React hooks for service consumption
- Migrate node preview components to React

#### 3.2 Controls and UI Components
- Convert control components to React
- Replace Vue controls with React equivalents
- Migrate UI panels and editors to React

#### 3.3 Canvas Interactions
- Implement React-based canvas with drag-and-drop
- Replace Vue Flow components with React equivalents
- Migrate connection handling to React

### Phase 4: Services Migration

#### 4.1 Audio Services
- Migrate Tone.js and Meyda services to Pandino
- Create service interfaces for audio processing

#### 4.2 Visual Services
- Migrate Three.js and WebGL services
- Implement texture and shader processing as services

#### 4.3 AI Services
- Migrate Transformers.js, MediaPipe, ONNX Runtime services
- Create standardized service interfaces for AI processing

#### 4.4 Connection Services
- Migrate connection managers (MQTT, WebSocket, HTTP, BLE, etc.)
- Implement connection lifecycle management via Pandino

#### 4.5 Persistence Services
- Migrate IndexedDB and file format services
- Create service interfaces for data persistence

### Phase 5: Integration and Testing

#### 5.1 Bundle Integration
- Bundle all components into Pandino bundles
- Test service discovery and resolution
- Verify bundle lifecycle management

#### 5.2 Performance Testing
- Test performance with 500+ nodes
- Verify memory management with Pandino's service lifecycle
- Optimize service registration and lookup

#### 5.3 Feature Testing
- Test all node types and their functionality
- Verify node connections and data flow
- Test UI components and canvas interactions

## Benefits of Pandino Integration

1. **Modularity**: Clear separation of concerns with bundles
2. **Dynamic Discovery**: Services can appear/disappear at runtime
3. **Loose Coupling**: Components don't need to know implementation details
4. **Scalability**: Easy to add new node types or services
5. **Maintainability**: Services are self-contained and testable
6. **Runtime Flexibility**: Add/remove services without rebuild

## Risk Mitigation

1. **Gradual Migration**: Phase by phase approach to minimize risk
2. **Backward Compatibility**: Maintain existing node functionality
3. **Testing**: Comprehensive unit and integration testing
4. **Documentation**: Clear migration path and patterns
5. **Rollback Strategy**: Ability to revert to Vue implementation

## Next Steps

This documentation serves as the foundation for the migration. Implementation will begin with Phase 1: Foundation & Architecture.
