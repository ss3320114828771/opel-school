// WebSocket event types
export type WebSocketEventType = 
  | 'connection'
  | 'disconnection'
  | 'message'
  | 'notification'
  | 'attendance_update'
  | 'grade_update'
  | 'assignment_update'
  | 'fee_update'
  | 'event_update'
  | 'notice_update'
  | 'chat_message'
  | 'typing_indicator'
  | 'user_status_change'
  | 'error'

// WebSocket message interface
export interface WebSocketMessage {
  type: WebSocketEventType
  payload: any
  timestamp: string
  senderId?: string
  receiverId?: string
  roomId?: string
  id?: string
}

// WebSocket connection options
export interface WebSocketOptions {
  url: string
  reconnectAttempts?: number
  reconnectInterval?: number
  heartbeatInterval?: number
  onOpen?: (wsEvent: Event) => void
  onClose?: (wsEvent: CloseEvent) => void
  onError?: (wsEvent: Event) => void
  onMessage?: (message: WebSocketMessage) => void
}

// WebSocket connection state
export type ConnectionState = 
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'reconnecting'
  | 'failed'

// WebSocket event listeners
type EventListener = (data: any) => void

// WebSocket client class
export class WebSocketClient {
  private socket: WebSocket | null = null
  private options: WebSocketOptions
  private reconnectCount: number = 0
  private reconnectTimer: NodeJS.Timeout | null = null
  private heartbeatTimer: NodeJS.Timeout | null = null
  private connectionState: ConnectionState = 'disconnected'
  private eventListeners: Map<string, EventListener[]> = new Map()
  private messageQueue: WebSocketMessage[] = []
  private connectionPromise: Promise<void> | null = null
  private connectionResolver: (() => void) | null = null
  private connectionRejecter: ((error: Error) => void) | null = null

  constructor(options: WebSocketOptions) {
    this.options = {
      reconnectAttempts: 5,
      reconnectInterval: 3000,
      heartbeatInterval: 30000,
      ...options
    }
  }

  // Connect to WebSocket server
  public connect(): Promise<void> {
    if (this.connectionState === 'connected') {
      return Promise.resolve()
    }

    if (this.connectionPromise) {
      return this.connectionPromise
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      this.connectionResolver = resolve
      this.connectionRejecter = reject
    })

    try {
      this.connectionState = 'connecting'
      this.socket = new WebSocket(this.options.url)

      this.socket.onopen = this.handleOpen.bind(this)
      this.socket.onclose = this.handleClose.bind(this)
      this.socket.onerror = this.handleError.bind(this)
      this.socket.onmessage = this.handleMessage.bind(this)

    } catch (err) {
      this.connectionState = 'failed'
      this.connectionPromise = null
      if (this.connectionRejecter) {
        this.connectionRejecter(err as Error)
      }
      return Promise.reject(err)
    }

