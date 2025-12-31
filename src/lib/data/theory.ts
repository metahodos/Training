export interface Lesson {
    id: string;
    title: string;
    content: string; // Markdown content
}

export interface TheoryModule {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
    category: 'Fundamentals' | 'Roles' | 'Artifacts' | 'Events';
    related_scenario_id?: string;
}

export const THEORY_MODULES: TheoryModule[] = [
    {
        id: '101',
        title: 'Agile Mindset Industriale',
        description: 'Dal PUSH al PULL: Rispondere alla complessità (VUCA) in fabbrica.',
        category: 'Fundamentals',
        related_scenario_id: 'scenario_101',
        lessons: [
            {
                id: '101_1',
                title: 'Il Contesto Industriale e il mondo VUCA',
                content: `
# Il Contesto Industriale e il mondo VUCA

Il mondo industriale moderno è **VUCA** (Volatile, Uncertain, Complex, Ambiguous). I piani quinquennali non reggono più l'impatto con la realtà del mercato globale.

### La Volatilità (Volatility)
I prezzi delle materie prime cambiano rapidamente, la domanda oscilla e le forniture non sono garantite. Una fabbrica rigida soffre ogni scossone.

### L'Incertezza (Uncertainty)
Non possiamo prevedere il futuro. Fare stock basandosi su previsioni di vendita di 12 mesi fa è una scommessa, non una strategia.

### La Complessità (Complexity)
Un'auto moderna ha milioni di righe di codice e migliaia di componenti. Le interazioni tra reparti (Elettronica, Meccanica, Software) sono non-lineari. Un piccolo ritardo in R&D può bloccare l'intera catena.

### L'Ambiguità (Ambiguity)
I dati pueden essere interpretati in modi diversi. "Il cliente vuole qualità" - cosa significa? Durata? Estetica? Funzionalità?

> "Non sopravvive la specie più forte, ma quella più reattiva al cambiamento." - Charles Darwin (adattato al Lean)
                `
            },
            {
                id: '101_2',
                title: 'Mindset Agile vs Tradizionale',
                content: `
# Mindset Agile vs Tradizionale (Waterfall)

In produzione, spesso si confonde Agile con "fare le cose più in fretta e male". Nulla di più falso.

### Approccio Tradizionale (Waterfall)
1.  **Grandi lotti**: Produciamo 10.000 pezzi tutti insieme per "ottimizzare il setup".
2.  **Silos**: L'ingegneria progetta, lancia il disegno "oltre il muro" alla produzione, che prova a costruirlo e poi inveisce contro l'ingegneria.
3.  **Resistance to Change**: "Abbiamo sempre fatto così". Il cambiamento è visto come un costo/errore.

### Approccio Agile Mindset
1.  **Piccoli lotti (Flow)**: Produciamo 100 pezzi, li testiamo, impariamo. Riduciamo il rischio di scartare 10.000 pezzi difettosi.
2.  **Cross-functional Teams**: Ingegneri e Operatori lavorano insieme nello stesso team per risolvere i problemi di producibilità *durante* il design.
3.  **Embrace Change**: Il cambiamento è un'opportunità di miglioramento competitivo.

> "Agile non è assenza di regole, è assenza di burocrazia inutile."
                `
            },
            {
                id: '101_3',
                title: 'Passaggio dal Modello Push al Modello Pull',
                content: `
# Dal PUSH al PULL

La vera rivoluzione copernicana in fabbrica.

### Il Modello PUSH (Spingere)
È basato sulle previsioni (Forecast).
- Il Manager dice: "La tabella dice che devi produrre 500 pezzi oggi."
- L'Operatore produce 500 pezzi, anche se il magazzino a valle è pieno.
- Risultato: **Overproduction** (il più grande spreco del Lean), magazzini pieni, capitale immobilizzato.

### Il Modello PULL (Tirare)
È basato sulla domanda reale (Market/Downstream).
- L'Operatore a valle (o il cliente) preleva un pezzo.
- Questo invia un segnale (Kanban) a monte: "Ho un posto vuoto, producime uno".
- Si produce SOLO ciò che serve, QUANDO serve.

### Benefici
- **Zero Scorte inutili**: Cash flow migliorato.
- **Qualità**: Se c'è un difetto, te ne accorgi subito (perché il processo a valle si ferma), non dopo 500 pezzi.
- **Reattività**: Se il cliente cambia ordine, non hai 500 pezzi da buttare.
                `
            }
        ]
    },
    {
        id: '102',
        title: 'I 3 Pilastri: Trasparenza, Ispezione, Adattamento',
        description: 'Perché l\'empirismo è fondamentale nella gestione di macchinari complessi.',
        category: 'Fundamentals',
        related_scenario_id: 'scenario_102',
        lessons: [
            {
                id: '102_1',
                title: 'Andon Cord: Trasparenza Radicale',
                content: `
# Andon Cord

In Toyota, ogni operatore ha una corda (Andon) da tirare se vede un problema. Quando tirata, **la linea si ferma**.

### Perché fermare tutto?
Sembra controintuitivo ("stiamo perdendo produzione!"), ma:
1.  Rende il problema immediatamente **Visibile (Trasparenza)**.
2.  Costringe a risolvere la **Causa Radice** subito, invece di mettere una pezza e continuare a produrre scarti.

### La Paura della Trasparenza
In molte aziende tradizionali, fermare la linea è un crimine. Gli operatori nascondono i problemi per paura.
Agile richiede **Sicurezza Psicologica**: evidenziare un problema è un atto di coraggio premiato, non punito.
                `
            },
            {
                id: '102_2',
                title: 'I 3 Pilastri dell\'Empirismo',
                content: `
# I 3 Pilastri dell'Empirismo

Scrum si fonda sull'Empirismo: la conoscenza deriva dall'esperienza e le decisioni si basano su ciò che si osserva.

1.  **Trasparenza**: Le criticità devono essere visibili a tutti (Obeya, Dashboard condivise). Niente report "aggiustati" per il management.
2.  **Ispezione**: Controllare frequentemente gli artefatti e l'avanzamento verso l'obiettivo per rilevare variazioni indesiderate.
3.  **Adattamento**: Se l'ispezione mostra che siamo fuori rotta, dobbiamo correggere il processo *immediatamente*.

> "Trasparenza senza ispezione è inutile. Ispezione senza adattamento è solo constatazione di decesso."
                `
            }
        ]
    },
    {
        id: '103',
        title: 'Obeya Room & Visual Management',
        description: 'La "War Room" fisica per allineare R&D, Produzione e Qualità.',
        category: 'Artifacts',
        related_scenario_id: 'scenario_103',
        lessons: [
            {
                id: '103_1',
                title: 'Introduzione all\'Obeya',
                content: '# Intro Obeya\n Placeholder content.' // Keeping short for existing
            }
        ]
    },
    {
        id: '104',
        title: 'Il Valore del Prodotto (PO)',
        description: 'Dal "Fare tutto" al "Fare ciò che conta". Massimizzare il ROI in fabbrica.',
        category: 'Roles',
        related_scenario_id: 'scenario_104',
        lessons: [
            {
                id: '104_1',
                title: 'Ruolo del PO',
                content: '# Product Owner\n Placeholder content.'
            }
        ]
    },
    {
        id: '105',
        title: 'Prioritizzazione Industriale',
        description: 'WSJF e Cost of Delay: decidere se investire su nuovi macchinari o manutenzione.',
        category: 'Roles',
        lessons: [
            {
                id: '105_1',
                title: 'WSJF',
                content: '# WSJF\n Placeholder content.'
            }
        ]
    },
    {
        id: '106',
        title: 'Servant Leadership in Fabbrica (SM)',
        description: 'Come guidare un team di operai esperti senza dare ordini.',
        category: 'Roles',
        lessons: [
            {
                id: '106_1',
                title: 'Servant Leader',
                content: '# Servant Leader\n Placeholder content.'
            }
        ]
    },
    {
        id: '107',
        title: 'Metriche Lean & Kaizen',
        description: 'Lead Time, Cycle Time e il ciclo di miglioramento continuo.',
        category: 'Artifacts',
        lessons: [
            {
                id: '107_1',
                title: 'Kaizen',
                content: '# Kaizen\n Placeholder content.'
            }
        ]
    }
];
