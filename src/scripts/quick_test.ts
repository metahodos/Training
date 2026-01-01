import { calculateQuizScore, calculateSimulationScore, isModuleUnlocked } from '../lib/scoring';

console.log("=== RUNNING LOGIC VERIFICATION ===");

// 1. Verify Quiz Scoring
console.log("\n[TEST] Quiz Scoring:");
const q1 = calculateQuizScore(1);
console.log(`Attempt 1: ${q1} pts (Expected 10) -> ${q1 === 10 ? 'PASS' : 'FAIL'}`);

const q2 = calculateQuizScore(2);
console.log(`Attempt 2: ${q2} pts (Expected 7) -> ${q2 === 7 ? 'PASS' : 'FAIL'}`);

const q3 = calculateQuizScore(3);
console.log(`Attempt 3: ${q3} pts (Expected 4) -> ${q3 === 4 ? 'PASS' : 'FAIL'}`);

const q4 = calculateQuizScore(4);
console.log(`Attempt 4: ${q4} pts (Expected 0) -> ${q4 === 0 ? 'PASS' : 'FAIL'}`);


// 2. Verify Simulation Scoring
console.log("\n[TEST] Simulation Scoring:");
const s0 = calculateSimulationScore(0);
console.log(`Hints 0: ${s0} pts (Expected 10) -> ${s0 === 10 ? 'PASS' : 'FAIL'}`);

const s1 = calculateSimulationScore(1);
console.log(`Hints 1: ${s1} pts (Expected 7) -> ${s1 === 7 ? 'PASS' : 'FAIL'}`);

const s2 = calculateSimulationScore(2);
console.log(`Hints 2: ${s2} pts (Expected 4) -> ${s2 === 4 ? 'PASS' : 'FAIL'}`);

const s3 = calculateSimulationScore(3);
console.log(`Hints 3: ${s3} pts (Expected 1) -> ${s3 === 1 ? 'PASS' : 'FAIL'}`);


// 3. Verify Unlock Logic
console.log("\n[TEST] Unlock Logic (>= 75%):");
const u1 = isModuleUnlocked(74);
console.log(`Progress 74%: ${u1} (Expected false) -> ${u1 === false ? 'PASS' : 'FAIL'}`);

const u2 = isModuleUnlocked(75);
console.log(`Progress 75%: ${u2} (Expected true) -> ${u2 === true ? 'PASS' : 'FAIL'}`);

const u3 = isModuleUnlocked(80);
console.log(`Progress 80%: ${u3} (Expected true) -> ${u3 === true ? 'PASS' : 'FAIL'}`);

console.log("\n=== VERIFICATION COMPLETE ===");
