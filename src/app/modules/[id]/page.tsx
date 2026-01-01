import { createClient } from "@/utils/supabase/server";
import { CheckCircle, Circle, Play, FileText, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch Module
    const { data: moduleData } = await supabase.from('modules').select('*').eq('id', id).single();
    if (!moduleData) notFound();

    // Fetch Lessons
    const { data: lessons } = await supabase
        .from('lessons')
        .select('*')
        .eq('module_id', id)
        .order('sort_order', { ascending: true });

    // Fetch Scenarios
    const { data: scenarios } = await supabase
        .from('scenarios')
        .select('*')
        .eq('module_id', id);

    // Fetch Completions
    let completedLessonIds: string[] = [];
    if (user) {
        const { data: completions } = await supabase
            .from('lesson_completions')
            .select('lesson_id')
            .eq('user_id', user.id)
            .in('lesson_id', lessons?.map(l => l.id) || []);
        completedLessonIds = completions?.map(c => c.lesson_id) || [];
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="mb-8 border-b pb-6 dark:border-gray-700">
                <Link href="/" className="text-sm text-blue-600 hover:underline mb-4 block">&larr; Back to Dashboard</Link>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{moduleData.title}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">{moduleData.description}</p>
                <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                    <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">Day {moduleData.day}</span>
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">{moduleData.pillar}</span>
                </div>
            </header>

            <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-gray-500" /> Lessons
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {lessons?.map((lesson, idx) => {
                        const isCompleted = completedLessonIds.includes(lesson.id);
                        return (
                            <Link
                                key={lesson.id}
                                href={`/modules/${id}/lesson/${lesson.id}`}
                                className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b last:border-0 border-gray-100 dark:border-gray-700"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 text-gray-400">
                                        {isCompleted ? (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <Circle className="w-5 h-5" />
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-gray-500 w-6">0{idx + 1}</span>
                                    <span className={`font-medium ${isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                        {lesson.title}
                                    </span>
                                </div>
                                <Play className="w-4 h-4 text-gray-300" />
                            </Link>
                        );
                    })}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <BrainCircuit className="w-5 h-5 mr-2 text-gray-500" /> Quizzes
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Fetch and map quizzes here */}
                    {(await supabase.from('quizzes').select('*').eq('module_id', id)).data?.map((quiz, idx) => (
                        <Link
                            key={quiz.id}
                            href={`/modules/${id}/quiz/${quiz.id}`}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b last:border-0 border-gray-100 dark:border-gray-700"
                        >
                            <span className="font-medium text-gray-900 dark:text-white">Module Quiz {idx + 1}</span>
                            <Play className="w-4 h-4 text-gray-300" />
                        </Link>
                    ))}
                </div>
            </section>


            {scenarios && scenarios.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-600 dark:text-indigo-400">
                        <BrainCircuit className="w-5 h-5 mr-2" /> Simulation & Experience
                    </h2>
                    <div className="grid gap-4">
                        {scenarios.map(sc => (
                            <div key={sc.id} className="bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-800 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800 shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">{sc.title}</h3>
                                        <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">{sc.description}</p>
                                    </div>
                                    <span className="text-xs bg-white dark:bg-gray-900 px-2 py-1 rounded border border-indigo-200 dark:border-indigo-700 shadow-sm">
                                        {sc.difficulty}
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-not-allowed opacity-50" title="Not implemented in this view yet">
                                        Launch Simulation
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
