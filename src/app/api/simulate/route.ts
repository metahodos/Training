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
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch scenario details (mocking for now if DB is empty, but ideally fetch from DB)
        // const { data: scenario } = await supabase.from('scenarios').select('*').eq('id', scenarioId).single();

        // System Prompt Construction
        const systemPrompt = `
    Role: You are an expert Agile Coach and sophisticated simulation engine.
    Objective: Run a roleplay scenario where the user plays the role of a ${role} (e.g., Scrum Master).
    Context: You are simulating a specific scenario. React realistically.
    Persona: You are acting as the team members or stakeholders. Do not break character.
    Current Scenario Context: (Dynamic context would go here)
    Rules:
    1. React realistically to the user's interventions.
    2. Be brief and conversational.
    3. If the user successfully resolves the conflict OR fails critically, mark the end of the simulation by appending [SIMULATION_END] to your response.
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
