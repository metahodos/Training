import ChatInterface from '@/components/ChatInterface';

export default function SimulatorPage() {
    // Hardcoded for the MVP demo, will be dynamic later
    const scenario = {
        id: "demo-scenario-1",
        role: "SM" as const,
        initialContext: "Start simulation: You are a Junior Scrum Master. It's 10:00 AM. Your team is gathered for the Daily Scrum. The Lead Developer, Alex, is looking at their phone and clearly not paying attention. The Junior Dev just finished speaking. What do you do?"
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-5xl mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Simulation Room</h1>
                <p className="text-gray-400">Interact with the team. Remember your goal is to facilitate, not dictate.</p>
            </div>

            <ChatInterface
                scenarioId={scenario.id}
                initialContext={scenario.initialContext}
                role={scenario.role}
            />
        </div>
    );
}
