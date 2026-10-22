// src/renderer/services/PerformanceMonitor.ts
import { Component, Service } from '@pandino/decorators'

@Component({ name: 'performance.monitor.service', immediate: true })
@Service({ interfaces: ['PerformanceMonitor'] })
export class PerformanceMonitor {
  private performanceData = new Map<string, PerformanceData>()

  recordNodeExecution(nodeId: string, execTime: number, memoryUsage?: number) {
    const data = this.performanceData.get(nodeId) || {
      executionTimes: [],
      memoryUsage: [],
      lastExecution: Date.now()
    }
    data.executionTimes.push(execTime)
    if (memoryUsage) data.memoryUsage.push(memoryUsage)
    data.lastExecution = Date.now()
    this.performanceData.set(nodeId, data)
  }

  getNodePerformance(nodeId: string): PerformanceData | null {
    return this.performanceData.get(nodeId) || null
  }

  getAverageExecutionTime(nodeId: string): number {
    const data = this.performanceData.get(nodeId)
    if (!data || data.executionTimes.length === 0) return 0
    const sum = data.executionTimes.reduce((a, b) => a + b, 0)
    return sum / data.executionTimes.length
  }

  getPerformanceReport(): PerformanceReport {
    const reports: NodePerformanceReport[] = []
    for (const [nodeId, data] of this.performanceData.entries()) {
      reports.push({
        nodeId,
        avgExecutionTime: this.getAverageExecutionTime(nodeId),
        lastExecution: data.lastExecution,
        executionCount: data.executionTimes.length
      })
    }
    return { reports, timestamp: Date.now() }
  }
}

interface PerformanceData {
  executionTimes: number[]
  memoryUsage: number[]
  lastExecution: number
}

interface PerformanceReport {
  reports: NodePerformanceReport[]
  timestamp: number
}

interface NodePerformanceReport {
  nodeId: string
  avgExecutionTime: number
  lastExecution: number
  executionCount: number
}
