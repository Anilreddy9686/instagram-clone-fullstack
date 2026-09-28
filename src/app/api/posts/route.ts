// A:/instagram-clone-fullstack/src/app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const cursor = searchParams.get("cursor")
    const limit = parseInt(searchParams.get("limit") || "10")

    const posts = await prisma.post.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, username: true, displayName: true, avatarUrl: true },
        },
        likes: {
          where: { userId: session.user.id },
          select: { id: true },
        },
        _count: { select: { likes: true, comments: true } },
      },
    })

    let nextCursor: string | undefined
    if (posts.length > limit) {
      const nextPost = posts.pop()
      nextCursor = nextPost!.id
    }

    const formattedPosts = posts.map((post) => ({
      ...post,
      isLiked: post.likes.length > 0,
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
    }))

    return NextResponse.json({ posts: formattedPosts, nextCursor })
  } catch (error) {
    console.error("Get posts error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { imageUrl, caption, location } = await request.json()

    if (!imageUrl) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 })
    }

    const post = await prisma.post.create({
      data: {
        userId: session.user.id,
        imageUrl,
        caption,
        location,
      },
      include: {
        user: {
          select: { id: true, username: true, displayName: true, avatarUrl: true },
        },
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Create post error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}