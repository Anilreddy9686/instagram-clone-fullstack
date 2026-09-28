// A:/instagram-clone-fullstack/src/app/profile/[username]/page.tsx
import { Header } from "@/components/Header"
import { SuggestedUsers } from "@/components/SuggestedUsers"
import { DesktopSidebar } from "@/components/DesktopSidebar"
import { MobileBottomNav } from "@/components/MobileBottomNav"
import Image from "next/image"
import { Grid, LayoutDashboard, User, Heart, MapPin, Link as LinkIcon, ChevronDown, PersonAdd } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: Promise<{ username: string }>
}

const mockUser = {
  username: "nature_lover",
  displayName: "Nature Lover",
  bio: "🌿 Exploring the beauty of nature\n📸 Landscape photographer\n🌍 Based in California",
  avatarUrl: "https://picsum.photos/seed/user1/200/200",
  postsCount: 24,
  followersCount: 1234,
  followingCount: 567,
  website: "https://example.com",
  location: "California, USA",
}

const mockPosts = Array.from({ length: 12 }, (_, i) => ({
  id: `post-${i}`,
  imageUrl: `https://picsum.photos/seed/profile${i}/400/533`,
}))

const mockHighlights = [
  { id: "1", title: "Travel", imageUrl: "https://picsum.photos/seed/highlight1/100/100" },
  { id: "2", title: "Food", imageUrl: "https://picsum.photos/seed/highlight2/100/100" },
  { id: "3", title: "Nature", imageUrl: "https://picsum.photos/seed/highlight3/100/100" },
  { id: "4", title: "New", imageUrl: "https://picsum.photos/seed/highlight4/100/100", isNew: true },
]

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params
  const user = mockUser

  return (
    <div className="min-h-screen bg-[var(--ig-bg)] text-[var(--ig-text)] flex flex-col">
      <Header />
      <MobileBottomNav />
      <main className="flex-1 flex flex-col md:flex-row">
        <DesktopSidebar />

        <div className="flex-1 min-w-0 md:pl-0 lg:pl-8">
          <div className="max-w-[430px] lg:max-w-[935px] mx-auto w-full px-4 py-4">
            <div className="bg-[var(--ig-bg)] border border-[var(--ig-border)] rounded-lg mb-4">
              <div className="p-4">
                <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 p-[3px] flex items-center justify-center">
                        <div className="relative w-full h-full rounded-full bg-[var(--ig-bg)] flex items-center justify-center overflow-hidden">
                          <Image src={user.avatarUrl} alt={user.username} fill className="object-cover" sizes="96px" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-1">
                      <h1 className="text-xl sm:text-2xl font-bold text-[var(--ig-text)]">{user.displayName}</h1>
                      <p className="text-[var(--ig-text-secondary)]">@{user.username}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex gap-2">
                    <button className="px-4 py-2 bg-[var(--ig-blue)] text-white font-semibold rounded-lg hover:bg-[var(--ig-blue-hover)] transition-colors whitespace-nowrap">
                      Follow
                    </button>
                    <button className="px-4 py-2 bg-[var(--ig-elevated-secondary)] text-[var(--ig-text)] font-semibold rounded-lg hover:bg-[var(--ig-hover)] transition-colors whitespace-nowrap border border-[var(--ig-border)]">
                      Message
                    </button>
                  </div>
                </div>

                <div className="flex gap-6 sm:gap-8 mb-4 text-sm">
                  <div className="flex flex-col items-center sm:items-start">
                    <span className="font-bold text-[var(--ig-text)]">{user.postsCount}</span>
                    <span className="text-[var(--ig-text-secondary)]">posts</span>
                  </div>
                  <div className="flex flex-col items-center sm:items-start">
                    <span className="font-bold text-[var(--ig-text)]">{user.followersCount.toLocaleString()}</span>
                    <span className="text-[var(--ig-text-secondary)]">followers</span>
                  </div>
                  <div className="flex flex-col items-center sm:items-start">
                    <span className="font-bold text-[var(--ig-text)]">{user.followingCount.toLocaleString()}</span>
                    <span className="text-[var(--ig-text-secondary)]">following</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-[var(--ig-text)] whitespace-pre-wrap text-sm">{user.bio}</p>
                </div>

                {user.website && (
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-[var(--ig-blue)] text-sm hover:underline flex items-center gap-1">
                    <LinkIcon size={14} />
                    {user.website}
                  </a>
                )}

                {user.location && (
                  <p className="text-[var(--ig-text-secondary)] text-sm mt-2 flex items-center gap-1">
                    <MapPin size={14} />
                    {user.location}
                  </p>
                )}
              </div>

              {/* Highlights */}
              <div className="border-t border-[var(--ig-border)] px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-[var(--ig-text)]">Highlights</h3>
                  <button className="p-2 rounded-full bg-[var(--ig-elevated-secondary)] text-[var(--ig-text)] hover:bg-[var(--ig-hover)] transition-colors">
                    <PersonAdd size={16} />
                  </button>
                </div>
                <div className="overflow-x-auto flex gap-4 pb-2 scrollbar-hide">
                  {mockHighlights.map((highlight) => (
                    <Link key={highlight.id} href={`/highlights/${highlight.id}`} className="flex flex-col items-center gap-1.5 w-16 flex-shrink-0">
                      <div className="relative w-16 h-16">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 p-[2px] flex items-center justify-center">
                          <div className="relative w-full h-full rounded-full bg-[var(--ig-bg)] flex items-center justify-center overflow-hidden">
                            <Image src={highlight.imageUrl} alt={highlight.title} fill className="object-cover" sizes="64px" />
                            {highlight.isNew && (
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--ig-blue)] text-white flex items-center justify-center shadow-lg">
                                <PersonAdd size={14} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-[var(--ig-text)] truncate w-full text-center">{highlight.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-[var(--ig-border)] flex">
                <button className="flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium text-[var(--ig-blue)] border-b-2 border-[var(--ig-blue)]">
                  <Grid size={20} />
                  Posts
                </button>
                <button className="flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium text-[var(--ig-text-secondary)] hover:text-[var(--ig-text)]">
                  <LayoutDashboard size={20} />
                  Reels
                </button>
                <button className="flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium text-[var(--ig-text-secondary)] hover:text-[var(--ig-text)]">
                  <Heart size={20} />
                  Tagged
                </button>
              </div>
            </div>

            <div className="profile-grid">
              {mockPosts.map((post) => (
                <div key={post.id} className="aspect-profile-thumb relative group overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt="Post"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 430px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <svg className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24" width="28" height="28">
                      <path d="M19.14 12.94c.03-.44.06-.89.06-1.34 0-.46-.03-.9-.07-1.33l-6.84-6.84A4.96 4.96 0 0 0 8.53 0a4.96 4.96 0 0 0-7 7l6.84 6.84A4.96 4.96 0 0 0 0 15.47a4.96 4.96 0 0 0 7 7l6.84-6.84Z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <SuggestedUsers />
      </main>
    </div>
  )
}