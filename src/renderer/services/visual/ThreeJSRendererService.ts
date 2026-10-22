// src/renderer/services/visual/ThreeJSRendererService.ts
import { Component, Service } from '@pandino/decorators'
import * as THREE from 'three'

@Component({ name: 'three.js.renderer.service', immediate: true })
@Service({ interfaces: ['ThreeJSRendererService'] })
export class ThreeJSRendererService {
  private renderer: THREE.WebGLRenderer | null = null
  private scene: THREE.Scene | null = null
  private camera: THREE.PerspectiveCamera | null = null

  init(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas })
    this.renderer.setSize(canvas.width, canvas.height)
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000)
    this.camera.position.z = 5
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
