'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Lock, PlayCircle, BookOpen, BrainCircuit } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import { markTheoryCompleted, submitQuiz } from '@/app/actions/progress';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface QuizOption {
    id: string;
    text: string;
    isCorrect?: boolean;
}

interface QuizQuestion {
    id: string;
    text: string;
    options: QuizOption[];
}

interface QuizData {
    questions: QuizQuestion[];
}

interface ScenarioData {
    id: string;
    initial_context: string;
    role_target: "SM" | "PO";
}

interface ProgressData {
    theory_completed: boolean;
    quiz_passed: boolean;
    simulation_completed: boolean;
}

interface ModuleViewProps {
    moduleId: string;
    moduleTitle: string;
    theoryContent: string;
    quiz: QuizData | undefined;
    scenario: ScenarioData | null | undefined;
    initialProgress: ProgressData;
}

export default function ModuleView({ moduleId, moduleTitle, theoryContent, quiz, scenario, initialProgress }: ModuleViewProps) {
    const router = useRouter();
    const [progress, setProgress] = useState<ProgressData>(initialProgress || { theory_completed: false, quiz_passed: false, simulation_completed: false });
    const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
    const [quizResult, setQuizResult] = useState<{ passed: boolean; score: number } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initial state sync (in case props update)
    useEffect(() => {
        if (initialProgress) setProgress(initialProgress);
    }, [initialProgress]);

    const handleMarkTheoryRead = async () => {
        setIsSubmitting(true);
        try {
            await markTheoryCompleted(moduleId);
            setProgress((p) => ({ ...p, theory_completed: true }));
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleQuizSubmit = async () => {
        setIsSubmitting(true);
        try {
            const answersArray = Object.entries(quizAnswers).map(([qId, aId]) => ({ questionId: qId, answerId: aId }));
            const result = await submitQuiz(moduleId, answersArray);

            if (result.success && result.passed !== undefined && result.score !== undefined) {
                setQuizResult({ passed: result.passed, score: result.score });

                if (result.passed) {
                    setProgress((p) => ({ ...p, quiz_passed: true }));
                    router.refresh();
                }
            } else {
                console.error("Quiz submission failed:", result.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full h-full space-y-6">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    {moduleTitle}
                </h1>
                <p className="text-neutral-400">Percorso di Certificazione Agile Industrial</p>
            </div>

            {/* 3-Column Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[700px]">

                {/* COLONNA 1: LEZIONE */}
                <Card className="bg-neutral-900 border-neutral-800 text-gray-100 flex flex-col h-full">
                    <CardHeader className="uppercase tracking-wider text-xs font-bold text-blue-500 border-b border-neutral-800/50 py-4">
                        <div className="flex items-center gap-2">
                            <BookOpen size={16} /> Fase 1: Teoria
                            {progress.theory_completed && <CheckCircle2 size={16} className="text-green-500 ml-auto" />}
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 relative">
                        <ScrollArea className="h-[600px] p-6">
                            <article className="prose prose-invert prose-sm max-w-none">
                                <ReactMarkdown>{theoryContent}</ReactMarkdown>
                            </article>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="border-t border-neutral-800 p-4 bg-neutral-900/50">
                        <Button
                            onClick={handleMarkTheoryRead}
                            disabled={progress.theory_completed || isSubmitting}
                            className={cn(
                                "w-full transition-all",
                                progress.theory_completed ? "bg-green-600/20 text-green-500 hover:bg-green-600/20 cursor-default" : "bg-blue-600 hover:bg-blue-700"
                            )}
                        >
                            {progress.theory_completed ? "Completata" : "Segna come letto"}
                        </Button>
                    </CardFooter>
                </Card>

                {/* COLONNA 2: QUIZ */}
                <div className={cn("relative flex flex-col h-full transition-all duration-500", !progress.theory_completed && "opacity-50 pointer-events-none")}>
                    {!progress.theory_completed && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[1px] rounded-xl border border-neutral-800">
                            <div className="text-center p-6">
                                <Lock className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
                                <p className="text-sm text-neutral-400 font-medium">Completa la teoria per sbloccare</p>
                            </div>
                        </div>
                    )}

                    <Card className="bg-neutral-900 border-neutral-800 text-gray-100 flex flex-col h-full">
                        <CardHeader className="uppercase tracking-wider text-xs font-bold text-purple-500 border-b border-neutral-800/50 py-4">
                            <div className="flex items-center gap-2">
                                <BrainCircuit size={16} /> Fase 2: Validazione
                                {progress.quiz_passed && <CheckCircle2 size={16} className="text-green-500 ml-auto" />}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-6 relative">
                            {quiz ? (
                                <ScrollArea className="h-[600px] pr-4">
                                    <div className="space-y-8">
                                        {quiz.questions.map((q: QuizQuestion, i: number) => (
                                            <div key={q.id} className="space-y-3">
                                                <h3 className="text-sm font-semibold text-white">{i + 1}. {q.text}</h3>
                                                <div className="grid gap-2">
                                                    {q.options.map((opt: QuizOption) => (
                                                        <div
                                                            key={opt.id}
                                                            onClick={() => !quizResult?.passed && setQuizAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                                                            className={cn(
                                                                "p-3 rounded border text-xs cursor-pointer transition-all",
                                                                quizAnswers[q.id] === opt.id
                                                                    ? "border-purple-500 bg-purple-500/10 text-purple-100"
                                                                    : "border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800",
                                                                quizResult && opt.isCorrect && "border-green-500 bg-green-500/10",
                                                                quizResult && !opt.isCorrect && quizAnswers[q.id] === opt.id && "border-red-500 bg-red-500/10"
                                                            )}
                                                        >
                                                            {opt.text}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {quizResult && (
                                        <div className={cn(
                                            "mt-6 p-3 rounded text-center font-bold text-sm",
                                            quizResult.passed ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                        )}>
                                            {quizResult.passed
                                                ? "Test Superato! Simulazione Sbloccata."
                                                : `Risultato: ${quizResult.score}/${quiz.questions.length}. Riprova per il 100%.`}
                                        </div>
                                    )}
                                </ScrollArea>
                            ) : (
                                <div className="text-center text-gray-500 mt-10">Nessun Quiz disponibile.</div>
                            )}
                        </CardContent>
                        <CardFooter className="border-t border-neutral-800 p-4 bg-neutral-900/50">
                            {quizResult?.passed ? (
                                <Button className="w-full bg-green-600/20 text-green-500 cursor-default hover:bg-green-600/20">
                                    Validazione Completata
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleQuizSubmit}
                                    disabled={!quiz || isSubmitting || Object.keys(quizAnswers).length < (quiz?.questions.length || 0)}
                                    className="w-full bg-purple-600 hover:bg-purple-700"
                                >
                                    Valida Competenze
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>

                {/* COLONNA 3: SIMULAZIONE */}
                <div className={cn("relative flex flex-col h-full transition-all duration-500", !progress.quiz_passed && "opacity-50 pointer-events-none")}>
                    {!progress.quiz_passed && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[1px] rounded-xl border border-neutral-800">
                            <div className="text-center p-6">
                                <Lock className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
                                <p className="text-sm text-neutral-400 font-medium">Supera il Quiz al 100% per sbloccare</p>
                            </div>
                        </div>
                    )}

                    <Card className="bg-neutral-900 border-neutral-800 text-gray-100 flex flex-col h-full overflow-hidden">
                        <CardHeader className="uppercase tracking-wider text-xs font-bold text-orange-500 border-b border-neutral-800/50 py-4">
                            <div className="flex items-center gap-2">
                                <PlayCircle size={16} /> Fase 3: Scenario AI
                                {progress.simulation_completed && <CheckCircle2 size={16} className="text-green-500 ml-auto" />}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 relative flex flex-col">
                            {scenario ? (
                                <div className="flex-1 flex flex-col min-h-0 bg-neutral-950">
                                    {/* Chat Interface wrapped in a container that fits the card */}
                                    <div className="flex-1 overflow-hidden relative">
                                        {/* Ideally pass a specific prop 'compact' to ChatInterface if possible, or just style it via CSS overrides in parent */}
                                        <div className="absolute inset-0 overflow-y-auto">
                                            <ChatInterface
                                                scenarioId={scenario.id}
                                                initialContext={scenario.initial_context || ''}
                                                role={scenario.role_target || 'SM'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 p-6">Nessuno scenario collegato.</div>
                            )}
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
