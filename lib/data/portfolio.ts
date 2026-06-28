import { createClient } from "@/lib/supabase/server";
import type { Profile, Section, Entry, PortfolioView } from "@/lib/types";

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("profile").select("*").single();
  return data;
}

export async function getSections(): Promise<Section[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sections")
    .select("*")
    .eq("visible", true)
    .order("position");
  return data ?? [];
}

export async function getAllSections(): Promise<Section[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("sections").select("*").order("position");
  return data ?? [];
}

export async function getEntries(sectionId: string): Promise<Entry[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("entries")
    .select("*")
    .eq("section_id", sectionId)
    .order("position");
  return data ?? [];
}

export async function getPortfolioView(slug: string): Promise<PortfolioView | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("portfolio_views").select("*").eq("slug", slug).single();
  return data;
}

export async function getAllViews(): Promise<PortfolioView[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("portfolio_views").select("*").order("created_at");
  return data ?? [];
}
