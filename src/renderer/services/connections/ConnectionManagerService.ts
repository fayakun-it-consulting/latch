// src/renderer/services/connections/ConnectionManagerService.ts
import { Component, Service } from '@pandino/decorators'

@Component({ name: 'connection.manager.service', immediate: true })
@Service({ interfaces: ['ConnectionManagerService'] })
export class ConnectionManagerService {
  private connections = new Map<string, any>()

  createConnection(id: string, type: string, config: any): any {
    let conn
    switch (type) {
      case 'websocket':
        conn = new WebSocketConnection(config)
        break
      case 'mqtt':
        conn = new MQTTConnection(config)
        break
      default:
        throw new Error(`Unsupported connection type: ${type}`)
    }
    this.connections.set(id, conn)
    return conn
  }

  getConnection(id: string): any {
    return this.connections.get(id)
  }

  closeConnection(id: string) {
    const conn = this.connections.get(id)
    if (conn) {
      conn.close()
      this.connections.delete(id)
    }
  }
}

// Dummy connection implementations
class WebSocketConnection {
  constructor(private config: any) {}
  close() {}
}
class MQTTConnection {
  constructor(private config: any) {}
  close() {}
}
