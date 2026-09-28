// A:/instagram-clone-fullstack/src/lib/store.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  username: string
  displayName?: string
  avatarUrl?: string
}

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  updateProfile: (data: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateProfile: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
)

interface UIState {
  isSidebarOpen: boolean
  isCreateModalOpen: boolean
  isStoryViewerOpen: boolean
  currentStoryIndex: number
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  openCreateModal: () => void
  closeCreateModal: () => void
  openStoryViewer: (index?: number) => void
  closeStoryViewer: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isCreateModalOpen: false,
  isStoryViewerOpen: false,
  currentStoryIndex: 0,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),
  openStoryViewer: (index = 0) => set({ isStoryViewerOpen: true, currentStoryIndex: index }),
  closeStoryViewer: () => set({ isStoryViewerOpen: false, currentStoryIndex: 0 }),
}))

interface Post {
  id: string
  username: string
  displayName?: string
  avatarUrl?: string
  imageUrl: string
  caption?: string
  likesCount: number
  commentsCount: number
  isLiked: boolean
  isSaved: boolean
  createdAt: string
  location?: string
}

interface PostsState {
  posts: Post[]
  feedCursor: string | null
  hasMore: boolean
  isLoading: boolean
  setPosts: (posts: Post[]) => void
  prependPosts: (posts: Post[]) => void
  appendPosts: (posts: Post[]) => void
  updatePost: (id: string, data: Partial<Post>) => void
  removePost: (id: string) => void
  setFeedCursor: (cursor: string | null) => void
  setHasMore: (hasMore: boolean) => void
  setLoading: (loading: boolean) => void
  optimisticLike: (postId: string) => void
  optimisticUnlike: (postId: string) => void
  optimisticSave: (postId: string) => void
  optimisticUnsave: (postId: string) => void
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  feedCursor: null,
  hasMore: true,
  isLoading: false,
  setPosts: (posts) => set({ posts }),
  prependPosts: (posts) =>
    set((state) => ({ posts: [...posts, ...state.posts] })),
  appendPosts: (posts) =>
    set((state) => ({ posts: [...state.posts, ...posts] })),
  updatePost: (id, data) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.id === id ? { ...p, ...data } : p)),
    })),
  removePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
    })),
  setFeedCursor: (cursor) => set({ feedCursor: cursor }),
  setHasMore: (hasMore) => set({ hasMore }),
  setLoading: (loading) => set({ isLoading: loading }),
  optimisticLike: (postId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, isLiked: true, likesCount: p.likesCount + 1 } : p
      ),
    })),
  optimisticUnlike: (postId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, isLiked: false, likesCount: p.likesCount - 1 } : p
      ),
    })),
  optimisticSave: (postId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, isSaved: true } : p
      ),
    })),
  optimisticUnsave: (postId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, isSaved: false } : p
      ),
    })),
}))