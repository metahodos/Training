/**
 * Logic for Gamification Scoring
 */

export function calculateQuizScore(attemptNumber: number): number {
    if (attemptNumber === 1) return 10;
    if (attemptNumber === 2) return 7;
    if (attemptNumber === 3) return 4;
    return 0;
}

export function calculateSimulationScore(hintsUsed: number): number {
    if (hintsUsed === 0) return 10;
    if (hintsUsed === 1) return 7;
    if (hintsUsed === 2) return 4;
    return 1; // "> 2 aiuti" -> 1pt
}
