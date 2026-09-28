// A:/instagram-clone-fullstack/src/components/Header.tsx
"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Search, Home, Heart, MessageSquare, Compass, Grid, User, LogOut, LayoutDashboard, ChevronDown, Plus, ChevronLeft } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export function Header() {
  const { data: session } = useSession()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      {/* Mobile header - Instagram style */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-[var(--ig-mobile-header)] bg-[var(--ig-bg)] border-b border-[var(--ig-border)] px-4 flex items-center justify-between gap-2" style={{ height: 'var(--ig-mobile-header)' }}>
        <div className="flex items-center gap-4 w-full max-w-[430px] mx-auto">
          <button className="p-2 rounded-full hover:bg-[var(--ig-hover)] text-[var(--ig-text)] transition-colors" aria-label="New post">
            <Plus size={24} strokeWidth={2.5} />
          </button>
          <Link href="/" className="font-logo text-xl text-[var(--ig-text)] select-none flex-1 text-center">Instagram</Link>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-full hover:bg-[var(--ig-hover)] text-[var(--ig-text)] transition-colors" aria-label="Notifications">
              <Heart size={24} strokeWidth={2.5} />
            </button>
            {session && (
              <Link
                href={`/${session.user.username}`}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center overflow-hidden"
              >
                {session.user.image ? (
                  <Image src={session.user.image} alt="" className="w-full h-full object-cover" sizes="32px" />
                ) : (
                  <User size={20} className="text-white" />
                )}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {showMenu && (
        <div className="fixed inset-0 bg-[var(--ig-bg)] z-50 md:hidden flex flex-col">
          <div className="flex justify-end p-4 border-b border-[var(--ig-border)]">
            <button onClick={() => setShowMenu(false)} className="p-2 rounded-full hover:bg-[var(--ig-hover)] text-[var(--ig-text)] transition-colors">
              <LayoutDashboard size={24} />
            </button>
          </div>
          <nav className="flex-1 py-6 px-6 space-y-4 overflow-y-auto">
            <Link
              href="/"
              className="flex items-center gap-4 px-4 py-3 text-lg font-medium text-[var(--ig-text)] hover:bg-[var(--ig-hover)] rounded-xl transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <Home size={24} strokeWidth={2.5} />
              Home
            </Link>
            <Link
              href="/explore"
              className="flex items-center gap-4 px-4 py-3 text-lg font-medium text-[var(--ig-text)] hover:bg-[var(--ig-hover)] rounded-xl transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <Compass size={24} strokeWidth={2.5} />
              Explore
            </Link>
            <Link
              href="/reels"
              className="flex items-center gap-4 px-4 py-3 text-lg font-medium text-[var(--ig-text)] hover:bg-[var(--ig-hover)] rounded-xl transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <Grid size={24} strokeWidth={2.5} />
              Reels
            </Link>
            <Link
              href="/messages"
              className="flex items-center gap-4 px-4 py-3 text-lg font-medium text-[var(--ig-text)] hover:bg-[var(--ig-hover)] rounded-xl transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <MessageSquare size={24} strokeWidth={2.5} />
              Messages
            </Link>
            <Link
              href="/notifications"
              className="flex items-center gap-4 px-4 py-3 text-lg font-medium text-[var(--ig-text)] hover:bg-[var(--ig-hover)] rounded-xl transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <Heart size={24} strokeWidth={2.5} />
              Notifications
            </Link>
            <Link
              href="/create"
              className="flex items-center gap-4 px-4 py-3 text-lg font-medium text-[var(--ig-text)] hover:bg-[var(--ig-hover)] rounded-xl transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <Grid size={24} strokeWidth={2.5} />
              Create
            </Link>
            {session && (
              <Link
                href={`/${session.user.username}`}
                className="flex items-center gap-4 px-4 py-3 text-lg font-medium text-[var(--ig-text)] hover:bg-[var(--ig-hover)] rounded-xl transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <User size={24} strokeWidth={2.5} />
                Profile
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-4 px-4 py-3 text-lg font-medium text-[var(--ig-danger)] hover:bg-[var(--ig-danger)]/10 rounded-xl mt-4 w-full text-left transition-colors"
            >
              <LogOut size={24} strokeWidth={2.5} />
              Log Out
            </button>
          </nav>
        </div>
      )}
    </>
  )
}