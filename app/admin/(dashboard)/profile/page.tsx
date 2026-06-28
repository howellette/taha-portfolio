"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const [form, setForm] = useState<Record<string, string>>({
    full_name: "", headline: "", bio: "", badge: "",
    email: "", phone: "", location: "",
    linkedin_url: "", github_url: "", resume_url: "", avatar_url: "",
    stat_publications: "3", stat_projects: "5", stat_research: "1+", stat_conferences: "2"
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase.from("profile").select("*").single();
      if (data) {
        setForm({
          full_name: data.full_name ?? "",
          headline: data.headline ?? "",
          bio: data.bio ?? "",
          badge: data.badge ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          location: data.location ?? "",
          linkedin_url: data.linkedin_url ?? "",
          github_url: data.github_url ?? "",
          resume_url: data.resume_url ?? "",
          avatar_url: data.avatar_url ?? "",
          stat_publications: String(data.stat_publications ?? 3),
          stat_projects: String(data.stat_projects ?? 5),
          stat_research: String(data.stat_research ?? "1+"),
          stat_conferences: String(data.stat_conferences ?? 2),
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  async function save() {
    const supabase = createClient();
    const { data: existing } = await supabase.from("profile").select("id").single();
    const payload = {
      ...form,
      stat_publications: parseInt(form.stat_publications) || 3,
      stat_projects: parseInt(form.stat_projects) || 5,
      stat_conferences: parseInt(form.stat_conferences) || 2,
      updated_at: new Date().toISOString(),
    };
    if (existing) {
      await supabase.from("profile").update(payload).eq("id", existing.id);
    } else {
      await supabase.from("profile").insert(payload);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return <div style={{color:"var(--muted)"}}>Loading...</div>;

  const fields = [
    { key: "full_name", label: "Full Name" },
    { key: "headline", label: "Headline / Title" },
    { key: "badge", label: "Hero Badge Text" },
    { key: "bio", label: "Bio", multiline: true },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "location", label: "Location" },
    { key: "linkedin_url", label: "LinkedIn URL" },
    { key: "github_url", label: "GitHub URL" },
    { key: "resume_url", label: "CV / Resume URL" },
    { key: "avatar_url", label: "Profile Photo URL (paste ImgBB direct link)" },
  ];

  const stats = [
    { key: "stat_publications", label: "Publications" },
    { key: "stat_projects", label: "Projects" },
    { key: "stat_research", label: "Years Research" },
    { key: "stat_conferences", label: "Conferences" },
  ];

  return (
    <div>
      <div className="admin-title">Edit Profile</div>
      {saved && <div style={{background:"rgba(52,211,153,0.1)",color:"var(--accent3)",padding:"0.75rem 1rem",borderRadius:"8px",marginBottom:"1rem",border:"1px solid rgba(52,211,153,0.2)"}}>✅ Profile saved successfully!</div>}

      <div className="admin-card">
        <div style={{fontWeight:600,marginBottom:"1rem",color:"var(--muted)"}}>Basic Info</div>
        {fields.map((f) => (
          <div key={f.key} className="admin-field">
            <label className="admin-label">{f.label}</label>
            {(f as any).multiline
              ? <textarea className="admin-textarea" value={form[f.key]} onChange={(e) => setForm({...form, [f.key]: e.target.value})} />
              : <input className="admin-input" value={form[f.key]} onChange={(e) => setForm({...form, [f.key]: e.target.value})} />
            }
          </div>
        ))}
      </div>

      <div className="admin-card">
        <div style={{fontWeight:600,marginBottom:"1rem",color:"var(--muted)"}}>Hero Stats</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
          {stats.map((f) => (
            <div key={f.key} className="admin-field">
              <label className="admin-label">{f.label}</label>
              <input className="admin-input" value={form[f.key]} onChange={(e) => setForm({...form, [f.key]: e.target.value})} />
            </div>
          ))}
        </div>
      </div>

      <button onClick={save} className="btn-admin btn-save" style={{fontSize:"0.9rem",padding:"0.65rem 1.5rem"}}>
        Save Profile
      </button>
    </div>
  );
}