    return this.connectionPromise
  }

  // Disconnect from WebSocket server
  public disconnect(): void {
    this.clearTimers()
    this.reconnectCount = 0
    this.connectionState = 'disconnected'
    this.messageQueue = []

    if (this.socket) {
      this.socket.close()
      this.socket = null
    }

    this.eventListeners.clear()
    
    if (this.connectionResolver) {
      this.connectionResolver = null
    }
    if (this.connectionRejecter) {
      this.connectionRejecter = null
    }
    this.connectionPromise = null
  }

  // Send message through WebSocket
  public send(message: WebSocketMessage): boolean {
    if (this.connectionState !== 'connected' || !this.socket) {
      this.messageQueue.push(message)
      return false
    }

    try {
      this.socket.send(JSON.stringify(message))
      return true
    } catch (err) {
      console.error('Failed to send message:', err)
      this.messageQueue.push(message)
      return false
    }
  }

  // Send message and wait for response
  public sendAndWait(
    message: WebSocketMessage,
    timeout: number = 5000
  ): Promise<WebSocketMessage> {
    return new Promise((resolve, reject) => {
      const messageId = this.generateMessageId()
      const sentMessage = { ...message, id: messageId }

      const timeoutId = setTimeout(() => {
        this.off(messageId)
        reject(new Error('Response timeout'))
      }, timeout)

      const responseHandler = (response: WebSocketMessage) => {
        if (response.id === messageId) {
          clearTimeout(timeoutId)
          this.off(messageId)
          resolve(response)
        }
      }

      this.on(messageId, responseHandler)

      if (!this.send(sentMessage)) {
        clearTimeout(timeoutId)
        this.off(messageId)
        reject(new Error('Failed to send message'))
      }
    })
  }

  // Subscribe to event
  public on(eventType: string, listener: EventListener): void {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, [])
    }
    const listeners = this.eventListeners.get(eventType)
    if (listeners) {
      listeners.push(listener)
    }
  }

  // Unsubscribe from event
  public off(eventType: string, listener?: EventListener): void {
    if (!this.eventListeners.has(eventType)) return

    if (!listener) {
      this.eventListeners.delete(eventType)
      return
    }

    const listeners = this.eventListeners.get(eventType)
    if (listeners) {
      const index = listeners.indexOf(listener)
      if (index !== -1) {
        listeners.splice(index, 1)
      }
    }
  }

  // Get connection state
  public getState(): ConnectionState {
    return this.connectionState
  }

  // Check if connected
  public isConnected(): boolean {
    return this.connectionState === 'connected'
  }

  // Get message queue
  public getMessageQueue(): WebSocketMessage[] {
    return [...this.messageQueue]
  }

  // Clear message queue
  public clearMessageQueue(): void {
    this.messageQueue = []
  }

  // Private: Handle WebSocket open event
  private handleOpen(wsEvent: Event): void {
    this.connectionState = 'connected'
    this.reconnectCount = 0
    this.startHeartbeat()

    // Send queued messages
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()
      if (message) {
        this.send(message)
      }
    }

    if (this.connectionResolver) {
      this.connectionResolver()
      this.connectionResolver = null
      this.connectionRejecter = null
      this.connectionPromise = null
    }

    this.emit('connection', { event: wsEvent })
    if (this.options.onOpen) {
      this.options.onOpen(wsEvent)
    }
  }

  // Private: Handle WebSocket close event
  private handleClose(wsEvent: CloseEvent): void {
    this.connectionState = 'disconnected'
    this.stopHeartbeat()

    this.emit('disconnection', { event: wsEvent })
    if (this.options.onClose) {
      this.options.onClose(wsEvent)
    }

    // Attempt to reconnect
    if (this.shouldReconnect()) {
      this.reconnect()
    }
  }

  // Private: Handle WebSocket error event
  private handleError(wsEvent: Event): void {
    this.emit('error', { event: wsEvent })
    if (this.options.onError) {
      this.options.onError(wsEvent)
    }

    if (this.connectionRejecter) {
      this.connectionRejecter(new Error('WebSocket connection failed'))
      this.connectionResolver = null
      this.connectionRejecter = null
      this.connectionPromise = null
    }
  }

  // Private: Handle WebSocket message event
  private handleMessage(wsEvent: MessageEvent): void {
    try {
      const message: WebSocketMessage = JSON.parse(wsEvent.data)
      this.emit(message.type, message.payload)
      this.emit('message', message)
      
      if (this.options.onMessage) {
        this.options.onMessage(message)
      }
    } catch (err) {
      console.error('Failed to parse message:', err)
    }
  }

  // Private: Emit event to listeners
  private emit(eventType: string, data: any): void {
    const listeners = this.eventListeners.get(eventType)
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(data)
        } catch (err) {
          console.error(`Error in ${eventType} listener:`, err)
        }
      })
    }
  }

  // Private: Start heartbeat
  private startHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
    }

    this.heartbeatTimer = setInterval(() => {
      if (this.isConnected()) {
        this.send({
          type: 'message',
          payload: { type: 'heartbeat' },
          timestamp: new Date().toISOString()
        })
      }
    }, this.options.heartbeatInterval)
  }

  // Private: Stop heartbeat
  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  // Private: Check if should reconnect
  private shouldReconnect(): boolean {
    return this.reconnectCount < (this.options.reconnectAttempts || 5)
  }

  // Private: Reconnect to WebSocket server
  private reconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
    }

    this.reconnectCount++
    this.connectionState = 'reconnecting'

    this.reconnectTimer = setTimeout(() => {
      this.connect().catch(err => {
        console.error('Reconnection failed:', err)
      })
    }, this.options.reconnectInterval)
  }

  // Private: Clear all timers
  private clearTimers(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
    this.stopHeartbeat()
  }

  // Private: Generate unique message ID
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
  }
}

// WebSocket message builders
export class WebSocketMessageBuilder {
  static notification(
    title: string,
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info',
    userId?: string
  ): WebSocketMessage {
    return {
      type: 'notification',
      payload: { title, message, type },
      timestamp: new Date().toISOString(),
      receiverId: userId
    }
  }

  static attendanceUpdate(
    studentId: string,
    status: string,
    date: string,
    markedBy: string
  ): WebSocketMessage {
    return {
      type: 'attendance_update',
      payload: { studentId, status, date, markedBy },
      timestamp: new Date().toISOString()
    }
  }

  static gradeUpdate(
    studentId: string,
    subject: string,
    grade: number,
    examId: string,
    enteredBy: string
  ): WebSocketMessage {
    return {
      type: 'grade_update',
      payload: { studentId, subject, grade, examId, enteredBy },
      timestamp: new Date().toISOString()
    }
  }

  static assignmentUpdate(
    assignmentId: string,
    title: string,
    status: string,
    dueDate: string,
    teacherId: string
  ): WebSocketMessage {
    return {
      type: 'assignment_update',
      payload: { assignmentId, title, status, dueDate, teacherId },
      timestamp: new Date().toISOString()
    }
  }

  static feeUpdate(
    studentId: string,
    amount: number,
    status: string,
    dueDate: string
  ): WebSocketMessage {
    return {
      type: 'fee_update',
      payload: { studentId, amount, status, dueDate },
      timestamp: new Date().toISOString()
    }
  }

