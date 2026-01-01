-- Modules Table
create table if not exists public.modules (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  pillar text, -- QuickWorks Pillar
  day integer not null, -- 1, 2, or 3
  role_access text default 'ALL', -- 'ALL', 'SM', 'PO'
  sort_order integer not null,
  created_at timestamptz default timezone('utc', now())
);

-- Lessons Table
create table if not exists public.lessons (
  id uuid default uuid_generate_v4() primary key,
  module_id uuid references public.modules(id) on delete cascade not null,
  title text not null,
  content_markdown text, -- The lesson content
  sort_order integer not null,
  created_at timestamptz default timezone('utc', now())
);

-- Quizzes Table (One per module)
create table if not exists public.quizzes (
  id uuid default uuid_generate_v4() primary key,
  module_id uuid references public.modules(id) on delete cascade not null,
  questions_json jsonb not null, -- Array of {question, options, correctIndex}
  created_at timestamptz default timezone('utc', now())
);

-- Lesson Completions (Tracking which lessons are done)
create table if not exists public.lesson_completions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  completed_at timestamptz default timezone('utc', now()),
  unique(user_id, lesson_id)
);

-- Quiz Results (Tracking scores)
create table if not exists public.quiz_results (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  quiz_id uuid references public.quizzes(id) on delete cascade not null,
  score integer not null,
  attempt_number integer default 1,
  passed boolean default false,
  created_at timestamptz default timezone('utc', now())
);

-- Badges
create table if not exists public.badges (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  badge_name text not null,
  achieved_at timestamptz default timezone('utc', now())
);

-- Enable RLS
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.quizzes enable row level security;
alter table public.lesson_completions enable row level security;
alter table public.quiz_results enable row level security;
alter table public.badges enable row level security;

-- Policies (Simple public read for content, user write for progress)
create policy "Modules are viewable by everyone" on public.modules for select using (true);
create policy "Lessons are viewable by everyone" on public.lessons for select using (true);
create policy "Quizzes are viewable by everyone" on public.quizzes for select using (true);

create policy "Users can insert own lesson completion" on public.lesson_completions for insert with check (auth.uid() = user_id);
create policy "Users can view own lesson completion" on public.lesson_completions for select using (auth.uid() = user_id);

create policy "Users can insert own quiz results" on public.quiz_results for insert with check (auth.uid() = user_id);
create policy "Users can view own quiz results" on public.quiz_results for select using (auth.uid() = user_id);
create policy "Users can update own quiz results" on public.quiz_results for update using (auth.uid() = user_id);

create policy "Users can view own badges" on public.badges for select using (auth.uid() = user_id);
