
'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { QUIZZES } from '@/lib/data/quizzes';

export async function markTheoryCompleted(moduleId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    // Upsert progress
    const { error } = await supabase.from('user_progress').upsert({
        user_id: user.id,
        module_id: moduleId,
        theory_completed: true,
        updated_at: new Date().toISOString()
    }, { onConflict: 'user_id, module_id' });

    if (error) console.error('Error marking theory complete:', error);
    revalidatePath('/', 'layout'); // Refresh Sidebar
}

export async function submitQuiz(moduleId: string, answers: { questionId: string, answerId: string }[]) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Unauthorized' };

    const quiz = QUIZZES.find(q => q.moduleId === moduleId);
    if (!quiz) return { success: false, error: 'Quiz not found' };

    // Validate Answers
    let correctCount = 0;
    const totalQuestions = quiz.questions.length;

    for (const q of quiz.questions) {
        const userAnswer = answers.find(a => a.questionId === q.id);
        const correctOption = q.options.find(o => o.isCorrect);
        if (userAnswer && userAnswer.answerId === correctOption?.id) {
            correctCount++;
        }
    }

    const passed = correctCount === totalQuestions; // Strict 100% to pass? Or configurable. Let's say 100% for now as per user request (Unlock).

    if (passed) {
        await supabase.from('user_progress').upsert({
            user_id: user.id,
            module_id: moduleId,
            quiz_passed: true,
            updated_at: new Date().toISOString()
        }, { onConflict: 'user_id, module_id' });

        revalidatePath('/', 'layout'); // Refresh Sidebar
    }

    return {
        success: true,
        passed,
        score: correctCount,
        total: totalQuestions
    };
}

export async function getModuleProgress(moduleId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data } = await supabase.from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('module_id', moduleId)
        .single();

    return data;
}
