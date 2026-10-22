// src/renderer/services/audio/AudioAnalyzerService.ts
import { Component, Service } from '@pandino/decorators'

@Component({ name: 'audio.analyzer.service', immediate: true })
@Service({ interfaces: ['AudioAnalyzerService'] })
export class AudioAnalyzerService {
  private analyser: AnalyserNode | null = null

  createAnalyser(context: AudioContext): AnalyserNode {
    this.analyser = context.createAnalyser()
    return this.analyser
  }

  getAnalyser(): AnalyserNode | null {
    return this.analyser
  }

  dispose() {
    this.analyser = null
  }
}
