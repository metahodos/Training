
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
        moduleId: '102',
        questions: [
            { id: 'q102_1', text: "Qual è la differenza tra Doing Agile e Being Agile?", options: [{ id: 'a', text: "Nessuna.", isCorrect: false }, { id: 'b', text: "Doing applica solo i riti, Being abbraccia i valori.", isCorrect: true }, { id: 'c', text: "Being Agile è solo per il software.", isCorrect: false }] },
            { id: 'q102_2', text: "Cosa caratterizza il Growth Mindset?", options: [{ id: 'a', text: "La convinzione che l'intelligenza sia fissa.", isCorrect: false }, { id: 'b', text: "La convinzione che le abilità si possano allenare con lo sforzo.", isCorrect: true }, { id: 'c', text: "Sapere tutto fin dall'inizio.", isCorrect: false }] },
            { id: 'q102_3', text: "Chi è al centro del Mindset Agile?", options: [{ id: 'a', text: "Il Cliente (Valore).", isCorrect: true }, { id: 'b', text: "Il Capo (Controllo).", isCorrect: false }, { id: 'c', text: "Il Processo (Burocrazia).", isCorrect: false }] }
        ]
    },
    {
        moduleId: '103',
        questions: [
            { id: 'q103_1', text: "In Metàhodos, qual è la relazione tra Felicità e Velocità?", options: [{ id: 'a', text: "Devi soffrire per essere veloce.", isCorrect: false }, { id: 'b', text: "La felicità e il benessere aumentano la produttività e la velocità sostenibile.", isCorrect: true }, { id: 'c', text: "Sono concetti opposti.", isCorrect: false }] },
            { id: 'q103_2', text: "Cosa richiede 'Coraggio' in un team Agile?", options: [{ id: 'a', text: "Lavorare 14 ore al giorno.", isCorrect: false }, { id: 'b', text: "Essere trasparenti sui problemi e dire 'No' quando necessario.", isCorrect: true }, { id: 'c', text: "Insultare i colleghi.", isCorrect: false }] },
            { id: 'q103_3', text: "Cosa significa Rispetto?", options: [{ id: 'a', text: "Fidarsi dell'autonomia e competenza dei colleghi.", isCorrect: true }, { id: 'b', text: "Dare ordini precisi.", isCorrect: false }, { id: 'c', text: "Non contraddire mai il manager.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '104',
        questions: [
            { id: 'q104_1', text: "Quali sono i 3 pilastri dell'Empirismo?", options: [{ id: 'a', text: "Trasparenza, Ispezione, Adattamento.", isCorrect: true }, { id: 'b', text: "Fede, Speranza, Carità.", isCorrect: false }, { id: 'c', text: "Pianificazione, Esecuzione, Controllo.", isCorrect: false }] },
            { id: 'q104_2', text: "Cos'è la Trasparenza Radicale?", options: [{ id: 'a', text: "Mettere telecamere ovunque.", isCorrect: false }, { id: 'b', text: "Visualizzare tutto il lavoro e i problemi (es. Obeya).", isCorrect: true }, { id: 'c', text: "Leggere le email dei dipendenti.", isCorrect: false }] },
            { id: 'q104_3', text: "Cos'è il Flusso (Flow)?", options: [{ id: 'a', text: "Lavorare senza interruzioni e sprechi verso il cliente.", isCorrect: true }, { id: 'b', text: "Andare con la corrente.", isCorrect: false }, { id: 'c', text: "Fare pause lunghe.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '105',
        questions: [
            { id: 'q105_1', text: "Cosa significa MVP?", options: [{ id: 'a', text: "Most Valuable Player.", isCorrect: false }, { id: 'b', text: "Minimum Viable Product.", isCorrect: true }, { id: 'c', text: "Maximum Velocity Project.", isCorrect: false }] },
            { id: 'q105_2', text: "A cosa serve un MVP?", options: [{ id: 'a', text: "A risparmiare soldi sulla qualità.", isCorrect: false }, { id: 'b', text: "A validare un'ipotesi di business con il minimo investimento.", isCorrect: true }, { id: 'c', text: "A consegnare un prodotto incompleto.", isCorrect: false }] },
            { id: 'q105_3', text: "Qual è il rischio principale che l'MVP riduce?", options: [{ id: 'a', text: "Il rischio di costruire qualcosa che nessuno vuole.", isCorrect: true }, { id: 'b', text: "Il rischio di incendio.", isCorrect: false }, { id: 'c', text: "Il rischio di annoiarsi.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '106',
        questions: [
            { id: 'q106_1', text: "Cos'è uno Sprint?", options: [{ id: 'a', text: "Una corsa veloce.", isCorrect: false }, { id: 'b', text: "Un ciclo breve di lavoro (es. 2 settimane) per produrre un incremento.", isCorrect: true }, { id: 'c', text: "Una riunione fiume.", isCorrect: false }] },
            { id: 'q106_2', text: "Cosa deve esserci alla fine di uno Sprint?", options: [{ id: 'a', text: "Un documento di scuse per il ritardo.", isCorrect: false }, { id: 'b', text: "Un Incremento di prodotto funzionante (Done).", isCorrect: true }, { id: 'c', text: "Solo diapositive Powerpoint.", isCorrect: false }] },
            { id: 'q106_3', text: "Perché lavoriamo a iterazioni brevi?", options: [{ id: 'a', text: "Per ricevere feedback frequenti e adattare la rotta.", isCorrect: true }, { id: 'b', text: "Per stressare il team.", isCorrect: false }, { id: 'c', text: "Per fare più riunioni.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '107',
        questions: [
            { id: 'q107_1', text: "A cosa serve l'Obeya Room?", options: [{ id: 'a', text: "Per il relax.", isCorrect: false }, { id: 'b', text: "Come radiatore di informazioni per il visual management.", isCorrect: true }, { id: 'c', text: "Per nascondere i dati sensibili.", isCorrect: false }] },
            { id: 'q107_2', text: "Cosa succede se un KPI è rosso in Obeya?", options: [{ id: 'a', text: "Si cerca il colpevole.", isCorrect: false }, { id: 'b', text: "Si attiva il problem solving per migliorare il processo.", isCorrect: true }, { id: 'c', text: "Si cancella il dato.", isCorrect: false }] },
            { id: 'q107_3', text: "Chi dovrebbe avere accesso ai dati in Obeya?", options: [{ id: 'a', text: "Solo i Direttori.", isCorrect: false }, { id: 'b', text: "Tutti, dal CEO all'Operaio (Democratizzazione).", isCorrect: true }, { id: 'c', text: "Solo i clienti.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '108',
        questions: [
            { id: 'q108_1', text: "Cosa significa Team Multidisciplinare (Cross-functional)?", options: [{ id: 'a', text: "Che fanno molti sport.", isCorrect: false }, { id: 'b', text: "Che possiede tutte le competenze interne per completare il lavoro.", isCorrect: true }, { id: 'c', text: "Che dipende da altri dipartimenti.", isCorrect: false }] },
            { id: 'q108_2', text: "Chi decide 'Come' fare il lavoro tecnico?", options: [{ id: 'a', text: "Il Manager.", isCorrect: false }, { id: 'b', text: "Il Team (Autorganizzazione).", isCorrect: true }, { id: 'c', text: "Il Cliente.", isCorrect: false }] },
            { id: 'q108_3', text: "Cosa sono le persone 'T-Shaped'?", options: [{ id: 'a', text: "Esperti in una cosa, ma capaci di collaborare su molte altre.", isCorrect: true }, { id: 'b', text: "Persone che sanno fare tutto male.", isCorrect: false }, { id: 'c', text: "Specialisti che non parlano con nessuno.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '109',
        questions: [
            { id: 'q109_1', text: "Qual è lo scopo principale di uno Steering Committee Agile?", options: [{ id: 'a', text: "Micro-management.", isCorrect: false }, { id: 'b', text: "Rimuovere impedimenti organizzativi e prendere decisioni strategiche.", isCorrect: true }, { id: 'c', text: "Leggere report cartacei.", isCorrect: false }] },
            { id: 'q109_2', text: "Come deve essere il feedback manageriale?", options: [{ id: 'a', text: "Continuo, specifico e costruttivo.", isCorrect: true }, { id: 'b', text: "Annuale e punitivo.", isCorrect: false }, { id: 'c', text: "Assente, se non c'è niente che non va.", isCorrect: false }] },
            { id: 'q109_3', text: "Cosa deve fare il PO con gli stakeholder?", options: [{ id: 'a', text: "Dire sempre di sì.", isCorrect: false }, { id: 'b', text: "Gestire le aspettative e saper dire 'No' o 'Non ora'.", isCorrect: true }, { id: 'c', text: "Ignorarli.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '110',
        questions: [
            { id: 'q110_1', text: "Cos'è la Sicurezza Psicologica?", options: [{ id: 'a', text: "Avere l'elmetto protettivo.", isCorrect: false }, { id: 'b', text: "Sentirsi sicuri di poter sbagliare o parlare senza essere puniti.", isCorrect: true }, { id: 'c', text: "Avere un lavoro a vita.", isCorrect: false }] },
            { id: 'q110_2', text: "Come si gestisce un errore grave (es. server down)?", options: [{ id: 'a', text: "Blameless Post-Mortem (cercare la causa sistemica, non il colpevole).", isCorrect: true }, { id: 'b', text: "Licenziando il responsabile.", isCorrect: false }, { id: 'c', text: "Nascondendolo.", isCorrect: false }] },
            { id: 'q110_3', text: "Perché 'Fail Fast' è positivo?", options: [{ id: 'a', text: "Perché ci piace fallire.", isCorrect: false }, { id: 'b', text: "Perché riduce il costo dell'errore e accelera l'apprendimento.", isCorrect: true }, { id: 'c', text: "Non è positivo, il fallimento è inaccettabile.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '111',
        questions: [
            { id: 'q111_1', text: "Qual è la gerarchia corretta scomposizione?", options: [{ id: 'a', text: "Epica -> User Story -> Task.", isCorrect: true }, { id: 'b', text: "Progetto -> Fase -> Attività.", isCorrect: false }, { id: 'c', text: "Macro -> Micro -> Nano.", isCorrect: false }] },
            { id: 'q111_2', text: "Perché scomponiamo il lavoro?", options: [{ id: 'a', text: "Per aumentare la burocrazia.", isCorrect: false }, { id: 'b', text: "Per ridurre l'ansia e ottenere feedback prima.", isCorrect: true }, { id: 'c', text: "Per fare più ticket su Jira.", isCorrect: false }] },
            { id: 'q111_3', text: "Cosa significa 'Vertical Slicing'?", options: [{ id: 'a', text: "Affettare il salame.", isCorrect: false }, { id: 'b', text: "Scomporre per funzionalità completa (Valore) e non per layer tecnico.", isCorrect: true }, { id: 'c', text: "Dividere il team in due.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '112',
        questions: [
            { id: 'q112_1', text: "Cosa significa la 'N' in I.N.V.E.S.T.?", options: [{ id: 'a', text: "Nice to have.", isCorrect: false }, { id: 'b', text: "Negotiable (la storia è un invito alla discussione).", isCorrect: true }, { id: 'c', text: "No.", isCorrect: false }] },
            { id: 'q112_2', text: "Chi scrive le User Stories?", options: [{ id: 'a', text: "Solo il PO.", isCorrect: false }, { id: 'b', text: "Il PO, ma spesso in collaborazione con il Team.", isCorrect: true }, { id: 'c', text: "Il cliente finale via fax.", isCorrect: false }] },
            { id: 'q112_3', text: "Come deve essere una storia 'Small'?", options: [{ id: 'a', text: "Deve stare in uno Sprint (pochi giorni).", isCorrect: true }, { id: 'b', text: "Deve essere scritta piccola.", isCorrect: false }, { id: 'c', text: "Deve richiedere meno di 5 minuti.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '113',
        questions: [
            { id: 'q113_1', text: "Perché usiamo i Punti (Story Points) invece delle ore?", options: [{ id: 'a', text: "Perché le ore sono noiose.", isCorrect: false }, { id: 'b', text: "Per stimare la complessità relativa ed evitare l'ottimismo temporale.", isCorrect: true }, { id: 'c', text: "Per confondere i manager.", isCorrect: false }] },
            { id: 'q113_2', text: "Cosa include uno Story Point?", options: [{ id: 'a', text: "Volume, Complessità, Incertezza.", isCorrect: true }, { id: 'b', text: "Solo il tempo di sviluppo.", isCorrect: false }, { id: 'c', text: "Il costo in euro.", isCorrect: false }] },
            { id: 'q113_3', text: "Cos'è il Cono dell'Incertezza?", options: [{ id: 'a', text: "Un gelato.", isCorrect: false }, { id: 'b', text: "Il fenomeno per cui l'errore di stima si riduce man mano che il progetto avanza.", isCorrect: true }, { id: 'c', text: "Un cappello da mago.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '114',
        questions: [
            { id: 'q114_1', text: "A cosa serve il Planning Poker?", options: [{ id: 'a', text: "A giocare d'azzardo.", isCorrect: false }, { id: 'b', text: "A evitare il bias dell'ancoraggio (tutti svelano la stima insieme).", isCorrect: true }, { id: 'c', text: "A decidere chi paga il pranzo.", isCorrect: false }] },
            { id: 'q114_2', text: "Cosa facciamo se le stime divergono (es. 2 vs 13)?", options: [{ id: 'a', text: "Facciamo la media matematica.", isCorrect: false }, { id: 'b', text: "Discutiamo le differenze di opinione per allinearci sulla comprensione.", isCorrect: true }, { id: 'c', text: "Vince la maggioranza.", isCorrect: false }] },
            { id: 'q114_3', text: "Perché usiamo la serie di Fibonacci (1, 2, 3, 5, 8...)?", options: [{ id: 'a', text: "Perché riflette l'aumento dell'incertezza con la dimensione.", isCorrect: true }, { id: 'b', text: "Perché è bella esteticamente.", isCorrect: false }, { id: 'c', text: "Per usare numeri a caso.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '115',
        questions: [
            { id: 'q115_1', text: "Qual è lo scopo principale di una Kanban Board?", options: [{ id: 'a', text: "Decorare l'ufficio.", isCorrect: false }, { id: 'b', text: "Visualizzare il flusso di lavoro e i blocchi.", isCorrect: true }, { id: 'c', text: "Controllare chi lavora di più.", isCorrect: false }] },
            { id: 'q115_2', text: "Cosa significa 'Doing' nella board?", options: [{ id: 'a', text: "Cose che faremo forse un giorno.", isCorrect: false }, { id: 'b', text: "Work In Progress (lavoro attualmente in corso).", isCorrect: true }, { id: 'c', text: "Lavoro finito ma non consegnato.", isCorrect: false }] },
            { id: 'q115_3', text: "Il sistema Kanban è Push o Pull?", options: [{ id: 'a', text: "Push (spinto).", isCorrect: false }, { id: 'b', text: "Pull (tirato dalla disponibilità a valle).", isCorrect: true }, { id: 'c', text: "Neutro.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '116',
        questions: [
            { id: 'q116_1', text: "Cosa significa 'Stop Starting, Start Finishing'?", options: [{ id: 'a', text: "Smetti di aprire nuovi cantieri, chiudi quelli aperti.", isCorrect: true }, { id: 'b', text: "Smetti di lavorare.", isCorrect: false }, { id: 'c', text: "Inizia tutto e vedi cosa succede.", isCorrect: false }] },
            { id: 'q116_2', text: "Qual è l'effetto del Multitasking (Context Switch)?", options: [{ id: 'a', text: "Aumenta la produttività.", isCorrect: false }, { id: 'b', text: "Riduce drasticamente l'efficienza e aumenta gli errori.", isCorrect: true }, { id: 'c', text: "Non ha effetti.", isCorrect: false }] },
            { id: 'q116_3', text: "Cosa dice la Legge di Little?", options: [{ id: 'a', text: "Il tempo è denaro.", isCorrect: false }, { id: 'b', text: "Tempo di Attraversamento = WIP / Throughput (meno WIP = più velocità).", isCorrect: true }, { id: 'c', text: "Tutto è relativo.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '117',
        questions: [
            { id: 'q117_1', text: "Che differenza c'è tra Lead Time e Cycle Time?", options: [{ id: 'a', text: "Lead Time è vista cliente (totale), Cycle Time è vista team (esecuzione).", isCorrect: true }, { id: 'b', text: "Sono la stessa cosa.", isCorrect: false }, { id: 'c', text: "Il Lead Time è per i metalli pesanti.", isCorrect: false }] },
            { id: 'q117_2', text: "Perché non si deve usare la Velocity come metrica di performance?", options: [{ id: 'a', text: "Perché è un dato di pianificazione e stima, facilmente manipolabile.", isCorrect: true }, { id: 'b', text: "Perché è troppo precisa.", isCorrect: false }, { id: 'c', text: "Perché piace ai manager.", isCorrect: false }] },
            { id: 'q117_3', text: "Cos'è l'Aging dei work item?", options: [{ id: 'a', text: "L'età anagrafica degli sviluppatori.", isCorrect: false }, { id: 'b', text: "Da quanto tempo un ticket è fermo in lavorazione (rischio ritardo).", isCorrect: true }, { id: 'c', text: "L'invecchiamento del server.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '118',
        questions: [
            { id: 'q118_1', text: "Cosa mostra il Cumulative Flow Diagram (CFD)?", options: [{ id: 'a', text: "Il flusso dei soldi.", isCorrect: false }, { id: 'b', text: "La quantità di lavoro in ogni stato nel tempo (WIP, colli di bottiglia).", isCorrect: true }, { id: 'c', text: "Il meteo.", isCorrect: false }] },
            { id: 'q118_2', text: "Se il Burn-down chart è una linea piatta, cosa significa?", options: [{ id: 'a', text: "Che stiamo andando benissimo.", isCorrect: false }, { id: 'b', text: "Che non stiamo completando nulla (blocco).", isCorrect: true }, { id: 'c', text: "Che abbiamo finito tutto.", isCorrect: false }] },
            { id: 'q118_3', text: "Cosa sono i Radiatori di Informazioni?", options: [{ id: 'a', text: "Termosifoni.", isCorrect: false }, { id: 'b', text: "Display grandi e visibili che mostrano lo stato del progetto a tutti.", isCorrect: true }, { id: 'c', text: "Email segrete.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '119',
        questions: [
            { id: 'q119_1', text: "Qual è lo scopo della Sprint Retrospective?", options: [{ id: 'a', text: "Ispezionare il processo e decidere come migliorare nel prossimo Sprint.", isCorrect: true }, { id: 'b', text: "Lamentarsi del cliente.", isCorrect: false }, { id: 'c', text: "Fare un aperitivo.", isCorrect: false }] },
            { id: 'q119_2', text: "Cosa succede nel Daily Scrum?", options: [{ id: 'a', text: "Il Manager assegna i task.", isCorrect: false }, { id: 'b', text: "Il Team si allinea sul piano delle prossime 24h verso lo Sprint Goal.", isCorrect: true }, { id: 'c', text: "Si scrivono documenti.", isCorrect: false }] },
            { id: 'q119_3', text: "Chi partecipa alla Sprint Review?", options: [{ id: 'a', text: "Solo il Team.", isCorrect: false }, { id: 'b', text: "Scrum Team e Stakeholder (per dare feedback sull'incremento).", isCorrect: true }, { id: 'c', text: "Nessuno.", isCorrect: false }] }
        ]
    },
    {
        moduleId: '120',
        questions: [
            { id: 'q120_1', text: "Qual è il focus principale del Lean?", options: [{ id: 'a', text: "Efficienza e rimozione degli sprechi (Muda).", isCorrect: true }, { id: 'b', text: "Creatività caotica.", isCorrect: false }, { id: 'c', text: "Aumentare le scorte.", isCorrect: false }] },
            { id: 'q120_2', text: "Cosa hanno in comune Lean e Agile?", options: [{ id: 'a', text: "Nulla.", isCorrect: false }, { id: 'b', text: "Il focus sul valore per il cliente e il miglioramento continuo (Kaizen).", isCorrect: true }, { id: 'c', text: "L'uso di Excel.", isCorrect: false }] },
            { id: 'q120_3', text: "Cos'è il Kaizen?", options: [{ id: 'a', text: "Una marca di moto.", isCorrect: false }, { id: 'b', text: "La filosofia del miglioramento continuo a piccoli passi.", isCorrect: true }, { id: 'c', text: "Un piatto giapponese.", isCorrect: false }] }
        ]
    }
];
