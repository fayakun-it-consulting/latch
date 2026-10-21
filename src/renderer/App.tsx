// src/renderer/App.tsx - Main React application component
import React from 'react'
import { useBundleContext } from '@pandino/react-hooks'
import { ReactCanvas } from './components/canvas/ReactCanvas'
import { NodeSelector } from './components/ui/NodeSelector'

const App: React.FC = () => {
  const context = useBundleContext()
  
  if (!context) {
    return <div className="app-loading">Initializing Pandino framework...</div>
  }
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>LATCH - React with Pandino</h1>
      </header>
      
      <div className="app-main">
        <div className="sidebar">
          <NodeSelector />
        </div>
        
        <div className="canvas-container">
          <ReactCanvas />
        </div>
      </div>
    </div>
  )
}

export default App