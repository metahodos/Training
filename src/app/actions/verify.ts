'use server'

import { createClient } from '@/utils/supabase/server';
import { getModuleProgress } from '@/app/actions/progress';

export async function runSystemVerification() {
    const logs: string[] = [];
    const log = (msg: string) => logs.push(`[${new Date().toISOString().split('T')[1].split('.')[0]}] ${msg}`);

    log('Starting System Verification...');

    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            log('ERROR: Auth Check Failed. User not logged in or Supabase client misconfigured.');
            if (authError) log(`Auth Error: ${authError.message}`);
            return logs;
        }
        log(`SUCCESS: Authenticated as user ${user.id.slice(0, 8)}...`);

        // Check Module 101
        log('Checking Module 101 Access...');
        const progress = await getModuleProgress('101');

        if (progress) {
            log(`SUCCESS: Found progress for Module 101.`);
            log(`- Status: ${progress.theory_completed ? 'Theory Done' : 'Theory Pending'}`);
            log(`- Current Step: ${progress.current_step || 'N/A (Column might be missing if migration failed)'}`);
        } else {
            log('INFO: No progress record found for Module 101 (This is normal for new users).');
        }

        // Check Module 102 Access (Unlock Check)
        log('Checking Module 102 Access (Unlock Flow)...');
        const progress102 = await getModuleProgress('102');
        if (progress102) {
            log(`SUCCESS: Found progress for Module 102.`);
            log(`- Module 102 Status: Unlocked (Record exists)`);
        } else {
            log('INFO: Module 102 not started/unlocked yet.');
        }

        // Check Config
        log('Verifying Environment...');
        log(`- NEXT_PUBLIC_SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Defined' : 'MISSING'}`);
        log(`- SUPABASE_SERVICE_ROLE_KEY: ${process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Defined (Admin Actions Enabled)' : 'MISSING (Restricted to Client)'}`);

        log('Verification Complete.');

    } catch (e) {
        log(`CRITICAL ERROR: ${(e as Error).message}`);
    }

    return logs;
}
