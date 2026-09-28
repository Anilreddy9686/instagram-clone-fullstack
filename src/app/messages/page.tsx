// A:/instagram-clone-fullstack/src/app/messages/page.tsx
"use client"

import { Header } from "@/components/Header"
import { SuggestedUsers } from "@/components/SuggestedUsers"
import { DesktopSidebar } from "@/components/DesktopSidebar"
import { MobileBottomNav } from "@/components/MobileBottomNav"
import Image from "next/image"
import Link from "next/link"
import { Send, X, Search } from "lucide-react"
import { useState } from "react"

const conversations = [
  { id: "1", username: "nature_lover", displayName: "Nature Lover", avatarUrl: "https://picsum.photos/seed/user1/64/64", lastMessage: "Beautiful photo! 🌅", time: "2h", unread: 2 },
  { id: "2", username: "travel_diary", displayName: "Travel Diary", avatarUrl: "https://picsum.photos/seed/user2/64/64", lastMessage: "Thanks for sharing!", time: "5h", unread: 0 },
  { id: "3", username: "foodie_life", displayName: "Foodie Life", avatarUrl: "https://picsum.photos/seed/user3/64/64", lastMessage: "Looks delicious 🍝", time: "1d", unread: 1 },
]

const messages = [
  { id: "1", senderId: "nature_lover", content: "Hey! Loved your latest post 🌲", time: "10:30 AM", isOwn: false },
  { id: "2", senderId: "me", content: "Thanks so much! 😊", time: "10:31 AM", isOwn: true },
  { id: "3", senderId: "nature_lover", content: "Where was that taken?", time: "10:32 AM", isOwn: false },
  { id: "4", senderId: "me", content: "It's in Yosemite National Park", time: "10:33 AM", isOwn: true },
]

