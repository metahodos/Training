import ChatInterface from '@/components/ChatInterface';
import { createClient } from '@/utils/supabase/server';
import { INITIAL_SCENARIOS } from '@/lib/data/scenarios';
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        id: string;
    };
}

export default async function SimulatorPage({ params }: PageProps) {
    const { id } = params;
    const supabase = await createClient();

    let scenario;

    // 1. Try fetching from DB
    if (id.length === 36) { // UUID length check (rough)
        const { data } = await supabase.from('scenarios').select('*').eq('id', id).single();
        if (data) scenario = data;
    }

    // 2. Fallback to static data if not found or if ID is "static-X"
    if (!scenario) {
        if (id.startsWith('static-')) {
            const index = parseInt(id.split('-')[1]);
            if (INITIAL_SCENARIOS[index]) {
                scenario = { ...INITIAL_SCENARIOS[index], id };
            }
        } else {
            // Try finding by exact match in static array just in case logic acts up
            // (Not strictly necessary if we use the static-id convention)
        }
    }

    if (!scenario) {
        // For demo purposes, fallback to the first static scenario if something goes mostly wrong but ID is weird
        // or return 404
        // return notFound();
        // Let's be lenient for the demo:
        scenario = { ...INITIAL_SCENARIOS[0], id: 'demo-fallback' };
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-5xl mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Simulation: {scenario.title}</h1>
                <p className="text-gray-400">{scenario.description}</p>
            </div>

            <ChatInterface
                scenarioId={scenario.id}
                initialContext={scenario.initial_context}
                role={scenario.role_target as 'SM' | 'PO'}
            />
        </div>
    );
}
