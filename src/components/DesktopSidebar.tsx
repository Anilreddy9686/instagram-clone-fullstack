// A:/instagram-clone-fullstack/src/components/DesktopSidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { Home, Search, Compass, Video, MessageSquare, Heart, Grid, User, MoreHorizontal, ChevronDown, ChevronLeft, BarChart2, Bot } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/reels", icon: Video, label: "Reels" },
  { href: "/messages", icon: MessageSquare, label: "Messages" },
  { href: "/explore", icon: Compass, label: "Explore" },
  { href: "/notifications", icon: Heart, label: "Notifications" },
  { href: "/create", icon: Grid, label: "Create" },
  { href: "/dashboard", icon: BarChart2, label: "Professional dashboard" },
  { href: "/ai", icon: Bot, label: "Meta AI" },
]

export function DesktopSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className="hidden lg:block fixed left-0 top-0 bottom-0 z-40 bg-[var(--ig-bg)] border-r border-[var(--ig-border)] flex flex-col transition-all duration-200 ease-in-out sidebar-transition"
      style={{ width: isCollapsed ? '72px' : '244px' }}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--ig-border)] flex-shrink-0">
          {!isCollapsed && (
            <Link href="/" className="font-logo text-2xl text-[var(--ig-text)] select-none transition-opacity duration-200">Instagram</Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full hover:bg-[var(--ig-hover)] transition-colors flex-shrink-0"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronLeft size={20} className="text-[var(--ig-text-secondary)]" />
            ) : (
              <MoreHorizontal size={20} className="text-[var(--ig-text-secondary)]" />
            )}
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-3 overflow-y-auto" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[var(--ig-hover)] text-[var(--ig-text)]"
                    : "text-[var(--ig-text-secondary)] hover:bg-[var(--ig-hover)] hover:text-[var(--ig-text)]"
                }`}
                aria-current={isActive ? "page" : undefined}
                style={{ whiteSpace: 'nowrap' }}
              >
                <Icon size={24} strokeWidth={isActive ? 3 : 2.5} aria-hidden="true" className="flex-shrink-0" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            )
          })}

          {!isCollapsed && session && (
            <Link
              href={`/${session.user.username}`}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-150 text-[var(--ig-text-secondary)] hover:bg-[var(--ig-hover)] hover:text-[var(--ig-text)]"
            >
              <div className="relative w-8 h-8 flex-shrink-0">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 p-[2px] flex items-center justify-center">
                  <div className="relative w-full h-full rounded-full bg-[var(--ig-elevated)] flex items-center justify-center overflow-hidden">
                    {session.user.image ? (
                      <Image src={session.user.image} alt="" fill className="object-cover" sizes="32px" />
                    ) : (
                      <User size={20} className="text-[var(--ig-text-secondary)]" />
                    )}
                  </div>
                </div>
              </div>
              <span className="truncate">Profile</span>
              <ChevronDown size={16} className="text-[var(--ig-text-tertiary)] ml-auto" />
            </Link>
          )}
        </nav>

        {!isCollapsed && (
          <div className="border-t border-[var(--ig-border)] p-4 space-y-4">
            <div className="flex items-center justify-between text-xs text-[var(--ig-text-tertiary)]">
              <span>Meta</span>
              <span>© 2024</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-[var(--ig-text-tertiary)]">
              <Link href="/about" className="hover:underline text-[var(--ig-text-secondary)] transition-colors">About</Link>
              <Link href="/help" className="hover:underline text-[var(--ig-text-secondary)] transition-colors">Help</Link>
              <Link href="/privacy" className="hover:underline text-[var(--ig-text-secondary)] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:underline text-[var(--ig-text-secondary)] transition-colors">Terms</Link>
              <Link href="/settings" className="hover:underline text-[var(--ig-text-secondary)] transition-colors">Settings</Link>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="border-t border-[var(--ig-border)] p-4 space-y-4">
            <div className="flex flex-col items-center space-y-2 text-xs text-[var(--ig-text-tertiary)]">
              <span>Meta</span>
              <span>© 2024</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}