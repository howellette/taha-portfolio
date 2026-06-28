# Taha Mahmood — Dynamic Portfolio

A full-stack dynamic portfolio with admin panel, built with Next.js + Supabase.

## Features
- 🔐 Admin login to edit everything without touching code
- 📋 Add/edit/delete/reorder sections and entries
- 🔗 Shareable custom views (show only selected sections)
- 📱 Fully responsive design
- ⚡ Auto-deploys to Vercel on every push

## Setup (5 steps)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Go to **SQL Editor** → paste the contents of `supabase/migrations/001_initial.sql` → Run
3. Go to **Project Settings → API** → copy:
   - **Project URL**
   - **anon/public key**

### 2. Create Admin User
1. In Supabase → **Authentication → Users → Add User**
2. Enter Taha's email and password
3. That's his admin login

### 3. Set Environment Variables
Copy `.env.example` to `.env.local` and fill in:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app
```

### 4. Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 5. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
2. Add environment variables (same as `.env.local`)
3. Deploy → done!

## Admin Panel
Visit: `https://your-site.vercel.app/admin/login`

- **Profile** — Edit name, bio, photo, links, stats
- **Sections** — Add/edit/reorder/hide sections
- **Entries** — Add content to each section
- **Views** — Create shareable links for recruiters

## Seed Data
Run `supabase/migrations/002_seed.sql` to add Taha's existing data automatically.
