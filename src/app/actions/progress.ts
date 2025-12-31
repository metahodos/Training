
'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';


export async function markTheoryCompleted(moduleId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Guest mode: just return, client handles optimistic state
    if (!user) return;

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

    // Fetch quiz questions for this module from Supabase
    const { data: questions, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('module_id', moduleId);

    if (error || !questions || questions.length === 0) {
        return { success: false, error: 'Quiz not found' };
    }

    // Validate Answers
    let correctCount = 0;
    const totalQuestions = questions.length;

    for (const q of questions) {
        const userAnswer = answers.find(a => a.questionId === q.id);
        if (!userAnswer) continue;

        // DB options are string[]. We mapped index to ID valid client-side (0, 1, 2...)
        const selectedOptionIndex = parseInt(userAnswer.answerId, 10);

        if (!isNaN(selectedOptionIndex) && Array.isArray(q.options)) {
            const selectedText = q.options[selectedOptionIndex];
            if (selectedText === q.correct_answer) {
                correctCount++;
            }
        }
    }

    const passed = correctCount === totalQuestions;

    // Only save progress if user is authenticated
    if (user && passed) {
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
