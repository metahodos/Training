import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export type TeamStatus = 'IDLE' | 'WORKING' | 'COMPLETED';

export function useTeamLogic() {
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    const createTeam = async (name: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('teams')
            .insert({ name, status: 'IDLE' })
            .select()
            .single();
        setLoading(false);
        return { data, error };
    };

    const setGlobalTeamStatus = async (status: TeamStatus) => {
        setLoading(true);
        // Update all teams created in the last 24 hours to the new status
        // This is a simplification for the prototype to avoid complex session management for now
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const { error } = await supabase
            .from('teams')
            .update({ status })
            .gt('created_at', since);

        setLoading(false);
        return { error };
    };

    return { createTeam, setGlobalTeamStatus, loading };
}
