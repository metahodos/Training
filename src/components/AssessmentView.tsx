'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface AssessmentProps {
    score: number;
    feedback: {
        punteggio_globale: number;
        punteggio_tecnico: number;
        punteggio_soft_skills: number;
        analisi_critica: string;
        punti_forza: string[];
        aree_miglioramento: string[];
    };
    onRetry: () => void;
}

export default function AssessmentView({ score, feedback, onRetry }: AssessmentProps) {
    return (
        <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in duration-500">
            <Card className="bg-neutral-900 border-neutral-800 text-white overflow-hidden">
                <div className={`h-2 w-full ${score >= 70 ? 'bg-green-500' : 'bg-red-500'}`} />
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-3xl font-bold">
                        {score >= 70 ? 'Missione Compiuta! 🚀' : 'Missione Fallita 💀'}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Punteggio Performance
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">

                    {/* Score Circle */}
                    <div className="flex justify-center">
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle
                                    className="text-neutral-800 stroke-current"
                                    strokeWidth="8"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                ></circle>
                                <circle
                                    className={`${score >= 70 ? 'text-green-500' : 'text-red-500'} progress-ring__circle stroke-current`}
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    strokeDasharray={`${2 * Math.PI * 40}`}
                                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
                                    transform="rotate(-90 50 50)"
                                ></circle>
                            </svg>
                            <span className="absolute text-4xl font-bold">{score}</span>
                        </div>
                    </div>

                    {/* Analysis */}
                    <div className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <AlertTriangle className="text-yellow-500" size={18} />
                            Analisi dell&apos;IA
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {feedback.analisi_critica}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Strengths */}
                        <div className="space-y-2">
                            <h4 className="font-medium text-green-400 flex items-center gap-2">
                                <CheckCircle2 size={16} /> Punti di Forza
                            </h4>
                            <ul className="text-sm space-y-1 text-gray-400">
                                {feedback.punti_forza.map((s, i) => (
                                    <li key={i}>• {s}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Improvements */}
                        <div className="space-y-2">
                            <h4 className="font-medium text-red-400 flex items-center gap-2">
                                <XCircle size={16} /> Aree di Miglioramento
                            </h4>
                            <ul className="text-sm space-y-1 text-gray-400">
                                {feedback.aree_miglioramento.map((s, i) => (
                                    <li key={i}>• {s}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button onClick={onRetry} variant="outline" className="flex-1 border-neutral-700 hover:bg-neutral-800 text-white">
                            Riprova Scenario
                        </Button>
                        <Link href="/" className="flex-1">
                            <Button className="w-full bg-white text-black hover:bg-gray-200">
                                Torna alla Dashboard
                            </Button>
                        </Link>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
