import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import QuizRunner from "@/components/QuizRunner";
import Link from "next/link";

export default async function QuizPage({ params }: { params: Promise<{ id: string; quizId: string }> }) {
    const { id: moduleId, quizId } = await params;
    const supabase = await createClient();

    const { data: quiz } = await supabase.from('quizzes').select('*').eq('id', quizId).single();
    if (!quiz) notFound();

    // Parse questions from JSON
    // Ensure structure matches
    const questions = quiz.questions_json as any[];

    return (
        <div className="max-w-2xl mx-auto py-12">
            <div className="mb-8 text-center">
                <Link href={`/modules/${moduleId}`} className="text-sm text-gray-500 hover:text-gray-900">
                    Cancel & Return
                </Link>
                <h1 className="text-3xl font-bold mt-4">Module Quiz</h1>
                <p className="text-gray-600 mt-2">Test your knowledge to earn points.</p>
            </div>

            <QuizRunner
                quizId={quizId}
                questions={questions}
                moduleId={moduleId}
            />
        </div>
    );
}
