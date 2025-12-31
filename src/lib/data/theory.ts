export interface TheoryModule {
    id: string;
    title: string;
    description: string;
    content: string; // Markdown content
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
        content: `
# Agile in Produzione: Oltre il Software

Il mondo industriale moderno è **VUCA** (Volatile, Uncertain, Complex, Ambiguous). I piani quinquennali non reggono più l'impatto con la realtà del mercato globale.

### La Sfida del Cambiamento
Tradizionalmente, le fabbriche operano con una logica **PUSH**:
- Si pianifica la produzione mesi prima.
- Si spinge il lavoro verso gli operatori ("Produci X pezzi entro stasera").
- Se c'è un imprevisto, il sistema si blocca o accumula scorte (waste).

### Il Modello PULL (Agile/Lean)
L'approccio Agile introduce la logica **PULL**:
- Il lavoro è "tirato" dalla domanda reale o dalla capacità effettiva del team.
- **Auto-organizzazione**: Il team decide *come* svolgere il lavoro, non riceve solo ordini.
- **Adattamento continuo**: Invece di seguire ciecamente il piano, si ispeziona il risultato e si adatta la rotta.

> "Non sopravvive la specie più forte, ma quella più reattiva al cambiamento."

Non stiamo parlando di post-it colorati, ma di **efficienza operativa** e **mitigazione del rischio** attraverso cicli brevi di feedback.
        `
    },
    {
        id: '102',
        title: 'I 3 Pilastri: Trasparenza, Ispezione, Adattamento',
        description: 'Perché l\'empirismo è fondamentale nella gestione di macchinari complessi.',
        category: 'Fundamentals',
        related_scenario_id: 'scenario_102',
        content: `
# Empirismo Industriale

Scrum si basa su tre pilastri. In fabbrica, ignorarli è costoso e pericoloso.

## 1. Trasparenza
I problemi devono essere visibili. Se un sensore non funziona, deve esserci un alert rosso.
*   **Anti-pattern**: Nascondere i pezzi di scarto sotto il banco per non farsi sgridare.
*   **Pro-pattern**: Obeya Room con i grafici degli scarti aggiornati ogni ora.

## 2. Ispezione
Controllare frequentemente verso l'obiettivo.
*   Nell'hardware, questo significa testare i sottosistemi (motori, elettronica) *prima* dell'assemblaggio finale.
*   Non è "Ispezione di Qualità" alla fine (troppo tardi), ma ispezione continua del processo.

## 3. Adattamento
Se l'ispezione mostra un problema, si cambia rotta subito.
*   Se il fornitore dei motori è in ritardo, non aspettiamo. Adattiamo il piano per lavorare prima sulla parte elettrica.

> "Senza Trasparenza e Ispezione, l'Adattamento è solo un tentativo alla cieca."
`
    },
    {
        id: '103',
        title: 'Obeya Room & Visual Management',
        description: 'La "War Room" fisica per allineare R&D, Produzione e Qualità.',
        category: 'Artifacts',
        related_scenario_id: 'scenario_103',
        content: `
# Visual Management & Obeya

Nella "fabbrica nascosta", i problemi sono invisibili finché non esplodono. L'**Obeya** (Grande Stanza) è il cervello centrale dove le decisioni vengono prese basandosi su dati visibili, non su opinioni.

## Che cos'è l'Obeya?
Obeya significa "Grande Stanza" in giapponese, ma in contesto industriale è la nostra **War Room**.
Non è una sala relax: è il luogo fisico o virtuale dove la strategia incontra l'operatività.

### La Disposizione dei Pannelli
In una Obeya efficace, le pareti "parlano":
1.  **Parete Nord (Strategia)**: Dove vogliamo andare? (Hoshin Kanri, obiettivi annuali).
2.  **Parete Est (Performance)**: Come sta andando il progetto? (Grafici di avanzamento, Burndown chart).
3.  **Parete Sud (Qualità & Supply Chain)**: Quali sono i problemi attuali? (Difettosità, ritardi fornitori).
4.  **Parete Ovest (Action Plan)**: Chi fa cosa e entro quando? (Kanban board delle azioni).

### Elementi Chiave
1.  **Metriche Visive**: KPI in tempo reale (Safety, Quality, Delivery, Cost). Se è rosso, si discute. Se è verde, si passa oltre.
2.  **Problem Solving**: I problemi non risolti in linea vengono scalati qui.
3.  **Steering Committee**: I manager non chiedono "a che punto siamo?" (report), ma "cosa vi blocca?" (supporto).

## Steering Committee vs Status Meeting
*   **Status Meeting (Tradizionale)**: "Siamo al 90%". (Spesso falso/ottimistico). Focus sulla giustificazione.
*   **Steering Committee (Agile/Lean)**: "Abbiamo un blocco sul fornitore X che impatterà la consegna". Focus sulla rimozione dell'impedimento.

> "Se non lo puoi vedere, non lo puoi gestire."
`
    },
    {
        id: '104',
        title: 'Il Valore del Prodotto (PO)',
        description: 'Massimizzare il ROI in un contesto di budget hardware ridotto.',
        category: 'Roles',
        content: `# Placeholder Module 104`
    },
    {
        id: '105',
        title: 'Prioritizzazione Industriale',
        description: 'WSJF e Cost of Delay: decidere se investire su nuovi macchinari o manutenzione.',
        category: 'Roles',
        content: `# Placeholder Module 105`
    },
    {
        id: '106',
        title: 'Servant Leadership in Fabbrica (SM)',
        description: 'Come guidare un team di operai esperti senza dare ordini.',
        category: 'Roles',
        content: `# Placeholder Module 106`
    },
    {
        id: '107',
        title: 'Metriche Lean & Kaizen',
        description: 'Lead Time, Cycle Time e il ciclo di miglioramento continuo.',
        category: 'Artifacts',
        content: `# Placeholder Module 107`
    }
];
