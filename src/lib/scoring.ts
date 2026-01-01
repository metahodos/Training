export function calculateQuizScore(attempts: number): number {
    if (attempts === 1) return 10;
    if (attempts === 2) return 7;
    if (attempts === 3) return 4;
    return 0;
}

export function calculateSimulationScore(hintsUsed: number): number {
    if (hintsUsed === 0) return 10;
    if (hintsUsed === 1) return 7;
    if (hintsUsed === 2) return 4;
    // User requirement said "2 aiuti: 1pt" for the last case, assuming they meant > 2
    return 1;
}

export function isModuleUnlocked(prevModuleSimProgress: number): boolean {
    return prevModuleSimProgress >= 75;
}
