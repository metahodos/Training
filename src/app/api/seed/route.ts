import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { INITIAL_SCENARIOS } from '@/lib/data/scenarios';

export async function POST() {
    try {
        // Use Service Role Key for Admin Access (Seeding)
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // Check if scenarios exist
        const { count } = await supabase.from('scenarios').select('*', { count: 'exact', head: true });

        if (count && count > 0) {
            return NextResponse.json({ message: 'Scenarios already exist', count });
        }

        // Insert scenarios
        const { data, error } = await supabase.from('scenarios').insert(INITIAL_SCENARIOS).select();

        if (error) throw error;

        return NextResponse.json({ message: 'Seeding successful', data });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
