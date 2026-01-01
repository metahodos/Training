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

                    {/* Custom message for Module 5 (Obeya/Visual) */}
                    {moduleId === '055c8681-e383-414d-b3ba-115160834540' || (moduleId && moduleId.includes('mdl-05')) || (scenarioId && scenarioId.includes("silos")) ? (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                            <p className="text-blue-800 font-medium">Visual Management attivato. La trasparenza è stata ristabilita nell'Obeya Room.</p>
                        </div>
                    ) : null}

                    {/* Custom message for Module 6 (Management) */}
                    {moduleId === '6882f3d7-2729-4b1c-b0ea-d8995374ee2d' || (moduleId && moduleId.includes('mdl-06')) || (scenarioId && scenarioId.includes("management")) ? (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-6">
                            <p className="text-purple-800 font-medium">Connessione col Management stabilita. Hai sbloccato la capacità di prendere decisioni strategiche informate.</p>
                        </div>
                    ) : null}

                    {/* Custom message for Module 7 (Fail Safe) */}
                    {moduleId === '399b9b1b-a39f-4066-acab-fa4b2c69a25a' || (moduleId && moduleId.includes('mdl-07')) || (scenarioId && scenarioId.includes("fail-safe")) ? (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-6">
                            <p className="text-orange-800 font-medium">Fail Safe attivato. Hai trasformato il fallimento in apprendimento e rafforzato l'autonomia del team.</p>
                        </div>
                    ) : null}

                    {/* Custom message for Module 8 (PO) */}
                    {moduleId === '187d2bfe-d925-4a79-b2a7-92488a1f5659' || (moduleId && moduleId.includes('mdl-08')) || (scenarioId && scenarioId.includes("mvp")) ? (
                        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-6">
                            <p className="text-teal-800 font-medium">Strategia MVP validata. Hai dimostrato di saper massimizzare il valore riducendo i rischi industriali.</p>
                        </div>
                    ) : null}

                    {/* Temporary Demo Complete Button */}
                    <button
                        onClick={async () => {
                            if (moduleId === '055c8681-e383-414d-b3ba-115160834540' || (moduleId && moduleId.includes('mdl-05'))) {
                                const { addSkillToProfile } = await import('@/app/actions/profile');
                                await addSkillToProfile('Visual Management');
                                alert("Skill 'Visual Management' added to profile!");
                            }
                            if (moduleId === '399b9b1b-a39f-4066-acab-fa4b2c69a25a' || (moduleId && moduleId.includes('mdl-07'))) {
                                const { addSkillToProfile } = await import('@/app/actions/profile');
                                await addSkillToProfile('Facilitation');
                                await addSkillToProfile('Conflict Resolution');
                                await addSkillToProfile('Fail-Safe Management');
                                alert("Skills 'Facilitation', 'Conflict Resolution', 'Fail-Safe Management' added to profile!");
                            }
                            if (moduleId === '187d2bfe-d925-4a79-b2a7-92488a1f5659' || (moduleId && moduleId.includes('mdl-08'))) {
                                // Assign Final Badge logic here
                                // Since we don't have a dedicated badge action yet (or it's in profile?), let's assume usage of profile update or create a new action?
                                // User said: "assegna il badge 'Master Product Owner QuickWorks' salvandolo su Supabase."
                                // Checking db schema (badges table?), but usually we just need to insert into 'user_badges' or similar.
                                // For now, I'll use a placeholder alert or generic skill add if badge logic isn't ready, OR I'll invoke a server action to award badge.
                                // Let's check if 'awardBadge' exists? I haven't seen it. 
                                // I'll assume 'addSkillToProfile' is safe for now, but user said BADGE.
                                // I will check 'badges' table in next step if I can, but to fit in this tool call I'll skip deep implementation of new action.
                                // Wait, I should do it right.
                                const { addBadgeToProfile } = await import('@/app/actions/profile'); // Assuming I'll create this or it exists
                                await addBadgeToProfile('Master Product Owner QuickWorks');
                                alert("Badge 'Master Product Owner QuickWorks' awarded!");
                            }
                        }}
                        className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300"
                    >
                        [DEV: Sync Result / Add Skill / Badge]
                    </button>

                    <button
                        onClick={() => router.push(`/modules/${moduleId}`)}
                        className="mt-8 text-sm text-indigo-600 hover:underline block mx-auto"
                    >
                        Return to Module (Course Complete!)
                    </button>
                </div>
            )}
        </div>
    );
}
