-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profile table (single row)
create table if not exists profile (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null default 'Taha Mahmood',
  headline text default 'Electrical Engineering Student & AI Researcher',
  bio text default 'EE student at NUST Pakistan specializing in Communications. I build at the intersection of AI, wireless systems, and autonomous robotics.',
  email text default 'tahamahmood2903@gmail.com',
  phone text default '+92 324 857 5602',
  location text default 'Rawalpindi, Pakistan',
  linkedin_url text default 'https://linkedin.com/in/taha-mahmood',
  github_url text default 'https://github.com/taha-mahmood',
  resume_url text default '',
  avatar_url text default '',
  badge text default 'NUST · Class of 2027',
  stat_publications int default 3,
  stat_projects int default 5,
  stat_research text default '1+',
  stat_conferences int default 2,
  updated_at timestamptz default now()
);

-- Sections table
create table if not exists sections (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  type text not null default 'generic',
  position int not null default 0,
  visible boolean not null default true,
  created_at timestamptz default now()
);

-- Entries table
create table if not exists entries (
  id uuid primary key default uuid_generate_v4(),
  section_id uuid references sections(id) on delete cascade,
  data jsonb not null default '{}',
  position int not null default 0,
  created_at timestamptz default now()
);

-- Custom views (shareable links)
create table if not exists portfolio_views (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  label text not null,
  section_ids uuid[] not null default '{}',
  created_at timestamptz default now()
);

-- RLS Policies
alter table profile enable row level security;
alter table sections enable row level security;
alter table entries enable row level security;
alter table portfolio_views enable row level security;

-- Public can read everything
create policy "public read profile" on profile for select using (true);
create policy "public read sections" on sections for select using (true);
create policy "public read entries" on entries for select using (true);
create policy "public read views" on portfolio_views for select using (true);

-- Only authenticated (admin) can write
create policy "auth write profile" on profile for all using (auth.role() = 'authenticated');
create policy "auth write sections" on sections for all using (auth.role() = 'authenticated');
create policy "auth write entries" on entries for all using (auth.role() = 'authenticated');
create policy "auth write views" on portfolio_views for all using (auth.role() = 'authenticated');

-- Seed default profile
insert into profile (full_name, headline, bio, email, phone, location, linkedin_url, github_url, badge)
values (
  'Taha Mahmood',
  'Electrical Engineering Student & AI Researcher',
  'EE student at NUST Pakistan specializing in Communications. I build at the intersection of AI, wireless systems, and autonomous robotics — from UAV swarms to LEO satellite networks and signal processing research.',
  'tahamahmood2903@gmail.com',
  '+92 324 857 5602',
  'Rawalpindi, Pakistan',
  'https://linkedin.com/in/taha-mahmood',
  'https://github.com/taha-mahmood',
  'NUST · Class of 2027'
) on conflict do nothing;

-- Seed default sections
insert into sections (title, slug, type, position) values
  ('Education',     'education',     'education',     1),
  ('Experience',    'experience',    'experience',    2),
  ('Publications',  'publications',  'publication',   3),
  ('Projects',      'projects',      'project',       4),
  ('Skills',        'skills',        'skills',        5),
  ('Achievements',  'achievements',  'achievement',   6)
on conflict (slug) do nothing;
