import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { createClient } from '@/utils/supabase/server';
import { INITIAL_SCENARIOS } from '@/lib/data/scenarios'; // Fallback
import { THEORY_MODULES } from '@/lib/data/theory';
import { GamificationHeader } from '@/components/GamificationHeader';
import { UserLevel } from '@/lib/gamification';
import { BookOpen, BrainCircuit, PlayCircle } from 'lucide-react';

export default async function Home() {
  const supabase = await createClient();
  let scenarios = [];
  let userProfile = { total_xp: 0, level: 'Apprendista' as UserLevel, badges: [] as string[] };

  try {
    // Fetch Scenarios
    const { data: scenariosData } = await supabase.from('scenarios').select('*').order('created_at', { ascending: true });
    scenarios = scenariosData || [];

    // Fetch User Profile (if logged in, otherwise mock/guest)
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase.from('profiles').select('total_xp, level').eq('id', user.id).single();
      const { data: badges } = await supabase.from('user_badges').select('badge_type').eq('user_id', user.id);

      if (profile) {
        userProfile.total_xp = profile.total_xp || 0;
        userProfile.level = (profile.level as UserLevel) || 'Apprendista';
      }
      if (badges) {
        userProfile.badges = badges.map(b => b.badge_type);
      }
    }
  } catch (e) {
    console.error("DB Fetch Error", e);
  }

  // Fallback if DB is empty (or RLS prevents read - though public read is on) or uninitialized
  const displayScenarios = scenarios.length > 0 ? scenarios : INITIAL_SCENARIOS.map((s, i) => ({ ...s, id: `static-${i}` }));

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6 lg:p-12 font-sans selection:bg-green-900/30">

      {/* Header Branding */}
      <div className="flex justify-between items-center mb-8 border-b border-neutral-800 pb-6">
        <h1 className="text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Agile Pro Coach <span className="text-xs font-mono text-gray-500 border border-gray-700 px-2 py-0.5 rounded ml-2">INDUSTRIAL ED.</span>
        </h1>
        <Button variant="outline" className="text-gray-400 hover:text-white border-neutral-700">Login / Profilo</Button>
      </div>

      {/* Gamification Status Bar (Top) */}
      <GamificationHeader
        totalXP={userProfile.total_xp}
        level={userProfile.level}
        badges={userProfile.badges}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Simulations */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-bold mb-4">Simulazioni Disponibili</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Educational Core Modules */}
            {THEORY_MODULES.map((module) => (
              <Card key={module.id} className="bg-neutral-900 border-neutral-800 text-white hover:border-blue-500/50 transition-all cursor-pointer group relative overflow-hidden">
                <Link href={`/modules/${module.id}`} className="absolute inset-0 z-10" />
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 group-hover:w-2 transition-all" />
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      CORE MODULE
                    </span>
                    {/* Placeholder for progress icon if I had generic progress */}
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-400 transition-colors">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="text-neutral-400 line-clamp-2">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-neutral-500 mt-2">
                    <BookOpen size={16} /> 1 Lezione
                    <span className="mx-1">•</span>
                    <BrainCircuit size={16} /> 1 Quiz
                    <span className="mx-1">•</span>
                    <PlayCircle size={16} /> 1 Scenario
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Quick Scenarios (Legacy/Standalone) */}
            {scenarios.filter(s => s.id !== '5').map((scenario: any) => (
              <Card key={scenario.id} className="bg-neutral-900 border-neutral-800 text-white hover:border-green-500/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl flex justify-between items-start">
                    <span>{scenario.title}</span>
                    <span className="text-xs px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-gray-400">
                      {scenario.difficulty}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {scenario.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs font-mono text-green-400">
                      Ruolo: {scenario.role_target}
                    </span>
                    <Link href={`/simulator/${scenario.id}`}>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Avvia Sim
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* New Section: Agile Arcade */}
          <h2 className="text-2xl font-bold mb-4 pt-8">Agile Arcade</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/games/user-story-surgeon">
              <Card className="bg-neutral-900 border-neutral-800 text-white hover:border-red-500/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">🏥 User Story Surgeon</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">Impara a scrivere storie perfette correggendo quelle sbagliate.</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/games/flash-priority">
              <Card className="bg-neutral-900 border-neutral-800 text-white hover:border-yellow-500/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">⚡ Flash Priority</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">Allena il tuo istinto di PO ordinando il backlog per valore e rischio.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Right Column: Progress & Theory */}
        <div className="space-y-6">
          {/* Theory Link Card */}
          <Link href="/pills">
            <Card className="bg-blue-950/20 border-blue-900/50 text-white hover:bg-blue-900/30 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">📚 Teoria & Pillole</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Ripassa i fondamenti di Scrum prima di scendere in campo.
                </p>
              </CardContent>
            </Card>
          </Link>

          <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
            <h3 className="font-bold text-gray-500 text-xs mb-2 uppercase">Strumenti Sviluppatore</h3>
            <form action="/api/seed" method="POST">
              <Button variant="ghost" size="sm" className="w-full text-gray-600 hover:text-white">
                Popola Database
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
