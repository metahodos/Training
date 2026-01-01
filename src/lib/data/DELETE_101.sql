-- Delete Module 101 and cascade to dependent tables (lessons, quizzes, user_progress)
-- Note: 'modules' uses 'id' as primary key.
-- Explicitly delete from related tables just in case CASCADE isn't set up on all foreign keys (safety first)

BEGIN;

-- 1. Delete dependent User Progress
DELETE FROM user_progress WHERE module_id = '101';
DELETE FROM user_attempts WHERE quiz_id LIKE 'q101_%';

-- 2. Delete dependent Content
DELETE FROM lessons WHERE module_id = '101';
DELETE FROM quizzes WHERE module_id = '101';
DELETE FROM scenarios WHERE module_id = '101' OR id = 'scenario_101';

-- 3. Delete the Module itself
DELETE FROM modules WHERE id = '101';

COMMIT;
