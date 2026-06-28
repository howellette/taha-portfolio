# Taha Mahmood — Dynamic Portfolio
 
A full-stack dynamic portfolio with admin panel, built with Next.js + Supabase.
 
🌐 **Live Site:** [taha-portfolio-sandy-ten.vercel.app](https://taha-portfolio-sandy-ten.vercel.app)  
🔐 **Admin Panel:** [taha-portfolio-sandy-ten.vercel.app/admin/login](https://taha-portfolio-sandy-ten.vercel.app/admin/login)
 
---
 
## ✨ Features
 
- 🔐 Admin login to edit everything without touching code
- 📋 Add/edit/delete/reorder sections and entries
- 🔗 Shareable custom views (show only selected sections)
- 📱 Fully responsive design
- ⚡ Auto-deploys to Vercel on every push
---
 
## 🛠️ Tech Stack
 
| Technology | Purpose |
|-----------|---------|
| Next.js 15 | Frontend framework |
| Supabase | Database & Authentication |
| Vercel | Hosting & Deployment |
| TypeScript | Type safety |
 
---
 
## 🚀 Setup Guide
 
### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Go to **SQL Editor** → paste `supabase/migrations/001_initial.sql` → Run
3. Then paste `supabase/migrations/002_seed.sql` → Run
4. Go to **Authentication → Users → Add User** (admin login)
5. Go to **Settings → API Keys → Legacy** → copy `anon` key
### 2. Set Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key
NEXT_PUBLIC_SITE_URL=https://taha-portfolio-sandy-ten.vercel.app
```
 
### 3. Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/howellette/taha-portfolio.git
git push -u origin main
```
 
### 4. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) → Import repo
2. Add environment variables
3. Deploy!
---
 
## 👤 Admin Panel Guide
 
### Adding Profile Photo
1. Upload photo to [imgbb.com](https://imgbb.com)
2. Copy the **Direct link** (`https://i.ibb.co/...`)
3. Admin → Profile → paste in **Profile Photo URL** → Save
### Adding CV
1. Upload PDF to [Google Drive](https://drive.google.com)
2. Right click → Share → Anyone with the link → Copy link
3. Admin → Profile → paste in **CV / Resume URL** → Save
### Adding Project Images
1. Upload photo to [imgbb.com](https://imgbb.com)
2. Copy direct link
3. Admin → Sections → Projects → Edit → paste in **Image URL** → Save
### Custom Views
- Admin → Custom Views → Create view with selected sections
- Share the link with recruiters
---
 
## 📬 Contact
 
**Taha Mahmood**  
📧 tahamahmood2903@gmail.com  
🔗 [linkedin.com/in/taha-mahmood](https://linkedin.com/in/taha-mahmood)  
🐙 [github.com/taha-mahmood](https://github.com/taha-mahmood)
 
---
 
*Built with ❤️ using Next.js & Supabase*"test" 
