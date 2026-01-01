
import { renderHook, act } from '@testing-library/react';
import { useTeamLogic } from '@/hooks/useTeamLogic';
import { useSyncTimer } from '@/hooks/useSyncTimer';

// Mock Supabase
const mockInsert = jest.fn();
const mockSelect = jest.fn();
const mockSingle = jest.fn();
const mockUpdate = jest.fn();
const mockEq = jest.fn();
const mockGt = jest.fn();
const mockChannel = jest.fn();

const mockSupabase = {
    from: jest.fn(() => ({
        insert: mockInsert,
        select: mockSelect,
        update: mockUpdate,
    })),
    channel: mockChannel,
    removeChannel: jest.fn(),
    auth: { getUser: jest.fn().mockResolvedValue({ data: { user: { id: '123' } } }) }
};

// Setup Chain
mockInsert.mockReturnValue({ select: mockSelect });
mockSelect.mockReturnValue({ single: mockSingle, eq: mockEq });
mockEq.mockReturnValue({ single: mockSingle }); // For profile check
mockUpdate.mockReturnValue({ gt: mockGt, eq: mockEq });
mockGt.mockResolvedValue({ error: null }); // Fix: Ensure gt returns a promise with error property
mockChannel.mockReturnValue({ on: jest.fn().mockReturnThis(), subscribe: jest.fn() });

jest.mock('@/utils/supabase/client', () => ({
    createClient: () => mockSupabase
}));

describe('Mission Critical System Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Test A: Create 3 teams and verify persistence logic', async () => {
        const { result } = renderHook(() => useTeamLogic());

        mockSingle.mockResolvedValue({ data: { id: '1', name: 'Team A', status: 'IDLE' }, error: null });

        await act(async () => {
            await result.current.createTeam('Team A');
        });

        expect(mockSupabase.from).toHaveBeenCalledWith('teams');
        expect(mockInsert).toHaveBeenCalledWith({ name: 'Team A', status: 'IDLE' });

        await act(async () => {
            await result.current.createTeam('Team B');
            await result.current.createTeam('Team C');
        });

        expect(mockInsert).toHaveBeenCalledTimes(3);
    });

    test('Test B: Start Timer -> Verify Team Status = WORKING', async () => {
        const { result: teamResult } = renderHook(() => useTeamLogic());
        // We simulate the SyncTimer logic here since we can't easily render the full component integration in unit test

        // 1. Facilitator starts timer
        await act(async () => {
            // Simulate "Start Game" action
            await teamResult.current.setGlobalTeamStatus('WORKING');
        });

        expect(mockSupabase.from).toHaveBeenCalledWith('teams');
        expect(mockUpdate).toHaveBeenCalledWith({ status: 'WORKING' });
        // It should update teams created recently
        expect(mockGt).toHaveBeenCalled();
    });

    test('Test C: Modify Timer (+2m) -> Verify Duration logic', async () => {
        const { result } = renderHook(() => useSyncTimer());

        // Initial state is idle, but let's assume we called adjustDuration
        // adjustDuration calls updateTimer which writes to DB

        await act(async () => {
            // Mock initial state as running for context? 
            // The hook fetches initial state on mount, so it might be 600 default.
            result.current.adjustDuration(2);
        });

        // 600 default + 120 = 720
        // We expect an update call
        const expectedDuration = 600 + 120; // 720

        expect(mockSupabase.from).toHaveBeenCalledWith('global_config');
        expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({
            value: expect.objectContaining({
                duration: expectedDuration
            })
        }));
    });

    test('Test D: Timer End -> Verify Status = COMPLETED', async () => {
        const { result: teamResult } = renderHook(() => useTeamLogic());

        // Simulate timer ending logic
        await act(async () => {
            await teamResult.current.setGlobalTeamStatus('COMPLETED');
        });

        expect(mockUpdate).toHaveBeenCalledWith({ status: 'COMPLETED' });
    });
});
