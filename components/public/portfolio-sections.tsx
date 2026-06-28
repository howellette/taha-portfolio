import type { Section, Entry } from "@/lib/types";
import { ContactSection } from "./contact-section";

type SectionWithEntries = Section & { entries: Entry[] };

function str(v: unknown) { return typeof v === "string" ? v : String(v ?? ""); }
function arr(v: unknown): string[] { return Array.isArray(v) ? v.map(String) : []; }

function EduEntry({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="entry-row">
      <div className="timeline-side">
        <div className="timeline-dot" />
        <div className="timeline-date">{str(data.duration)}</div>
      </div>
      <div className="entry-body">
        <div className="entry-title">{str(data.degree)}</div>
        <div className="entry-subtitle">{str(data.institution)}</div>
        <div className="entry-meta">{str(data.location)}{data.specialization ? ` · ${str(data.specialization)}` : ""}</div>
        {data.description && <div className="entry-desc">{str(data.description)}</div>}
        {data.current && <span className="tag tag-green" style={{marginTop:"0.5rem",display:"inline-block"}}>Currently Enrolled</span>}
      </div>
    </div>
  );
}

function ExpEntry({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="entry-row">
      <div className="timeline-side">
        <div className="timeline-dot" />
        <div className="timeline-date">{str(data.duration)}</div>
        {data.current && <div style={{marginTop:"0.4rem"}}><span className="tag tag-green">Current</span></div>}
      </div>
      <div className="entry-body">
        <div className="entry-title">{str(data.position)}</div>
        <div className="entry-subtitle">{str(data.organization)}</div>
        {data.supervisor && <div className="entry-meta">Supervisor: {str(data.supervisor)}</div>}
        {arr(data.responsibilities).length > 0 && (
          <ul style={{marginTop:"0.5rem",display:"flex",flexDirection:"column",gap:"0.3rem"}}>
            {arr(data.responsibilities).map((r, i) => (
              <li key={i} style={{fontSize:"0.835rem",color:"var(--muted)",display:"flex",gap:"0.5rem"}}>
                <span style={{color:"var(--accent)",flexShrink:0}}>▸</span>{r}
              </li>
            ))}
          </ul>
        )}
        {arr(data.technologies).length > 0 && (
          <div className="entry-tags" style={{marginTop:"0.6rem"}}>
            {arr(data.technologies).map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}

function PubEntry({ data }: { data: Record<string, unknown> }) {
  const status = str(data.status);
  return (
    <div className="entry-row">
      <div className="timeline-side">
        <div className="timeline-dot" />
        <div className="timeline-date">{str(data.year)}</div>
        <div style={{marginTop:"0.4rem"}}>
          <span className={`tag ${status === "Accepted" ? "tag-green" : "tag-yellow"}`}>{status}</span>
        </div>
      </div>
      <div className="entry-body">
        <div className="entry-title">{str(data.title)}</div>
        <div className="entry-subtitle">{str(data.venue)}</div>
        <div className="entry-meta">{arr(data.authors).join(", ")}</div>
        {data.abstract && <div className="entry-desc" style={{marginTop:"0.4rem"}}>{str(data.abstract)}</div>}
        <div className="entry-tags" style={{marginTop:"0.5rem"}}>
          {arr(data.tags).map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
        {data.paper_url && (
          <div className="entry-links">
            <a href={str(data.paper_url)} target="_blank" rel="noopener" className="entry-link">View Paper ↗</a>
          </div>
        )}
        {data.doi && !data.paper_url && (
          <div className="entry-links">
            <a href={`https://doi.org/${str(data.doi)}`} target="_blank" rel="noopener" className="entry-link">View Paper ↗</a>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjEntry({ data }: { data: Record<string, unknown> }) {
  const emojis: Record<string, string> = { "Robotics": "🚁", "AI": "🤖", "IoT": "📡", "Signal Processing": "📊", "Machine Learning": "🧠", "Embedded Systems": "⚡" };
  const cats = arr(data.category);
  const emoji = cats.map(c => emojis[c]).find(Boolean) ?? "🔧";
  const imageUrl = data.image ? str(data.image) : null;
  return (
    <div className="proj-card">
      {imageUrl
        ? <img src={imageUrl} alt={str(data.title)} style={{width:"100%",aspectRatio:"16/9",objectFit:"cover",borderRadius:"8px",marginBottom:"0.5rem"}} />
        : <div className="proj-emoji">{emoji}</div>
      }
      <div className="entry-tags">
        {cats.map((c) => <span key={c} className="tag tag-purple">{c}</span>)}
      </div>
      <div className="proj-title">{str(data.title)}</div>
      <div className="proj-desc">{str(data.description)}</div>
      <div className="proj-tech">
        {arr(data.technologies).map((t) => <span key={t} className="tech-chip">{t}</span>)}
      </div>
      <div style={{display:"flex",gap:"0.5rem",marginTop:"0.25rem",flexWrap:"wrap"}}>
        {data.github && str(data.github) && <a href={str(data.github)} target="_blank" rel="noopener" className="entry-link">GitHub ↗</a>}
        {data.demo && str(data.demo) && <a href={str(data.demo)} target="_blank" rel="noopener" className="entry-link">Demo ↗</a>}
        {data.paper && str(data.paper) && <a href={str(data.paper)} target="_blank" rel="noopener" className="entry-link">Paper ↗</a>}
      </div>
      <div style={{fontSize:"0.72rem",color:"var(--muted2)",fontFamily:"var(--mono)",marginTop:"0.25rem"}}>{str(data.date)}</div>
    </div>
  );
}

function SkillsEntry({ entries }: { entries: Entry[] }) {
  const all = entries.map(e => e.data);
  const programming = all.find(d => d.programming) as any;
  if (!programming) return null;
  const d = programming;
  return (
    <div className="skills-grid">
      {d.programming && (
        <div className="skill-card">
          <div className="skill-card-title">Programming Languages</div>
          <div className="skill-bars">
            {d.programming.map((s: any) => (
              <div key={s.name} className="skill-row">
                <div className="skill-row-header">
                  <span className="skill-name">{s.icon} {s.name}</span>
                  <span className="skill-pct">{s.level}%</span>
                </div>
                <div className="skill-track"><div className="skill-fill" style={{width:`${s.level}%`}} /></div>
              </div>
            ))}
          </div>
        </div>
      )}
      {d.frameworks && (
        <div className="skill-card">
          <div className="skill-card-title">Frameworks & Libraries</div>
          <div className="skill-bars">
            {d.frameworks.map((s: any) => (
              <div key={s.name} className="skill-row">
                <div className="skill-row-header">
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-pct">{s.level}%</span>
                </div>
                <div className="skill-track"><div className="skill-fill" style={{width:`${s.level}%`}} /></div>
              </div>
            ))}
          </div>
        </div>
      )}
      {d.hardware && (
        <div className="skill-card">
          <div className="skill-card-title">Hardware Platforms</div>
          <div className="chip-cloud">{d.hardware.map((h: string) => <span key={h} className="chip">{h}</span>)}</div>
        </div>
      )}
      {d.software_tools && (
        <div className="skill-card">
          <div className="skill-card-title">Software & Tools</div>
          <div className="chip-cloud">{d.software_tools.map((t: any) => <span key={t.name} className="chip">{t.name}</span>)}</div>
        </div>
      )}
      {d.soft_skills && (
        <div className="skill-card">
          <div className="skill-card-title">Soft Skills</div>
          <div className="chip-cloud">{d.soft_skills.map((s: string) => <span key={s} className="chip">{s}</span>)}</div>
        </div>
      )}
      {d.languages && (
        <div className="skill-card">
          <div className="skill-card-title">Languages</div>
          <div className="skill-bars">
            {d.languages.map((l: any) => (
              <div key={l.name} className="skill-row">
                <div className="skill-row-header">
                  <span className="skill-name">{l.name}</span>
                  <span className="skill-pct">{l.level}</span>
                </div>
                <div className="skill-track"><div className="skill-fill" style={{width: l.level === "Native" ? "100%" : "88%"}} /></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AchEntry({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="entry-row">
      <div className="timeline-side">
        <div className="timeline-dot" />
        <div className="timeline-date">{str(data.year)}</div>
        {data.type && <div style={{marginTop:"0.3rem"}}><span className="tag">{str(data.type)}</span></div>}
      </div>
      <div className="entry-body">
        <div style={{fontSize:"1.2rem",marginBottom:"0.3rem"}}>{str(data.icon)}</div>
        <div className="entry-title">{str(data.title)}</div>
        <div className="entry-desc">{str(data.description)}</div>
      </div>
    </div>
  );
}

function GenericEntry({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="entry-row">
      <div className="timeline-side">
        <div className="timeline-dot" />
        <div className="timeline-date">{str(data.date ?? data.year ?? "")}</div>
      </div>
      <div className="entry-body">
        <div className="entry-title">{str(data.title ?? data.name ?? "")}</div>
        {data.subtitle && <div className="entry-subtitle">{str(data.subtitle)}</div>}
        {data.description && <div className="entry-desc">{str(data.description)}</div>}
        {data.link && (
          <div className="entry-links"><a href={str(data.link)} target="_blank" rel="noopener" className="entry-link">Learn more ↗</a></div>
        )}
      </div>
    </div>
  );
}

function renderSection(section: SectionWithEntries) {
  const { type, entries } = section;
  if (type === "skills") return <SkillsEntry entries={entries} />;
  if (type === "project") return <div className="card-grid">{entries.map(e => <ProjEntry key={e.id} data={e.data} />)}</div>;
  const isTimeline = ["education","experience","publication","achievement"].includes(type);
  return (
    <div className={isTimeline ? "entry-list" : "card-grid"}>
      {entries.map((e) => {
        if (type === "education") return <EduEntry key={e.id} data={e.data} />;
        if (type === "experience") return <ExpEntry key={e.id} data={e.data} />;
        if (type === "publication") return <PubEntry key={e.id} data={e.data} />;
        if (type === "achievement") return <AchEntry key={e.id} data={e.data} />;
        return <GenericEntry key={e.id} data={e.data} />;
      })}
    </div>
  );
}

const eyebrows: Record<string, string> = {
  education: "Academic Background", experience: "Work & Research",
  publication: "IEEE Research", project: "What I've Built",
  skills: "Technical Expertise", achievement: "Milestones",
};
const subtitles: Record<string, string> = {
  education: "Where I learned to think like an engineer and researcher.",
  experience: "Research and industry roles where I've applied my skills.",
  publication: "Peer-reviewed work at IEEE conferences.",
  project: "Engineering projects spanning robotics, AI, and communications.",
  skills: "Languages, frameworks, hardware and tools I work with.",
  achievement: "Key highlights from my academic and professional journey.",
};

export function PortfolioSections({ sections }: { sections: SectionWithEntries[] }) {
  return (
    <>
      {sections.map((s, i) => (
        <section key={s.id} id={s.slug} className="block" style={i % 2 === 0 ? {} : {background:"var(--bg2)"}}>
          <div className="container">
            <div className="section-eyebrow">{eyebrows[s.type] ?? s.title}</div>
            <h2 className="section-heading">{s.title}</h2>
            <p className="section-sub">{subtitles[s.type] ?? ""}</p>
            {s.entries.length > 0 ? renderSection(s) : (
              <p style={{color:"var(--muted2)",fontSize:"0.875rem"}}>No entries yet.</p>
            )}
          </div>
        </section>
      ))}
      <ContactSection />
    </>
  );
}
