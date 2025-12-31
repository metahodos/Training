
import { THEORY_MODULES } from '@/lib/data/theory';
import { QUIZZES } from '@/lib/data/quizzes';
import { INITIAL_SCENARIOS } from '@/lib/data/scenarios';
import { getModuleProgress } from '@/app/actions/progress';
import ModuleView from '@/components/ModuleView';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    // 1. Fetch Module with Lessons, Quiz, and Scenario
    // Note: We use single() because ID should be unique.
    const { data: moduleData, error } = await supabase
        .from('modules')
        .select(`
            *,
            lessons (id, title, content, order_index),
            quizzes (id, question, options, correct_answer),
            scenarios (id, title, description, initial_context, role_target, difficulty)
        `)
        .eq('id', id)
        .single();

    if (error || !moduleData) {
        console.error("Module fetch error:", error);
        notFound();
    }

    // 2. Fetch User Progress (Existing logic)
    const progress = await getModuleProgress(id);

    // 3. Prepare Data for View
    // Sort lessons by order_index just in case
    const sortedLessons = (moduleData.lessons || []).sort((a: any, b: any) => a.order_index - b.order_index);

    // Quiz Data: The DB stores questions as rows in 'quizzes' table.
    // We expect 'quizzes' related rows to be joined here.
    // Note: The variable name from join might be 'quizzes' (plural) even if it's a 1:N relation where we want all N.
    // However, my previous code assumed 'quizzes' was a single object.
    // Let's look at the fetch: .select('..., quizzes (id, questions), ...') -> This was wrong.
    // The table is 'quizzes' but rows are questions.
    // The relation name is likely 'quizzes' (modules -> quizzes).
    // So `moduleData.quizzes` will be an array of Question Rows.

    let quizDataForView = undefined;
    if (moduleData.quizzes && Array.isArray(moduleData.quizzes) && moduleData.quizzes.length > 0) {
        const questions = moduleData.quizzes.map((q: any) => {
            // DB: options is string[], correct_answer is string
            // View: options is { id, text, isCorrect }[]
            const options = Array.isArray(q.options)
                ? q.options.map((optText: string, idx: number) => ({
                    id: String(idx), // Use index as ID
                    text: optText,
                    isCorrect: optText === q.correct_answer
                }))
                : [];

            return {
                id: q.id,
                text: q.question, // DB column is 'question'
                options: options
            };
        });

        if (questions.length > 0) {
            quizDataForView = { questions };
        }
    }

    // Scenario Data
    // Join returns array (1:1 relation usually returns array of 1).
    const scenarioData = Array.isArray(moduleData.scenarios) ? moduleData.scenarios[0] : moduleData.scenarios;

    return (
        <div className="p-8 bg-black min-h-screen text-white">
            <ModuleView
                moduleId={moduleData.id}
                moduleTitle={moduleData.title}
                lessons={sortedLessons}
                quiz={quizDataForView}
                scenario={scenarioData ? {
                    id: scenarioData.id,
                    initial_context: scenarioData.initial_context,
                    role_target: scenarioData.role_target as "SM" | "PO"
                } : null}
                initialProgress={progress}
            />
        </div>
    );
}
