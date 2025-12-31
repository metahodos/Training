
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
        moduleId: '102', // I 6 Pilastri
        questions: [
            {
                id: 'q102_1',
                text: 'Cosa rappresenta il Pilastro della "Trasparenza Radicale"?',
                options: [
                    { id: 'a', text: 'Vedere attraverso i muri con i Raggi X.', isCorrect: false },
                    { id: 'b', text: 'Rendre visibili problemi e flussi (es. Obeya) per poterli gestire subito.', isCorrect: true },
                    { id: 'c', text: 'Pubblicare gli stipendi di tutti online.', isCorrect: false }
                ]
            },
            {
                id: 'q102_2',
                text: 'In che modo l\'Empirismo differisce dalle opinioni?',
                options: [
                    { id: 'a', text: 'Non differisce, è un sinonimo.', isCorrect: false },
                    { id: 'b', text: 'Si basa sull\'ispezione di dati reali e artefatti tangibili per decidere l\'adattamento.', isCorrect: true },
                    { id: 'c', text: 'L\'empirismo si usa solo in laboratorio.', isCorrect: false }
                ]
            },
            {
                id: 'q102_3',
                text: 'Cosa si intende per "Flusso" (Flow)?',
                options: [
                    { id: 'a', text: 'Far scorrere il valore verso il cliente senza interruzioni o sprechi.', isCorrect: true },
                    { id: 'b', text: 'Far scorrere l\'acqua nei tubi di raffreddamento.', isCorrect: false },
                    { id: 'c', text: 'Lavorare il più velocemente possibile ignorando la qualità.', isCorrect: false }
                ]
            }
        ]
    },
    {
        moduleId: '103', // Operations & Roles
        questions: [
            {
                id: 'q103_1',
                text: 'Qual è il ruolo principale dello Scrum Master in fabbrica?',
                options: [
                    { id: 'a', text: 'Assegnare i compiti agli operai.', isCorrect: false },
                    { id: 'b', text: 'Agire come Coach e rimuovere gli ostacoli che bloccano il team.', isCorrect: true },
                    { id: 'c', text: 'Controllare gli orari di ingresso.', isCorrect: false }
                ]
            },
            {
                id: 'q103_2',
                text: 'A cosa serve la "Definition of Done" (DoD) per un componente hardware?',
                options: [
                    { id: 'a', text: 'A sapere quando andare a casa.', isCorrect: false },
                    { id: 'b', text: 'A garantire che il pezzo sia completo, testato e documentato prima di passare allo step successivo.', isCorrect: true },
                    { id: 'c', text: 'È un documento burocratico inutile.', isCorrect: false }
                ]
            },
            {
                id: 'q103_3',
                text: 'Chi partecipa al Daily Stand-up?',
                options: [
                    { id: 'a', text: 'Solo i manager.', isCorrect: false },
                    { id: 'b', text: 'Tutto il Team di sviluppo (Developers) ed eventualmente SM/PO come ascoltatori.', isCorrect: true },
                    { id: 'c', text: 'Il cliente finale.', isCorrect: false }
                ]
            }
        ]
    }
];
