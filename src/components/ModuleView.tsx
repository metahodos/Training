'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, Lock, PlayCircle, BookOpen, BrainCircuit, ChevronRight } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import { markTheoryCompleted, submitQuiz } from '@/app/actions/progress';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Lesson } from '@/lib/data/theory';

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
    lessons: Lesson[];
    quiz: QuizData | undefined;
    scenario: ScenarioData | null | undefined;
    initialProgress: ProgressData;
}

export default function ModuleView({ moduleId, moduleTitle, lessons, quiz, scenario, initialProgress }: ModuleViewProps) {
    const router = useRouter();
    const [progress, setProgress] = useState<ProgressData>(initialProgress || { theory_completed: false, quiz_passed: false, simulation_completed: false });
    const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
    const [quizResult, setQuizResult] = useState<{ passed: boolean; score: number } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Lesson State
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [readLessons, setReadLessons] = useState<Set<string>>(new Set());

    // Initial state sync
    useEffect(() => {
        if (initialProgress) {
            setProgress(initialProgress);
            if (initialProgress.theory_completed) {
                // If already completed server-side, mark all as read locally
                setReadLessons(new Set(lessons.map(l => l.id)));
            }
        }
    }, [initialProgress, lessons]);

    const currentLesson = lessons[currentLessonIndex];


    // --- LOGIC: Unlocking & Persistence ---

    const handleMarkLessonRead = async () => {
        const newReadSet = new Set(readLessons);
        newReadSet.add(currentLesson.id);
        setReadLessons(newReadSet);

        // Check if this was the last lesson
        const isNowAllRead = lessons.every(l => newReadSet.has(l.id));

        if (isNowAllRead && !progress.theory_completed) {
            setIsSubmitting(true);
            // Optimistic Update
            const newProgress = { ...progress, theory_completed: true };
            setProgress(newProgress);

            try {
                await markTheoryCompleted(moduleId);
                router.refresh(); // Sync server state
            } catch (error) {
                console.error("Failed to save progress", error);
            } finally {
                setIsSubmitting(false);
            }
        } else if (currentLessonIndex < lessons.length - 1) {
            // Auto-advance to next lesson if not the last one
            setCurrentLessonIndex(prev => prev + 1);
        }
    };

    const handleQuizSubmit = async () => {
        setIsSubmitting(true);
        try {
            const answersArray = Object.entries(quizAnswers).map(([qId, aId]) => ({ questionId: qId, answerId: aId }));
            // We use the server action for validation to be secure
            const result = await submitQuiz(moduleId, answersArray);

            if (result.success && result.passed !== undefined && result.score !== undefined) {
                setQuizResult({ passed: result.passed, score: result.score });

                if (result.passed) {
                    setProgress((p) => ({ ...p, quiz_passed: true }));
                    router.refresh(); // Sync sidebar/server
                }
            } else {
                console.error("Quiz result invalid:", result);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- VISUALS: State Helpers ---

    const getCardStatus = (step: 'theory' | 'quiz' | 'sim'): 'locked' | 'active' | 'completed' => {
        if (step === 'theory') {
            return progress.theory_completed ? 'completed' : 'active';
        }
        if (step === 'quiz') {
            if (!progress.theory_completed) return 'locked';
            return progress.quiz_passed ? 'completed' : 'active';
        }
        if (step === 'sim') {
            if (!progress.quiz_passed) return 'locked';
            return progress.simulation_completed ? 'completed' : 'active';
        }
        return 'locked';
    };

    const getCardStyles = (status: 'locked' | 'active' | 'completed') => {
        switch (status) {
            case 'locked':
                return "border-neutral-800 bg-neutral-900/40 text-neutral-500 opacity-70 pointer-events-none";
            case 'active':
                return "border-blue-500 ring-1 ring-blue-500/20 bg-neutral-900 text-white shadow-lg shadow-blue-900/20";
            case 'completed':
                return "border-green-600/50 bg-green-950/10 text-gray-200";
            default:
                return "border-neutral-800";
        }
    };

    const theoryStatus = getCardStatus('theory');
    const quizStatus = getCardStatus('quiz');
    const simStatus = getCardStatus('sim');

    return (
        <div className="w-full h-full space-y-6">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    {moduleTitle}
                </h1>
                <p className="text-neutral-400">Percorso di Certificazione Agile Industrial</p>
            </div>

            {/* 3-COLUMN GRID SYSTEM */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[700px]">

                {/* COL 1: MASTERY AREA (Multi-Lesson) */}
                <Card className={cn("flex flex-col h-full transition-all duration-300", getCardStyles(theoryStatus))}>
                    <CardHeader className="py-4 border-b border-white/5">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 uppercase tracking-wider text-xs font-bold text-blue-400">
                                <BookOpen size={16} /> 1. Mastery
                            </span>
                            {theoryStatus === 'completed' && <CheckCircle2 size={18} className="text-green-500" />}
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 relative min-h-0 flex flex-col md:flex-row h-full">
                        {/* Sub-Navigation (Left Side of Card) */}
                        <div className="w-full md:w-1/3 border-r border-white/5 bg-black/20 overflow-y-auto">
                            <div className="p-3 space-y-1">
                                <p className="text-xs font-semibold text-neutral-500 mb-2 px-2 uppercase tracking-wider">Lezioni</p>
                                {lessons.map((lesson, idx) => {
                                    const isRead = readLessons.has(lesson.id);
                                    const isActive = idx === currentLessonIndex;
                                    return (
                                        <button
                                            key={lesson.id}
                                            onClick={() => setCurrentLessonIndex(idx)}
                                            className={cn(
                                                "w-full text-left px-3 py-2 rounded-md text-sm transition-all flex items-center justify-between group",
                                                isActive ? "bg-blue-500/10 text-blue-300 font-medium" : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200"
                                            )}
                                        >
                                            <span className="whitespace-normal break-words pr-2 text-left leading-tight">{idx + 1}. {lesson.title}</span>
                                            {isRead && <CheckCircle2 size={12} className="text-green-500 shrink-0" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Content Area (Right Side of Card) */}
                        <div className="flex-1 flex flex-col h-full overflow-hidden">
                            <ScrollArea className="flex-1 p-6 text-sm leading-relaxed h-[500px]">
                                <article className="prose prose-invert prose-sm max-w-none text-gray-300">
                                    <h2 className="text-xl font-bold mb-4 text-blue-100 flex items-center gap-2">
                                        <span className="text-blue-500/50">#{currentLessonIndex + 1}</span>
                                        {currentLesson.title}
                                    </h2>
                                    <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                                </article>
                            </ScrollArea>

                            <div className="p-4 border-t border-white/5 bg-white/5 flex justify-between items-center">
                                <span className="text-xs text-neutral-500">
                                    {readLessons.size} / {lessons.length} completate
                                </span>
                                <Button
                                    onClick={handleMarkLessonRead}
                                    disabled={readLessons.has(currentLesson.id) && theoryStatus !== 'completed'}
                                    size="sm"
                                    className={cn("transition-all",
                                        readLessons.has(currentLesson.id)
                                            ? "bg-green-600/20 text-green-400 hover:bg-green-600/20"
                                            : "bg-blue-600 hover:bg-blue-500 text-white"
                                    )}
                                >
                                    {readLessons.has(currentLesson.id) ? "Letta" : "Segna come Letta"}
                                    {!readLessons.has(currentLesson.id) && <ChevronRight size={14} className="ml-1" />}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    {/* Main Footer removed as per-lesson action handles progress */}
                </Card>

                {/* COL 2: VALIDAZIONE TECNICA */}
                <div className="relative h-full">
                    {quizStatus === 'locked' && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-xl border border-neutral-800">
                            <div className="p-4 bg-neutral-900 rounded-full mb-3 border border-neutral-800">
                                <Lock className="w-6 h-6 text-neutral-500" />
                            </div>
                            <span className="text-sm font-medium text-neutral-400">Completa tutte le lezioni</span>
                        </div>
                    )}
                    <Card className={cn("flex flex-col h-full transition-all duration-300", getCardStyles(quizStatus))}>
                        <CardHeader className="py-4 border-b border-white/5">
                            <div className="flex items-center justify-between">
                                <span className={cn("flex items-center gap-2 uppercase tracking-wider text-xs font-bold", quizStatus === 'active' ? "text-purple-400" : "text-gray-500")}>
                                    <BrainCircuit size={16} /> 2. Validazione
                                </span>
                                {quizStatus === 'completed' && <CheckCircle2 size={18} className="text-green-500" />}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-6 relative">
                            {quiz ? (
                                <ScrollArea className="h-[600px] pr-4">
                                    <div className="space-y-8">
                                        {quiz.questions.map((q: QuizQuestion, i: number) => (
                                            <div key={q.id} className="space-y-3">
                                                <h3 className="text-sm font-medium text-white/90">{i + 1}. {q.text}</h3>
                                                <div className="grid gap-2">
                                                    {q.options.map((opt: QuizOption) => {
                                                        const isSelected = quizAnswers[q.id] === opt.id;
                                                        const isCorrect = quizResult?.passed && opt.isCorrect;
                                                        const isWrong = quizResult && !opt.isCorrect && isSelected;

                                                        return (
                                                            <div
                                                                key={opt.id}
                                                                onClick={() => !quizResult?.passed && setQuizAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                                                                className={cn(
                                                                    "p-3 rounded border text-xs cursor-pointer transition-all",
                                                                    isSelected ? "border-purple-500 bg-purple-500/10 text-purple-100" : "border-white/10 hover:bg-white/5 hover:border-white/20 text-gray-400",
                                                                    isCorrect && "border-green-500 bg-green-500/10 text-green-100",
                                                                    isWrong && "border-red-500 bg-red-500/10 text-red-100"
                                                                )}
                                                            >
                                                                {opt.text}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {quizResult && (
                                        <div className={cn(
                                            "mt-6 p-4 rounded border text-center font-bold text-sm animate-in fade-in slide-in-from-bottom-2",
                                            quizResult.passed ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"
                                        )}>
                                            {quizResult.passed
                                                ? "Test Superato! Scenario Sbloccato."
                                                : `Punteggio: ${quizResult.score} / ${quiz.questions.length}. Riprova per il 100%.`}
                                        </div>
                                    )}
                                </ScrollArea>
                            ) : (
                                <div className="text-center text-gray-500 mt-10">Nessun Quiz disponibile.</div>
                            )}
                        </CardContent>
                        <CardFooter className="p-4 bg-white/5 border-t border-white/5">
                            {quizStatus === 'completed' ? (
                                <Button className="w-full bg-green-600/20 text-green-400 border border-green-600/20 cursor-default">Validazione Completata</Button>
                            ) : (
                                <Button
                                    onClick={handleQuizSubmit}
                                    disabled={!quiz || isSubmitting || Object.keys(quizAnswers).length < (quiz?.questions.length || 0)}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    Valida Risposte
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>

                {/* COL 3: SCENARIO OPERATIVO */}
                <div className="relative h-full">
                    {simStatus === 'locked' && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-xl border border-neutral-800">
                            <div className="p-4 bg-neutral-900 rounded-full mb-3 border border-neutral-800">
                                <Lock className="w-6 h-6 text-neutral-500" />
                            </div>
                            <span className="text-sm font-medium text-neutral-400">Richiede 100% al Quiz</span>
                        </div>
                    )}
                    <Card className={cn("flex flex-col h-full transition-all duration-300 overflow-hidden", getCardStyles(simStatus))}>
                        <CardHeader className="py-4 border-b border-white/5">
                            <div className="flex items-center justify-between">
                                <span className={cn("flex items-center gap-2 uppercase tracking-wider text-xs font-bold", simStatus === 'active' ? "text-orange-400" : "text-gray-500")}>
                                    <PlayCircle size={16} /> 3. Scenario AI
                                </span>
                                {progress.simulation_completed && <CheckCircle2 size={18} className="text-green-500" />}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 relative flex flex-col bg-neutral-950/50">
                            {scenario ? (
                                <div className="absolute inset-0 flex flex-col">
                                    <ChatInterface
                                        scenarioId={scenario.id}
                                        initialContext={scenario.initial_context || ''}
                                        role={scenario.role_target || 'SM'}
                                    />
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 p-6">Nessuno scenario collegato.</div>
                            )}
                        </CardContent>
                        {/* No Footer for Sim needed as Chat has its own input area */}
                    </Card>
                </div>

            </div>
        </div>
    );
}
