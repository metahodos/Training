'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Lock, PlayCircle, BookOpen, BrainCircuit } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import { markTheoryCompleted, submitQuiz } from '@/app/actions/progress';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ModuleViewProps {
    moduleId: string;
    moduleTitle: string;
    theoryContent: string;
    quiz: any;
    scenario: any;
    initialProgress: any;
}

export default function ModuleView({ moduleId, moduleTitle, theoryContent, quiz, scenario, initialProgress }: ModuleViewProps) {
    const router = useRouter();
    const [progress, setProgress] = useState(initialProgress || { theory_completed: false, quiz_passed: false, simulation_completed: false });
    const [activeTab, setActiveTab] = useState<'theory' | 'quiz' | 'practice'>('theory');
    const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
    const [quizResult, setQuizResult] = useState<{ passed: boolean; score: number } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (progress.quiz_passed && scenario) {
            setActiveTab('practice');
        } else if (progress.theory_completed && quiz) {
            setActiveTab('quiz');
        }
    }, []);

    const handleMarkTheoryRead = async () => {
        setIsSubmitting(true);
        try {
            await markTheoryCompleted(moduleId);
            setProgress((p: any) => ({ ...p, theory_completed: true }));
            setActiveTab('quiz');
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
                    setProgress((p: any) => ({ ...p, quiz_passed: true }));
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
        <div className="w-full max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        {moduleTitle}
                    </h1>
                    <p className="text-neutral-400">Educational Core v1.0</p>
                </div>

                <div className="flex bg-neutral-900 p-1 rounded-lg border border-neutral-800">
                    <button
                        onClick={() => setActiveTab('theory')}
                        className={cn(
                            "px-4 py-2 rounded-md flex items-center gap-2 transition-all",
                            activeTab === 'theory' ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-white"
                        )}
                    >
                        <BookOpen size={16} />
                        Theory
                        {progress.theory_completed && <CheckCircle2 size={14} className="text-green-500" />}
                    </button>
                    <button
                        onClick={() => progress.theory_completed && setActiveTab('quiz')}
                        disabled={!progress.theory_completed}
                        className={cn(
                            "px-4 py-2 rounded-md flex items-center gap-2 transition-all",
                            activeTab === 'quiz' ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400",
                            !progress.theory_completed && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <BrainCircuit size={16} />
                        Quiz
                        {progress.quiz_passed ? <CheckCircle2 size={14} className="text-green-500" /> : !progress.theory_completed && <Lock size={14} />}
                    </button>
                    <button
                        onClick={() => progress.quiz_passed && setActiveTab('practice')}
                        disabled={!progress.quiz_passed}
                        className={cn(
                            "px-4 py-2 rounded-md flex items-center gap-2 transition-all",
                            activeTab === 'practice' ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400",
                            !progress.quiz_passed && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <PlayCircle size={16} />
                        Practice
                        {!progress.quiz_passed && <Lock size={14} />}
                    </button>
                </div>
            </div>

            <div className="min-h-[600px]">
                {activeTab === 'theory' && (
                    <Card className="bg-neutral-900 border-neutral-800 text-gray-100">
                        <CardHeader>
                            <CardTitle className="text-2xl font-light">Lezione Teorica</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[500px] pr-4">
                                <article className="prose prose-invert max-w-none">
                                    <ReactMarkdown>{theoryContent}</ReactMarkdown>
                                </article>
                            </ScrollArea>
                        </CardContent>
                        <CardFooter className="border-t border-neutral-800 pt-6 flex justify-end">
                            {progress.theory_completed ? (
                                <Button onClick={() => setActiveTab('quiz')} className="bg-green-600 hover:bg-green-700">
                                    Vai al Quiz
                                </Button>
                            ) : (
                                <Button onClick={handleMarkTheoryRead} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                                    Ho completato la lettura
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                )}

                {activeTab === 'quiz' && quiz && (
                    <Card className="bg-neutral-900 border-neutral-800 text-gray-100">
                        <CardHeader>
                            <CardTitle className="text-2xl font-light">Verifica delle Competenze</CardTitle>
                            <CardDescription>Rispondi correttamente a tutte le domande per sbloccare la simulazione.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {quiz.questions.map((q: any, i: number) => (
                                <div key={q.id} className="space-y-4">
                                    <h3 className="text-lg font-medium text-white">{i + 1}. {q.text}</h3>
                                    <div className="grid gap-3">
                                        {q.options.map((opt: any) => (
                                            <div
                                                key={opt.id}
                                                onClick={() => !quizResult?.passed && setQuizAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                                                className={cn(
                                                    "p-4 rounded-lg border cursor-pointer transition-all",
                                                    quizAnswers[q.id] === opt.id
                                                        ? "border-blue-500 bg-blue-500/10 text-blue-100"
                                                        : "border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800",
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

                            {quizResult && (
                                <div className={cn(
                                    "p-4 rounded-lg text-center font-bold text-lg",
                                    quizResult.passed ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                )}>
                                    {quizResult.passed
                                        ? "Quiz Superato! Simulazione Sbloccata."
                                        : `Hai totalizzato ${quizResult.score}/${quiz.questions.length}. Riprova.`}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="border-t border-neutral-800 pt-6 flex justify-end">
                            {quizResult?.passed ? (
                                <Button onClick={() => setActiveTab('practice')} className="bg-green-600 hover:bg-green-700 animate-pulse">
                                    Accedi alla Simulazione
                                </Button>
                            ) : (
                                <Button onClick={handleQuizSubmit} disabled={isSubmitting || Object.keys(quizAnswers).length < quiz.questions.length} className="bg-blue-600 hover:bg-blue-700">
                                    Invia Risposte
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                )}

                {activeTab === 'practice' && scenario && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ChatInterface
                            scenarioId={scenario.id}
                            initialContext={scenario.initial_context || ''}
                            role={scenario.role_target || 'SM'}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
