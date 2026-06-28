"use client";
import { deleteSection } from "@/lib/actions/admin";

export function DeleteSectionButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm("Delete this section and all its entries?")) return;
    await deleteSection(id);
  }
  return (
    <button onClick={handleDelete} className="btn-admin btn-danger">✕</button>
  );
}
