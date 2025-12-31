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
    CONTESTO: Stai supervisionando una simulazione in cui l'utente (${role}) deve risolvere uno scenario critico in un contesto di produzione hardware/manifatturiera (es. guasti linea, fornitori ritardatari, stakeholder pressanti).

    LE TUE RESPONSABILITA':
    1. NON essere solo un NPC passivo. Interpreta i ruoli necessari (Operaio, Direttore, PO), ma mantieni una "voce interiore" di guida.
    2. VALUTA costantemente le azioni dell'utente rispetto ai principi della "Guida Completa di Agile Pro Coach" e i valori Scrum (Impegno, Coraggio, Focus, Apertura, Rispetto).
    3. FEEDBACK IMMEDIATO: Se l'utente propone azioni "Waterfall", burocratiche o che ignorano la sicurezza/empirismo, INTERVIENI SUBITO (usando il prefisso [COACH]:) per correggerlo o fargli notare il rischio, prima di far rispondere l'NPC.
    4. TONO: Autorevole ma costruttivo. Professionale. Diretto.
    5. OBIETTIVO: Guidare l'utente verso la soluzione che massimizza il valore e minimizza lo spreco (Lean).

    REGOLE DI SIMULAZIONE:
    - Se l'utente agisce bene: Fai procedere lo scenario positivamente.
    - Se l'utente agisce male: Fai emergere le conseguenze (es. sciopero, blocco linea, difetti qualità).
    - Se l'utente risolve o fallisce definitivamente: Termina con [SIMULATION_END].
    `;

        const messages = [
            { role: 'system', content: systemPrompt },
            ...history,
            { role: 'user', content: message }
        ];

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
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

    } catch (error) {
        console.error('Error in simulation:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
