'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

// Types
export type RealtimeEventType = 
  | 'attendance_update'
  | 'grade_update'
  | 'assignment_update'
  | 'fee_update'
  | 'event_update'
  | 'notice_update'
  | 'chat_message'
  | 'typing_indicator'
  | 'notification'
  | 'user_status_change'
  | 'connection'
  | 'disconnection'
  | 'error'

export interface RealtimeMessage {
  id?: string
  type: RealtimeEventType
  payload: any
  timestamp: string
  senderId?: string
  receiverId?: string
  roomId?: string
}

export interface RealtimeOptions {
  url?: string
  autoConnect?: boolean
  reconnectAttempts?: number
  reconnectInterval?: number
  onMessage?: (message: RealtimeMessage) => void
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: Error) => void
}

export interface RealtimeStats {
  connected: boolean
  messageCount: number
  lastMessageAt: string | null
  reconnectCount: number
}

// Mock WebSocket for development
class MockWebSocket {
  private listeners: Map<string, Function[]> = new Map()
  private isOpen = false
  private messageQueue: any[] = []
  
  constructor(private url: string) {
    setTimeout(() => {
      this.isOpen = true
      this.emit('open', {})
      this.processQueue()
    }, 500)
  }

  public send(data: any) {
    if (!this.isOpen) {
      this.messageQueue.push(data)
      return
    }

    setTimeout(() => {
      // Mock response based on message type
      try {
        const message = JSON.parse(data)
        this.emit('message', { data: JSON.stringify({
          id: message.id,
          type: message.type,
          payload: { received: true, ...message.payload },
          timestamp: new Date().toISOString()
        })})
      } catch (e) {
        // Ignore parse errors
      }
    }, 100)
  }

  public close() {
    this.isOpen = false
    this.emit('close', {})
  }

  public addEventListener(event: string, listener: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(listener)
  }

  public removeEventListener(event: string, listener: Function) {
    const listeners = this.listeners.get(event)
    if (listeners) {
      const index = listeners.indexOf(listener)
      if (index !== -1) {
        listeners.splice(index, 1)
      }
    }
  }

  private emit(event: string, data: any) {
    const listeners = this.listeners.get(event)
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(data)
        } catch (e) {
          console.error('Error in mock WebSocket listener:', e)
        }
      })
    }
  }

  private processQueue() {
    while (this.messageQueue.length > 0) {
      const data = this.messageQueue.shift()
      this.send(data)
    }
  }
}