  static eventUpdate(
    eventId: string,
    title: string,
    startDate: string,
    location: string,
    status: string
  ): WebSocketMessage {
    return {
      type: 'event_update',
      payload: { eventId, title, startDate, location, status },
      timestamp: new Date().toISOString()
    }
  }

  static noticeUpdate(
    noticeId: string,
    title: string,
    content: string,
    publishedBy: string
  ): WebSocketMessage {
    return {
      type: 'notice_update',
      payload: { noticeId, title, content, publishedBy },
      timestamp: new Date().toISOString()
    }
  }

  static chatMessage(
    senderId: string,
    receiverId: string,
    content: string,
    roomId?: string
  ): WebSocketMessage {
    return {
      type: 'chat_message',
      payload: { senderId, receiverId, content, roomId },
      timestamp: new Date().toISOString(),
      senderId,
      receiverId,
      roomId
    }
  }

  static typingIndicator(
    senderId: string,
    receiverId: string,
    isTyping: boolean,
    roomId?: string
  ): WebSocketMessage {
    return {
      type: 'typing_indicator',
      payload: { senderId, receiverId, isTyping, roomId },
      timestamp: new Date().toISOString(),
      senderId,
      receiverId,
      roomId
    }
  }

  static userStatusChange(
    userId: string,
    status: 'online' | 'offline' | 'away' | 'busy'
  ): WebSocketMessage {
    return {
      type: 'user_status_change',
      payload: { userId, status },
      timestamp: new Date().toISOString()
    }
  }
}

// WebSocket hook for React (if using React)
export function useWebSocket(options: WebSocketOptions): WebSocketClient {
  const client = new WebSocketClient(options)
  return client
}

// WebSocket server mock for development
export class MockWebSocketServer {
  private clients: WebSocket[] = []
  private messageHandlers: Map<string, (msg: WebSocketMessage) => void> = new Map()

  constructor() {
    console.log('Mock WebSocket server started')
  }

  public broadcast(message: WebSocketMessage): void {
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message))
      }
    })
  }

  public sendToUser(userId: string, message: WebSocketMessage): void {
    // In a real server, you would find the client by userId
    this.broadcast(message)
  }

  public sendToRoom(roomId: string, message: WebSocketMessage): void {
    // In a real server, you would find clients in the room
    this.broadcast(message)
  }

  public registerHandler(
    messageType: WebSocketEventType,
    handler: (msg: WebSocketMessage, client: WebSocket) => void
  ): void {
    this.messageHandlers.set(messageType, (msg: WebSocketMessage) => {
      // Find client and call handler
      console.log(`Handling ${messageType} message:`, msg)
    })
  }

  public getConnectedClients(): number {
    return this.clients.length
  }
}

// WebSocket connection manager
export class WebSocketConnectionManager {
  private connections: Map<string, WebSocketClient> = new Map()

  public createConnection(id: string, options: WebSocketOptions): WebSocketClient {
    if (this.connections.has(id)) {
      return this.connections.get(id)!
    }

    const client = new WebSocketClient(options)
    this.connections.set(id, client)
    return client
  }

  public getConnection(id: string): WebSocketClient | undefined {
    return this.connections.get(id)
  }

  public removeConnection(id: string): void {
    const client = this.connections.get(id)
    if (client) {
      client.disconnect()
      this.connections.delete(id)
    }
  }

  public disconnectAll(): void {
    this.connections.forEach(client => {
      client.disconnect()
    })
    this.connections.clear()
  }

  public broadcastToAll(message: WebSocketMessage): void {
    this.connections.forEach(client => {
      client.send(message)
    })
  }

  public getConnectionCount(): number {
    return this.connections.size
  }

  public getActiveConnections(): WebSocketClient[] {
    return Array.from(this.connections.values()).filter(c => c.isConnected())
  }
}

// WebSocket event constants
export const WEBSOCKET_EVENTS = {
  CONNECTION: 'connection',
  DISCONNECTION: 'disconnection',
  MESSAGE: 'message',
  NOTIFICATION: 'notification',
  ATTENDANCE_UPDATE: 'attendance_update',
  GRADE_UPDATE: 'grade_update',
  ASSIGNMENT_UPDATE: 'assignment_update',
  FEE_UPDATE: 'fee_update',
  EVENT_UPDATE: 'event_update',
  NOTICE_UPDATE: 'notice_update',
  CHAT_MESSAGE: 'chat_message',
  TYPING_INDICATOR: 'typing_indicator',
  USER_STATUS_CHANGE: 'user_status_change',
  ERROR: 'error'
} as const

// WebSocket configuration
export const WEBSOCKET_CONFIG = {
  RECONNECT_ATTEMPTS: 5,
  RECONNECT_INTERVAL: 3000,
  HEARTBEAT_INTERVAL: 30000,
  MESSAGE_TIMEOUT: 5000,
  MAX_MESSAGE_SIZE: 1024 * 1024, // 1MB
  SUPPORTED_PROTOCOLS: ['websocket', 'socket.io'],
  DEFAULT_URL: 'ws://localhost:3000/ws'
} as const