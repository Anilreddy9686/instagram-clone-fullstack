// A:/instagram-clone-fullstack/src/app/auth/signin/page.tsx
"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const error = searchParams.get("error")

  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")
    setIsLoading(true)

    const result = await signIn("credentials", {
      email: identifier,
      password,
      redirect: false,
    })

    setIsLoading(false)

    if (result?.error) {
      setFormError("Invalid email or password")
    } else {
      router.push(callbackUrl)
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-black p-6">
          <div className="text-center mb-6">
            <Link href="/" className="font-logo text-3xl text-white">Instagram</Link>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 text-red-400 rounded text-sm">
              {error === "CredentialsSignin" ? "Invalid email or password" : "An error occurred"}
            </div>
          )}

          {formError && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 text-red-400 rounded text-sm">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="identifier" className="sr-only">Phone number, username, or email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Phone number, username, or email"
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-gray-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-12 py-4 bg-gray-800 border border-gray-700 rounded-lg text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-base"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : "Log in"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link href={`/auth/signup?callbackUrl=${callbackUrl}`} className="text-blue-400 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/auth/reset-password" className="text-sm text-blue-400 hover:underline">
              Forgot password?
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