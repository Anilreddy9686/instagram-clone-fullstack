// A:/instagram-clone-fullstack/src/middleware.ts
import { auth } from "@/lib/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnAuth = req.nextUrl.pathname.startsWith("/auth")
  const isOnApi = req.nextUrl.pathname.startsWith("/api")
  const isPublic = ["/", "/explore", "/reels"].includes(req.nextUrl.pathname)

  if (isOnAuth && isLoggedIn) {
    return Response.redirect(new URL("/", req.nextUrl))
  }

  if (!isLoggedIn && !isOnAuth && !isPublic && !isOnApi) {
    return Response.redirect(new URL("/auth/signin", req.nextUrl))
  }
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}