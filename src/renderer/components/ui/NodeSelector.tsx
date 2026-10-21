// src/components/ui/NodeSelector.tsx
import React, { useState, useEffect } from 'react'
import { useService } from '@pandino/react-hooks'

export const NodeSelector: React.FC = () => {
  const { service: nodeRegistry } = useService<NodeRegistry>('NodeRegistry')
  
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  useEffect(() => {
    if (nodeRegistry) {
      const allCategories = nodeRegistry.getAllCategories()
      setCategories(allCategories)
    }
  }, [nodeRegistry])
  
  const filteredNodes = selectedCategory === 'all' 
    ? nodeRegistry?.getAllNodes() 
    : nodeRegistry?.getNodesByCategory(selectedCategory)
  
  return (
    <div className="node-selector">
      <div className="category-tabs">
        <button 
          className={selectedCategory === 'all' ? 'active' : ''}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            className={selectedCategory === category.id ? 'active' : ''}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      <div className="node-list">
        {filteredNodes?.map(node => (
          <div key={node.id} className="node-item">
            <div className="node-icon">{node.category}</div>
            <span className="node-label">{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Dummy types for now
interface Category {
  id: string
  label: string
}

interface Node {
  id: string
  type: string
  label: string
  category: string
}