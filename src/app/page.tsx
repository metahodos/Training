import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-neutral-950 text-white">
      <h1 className="text-4xl font-bold mb-8">Agile Pro Coach</h1>
      <p className="mb-8 text-neutral-400">Debug Mode: Manual Navigation</p>

      <Link href="/modules/101">
        <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-bold">
          VAI AL MODULO 101 (Click Manuale)
        </button>
      </Link>
    </div>
  );
}
