
import { createClient } from '@/utils/supabase/server';

export type UserLevel = 'Apprendista' | 'Capo Reparto' | 'Value Stream Architect' | 'Master of Flow';

export const LEVEL_THRESHOLDS: Record<UserLevel, number> = {
    'Apprendista': 0,
    'Capo Reparto': 1000,
    'Value Stream Architect': 5000,
    'Master of Flow': 10000
};

export interface BadgeDefinition {
    id: string;
    name: string;
    description: string;
    condition: (stats: any) => boolean;
}

export const BADGES: BadgeDefinition[] = [
    {
        id: 'gemba_walker',
        name: 'Gemba Walker',
        description: 'Hai completato la prima simulazione industriale andando in linea (Gemba).',
        condition: (stats) => stats.simulations_count >= 1
    },
    {
        id: 'obeya_guardian',
        name: 'Obeya Guardian',
        description: 'Hai risolto un conflitto difficile usando i dati visuali.',
        condition: (stats) => stats.conflicts_resolved >= 1 // Placeholder logic
    },
    {
        id: 'wip_slayer',
        name: 'WIP Slayer',
        description: 'Hai ridotto il Work In Progress limitando il flusso.',
        condition: (stats) => stats.wip_optimization === true
    }
];

export async function calculateLevel(xp: number): Promise<UserLevel> {
    if (xp >= LEVEL_THRESHOLDS['Master of Flow']) return 'Master of Flow';
    if (xp >= LEVEL_THRESHOLDS['Value Stream Architect']) return 'Value Stream Architect';
    if (xp >= LEVEL_THRESHOLDS['Capo Reparto']) return 'Capo Reparto';
    return 'Apprendista';
}

export async function awardXP(userId: string, xpAmount: number) {
    const supabase = await createClient();

    // Get current profile
    const { data: profile } = await supabase.from('profiles').select('total_xp, level').eq('id', userId).single();
    if (!profile) return;

    const newXP = (profile.total_xp || 0) + xpAmount;
    const newLevel = await calculateLevel(newXP);

    // Update profile
    await supabase.from('profiles').update({
        total_xp: newXP,
        level: newLevel
    }).eq('id', userId);

    return {
        newXP,
        newLevel,
        levelUp: newLevel !== profile.level
    };
}

export async function checkBadges(userId: string, sessionStats: any) {
    const supabase = await createClient();
    const newBadges: string[] = [];

    // Fetch existing badges
    const { data: existingBadges } = await supabase
        .from('user_badges')
        .select('badge_type')
        .eq('user_id', userId);

    const ownedBadgeTypes = new Set(existingBadges?.map(b => b.badge_type) || []);

    for (const badge of BADGES) {
        if (!ownedBadgeTypes.has(badge.id) && badge.condition(sessionStats)) {
            // Award Badge
            await supabase.from('user_badges').insert({
                user_id: userId,
                badge_type: badge.id
            });
            newBadges.push(badge.name);
        }
    }

    return newBadges;
}
