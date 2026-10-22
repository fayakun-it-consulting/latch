# OSGi Migration Overview

This document provides a high‑level view of the migration from the original Vue‑based LATCH editor to a **React + Pandino OSGi** architecture.  The migration is split into five phases, each tackling a distinct aspect of the application:

| Phase | Focus | Key Deliverables |
|-------|-------|------------------|
| 1️⃣ | Foundation & Architecture | React bootstrap, Pandino setup, core interfaces, BundleManager, basic node canvas |
| 2️⃣ | Node System | `NodeRegistry`, `NodeEngine`, `FlowsService`, executor registry, core bundles |
| 3️⃣ | UI Migration | React components (`ReactNode`, `ReactCanvas`, controls, previews), drag‑and‑drop, connection rendering |
| 4️⃣ | Services Migration | Audio, visual, AI, persistence, connections bundles and services (WebAudio, Three.js, model registry, MQTT, etc.) |
| 5️⃣ | Integration & Testing | Performance monitoring, unit/integration tests, CI/CD pipeline, bundle loading logic |

> **Next Steps** – After phase 5, merge the `phase5-testing` branch into `main` and run the full test suite.  Once all tests pass, the new architecture is ready for production.
