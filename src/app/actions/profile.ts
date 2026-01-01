'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addSkillToProfile(skill: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Unauthorized' };
    }

    // 1. Get current skills
    const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('skills')
        .eq('id', user.id)
        .single();

    if (fetchError) {
        console.error("Error fetching profile:", fetchError);
        return { error: 'Failed to fetch profile' };
    }

    let currentSkills: string[] = [];
    if (profile && profile.skills) {
        if (Array.isArray(profile.skills)) {
            currentSkills = profile.skills;
        } else if (typeof profile.skills === 'string') {
            try {
                currentSkills = JSON.parse(profile.skills);
            } catch (e) {
                currentSkills = [];
            }
        }
    }

    if (!currentSkills.includes(skill)) {
        currentSkills.push(skill);

        const { error: updateError } = await supabase
            .from('profiles')
            .update({ skills: currentSkills })
            .eq('id', user.id);

        if (updateError) {
            console.error("Error updating profile:", updateError);
            return { error: 'Failed to update profile' };
        }
    }

    revalidatePath('/modules');
    revalidatePath('/profile'); // Assuming a profile page exists or will exist

    return { success: true };
}
