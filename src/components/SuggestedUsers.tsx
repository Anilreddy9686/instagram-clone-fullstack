// A:/instagram-clone-fullstack/src/components/SuggestedUsers.tsx
"use client"

import Image from "next/image"
import { useSession } from "next-auth/react"
import Link from "next/link"

const suggestedUsers = [
  { id: "1", username: "tech_guru", displayName: "Tech Guru", avatarUrl: "https://picsum.photos/seed/user4/64/64" },
  { id: "2", username: "art_lover", displayName: "Art Lover", avatarUrl: "https://picsum.photos/seed/user5/64/64" },
  { id: "3", username: "fitness_pro", displayName: "Fitness Pro", avatarUrl: "https://picsum.photos/seed/user6/64/64" },
  { id: "4", username: "music_maniac", displayName: "Music Maniac", avatarUrl: "https://picsum.photos/seed/user7/64/64" },
]

export function SuggestedUsers() {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <aside className="hidden lg:block w-[var(--ig-right-rail)] flex-shrink-0 lg:pl-8 right-rail">
      <div className="sticky top-20 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[var(--ig-text)]">Suggestions for you</p>
          <Link href="/explore/people" className="text-sm text-[var(--ig-blue)] font-medium hover:underline">See all</Link>
        </div>

        <div className="space-y-3">
          {suggestedUsers.filter(u => u.username !== session.user?.username).slice(0, 4).map((user) => (
            <Link key={user.id} href={`/${user.username}`} className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex-shrink-0">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 p-[2px] flex items-center justify-center">
                  <div className="relative w-full h-full rounded-full bg-[var(--ig-bg)] flex items-center justify-center overflow-hidden">
                    <Image src={user.avatarUrl} alt={user.username} fill className="object-cover" sizes="40px" />
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[var(--ig-text)] truncate">{user.username}</p>
                <p className="text-xs text-[var(--ig-text-secondary)] truncate">{user.displayName}</p>
              </div>
              <button className="text-[var(--ig-blue)] text-sm font-semibold hover:underline whitespace-nowrap">Follow</button>
            </Link>
          ))}
        </div>

        <div className="pt-4 border-t border-[var(--ig-border)] space-y-1 text-center text-xs text-[var(--ig-text-secondary)]">
          <Link href="/about" className="hover:underline">About</Link>
          <span className="mx-2">·</span>
          <Link href="/help" className="hover:underline">Help</Link>
          <span className="mx-2">·</span>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <span className="mx-2">·</span>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <span className="mx-2">·</span>
          <Link href="/settings" className="hover:underline">Settings</Link>
        </div>
        <p className="mt-3 text-xs text-[var(--ig-text-tertiary)]">Meta © 2024</p>
      </div>
    </aside>
  )
}