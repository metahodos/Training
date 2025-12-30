import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-neutral-900 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Agile Pro Coach
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Button variant="outline" className="text-black">Login</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-5xl">
        <Card className="bg-neutral-800 border-neutral-700 text-white">
          <CardHeader>
            <CardTitle className="flex justify-between">
              Daily Scrum Crisis
              <Badge variant="destructive">Hard</Badge>
            </CardTitle>
            <CardDescription className="text-gray-400">Role: Scrum Master</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-300">
              The Lead Developer refuses to speak during the Daily Scrum. The team is getting frustrated.
            </p>
            <Button className="w-full">Start Simulation</Button>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700 text-white">
          <CardHeader>
            <CardTitle className="flex justify-between">
              Stakeholder Request
              <Badge variant="secondary">Mid</Badge>
            </CardTitle>
            <CardDescription className="text-gray-400">Role: Product Owner</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-300">
              A key stakeholder demands a feature be added to the current Sprint.
            </p>
            <Button className="w-full" disabled>Locked</Button>
          </CardContent>
        </Card>

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
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
