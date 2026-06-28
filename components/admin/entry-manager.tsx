"use client";
import { useState } from "react";
import { createEntry, updateEntry, deleteEntry } from "@/lib/actions/admin";
import type { Entry } from "@/lib/types";

const FIELDS: Record<string, { key: string; label: string; type?: string; multiline?: boolean }[]> = {
  education: [
    { key: "degree", label: "Degree" },
    { key: "institution", label: "Institution" },
    { key: "location", label: "Location" },
    { key: "duration", label: "Duration (e.g. 2023 – 2027)" },
    { key: "specialization", label: "Specialization" },
    { key: "description", label: "Description", multiline: true },
    { key: "current", label: "Currently Enrolled? (true/false)" },
  ],
  experience: [
    { key: "position", label: "Position / Role" },
    { key: "organization", label: "Organization" },
    { key: "duration", label: "Duration" },
    { key: "supervisor", label: "Supervisor (optional)" },
    { key: "type", label: "Type (Research/Industry)" },
    { key: "responsibilities", label: "Responsibilities (one per line)", multiline: true },
    { key: "technologies", label: "Technologies (comma separated)" },
    { key: "current", label: "Currently working here? (true/false)" },
  ],
  publication: [
    { key: "title", label: "Paper Title" },
    { key: "authors", label: "Authors (comma separated)" },
    { key: "venue", label: "Venue / Conference" },
    { key: "year", label: "Year" },
    { key: "status", label: "Status (Accepted / Under Review)" },
    { key: "abstract", label: "Abstract", multiline: true },
    { key: "tags", label: "Tags (comma separated)" },
    { key: "doi", label: "DOI (optional)" },
    { key: "paper_url", label: "Paper URL (optional)" },
  ],
  project: [
    { key: "title", label: "Project Title" },
    { key: "description", label: "Description", multiline: true },
    { key: "category", label: "Categories (comma separated)" },
    { key: "technologies", label: "Technologies (comma separated)" },
    { key: "date", label: "Date" },
    { key: "image", label: "Image URL (upload to Supabase Storage and paste URL here)" },
    { key: "github", label: "GitHub URL (optional)" },
    { key: "demo", label: "Demo URL (optional)" },
    { key: "paper", label: "Paper URL (optional)" },
  ],
  achievement: [
    { key: "title", label: "Title" },
    { key: "description", label: "Description", multiline: true },
    { key: "year", label: "Year" },
    { key: "type", label: "Type (Publication/Research/Experience)" },
    { key: "icon", label: "Emoji Icon (e.g. 🏆)" },
  ],
  generic: [
    { key: "title", label: "Title" },
    { key: "subtitle", label: "Subtitle (optional)" },
    { key: "description", label: "Description", multiline: true },
    { key: "date", label: "Date" },
    { key: "link", label: "Link URL (optional)" },
  ],
};

function parseVal(key: string, val: string, type: string): unknown {
  const csvFields: Record<string, string[]> = {
    experience: ["technologies"],
    publication: ["authors", "tags"],
    project: ["category", "technologies"],
  };
  const listFields: Record<string, string[]> = { experience: ["responsibilities"] };
  if (csvFields[type]?.includes(key)) return val.split(",").map((s) => s.trim()).filter(Boolean);
  if (listFields[type]?.includes(key)) return val.split("\n").map((s) => s.trim()).filter(Boolean);
  if (val === "true") return true;
  if (val === "false") return false;
  return val;
}

function getDisplayVal(key: string, val: unknown): string {
  if (Array.isArray(val)) return val.join(key === "responsibilities" ? "\n" : ", ");
  return String(val ?? "");
}

export function EntryManager({ sectionId, sectionType, entries }: { sectionId: string; sectionType: string; entries: Entry[] }) {
  const fields = FIELDS[sectionType] ?? FIELDS.generic;
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});

  function initForm(data?: Record<string, unknown>) {
    const init: Record<string, string> = {};
    fields.forEach((f) => { init[f.key] = data ? getDisplayVal(f.key, data[f.key]) : ""; });
    setForm(init);
  }

  function buildData(): Record<string, unknown> {
    const data: Record<string, unknown> = {};
    fields.forEach((f) => { data[f.key] = parseVal(f.key, form[f.key] ?? "", sectionType); });
    return data;
  }

  async function handleAdd() {
    await createEntry(sectionId, buildData());
    setAdding(false);
    setForm({});
  }

  async function handleEdit(id: string) {
    await updateEntry(id, sectionId, buildData());
    setEditId(null);
    setForm({});
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this entry?")) return;
    await deleteEntry(id, sectionId);
  }

  const getTitle = (data: Record<string, unknown>) =>
    String(data.title ?? data.degree ?? data.position ?? data.hackathon ?? "Entry");

  return (
    <div>
      {/* Existing entries */}
      {entries.map((entry) => (
        <div key={entry.id} className="admin-entry-item">
          {editId === entry.id ? (
            <div>
              {fields.map((f) => (
                <div key={f.key} className="admin-field">
                  <label className="admin-label">{f.label}</label>
                  {f.multiline
                    ? <textarea className="admin-textarea" value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
                    : <input className="admin-input" value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />}
                </div>
              ))}
              <div className="btn-row">
                <button className="btn-admin btn-save" onClick={() => handleEdit(entry.id)}>Save</button>
                <button className="btn-admin btn-secondary" onClick={() => setEditId(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
              <div>
                <div className="admin-entry-title">{getTitle(entry.data)}</div>
                <div className="admin-entry-sub">{String(entry.data.venue ?? entry.data.organization ?? entry.data.institution ?? entry.data.description ?? "").slice(0, 80)}</div>
              </div>
              <div className="btn-row">
                <button className="btn-admin btn-secondary" onClick={() => { setEditId(entry.id); initForm(entry.data); }}>✏ Edit</button>
                <button className="btn-admin btn-danger" onClick={() => handleDelete(entry.id)}>✕</button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add new entry form */}
      {adding ? (
        <div className="admin-card">
          <div style={{ fontWeight: 600, marginBottom: "0.85rem" }}>New Entry</div>
          {fields.map((f) => (
            <div key={f.key} className="admin-field">
              <label className="admin-label">{f.label}</label>
              {f.multiline
                ? <textarea className="admin-textarea" value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
                : <input className="admin-input" value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />}
            </div>
          ))}
          <div className="btn-row">
            <button className="btn-admin btn-save" onClick={handleAdd}>Add Entry</button>
            <button className="btn-admin btn-secondary" onClick={() => { setAdding(false); setForm({}); }}>Cancel</button>
          </div>
        </div>
      ) : (
        <button className="btn-admin btn-save" onClick={() => { setAdding(true); initForm(); }} style={{ marginTop: "0.5rem" }}>
          + Add Entry
        </button>
      )}
    </div>
  );
}
