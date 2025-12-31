'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SendIcon, BotIcon, UserIcon } from 'lucide-react';
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
}

interface FeedbackData {
    score: number;
    analysis: string;
    strengths: string[];
    improvements: string[];
}

export default function ChatInterface({ scenarioId, initialContext, role }: SimulatorProps) {
    // Initial message from the system to start the roleplay
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: initialContext }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackData | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

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

            // Create a placeholder for the assistant response
            setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

            while (true) {
                const { done, value } = await reader!.read();
                if (done) break;

                const chunk = decoder.decode(value);
                assistantMessage += chunk;

                // Check for end of simulation tag
                if (assistantMessage.includes('[SIMULATION_END]')) {
                    // Remove the tag from display
                    const cleanMessage = assistantMessage.replace('[SIMULATION_END]', '');

                    setMessages((prev) => {
                        const newMessages = [...prev];
                        const lastIndex = newMessages.length - 1;
                        newMessages[lastIndex] = { role: 'assistant', content: cleanMessage };
                        return newMessages;
                    });

                    // Trigger feedback generation
                    await generateFeedback([...messages, userMessage, { role: 'assistant', content: cleanMessage }]); // Use clean message history
                    break;
                }

                // Update the last message with the streaming content
                setMessages((prev) => {
                    const newMessages = [...prev];
                    const lastIndex = newMessages.length - 1;
                    newMessages[lastIndex] = { role: 'assistant', content: assistantMessage };
                    return newMessages;
                });
            }

        } catch (error) {
            console.error('Error:', error);
            // Handle error visually
        } finally {
            setIsLoading(false);
        }
    };

    const generateFeedback = async (history: Message[]) => {
        // Mock feedback for now (real implementation would call another API endpoint)
        // In a real app, we would send the full transcript to an evaluation endpoint.

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        setFeedback({
            score: 85,
            analysis: "You handled the situation well by protecting the team's time, but could have been more empathetic to the stakeholder's pressure.",
            strengths: ["Assertiveness", "Process Adherence"],
            improvements: ["Stakeholder Management", "Negotiation"]
        });
    };

    if (feedback) {
        return (
            <AssessmentView
                score={feedback.score}
                feedback={feedback}
                onRetry={() => window.location.reload()}
            />
        );
    }

    return (
        <Card className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-neutral-900 border-neutral-800 text-white shadow-2xl">
            <CardHeader className="border-b border-neutral-800">
                <CardTitle className="text-lg font-mono flex items-center gap-2">
                    <BotIcon className="w-5 h-5 text-green-400" />
                    Simulation: {role} Scenario
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 p-0 overflow-hidden relative">
                <ScrollArea className="h-full p-4">
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
                                    "p-3 rounded-2xl text-sm leading-relaxed",
                                    m.role === 'user'
                                        ? "bg-blue-600/20 text-blue-100 rounded-tr-none border border-blue-500/30"
                                        : "bg-neutral-800 text-gray-100 rounded-tl-none border border-neutral-700"
                                )}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>

                <div className="p-4 bg-neutral-900 border-t border-neutral-800">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your response..."
                            className="bg-neutral-950 border-neutral-700 focus:border-green-500/50 focus:ring-green-500/20"
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
