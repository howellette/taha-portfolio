import { getProfile } from "@/lib/data/portfolio";
import { updateProfile } from "@/lib/actions/admin";

export default async function ProfilePage() {
  const profile = await getProfile();
  return (
    <div>
      <div className="admin-title">Edit Profile</div>
      <form action={updateProfile}>
        <div className="admin-card">
          <div style={{fontWeight:600,marginBottom:"1rem",color:"var(--muted)"}}>Basic Info</div>
          {[
            { name: "full_name", label: "Full Name", value: profile?.full_name },
            { name: "headline", label: "Headline / Title", value: profile?.headline },
            { name: "badge", label: "Hero Badge Text", value: profile?.badge },
          ].map((f) => (
            <div key={f.name} className="admin-field">
              <label className="admin-label">{f.label}</label>
              <input name={f.name} className="admin-input" defaultValue={f.value ?? ""} />
            </div>
          ))}
          <div className="admin-field">
            <label className="admin-label">Bio</label>
            <textarea name="bio" className="admin-textarea" defaultValue={profile?.bio ?? ""} style={{minHeight:"110px"}} />
          </div>
        </div>

        <div className="admin-card">
          <div style={{fontWeight:600,marginBottom:"1rem",color:"var(--muted)"}}>Contact & Links</div>
          {[
            { name: "email", label: "Email", value: profile?.email },
            { name: "phone", label: "Phone", value: profile?.phone },
            { name: "location", label: "Location", value: profile?.location },
            { name: "linkedin_url", label: "LinkedIn URL", value: profile?.linkedin_url },
            { name: "github_url", label: "GitHub URL", value: profile?.github_url },
            { name: "resume_url", label: "CV / Resume URL", value: profile?.resume_url },
            { name: "avatar_url", label: "Profile Photo URL", value: profile?.avatar_url },
          ].map((f) => (
            <div key={f.name} className="admin-field">
              <label className="admin-label">{f.label}</label>
              <input name={f.name} className="admin-input" defaultValue={f.value ?? ""} />
            </div>
          ))}
        </div>

        <div className="admin-card">
          <div style={{fontWeight:600,marginBottom:"1rem",color:"var(--muted)"}}>Hero Stats</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
            {[
              { name: "stat_publications", label: "Publications", value: profile?.stat_publications },
              { name: "stat_projects", label: "Projects", value: profile?.stat_projects },
              { name: "stat_research", label: "Years Research", value: profile?.stat_research },
              { name: "stat_conferences", label: "Conferences", value: profile?.stat_conferences },
            ].map((f) => (
              <div key={f.name} className="admin-field">
                <label className="admin-label">{f.label}</label>
                <input name={f.name} className="admin-input" defaultValue={String(f.value ?? "")} />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-admin btn-save">Save Profile</button>
      </form>
    </div>
  );
}