export function useRealtime(options: RealtimeOptions = {}) {
  const {
    url = process.env.NODE_ENV === 'development' 
      ? 'ws://localhost:3000/ws' 
      : '/ws',
    autoConnect = true,
    reconnectAttempts = 5,
    reconnectInterval = 3000,
    onMessage,
    onConnect,
    onDisconnect,
    onError
  } = options

  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<RealtimeMessage | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [stats, setStats] = useState<RealtimeStats>({
    connected: false,
    messageCount: 0,
    lastMessageAt: null,
    reconnectCount: 0
  })

  const wsRef = useRef<WebSocket | MockWebSocket | null>(null)
  const reconnectCountRef = useRef(0)
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null)
  const messageListenersRef = useRef<Map<string, Function[]>>(new Map())
  const eventListenersRef = useRef<Map<RealtimeEventType, Function[]>>(new Map())

  // Connect to WebSocket
  const connect = useCallback(() => {
    try {
      // Close existing connection
      if (wsRef.current) {
        wsRef.current.close()
      }

      // Create new connection
      const ws = process.env.NODE_ENV === 'development'
        ? new MockWebSocket(url)
        : new WebSocket(url)

      wsRef.current = ws

      // Connection opened
      ws.addEventListener('open', () => {
        setIsConnected(true)
        setError(null)
        reconnectCountRef.current = 0
        
        setStats(prev => ({
          ...prev,
          connected: true,
          reconnectCount: 0
        }))

        if (onConnect) {
          onConnect()
        }
      })

      // Connection closed
      ws.addEventListener('close', () => {
        setIsConnected(false)
        
        setStats(prev => ({
          ...prev,
          connected: false
        }))

        if (onDisconnect) {
          onDisconnect()
        }

        // Attempt to reconnect
        if (reconnectCountRef.current < reconnectAttempts) {
          reconnectCountRef.current++
          
          setStats(prev => ({
            ...prev,
            reconnectCount: reconnectCountRef.current
          }))

          if (reconnectTimerRef.current) {
            clearTimeout(reconnectTimerRef.current)
          }

          reconnectTimerRef.current = setTimeout(() => {
            connect()
          }, reconnectInterval)
        }
      })

      // Connection error
      ws.addEventListener('error', (event) => {
        const errorObj = new Error('WebSocket connection error')
        setError(errorObj)
        
        if (onError) {
          onError(errorObj)
        }
      })

      // Message received
      ws.addEventListener('message', (event) => {
        try {
          const message: RealtimeMessage = JSON.parse(event.data)
          
          setLastMessage(message)
          setStats(prev => ({
            ...prev,
            messageCount: prev.messageCount + 1,
            lastMessageAt: message.timestamp
          }))

          // Call message listeners
          const messageListeners = messageListenersRef.current.get(message.id || '')
          if (messageListeners) {
            messageListeners.forEach(listener => {
              try {
                listener(message)
              } catch (e) {
                console.error('Error in message listener:', e)
              }
            })
          }

          // Call event listeners
          const eventListeners = eventListenersRef.current.get(message.type)
          if (eventListeners) {
            eventListeners.forEach(listener => {
              try {
                listener(message.payload)
              } catch (e) {
                console.error('Error in event listener:', e)
              }
            })
          }

          // Call global onMessage callback
          if (onMessage) {
            onMessage(message)
          }
        } catch (e) {
          console.error('Failed to parse message:', e)
        }
      })

    } catch (err: any) {
      setError(err)
      if (onError) {
        onError(err)
      }
    }
  }, [url, reconnectAttempts, reconnectInterval, onConnect, onDisconnect, onError, onMessage])

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect) {
      connect()
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current)
      }
    }
  }, [autoConnect, connect])

  // Send message
  const send = useCallback((message: Omit<RealtimeMessage, 'timestamp'>) => {
    if (!wsRef.current || !isConnected) {
      throw new Error('WebSocket is not connected')
    }

    const fullMessage: RealtimeMessage = {
      ...message,
      timestamp: new Date().toISOString()
    }

    wsRef.current.send(JSON.stringify(fullMessage))
    return fullMessage
  }, [isConnected])

  // Send and wait for response
  const sendAndWait = useCallback((
    message: Omit<RealtimeMessage, 'timestamp' | 'id'>,
    timeout: number = 5000
  ): Promise<RealtimeMessage> => {
    return new Promise((resolve, reject) => {
      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      const fullMessage = {
        ...message,
        id: messageId,
        timestamp: new Date().toISOString()
      } as RealtimeMessage

      const timeoutId = setTimeout(() => {
        removeListener(messageId)
        reject(new Error('Response timeout'))
      }, timeout)

      const listener = (response: RealtimeMessage) => {
        if (response.id === messageId) {
          clearTimeout(timeoutId)
          removeListener(messageId)
          resolve(response)
        }
      }

      const removeListener = (id: string) => {
        const listeners = messageListenersRef.current.get(id)
        if (listeners) {
          const index = listeners.indexOf(listener)
          if (index !== -1) {
            listeners.splice(index, 1)
          }
        }
      }

      // Add listener
      if (!messageListenersRef.current.has(messageId)) {
        messageListenersRef.current.set(messageId, [])
      }
      messageListenersRef.current.get(messageId)!.push(listener)

      // Send message
      try {
        send(fullMessage)
      } catch (err) {
        clearTimeout(timeoutId)
        removeListener(messageId)
        reject(err)
      }
    })
  }, [send])

  // Subscribe to event type
  const on = useCallback((eventType: RealtimeEventType, listener: (payload: any) => void) => {
    if (!eventListenersRef.current.has(eventType)) {
      eventListenersRef.current.set(eventType, [])
    }
    eventListenersRef.current.get(eventType)!.push(listener)

    // Return unsubscribe function
    return () => {
      const listeners = eventListenersRef.current.get(eventType)
      if (listeners) {
        const index = listeners.indexOf(listener)
        if (index !== -1) {
          listeners.splice(index, 1)
        }
      }
    }
  }, [])

  // Unsubscribe from event type
  const off = useCallback((eventType: RealtimeEventType, listener?: Function) => {
    if (!listener) {
      eventListenersRef.current.delete(eventType)
      return
    }

    const listeners = eventListenersRef.current.get(eventType)
    if (listeners) {
      const index = listeners.indexOf(listener)
      if (index !== -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  // Disconnect
  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current)
      reconnectTimerRef.current = null
    }
    setIsConnected(false)
    reconnectCountRef.current = 0
  }, [])

  // Reconnect
  const reconnect = useCallback(() => {
    disconnect()
    connect()
  }, [connect, disconnect])

  // Send typing indicator
  const sendTypingIndicator = useCallback((
    senderId: string,
    receiverId: string,
    isTyping: boolean,
    roomId?: string
  ) => {
    return send({
      type: 'typing_indicator',
      payload: { senderId, receiverId, isTyping, roomId },
      senderId,
      receiverId,
      roomId
    })
  }, [send])

  // Send attendance update
  const sendAttendanceUpdate = useCallback((
    studentId: string,
    status: string,
    date: string,
    markedBy: string
  ) => {
    return send({
      type: 'attendance_update',
      payload: { studentId, status, date, markedBy }
    })
  }, [send])

  // Send grade update
  const sendGradeUpdate = useCallback((
    studentId: string,
    subject: string,
    grade: number,
    examId: string,
    enteredBy: string
  ) => {
    return send({
      type: 'grade_update',
      payload: { studentId, subject, grade, examId, enteredBy }
    })
  }, [send])

  // Send assignment update
  const sendAssignmentUpdate = useCallback((
    assignmentId: string,
    title: string,
    status: string,
    dueDate: string,
    teacherId: string
  ) => {
    return send({
      type: 'assignment_update',
      payload: { assignmentId, title, status, dueDate, teacherId }
    })
  }, [send])

  // Send fee update
  const sendFeeUpdate = useCallback((
    studentId: string,
    amount: number,
    status: string,
    dueDate: string
  ) => {
    return send({
      type: 'fee_update',
      payload: { studentId, amount, status, dueDate }
    })
  }, [send])

  // Send event update
  const sendEventUpdate = useCallback((
    eventId: string,
    title: string,
    startDate: string,
    location: string,
    status: string
  ) => {
    return send({
      type: 'event_update',
      payload: { eventId, title, startDate, location, status }
    })
  }, [send])

  // Send notice update
  const sendNoticeUpdate = useCallback((
    noticeId: string,
    title: string,
    content: string,
    publishedBy: string
  ) => {
    return send({
      type: 'notice_update',
      payload: { noticeId, title, content, publishedBy }
    })
  }, [send])

  // Send chat message
  const sendChatMessage = useCallback((
    senderId: string,
    receiverId: string,
    content: string,
    roomId?: string
  ) => {
    return send({
      type: 'chat_message',
      payload: { senderId, receiverId, content, roomId },
      senderId,
      receiverId,
      roomId
    })
  }, [send])

  // Send notification
  const sendNotification = useCallback((
    title: string,
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info',
    userId?: string
  ) => {
    return send({
      type: 'notification',
      payload: { title, message, type },
      receiverId: userId
    })
  }, [send])

  // Send user status change
  const sendUserStatusChange = useCallback((
    userId: string,
    status: 'online' | 'offline' | 'away' | 'busy'
  ) => {
    return send({
      type: 'user_status_change',
      payload: { userId, status },
      senderId: userId
    })
  }, [send])

  return {
    // State
    isConnected,
    lastMessage,
    error,
    stats,

    // Connection methods
    connect,
    disconnect,
    reconnect,

    // Send methods
    send,
    sendAndWait,

    // Event subscription
    on,
    off,

    // Convenience send methods
    sendTypingIndicator,
    sendAttendanceUpdate,
    sendGradeUpdate,
    sendAssignmentUpdate,
    sendFeeUpdate,
    sendEventUpdate,
    sendNoticeUpdate,
    sendChatMessage,
    sendNotification,
    sendUserStatusChange
  }
}

