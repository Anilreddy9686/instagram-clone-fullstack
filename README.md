# Instagram Clone - Full Stack Next.js Application

A production-ready Instagram clone built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and NextAuth.js. Designed to be wrapped with Capacitor for Play Store deployment.

## Features

- **Authentication**: Email/password with NextAuth.js (Credentials provider)
- **Posts**: Create, read, like, comment, save
- **Stories**: View stories with gradient rings
- **Feed**: Infinite scroll with optimized queries
- **Real-time**: Socket.io ready for notifications/messaging
- **Mobile**: Capacitor configuration for iOS/Android
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS with Instagram-like design

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js v5 (beta)
- **State**: TanStack Query, Zustand
- **Mobile**: Capacitor
- **Deployment**: Vercel (web), Play Store (mobile via Capacitor)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Clone and install dependencies
cd instagram-clone-fullstack
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and secrets

# Set up database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/instagram_clone?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key-at-least-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Optional: OAuth providers
# GOOGLE_CLIENT_ID=""
# GOOGLE_CLIENT_SECRET=""
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth + custom auth endpoints
│   │   └── posts/         # Posts CRUD
│   ├── auth/              # Auth pages (signin, signup)
│   ├── explore/           # Explore page
│   ├── profile/           # User profiles
│   └── ...
├── components/            # React components
│   ├── Header.tsx
│   ├── Feed.tsx
│   ├── Post.tsx
│   ├── Story.tsx
│   └── SuggestedUsers.tsx
├── lib/                   # Utilities and config
│   ├── auth.ts            # NextAuth configuration
│   ├── prisma.ts          # Prisma client
│   └── utils.ts           # Helper functions
└── prisma/
    └── schema.prisma      # Database schema
```

## Mobile Deployment (Play Store)

### 1. Build the web app
```bash
npm run build
```

### 2. Initialize Capacitor (first time only)
```bash
npx cap init
npx cap add android
npx cap add ios
```

### 3. Sync and build for Android
```bash
npx cap sync android
npx cap open android
```

### 4. In Android Studio:
- Configure signing keys
- Build signed APK/AAB
- Upload to Play Console

### 5. Play Store Requirements:
- App signing key
- Privacy policy URL
- App screenshots (phone, tablet)
- Feature graphic
- Content rating questionnaire

## Key Features Implementation

### Authentication Flow
1. User registers via `/api/auth/signup`
2. Credentials stored with bcrypt hash
3. NextAuth handles session with JWT
4. Protected routes check session

### Posts System
- Optimistic UI updates with TanStack Query
- Infinite scrolling with cursor pagination
- Like/Save with immediate feedback

### Stories
- Gradient ring indicator for unseen stories
- Auto-advance with pause on hover
- 24-hour expiration

### Real-time (Ready for implementation)
```typescript
// Socket.io integration points in lib/socket.ts
// - New likes/comments notifications
// - Direct messaging
// - Live story updates
```

## Production Checklist

- [ ] Set up PostgreSQL (Neon, Supabase, Railway, etc.)
- [ ] Configure NextAuth secret (32+ chars)
- [ ] Add OAuth providers (Google, Facebook, Apple)
- [ ] Set up file storage (AWS S3, Cloudinary, UploadThing)
- [ ] Configure email service (Resend, SendGrid)
- [ ] Add error tracking (Sentry)
- [ ] Set up analytics (Vercel Analytics, PostHog)
- [ ] Configure CI/CD (GitHub Actions)
- [ ] Load testing
- [ ] Security audit

## License

MIT License - feel free to use for learning or commercial projects.

## Contributing

1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push and open PR