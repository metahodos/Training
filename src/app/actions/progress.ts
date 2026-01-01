'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function markLessonComplete(lessonId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Unauthorized" };

    const { error } = await supabase
        .from('lesson_completions')
        .upsert({ user_id: user.id, lesson_id: lessonId }, { onConflict: 'user_id, lesson_id', ignoreDuplicates: true });

    if (error) {
        console.error("Error marking lesson complete:", error);
        return { error: "Failed to mark complete" };
    }

    revalidatePath('/modules');
    return { success: true };
}

export async function submitQuizScore(quizId: string, score: number, attemptNumber: number, passed: boolean) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Unauthorized" };

    const { error } = await supabase
        .from('quiz_results')
        .insert({
            user_id: user.id,
            quiz_id: quizId,
            score,
            attempt_number: attemptNumber,
            passed
        });

    if (error) {
        console.error("Error submitting quiz:", error);
        return { error: "Failed to submit quiz" };
    }

    // Check module complete? Maybe unlock badge?
    revalidatePath('/modules');
    return { success: true };
}
