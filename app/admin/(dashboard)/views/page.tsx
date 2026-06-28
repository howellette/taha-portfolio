import { getAllSections, getAllViews } from "@/lib/data/portfolio";
import { createView, deleteView } from "@/lib/actions/admin";

export default async function ViewsPage() {
  const [sections, views] = await Promise.all([getAllSections(), getAllViews()]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return (
    <div>
      <div className="admin-title">Custom Views</div>
      <p style={{fontSize:"0.82rem",color:"var(--muted)",marginBottom:"1.25rem"}}>
        Create shareable links that show only specific sections — useful for sending to recruiters.
      </p>

      <div className="admin-card" style={{marginBottom:"1.5rem"}}>
        <div style={{fontWeight:600,marginBottom:"0.85rem"}}>Create New View</div>
        <form action={createView}>
          <div className="admin-field">
            <label className="admin-label">View Label</label>
            <input name="label" className="admin-input" placeholder="e.g. Research Focus" required />
          </div>
          <div className="admin-field">
            <label className="admin-label">Include Sections</label>
            <div style={{display:"flex",flexDirection:"column",gap:"0.4rem",marginTop:"0.35rem"}}>
              {sections.map((s) => (
                <label key={s.id} style={{display:"flex",alignItems:"center",gap:"0.5rem",fontSize:"0.85rem",cursor:"pointer"}}>
                  <input type="checkbox" name="section_ids" value={s.id} />
                  {s.title}
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="btn-admin btn-save">Create View</button>
        </form>
      </div>

      {views.map((v) => (
        <div key={v.id} className="admin-section-item">
          <div>
            <div style={{fontWeight:600,fontSize:"0.875rem"}}>{v.label}</div>
            <a href={`${siteUrl}/p/${v.slug}`} target="_blank" rel="noopener" style={{fontSize:"0.78rem",color:"var(--accent)"}}>
              {siteUrl}/p/{v.slug}
            </a>
          </div>
          <form action={deleteView.bind(null, v.id)}>
            <button type="submit" className="btn-admin btn-danger">✕ Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
}
