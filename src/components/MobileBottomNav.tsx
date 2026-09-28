// A:/instagram-clone-fullstack/src/components/MobileBottomNav.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Video, Heart, User, LayoutGrid } from "lucide-react"
import { useSession } from "next-auth/react"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/explore", icon: Search, label: "Search" },
  { href: "/reels", icon: Video, label: "Reels" },
  { href: "/messages", icon: Heart, label: "Activity" },
  { href: "/profile", icon: User, label: "Profile", isProfile: true },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-[var(--ig-mobile-nav)] bg-[var(--ig-bg)] border-t border-[var(--ig-border)] safe-area-inset-bottom" aria-label="Main navigation" style={{ height: 'var(--ig-mobile-nav)' }}>
      <div className="flex h-full max-w-[430px] mx-auto">
        {navItems.map((item) => {
          const isActive = item.isProfile
            ? pathname === `/${session?.user?.username}` || pathname.startsWith(`/${session?.user?.username}/`)
            : pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

          const Icon = item.isProfile ? User : item.icon

          return (
            <Link
              key={item.isProfile ? "profile" : item.href}
              href={item.isProfile ? `/${session?.user?.username}` : item.href}
              className="flex flex-1 flex-col items-center justify-center gap-1 text-xs transition-colors"
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                size={isActive ? 26 : 24}
                strokeWidth={isActive ? 3 : 2.5}
                className={isActive ? "text-[var(--ig-text)]" : "text-[var(--ig-text-secondary)]"}
                aria-label={item.label}
              />
              <span className={isActive ? "font-semibold text-[var(--ig-text)]" : "text-[var(--ig-text-secondary)]"}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}