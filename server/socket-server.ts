// A:/instagram-clone-fullstack/server/socket-server.ts
import { Server } from "socket.io"
import { createServer } from "http"
import jwt from "jsonwebtoken"

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXTAUTH_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
})

interface AuthenticatedSocket extends Socket {
  userId?: string
  username?: string
}

const userSockets = new Map<string, Set<string>>() // userId -> Set<socketId>

io.use((socket: AuthenticatedSocket, next) => {
  const token = socket.handshake.auth.token
  if (!token) {
    return next(new Error("Authentication required"))
  }

  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || "secret") as { id: string; username: string }
    socket.userId = decoded.id
    socket.username = decoded.username
    next()
  } catch (err) {
    next(new Error("Invalid token"))
  }
})

io.on("connection", (socket: AuthenticatedSocket) => {
  console.log(`User connected: ${socket.username} (${socket.id})`)

  // Track user sockets
  if (socket.userId) {
    if (!userSockets.has(socket.userId)) {
      userSockets.set(socket.userId, new Set())
    }
    userSockets.get(socket.userId)!.add(socket.id)
  }

  // Join conversation room
  socket.on("conversation:join", (conversationId: string) => {
    socket.join(`conversation:${conversationId}`)
    console.log(`${socket.username} joined conversation ${conversationId}`)
  })

  socket.on("conversation:leave", (conversationId: string) => {
    socket.leave(`conversation:${conversationId}`)
  })

  // Handle new message
  socket.on("message:send", (data: { conversationId: string; message: any }) => {
    io.to(`conversation:${data.conversationId}`).emit("message:new", data.message)
  })

  // Handle typing indicator
  socket.on("typing:start", (conversationId: string) => {
    socket.to(`conversation:${conversationId}`).emit("typing:start", {
      userId: socket.userId,
      username: socket.username,
    })
  })

  socket.on("typing:stop", (conversationId: string) => {
    socket.to(`conversation:${conversationId}`).emit("typing:stop", {
      userId: socket.userId,
    })
  })

  // Handle notifications
  socket.on("notification:read", (notificationId: string) => {
    // Could update database here
  })

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.username} (${socket.id})`)
    if (socket.userId) {
      userSockets.get(socket.userId)?.delete(socket.id)
      if (userSockets.get(socket.userId)?.size === 0) {
        userSockets.delete(socket.userId)
      }
    }
  })
})

// Helper function to send notification to user
export function sendNotificationToUser(userId: string, notification: any) {
  const socketIds = userSockets.get(userId)
  if (socketIds) {
    socketIds.forEach((socketId) => {
      io.to(socketId).emit("notification:new", { notification })
    })
  }
}

// Helper to send real-time updates
export function emitLike(postId: string, userId: string) {
  io.emit("like:new", { postId, userId })
}

export function emitComment(postId: string, comment: any) {
  io.emit("comment:new", { postId, comment })
}

export function emitStoryView(storyId: string, viewerId: string) {
  io.emit("story:view", { storyId, viewerId })
}

const PORT = process.env.SOCKET_PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`)
})

export { io, httpServer }