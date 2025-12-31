'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, ArrowUp, ArrowDown } from 'lucide-react';

interface BacklogItem {
    id: string;
    title: string;
    value: number; // 1-10
    risk: number; // 1-10
}

const INITIAL_ITEMS: BacklogItem[] = [
    { id: '1', title: "Cambiare logo (CEO request)", value: 2, risk: 1 },
    { id: '2', title: "Fix Critico Sicurezza Pagamenti", value: 10, risk: 9 },
    { id: '3', title: "Nuova Feature 'Dark Mode'", value: 4, risk: 2 },
    { id: '4', title: "Refactoring Database (Lento)", value: 8, risk: 8 },
    { id: '5', title: "Pagina 'Chi Siamo' aggiornata", value: 3, risk: 1 },
];

export default function FlashPriorityGame() {
    const [items, setItems] = useState(INITIAL_ITEMS);
    const [score, setScore] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    const moveItem = (index: number, direction: 'up' | 'down') => {
        const newItems = [...items];
        if (direction === 'up' && index > 0) {
            [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
        } else if (direction === 'down' && index < newItems.length - 1) {
            [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
        }
        setItems(newItems);
    };

    const submitPriority = () => {
        // Simple logic: High Value + High Risk should be top.
        // Let's create a naive score based on "Weighted Shortest Job First" (WSJF) roughly proxy.
        // Actually, let's just check if "Fix Sicurezza" is #1 and "Refactoring" is #2.

        const topItem = items[0];
        const secondItem = items[1];

        if (topItem.id === '2' && secondItem.id === '4') {
            setScore(100);
            setFeedback("Eccellente! Hai dato priorità alla sicurezza e alla stabilità tecnica, che hanno alto valore e alto rischio (costo del ritardo).");
        } else if (topItem.id === '2') {
            setScore(80);
            setFeedback("Bene per la sicurezza al primo posto. Attenzione però al debito tecnico critico (Refactoring) che dovrebbe seguire subito dopo.");
        } else if (topItem.id === '1') {
            setScore(20);
            setFeedback("Attenzione! Hai dato priorità all'HiPPO (Highest Paid Person's Opinion). Il logo non ha valore strategico comparabile alla sicurezza.");
        } else {
            setScore(50);
            setFeedback("Prioritizzazione discutibile. Ricorda: Valore e Rischio guidano l'ordine.");
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-4xl text-white">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Zap className="text-yellow-500" />
                Priorità Lampo
            </h1>
            <p className="text-gray-400 mb-8">
                Ordina questi elementi del Backlog dal più importante (in alto) al meno importante.
                Considera Valore e Rischio.
            </p>

            <div className="space-y-4 mb-8">
                {items.map((item, index) => (
                    <Card key={item.id} className="bg-neutral-800 border-neutral-700 text-white flex items-center p-4">
                        <div className="mr-4 font-mono text-2xl text-gray-500 w-8">
                            #{index + 1}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold">{item.title}</h3>
                            <div className="flex gap-4 text-xs text-gray-400 mt-1">
                                <span>Valore: {item.value}/10</span>
                                <span>Rischio: {item.risk}/10</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Button variant="ghost" size="sm" onClick={() => moveItem(index, 'up')} disabled={index === 0}>
                                <ArrowUp size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => moveItem(index, 'down')} disabled={index === items.length - 1}>
                                <ArrowDown size={16} />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            <Button onClick={submitPriority} className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold">
                Conferma Priorità
            </Button>

            {score !== null && (
                <div className="mt-8 p-6 bg-neutral-900 border border-neutral-700 rounded-lg text-center animate-in fade-in slide-in-from-bottom-4">
                    <div className="text-4xl font-bold mb-2">{score}/100</div>
                    <p className="text-lg">{feedback}</p>
                    <Button onClick={() => setItems(INITIAL_ITEMS)} variant="link" className="text-yellow-500 mt-4">
                        Riprova
                    </Button>
                </div>
            )}
        </div>
    );
}
