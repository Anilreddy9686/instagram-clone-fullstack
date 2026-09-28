// A:/instagram-clone-fullstack/src/app/auth/signup/page.tsx
"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.email) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.username) newErrors.username = "Username is required"
    else if (formData.username.length < 3) newErrors.username = "Username must be at least 3 characters"
    else if (!/^[a-zA-Z0-9._]+$/.test(formData.username)) newErrors.username = "Username can only contain letters, numbers, . and _"
    if (!formData.displayName) newErrors.displayName = "Display name is required"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setErrors({})

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrors({ form: data.error || "Signup failed" })
        setIsLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push(`/auth/signin?callbackUrl=${callbackUrl}`)
      }, 1500)
    } catch {
      setErrors({ form: "An error occurred. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: "" }))
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-gray-900 p-6 text-center">
          <CheckCircle2 className="mx-auto text-green-400 mb-4" size={64} />
          <h1 className="text-2xl font-semibold text-white mb-2">Account created!</h1>
          <p className="text-gray-400 mb-6">Redirecting to sign in...</p>
          <Loader2 size={24} className="mx-auto animate-spin text-blue-500" />
        </div>
      </div>
    )
  }

  const inputClassName = (error?: string) => `
    w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-base text-white
    focus:outline-none focus:ring-2 focus:ring-blue-500/20
    placeholder:text-gray-500
    transition-colors
    ${error ? "ring-2 ring-red-500/50 border-red-500/50" : ""}
  `.replace(/\s+/g, " ").trim()

  const inputWrapperClassName = "relative"

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 p-6">
          <div className="text-center mb-6">
            <Link href="/" className="font-logo text-3xl text-white">Instagram</Link>
          </div>

          <h1 className="text-xl font-semibold text-white mb-2 text-center">Create your account</h1>
          <p className="text-sm text-gray-400 text-center mb-6">Sign up to see photos and videos from your friends.</p>

          {errors.form && (
            <div className="mb-5 p-3 bg-red-900/30 border border-red-500/30 text-red-400 rounded text-sm">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                autoComplete="email"
                className={inputClassName(errors.email)}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
            </div>

            <div>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                autoComplete="username"
                className={inputClassName(errors.username)}
              />
              {errors.username && <p className="mt-1.5 text-xs text-red-400">{errors.username}</p>}
            </div>

            <div>
              <input
                id="displayName"
                name="displayName"
                type="text"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="Display Name"
                required
                autoComplete="name"
                className={inputClassName(errors.displayName)}
              />
              {errors.displayName && <p className="mt-1.5 text-xs text-red-400">{errors.displayName}</p>}
            </div>

            <div>
              <div className={inputWrapperClassName}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  autoComplete="new-password"
                  className={inputClassName(errors.password) + " pr-12"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>}
            </div>

            <div>
              <div className={inputWrapperClassName}>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  autoComplete="new-password"
                  className={inputClassName(errors.confirmPassword) + " pr-12"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-base"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link href={`/auth/signin?callbackUrl=${callbackUrl}`} className="text-blue-400 font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 bg-gray-900 p-4 text-center text-sm text-gray-400">
          <p className="max-w-xs mx-auto leading-relaxed">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-blue-400 hover:underline">Terms</a>{", "}
            <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>{" "}
            and{" "}
            <a href="/cookies" className="text-blue-400 hover:underline">Cookies Policy</a>.
          </p>
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Meta © 2024</p>
        </div>
      </div>
    </div>
  )
}