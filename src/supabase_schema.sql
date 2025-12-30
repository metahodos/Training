-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  username text,
  role_preference text check (role_preference in ('SM', 'PO')),
  xp_points integer default 0,
  created_at timestamptz default timezone('utc', now())
);

-- Create scenarios table
create table if not exists public.scenarios (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  role_target text check (role_target in ('SM', 'PO')),
  difficulty text check (difficulty in ('Junior', 'Mid', 'Senior')),
  initial_context text,
  created_at timestamptz default timezone('utc', now())
);

-- Create user_attempts table
create table if not exists public.user_attempts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  scenario_id uuid references public.scenarios(id) not null,
  score integer check (score >= 0 and score <= 100),
  ai_feedback jsonb,
  chat_transcript jsonb,
  created_at timestamptz default timezone('utc', now())
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.scenarios enable row level security;
alter table public.user_attempts enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Scenarios are viewable by everyone" on public.scenarios for select using (true);

create policy "Users can insert their own attempts" on public.user_attempts for insert with check (auth.uid() = user_id);
create policy "Users can view their own attempts" on public.user_attempts for select using (auth.uid() = user_id);
