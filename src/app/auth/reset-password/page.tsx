// A:/instagram-clone-fullstack/src/app/auth/reset-password/page.tsx
"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Mail, Loader2, CheckCircle2, ArrowLeft } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to send reset email")
        setIsLoading(false)
        return
      }

      setSuccess(true)
      setIsLoading(false)
    } catch {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-gray-900 p-6 text-center">
          <CheckCircle2 className="mx-auto text-green-400 mb-4" size={64} />
          <h1 className="text-2xl font-semibold text-white mb-2">Check your email</h1>
          <p className="text-gray-400 mb-6">We&apos;ve sent a password reset link to <strong className="text-white">{email}</strong></p>
          <Link
            href={`/auth/signin?callbackUrl=${callbackUrl}`}
            className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:underline"
          >
            <ArrowLeft size={18} /> Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 p-6">
          <div className="text-center mb-6">
            <Link href="/" className="font-logo text-3xl text-white">Instagram</Link>
          </div>

          <h1 className="text-xl font-semibold text-white mb-2 text-center">Reset password</h1>
          <p className="text-sm text-gray-400 text-center mb-6">Enter your email and we&apos;ll send you a reset link.</p>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 text-red-400 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-gray-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-base"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : "Send reset link"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href={`/auth/signin?callbackUrl=${callbackUrl}`} className="text-sm text-blue-400 font-semibold hover:underline">
              Back to sign in
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/auth/signup" className="text-sm text-blue-400 hover:underline">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>

        <div className="mt-4 bg-gray-900 p-4 text-center text-sm text-gray-400">
          <p>Get the app.</p>
          <div className="mt-3 flex justify-center gap-4">
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">App Store</a>
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google Play</a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Meta © 2024</p>
        </div>
      </div>
    </div>
  )
}