const notes = [
  { id: "1", username: "nature_lover", displayName: "Nature Lover", avatarUrl: "https://picsum.photos/seed/user1/64/64", note: "Just posted a new photo! 🌅" },
  { id: "2", username: "travel_diary", displayName: "Travel Diary", avatarUrl: "https://picsum.photos/seed/user2/64/64", note: "New Reel up! 🏔️" },
  { id: "3", username: "foodie_life", displayName: "Foodie Life", avatarUrl: "https://picsum.photos/seed/user3/64/64", note: "Recipe in bio! 🍝" },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")

  return (
    <div className="min-h-screen bg-[var(--ig-bg)] text-[var(--ig-text)] flex flex-col">
      <Header />
      <MobileBottomNav />
      <main className="flex-1 flex flex-col md:flex-row">
        <DesktopSidebar />

        <div className="flex-1 min-w-0 md:pl-0 lg:pl-8 flex flex-col h-[calc(100vh-var(--ig-mobile-nav))] lg:h-[calc(100vh-64px)]">
          <div className="bg-[var(--ig-bg)] border-r border-[var(--ig-border)] lg:border-r-0 lg:border-l flex-1 flex flex-col h-full">
            {/* Mobile Header */}
            <div className="lg:hidden p-4 border-b border-[var(--ig-border)] flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[var(--ig-text)]">Messages</h2>
              <Send size={24} className="text-[var(--ig-text)]" />
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:p-4 border-b border-[var(--ig-border)] flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[var(--ig-text)]">Messages</h2>
              <Send size={24} className="text-[var(--ig-text-secondary)]" />
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-[var(--ig-border)]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ig-text-secondary)]" size={18} />
                <input
                  type="search"
                  placeholder="Search messages"
                  className="w-full pl-10 pr-4 py-2 bg-[var(--ig-elevated-secondary)] rounded-full text-sm text-[var(--ig-text)] placeholder-[var(--ig-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--ig-blue)]/20"
                />
              </div>
            </div>

            {/* Notes Row - Mobile */}
            <div className="lg:hidden px-4 py-3 border-b border-[var(--ig-border)]">
              <div className="overflow-x-auto flex gap-3 pb-1 scrollbar-hide">
                {notes.map((note) => (
                  <Link key={note.id} href={`/messages/${note.id}`} className="flex flex-col items-center gap-1.5 w-16 flex-shrink-0">
                    <div className="relative w-14 h-14">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 p-[2px] flex items-center justify-center">
                        <div className="relative w-full h-full rounded-full bg-[var(--ig-bg)] flex items-center justify-center overflow-hidden">
                          <Image src={note.avatarUrl} alt={note.username} fill className="object-cover" sizes="56px" />
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[var(--ig-elevated-secondary)] border-2 border-[var(--ig-bg)] flex items-center justify-center">
                        <Send size={12} className="text-[var(--ig-text)]" />
                      </div>
                    </div>
                    <span className="text-xs font-medium text-[var(--ig-text)] truncate w-full text-center">{note.displayName}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Message Filters - Desktop */}
            <div className="hidden lg:px-4 py-3 border-b border-[var(--ig-border)] flex items-center gap-4">
              <button className="px-4 py-1.5 text-sm font-medium bg-[var(--ig-elevated-secondary)] text-[var(--ig-text)] rounded-full">Primary</button>
              <button className="px-4 py-1.5 text-sm font-medium text-[var(--ig-text-secondary)] hover:text-[var(--ig-text)] hover:bg-[var(--ig-elevated-secondary)] rounded-full transition-colors">Requests</button>
              <button className="px-4 py-1.5 text-sm font-medium text-[var(--ig-text-secondary)] hover:text-[var(--ig-text)] hover:bg-[var(--ig-elevated-secondary)] rounded-full transition-colors">General</button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <nav className="p-2 space-y-1 lg:p-0 lg:space-y-0">
                {conversations.map((conv) => (
                  <Link
                    key={conv.id}
                    href={`/messages/${conv.id}`}
                    className={`flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--ig-elevated-secondary)] transition-colors lg:p-2 lg:rounded-lg ${selectedConversation === conv.id ? "bg-[var(--ig-elevated-secondary)]/50" : ""}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedConversation(conv.id)
                    }}
                  >
                    <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 p-[2px] flex items-center justify-center">
                        <div className="relative w-full h-full rounded-full bg-[var(--ig-bg)] flex items-center justify-center overflow-hidden">
                          <Image src={conv.avatarUrl} alt={conv.username} fill className="object-cover" sizes="48px" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[var(--ig-text)] truncate">{conv.displayName}</p>
                      <p className="text-xs text-[var(--ig-text-secondary)] truncate">{conv.lastMessage}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-[var(--ig-text-secondary)]">{conv.time}</span>
                      {conv.unread > 0 && (
                        <span className="w-5 h-5 rounded-full bg-[var(--ig-blue)] text-white text-xs font-medium flex items-center justify-center">
                          {conv.unread > 9 ? "9+" : conv.unread}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {selectedConversation && (
            <div className="lg:w-[400px] border-l border-[var(--ig-border)] bg-[var(--ig-bg)] flex flex-col h-full hidden lg:flex">
              <div className="p-4 border-b border-[var(--ig-border)] flex items-center gap-3">
                <button onClick={() => setSelectedConversation(null)} className="lg:hidden p-2 rounded-full hover:bg-[var(--ig-hover)] text-[var(--ig-text)]">
                  <X size={20} />
                </button>
                <div className="relative w-10 h-10 flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 p-[2px] flex items-center justify-center">
                    <div className="relative w-full h-full rounded-full bg-[var(--ig-bg)] flex items-center justify-center overflow-hidden">
                      <Image src={conversations.find(c => c.id === selectedConversation)?.avatarUrl} alt="" fill className="object-cover" sizes="40px" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-[var(--ig-text)] truncate">{conversations.find(c => c.id === selectedConversation)?.displayName}</p>
                  <p className="text-xs text-[var(--ig-text-secondary)]">Active now</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        msg.isOwn
                          ? "bg-[var(--ig-blue)] text-white rounded-br-md"
                          : "bg-[var(--ig-elevated-secondary)] text-[var(--ig-text)] rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.isOwn ? "text-[var(--ig-blue)]/70" : "text-[var(--ig-text-secondary)]"} text-right`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-[var(--ig-border)]">
                <form className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Message..."
                    className="flex-1 bg-[var(--ig-elevated-secondary)] border-0 rounded-full py-2 px-4 text-sm text-[var(--ig-text)] focus:outline-none focus:ring-2 focus:ring-[var(--ig-blue)]/20 placeholder-[var(--ig-text-secondary)]"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="p-2 text-[var(--ig-blue)] hover:bg-[var(--ig-elevated-secondary)] rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="lg:hidden fixed bottom-14 left-0 right-0 bg-[var(--ig-bg)] border-t border-[var(--ig-border)] p-4 safe-area-inset-bottom">
            <p className="text-center text-sm text-[var(--ig-text-secondary)]">Select a conversation to start messaging</p>
          </div>
        </div>

        {(!selectedConversation || typeof window !== "undefined" && window.innerWidth < 1024) && <SuggestedUsers />}
      </main>
    </div>
  )
}