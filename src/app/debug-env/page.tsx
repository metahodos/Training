import { createClient } from '@/utils/supabase/server';

export default async function DebugEnvPage() {
    const supabase = await createClient();

    // Check Env Vars (safely)
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Check DB Connection
    const { data: modules, error } = await supabase.from('modules').select('id, title');
    const { data: user } = await supabase.auth.getUser();

    return (
        <div className="p-8 font-mono text-sm bg-black text-white min-h-screen">
            <h1 className="text-xl font-bold mb-4 text-red-500">Vercel Debug Diagnostic</h1>

            <div className="space-y-4">
                <section className="border p-4 rounded border-gray-800">
                    <h2 className="text-lg font-bold mb-2">1. Environment Variables</h2>
                    <p>NEXT_PUBLIC_SUPABASE_URL: <span className={url ? "text-green-500" : "text-red-500"}>{url ? "DEFINED" : "MISSING"}</span></p>
                    <p className="text-xs text-gray-500">{url}</p>
                    <br />
                    <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: <span className={key ? "text-green-500" : "text-red-500"}>{key ? "DEFINED" : "MISSING"}</span></p>
                    <p className="text-xs text-gray-500">{key ? `${key.substring(0, 10)}...` : "N/A"}</p>
                </section>

                <section className="border p-4 rounded border-gray-800">
                    <h2 className="text-lg font-bold mb-2">2. Database Connection</h2>
                    {error ? (
                        <div className="text-red-500">
                            <p>ERROR FETCHING MODULES:</p>
                            <pre>{JSON.stringify(error, null, 2)}</pre>
                        </div>
                    ) : (
                        <div className="text-green-500">
                            <p>SUCCESS: Modules fetched successfully.</p>
                            <p>Count: {modules?.length || 0}</p>
                            <pre className="mt-2 text-xs text-gray-400 max-h-40 overflow-auto">
                                {JSON.stringify(modules, null, 2)}
                            </pre>
                        </div>
                    )}
                </section>

                <section className="border p-4 rounded border-gray-800">
                    <h2 className="text-lg font-bold mb-2">3. Auth Status</h2>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </section>
            </div>
        </div>
    );
}
