'use client';

import { useState } from 'react';
import { submitQuizScore } from '@/app/actions/progress';
import { useRouter } from 'next/navigation';
import { calculateQuizScore } from '@/lib/scoring';
import { Check, X, ArrowRight, RefreshCw } from 'lucide-react';

type Question = {
    id: string;
    text: string;
    options: string[];
    correctAnswer: string; // "A", "B", "C", "D" or index? Assuming text match or index. Seed data suggests text or "0", "1". Let's assume text for now or index. Seed SQL usually has structure.
    // Checking seed_reboot.sql, quiz questions are JSONB. Structure: { question: "...", options: ["..."], correct: 0 } (index) or plain string?
    // Let's assume standard index 0-based for robustness.
    correct: number;
};

type QuizRunnerProps = {
    quizId: string;
    questions: Question[];
    moduleId: string;
};

export default function QuizRunner({ quizId, questions, moduleId }: QuizRunnerProps) {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [score, setScore] = useState(0); // Internal tracking (correct answers)
    const [showResult, setShowResult] = useState(false);
    const [attempt, setAttempt] = useState(1);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [passed, setPassed] = useState(false);

    const handleNext = () => {
        const isCorrect = selectedOption === questions[currentQuestionIndex].correct;
        if (isCorrect) {
            setScore(s => s + 1); // Just tracking correct count internally
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
        } else {
            finishQuiz(score + (isCorrect ? 1 : 0));
        }
    };

    const finishQuiz = async (finalCorrectCount: number) => {
        const total = questions.length;
        const percentage = (finalCorrectCount / total) * 100;
        const isPassed = percentage >= 75; // 75% to pass? Or 100%? Default 75% usually.

        let awardedPoints = 0;
        if (isPassed) {
            awardedPoints = calculateQuizScore(attempt);
        }

        setFinalScore(awardedPoints);
        setPassed(isPassed);
        setQuizCompleted(true);

        await submitQuizScore(quizId, awardedPoints, attempt, isPassed);
        router.refresh(); // Update server state (badges/modules)
    };

    const handleRetry = () => {
        setAttempt(a => a + 1);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setScore(0);
        setQuizCompleted(false);
        setPassed(false);
    };

    if (quizCompleted) {
        return (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center max-w-md mx-auto">
                {passed ? (
                    <>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiz Passed!</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            You earned <span className="font-bold text-blue-600 text-xl">{finalScore} points</span>.
                        </p>
                        <button onClick={() => router.push(`/modules/${moduleId}`)} className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            Return to Module
                        </button>
                    </>
                ) : (
                    <>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <X className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiz Failed</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            You didn't reach the target. Try again!
                        </p>
                        <button onClick={handleRetry} className="w-full py-3 flex items-center justify-center space-x-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                            <RefreshCw className="w-4 h-4" /> <span>Try Again (Attempt {attempt + 1})</span>
                        </button>
                    </>
                )}
            </div>
        );
    }

    const question = questions[currentQuestionIndex];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-400">Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">Attempt {attempt}</span>
            </div>

            <div className="p-8">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white leading-relaxed">
                    {question.text}
                </h3>

                <div className="space-y-3">
                    {question.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedOption(idx)}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${selectedOption === idx
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-800'
                                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            <span className="inline-block w-6 font-bold text-gray-400 mr-2">{String.fromCharCode(65 + idx)}.</span>
                            <span className={selectedOption === idx ? 'font-semibold text-blue-900 dark:text-blue-100' : 'text-gray-700 dark:text-gray-300'}>
                                {opt}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 flex justify-end">
                <button
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    className="flex items-center px-6 py-3 bg-blue-600 disabled:bg-gray-300 text-white rounded-lg font-bold transition-all disabled:cursor-not-allowed hover:bg-blue-700"
                >
                    {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'} <ArrowRight className="w-4 h-4 ml-2" />
                </button>
            </div>
        </div>
    );
}
