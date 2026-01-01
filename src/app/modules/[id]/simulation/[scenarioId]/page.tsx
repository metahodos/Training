import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import SimulationRunner from "@/components/SimulationRunner";
import Link from "next/link";

export default async function SimulationPage({ params }: { params: Promise<{ id: string; scenarioId: string }> }) {
    const { id: moduleId, scenarioId } = await params;
    const supabase = await createClient();

    const { data: scenario } = await supabase.from('scenarios').select('*').eq('id', scenarioId).single();
    if (!scenario) notFound();

    return (
        <div className="max-w-4xl mx-auto py-8">
            <header className="mb-8">
                <Link href={`/modules/${moduleId}`} className="text-sm text-gray-500 hover:text-gray-900">
                    &larr; Back to Module
                </Link>
                <h1 className="text-3xl font-bold mt-4">{scenario.title}</h1>
                <p className="text-gray-600 mt-2">{scenario.description}</p>
            </header>

            <SimulationRunner scenarioId={scenarioId} moduleId={moduleId} />
        </div>
    );
}
