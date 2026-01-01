'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Timer, Users, Trophy } from 'lucide-react';
import { SyncTimer } from '@/components/SyncTimer';
import { Leaderboard } from '@/components/Leaderboard';

export default function ExperientialDashboard() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white p-8">
            <header className="mb-12">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
                    Formazione Esperienziale
                </h1>
                <p className="text-neutral-400">
                    QuickWorks Framework • Team Building & Problem Solving
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Timer & Controls (Placeholder) */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-neutral-900 border-neutral-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <Timer className="w-5 h-5 text-green-400" />
                                Global Timer
                            </CardTitle>
                            <CardDescription>Sincronizzato con la Obeya Room</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-40 flex items-center justify-center bg-neutral-950/50 rounded-lg border border-neutral-800">
                                <SyncTimer isFacilitator={false} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Six Pillars Placeholders */}
                        {[
                            { id: 'marshmallow', label: 'Marshmallow Challenge' },
                            { id: 'puzzle', label: 'Puzzle Game' },
                            { id: 'lego', label: 'Lego Flow' },
                            { id: 'kanban', label: 'Kanban Game' },
                            { id: 'airplanes', label: 'Paper Airplanes' }
                        ].map((game, i) => (
                            <Link href={`/experiential/${game.id}`} key={game.id}>
                                <Card className="bg-neutral-900 border-neutral-800 opacity-80 hover:opacity-100 transition-all cursor-pointer hover:border-blue-500/30">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg text-white">{game.label}</CardTitle>
                                            <Badge variant="outline" className="text-[10px] border-neutral-700 text-neutral-400">{i + 1}</Badge>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Column: Leaderboard (Placeholder) */}
                <div className="space-y-6">
                    <Card className="bg-neutral-900 border-neutral-800 h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <Trophy className="w-5 h-5 text-yellow-500" />
                                Leaderboard
                            </CardTitle>
                            <CardDescription>Classifica Real-time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Leaderboard pillarId="global" />
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
