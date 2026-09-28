// A:/instagram-clone-fullstack/src/app/api/auth/new-password/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    // TODO: In a real app, you'd validate the token from a ResetToken table
    // For now, we'll use a simple approach - in production, store tokens in DB with expiry
    
    // This is a simplified version - you'd need to:
    // 1. Look up token in ResetToken table
    // 2. Verify it hasn't expired
    // 3. Get associated user
    // 4. Update password
    // 5. Delete used token

    // For demo purposes, we'll just hash the password
    // In production, you'd find the user by the token
    const passwordHash = await bcrypt.hash(password, 12)

    // This would be the actual user update:
    // await prisma.user.update({
    //   where: { id: userId },
    //   data: { passwordHash },
    // })

    // Also delete the used reset token:
    // await prisma.resetToken.delete({ where: { token } })

    console.log("Password reset successful (demo mode)")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("New password error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}