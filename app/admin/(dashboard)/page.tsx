import { getProfile, getAllSections, getAllViews } from "@/lib/data/portfolio";
import Link from "next/link";

export default async function AdminDashboard() {
  const [profile, sections, views] = await Promise.all([getProfile(), getAllSections(), getAllViews()]);
  return (
    <div>
      <div className="admin-title">Dashboard</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem",marginBottom:"1.5rem"}}>
        {[
          { label: "Sections", value: sections.length, href: "/admin/sections" },
          { label: "Custom Views", value: views.length, href: "/admin/views" },
          { label: "Profile", value: profile ? "Set" : "Not set", href: "/admin/profile" },
        ].map((s) => (
          <Link key={s.label} href={s.href} style={{textDecoration:"none"}}>
            <div className="admin-card" style={{textAlign:"center",cursor:"pointer"}}>
              <div style={{fontSize:"1.6rem",fontWeight:800,color:"var(--accent)"}}>{s.value}</div>
              <div style={{fontSize:"0.8rem",color:"var(--muted)",marginTop:"0.2rem"}}>{s.label}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="admin-card">
        <div style={{fontWeight:600,marginBottom:"0.75rem"}}>Quick Links</div>
        <div style={{display:"flex",flexDirection:"column",gap:"0.4rem"}}>
          <Link href="/admin/profile" style={{fontSize:"0.85rem",color:"var(--accent)"}}>→ Edit Profile & Bio</Link>
          <Link href="/admin/sections" style={{fontSize:"0.85rem",color:"var(--accent)"}}>→ Manage Sections & Entries</Link>
          <Link href="/admin/views" style={{fontSize:"0.85rem",color:"var(--accent)"}}>→ Create Shareable Views</Link>
          <a href="/" target="_blank" style={{fontSize:"0.85rem",color:"var(--accent3)"}}>→ View Live Portfolio</a>
        </div>
      </div>
    </div>
  );
}
