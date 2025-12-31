import { ReactNode } from 'react';
import { createClient } from '@/utils/supabase/server';
import { AppSidebar, ModuleStatus } from '@/components/AppSidebar';


export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 0. Fetch All Modules (for Sidebar)
    const { data: dbModules } = await supabase.from('modules').select('id, title').order('id');

    const modulesList = dbModules || [];

    let userProfile = { name: 'Ospite', level: 'Apprendista', xp: 0, nextLevelXp: 1000 };
    const moduleStatuses: Record<string, ModuleStatus> = {};

    if (user) {
        // 1. Fetch Profile
        const { data: profile } = await supabase.from('profiles').select('username, level, total_xp').eq('id', user.id).single();
        if (profile) {
            userProfile = {
                name: profile.username || user.email?.split('@')[0] || 'Utente',
                level: profile.level || 'Apprendista',
                xp: profile.total_xp || 0,
                nextLevelXp: 1000 // Placeholder logic
            };
        }

        // 2. Fetch User Progress
        const { data: progressData } = await supabase.from('user_progress').select('*').eq('user_id', user.id);

        // 3. Compute Statuses (Locked/Unlocked dependency logic)
        // Map existing progress
        const progressMap = new Map(progressData?.map(p => [p.module_id, p]) || []);

        modulesList.forEach((module, index) => {
            const progress = progressMap.get(module.id);
            const prevModule = index > 0 ? modulesList[index - 1] : null;
            const prevProgress = prevModule ? progressMap.get(prevModule.id) : null;

            let status: 'locked' | 'in_progress' | 'completed' = 'locked';

            if (progress?.simulation_completed) {
                status = 'completed';
            } else if (index === 0 || (prevProgress && prevProgress.simulation_completed)) {
                // Unlocked if it's the first module OR previous is completed
                status = 'in_progress';
            }

            moduleStatuses[module.id] = {
                moduleId: module.id,
                status,
                currentStep: progress?.current_step || 'theory'
            };
        });
    } else {
        // Guest Mode - Unlock first only
        modulesList.forEach((m, i) => {
            moduleStatuses[m.id] = {
                moduleId: m.id,
                status: i === 0 ? 'in_progress' : 'locked',
                currentStep: 'theory'
            }
        });
    }

    return (
        <div className="flex min-h-screen bg-neutral-950">
            <AppSidebar userProfile={userProfile} moduleStatuses={moduleStatuses} modules={modulesList} />
            <div className="flex-1 lg:pl-72 w-full">
                {children}
            </div>
        </div>
    );
}
