import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { createClient } from '@/utils/supabase/server';
import { INITIAL_SCENARIOS } from '@/lib/data/scenarios'; // Fallback

export default async function Home() {
  const supabase = await createClient();
  let scenarios = [];

  try {
    const { data } = await supabase.from('scenarios').select('*').order('created_at', { ascending: true });
    scenarios = data || [];
  } catch (e) {
    console.error("DB Fetch Error", e);
  }

  // Fallback if DB is empty (or RLS prevents read - though public read is on) or uninitialized
  const displayScenarios = scenarios.length > 0 ? scenarios : INITIAL_SCENARIOS.map((s, i) => ({ ...s, id: `static-${i}` }));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-neutral-900 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Agile Pro Coach
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Button variant="outline" className="text-black">Login / Profile</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Simulations */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold mb-4">Simulazioni Disponibili</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayScenarios.map((scenario: any) => (
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
          {/* Progress Card */}
          <Card className="bg-neutral-900 border-neutral-800 text-white">
            <CardHeader>
              <CardTitle>I Tuoi Progressi</CardTitle>
            </CardHeader>
            {/* ... existing progress content ... */}
            <CardContent>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-green-500 mb-2">0 XP</div>
                <div className="text-sm text-gray-400">Novizio Agile</div>
              </div>
            </CardContent>
          </Card>

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
            <h3 className="font-bold text-gray-500 text-xs mb-2 uppercase">Developer Tools</h3>
            <form action="/api/seed" method="POST">
              <Button variant="ghost" size="sm" className="w-full text-gray-600 hover:text-white">
                Seed Database
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
