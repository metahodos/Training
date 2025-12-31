export const INITIAL_SCENARIOS = [
    {
        id: '1',
        title: 'Blocco Linea Assemblaggio',
        description: 'Mancano i cuscinetti per la linea pilota. Il team è bloccato e il Project Manager spinge per una soluzione rapida.',
        role_target: 'SM',
        difficulty: 'Junior',
        initial_context: 'Sei lo Scrum Master. Durante il Daily allo stand-up meeting in reparto, l\'operatore capo segnala che i cuscinetti specifici per il prototipo non sono arrivati. La linea è ferma. Il Project Manager tradizionale urla: "Fate saltare i test di qualità e montate quelli standard!". Il team ti guarda.',
    },
    {
        id: '2',
        title: 'Priorità Refitting Impianto',
        description: 'Bisogna decidere se aggiornare prima i sensori IoT o i motori della pressa. Budget limitato.',
        role_target: 'PO',
        difficulty: 'Mid',
        initial_context: 'Sei il Product Owner del Refitting. Hai budget per una sola modifica questo mese. L\'ingegnere di manutenzione vuole cambiare i motori (rischio rottura: medio). Il responsabile Digital vuole i sensori IoT per i dati (ROI atteso: alto). Gli stakeholder premono. Come ordini il Backlog?',
    },
    {
        id: '3',
        title: 'Conflitto in Obeya Room',
        description: 'R&D e Produzione non si allineano sulle specifiche del nuovo macchinario.',
        role_target: 'SM',
        difficulty: 'Senior',
        initial_context: 'Sei lo Scrum Master. In Obeya Room, davanti ai grafici dei KPI, nasce un conflitto. R&D ha progettato una scocca esteticamente perfetta ma impossibile da stampare in serie senza scarti del 40%. La Produzione si rifiuta di accettare il disegno. I toni si alzano.',
    },
    {
        id: '4',
        title: 'MVP del Braccio Robotico',
        description: 'Definire cosa è essenziale per il primo test sul campo del nuovo robot collaborativo.',
        role_target: 'PO',
        difficulty: 'Junior',
        initial_context: 'Sei il Product Owner. Il cliente vuole vedere il robot in azione tra 2 settimane. Il team vuole perfezionare la verniciatura e l\'interfaccia HMI. Tu sai che l\'importante è dimostrare la capacità di presa e sicurezza. Devi negoziare l\'MVP.',
    },
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
    }
];
