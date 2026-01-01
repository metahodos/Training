import { createClient } from "@/utils/supabase/server";
import { Lock, Unlock, PlayCircle } from "lucide-react";
import Link from "next/link";
import { checkModuleUnlock } from "@/lib/unlocking";

// Force dynamic rendering to check auth and locks
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const supabase = await createClient();

  // Get user
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch Modules
  const { data: modules, error } = await supabase
    .from('modules')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error("Error fetching modules:", error);
    return <div>Error loading modules: {error.message}</div>;
  }

  if (!modules) return <div>Loading modules...</div>;

  // Determine lock status for each module
  // Optimization: Parallelize unlock checks
  const modulesWithStatus = await Promise.all(modules.map(async (m) => {
    let isUnlocked = false;
    if (user) {
      const { unlocked } = await checkModuleUnlock(user.id, m.id);
      isUnlocked = unlocked;
    } else {
      // Unauthenticated: Only Module 1 unlocked? Or none?
      // "Tabula Rasa" -> Reset Auth? I assume user needs to sign in?
      // If no user, show lock except module 1 maybe?
      isUnlocked = m.sort_order === 1;
    }
    return { ...m, isUnlocked };
  }));

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Agile Journey</h1>
        <p className="text-gray-600 dark:text-gray-400">Master the 6 Pillars of QuickWorks.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulesWithStatus.map((m) => (
          <div key={m.id} className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md ${!m.isUnlocked ? 'opacity-75 grayscale' : ''}`}>
            <div className={`absolute top-0 left-0 w-full h-1 ${m.isUnlocked ? 'bg-green-500' : 'bg-gray-300'}`} />

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  Module {m.sort_order}
                </span>
                {m.isUnlocked ? (
                  <Unlock className="w-5 h-5 text-green-500" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </div>

              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {m.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                {m.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-400 font-medium">
                  Day {m.day} • {m.pillar}
                </span>
                {m.isUnlocked ? (
                  <Link href={`/modules/${m.id}`} className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                    Start <PlayCircle className="w-4 h-4 ml-1" />
                  </Link>
                ) : (
                  <span className="text-sm text-gray-400 flex items-center cursor-not-allowed">
                    Locked
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
