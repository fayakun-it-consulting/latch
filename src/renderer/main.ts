// src/main.ts - Updated main entry point for React + Pandino
import 'reflect-metadata'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PandinoProvider } from '@pandino/react-hooks'
import App from './App'

// Initialize Pandino framework
async function initializePandino() {
  try {
    // Import Pandino bootstrap
    const { OSGiBootstrap, LogLevel } = await import('@pandino/pandino')
    
    const bootstrap = new OSGiBootstrap({
      frameworkLogLevel: LogLevel.INFO,
    })
    
    const framework = await bootstrap.start()
    const context = framework.getBundleContext()
    
    return { framework, context }
  } catch (error) {
    console.error('Failed to initialize Pandino:', error)
    throw error
  }
}

// Main application entry point
async function main() {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    throw new Error('Root element not found')
  }

  // Initialize Pandino first
  const { framework, context } = await initializePandino()
  
  // Render React app with Pandino Provider
  createRoot(rootElement).render(
    <StrictMode>
      <PandinoProvider
        bundles={[
          // Load core bundles
        ]}
        bootstrapConfig={{
          frameworkLogLevel: LogLevel.INFO
        }}
      >
        <App />
      </PandinoProvider>
    </StrictMode>
  )
}

main().catch(console.error)