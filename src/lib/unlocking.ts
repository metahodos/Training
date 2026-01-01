import { createClient } from "@/utils/supabase/server";

export async function checkModuleUnlock(userId: string, moduleId: string): Promise<{ unlocked: boolean; progress: number }> {
    const supabase = await createClient();

    // 1. Get current module info to find sort_order
    const { data: currentModule, error: modError } = await supabase
        .from('modules')
        .select('sort_order')
        .eq('id', moduleId)
        .single();

    if (modError || !currentModule) {
        console.error("Error fetching module:", modError);
        return { unlocked: false, progress: 0 };
    }

    // If it's the first module, it's always unlocked
    if (currentModule.sort_order === 1) {
        return { unlocked: true, progress: 100 }; // Or 0, but unlocked
    }

    // 2. Find previous module
    const { data: prevModule, error: prevError } = await supabase
        .from('modules')
        .select('id')
        .eq('sort_order', currentModule.sort_order - 1)
        .single();

    if (prevError || !prevModule) {
        // No previous module found? Should be Module 1. 
        // If sort_order > 1 but no prev, logic error or gap. Default unlock? No, lock.
        return { unlocked: false, progress: 0 };
    }

    // 3. Calculate breakdown of previous module
    // Total lessons
    const { count: totalLessons, error: countError } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true })
        .eq('module_id', prevModule.id);

    if (countError) return { unlocked: false, progress: 0 };
    if (!totalLessons || totalLessons === 0) return { unlocked: true, progress: 100 }; // Empty module? Unlock next.

    // Completed lessons
    const { count: completedLessons, error: compError } = await supabase
        .from('lesson_completions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .in('lesson_id', (
            await supabase.from('lessons').select('id').eq('module_id', prevModule.id)
        ).data?.map(l => l.id) || []
        );

    // Note: The IN query above is a bit indirect. 
    // Better: join? Supabase client doesn't do deep joins easily for count.
    // RPC or direct select is better. using "lesson_completions!inner(lesson_id)" with "lessons" filter.
    // But keeping it simple: Fetch completed lessons for that module.

    const { data: completions } = await supabase
        .from('lesson_completions')
        .select('lesson_id')
        .eq('user_id', userId);

    // Get lessons IDs of prev module
    const { data: prevLessons } = await supabase
        .from('lessons')
        .select('id')
        .eq('module_id', prevModule.id);

    if (!prevLessons || prevLessons.length === 0) return { unlocked: true, progress: 100 };

    const completedCount = prevLessons.filter(l => completions?.some(c => c.lesson_id === l.id)).length;

    const progress = (completedCount / prevLessons.length) * 100;

    return {
        unlocked: progress >= 75,
        progress: Math.round(progress)
    };
}
