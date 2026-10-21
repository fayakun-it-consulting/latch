// src/components/nodes/NodeExecutorProvider.tsx
import React, { createContext, useContext } from 'react'
import { useService } from '@pandino/react-hooks'
import type { NodeExecutor } from '@/interfaces/NodeExecutor'

interface NodeExecutorContextType {
  getExecutor: (nodeType: string) => NodeExecutor | null
}

const NodeExecutorContext = createContext<NodeExecutorContextType | undefined>(undefined)

export const NodeExecutorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { service: nodeEngine } = useService<NodeEngine>('NodeEngine')
  
  const getExecutor = (nodeType: string): NodeExecutor | null => {
    // This would use the node engine to get the appropriate executor
    return null
  }
  
  return (
    <NodeExecutorContext.Provider value={{ getExecutor }}>
      {children}
    </NodeExecutorContext.Provider>
  )
}

export const useNodeExecutor = () => {
  const context = useContext(NodeExecutorContext)
  if (!context) {
    throw new Error('useNodeExecutor must be used within NodeExecutorProvider')
  }
  return context
}