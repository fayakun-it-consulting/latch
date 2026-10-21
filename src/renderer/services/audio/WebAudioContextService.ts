// src/services/audio/WebAudioContextService.ts
import { Component, Service } from '@pandino/decorators'

@Component({ name: 'web.audio.context.service', immediate: true })
@Service({ interfaces: ['AudioContextService'] })
export class WebAudioContextService {
  private audioContext: AudioContext | null = null
  
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return this.audioContext
  }
  
  getAudioContext(): AudioContext {
    if (!this.audioContext) {
      throw new Error('Audio context not initialized')
    }
    return this.audioContext
  }
  
  dispose() {
    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
    }
  }
}