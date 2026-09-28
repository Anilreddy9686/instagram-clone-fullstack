// A:/instagram-clone-fullstack/src/app/notifications/page.tsx
"use client"

import { Header } from "@/components/Header"
import { SuggestedUsers } from "@/components/SuggestedUsers"
import { DesktopSidebar } from "@/components/DesktopSidebar"
import { MobileBottomNav } from "@/components/MobileBottomNav"
import Image from "next/image"
import Link from "next/link"
import { formatRelativeTime } from "@/lib/utils"

const notifications = [
  { id: "1", type: "like", username: "nature_lover", displayName: "Nature Lover", avatarUrl: "https://picsum.photos/seed/user1/64/64", postImage: "https://picsum.photos/seed/notify1/200/200", time: new Date(Date.now() - 30 * 60 * 1000).toISOString(), isNew: true },
  { id: "2", type: "comment", username: "travel_diary", displayName: "Travel Diary", avatarUrl: "https://picsum.photos/seed/user2/64/64", postImage: "https://picsum.photos/seed/notify2/200/200", content: "Amazing shot! Where is this?", time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), isNew: true },
  { id: "3", type: "follow", username: "foodie_life", displayName: "Foodie Life", avatarUrl: "https://picsum.photos/seed/user3/64/64", time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), isNew: false },
  { id: "4", type: "like", username: "tech_guru", displayName: "Tech Guru", avatarUrl: "https://picsum.photos/seed/user4/64/64", postImage: "https://picsum.photos/seed/notify3/200/200", time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), isNew: false },
]

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-100 md:bg-white mobile-dark:bg-black mobile-dark:text-white flex flex-col">
      <Header />
      <MobileBottomNav />
      <main className="flex-1 flex flex-col md:flex-row">
        <DesktopSidebar />

        <div className="flex-1 min-w-0 md:pl-0 lg:pl-8">
          <div className="max-w-[430px] lg:max-w-[614px] mx-auto w-full px-4 py-4">
            <div className="bg-black md:bg-white border border-gray-800 md:border-border rounded-lg">
              <div className="p-4 border-b border-gray-800 md:border-border flex items-center justify-between sticky top-0 bg-black md:bg-white z-10">
                <h2 className="text-xl font-semibold text-white md:text-gray-900">Notifications</h2>
                <button className="text-sm text-blue-400 md:text-primary font-medium hover:underline">Mark all as read</button>
              </div>

              <div className="divide-y divide-gray-800 md:divide-border">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 flex items-start gap-3 transition-colors ${notification.isNew ? "bg-gray-800/50 md:bg-primary/5" : ""}`}
                  >
                    <Link href={`/${notification.username}`} className="flex-shrink-0">
                      <div className="relative w-10 h-10">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 p-[2px] flex items-center justify-center">
                          <div className="relative w-full h-full rounded-full bg-black md:bg-white flex items-center justify-center overflow-hidden">
                            <Image src={notification.avatarUrl} alt={notification.username} fill className="object-cover" sizes="40px" />
                          </div>
                        </div>
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <Link href={`/${notification.username}`} className="font-semibold text-sm text-white md:text-gray-900 hover:underline">
                          {notification.displayName}
                        </Link>
                        <span className="text-sm text-gray-300 md:text-gray-600">
                          {notification.type === "like" && "liked your post"}
                          {notification.type === "comment" && `commented: "${notification.content}"`}
                          {notification.type === "follow" && "started following you"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 md:text-gray-500 mt-1">{formatRelativeTime(notification.time)}</p>
                    </div>

                    {notification.postImage ? (
                      <Link href={`/p/${notification.id}`} className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={notification.postImage} alt="" fill className="object-cover" sizes="48px" />
                      </Link>
                    ) : notification.type === "follow" ? (
                      <button className="px-4 py-2 text-sm font-semibold text-blue-400 md:text-primary border border-blue-500 md:border-primary rounded-lg hover:bg-blue-500/10 md:hover:bg-primary/10 transition-colors flex-shrink-0">
                        Follow back
                      </button>
                    ) : null}

                    {notification.isNew && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 ml-2 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <SuggestedUsers />
      </main>
    </div>
  )
}