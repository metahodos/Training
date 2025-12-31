'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/modules/101');
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-950 text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-sm text-neutral-400">Loading Module 101...</p>
      </div>
    </div>
  );
}
