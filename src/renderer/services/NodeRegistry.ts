// src/services/NodeRegistry.ts
import { Component, Service } from '@pandino/decorators'

@Component({ name: 'node.registry.service', immediate: true })
@Service({ interfaces: ['NodeRegistry'] })
export class NodeRegistry {
  private nodeSpecs = new Map<string, NodeSpec>()
  private categories = new Set<string>()
  
  registerNode(nodeSpec: NodeSpec) {
    this.nodeSpecs.set(nodeSpec.id, nodeSpec)
    this.categories.add(nodeSpec.category)
  }
  
  getNodeSpec(nodeType: string): NodeSpec | null {
    return this.nodeSpecs.get(nodeType) || null
  }
  
  getAllNodeSpecs(): NodeSpec[] {
    return Array.from(this.nodeSpecs.values())
  }
  
  getAllCategories(): string[] {
    return Array.from(this.categories)
  }
  
  getNodesByCategory(category: string): NodeSpec[] {
    return Array.from(this.nodeSpecs.values()).filter(spec => spec.category === category)
  }
}