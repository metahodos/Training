'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { cn } from '@/lib/utils';
import { Trophy, Medal, Plus, Minus, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeamScore {
    id: string;
    team_name: string;
    score: number;
    pillar_id: string; // Should match the current game or be 'global' if aggregated
}

interface LeaderboardProps {
    pillarId?: string; // If provided, filters by game/pillar
}

export function Leaderboard({ pillarId }: LeaderboardProps) {
    const [scores, setScores] = useState<TeamScore[]>([]);
    const [isFacilitator, setIsFacilitator] = useState(false);
    const supabase = createClient();

    // 1. Auth Check
    useEffect(() => {
        const checkRole = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();
                if (profile?.role === 'facilitator') setIsFacilitator(true);
            }
        };
        checkRole();
    }, []);

    // 2. Data Fetch & Subscribe
    useEffect(() => {
        const fetchScores = async () => {
            let query = supabase.from('team_scores').select('*').order('score', { ascending: false });
            if (pillarId) {
                query = query.eq('pillar_id', pillarId);
            }
            const { data } = await query;
            if (data) setScores(data);
        };

        fetchScores();

        const channel = supabase
            .channel('leaderboard_updates')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'team_scores',
                    ...(pillarId ? { filter: `pillar_id=eq.${pillarId}` } : {})
                },
                (payload) => {
                    fetchScores(); // Simple refresh on any change
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [pillarId]);

    // 3. Facilitator: Update Score
    const updateScore = async (id: string, currentScore: number, delta: number) => {
        await supabase
            .from('team_scores')
            .update({ score: currentScore + delta })
            .eq('id', id);
    };

    // 3b. Facilitator: Add Team (Simple implementation)
    const addTeam = async () => {
        const name = prompt("Nome del Team:");
        if (name) {
            await supabase.from('team_scores').insert({
                team_name: name,
                pillar_id: pillarId || 'global',
                score: 0
            });
        }
    };

    return (
        <div className="w-full space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                    {pillarId ? `Classifica: ${pillarId}` : 'Classifica Generale'}
                </span>
                {isFacilitator && (
                    <Button variant="ghost" size="sm" onClick={addTeam} className="h-6 text-[10px] text-blue-400 hover:text-blue-300">
                        + Add Team
                    </Button>
                )}
            </div>

            {/* List */}
            <div className="space-y-2">
                {scores.length === 0 && (
                    <div className="text-center py-8 text-neutral-600 italic">nessun team registrato</div>
                )}
                {scores.map((team, index) => (
                    <div key={team.id} className={cn(
                        "relative flex items-center justify-between p-3 rounded-lg border transition-colors group",
                        index === 0 && team.score > 0 ? "bg-gradient-to-r from-yellow-900/10 to-transparent border-yellow-500/30" : "bg-neutral-800/40 border-neutral-800/50 hover:bg-neutral-800/60"
                    )}>
                        {/* Rank Badge */}
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold",
                                index === 0 ? "bg-yellow-500 text-black shadow-[0_0_10px_rgba(234,179,8,0.5)]" :
                                    index === 1 ? "bg-neutral-400/20 text-neutral-400" :
                                        index === 2 ? "bg-amber-700/20 text-amber-600" :
                                            "bg-neutral-800 text-neutral-600"
                            )}>
                                {index === 0 && team.score > 0 ? <Crown className="w-3 h-3" /> : index + 1}
                            </div>
                            <span className={cn(
                                "font-semibold truncate max-w-[120px]",
                                index === 0 && team.score > 0 ? "text-yellow-400" : "text-neutral-300"
                            )}>{team.team_name}</span>
                        </div>

                        {/* Score & Controls */}
                        <div className="flex items-center gap-3">
                            {isFacilitator && (
                                <button onClick={() => updateScore(team.id, team.score, -1)} className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-neutral-700 rounded transition-opacity">
                                    <Minus className="w-3 h-3" />
                                </button>
                            )}

                            <div className="flex items-center gap-1">
                                <span className={cn(
                                    "font-mono text-lg font-bold w-10 text-center",
                                    index === 0 && team.score > 0 ? "text-yellow-400 text-xl" : "text-blue-400"
                                )}>{team.score}</span>
                                <span className="text-[10px] text-neutral-600 uppercase">pts</span>
                            </div>

                            {isFacilitator && (
                                <button onClick={() => updateScore(team.id, team.score, 1)} className="opacity-0 group-hover:opacity-100 p-1 text-green-500 hover:bg-neutral-700 rounded transition-opacity">
                                    <Plus className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
