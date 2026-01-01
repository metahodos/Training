const { calculateQuizScore } = require('../lib/scoring');

// Mock specific logic from user request
// test-punteggio.js per confermare che getQuizScore(2) === 7.

function testScore() {
    console.log('Running Score Verification...');

    // Attempt 1 -> 10 pts
    const s1 = calculateQuizScore(1);
    if (s1 !== 10) console.error(`FAIL: Attempt 1 should be 10, got ${s1}`);
    else console.log('PASS: Attempt 1 -> 10pts');

    // Attempt 2 -> 7 pts
    const s2 = calculateQuizScore(2);
    if (s2 !== 7) console.error(`FAIL: Attempt 2 should be 7, got ${s2}`);
    else console.log('PASS: Attempt 2 -> 7pts');

    // Attempt 3 -> 4 pts
    const s3 = calculateQuizScore(3);
    if (s3 !== 4) console.error(`FAIL: Attempt 3 should be 4, got ${s3}`);
    else console.log('PASS: Attempt 3 -> 4pts');

    // Attempt 4 -> 0 pts
    const s4 = calculateQuizScore(4);
    if (s4 !== 0) console.error(`FAIL: Attempt 4 should be 0, got ${s4}`);
    else console.log('PASS: Attempt 4 -> 0pts');

    if (s2 === 7) {
        console.log('✅ TEST PASSED: getQuizScore(2) === 7');
    } else {
        console.error('❌ TEST FAILED: getQuizScore(2) !== 7');
        process.exit(1);
    }
}

testScore();
