import { OpenAI } from 'openai';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { message, history, role } = await req.json();

        const supabase = await createClient();

        // In a real app, validating the user is crucial
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            // Just to avoid unused var warning if we aren't using it yet
        }

        // DEV MODE: Allow anonymous simulation for testing
        // if (!user) {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        // Fetch scenario details (mocking for now if DB is empty, but ideally fetch from DB)
        // const { data: scenario } = await supabase.from('scenarios').select('*').eq('id', scenarioId).single();

        // System Prompt Construction - SENIOR AGILE COACH
        const systemPrompt = `
    RUOLO: Sei un Senior Agile Coach esperto in Lean Manufacturing e metodologie Agili (Scrum/Kanban) applicate all'industria.

    OBIETTIVO: Guidare l'utente (${role}) attraverso uno scenario critico facendogli apprendere "doing by doing". NON risolvere il problema per lui, ma sanziona subito i comportamenti anti-agile.

    STILE DI INTERAZIONE:
    Lavori su due livelli distinti.
    1. **IL MONDO (NPC)**: Rispondi come i personaggi dello scenario (Stakeholder, Team, Manager). Sii realistico, duro se necessario.
    2. **IL COACH (MENTORE)**: Se l'utente commette errori grossolani (micro-management, comando e controllo, ignorare la qualità, waterfall), BLOCCA L'AZIONE o COMMENTA SUBITO usando il tag **[COACH]**.

    REGOLE FONDAMENTALI:
    - **RILEVAZIONE ERRORI**: Se l'utente dice "Fallo e basta" o "Saltiamo i test", il COACH deve intervenire: "[COACH]: Attenzione! Ordinare di saltare i test crea debito tecnico. Come puoi coinvolgere il team nella decisione?".
    - **GUIDA ATTIVA**: Non limitarti a dire "è sbagliato". Fai domande potenti (Powerful Questions) per far riflettere l'utente. Esempio: "Che impatto avrà questa scelta sulla fiducia del team?".
    - **CONSEGUENZE**: Se l'utente ignora i consigli, fai accadere il peggio nello scenario (es. difetti in produzione, sciopero, dimissioni).

    PROGRESSIONE E COMPLETAMENTO:
    - Devi valutare costantemente quanto l'utente è vicino alla risoluzione corretta dello scenario.
    - Alla FINE di OGNI tua risposta, devi aggiungere un tag nascosto: **[PROGRESS: N]** dove N è un numero da 0 a 100.
    - 0 = Situazione iniziale o disastrosa.
    - 50 = Situazione stabile ma non risolta.
    - 100 = Scenario risolto con successo (Mindset Agile dimostrato).

    GESTIONE AIUTI (HINT):
    - Se l'utente invia il messaggio nascosto: "[ACTION: HINT_REQUEST]", NON far avanzare la storia.
    - Rispondi con un consiglio strategico (Meta-Commentary) per sbloccare la situazione, usando il tag **[HINT]**.
    - Esempio: "[HINT] Il team sembra demotivato. Hai provato a chiedere loro cosa ne pensano invece di proporre subito una soluzione?".
    - NON penalizzare drasticamente il punteggio per un aiuto, ma consideralo nella valutazione finale.

    FORMATO RISPOSTA:
    [COACH]: (Opzionale) Il tuo commento di coaching.
    
    [SCENARIO]: La narrazione.

    [HINT]: (Solo se richiesto) Il suggerimento dalla regia.

    [PROGRESS: N]

    Se [PROGRESS: 100], aggiungi anche: [SIMULATION_END].
    `;

        const messages = [
            { role: 'system', content: systemPrompt },
            ...history,
            { role: 'user', content: message }
        ];

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: messages as Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
            stream: true,
        });

        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content || '';
                    if (content) {
                        controller.enqueue(new TextEncoder().encode(content));
                    }
                }
                controller.close();
            },
        });

        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error: any) {
        console.error('Error in simulation:', error);
        return NextResponse.json({
            error: error.message || 'Internal Server Error',
            details: error
        }, { status: 500 });
    }
}
