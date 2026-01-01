
'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { calculateQuizScore } from '@/lib/scoring';


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

    if (user) {
        // Fetch existing attempts
        const { data: currentProgress } = await supabase
            .from('user_progress')
            .select('quiz_attempts')
            .eq('user_id', user.id)
            .eq('module_id', moduleId)
            .maybeSingle();

        const previousAttempts = currentProgress?.quiz_attempts || 0;
        const newAttempts = previousAttempts + 1;

        const points = passed ? calculateQuizScore(newAttempts) : 0;

        const updateData: {
            user_id: string;
            module_id: string;
            quiz_attempts: number;
            updated_at: string;
            quiz_passed?: boolean;
            quiz_score?: number;
        } = {
            user_id: user.id,
            module_id: moduleId,
            quiz_attempts: newAttempts,
            updated_at: new Date().toISOString()
        };

        if (passed) {
            updateData.quiz_passed = true;
            updateData.quiz_score = points;
        }

        const { error: upsertError } = await supabase
            .from('user_progress')
            .upsert(updateData, { onConflict: 'user_id, module_id' });

        if (upsertError) {
            console.error('Error submitting quiz progress:', upsertError);
            return { success: false, error: 'Failed to save progress' };
        }

        if (passed) {
            revalidatePath('/', 'layout'); // Refresh Sidebar
        }

        return {
            success: true,
            passed,
            score: correctCount,
            total: totalQuestions,
            pointsEarned: points,
            attempts: newAttempts
        };
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
