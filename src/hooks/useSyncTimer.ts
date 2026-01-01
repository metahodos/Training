import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';

export interface TimerState {
    status: 'idle' | 'running' | 'paused';
    duration: number; // Seconds to count down from (at startTime)
    startTime: string | null; // ISO string
    pausedAt: string | null; // ISO string
}

export function useSyncTimer() {
    const [timerState, setTimerState] = useState<TimerState>({
        status: 'idle',
        duration: 600,
        startTime: null,
        pausedAt: null
    });
    const [timeLeft, setTimeLeft] = useState(600);
    const supabase = createClient();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // 1. Fetch initial state & Subscribe to Realtime changes
    useEffect(() => {
        const fetchInitialState = async () => {
            const { data } = await supabase
                .from('global_config')
                .select('value')
                .eq('key', 'main_timer')
                .single();

            if (data?.value) {
                setTimerState(data.value as TimerState);
            }
        };

        fetchInitialState();

        const channel = supabase
            .channel('global_timer')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'global_config',
                    filter: 'key=eq.main_timer'
                },
                (payload) => {
                    console.log('Timer Update:', payload.new.value);
                    setTimerState(payload.new.value as TimerState);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // 2. Calculate Time Left (Drift Correction)
    useEffect(() => {
        const calculateTime = () => {
            if (timerState.status === 'idle') {
                setTimeLeft(timerState.duration);
                return;
            }

            if (timerState.status === 'paused') {
                // If paused, we assume duration holds the remaining time (see logic in implementation plan)
                // OR we can calculate: duration - (pausedAt - startTime)
                // Let's stick to the simpler model where 'duration' is ALWAYS the remaining time 
                // when status is transitioned to 'paused'.

                // WAIT. My plan said:
                // Start: startTime=now, duration=600
                // Pause: pausedAt=now. remaining = duration - (pausedAt - startTime). Update DB with duration=remaining.
                // So 'duration' is always "Time remaining at the moment the Start/Resume button was pressed".
                // NO, if I update 'duration' on pause, then on Resume I just set startTime=now.
                // YES. This is resilient.

                setTimeLeft(timerState.duration);
                return;
            }

            if (timerState.status === 'running' && timerState.startTime) {
                const now = new Date().getTime();
                const start = new Date(timerState.startTime).getTime();
                const elapsedSeconds = (now - start) / 1000;
                const remaining = Math.max(0, Math.ceil(timerState.duration - elapsedSeconds));

                setTimeLeft(remaining);

                if (remaining <= 0 && intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            }
        };

        // Run immediately
        calculateTime();

        // Start interval if running
        if (timerState.status === 'running') {
            intervalRef.current = setInterval(calculateTime, 200); // Check 5 times a second for smoothness
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [timerState]);

    // 3. Facilitator Actions (Optimistic UI + DB Update)
    const updateTimer = async (newState: Partial<TimerState>) => {
        const mergedState = { ...timerState, ...newState };
        // Optimistic update? Maybe risky if no permission. Better wait for echo or just fire and forget.
        // We let the subscription handle the UI update to ensure specific truth.

        await supabase
            .from('global_config')
            .update({
                value: mergedState,
                updated_at: new Date().toISOString()
            })
            .eq('key', 'main_timer');
    };

    const startTimer = () => {
        updateTimer({
            status: 'running',
            startTime: new Date().toISOString(),
            duration: timeLeft > 0 ? timeLeft : 600 // Resume or Restart
        });
    };

    const pauseTimer = () => {
        // Calculate remaining to freeze it
        if (timerState.startTime) {
            const now = new Date().getTime();
            const start = new Date(timerState.startTime).getTime();
            const elapsed = (now - start) / 1000;
            const remaining = Math.max(0, Math.floor(timerState.duration - elapsed));

            updateTimer({
                status: 'paused',
                pausedAt: new Date().toISOString(),
                duration: remaining
            });
        }
    };

    const resetTimer = (newDuration = 600) => {
        updateTimer({
            status: 'idle',
            duration: newDuration,
            startTime: null,
            pausedAt: null
        });
    };

    const setDuration = (seconds: number) => {
        // Can only set duration if not running (or we force reset)
        // We will force a reset to idle with new duration
        updateTimer({
            status: 'idle',
            duration: seconds,
            startTime: null,
            pausedAt: null
        });
    };

    const adjustDuration = (minutes: number) => {
        // Adjusts the total duration, effectively adding/removing time from the countdown
        updateTimer({
            duration: timerState.duration + (minutes * 60)
        });
    };

    return {
        timeLeft,
        status: timerState.status,
        startTimer,
        pauseTimer,
        resetTimer,
        setDuration,
        adjustDuration
    };
}
