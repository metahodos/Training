'use server';

import { OpenAI } from 'openai';
import { createClient } from '@/utils/supabase/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

interface SimulationHistory {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export async function processSimulationResult(history: SimulationHistory[], scenarioId: string) {
    const supabase = await createClient();

    // 1. Validate User
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    // 2. Generate Feedback via OpenAI (JSON Mode)
    const systemPrompt = `
    Agisci come un Senior Agile Coach esperto. Valuta la sessione di roleplay seguente basandoti rigorosamente sulla Scrum Guide 2020.
    
    Analizza se l'utente (che agisce come Scrum Master o PO) ha rispettato i valori di Scrum, il timeboxing, e la servitù professionale.
    
    Restituisci ESCLUSIVAMENTE un oggetto JSON valido con questa struttura esatta:
    {
      "punteggio_globale": (numero intero 0-100),
      "punteggio_tecnico": (numero intero 0-100, conoscenza Scrum),
      "punteggio_soft_skills": (numero intero 0-100, empatia/comunicazione),
      "analisi_critica": "Breve analisi testuale (max 50 parole) in Italiano",
      "punti_forza": ["punto 1", "punto 2"],
      "aree_miglioramento": ["area 1", "area 2"]
    }
  `;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: systemPrompt },
                ...history.map(m => ({ role: m.role, content: m.content }))
            ],
            response_format: { type: 'json_object' },
            temperature: 0.7,
        });

        const content = response.choices[0].message.content;
        if (!content) throw new Error('No content from OpenAI');

        const feedbackData = JSON.parse(content);

        // 3. Save to Supabase
        const { error: dbError } = await supabase.from('user_attempts').insert({
            user_id: user.id,
            scenario_id: scenarioId,
            score: feedbackData.punteggio_globale,
            ai_feedback: feedbackData,
            chat_transcript: history
        });

        if (dbError) {
            console.error("DB Error:", dbError);
            // We continue getting feedback even if DB save fails, but log it
        }

        // 4. Update XP (Simple Logic: +10 XP per attempt + Score)
        const xpGained = 10 + Math.floor(feedbackData.punteggio_globale / 2);
        await supabase.rpc('increment_xp', { x: xpGained, user_id: user.id });
        // Note: increment_xp RPC needs to be created, or we do a fetch-update cycle. 
        // For now let's do simple fetch-update since we might not have RPC rights easily

        const { data: profile } = await supabase.from('profiles').select('xp_points').eq('id', user.id).single();
        if (profile) {
            await supabase.from('profiles').update({ xp_points: (profile.xp_points || 0) + xpGained }).eq('id', user.id);
        }

        return { success: true, feedback: feedbackData };

    } catch (error) {
        console.error("Feedback Generation Error:", error);
        return { error: 'Failed to generate feedback' };
    }
}
