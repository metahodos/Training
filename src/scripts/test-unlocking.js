// test-unlocking.js - Mock simulation of checkModuleUnlock logic

const MOCK_MODULES = [
    { id: 'm1', sort_order: 1, lessons_count: 3 },
    { id: 'm2', sort_order: 2, lessons_count: 3 },
    { id: 'm3', sort_order: 3, lessons_count: 3 },
];

function mockCheckUnlock(moduleId, completedLessonsCount) {
    const currentModule = MOCK_MODULES.find(m => m.id === moduleId);
    if (currentModule.sort_order === 1) return { unlocked: true };

    const prevModule = MOCK_MODULES.find(m => m.sort_order === currentModule.sort_order - 1);

    // Logic from unlocking.ts: progress = (completed / total) * 100
    const progress = (completedLessonsCount / prevModule.lessons_count) * 100;

    return {
        unlocked: progress >= 75,
        progress: Math.round(progress)
    };
}

// Test Case 1: Module 2 (dependent on Module 1)
// 1 lesson completed out of 3 -> 33% -> Locked
const t1 = mockCheckUnlock('m2', 1);
console.log(`Test 1 (1/3 done): Progress ${t1.progress}% -> Unlocked? ${t1.unlocked} (Expected: false)`);
if (t1.unlocked) console.error('FAIL: Should be locked');

// Test Case 2: Module 3 (dependent on Module 2)
// 2 lessons completed out of 3 -> 66% -> Locked
const t2 = mockCheckUnlock('m3', 2);
console.log(`Test 2 (2/3 done): Progress ${t2.progress}% -> Unlocked? ${t2.unlocked} (Expected: false)`);
if (t2.unlocked) console.error('FAIL: Should be locked');

// Test Case 3: Module 3 (dependent on Module 2)
// 3 lessons completed out of 3 -> 100% -> Unlocked
const t3 = mockCheckUnlock('m3', 3);
console.log(`Test 3 (3/3 done): Progress ${t3.progress}% -> Unlocked? ${t3.unlocked} (Expected: true)`);
if (!t3.unlocked) console.error('FAIL: Should be unlocked');

if (!t1.unlocked && !t2.unlocked && t3.unlocked) {
    console.log('✅ UNLOCK LOGIC VERIFIED');
} else {
    console.error('❌ LOGIC VERIFICATION FAILED');
    process.exit(1);
}
