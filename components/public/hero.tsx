import type { Profile } from "@/lib/types";
import { CopyEmail } from "./copy-email";

export function Hero({ profile }: { profile: Profile | null }) {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-inner">
          <div>
            {profile?.badge && (
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                {profile.badge}
              </div>
            )}
            <h1 className="hero-name">
              {profile?.full_name?.split(" ")[0] ?? "Taha"}<br />
              <span className="hero-name-highlight">{profile?.full_name?.split(" ").slice(1).join(" ") ?? "Mahmood"}</span>
            </h1>
            {profile?.headline && <p className="hero-title">{profile.headline}</p>}
            {profile?.bio && <p className="hero-bio">{profile.bio}</p>}
            <div className="hero-pills">
              {profile?.resume_url && (
                <a href={profile.resume_url} target="_blank" rel="noopener" className="pill pill-primary">
                  ↓ Download CV
                </a>
              )}
              <a href="#contact" className="pill">✉ Get in Touch</a>
            </div>
            <div className="hero-socials">
              {profile?.linkedin_url && (
                <a href={profile.linkedin_url} target="_blank" rel="noopener" className="icon-btn" title="LinkedIn">in</a>
              )}
              {profile?.github_url && (
                <a href={profile.github_url} target="_blank" rel="noopener" className="icon-btn" title="GitHub">gh</a>
              )}
              {profile?.email && <CopyEmail email={profile.email} />}
            </div>
          </div>

          <div className="hero-card">
            <div className="avatar">
              {profile?.avatar_url
                ? <img src={profile.avatar_url} alt={profile.full_name} />
                : "👤"}
            </div>
            <div className="hero-card-name">{profile?.full_name}</div>
            <div className="hero-card-sub">NUST · EE · Communications</div>
            <div className="stats-grid">
              <div className="stat">
                <div className="stat-value">{profile?.stat_publications ?? 3}</div>
                <div className="stat-label">Publications</div>
              </div>
              <div className="stat">
                <div className="stat-value">{profile?.stat_projects ?? 5}</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat">
                <div className="stat-value">{profile?.stat_research ?? "1+"}</div>
                <div className="stat-label">Yrs Research</div>
              </div>
              <div className="stat">
                <div className="stat-value">{profile?.stat_conferences ?? 2}</div>
                <div className="stat-label">Conferences</div>
              </div>
            </div>
            <div className="hero-card-tags">
              <span className="tag">IEEE Author</span>
              <span className="tag tag-green">Open to Opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
