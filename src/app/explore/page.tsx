// A:/instagram-clone-fullstack/src/app/explore/page.tsx
import { Header } from "@/components/Header"
import { SuggestedUsers } from "@/components/SuggestedUsers"
import { DesktopSidebar } from "@/components/DesktopSidebar"
import { MobileBottomNav } from "@/components/MobileBottomNav"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"

const explorePosts = Array.from({ length: 21 }, (_, i) => ({
  id: `explore-${i}`,
  imageUrl: `https://picsum.photos/seed/explore${i}/400/400`,
}))

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-[var(--ig-bg)] text-[var(--ig-text)] flex flex-col">
      <Header />
      <MobileBottomNav />
      <main className="flex-1 flex flex-col md:flex-row">
        <DesktopSidebar />

        <div className="flex-1 min-w-0 md:pl-0 lg:pl-8">
          <div className="max-w-[430px] lg:max-w-[935px] mx-auto w-full px-4 py-4">
            {/* Mobile Search Bar */}
            <div className="lg:hidden sticky top-0 z-20 bg-[var(--ig-bg)] pb-4 border-b border-[var(--ig-border)]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ig-text-secondary)]" size={20} />
                <input
                  type="search"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-3 bg-[var(--ig-elevated-secondary)] rounded-lg text-sm text-[var(--ig-text)] placeholder-[var(--ig-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--ig-blue)]/20 search-input"
                />
              </div>
            </div>

            <div className="explore-grid">
              {explorePosts.map((post) => (
                <Link key={post.id} href={`/p/${post.id}`} className="aspect-square relative group">
                  <Image
                    src={post.imageUrl}
                    alt="Explore post"
                    fill
                    className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 430px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors rounded-lg flex items-center justify-center">
                    <svg className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24" width="32" height="32">
                      <path d="M19.14 12.94c.03-.44.06-.89.06-1.34 0-.46-.03-.9-.07-1.33l-6.84-6.84A4.96 4.96 0 0 0 8.53 0a4.96 4.96 0 0 0-7 7l6.84 6.84A4.96 4.96 0 0 0 0 15.47a4.96 4.96 0 0 0 7 7l6.84-6.84Z" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <SuggestedUsers />
      </main>
    </div>
  )
}