// Hook for realtime notifications
export function useRealtimeNotifications() {
  const { on, isConnected } = useRealtime()
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    if (!isConnected) return

    const unsubscribe = on('notification', (payload) => {
      setNotifications(prev => [payload, ...prev].slice(0, 50)) // Keep last 50
    })

    return unsubscribe
  }, [isConnected, on])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const removeNotification = useCallback((index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index))
  }, [])

  return {
    notifications,
    clearNotifications,
    removeNotification
  }
}

// Hook for realtime chat
export function useRealtimeChat(roomId?: string) {
  const { on, sendChatMessage, sendTypingIndicator, isConnected } = useRealtime()
  const [messages, setMessages] = useState<any[]>([])
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!isConnected) return

    const unsubscribeMessage = on('chat_message', (payload) => {
      if (!roomId || payload.roomId === roomId) {
        setMessages(prev => [...prev, payload].slice(-100)) // Keep last 100
      }
    })

    const unsubscribeTyping = on('typing_indicator', (payload) => {
      if (!roomId || payload.roomId === roomId) {
        setTypingUsers(prev => {
          const newSet = new Set(prev)
          if (payload.isTyping) {
            newSet.add(payload.senderId)
          } else {
            newSet.delete(payload.senderId)
          }
          return newSet
        })
      }
    })

    return () => {
      unsubscribeMessage()
      unsubscribeTyping()
    }
  }, [isConnected, on, roomId])

  const sendMessage = useCallback((senderId: string, receiverId: string, content: string) => {
    return sendChatMessage(senderId, receiverId, content, roomId)
  }, [sendChatMessage, roomId])

  const sendTyping = useCallback((senderId: string, receiverId: string, isTyping: boolean) => {
    return sendTypingIndicator(senderId, receiverId, isTyping, roomId)
  }, [sendTypingIndicator, roomId])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    typingUsers: Array.from(typingUsers),
    sendMessage,
    sendTyping,
    clearMessages
  }
}

