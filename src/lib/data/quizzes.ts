
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
    },
    {
        moduleId: '103',
        questions: [
            {
                id: 'q103_1',
                text: 'Qual è lo scopo principale di una Obeya Room?',
                options: [
                    { id: 'a', text: 'Avere una bella sala per le riunioni con i clienti.', isCorrect: false },
                    { id: 'b', text: 'Allineare visivamente tutti i dipartimenti su problemi e obiettivi in tempo reale.', isCorrect: true },
                    { id: 'c', text: 'Nascondere i problemi alla direzione.', isCorrect: false }
                ]
            },
            {
                id: 'q103_2',
                text: 'In uno Steering Committee efficace, cosa dovrebbe chiedere un manager?',
                options: [
                    { id: 'a', text: 'Di chi è la colpa del ritardo?', isCorrect: false },
                    { id: 'b', text: 'Cosa vi sta bloccando e come posso aiutarvi?', isCorrect: true },
                    { id: 'c', text: 'Quando sarà tutto finito al 100%?', isCorrect: false }
                ]
            },
            {
                id: 'q103_3',
                text: 'Se un KPI sul tabellone è "Rosso", qual è l\'atteggiamento corretto?',
                options: [
                    { id: 'a', text: 'Trovare il colpevole.', isCorrect: false },
                    { id: 'b', text: 'Ignorarlo se nessuno guarda.', isCorrect: false },
                    { id: 'c', text: 'Ispezionarlo immediatamente come opportunità di miglioramento.', isCorrect: true }
                ]
            }
        ]
    },
    {
        moduleId: '104',
        questions: [
            {
                id: 'q104_1',
                text: 'Qual è la differenza principale tra Project Manager (Tradizionale) e Product Owner (Agile)?',
                options: [
                    { id: 'a', text: 'Il PM comanda, il PO esegue.', isCorrect: false },
                    { id: 'b', text: 'Il PM si focalizza su Output (Tempi/Costi), il PO su Outcome (Valore/ROI).', isCorrect: true },
                    { id: 'c', text: 'Nessuna, sono solo nomi diversi.', isCorrect: false }
                ]
            },
            {
                id: 'q104_2',
                text: 'Cosa definisce un MVP (Minimum Viable Product) in ambito Hardware?',
                options: [
                    { id: 'a', text: 'Un prodotto scadente fatto in fretta.', isCorrect: false },
                    { id: 'b', text: 'La versione più piccola che permette di validare un\'ipotesi di rischio o valore.', isCorrect: true },
                    { id: 'c', text: 'Il prodotto finale ma senza verniciatura.', isCorrect: false }
                ]
            },
            {
                id: 'q104_3',
                text: 'Se uno stakeholder chiede una feature costosa ma di basso valore, cosa fa il PO?',
                options: [
                    { id: 'a', text: 'Dice "No" argomentando con i dati sul ROI.', isCorrect: true },
                    { id: 'b', text: 'La inserisce nel backlog per non discutere.', isCorrect: false },
                    { id: 'c', text: 'Chiede al team di fare straordinari.', isCorrect: false }
                ]
            }
        ]
    }
];
