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
        title: 'Fondamenta: Mindset Industriale',
        description: 'Dal PUSH al PULL: Rispondere alla complessità (VUCA) in fabbrica.',
        category: 'Fundamentals',
        related_scenario_id: 'scenario_101',
        lessons: [
            {
                id: '101_1',
                title: 'Il Mondo VUCA in Fabbrica',
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
I dati mogą essere interpretati in modi diversi. "Il cliente vuole qualità" - cosa significa? Durata? Estetica? Funzionalità?

> "Non sopravvive la specie più forte, ma quella più reattiva al cambiamento." - Charles Darwin (adattato al Lean)
                `
            },
            {
                id: '101_2',
                title: 'Waterfall vs Agile',
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
                title: 'Push vs Pull: La Rivoluzione',
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
        title: 'I 6 Pilastri QuickWorks',
        description: 'La struttura portante per team hardware ad alte prestazioni.',
        category: 'Fundamentals',
        related_scenario_id: 'scenario_102',
        lessons: [
            {
                id: '102_1',
                title: 'Pilastro 1: Trasparenza Radicale',
                content: `
# 1. Trasparenza Radicale (Visual Management)

In fabbrica, un problema nascosto diventa presto un disastro.

### Visualizzare il Lavoro
Se non lo vedi, non puoi gestirlo. Usiamo l'**Obeya Room** o Kanban fisici.
- **Chi fa cosa?**
- **Dov'è il collo di bottiglia?**
- **Chi è bloccato?**

### Andon Cord (Fermare la Linea)
Dare il potere agli operatori di fermare la linea se vedono un difetto.
- **Paradosso**: Fermare oggi per correre domani.
- **Coraggio**: Serve coraggio per segnalare un problema quando si è in ritardo.

> "I problemi sono come funghi: crescono al buio. Accendi la luce."
                `
            },
            {
                id: '102_2',
                title: 'Pilastro 2: Empirismo',
                content: `
# 2. Empirismo

Basta opinioni, servono dati.
**Scrum** si basa su 3 gambe empiriche:

1.  **Trasparenza**: Rendi visibili i dati reali (Lead Time, Cycle Time, Difetti).
2.  **Ispezione**: Controlla frequentemente il prodotto (non il piano) tramite Review reali.
3.  **Adattamento**: Se i dati dicono che la macchina vibra troppo, CAMBIA i parametri subito. Non aspettare la fine del lotto.

> "In Dio ci fidiamo, tutti gli altri portino dati." - W.E. Deming
                `
            },
            {
                id: '102_3',
                title: 'Pilastro 3: Flusso (Flow)',
                content: `
# 3. Flusso (Flow)

L'obiettivo non è tenere tutti "occupati", ma far scorrere il **Valore** verso il cliente il più velocemente possibile.

### Eliminare gli Sprechi (Muda)
- **Attese**: Pezzi fermi in attesa di lavorazione.
- **Movimenti inutili**: Camminare 100 metri per prendere un attrezzo.
- **Sovrapproduzione**: Fare cose che nessuno ha chiesto ancora.

### Ottimizzare il Sistema, non il Singolo
Se il reparto tornitura va al 200% ma l'assemblaggio è lento, hai solo creato una montagna di pezzi fermi. Rallenta la tornitura per sincronizzarla.
                `
            }
        ]
    },
    {
        id: '103',
        title: 'Operatività Agile (Scrum)',
        description: 'Ruoli e Riti adattati al contesto manifatturiero.',
        category: 'Roles',
        related_scenario_id: 'scenario_103',
        lessons: [
            {
                id: '103_1',
                title: 'I Ruoli in Tutte Blu',
                content: `
# I Ruoli di Scrum in Fabbrica

### 1. Product Owner (PO)
Non è il "Capo Commessa". È colui che **Massimizza il Valore**.
- Decide le priorità: "Prima rifare i cablaggi o aggiornare il software?".
- Parla con i clienti e traduce i bisogni in requisiti per il team.

### 2. Scrum Master (SM)
È il **Coach del Processo**.
- Non dà ordini. Rimuove ostacoli.
- "Mancano i pezzi? Vado io a parlare col magazzino, voi continuate a montare".
- Protegge il team dalle interferenze esterne.

### 3. Developers (Il Team)
Non solo programmatori. Sono tornitori, elettricisti, montatori, progettisti.
- **Autorganizzati**: Decidono LORO "come" fare il lavoro, non il manager.
                `
            },
            {
                id: '103_2',
                title: 'I Riti Fondamentali',
                content: `
# I Riti (Cerimonie)

Non sono riunioni noiose, sono momenti di sincronizzazione.

### Daily Scrum (Stand-up)
- 15 minuti max, in piedi, davanti alla lavagna.
- "Cosa ho montato ieri? Cosa monto oggi? Ho attrezzi rotti?"

### Sprint Planning
- Si decide cosa produrre/progettare nelle prossime 2 settimane.
- Si stima la capacità reale (non i desideri del direttore).

### Sprint Review (La "Demo")
- Non powerpoint, ma PEZZI FISICI.
- Si tocca il prototipo, si prova il macchinario.
- Feedback immediato dagli stakeholder.
                `
            },
            {
                id: '103_3',
                title: 'Artefatti: DoR e DoD',
                content: `
# Definition of Done (DoD)

Quando un pezzo è "Finito"?
- **Software**: Code committed, tested, deployed.
- **Hardware**: Pezzo montato, sbavato, verniciato, test elettrico pass, documentazione aggiornata.

Se manca anche solo una vite, NON è "Finito". Non portiamo a valle debiti.

### Definition of Ready (DoR)
Quando possiamo iniziare a lavorare su un ordine?
- Materiale disponibile?
- Disegni approvati?
- Macchina libera?
Se no, non iniziamo. Evitiamo di bloccarci a metà.
                `
            }
        ]
    }
];
