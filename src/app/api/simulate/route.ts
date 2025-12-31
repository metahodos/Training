import { OpenAI } from 'openai';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { message, history, scenarioId, role } = await req.json();

        const supabase = await createClient();

        // In a real app, validating the user is crucial
        const { data: { user } } = await supabase.auth.getUser();

        // DEV MODE: Allow anonymous simulation for testing
        // if (!user) {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        // Fetch scenario details (mocking for now if DB is empty, but ideally fetch from DB)
        // const { data: scenario } = await supabase.from('scenarios').select('*').eq('id', scenarioId).single();

        // System Prompt Construction - INDUSTRIAL AGILE
        const systemPrompt = `
    Ruolo: Sei un Agile Coach esperto in ambito INDUSTRIALE e MANIFATTURIERO.
    Obiettivo: Gestire una simulazione di roleplay dove l'utente è uno ${role} (es. Scrum Master, PO) in una fabbrica o impianto.
    
    Contesto Attuale: Stai simulando uno scenario specifico di produzione hardware.
    Persona: Interpreta i membri del team (operai, ingegneri meccanici, stakeholder di stabilimento).
    
    Regole:
    1. Reagisci realisticamente. Se l'utente propone cose impossibili (es. "cambiamo il design domani"), gli ingegneri devono protestare per i tempi di stampaggio.
    2. Sii breve e colloquiale (Italiano).
    3. Se l'utente risolve il conflitto O fallisce gravemente, termina la risposta con [SIMULATION_END].
    `;

        const messages = [
            { role: 'system', content: systemPrompt },
            ...history,
            { role: 'user', content: message }
        ];

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: messages as any,
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
