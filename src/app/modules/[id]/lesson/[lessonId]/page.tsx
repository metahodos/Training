import { createClient } from "@/utils/supabase/server";
import { markLessonComplete } from "@/app/actions/progress";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

export default async function LessonPage({ params }: { params: Promise<{ id: string; lessonId: string }> }) {
    const { id: moduleId, lessonId } = await params;
    const supabase = await createClient();

    const { data: lesson } = await supabase.from('lessons').select('*').eq('id', lessonId).single();
    if (!lesson) notFound();

    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <div className="mb-6 flex items-center justify-between">
                <Link href={`/modules/${moduleId}`} className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
                    &larr; Back to Module
                </Link>
                <div className="text-sm text-gray-400">Lesson Viewer</div>
            </div>

            <article className="prose prose-slate dark:prose-invert lg:prose-xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <ReactMarkdown>{lesson.content_markdown}</ReactMarkdown>
            </article>

            <div className="mt-8 flex justify-end">
                <form action={async () => {
                    'use server';
                    await markLessonComplete(lessonId);
                }}>
                    <button type="submit" className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-green-200 dark:shadow-none transition-all hover:scale-105 active:scale-95">
                        <Check className="w-5 h-5 mr-2" /> Mark as Complete
                    </button>
                </form>
            </div>
        </div>
    );
}
