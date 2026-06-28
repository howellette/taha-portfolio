import { createClient } from "@/lib/supabase/server";
import { getEntries } from "@/lib/data/portfolio";
import { EntryManager } from "@/components/admin/entry-manager";

export default async function SectionEntriesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: section } = await supabase.from("sections").select("*").eq("id", id).single();
  const entries = await getEntries(id);

  if (!section) return <div>Section not found.</div>;

  return (
    <div>
      <div className="admin-title">{section.title} — Entries</div>
      <p style={{fontSize:"0.82rem",color:"var(--muted)",marginBottom:"1.25rem"}}>Type: <strong>{section.type}</strong></p>
      <EntryManager sectionId={id} sectionType={section.type} entries={entries} />
    </div>
  );
}
