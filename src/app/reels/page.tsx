// A:/instagram-clone-fullstack/src/app/reels/page.tsx
"use client"

import { Header } from "@/components/Header"
import { SuggestedUsers } from "@/components/SuggestedUsers"
import { DesktopSidebar } from "@/components/DesktopSidebar"
import { MobileBottomNav } from "@/components/MobileBottomNav"
import Image from "next/image"
import Link from "next/link"
import { Plus, Heart, MessageSquare, Send, Bookmark, MoreHorizontal, VolumeX, Volume2, Play, Pause } from "lucide-react"
import { useState } from "react"

const mockReels = [
  {
    id: "1",
    username: "nature_lover",
    displayName: "Nature Lover",
    avatarUrl: "https://picsum.photos/seed/user1/64/64",
    videoUrl: "https://picsum.photos/seed/reel1/1080/1920",
    caption: "Amazing sunset at the beach 🌅 #nature #sunset",
    likesCount: 1243,
    commentsCount: 56,
    sharesCount: 23,
    audioTitle: "Original audio",
    isLiked: false,
    isSaved: false,
  },
  {
    id: "2",
    username: "travel_diary",
    displayName: "Travel Diary",
    avatarUrl: "https://picsum.photos/seed/user2/64/64",
    videoUrl: "https://picsum.photos/seed/reel2/1080/1920",
    caption: "Exploring the mountains ⛰️ #adventure #hiking",
    likesCount: 3421,
    commentsCount: 89,
    sharesCount: 45,
    audioTitle: "Mountain vibes 🎵",
    isLiked: true,
    isSaved: false,
  },
  {
    id: "3",
    username: "foodie_life",
    displayName: "Foodie Life",
    avatarUrl: "https://picsum.photos/seed/user3/64/64",
    videoUrl: "https://picsum.photos/seed/reel3/1080/1920",
    caption: "Delicious homemade pasta 🍝 #foodie",
    likesCount: 567,
    commentsCount: 23,
    sharesCount: 12,
    audioTitle: "Cooking beats 🎵",
    isLiked: false,
    isSaved: true,
  },
]

export default function ReelsPage() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const [liked, setLiked] = useState(mockReels[0].isLiked)
  const [saved, setSaved] = useState(mockReels[0].isSaved)

  const currentReel = mockReels[currentReelIndex]

  const handleLike = () => {
    setLiked(!liked)
  }

  const handleSave = () => {
    setSaved(!saved)
  }

  return (
    <div className="min-h-screen bg-[var(--ig-bg)] text-[var(--ig-text)] flex flex-col">
      <Header />
      <MobileBottomNav />
      <main className="flex-1 relative overflow-hidden">
        {/* Desktop sidebar is hidden on mobile, Reels takes full screen */}
        <div className="h-screen w-full max-w-[430px] mx-auto lg:h-[calc(100vh-64px)] lg:max-w-[630px] lg:mx-auto relative">
          <div className="h-full relative">
            {/* Reel Video */}
            <div className="h-full w-full relative">
              <video
                src={currentReel.videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted={muted}
                playsInline
                onClick={() => setIsPlaying(!isPlaying)}
              >
                Your browser does not support the video tag.
              </video>
              {/* Play/Pause overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                  <Play size={64} className="text-white/90" />
                </div>
              )}
            </div>

            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 z-20 px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white" aria-label="New Reel">
                  <Plus size={24} />
                </button>
                <h1 className="font-logo text-xl text-white">Instagram</h1>
                <button className="px-3 py-1.5 text-sm font-medium text-white bg-black/50 rounded-full">Reels</button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-black/50 rounded-full">
                  <Image src="https://picsum.photos/seed/friend1/32/32" alt="" className="w-6 h-6 rounded-full" sizes="24px" />
                  <span className="text-sm text-white">Friends</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 p-[2px] flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                    <Image src="https://picsum.photos/seed/me/32/32" alt="" className="w-full h-full object-cover" sizes="32px" />
                  </div>
                </div>
              </div>
            </div>

            {/* Reel Content Info - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-20 pb-20 lg:pb-24 px-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Link href={`/${currentReel.username}`} className="flex items-center gap-2">
                      <div className="relative w-8 h-8">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 p-[2px] flex items-center justify-center">
                          <div className="relative w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                            <Image src={currentReel.avatarUrl} alt={currentReel.username} fill className="object-cover" sizes="32px" />
                          </div>
                        </div>
                      </div>
                      <span className="font-semibold text-white">{currentReel.displayName}</span>
                    </Link>
                    <button className="px-4 py-1 text-sm font-semibold bg-white text-black rounded-full">Follow</button>
                  </div>
                  <p className="text-white mb-2">{currentReel.caption}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Image src="https://picsum.photos/seed/audio/16/16" alt="" className="w-4 h-4 rounded-full" sizes="16px" />
                    <span className="truncate max-w-[200px]">{currentReel.audioTitle}</span>
                    <span className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center">
                      <Volume2 size={12} />
                    </span>
                  </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex flex-col items-center gap-4 flex-shrink-0">
                  <button
                    onClick={handleLike}
                    className={liked ? "text-red-500" : "text-white"}
                    aria-label={liked ? "Unlike" : "Like"}
                  >
                    <Heart size={32} className={liked ? "fill-current" : ""} strokeWidth={2} />
                    <p className="text-xs text-center">{currentReel.likesCount.toLocaleString()}</p>
                  </button>
                  <button className="text-white" aria-label="Comment">
                    <MessageSquare size={32} strokeWidth={2} />
                    <p className="text-xs text-center">{currentReel.commentsCount.toLocaleString()}</p>
                  </button>
                  <button className="text-white" aria-label="Share">
                    <Send size={32} strokeWidth={2} />
                    <p className="text-xs text-center">{currentReel.sharesCount.toLocaleString()}</p>
                  </button>
                  <button
                    onClick={handleSave}
                    className={saved ? "text-yellow-400" : "text-white"}
                    aria-label={saved ? "Unsave" : "Save"}
                  >
                    <Bookmark size={32} className={saved ? "fill-current" : ""} strokeWidth={2} />
                    <p className="text-xs text-center">Save</p>
                  </button>
                  <button className="text-white" aria-label="More options">
                    <MoreHorizontal size={32} strokeWidth={2} />
                    <p className="text-xs text-center">More</p>
                  </button>
                </div>
              </div>

              {/* Progress indicator for multiple reels */}
              <div className="flex gap-1 mt-4">
                {mockReels.map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-1 rounded-full transition-colors ${
                      i === currentReelIndex ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Reel Navigation - Swipe indicators */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 px-4 z-10">
            <button
              onClick={() => setCurrentReelIndex(prev => prev > 0 ? prev - 1 : mockReels.length - 1)}
              className="absolute left-4 p-2 bg-black/50 rounded-full text-white opacity-0 hover:opacity-100 transition-opacity lg:opacity-0 lg:pointer-events-none"
              aria-label="Previous Reel"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentReelIndex(prev => prev < mockReels.length - 1 ? prev + 1 : 0)}
              className="absolute right-4 p-2 bg-black/50 rounded-full text-white opacity-0 hover:opacity-100 transition-opacity lg:opacity-0 lg:pointer-events-none"
              aria-label="Next Reel"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Sidebar - hidden on mobile */}
        <DesktopSidebar />

        {/* Right Suggestions - hidden on mobile */}
        <SuggestedUsers />
      </main>
    </div>
  )
}