'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Bot, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4">
      <div className="mb-12 text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          Agile Pro Coach
        </h1>
        <p className="text-neutral-400 text-sm md:text-base uppercase tracking-widest">
          Scegli il tuo percorso formativo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Card 1: Simulazioni AI */}
        <Link href="/modules/102" className="group">
          <Card className="h-full bg-neutral-900 border-neutral-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)]">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Bot className="w-6 h-6 text-blue-400" />
              </div>
              <CardTitle className="text-2xl text-white group-hover:text-blue-400 transition-colors">
                Simulazioni AI
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Affronta scenari realistici con coach virtuali, quiz e percorsi di apprendimento individuali.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs font-mono text-blue-500/80 uppercase tracking-wider">
                Percorso Individuale
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Card 2: Formazione Esperienziale */}
        <Link href="/experiential" className="group">
          <Card className="h-full bg-neutral-900 border-neutral-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.2)]">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <CardTitle className="text-2xl text-white group-hover:text-green-400 transition-colors">
                Formazione Esperienziale
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Attività di team, leaderboard in tempo reale e giochi interattivi (Marshmallow, Puzzle, Lego).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs font-mono text-green-500/80 uppercase tracking-wider">
                Percorso di Team
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
