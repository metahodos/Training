'use server';

import { OpenAI } from 'openai';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { THEORY_MODULES } from '@/lib/data/theory';

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
Sei un Agile Coach esperto in ambito INDUSTRIALE e MANIFATTURIERO (Hardware, Impianti, Produzione).
Stai valutando uno studente che simula il ruolo di Scrum Master (SM) o Product Owner (PO) in un contesto fisico (Non software).

IL TUO OBIETTIVO:
Valutare se l'utente applica i principi Agile/Lean al mondo fisico: interazioni faccia a faccia (Obeya), validazione rapida (prototipi), gestione dei vincoli fisici e dei colli di bottiglia.

CRITERI DI VALUTAZIONE (Industrial Empiricism):
1.  **Fattibilità & Concretezza**: Propone soluzioni fisicamente realizzabili?
2.  **Costi & Rischi**: Considera i costi di produzione o i rischi di sicurezza?
3.  **MVP Fisico**: Cerca di validare l'ipotesi con il minimo sforzo costruttivo prima di ingegnerizzare tutto?
4.  **Team Cross-Funzionale**: Coinvolge operatori, manutentori e progettisti insieme?

FORMATO RISPOSTA (JSON STRICT):
Devi rispondere ESCLUSIVAMENTE con un oggetto JSON valido. Niente markdown, niente premesse.
Struttura:
{
  "punteggio_globale": (0-100),
  "punteggio_tecnico": (0-100, competenza su Scrum/Lean industriale),
  "punteggio_soft_skills": (0-100, negoziazione, leadership, empatia con operai/ingegneri),
  "analisi_critica": "Analisi dettagliata in italiano del comportamento...",
  "punti_forza": ["Punto 1", "Punto 2"],
  "aree_miglioramento": ["Area 1", "Area 2"]
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
        }

        // 4. Update XP 
        const xpGained = 10 + Math.floor(feedbackData.punteggio_globale / 2);

        // Fetch current XP to update manually since RPC might be missing permissions
        const { data: profile } = await supabase.from('profiles').select('xp_points').eq('id', user.id).single();
        if (profile) {
            await supabase.from('profiles').update({ xp_points: (profile.xp_points || 0) + xpGained }).eq('id', user.id);
        }

        // 5. Update Module Progress (Unlock Next Module)
        if (feedbackData.punteggio_globale > 70) {
            const linkedModule = THEORY_MODULES.find(m => m.related_scenario_id === scenarioId);

            if (linkedModule) {
                await supabase.from('user_progress').upsert({
                    user_id: user.id,
                    module_id: linkedModule.id,
                    simulation_completed: true,
                    current_step: 'done',
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id, module_id' });

                revalidatePath('/', 'layout'); // Refresh Sidebar to unlock next module
            }
        }

        return { success: true, feedback: feedbackData };

    } catch (error) {
        console.error("Feedback Generation Error:", error);
        return { error: 'Failed to generate feedback' };
    }
}
