# Step‑by‑Step Migration Roadmap

> This document captures the high‑level plan for migrating the LATCH project from Vue 3 to React with a Pandino OSGi‑style modular architecture.  It is meant as a reference for developers and reviewers.

## Overview

1. **Foundation & Architecture (Phase 1)** – Set up the React app, Pandino bootstrap, and core services.
2. **Node System Migration (Phase 2)** – Implement node registry, engine, and flow services.
3. **UI Migration (Phase 3)** – Create React components for canvas, nodes, controls, and previews.
4. **Services Migration (Phase 4)** – Port audio, visual, AI, persistence, and connection services to Pandino bundles.
5. **Integration & Testing (Phase 5)** – Add performance monitoring, unit tests, and CI pipelines.

Each phase is broken into actionable tasks below.

---

## Phase 1 – Foundation & Architecture

| Task | Description | Files | Notes |
|------|-------------|-------|-------|
| 1.1 | Create React entry point (`main.ts`) and Pandino bootstrap | `src/renderer/main.ts` | Bootstrap Pandino, register core bundles. |
| 1.2 | Set up App component (`App.tsx`) | `src/renderer/App.tsx` | Basic layout, canvas, node selector. |
| 1.3 | Define interfaces (`NodeSpec`, `NodeExecutor`) | `src/renderer/interfaces/NodeSpec.ts`, `NodeExecutor.ts` | Type definitions for nodes. |
| 1.4 | Implement BundleManager service | `src/renderer/services/BundleManager.ts` | Handles loading/unloading bundles. |
| 1.5 | Add React canvas and node components | `src/renderer/components/canvas/ReactCanvas.tsx`, `src/renderer/components/nodes/ReactNode.tsx` | Skeleton components. |

---

## Phase 2 – Node System Migration

| Task | Description | Files | Notes |
|------|-------------|-------|-------|
| 2.1 | Create NodeEngine service | `src/renderer/services/NodeEngine.ts` | Executes node logic. |
| 2.2 | Create NodeRegistry service | `src/renderer/services/NodeRegistry.ts` | Stores node specs. |
| 2.3 | Create FlowsService | `src/renderer/services/FlowsService.ts` | Manages flow data. |
| 2.4 | Set up engine bundle | `src/renderer/bundles/engine/bundle.ts` | Registers services. |
| 2.5 | Register NodeExecutorProvider | `src/renderer/components/nodes/NodeExecutorProvider.tsx` | Context for executors. |
| 2.6 | Build NodeExecutorRegistry | `src/renderer/services/NodeExecutorRegistry.ts` | Imports & registers executors. |
| 2.7 | Add sample executors (Add, Multiply) | `src/renderer/services/executors/*.ts` | Basic arithmetic nodes. |

---

## Phase 3 – UI Migration

| Task | Description | Files | Notes |
|------|-------------|-------|-------|
| 3.1 | Build ReactControl component | `src/renderer/components/controls/ReactControl.tsx` | Renders sliders, toggles, selects. |
| 3.2 | Build NodeView component | `src/renderer/components/controls/NodeView.tsx` | Declarative UI rendering. |
| 3.3 | Build TexturePreview | `src/renderer/components/preview/TexturePreview.tsx` | Canvas preview placeholder. |
| 3.4 | Implement CanvasInteraction | `src/renderer/components/canvas/CanvasInteraction.tsx` | Drag‑and‑drop, zoom/pan. |
| 3.5 | Wire ReactNode to use NodeView | `src/renderer/components/nodes/ReactNode.tsx` | Render ports and body. |
| 3.6 | Finalize ReactCanvas | `src/renderer/components/canvas/ReactCanvas.tsx` | Integrate DnD, connections. |
| 3.7 | Create UI bundle | `src/renderer/bundles/ui/bundle.ts` | Registers UI services. |

---

## Phase 4 – Services Migration

| Task | Description | Files | Notes |
|------|-------------|-------|-------|
| 4.1 | Audio bundle & services | `bundles/audio/bundle.ts`, `services/audio/*.ts` | WebAudio context & analyser. |
| 4.2 | Visual bundle & services | `bundles/visual/bundle.ts`, `services/visual/*.ts` | Three.js renderer & shaders. |
| 4.3 | AI bundle & services | `bundles/ai/bundle.ts`, `services/ai/*.ts` | Model registry & inference. |
| 4.4 | Persistence bundle & services | `bundles/persistence/bundle.ts`, `services/persistence/*.ts` | Dexie DB, asset handling. |
| 4.5 | Connections bundle & services | `bundles/connections/bundle.ts`, `services/connections/*.ts` | WebSocket, MQTT, etc. |

---

## Phase 5 – Integration & Testing

| Task | Description | Files | Notes |
|------|-------------|-------|-------|
| 5.1 | PerformanceMonitor service | `src/renderer/services/PerformanceMonitor.ts` | Records exec times. |
| 5.2 | Unit tests for executors | `services/executors/__tests__/*.test.ts` | Jest + Vitest. |
| 5.3 | Integration tests for canvas | `components/canvas/__tests__/*.test.tsx` | React Testing Library. |
| 5.4 | CI pipeline config | `.github/workflows/ci.yml` | Lint, typecheck, test, build. |
| 5.5 | Release workflow | `.github/workflows/release.yml` | Tagging, publishing. |

---

## Deliverables

- **React + Pandino application** – fully functional LATCH editor in React.
- **Modular services** – each core feature (audio, visual, AI, persistence, connections) lives in its own bundle.
- **Comprehensive tests** – unit & integration ensuring regressions are caught.
- **CI/CD pipeline** – automatic linting, typechecking, testing, and builds.

---

### How to Use This Roadmap

1. **Checkout the relevant branch** – e.g., `phase3-ui` for UI work.
2. **Follow the tasks in order** – each row is a concrete change you can implement.
3. **Commit with the appropriate message** – follow the commit style guidelines in `CONTRIBUTING.md`.
4. **Run `npm run typecheck`** before pushing to ensure no TS errors.
5. **Merge into main** after all tests pass.

Happy coding!
