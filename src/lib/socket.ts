// A:/instagram-clone-fullstack/src/lib/socket.ts
import { io, Socket } from "socket.io-client"

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001"

class SocketManager {
  private socket: Socket | null = null
  private listeners: Map<string, Set<Function>> = new Map()

  connect(token?: string) {
    if (this.socket?.connected) return

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket", "polling"],
      autoConnect: true,
    })

    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket?.id)
    })

    this.socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason)
    })

    this.socket.on("error", (error) => {
      console.error("Socket error:", error)
    })

    // Re-emit events to local listeners
    this.socket.onAny((event, ...args) => {
      const listeners = this.listeners.get(event)
      if (listeners) {
        listeners.forEach((callback) => callback(...args))
      }
    })
  }

  disconnect() {
    this.socket?.disconnect()
    this.socket = null
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(callback)

    // Return unsubscribe function
    return () => {
      this.off(event, callback)
    }
  }

  off(event: string, callback: Function) {
    this.listeners.get(event)?.delete(callback)
  }

  emit(event: string, ...args: any[]) {
    this.socket?.emit(event, ...args)
  }

  // Convenience methods for Instagram events
  onNewLike(callback: (data: { postId: string; userId: string }) => void) {
    return this.on("like:new", callback)
  }

  onNewComment(callback: (data: { postId: string; comment: any }) => void) {
    return this.on("comment:new", callback)
  }

  onNewMessage(callback: (data: { conversationId: string; message: any }) => void) {
    return this.on("message:new", callback)
  }

  onNewNotification(callback: (data: { notification: any }) => void) {
    return this.on("notification:new", callback)
  }

  onStoryView(callback: (data: { storyId: string; viewerId: string }) => void) {
    return this.on("story:view", callback)
  }

  joinConversation(conversationId: string) {
    this.emit("conversation:join", conversationId)
  }

  leaveConversation(conversationId: string) {
    this.emit("conversation:leave", conversationId)
  }

  markNotificationRead(notificationId: string) {
    this.emit("notification:read", notificationId)
  }
}

export const socketManager = new SocketManager()

// React hook for using socket
import { useEffect, useRef } from "react"
import { useSession } from "next-auth/react"

export function useSocket() {
  const { data: session } = useSession()
  const initialized = useRef(false)

  useEffect(() => {
    if (session?.user && !initialized.current) {
      socketManager.connect()
      initialized.current = true
    } else if (!session?.user && initialized.current) {
      socketManager.disconnect()
      initialized.current = false
    }

    return () => {
      // Don't disconnect on unmount, only on sign out
    }
  }, [session?.user])

  return socketManager
}