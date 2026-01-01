-- Migration for Scoring System & Badges

-- 1. Add detailed scoring columns to user_progress
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS quiz_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS quiz_attempts INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS simulation_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS mastery_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_module_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS badge_awarded BOOLEAN DEFAULT FALSE;

-- 2. Add module_id to scenarios if not exists (for linking)
-- Check if column exists, if not add it.
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'scenarios' AND column_name = 'module_id') THEN
        ALTER TABLE scenarios ADD COLUMN module_id TEXT;
    END IF;
END $$;

-- 3. Create user_badges table if it doesn't exist (it seemed to exist in types, but making sure)
CREATE TABLE IF NOT EXISTS user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    module_id TEXT NOT NULL,
    badge_type VARCHAR(50) NOT NULL, -- e.g. 'GOLD', 'SILVER', 'BRONZE'
    score INTEGER NOT NULL,
    awarded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB
);

-- 4. RLS Policies (Ensure users can read their own badges)
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own badges" 
ON user_badges FOR SELECT 
USING (auth.uid() = user_id);
