
export interface QuizQuestion {
    id: string;
    text: string;
    options: {
        id: string;
        text: string;
        isCorrect: boolean;
    }[];
}

export interface ModuleQuiz {
    moduleId: string; // Links to TheoryModule.id
    questions: QuizQuestion[];
}

export const QUIZZES: ModuleQuiz[] = [
    {
        moduleId: '101',
        questions: [
            {
                id: 'q101_1',
                text: "Qual è la differenza principale tra logica PUSH e PULL?",
                options: [
                    { id: 'a', text: "PUSH pianifica su previsioni (spinge), PULL produce su richiesta (tira).", isCorrect: true },
                    { id: 'b', text: "PUSH è più veloce, PULL è più lento.", isCorrect: false },
                    { id: 'c', text: "Non c'è differenza, sono solo termini inglesi.", isCorrect: false }
                ]
            },
            {
                id: 'q101_2',
                text: "Cosa significa l'acronimo VUCA nel contesto industriale?",
                options: [
                    { id: 'a', text: "Velocity, Utility, Cost, Automation", isCorrect: false },
                    { id: 'b', text: "Volatile, Uncertain, Complex, Ambiguous", isCorrect: true },
                    { id: 'c', text: "Visual, User, Control, Action", isCorrect: false }
                ]
            },
            {
                id: 'q101_3',
                text: "Perché l'auto-organizzazione è utile in produzione?",
                options: [
                    { id: 'a', text: "Perché i manager non hanno voglia di lavorare.", isCorrect: false },
                    { id: 'b', text: "Perché permette di reagire più velocemente agli imprevisti.", isCorrect: true },
                    { id: 'c', text: "Per eliminare del tutto la gerarchia aziendale.", isCorrect: false }
                ]
            }
        ]
    },
    {
        moduleId: '102', // I 3 Pilastri
        questions: [
            {
                id: 'q102_1',
                text: 'Cosa rappresenta l\'Andon Cord in un contesto Agile Industriale?',
                options: [
                    { id: 'a', text: 'Un sistema per legare i pacchi spediti.', isCorrect: false },
                    { id: 'b', text: 'Uno strumento di Trasparenza che permette a chiunque di fermare la linea per segnalare un problema.', isCorrect: true },
                    { id: 'c', text: 'Un cavo di alimentazione per i robot.', isCorrect: false }
                ]
            },
            {
                id: 'q102_2',
                text: 'Perché fermare la linea (Fermo Linea) è un atto di "Ispezione"?',
                options: [
                    { id: 'a', text: 'Perché permette di esaminare il difetto nel momento in cui si crea, evitando sprechi a valle.', isCorrect: true },
                    { id: 'b', text: 'Perché permette agli operai di fare pausa caffè.', isCorrect: false },
                    { id: 'c', text: 'È un atto di sabotaggio, non di ispezione.', isCorrect: false }
                ]
            },
            {
                id: 'q102_3',
                text: 'Qual è l\'"Adattamento" dopo aver tirato l\'Andon Cord?',
                options: [
                    { id: 'a', text: 'Risolvere il problema alla radice (es. tarare il macchinario) prima di ripartire.', isCorrect: true },
                    { id: 'b', text: 'Tagliare il cavo Andon per non sentirlo più suonare.', isCorrect: false },
                    { id: 'c', text: 'Sgridare l\'operatore che l\'ha tirato.', isCorrect: false }
                ]
            }
        ]
    }
];
