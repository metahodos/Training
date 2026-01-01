'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Zap } from 'lucide-react';

export default function SimulationRunner({ scenarioId, moduleId }: { scenarioId: string, moduleId: string }) {
    const [started, setStarted] = useState(false);
    const router = useRouter();

    const handleStart = () => {
        setStarted(true);
        // Placeholder for AI conversation logic
        // We will integrate the existing AI Chat component here later.
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden min-h-[400px] flex flex-col items-center justify-center p-8">
            {!started ? (
                <div className="text-center">
                    <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Bot className="w-10 h-10 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Start Experience</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        Engage with an AI Roleplayer to practice your skills. You will be scored based on your effectiveness.
                    </p>
                    <button
                        onClick={handleStart}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-transform hover:scale-105"
                    >
                        Start Simulation
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-xl font-semibold">Simulation Active</h3>
                    <p className="text-gray-500 mt-2">AI Integration Coming Soon.</p>

                    {/* Custom message for Module 4 */}
                    {moduleId && moduleId.includes('mdl-04') || scenarioId && scenarioId.includes("sprint") ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                            <p className="text-green-800 font-medium">Sprint completato con successo. Hai dimostrato la flessibilità richiesta dal metodo QuickWorks.</p>
                        </div>
                    ) : null}

                    {/* Custom message for Module 5 */}
                    {moduleId && moduleId.includes('mdl-05') || scenarioId && scenarioId.includes("silos") ? (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                            <p className="text-blue-800 font-medium">Visual Management attivato. La trasparenza è stata ristabilita nell'Obeya Room.</p>
                        </div>
                    ) : null}

                    {/* Temporary Demo Complete Button */}
                    <button
                        onClick={async () => {
                            if (moduleId && moduleId.includes('mdl-05')) {
                                const { addSkillToProfile } = await import('@/app/actions/profile');
                                await addSkillToProfile('Visual Management');
                                alert("Skill 'Visual Management' added to profile!");
                            }
                        }}
                        className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300"
                    >
                        [DEV: Sync Result / Add Skill]
                    </button>

                    <button
                        onClick={() => router.push(`/modules/${moduleId}`)}
                        className="mt-8 text-sm text-indigo-600 hover:underline block mx-auto"
                    >
                        Return to Module
                    </button>
                </div>
            )}
        </div>
    );
}
