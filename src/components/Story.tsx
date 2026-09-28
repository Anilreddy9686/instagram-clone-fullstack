// A:/instagram-clone-fullstack/src/components/Story.tsx
"use client"

import Image from "next/image"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface StoryProps {
  username: string
  avatarUrl?: string
  hasStory: boolean
  isOwn?: boolean
  gradient?: string
}

export function Story({ username, avatarUrl, hasStory, isOwn, gradient = "from-yellow-400 via-red-500 to-purple-600" }: StoryProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 w-16 sm:w-18 flex-shrink-0">
      <div className="relative">
        <div
          className={cn(
            "w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[2px] flex items-center justify-center",
            hasStory ? "bg-gradient-to-br " + gradient : "bg-[var(--ig-border)]"
          )}
        >
          <div className="relative w-full h-full">
            <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-[var(--ig-bg)]">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={username}
                  fill
                  className="rounded-full object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-[var(--ig-border)] flex items-center justify-center">
                  <span className="text-[var(--ig-text-secondary)] font-medium text-sm">{username.charAt(0).toUpperCase()}</span>
                </div>
              )}
              {isOwn && (
                <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--ig-blue)] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform" aria-label="Create story">
                  <Plus size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <span className="text-xs font-medium text-[var(--ig-text)] truncate w-full text-center max-w-[64px] sm:max-w-[72px]">{username}</span>
    </div>
  )
}

interface StoryTrayProps {
  stories: Array<{
    id: string
    username: string
    avatarUrl?: string
    hasStory: boolean
  }>
  currentUser?: { username: string; avatarUrl?: string } | null
}

export function StoryTray({ stories, currentUser }: StoryTrayProps) {
  return (
    <div className="border-b border-[var(--ig-border)] bg-[var(--ig-bg)] sticky top-0 z-30 md:hidden">
      <div className="px-4 py-3 overflow-x-auto flex gap-3 pb-1 scrollbar-hide">
        {currentUser && (
          <Story
            username={currentUser.username}
            avatarUrl={currentUser.avatarUrl}
            hasStory={false}
            isOwn
          />
        )}
        {stories.map((story) => (
          <Story
            key={story.id}
            username={story.username}
            avatarUrl={story.avatarUrl}
            hasStory={story.hasStory}
          />
        ))}
      </div>
    </div>
  )
}