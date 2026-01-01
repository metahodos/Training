'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SendIcon, BotIcon, UserIcon, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

import AssessmentView from './AssessmentView';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface SimulatorProps {
    scenarioId: string;
    initialContext: string;
    role: 'SM' | 'PO';
    onComplete?: (feedback: FeedbackData, badge?: { type: string, score: number }) => void;
}

import { processSimulationResult } from '@/app/actions/simulation';

interface FeedbackData {
    punteggio_globale: number;
    punteggio_tecnico: number;
    punteggio_soft_skills: number;
    analisi_critica: string;
    punti_forza: string[];
    aree_miglioramento: string[];
}

import { Progress } from "@/components/ui/progress";

// ... existing imports

export default function ChatInterface({ scenarioId, initialContext, role, onComplete }: SimulatorProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: initialContext }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackData | null>(null);
    const [badge, setBadge] = useState<{ type: string, score: number } | undefined>(undefined);
    const [progress, setProgress] = useState(0);
    const [hintsUsed, setHintsUsed] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const generateFeedback = async (history: Message[]) => {
        setIsLoading(true);
        try {
            const simpleHistory = history.map(({ role, content }) => ({ role, content }));
            const result = await processSimulationResult(simpleHistory, scenarioId, hintsUsed);

            if (result.success && result.feedback) {
                setFeedback(result.feedback);
                if (result.badge) setBadge(result.badge);

                if (onComplete) {
                    onComplete(result.feedback, result.badge);
                }
            } else {
                console.error("Feedback error:", result.error);
                setFeedback({
                    punteggio_globale: 0,
                    punteggio_tecnico: 0,
                    punteggio_soft_skills: 0,
                    analisi_critica: "Errore nel recupero del feedback o utente non loggato.",
                    punti_forza: [],
                    aree_miglioramento: ["Riprova dopo il login"]
                });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user' as const, content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/simulate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: input,
                    history: messages,
                    scenarioId,
                    role,
                }),
            });

            if (!response.ok) throw new Error('Failed to fetch response');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = '';

            setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

            while (true) {
                const { done, value } = await reader!.read();
                if (done) break;

                const chunk = decoder.decode(value);
                assistantMessage += chunk;

                // [NEW] Check for Progress Tag
                const progressMatch = assistantMessage.match(/\[PROGRESS:\s*(\d+)\]/);
                if (progressMatch) {
                    const newProgress = parseInt(progressMatch[1]);
                    setProgress(newProgress);
                }

                // Check for end of simulation tag
                if (assistantMessage.includes('[SIMULATION_END]')) {
                    const cleanMessage = assistantMessage
                        .replace(/\[PROGRESS:\s*\d+\]/g, '')
                        .replace('[SIMULATION_END]', '');

                    setMessages((prev) => {
                        const newMessages = [...prev];
                        const newLast = { role: 'assistant', content: cleanMessage } as Message;
                        newMessages[newMessages.length - 1] = newLast;
                        return newMessages;
                    });

                    await generateFeedback([...messages, userMessage, { role: 'assistant', content: cleanMessage }]);
                    break;
                }

                const displayMessage = assistantMessage.replace(/\[PROGRESS:\s*\d+\]/g, '');

                setMessages((prev) => {
                    const newMessages = [...prev];
                    const newLast = { role: 'assistant', content: displayMessage } as Message;
                    newMessages[newMessages.length - 1] = newLast;
                    return newMessages;
                });
            }

        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                role: 'system',
                content: '⚠️ Errore di connessione con il Coach AI.'
            } as Message]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleHint = async () => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            setHintsUsed((prev) => prev + 1);
            const response = await fetch('/api/simulate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: '[ACTION: HINT_REQUEST]',
                    history: messages,
                    scenarioId,
                    role,
                }),
            });

            if (!response.ok) throw new Error('Failed to fetch hint');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = '';

            setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

            while (true) {
                const { done, value } = await reader!.read();
                if (done) break;

                const chunk = decoder.decode(value);
                assistantMessage += chunk;

                const progressMatch = assistantMessage.match(/\[PROGRESS:\s*(\d+)\]/);
                if (progressMatch) {
                    const newProgress = parseInt(progressMatch[1]);
                    setProgress(newProgress);
                }

                const displayMessage = assistantMessage
                    .replace(/\[PROGRESS:\s*\d+\]/g, '')
                    .replace('[SIMULATION_END]', '')
                    .replace('[HINT]', '💡 SUGGERIMENTO DALLA REGIA:\n');

                setMessages((prev) => {
                    const newMessages = [...prev];
                    const newLast = { role: 'assistant', content: displayMessage } as Message;
                    newMessages[newMessages.length - 1] = newLast;
                    return newMessages;
                });
            }

        } catch (error) {
            console.error('Hint Error:', error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (feedback) {
        return (
            <AssessmentView
                score={feedback.punteggio_globale}
                feedback={feedback}
                badge={badge}
                onRetry={() => window.location.reload()}
            />
        );
    }

    return (
        <Card className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-neutral-900 border-neutral-800 text-white shadow-2xl">
            <CardHeader className="border-b border-neutral-800 pb-4">
                <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg font-mono flex items-center gap-2">
                        <BotIcon className="w-5 h-5 text-green-400" />
                        Simulazione: Scenario {role}
                    </CardTitle>
                    <span className="text-xs text-neutral-500 font-mono">
                        Progress: {progress}%
                    </span>
                </div>
                {/* [NEW] Progress Bar */}
                <Progress value={progress} className="h-2 bg-neutral-800" indicatorClassName="bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500" />
            </CardHeader>

            <CardContent className="flex-1 p-0 flex flex-col overflow-hidden relative">
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4 pb-4">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "flex gap-3 max-w-[80%]",
                                    m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                    m.role === 'user' ? "bg-blue-600" : "bg-neutral-700"
                                )}>
                                    {m.role === 'user' ? <UserIcon size={16} /> : <BotIcon size={16} />}
                                </div>

                                <div className={cn(
                                    "p-4 rounded-2xl text-base leading-relaxed shadow-sm",
                                    m.role === 'user'
                                        ? "bg-blue-600/20 text-blue-50 rounded-tr-none border border-blue-500/30 font-medium"
                                        : "bg-neutral-800 text-gray-100 rounded-tl-none border border-neutral-700"
                                )}>
                                    <div className="prose prose-invert prose-sm max-w-none break-words whitespace-pre-wrap">
                                        <ReactMarkdown>
                                            {m.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>

                <div className="p-4 bg-neutral-900 border-t border-neutral-800 shrink-0">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleHint}
                            disabled={isLoading}
                            className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400"
                            title="Chiedi un aiuto dalla regia"
                        >
                            <Lightbulb size={18} />
                        </Button>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Scrivi la tua risposta..."
                            className="bg-neutral-950 border-neutral-700 focus:border-green-500/50 focus:ring-green-500/20 text-white placeholder:text-neutral-500"
                            disabled={isLoading}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            {isLoading ? '...' : <SendIcon size={18} />}
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}
