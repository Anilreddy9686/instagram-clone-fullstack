// A:/instagram-clone-fullstack/src/app/create/page.tsx
"use client"

import { Header } from "@/components/Header"
import { SuggestedUsers } from "@/components/SuggestedUsers"
import { DesktopSidebar } from "@/components/DesktopSidebar"
import { MobileBottomNav } from "@/components/MobileBottomNav"
import { useState } from "react"
import { X, Image as ImageIcon, Video, Camera, Grid, Plus } from "lucide-react"

export default function CreatePage() {
  const [selectedType, setSelectedType] = useState<"post" | "reel" | "story" | "live">("post")
  const [media, setMedia] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [caption, setCaption] = useState("")
  const [location, setLocation] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setMedia(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!media) return

    const formData = new FormData()
    formData.append("image", media)
    formData.append("caption", caption)
    formData.append("location", location)

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        setMedia(null)
        setPreview(null)
        setCaption("")
        setLocation("")
        window.location.href = "/"
      }
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 md:bg-white mobile-dark:bg-black mobile-dark:text-white flex flex-col">
      <Header />
      <MobileBottomNav />
      <main className="flex-1 flex flex-col md:flex-row">
        <DesktopSidebar />

        <div className="flex-1 min-w-0 md:pl-0 lg:pl-8">
          <div className="max-w-[430px] lg:max-w-[935px] mx-auto w-full px-4 py-6">
            <div className="bg-black md:bg-white border border-gray-800 md:border-border rounded-lg">
              <div className="p-4 border-b border-gray-800 md:border-border flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white md:text-gray-900">New {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}</h2>
                <button className="p-2 rounded-full hover:bg-gray-800 md:hover:bg-gray-100 text-white md:text-gray-600" aria-label="Close">
                  <X size={24} />
                </button>
              </div>

              <div className="flex gap-2 px-4 py-4 border-b border-gray-800 md:border-border overflow-x-auto">
                {["post", "reel", "story", "live"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type as any)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                      selectedType === type
                        ? "bg-blue-500/20 text-blue-400 md:bg-primary/10 md:text-primary"
                        : "text-gray-400 md:text-gray-600 hover:bg-gray-800 md:hover:bg-gray-100"
                    }`}
                  >
                    {type === "post" && <ImageIcon size={18} />}
                    {type === "reel" && <Video size={18} />}
                    {type === "story" && <Camera size={18} />}
                    {type === "live" && <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse" />}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="p-4 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 md:text-gray-700 mb-2">Media</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="media-upload"
                    />
                    <label
                      htmlFor="media-upload"
                      className={`relative aspect-square max-w-md mx-auto rounded-lg border-2 border-dashed border-gray-700 md:border-gray-300 flex flex-col items-center justify-center cursor-pointer transition-colors hover:border-blue-500/50 md:hover:border-primary/50 ${
                        preview ? "border-transparent" : ""
                      }`}
                    >
                      {preview ? (
                        selectedType === "reel" || media?.type.startsWith("video/") ? (
                          <video src={preview} className="w-full h-full object-cover rounded-lg" muted autoPlay loop />
                        ) : (
                          <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                        )
                      ) : (
                        <>
                          <Plus className="text-gray-400 md:text-gray-500 mb-2" size={32} />
                          <span className="text-gray-400 md:text-gray-500">Drag and drop or click to select</span>
                          <p className="text-xs text-gray-500 md:text-gray-400 mt-1">PNG, JPG, MP4, MOV (max 100MB)</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="caption" className="block text-sm font-medium text-gray-300 md:text-gray-700 mb-2">
                    Caption
                  </label>
                  <textarea
                    id="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write a caption..."
                    rows={4}
                    className="w-full bg-gray-800 md:bg-gray-100 border-0 rounded-lg px-4 py-3 text-sm text-white md:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none placeholder-gray-500"
                    maxLength={2200}
                  />
                  <div className="flex justify-between mt-2 text-xs text-gray-400 md:text-gray-500">
                    <span>{caption.length}/2200</span>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-600 md:border-gray-300" />
                      <span className="text-gray-300 md:text-gray-600">Also share to Facebook</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-300 md:text-gray-700 mb-2">
                    Add Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Add location"
                    className="w-full bg-gray-800 md:bg-gray-100 border-0 rounded-lg px-4 py-3 text-sm text-white md:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-gray-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-800 md:border-border">
                  <button type="button" className="px-6 py-2 text-gray-300 md:text-gray-600 font-medium hover:text-white md:hover:text-gray-900">Cancel</button>
                  <button
                    type="submit"
                    disabled={!media}
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Share
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <SuggestedUsers />
      </main>
    </div>
  )
}