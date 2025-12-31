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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-5xl">

        {displayScenarios.map((scenario: any) => (
          <Card key={scenario.id} className="bg-neutral-800 border-neutral-700 text-white hover:border-neutral-500 transition-colors">
            <CardHeader>
              <CardTitle className="flex justify-between items-start gap-2">
                <span className="truncate">{scenario.title}</span>
                <Badge variant={scenario.difficulty === 'Hard' || scenario.difficulty === 'Senior' ? 'destructive' : scenario.difficulty === 'Mid' ? 'secondary' : 'default'} className="shrink-0">
                  {scenario.difficulty}
                </Badge>
              </CardTitle>
              <CardDescription className="text-gray-400">Role: {scenario.role_target === 'SM' ? 'Scrum Master' : 'Product Owner'}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-[140px]">
              <p className="text-sm text-gray-300 line-clamp-3">
                {scenario.description}
              </p>
              <Link href={`/simulator/${scenario.id}`}>
                <Button className="w-full mt-4">Start Simulation</Button>
              </Link>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-neutral-800 border-neutral-700 text-white">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>XP Points</span>
                  <span>120 / 500</span>
                </div>
                <Progress value={24} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Scrum Master Mastery</span>
                  <span>Level 2</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </div>

            {/* Seeding Button Logic - hidden in production, or triggered manually */}
            <form action="/api/seed" method="POST" className="mt-6 pt-6 border-t border-neutral-700">
              <p className="text-xs text-gray-500 mb-2">Dev Tools</p>
              {/* Note: This is a hacky CLI-like button just to trigger the API route since it's a POST */}
              {/* Better to just fetch calling fetch('/api/seed', {method:'POST'}) client side, but this is server component */}
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
