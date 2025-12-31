
import { THEORY_MODULES } from '@/lib/data/theory';
import { QUIZZES } from '@/lib/data/quizzes';
import { INITIAL_SCENARIOS } from '@/lib/data/scenarios';
import { getModuleProgress } from '@/app/actions/progress';
import ModuleView from '@/components/ModuleView';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Auth Check
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }

    const module = THEORY_MODULES.find(m => m.id === id);
    if (!module) {
        notFound();
    }

    const quiz = QUIZZES.find(q => q.moduleId === id);

    const scenario = module.related_scenario_id
        ? INITIAL_SCENARIOS.find(s => s.id === module.related_scenario_id)
        : null;

    const progress = await getModuleProgress(id);

    return (
        <div className="p-8 bg-black min-h-screen text-white">
            <ModuleView
                moduleId={id}
                moduleTitle={module.title}
                theoryContent={module.content}
                quiz={quiz}
                scenario={scenario}
                initialProgress={progress}
            />
        </div>
    );
}
