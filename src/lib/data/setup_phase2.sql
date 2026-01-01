-- PHASE 2 SETUP SCRIPT
-- Run this in Supabase SQL Editor

-- 1. Create global_config table (for Timer)
CREATE TABLE IF NOT EXISTS global_config (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE global_config ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read the timer
DROP POLICY IF EXISTS "Public Read Global Config" ON global_config;
CREATE POLICY "Public Read Global Config" ON global_config FOR SELECT USING (true);

-- Policy: Only Facilitator can update
DROP POLICY IF EXISTS "Facilitator Update Global Config" ON global_config;
CREATE POLICY "Facilitator Update Global Config" ON global_config FOR UPDATE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'facilitator'
) WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'facilitator'
);

-- Insert default timer config if not exists
INSERT INTO global_config (key, value)
VALUES (
    'main_timer', 
    '{"startTime": null, "pausedAt": null, "duration": 600, "status": "idle"}'::jsonb
) ON CONFLICT (key) DO NOTHING;


-- 2. Create team_scores table (for Leaderboard)
CREATE TABLE IF NOT EXISTS team_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_name TEXT NOT NULL,
    pillar_id TEXT NOT NULL,
    score INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE team_scores ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read scores
DROP POLICY IF EXISTS "Public Read Team Scores" ON team_scores;
CREATE POLICY "Public Read Team Scores" ON team_scores FOR SELECT USING (true);

-- Policy: Facilitator can do everything on scores
DROP POLICY IF EXISTS "Facilitator Manage Team Scores" ON team_scores;
CREATE POLICY "Facilitator Manage Team Scores" ON team_scores FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'facilitator'
);


-- 3. Update profiles table (Add role)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'role') THEN
        ALTER TABLE profiles ADD COLUMN role TEXT DEFAULT 'user';
    END IF;
END $$;

-- Policy Fix: Allow users to read their own profile (crucial for role check)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);

-- 4. Create game_results table (for Game Session Data)
CREATE TABLE IF NOT EXISTS game_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_id TEXT NOT NULL,
    team_name TEXT NOT NULL,
    iteration INTEGER DEFAULT 1,
    metric_value INTEGER DEFAULT 0, -- e.g. Height in cm
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE game_results ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read results (for Leaderboard)
DROP POLICY IF EXISTS "Public Read Game Results" ON game_results;
CREATE POLICY "Public Read Game Results" ON game_results FOR SELECT USING (true);

-- Policy: Authenticated users can insert results (Teams submitting data)
DROP POLICY IF EXISTS "Users Insert Game Results" ON game_results;
CREATE POLICY "Users Insert Game Results" ON game_results FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 5. Storage Policies (Assuming 'game_uploads' bucket exists or will be created)
-- Note: Bucket creation usually requires dashboard or specific RPC, skipping here but defining policy if bucket exists.
-- We will handle bucket creation/checking in the frontend or manual instruction if needed.

