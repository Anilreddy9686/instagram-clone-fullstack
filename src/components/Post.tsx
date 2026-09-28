// A:/instagram-clone-fullstack/src/components/Post.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Heart, MessageSquare, Send, Bookmark, MoreHorizontal } from "lucide-react"
import { formatRelativeTime } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface PostProps {
  id: string
  username: string
  displayName?: string
  avatarUrl?: string
  imageUrl: string
  caption?: string
  likesCount: number
  commentsCount: number
  isLiked: boolean
  isSaved: boolean
  createdAt: string
  location?: string
}

export function Post({
  id,
  username,
  displayName,
  avatarUrl,
  imageUrl,
  caption,
  likesCount,
  commentsCount,
  isLiked,
  isSaved,
  createdAt,
  location,
}: PostProps) {
  const [showComments, setShowComments] = useState(false)
  const [liked, setLiked] = useState(isLiked)
  const [saved, setSaved] = useState(isSaved)
  const [likes, setLikes] = useState(likesCount)
  const [doubleTap, setDoubleTap] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  const handleSave = () => {
    setSaved(!saved)
  }

  const handleImageDoubleClick = () => {
    if (!liked) {
      handleLike()
    }
    setDoubleTap(true)
    setTimeout(() => setDoubleTap(false), 800)
  }

  return (
    <article className="bg-[var(--ig-bg)] border-b border-[var(--ig-border)]">
      <div className="px-4 py-3 flex items-center gap-2">
        <Link
          href={`/${username}`}
          className="flex items-center gap-2 flex-shrink-0"
          aria-label={displayName || username}
        >
          <div className="relative w-8 h-8 flex-shrink-0">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 p-[2px] flex items-center justify-center">
              <div className="relative w-full h-full rounded-full bg-[var(--ig-bg)] flex items-center justify-center overflow-hidden">
                {avatarUrl ? (
                  <Image src={avatarUrl} alt={username} fill className="object-cover" sizes="32px" />
                ) : (
                  <span className="text-[var(--ig-text-secondary)] font-medium text-sm">{username.charAt(0).toUpperCase()}</span>
                )}
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <p className="font-semibold text-[var(--ig-text)] text-sm">{username}</p>
            {location && <p className="text-xs text-[var(--ig-text-secondary)]">{location}</p>}
          </div>
        </Link>
        <div className="flex-1" />
        <button className="p-2 rounded-full hover:bg-[var(--ig-hover)] transition-colors text-[var(--ig-text-secondary)]" aria-label="More options">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="relative aspect-portrait bg-[var(--ig-bg-secondary)]" onDoubleClick={handleImageDoubleClick}>
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={caption || "Post image"}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority
          />
        </div>
        {doubleTap && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-fade-in z-10">
            <Heart size={80} className="text-white/90 drop-shadow-lg" fill="currentColor" strokeWidth={0} />
          </div>
        )}
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={handleLike}
            className={cn("p-1 rounded-full transition-colors", liked && "text-red-500")}
            aria-label={liked ? "Unlike" : "Like"}
          >
            <Heart size={24} className={cn(liked ? "fill-current" : "")} strokeWidth={2} />
          </button>
          <button className="p-1 rounded-full hover:bg-[var(--ig-hover)] transition-colors text-[var(--ig-text-secondary)]" aria-label="Comment">
            <MessageSquare size={24} strokeWidth={2} />
          </button>
          <button className="p-1 rounded-full hover:bg-[var(--ig-hover)] transition-colors text-[var(--ig-text-secondary)]" aria-label="Share">
            <Send size={24} strokeWidth={2} />
          </button>
          <div className="flex-1" />
          <button
            onClick={handleSave}
            className={cn("p-1 rounded-full transition-colors", saved && "text-black")}
            aria-label={saved ? "Unsave" : "Save"}
          >
            <Bookmark size={24} className={cn(saved ? "fill-current" : "")} strokeWidth={2} />
          </button>
        </div>

        {likes > 0 && (
          <Link
            href={`/p/${id}/likes`}
            className="font-semibold text-sm mb-2 block text-[var(--ig-text)]"
            onClick={(e) => {
              e.preventDefault()
              setShowComments(true)
            }}
          >
            {likes.toLocaleString()} like{likes !== 1 ? "s" : ""}
          </Link>
        )}

        {caption && (
          <div className="mb-2">
            <Link href={`/${username}`} className="font-semibold text-sm mr-1 hover:underline text-[var(--ig-text)]">
              {username}
            </Link>
            <span className="text-sm text-[var(--ig-text)]">{caption}</span>
          </div>
        )}

        <button
          onClick={() => setShowComments(true)}
          className="text-sm text-[var(--ig-text-secondary)] hover:text-[var(--ig-text)] mb-2 block"
        >
          View all {commentsCount} comment{commentsCount !== 1 ? "s" : ""}
        </button>

        <p className="text-xs text-[var(--ig-text-secondary)]">{formatRelativeTime(createdAt)}</p>
      </div>

      <div className="border-t border-[var(--ig-border)] px-4 py-3 flex items-center gap-3">
        <div className="relative w-8 h-8 flex-shrink-0">
          <div className="relative w-full h-full rounded-full bg-[var(--ig-bg)] flex items-center justify-center overflow-hidden">
            <Image src="https://picsum.photos/seed/placeholder/32/32" alt="" fill className="object-cover" sizes="32px" />
          </div>
        </div>
        <form className="flex-1 flex items-center gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-[var(--ig-text)] placeholder-[var(--ig-text-secondary)]"
            aria-label="Add a comment"
          />
          <button type="submit" className="text-[var(--ig-blue)] font-semibold text-sm disabled:opacity-50" disabled>
            Post
          </button>
        </form>
      </div>
    </article>
  )
}