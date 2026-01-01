-- Create Teams Table
create table if not exists teams (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  status text check (status in ('IDLE', 'WORKING', 'COMPLETED')) default 'IDLE',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table teams enable row level security;

-- Policy: Everyone can read
create policy "Teams are viewable by everyone"
  on teams for select
  using ( true );

-- Policy: Only Facilitators can insert
create policy "Teams are insertable by facilitators"
  on teams for insert
  with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'facilitator'
    )
  );

-- Policy: Only Facilitators can update
create policy "Teams are updatable by facilitators"
  on teams for update
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'facilitator'
    )
  );
