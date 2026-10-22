// src/renderer/services/executors/ShaderExecutor.ts
import { NodeExecutor } from '@/interfaces/NodeExecutor'
import type { ExecutionContext } from '@/interfaces/NodeSpec'
import * as THREE from 'three'

export class ShaderExecutor implements NodeExecutor {
  execute(ctx: ExecutionContext): Map<string, unknown> {
    const rendererService = ctx.getService('ThreeJSRendererService')
    const { renderer, scene, camera } = rendererService.init(ctx.canvas as HTMLCanvasElement)

    const material = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: ctx.str('vertexShader', ''),
      fragmentShader: ctx.str('fragmentShader', ''),
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    renderer.render(scene, camera)

    return new Map([['mesh', mesh]])
  }
}
