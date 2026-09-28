// A:/instagram-clone-fullstack/src/app/page.tsx
import { Header } from "@/components/Header"
import { Feed } from "@/components/Feed"
import { SuggestedUsers } from "@/components/SuggestedUsers"
import { DesktopSidebar } from "@/components/DesktopSidebar"
import { MobileBottomNav } from "@/components/MobileBottomNav"
import { auth } from "@/lib/auth"

export default async function Home() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-[var(--ig-bg)] text-[var(--ig-text)] flex flex-col">
      <Header />
      <MobileBottomNav />
      <main className="flex-1">
        <div className="flex flex-col lg:flex-row">
          {/* Desktop Sidebar */}
          <DesktopSidebar />

          {/* Center Feed */}
          <div className="flex-1 min-w-0 lg:pl-0 xl:pl-8">
            <Feed />
          </div>

          {/* Right Suggestions Panel - Desktop only */}
          <SuggestedUsers />
        </div>
      </main>
    </div>
  )
}