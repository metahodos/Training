'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Instant client-side redirect to the first module
    router.replace('/modules/101');
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-950 text-white">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        {/* Simple Loading Brand */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          Agile Pro Coach
        </h1>
        <p className="text-xs text-neutral-500 uppercase tracking-widest">Caricamento Modulo...</p>
      </div>
    </div>
  );
}
