export const INITIAL_SCENARIOS = [
    {
        id: 'scenario_101', // New ID for Module 101
        title: "L'Urgenza dello Stakeholder",
        description: "Sei lo Scrum Master del Team di Assemblaggio. Il Direttore Commerciale piomba in reparto chiedendo di inserire 'subito' una personalizzazione per un cliente importante, ignorando il piano di produzione stabilito per la settimana.",
        role_target: 'SM',
        difficulty: 'Intermedio',
        initial_context: "Ciao! Ascolta, ho promesso al cliente Beta che gli montiamo il sensore X500 su questo lotto entro domani. Lo so che non è in piano, ma è fondamentale. Fatelo passare subito, ok? Non possiamo dire di no a questo cliente.",
    },
    {
        id: 'scenario_102', // Linked to Module 102
        title: 'Il dilemma dell\'Andon Cord',
        description: 'Un difetto ricorrente sulla linea: fermare tutto (Ispezione) o continuare per fare i numeri (Push)?',
        role_target: 'SM',
        difficulty: 'Senior',
        initial_context: 'Sei lo Scrum Master di linea. Un operatore nota, per la terza volta in un\'ora, una sbavatura sul carter. Il Capo Turno urla: "Non tirate quel maledetto cordone, siamo in ritardo di 50 pezzi!". L\'operatore ha la mano sulla corda di emergenza (Andon) ma trema. Se non ferma, avremo 500 pezzi da scartare stasera. Se ferma, il Capo Turno esplode. Cosa fai?',
    },
    {
        id: 'scenario_103',
        title: "Il Tabellone non Mente",
        description: "Durante il Daily in Obeya, emerge un ritardo critico su un fornitore. Il CEO è presente. Devi facilitare la discussione per ri-prioritizzare senza nascondere la verità.",
        role_target: 'Scrum Master',
        difficulty: 'Advanced',
        initial_context: "Sei in Obeya Room per lo Steering Committee. Il tabellone segna un ritardo di 3 settimane sul motore. Un manager suggerisce: 'Non diciamolo ancora, magari recuperiamo'. Il CEO ti guarda in attesa. Il tabellone urla la verità.",
    },
    {
        id: 'scenario_104',
        title: "L'MVP del Braccio Robotico",
        description: "Il cliente vuole tutto subito per la fiera. Il team rischia il burnout e il fallimento. Tu devi negoziare un MVP che salvi la faccia e il budget.",
        role_target: 'Product Owner',
        difficulty: 'Intermediate',
        initial_context: "Manca 1 mese alla fiera di Hannover. Il Direttore Commerciale vuole esporre il nuovo Robot a 6 assi completo. Il team R&D ti dice che il giunto rotante #3 si surriscalda ancora. Costruire l'intero robot ora è un suicidio (costo stampi: 50k). Devi proporre un'alternativa che porti valore (dimostrare la tecnologia) senza rischiare il disastro.",
    }
];
