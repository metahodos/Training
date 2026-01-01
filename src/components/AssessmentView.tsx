'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';

import { CheckCircle2, XCircle, AlertTriangle, Trophy } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

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
    badge?: { type: string; score: number };
}

export default function AssessmentView({ score, feedback, onRetry, badge }: AssessmentProps) {
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

                    {/* Badge Display */}
                    {badge && (
                        <div className="flex flex-col items-center justify-center p-6 bg-neutral-800/30 rounded-xl border border-neutral-700/50 animate-in zoom-in slide-in-from-bottom-5 duration-700 delay-300">
                            <div className="relative">
                                <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse" />
                                <Trophy className={`w-16 h-16 ${badge.type === 'GOLD' ? 'text-yellow-400' : badge.type === 'SILVER' ? 'text-gray-300' : 'text-amber-700'} relative z-10 drop-shadow-lg`} />
                            </div>
                            <h3 className="mt-4 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-500">
                                {badge.type === 'GOLD' ? 'Agile Master' : badge.type === 'SILVER' ? 'Agile Practitioner' : 'Agile Explorer'}
                            </h3>
                            <div className="flex gap-2 mt-2">
                                <Badge variant="outline" className="border-yellow-500/30 text-yellow-500 bg-yellow-500/10">
                                    {badge.score} Punti Totali
                                </Badge>
                                <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10">
                                    Badge {badge.type}
                                </Badge>
                            </div>
                        </div>
                    )}

                    {/* Analysis */}
                    <div className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <AlertTriangle className="text-yellow-500" size={18} />
                            Analisi dell&apos;IA
                        </h3>
                        <div className="text-sm text-gray-300 leading-relaxed prose prose-invert max-w-none">
                            <ReactMarkdown>
                                {feedback.analisi_critica}
                            </ReactMarkdown>
                        </div>
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
