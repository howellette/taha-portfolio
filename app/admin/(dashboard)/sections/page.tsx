import { getAllSections } from "@/lib/data/portfolio";
import { createSection, deleteSection, updateSection, moveSectionUp, moveSectionDown } from "@/lib/actions/admin";
import Link from "next/link";
import { DeleteSectionButton } from "@/components/admin/delete-section-button";

export default async function SectionsPage() {
  const sections = await getAllSections();
  return (
    <div>
      <div className="admin-title">Sections</div>

      <div className="admin-card" style={{marginBottom:"1.5rem"}}>
        <div style={{fontWeight:600,marginBottom:"0.85rem"}}>Add New Section</div>
        <form action={createSection} style={{display:"flex",gap:"0.75rem",flexWrap:"wrap"}}>
          <input name="title" className="admin-input" placeholder="Section Title (e.g. Certifications)" style={{flex:1,minWidth:"180px"}} required />
          <select name="type" className="admin-select" style={{flex:1,minWidth:"160px"}}>
            <option value="generic">Generic</option>
            <option value="education">Education</option>
            <option value="experience">Experience</option>
            <option value="publication">Publication</option>
            <option value="project">Project</option>
            <option value="skills">Skills</option>
            <option value="achievement">Achievement</option>
          </select>
          <button type="submit" className="btn-admin btn-save">+ Add</button>
        </form>
      </div>

      <div>
        {sections.map((s) => (
          <div key={s.id} className="admin-section-item">
            <div style={{display:"flex",alignItems:"center",gap:"0.75rem",flex:1}}>
              <span style={{fontSize:"0.85rem",fontWeight:600}}>{s.title}</span>
              <span className="tag">{s.type}</span>
              {!s.visible && <span className="tag tag-yellow">Hidden</span>}
            </div>
            <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
              <Link href={`/admin/sections/${s.id}`}>
                <button className="btn-admin btn-secondary">✏ Entries</button>
              </Link>
              <form action={moveSectionUp.bind(null, s.id, s.position)} style={{display:"inline"}}>
                <button type="submit" className="btn-admin btn-secondary">↑</button>
              </form>
              <form action={moveSectionDown.bind(null, s.id, s.position)} style={{display:"inline"}}>
                <button type="submit" className="btn-admin btn-secondary">↓</button>
              </form>
              <form action={updateSection.bind(null, s.id)}>
                <input type="hidden" name="title" value={s.title} />
                <input type="hidden" name="visible" value={String(!s.visible)} />
                <button type="submit" className="btn-admin btn-secondary">{s.visible ? "Hide" : "Show"}</button>
              </form>
              <DeleteSectionButton id={s.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
