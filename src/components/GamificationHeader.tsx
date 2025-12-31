
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Medal } from 'lucide-react';
import { LEVEL_THRESHOLDS, UserLevel } from '@/lib/gamification';

interface GamificationHeaderProps {
    totalXP: number;
    level: UserLevel;
    badges: string[]; // Badge types/names
}

export function GamificationHeader({ totalXP, level, badges }: GamificationHeaderProps) {
    const nextLevelXP = LEVEL_THRESHOLDS['Master of Flow']; // Simplification
    // Determine next level threshold dynamically could be better, but fixed for now
    let nextThreshold = 1000;
    if (level === 'Apprendista') nextThreshold = 1000;
    else if (level === 'Capo Reparto') nextThreshold = 5000;
    else if (level === 'Value Stream Architect') nextThreshold = 10000;
    else nextThreshold = totalXP; // Max level

    const progress = Math.min((totalXP / nextThreshold) * 100, 100);

    return (
        <Card className="bg-gradient-to-r from-neutral-900 to-neutral-800 border-neutral-700 mb-8">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* User Level */}
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-yellow-500/10 rounded-full border border-yellow-500/50 relative">
                            <Trophy className="text-yellow-500 w-8 h-8" />
                            <div className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {level}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Il Tuo Profilo</h2>
                            <p className="text-gray-400 text-sm">Industrial Agile Coach</p>
                        </div>
                    </div>

                    {/* XP Progress */}
                    <div className="flex-1 w-full max-w-md space-y-2">
                        <div className="flex justify-between text-xs font-mono text-gray-400">
                            <span>XP: {totalXP}</span>
                            <span>Next Level: {nextThreshold}</span>
                        </div>
                        <Progress value={progress} className="h-3 bg-neutral-800" /> {/* Need to verify if Progress accepts className for color */}
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2">
                        {badges.length > 0 ? badges.map((badge, i) => (
                            <Badge key={i} variant="outline" className="border-green-500/50 text-green-400 gap-1 py-1">
                                <Medal size={12} />
                                {badge}
                            </Badge>
                        )) : (
                            <span className="text-xs text-gray-500 italic flex items-center gap-1">
                                <Star size={12} /> Nessun badge ancora
                            </span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
