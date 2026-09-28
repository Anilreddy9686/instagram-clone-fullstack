// A:/instagram-clone-fullstack/src/components/Feed.tsx
"use client"

import { Post } from "./Post"
import { Story, StoryTray } from "./Story"
import { useSession } from "next-auth/react"

const mockPosts = [
  {
    id: "1",
    username: "nature_lover",
    displayName: "Nature Lover",
    avatarUrl: "https://picsum.photos/seed/user1/64/64",
    imageUrl: "https://picsum.photos/seed/nature1/1080/1350",
    caption: "Beautiful sunset at the beach 🌅 #nature #sunset #beach",
    likesCount: 1243,
    commentsCount: 56,
    isLiked: false,
    isSaved: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    location: "Malibu, California",
  },
  {
    id: "2",
    username: "travel_diary",
    displayName: "Travel Diary",
    avatarUrl: "https://picsum.photos/seed/user2/64/64",
    imageUrl: "https://picsum.photos/seed/travel2/1080/1350",
    caption: "Exploring the mountains ⛰️ #adventure #hiking #mountains",
    likesCount: 3421,
    commentsCount: 89,
    isLiked: true,
    isSaved: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    location: "Rocky Mountains",
  },
  {
    id: "3",
    username: "foodie_life",
    displayName: "Foodie Life",
    avatarUrl: "https://picsum.photos/seed/user3/64/64",
    imageUrl: "https://picsum.photos/seed/food3/1080/1350",
    caption: "Delicious homemade pasta 🍝 #foodie #pasta #homemade",
    likesCount: 567,
    commentsCount: 23,
    isLiked: false,
    isSaved: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
]

const mockStories = [
  { id: "1", username: "nature_lover", avatarUrl: "https://picsum.photos/seed/user1/64/64", hasStory: true },
  { id: "2", username: "travel_diary", avatarUrl: "https://picsum.photos/seed/user2/64/64", hasStory: true },
  { id: "3", username: "foodie_life", avatarUrl: "https://picsum.photos/seed/user3/64/64", hasStory: false },
  { id: "4", username: "tech_guru", avatarUrl: "https://picsum.photos/seed/user4/64/64", hasStory: true },
  { id: "5", username: "art_lover", avatarUrl: "https://picsum.photos/seed/user5/64/64", hasStory: true },
]

export function Feed() {
  const { data: session } = useSession()

  const currentUser = session?.user ? { username: session.user.username!, avatarUrl: session.user.image || undefined } : null

  return (
    <div className="w-full lg:max-w-[470px] xl:max-w-[630px] mx-auto px-4 lg:px-0">
      {/* Mobile Stories - hidden on desktop */}
      <StoryTray
        stories={mockStories}
        currentUser={currentUser}
      />

      {/* Desktop Stories - shown above feed on desktop */}
      <div className="hidden lg:block border-b border-[var(--ig-border)] bg-[var(--ig-bg)] sticky top-0 z-20 lg:top-16">
        <div className="lg:max-w-[470px] xl:max-w-[630px] mx-auto px-4 py-3 overflow-x-auto flex gap-3 pb-1 scrollbar-hide">
          {currentUser && (
            <Story
              username={currentUser.username}
              avatarUrl={currentUser.avatarUrl}
              hasStory={false}
              isOwn
            />
          )}
          {mockStories.map((story) => (
            <Story
              key={story.id}
              username={story.username}
              avatarUrl={story.avatarUrl}
              hasStory={story.hasStory}
            />
          ))}
        </div>
      </div>

      <div className="py-4">
        <div className="space-y-[var(--ig-feed-spacing)]">
          {mockPosts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
        <div className="text-center text-[var(--ig-text-secondary)] py-8 text-sm">
          You've seen all posts for now.
        </div>
      </div>
    </div>
  )
}