'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Activity, Stethoscope } from 'lucide-react';

// Mock Data - Industrial Examples
const BAD_STORIES = [
    {
        id: 1,
        text: "L'operatore deve poter premere il pulsante rosso così la macchina si ferma.",
        issues: ["Manca il 'Perché' (Valore)", "Troppo prescrittiva sulla soluzione (pulsante rosso)", "Chi è l'utente esattamente?"],
        hint: "Usa il formato: Come <ruolo> voglio <azione> affinché <valore>. Non decidere tu il colore del pulsante."
    },
    {
        id: 2,
        text: "Voglio che il robot vada più veloce per produrre di più.",
        issues: ["Vago ('più veloce' quanto?)", "Mancano criteri di accettazione", "Manca il criterio di sicurezza"],
        hint: "Specifica il target misurabile e i vincoli di sicurezza."
    },
    {
        id: 3,
        text: "Il sistema di visione deve rilevare i difetti.",
        issues: ["Quali difetti?", "In quali condizioni di luce?", "Troppo epica, non stimabile"],
        hint: "È troppo grande. Focalizzati su un tipo specifico di difetto per iniziare (MVP)."
    }
];

export default function UserStorySurgeon() {
    const [currentStoryIndex] = useState(0);
    const [userRewrite, setUserRewrite] = useState('');
    const [feedback, setFeedback] = useState<{ score: number; analysis: string; invest_check: { independent: boolean; negotiable: boolean; valuable: boolean; estimable: boolean; small: boolean; testable: boolean } } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const currentStory = BAD_STORIES[currentStoryIndex];

    const handleAnalyze = async () => {
        setIsLoading(true);
        // Mock AI Evaluation for Industrial Context
        setTimeout(() => {
            const score = userRewrite.toLowerCase().includes('affinché') || userRewrite.toLowerCase().includes('perché') ? 85 : 40;
            setFeedback({
                score,
                analysis: score > 50
                    ? "Ottimo! Hai catturato il bisogno dell'operatore e il valore di business (sicurezza/produttività)."
                    : "Attenzione: Manca ancora il 'Perché'. Senza il valore, l'ingegnere non sa come ottimizzare la soluzione.",
                invest_check: {
                    independent: true,
                    negotiable: true,
                    valuable: score > 50,
                    estimable: true,
                    small: true,
                    testable: true
                }
            });
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-neutral-950 p-8 text-white flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3 text-green-500">
                <Stethoscope size={40} />
                Il Chirurgo delle User Story
            </h1>
            <p className="text-gray-400 mb-8 text-lg">Trasforma requisiti industriali vaghi in User Story &apos;INVEST&apos; perfette.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
                {/* Patient Chart */}
                <Card className="bg-neutral-900 border-neutral-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-400">
                            <Activity className="animate-pulse" />
                            Paziente #{currentStory.id}: Requisito Malato
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-6 bg-red-950/30 border border-red-900/50 rounded-xl">
                            <h3 className="text-sm font-semibold text-red-500 mb-2 uppercase tracking-wider">Sintomi (Testo Originale)</h3>
                            <p className="text-xl font-mono text-red-200">&quot;{currentStory.text}&quot;</p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-300">Diagnosi (Problemi Rilevati):</h3>
                            <ul className="space-y-2">
                                {currentStory.issues.map((issue, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-400 bg-neutral-800/50 p-2 rounded">
                                        <span className="w-2 h-2 rounded-full bg-red-500" />
                                        {issue}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-blue-950/30 p-4 rounded-lg border border-blue-900/50">
                            <p className="text-blue-300 text-sm">💡 <span className="font-bold">Suggerimento del Primario:</span> {currentStory.hint}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Operating Table */}
                <Card className="bg-neutral-900 border-neutral-800">
                    <CardHeader>
                        <CardTitle className="text-green-400">Sala Operatoria</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Riscrivi la User Story corretta:</label>
                            <Textarea
                                value={userRewrite}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserRewrite(e.target.value)}
                                placeholder="Come <ruolo>, voglio <azione>, affinché <valore>..."
                                className="min-h-[150px] bg-neutral-950 border-neutral-700 font-mono text-lg focus:ring-green-500/50"
                            />
                        </div>

                        <Button
                            onClick={handleAnalyze}
                            disabled={!userRewrite || isLoading}
                            className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-bold shadow-lg shadow-green-900/20"
                        >
                            {isLoading ? 'Analisi in corso...' : 'Finalizza Operazione ⚡'}
                        </Button>

                        {feedback && (
                            <div className={`p-6 rounded-xl border ${feedback.score > 50 ? 'bg-green-950/30 border-green-900' : 'bg-red-950/30 border-red-900'} animate-in fade-in slide-in-from-bottom-4`}>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className={`text-xl font-bold ${feedback.score > 50 ? 'text-green-400' : 'text-red-400'}`}>
                                        {feedback.score > 50 ? 'Operazione Riuscita! ✅' : 'Complicazioni... ⚠️'}
                                    </h3>
                                    <span className="text-2xl font-mono">{feedback.score}/100</span>
                                </div>
                                <p className="text-gray-300 mb-4 leading-relaxed">{feedback.analysis}</p>

                                {feedback.score > 50 && (
                                    <div className="grid grid-cols-3 gap-2 mt-4">
                                        <div className="bg-neutral-800 p-2 rounded text-center text-xs text-gray-400">Indipendente ✅</div>
                                        <div className="bg-neutral-800 p-2 rounded text-center text-xs text-gray-400">Negoziabile ✅</div>
                                        <div className="bg-neutral-800 p-2 rounded text-center text-xs text-gray-400">Preziosa ✅</div>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
