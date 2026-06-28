export type Profile = {
  id: string;
  full_name: string;
  headline: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  resume_url: string | null;
  avatar_url: string | null;
  badge: string | null;
  stat_publications: number;
  stat_projects: number;
  stat_research: string;
  stat_conferences: number;
};

export type Section = {
  id: string;
  title: string;
  slug: string;
  type: string;
  position: number;
  visible: boolean;
};

export type Entry = {
  id: string;
  section_id: string;
  data: Record<string, unknown>;
  position: number;
};

export type PortfolioView = {
  id: string;
  slug: string;
  label: string;
  section_ids: string[];
};
