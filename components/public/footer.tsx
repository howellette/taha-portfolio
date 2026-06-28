import type { Profile } from "@/lib/types";

export function Footer({ profile }: { profile: Profile | null }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-copy">© 2026 {profile?.full_name ?? "Taha Mahmood"}. Built with Next.js & Supabase.</div>
          <div className="footer-links">
            {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noopener" className="icon-btn">in</a>}
            {profile?.github_url && <a href={profile.github_url} target="_blank" rel="noopener" className="icon-btn">gh</a>}
            {profile?.email && <a href={`mailto:${profile.email}`} className="icon-btn">✉</a>}
          </div>
        </div>
      </div>
    </footer>
  );
}