// Hook for realtime presence
export function useRealtimePresence(userId: string) {
  const { on, sendUserStatusChange, isConnected } = useRealtime()
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!isConnected || !userId) return

    // Send online status
    sendUserStatusChange(userId, 'online')

    // Listen for status changes
    const unsubscribe = on('user_status_change', (payload) => {
      setOnlineUsers(prev => {
        const newSet = new Set(prev)
        if (payload.status === 'online' || payload.status === 'away') {
          newSet.add(payload.userId)
        } else {
          newSet.delete(payload.userId)
        }
        return newSet
      })
    })

    // Send offline status on unmount
    return () => {
      unsubscribe()
      sendUserStatusChange(userId, 'offline')
    }
  }, [isConnected, userId, on, sendUserStatusChange])

  const isUserOnline = useCallback((id: string) => {
    return onlineUsers.has(id)
  }, [onlineUsers])

  return {
    onlineUsers: Array.from(onlineUsers),
    isUserOnline
  }
}

// Hook for realtime stats
export function useRealtimeStats() {
  const { stats, isConnected } = useRealtime()
  const [connectionStats, setConnectionStats] = useState({
    uptime: 0,
    messagesPerMinute: 0
  })

  useEffect(() => {
    if (!isConnected) return

    const startTime = Date.now()
    const interval = setInterval(() => {
      const uptime = Math.floor((Date.now() - startTime) / 1000)
      setConnectionStats({
        uptime,
        messagesPerMinute: uptime > 0 ? Math.round((stats.messageCount / uptime) * 60) : 0
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [isConnected, stats.messageCount])

  return {
    ...stats,
    ...connectionStats
  }
}