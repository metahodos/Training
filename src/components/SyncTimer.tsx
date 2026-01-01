'use client';

import { useSyncTimer } from '@/hooks/useSyncTimer';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

import { useTeamLogic } from '@/hooks/useTeamLogic';

interface SyncTimerProps {
    isFacilitator: boolean;
}

export function SyncTimer({ isFacilitator }: SyncTimerProps) {
    const { timeLeft, status, startTimer, pauseTimer, resetTimer, setDuration, adjustDuration } = useSyncTimer();
    const { setGlobalTeamStatus } = useTeamLogic();
    const [customMinutes, setCustomMinutes] = useState(10);

    const handleStart = async () => {
        startTimer();
        await setGlobalTeamStatus('WORKING');
    };

    const handlePause = () => {
        pauseTimer();
        // Optional: Set status to IDLE or PAUSED? decided to keep WORKING unless reset.
    };

    const handleReset = async (seconds: number) => {
        resetTimer(seconds);
        await setGlobalTeamStatus('IDLE');
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val > 0) {
            setCustomMinutes(val);
        }
    };

    const applyDuration = () => {
        setDuration(customMinutes * 60);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 space-y-4">
            {/* Timer Display */}
            <div className={cn(
                "font-mono text-6xl font-bold tracking-widest transition-colors duration-300",
                status === 'running' ? "text-green-400" :
                    status === 'paused' ? "text-yellow-400" : "text-neutral-500"
            )}>
                {formatTime(timeLeft)}
            </div>

            {/* Facilitator Controls */}
            {isFacilitator && (
                <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-2">

                    {status !== 'running' && (
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={customMinutes}
                                onChange={handleDurationChange}
                                className="w-16 bg-neutral-900 border border-neutral-700 rounded p-1 text-center text-white text-sm focus:border-blue-500 outline-none"
                            />
                            <Button variant="ghost" size="sm" onClick={applyDuration} className="text-xs text-blue-400 hover:text-blue-300">Set Min</Button>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        {status === 'running' ? (
                            <Button variant="outline" size="icon" onClick={handlePause} className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10">
                                <Pause className="w-5 h-5" />
                            </Button>
                        ) : (
                            <Button variant="outline" size="icon" onClick={handleStart} className="border-green-500/50 text-green-500 hover:bg-green-500/10">
                                <Play className="w-5 h-5" />
                            </Button>
                        )}

                        <Button variant="outline" size="icon" onClick={() => handleReset(customMinutes * 60)} className="border-neutral-700 text-neutral-400 hover:bg-neutral-800">
                            <RotateCcw className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Dynamic Adjustments */}
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => adjustDuration(1)} className="text-xs text-green-400 hover:text-green-300 hover:bg-green-900/20">+1m</Button>
                        <Button variant="ghost" size="sm" onClick={() => adjustDuration(5)} className="text-xs text-green-400 hover:text-green-300 hover:bg-green-900/20">+5m</Button>
                        <Button variant="ghost" size="sm" onClick={() => adjustDuration(-1)} className="text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20">-1m</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
