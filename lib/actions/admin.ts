"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const fields: Record<string, unknown> = {};
  for (const [key, val] of formData.entries()) fields[key] = val;
  const { data: existing } = await supabase.from("profile").select("id").single();
  if (existing) {
    await supabase.from("profile").update({ ...fields, updated_at: new Date().toISOString() }).eq("id", existing.id);
  } else {
    await supabase.from("profile").insert(fields);
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createSection(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const type = formData.get("type") as string;
  const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const { data: last } = await supabase.from("sections").select("position").order("position", { ascending: false }).limit(1).single();
  await supabase.from("sections").insert({ title, slug, type, position: (last?.position ?? 0) + 1 });
  revalidatePath("/admin/sections");
  revalidatePath("/");
}

export async function updateSection(id: string, formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const visible = formData.get("visible") === "true";
  await supabase.from("sections").update({ title, visible }).eq("id", id);
  revalidatePath("/admin/sections");
  revalidatePath("/");
}

export async function deleteSection(id: string) {
  const supabase = await createClient();
  await supabase.from("sections").delete().eq("id", id);
  revalidatePath("/admin/sections");
  revalidatePath("/");
}

export async function moveSectionUp(id: string, currentPos: number) {
  const supabase = await createClient();
  const { data: above } = await supabase.from("sections").select("id, position").lt("position", currentPos).order("position", { ascending: false }).limit(1).single();
  if (above) {
    await supabase.from("sections").update({ position: above.position }).eq("id", id);
    await supabase.from("sections").update({ position: currentPos }).eq("id", above.id);
  }
  revalidatePath("/admin/sections");
  revalidatePath("/");
}

export async function moveSectionDown(id: string, currentPos: number) {
  const supabase = await createClient();
  const { data: below } = await supabase.from("sections").select("id, position").gt("position", currentPos).order("position").limit(1).single();
  if (below) {
    await supabase.from("sections").update({ position: below.position }).eq("id", id);
    await supabase.from("sections").update({ position: currentPos }).eq("id", below.id);
  }
  revalidatePath("/admin/sections");
  revalidatePath("/");
}

export async function createEntry(sectionId: string, data: Record<string, unknown>) {
  const supabase = await createClient();
  const { data: last } = await supabase.from("entries").select("position").eq("section_id", sectionId).order("position", { ascending: false }).limit(1).single();
  await supabase.from("entries").insert({ section_id: sectionId, data, position: (last?.position ?? 0) + 1 });
  revalidatePath(`/admin/sections/${sectionId}`);
  revalidatePath("/");
}

export async function updateEntry(id: string, sectionId: string, data: Record<string, unknown>) {
  const supabase = await createClient();
  await supabase.from("entries").update({ data }).eq("id", id);
  revalidatePath(`/admin/sections/${sectionId}`);
  revalidatePath("/");
}

export async function deleteEntry(id: string, sectionId: string) {
  const supabase = await createClient();
  await supabase.from("entries").delete().eq("id", id);
  revalidatePath(`/admin/sections/${sectionId}`);
  revalidatePath("/");
}

export async function createView(formData: FormData) {
  const supabase = await createClient();
  const label = formData.get("label") as string;
  const slug = label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const sectionIds = formData.getAll("section_ids") as string[];
  await supabase.from("portfolio_views").insert({ label, slug, section_ids: sectionIds });
  revalidatePath("/admin/views");
}

export async function deleteView(id: string) {
  const supabase = await createClient();
  await supabase.from("portfolio_views").delete().eq("id", id);
  revalidatePath("/admin/views");
}
