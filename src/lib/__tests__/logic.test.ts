import { calculateQuizScore, calculateSimulationScore } from '../scoring';
import { checkModuleUnlock } from '../unlocking';

// Mocks
const mockFrom = jest.fn();
const mockSelect = jest.fn();
const mockEq = jest.fn();
const mockSingle = jest.fn();
const mockIn = jest.fn();

jest.mock('@/utils/supabase/server', () => ({
    createClient: jest.fn(() => Promise.resolve({
        from: mockFrom
    }))
}));

describe('Scoring Logic', () => {
    test('Quiz Scoring', () => {
        expect(calculateQuizScore(1)).toBe(10);
        expect(calculateQuizScore(2)).toBe(7);
        expect(calculateQuizScore(3)).toBe(4);
        expect(calculateQuizScore(4)).toBe(0);
    });

    test('Simulation Scoring', () => {
        expect(calculateSimulationScore(0)).toBe(10);
        expect(calculateSimulationScore(1)).toBe(7);
        expect(calculateSimulationScore(2)).toBe(4);
        expect(calculateSimulationScore(3)).toBe(1);
        expect(calculateSimulationScore(10)).toBe(1);
    });
});
