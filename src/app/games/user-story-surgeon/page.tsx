'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Activity, Stethoscope } from 'lucide-react';

const BAD_STORY = "Come utente voglio che il sito sia veloce.";

export default function SurgeonGame() {
    const [attempt, setAttempt] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const checkSurgery = async () => {
        setLoading(true);
        // Mock AI check for now (replace with Server Action later)
        setTimeout(() => {
            if (attempt.toLowerCase().includes('come') && attempt.toLowerCase().includes('voglio') && attempt.toLowerCase().includes('affinché')) {
                setFeedback("Ottimo lavoro! Hai usato il formato standard e specificato il valore.");
            } else {
                setFeedback("Attenzione: La User Story dovrebbe seguire il formato 'Come <ruolo>, voglio <funzionalità>, affinché <valore>'.");
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="container mx-auto p-8 max-w-4xl text-white">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Stethoscope className="text-red-500" />
                Il Chirurgo delle User Story
            </h1>

            <Card className="bg-neutral-900 border-neutral-800 text-white mb-8">
                <CardHeader>
                    <CardTitle className="text-red-400">Paziente in codice rosso!</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-lg mb-4">
                        <p className="font-mono text-lg">"{BAD_STORY}"</p>
                    </div>
                    <p className="text-gray-400 mb-4">
                        Questa User Story è vaga, indimostrabile e manca di valore. Riscrivila usando i criteri INVEST.
                    </p>

                    <Textarea
                        value={attempt}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAttempt(e.target.value)}
                        placeholder="Scrivi qui la tua versione corretta..."
                        className="bg-neutral-950 border-neutral-700 min-h-[100px] mb-4"
                    />

                    <Button
                        onClick={checkSurgery}
                        disabled={loading || !attempt}
                        className="w-full bg-red-600 hover:bg-red-700"
                    >
                        {loading ? <Activity className="animate-pulse" /> : "Opera il Paziente"}
                    </Button>

                    {feedback && (
                        <div className={`mt-6 p-4 rounded-lg border ${feedback.includes('Ottimo') ? 'bg-green-950/30 border-green-900' : 'bg-yellow-950/30 border-yellow-900'}`}>
                            <p>{feedback}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
