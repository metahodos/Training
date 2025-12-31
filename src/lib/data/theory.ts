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
    category: 'Fundamentals' | 'Roles' | 'Artifacts' | 'Events' | 'Techniques' | 'Mindset';
    related_scenario_id?: string;
}

export const THEORY_MODULES: TheoryModule[] = [
    {
        id: '101',
        title: 'Mondo V.U.C.A.',
        description: 'Navigare nella tempesta perfetta: Volatilità, Incertezza, Complessità, Ambiguità.',
        category: 'Fundamentals',
        related_scenario_id: 'scenario_101',
        lessons: [
            {
                id: '101_1',
                title: 'La Nuova Normalità',
                content: "# V.U.C.A. in Fabbrica\n\nIl mondo stabile dei piani quinquennali è finito. Oggi viviamo in un contesto **V.U.C.A.**:\n\n- **Volatile**: I prezzi delle materie prime cambiano in ore, non mesi.\n- **Uncertain**: Non sappiamo cosa ordinerà il cliente domani.\n- **Complex**: Una modifica in R&D blocca la linea di montaggio.\n- **Ambiguous**: I dati hanno molteplici interpretazioni.\n\n> \"Non è la specie più forte a sopravvivere, ma quella più reattiva al cambiamento.\""
            },
            {
                id: '101_2',
                title: 'Volatilità e Incertezza',
                content: "# Gestire l'Imprevedibile\n\nCome si pianifica quando tutto cambia?\n\n- **Tradizionale**: Cerchiamo di prevedere meglio (Forecast più complessi).\n- **Agile**: Smettiamo di prevedere e iniziamo a **reagire** più velocemente (Lead Time ridotto).\n\nL'incertezza non è un errore del sistema, è una caratteristica del mercato con cui dobbiamo convivere."
            },
            {
                id: '101_3',
                title: 'Complessità Sistemica',
                content: "# Complicato vs Complesso\n\n- **Complicato**: Un orologio. Tanti pezzi, ma se ne smonti uno sai cosa succede. Si risolve con l'analisi.\n- **Complesso**: Il traffico (o una fabbrica). Le interazioni sono imprevedibili. Si risolve con l'**empirismo** (prova e adatta).\n\nNon trattare la tua azienda come una macchina, ma come un organismo vivente."
            },
            {
                id: '101_4',
                title: 'Ambiguità Interpretativa',
                content: "# Chiarezza nell'Ambiguità\n\nIl cliente chiede \"Alta Qualità\". Per lui significa estetica, per te durata. Questa ambiguità genera sprechi enormi.\n\nLa risposta Agile è la **comunicazione diretta** e frequente. Invece di documenti di 100 pagine, costruisci un prototipo e chiedi: \"È questo che intendevi?\"."
            }
        ]
    },
    {
        id: '102',
        title: 'Agile Mindset',
        description: 'Growth Mindset vs Fixed Mindset: cambiare testa prima dei processi.',
        category: 'Fundamentals',
        related_scenario_id: 'scenario_102',
        lessons: [
            {
                id: '102_1',
                title: 'Essere vs Fare Agile',
                content: "# Doing Agile vs Being Agile\n\nPuoi fare Stand-up meeting ogni mattina e rimanere un'azienda burocratica (**Zombie Scrum**).\n\n- **Doing Agile**: Applicare i riti meccanicamente.\n- **Being Agile**: Abbracciare i valori. Accettare che il piano cambierà. Vedere l'errore come apprendimento."
            },
            {
                id: '102_2',
                title: 'Fixed vs Growth Mindset',
                content: "# La Mentalità di Crescita\n\n- **Fixed Mindset**: \"Abbiamo sempre fatto così\". Il talento è innato. Il fallimento è una vergogna.\n- **Growth Mindset**: \"Non so farlo... ANCORA\". Le capacità si allenano. Il fallimento è un dato per migliorare.\n\nIn fabbrica, il Growth Mindset trasforma l'errore in **Kaizen** (miglioramento continuo)."
            },
            {
                id: '102_3',
                title: 'Il Cliente al Centro',
                content: "# Customer Centricity\n\nNel modello tradizionale, il focus è sul **Boss** o sul **Processo**.\nNel Mindset Agile, il focus è sul **Valore per il Cliente**.\n\nOgni azione che non porta valore al cliente è, per definizione, uno **Spreco (Muda)**."
            },
            {
                id: '102_4',
                title: 'Servant Leadership',
                content: "# Il Leader al Servizio\n\nIl manager tradizionale comanda e controlla (Command & Control).\nIl leader Agile chiede: **\"Di cosa avete bisogno per lavorare meglio?\"**.\n\nSposta ostacoli, non persone. Dona autonomia, non ordini.\n> \"A fool with a tool is still a fool.\""
            }
        ]
    },
    {
        id: '103',
        title: 'Valori Metàhodos',
        description: 'Persone felici e veloci, Coraggio, Rispetto.',
        category: 'Fundamentals',
        related_scenario_id: 'scenario_103',
        lessons: [
            {
                id: '103_1',
                title: 'Persone Felici e Veloci',
                content: "# La Felicità è Produttiva\n\nUn team stressato, sovraccarico e impaurito produce errori. Un team sereno, riposato e motivato produce qualità e innovazione.\n\n**Metàhodos** punta a rendere il lavoro sostenibile. Non si corre per 100 metri, si corre una maratona. La velocità (Speed) è conseguenza della fluidità (Flow) e della felicità."
            },
            {
                id: '103_2',
                title: 'Il Coraggio',
                content: "# Il Valore del Coraggio\n\nServe coraggio per:\n- Dire \"No\" a uno stakeholder potente quando la richiesta è irrealistica.\n- Tirare l'Andon Cord e fermare la linea.\n- Ammettere \"Non lo so\" in una riunione.\n\nSenza coraggio, la trasparenza muore e i problemi vengono nascosti."
            },
            {
                id: '103_3',
                title: 'Il Rispetto',
                content: "# Rispetto Professionale\n\nRispetto significa fidarsi che i colleghi siano persone capaci e autonome.\n- Non fare micro-management.\n- Ascoltare le opinioni tecniche di chi fa il lavoro operativo.\n- Non cercare colpevoli, ma cause sistemiche."
            },
            {
                id: '103_4',
                title: 'Apertura e Focus',
                content: "# Apertura al Cambiamento\n\nEssere aperti a rivedere le proprie posizioni davanti ai dati. Non difendere lo status quo per orgoglio.\n\n**Focus**: Fare una cosa alla volta, bene. Il multitasking è il nemico della produttività e della qualità. \"Smetti di iniziare, inizia a finire.\""
            }
        ]
    },
    {
        id: '104',
        title: 'I 6 Pilastri QuickWorks',
        description: 'Le fondamenta metodologiche per l’eccellenza operativa.',
        category: 'Fundamentals',
        related_scenario_id: 'scenario_104',
        lessons: [
            {
                id: '104_1',
                title: 'Visione d\'Insieme',
                content: "# I 6 Pilastri\n\nIl metodo **QuickWorks** si regge su 6 colonne portanti:\n1. Trasparenza\n2. Empirismo\n3. Flusso\n4. Valore\n5. Qualità\n6. Miglioramento\n\nSe ne togli una, la struttura crolla. Non puoi avere Flusso senza Qualità, o Adattamento senza Trasparenza."
            },
            {
                id: '104_2',
                title: '1. Trasparenza Radicale',
                content: "# Radically Transparent\n\nTutto deve essere visibile. Problemi, ritardi, errori.\n\n> \"Non puoi gestire un segreto.\"\n\nL'Obeya Room serve a questo: mettere i problemi sui muri affinché diventino gestibili da tutti, non per punire, ma per risolvere."
            },
            {
                id: '104_3',
                title: '2. Empirismo',
                content: "# Decisioni basate sui fatti\n\nL'Empirismo è la cura all'opinione del manager (HIPPO - Highest Paid Person's Opinion).\n\nSi basa su:\n- **Ispezione**: Guardare il prodotto reale.\n- **Adattamento**: Cambiare rotta in base a ciò che si vede.\nSe i dati dicono che siamo lenti, siamo lenti. Punto."
            },
            {
                id: '104_4',
                title: '3. Flusso (Flow)',
                content: "# Scorrere senza intoppi\n\nIl Flusso è lo stato in cui il lavoro si muove dall'idea al cliente senza fermarsi.\n\nOstacoli al flusso:\n- Attese (Waiting)\n- Rilavorazioni\n- Context Switching (saltare da un task all'altro)\n\nL'obiettivo è ridurre il **Lead Time**."
            }
        ]
    },
    {
        id: '105',
        title: 'Approccio MVP',
        description: 'Minimum Viable Product: partire piccoli per imparare in fretta.',
        category: 'Fundamentals',
        related_scenario_id: 'scenario_105',
        lessons: [
            {
                id: '105_1',
                title: 'Cos’è un MVP?',
                content: "# Minimum Viable Product\n\nL'MVP non è un prodotto fatto male. È la **versione più piccola** di un prodotto che ti permette di validare un'ipotesi di business.\n\nInvece di costruire tutta l'auto, costruisci uno skateboard per vedere se il cliente vuole muoversi. Poi la bici. Poi la moto."
            },
            {
                id: '105_2',
                title: 'Visione Condivisa',
                content: "# Allineamento sugli Obiettivi\n\nPrima di partire con l'MVP, serve una **Visione** chiara.\n- Perché lo facciamo?\n- Per chi?\n- Qual è il problema che risolviamo?\n\nSenza visione, l'MVP è solo un esercizio tecnico senza anima."
            },
            {
                id: '105_3',
                title: 'Validare le Ipotesi',
                content: "# Rischi e Apprendimento\n\nL'MVP serve a ridurre i rischi:\n- **Rischio di Valore**: Al cliente serve?\n- **Rischio di Usabilità**: Sa usarlo?\n- **Rischio di Fattibilità**: Possiamo costruirlo?\n\nPrima sbagli, meno spendi."
            },
            {
                id: '105_4',
                title: 'Da MVP a Prodotto',
                content: "# Iterare verso il successo\n\nL'MVP è solo l'inizio. Una volta validato, si aggiungono funzionalità incrementali.\n\nNon cercare la perfezione al primo colpo. \"Done is better than perfect\" (se rispetta la qualità minima)."
            }
        ]
    },
    {
        id: '106',
        title: 'Sviluppo Iterativo',
        description: 'Sprint, feedback loop e adattamento rapido.',
        category: 'Fundamentals',
        related_scenario_id: 'scenario_106',
        lessons: [
            {
                id: '106_1',
                title: 'Il concetto di Sprint',
                content: "# Lavorare a Cicli Brevi\n\nLo Sprint è un contenitore di tempo (es. 2 settimane) in cui il team si impegna a completare (Done) un set di lavori.\n\nÈ un ritmo cardiaco costante. Elimina le \"maratone della morte\" prima delle deadline annuali."
            },
            {
                id: '106_2',
                title: 'Incremento di Prodotto',
                content: "# Consegnare Valore\n\nAlla fine di ogni Sprint, dobbiamo avere un **Incremento** funzionante.\nNon \"abbiamo quasi finito la scocca\". Ma \"la scocca è finita, verniciata e testata\".\n\nSolo un incremento funzionante permette di ricevere feedback reale."
            },
            {
                id: '106_3',
                title: 'Feedback Loop',
                content: "# Cicli di Feedback\n\nPiù corto è il loop, più veloce è l'apprendimento.\n- **Waterfall**: Requisiti -> 6 Mesi -> Prodotto -> Errore -> Pianto.\n- **Iterativo**: Requisiti -> 2 Settimane -> Prodotto -> Feedback -> Correzione.\n\nFallire presto = Fallire a basso costo."
            },
            {
                id: '106_4',
                title: 'Adattamento Rapido',
                content: "# Pivotare o Perseverare\n\nAlla fine dello Sprint, ispezioniamo il risultato. Se il mercato è cambiato, o la tecnologia non funziona, cambiamo piano per il prossimo Sprint.\n\nNon seguire ciecamente un piano obsoleto."
            }
        ]
    },
    {
        id: '107',
        title: 'Obeya Room',
        description: 'La stanza della guerra (e della pace) per il visual management.',
        category: 'Artifacts',
        related_scenario_id: 'scenario_107',
        lessons: [
            {
                id: '107_1',
                title: 'Cos\'è l\'Obeya',
                content: "# 'Stanza Grande'\n\nObeya in giapponese significa \"Grande Stanza\". È il centro di comando visivo del progetto.\n\nTutti i muri sono coperti di informazioni:\n- Piano di progetto\n- KPI\n- Problemi aperti\n- Rischi\n\nEntrando, chiunque deve capire lo stato del progetto in 5 minuti."
            },
            {
                id: '107_2',
                title: 'Democratizzazione del Dato',
                content: "# Abbattere i Silos Informativi\n\nNell'Obeya, i dati non sono nei computer dei manager. Sono sui muri.\n\nQuesto democratizza l'informazione. L'operaio e il CEO guardano lo stesso grafico. Questo allinea tutti verso l'obiettivo comune."
            },
            {
                id: '107_3',
                title: 'Problem Solving',
                content: "# Discutere davanti ai Fatti\n\nLe riunioni in Obeya si fanno in piedi, davanti ai grafici.\nSe un indicatore è Rosso, non si discute \"di chi è la colpa\", ma \"cosa facciamo per farlo tornare Verde\".\n\nÈ uno strumento di azione, non di reportistica."
            },
            {
                id: '107_4',
                title: 'Digital Obeya',
                content: "# Obeya Virtuale\n\nCon i team remoti, usiamo tool digitali (Miro, Jira) per replicare l'Obeya.\n\nLa regola non cambia: **Radiatore di Informazioni**. Deve essere sempre accessibile e aggiornata in tempo reale."
            }
        ]
    },
    {
        id: '108',
        title: 'Team Multidisciplinari',
        description: 'Autonomia, Maestria e Scopo. Figure alla pari.',
        category: 'Roles',
        related_scenario_id: 'scenario_108',
        lessons: [
            {
                id: '108_1',
                title: 'Cross-functionality',
                content: "# Avere tutte le competenze\n\nUn team Agile deve avere al suo interno TUTTE le competenze per portare il lavoro a termine.\n- Non aspettare l'ufficio acquisti esterno.\n- Non aspettare il tester di un altro reparto.\n\nIl team è un'unità autonoma di consegna valore."
            },
            {
                id: '108_2',
                title: 'T-Shaped People',
                content: "# Specialisti Generalisti\n\nLe persone \"T-Shaped\" hanno una competenza verticale profonda (es. Meccanica) ma anche competenze orizzontali ampie (capiscono un po' di elettronica, un po' di gestione).\n\nQuesto permette al team di aiutarsi a vicenda nei picchi di lavoro."
            },
            {
                id: '108_3',
                title: 'Autonomia e Responsabilità',
                content: "# Autogestione\n\nIl management definisce il **\"Cosa\"** (Obiettivo) e il **\"Perché\"**.\nIl Team definisce il **\"Come\"**.\n\nNessuno dice a un chirurgo come operare. Nessuno dovrebbe dire a un team tecnico come costruire il prodotto."
            },
            {
                id: '108_4',
                title: 'Figure alla Pari',
                content: "# Niente Gerarchie Interne\n\nDentro il team Scrum non ci sono \"Junior\", \"Senior\", \"Tech Lead\" che comandano. Siamo tutti **Developers**.\n\nLe decisioni si prendono per consenso o per competenza, non per grado. L'idea migliore vince, indipendentemente da chi la propone."
            }
        ]
    },
    {
        id: '109',
        title: 'Comunicazione & Management',
        description: 'Steering Committee e flusso costante di informazioni.',
        category: 'Roles',
        related_scenario_id: 'scenario_109',
        lessons: [
            {
                id: '109_1',
                title: 'Flusso Costante',
                content: "# Osmosi Informativa\n\nLa comunicazione non deve avvenire solo nei \"meeting ufficiali\". Deve essere continua.\n\nI team Agili comunicano ad alta larghezza di banda (faccia a faccia, o video costante). Le email sono il posto dove le informazioni vanno a morire."
            },
            {
                id: '109_2',
                title: 'Lo Steering Committee',
                content: "# La Cabina di Regia\n\nLo Steering Committee (SteerCo) Agile non serve a farsi fare report.\nServe a:\n1. Rimuovere ostacoli che il team non può risolvere (es. Budget, Politica aziendale).\n2. Prendere decisioni strategiche rapide.\n\nIl Manager diventa un \"Servant Leader\" di alto livello."
            },
            {
                id: '109_3',
                title: 'Feedback Manageriale',
                content: "# Dare Feedback Efficaci\n\nIl feedback non è una pagella a fine anno.\nÈ continuo, specifico e orientato alla crescita.\n\n- **Situazione**: \"Durante il daily...\"\n- **Comportamento**: \"...hai interrotto il collega...\"\n- **Impatto**: \"...riducendo la sicurezza psicologica.\""
            },
            {
                id: '109_4',
                title: 'Stakeholder Management',
                content: "# Gestire le Aspettative\n\nNon dire \"Sì\" a tutto. Il Product Owner deve saper dire \"No\" o \"Non ora\" per proteggere il focus del team.\n\nLa trasparenza del Backlog aiuta gli stakeholder a capire che ogni richiesta extra ha un costo (ritardo su qualcos'altro)."
            }
        ]
    },
    {
        id: '110',
        title: 'Cultura Fail Safe',
        description: 'Fallimento come apprendimento. Sicurezza psicologica.',
        category: 'Fundamentals',
        related_scenario_id: 'scenario_110',
        lessons: [
            {
                id: '110_1',
                title: 'Fail Fast, Fail Cheap',
                content: "# Fallire è un'opzione\n\nSe non fallisci mai, non stai innovando abbastanza.\nL'importante è che il fallimento sia:\n- **Rapido**: te ne accorgi subito.\n- **Economico**: non costa l'intera azienda.\n- **Educativo**: impariamo perché è successo."
            },
            {
                id: '110_2',
                title: 'Sicurezza Psicologica',
                content: "# Psychological Safety\n\nPer innovare, le persone devono sentirsi sicure di poter dire \"Ho sbagliato\" o \"Ho un'idea stupida\" senza essere derise o punite.\n\nProgetto Aristotle di Google: la sicurezza psicologica è il fattore #1 dei team ad alte performance."
            },
            {
                id: '110_3',
                title: 'Blameless Post-Mortem',
                content: "# Analisi senza Colpa\n\nQuando succede un disastro (es. server down, pezzo rotto), facciamo un'analisi.\n\nNon chiediamo: \"Di chi è la colpa?\" (per punirlo).\nChiediamo: \"Quale processo ha permesso che questo accadesse?\" (per sistemarlo).\n\nNon cerchiamo colpevoli, cerchiamo soluzioni sistemiche."
            },
            {
                id: '110_4',
                title: 'Celebrare l\'Errore',
                content: "# L'Errore come Dato\n\nUn esperimento fallito è un successo se genera dati.\n\n> \"Non ho fallito. Ho solo trovato 10.000 modi che non funzionano.\" - T. Edison\n\nOgni errore ci avvicina alla soluzione giusta, se abbiamo il Mindset per capirlo."
            }
        ]
    },
    {
        id: '111',
        title: 'Scomposizione del Lavoro',
        description: 'Come mangiare un elefante: Epiche, Storie e Task.',
        category: 'Techniques',
        related_scenario_id: 'scenario_111',
        lessons: [
            {
                id: '111_1',
                title: 'L\'Elefante a fette',
                content: "# Scomporre la complessità\n\nNon puoi \"costruire un'auto\" in un giorno. Ma puoi \"progettare lo specchietto\" oggi.\n\nScomporre il lavoro serve a:\n- Ridurre l'ansia.\n- Avere feedback prima.\n- Parallelizzare il lavoro."
            },
            {
                id: '111_2',
                title: 'La Gerarchia Agile',
                content: "# Epiche, Storie, Task\n\n1. **Epica**: Macro-obbiettivo (es. \"Sistema di Frenata\"). Richiede mesi.\n2. **User Story**: Funzionalità che dà valore (es. \"Come guidatore voglio frenare dolcemente\"). Richiede giorni.\n3. **Task**: Compito tecnico (es. \"Disegnare CAD disco\"). Richiede ore."
            },
            {
                id: '111_3',
                title: 'Vertical Slicing',
                content: "# Fette di Torta, non strati\n\nNon scomporre per strati tecnici (Database, Frontend, Backend) o dipartimenti (Meccanica, Elettronica).\n\nScomponi per funzionalità. Una fetta di torta ha pan di spagna, crema e glassa. Una Story deve essere \"finita\" e testabile."
            },
            {
                id: '111_4',
                title: 'Definition of Ready',
                content: "# Pronto a partire?\n\nNon iniziare a lavorare su una storia se non è pronta.\n- È chiara?\n- Abbiamo i dati?\n- È stimabile?\n\nLa DoR protegge il team dal lavorare sul caos."
            }
        ]
    },
    {
        id: '112',
        title: 'User Stories (I.N.V.E.S.T.)',
        description: 'Scrivere requisiti dal punto di vista dell\'utente.',
        category: 'Techniques',
        related_scenario_id: 'scenario_112',
        lessons: [
            {
                id: '112_1',
                title: 'Il formato User Story',
                content: "# Chi, Cosa, Perché\n\nCome **<Ruolo>**,\nVoglio **<Azione/Funzionalità>**,\nAffinché **<Valore/Beneficio>**.\n\nEsempio: \"Come *Addetto Pressa*, voglio *un tasto di stop grande*, affinché *possa fermare la macchina in sicurezza*.\""
            },
            {
                id: '112_2',
                title: 'I.N.V.E.S.T. - I & N',
                content: "# Independent & Negotiable\n\n- **Independent**: Può essere fatta da sola, senza aspettare altre storie.\n- **Negotiable**: Non è un contratto chiuso. È un invito alla discussione tra PO e Team."
            },
            {
                id: '112_3',
                title: 'I.N.V.E.S.T. - V & E',
                content: "# Valuable & Estimable\n\n- **Valuable**: Deve portare valore reale a qualcuno (non \"refactoring codice\" fine a sé stesso).\n- **Estimable**: Il team deve poter capire quanto è grande. Se non sa stimarla, non è chiara."
            },
            {
                id: '112_4',
                title: 'I.N.V.E.S.T. - S & T',
                content: "# Small & Testable\n\n- **Small**: Deve stare in uno Sprint (o meglio, in pochi giorni).\n- **Testable**: Come sappiamo se è finita? Servono Criteri di Accettazione chiari."
            }
        ]
    },
    {
        id: '113',
        title: 'Stima Agile',
        description: 'Punti storia, complessità relativa e cono dell\'incertezza.',
        category: 'Techniques',
        related_scenario_id: 'scenario_113',
        lessons: [
            {
                id: '113_1',
                title: 'Perché stimiamo?',
                content: "# Prevedibilità e Allineamento\n\nNon stimiamo per indovinare il futuro esatto (impossibile).\nStimiamo per:\n1. Capire se abbiamo capito tutti la stessa cosa.\n2. Capire quanto possiamo caricare lo Sprint."
            },
            {
                id: '113_2',
                title: 'Stima Relativa vs Assoluta',
                content: "# Punti vs Ore\n\nGli umani sono pessimi a stimare il tempo (\"Ti richiamo tra 5 minuti\" -> passano 2 ore).\nSono bravi a comparare: \"Questo sasso è il doppio di quello\".\n\nUsiamo i **Story Points** per misurare la complessità relativa, non il tempo."
            },
            {
                id: '113_3',
                title: 'Story Points',
                content: "# Cosa c'è in un punto?\n\nLo Story Point considera:\n- **Volume** (quanto lavoro c'è)\n- **Complessità** (quanto è difficile)\n- **Incertezza** (cosa non sappiamo).\n\nNon convertirli in ore. Sono una valuta interna del team."
            },
            {
                id: '113_4',
                title: 'Cono dell\'Incertezza',
                content: "# L'illusione della precisione\n\nAll'inizio di un progetto, l'incertezza è massima (4x). Più avanziamo, più scende.\n\nNon fare stime precise al millimetro all'inizio. Accetta il range di errore e raffinatelo iterativamente."
            }
        ]
    },
    {
        id: '114',
        title: 'Planning Poker',
        description: 'La tecnica per stimare in gruppo ed evitare il bias.',
        category: 'Techniques',
        related_scenario_id: 'scenario_114',
        lessons: [
            {
                id: '114_1',
                title: 'Il Problema dell\'Ancoraggio',
                content: "# Bias Cognitivo\n\nSe il Senior dice \"Ci vogliono 2 giorni\", il Junior non dirà mai \"Secondo me ce ne vogliono 10\". Si ancora al numero del capo.\n\nIl Planning Poker serve a far parlare tutti liberamente."
            },
            {
                id: '114_2',
                title: 'Come funziona',
                content: "# Carte coperte\n\n1. Il PO legge la storia.\n2. Il team discute brevemente (Q&A).\n3. Ognuno sceglie una carta segretamente.\n4. Si girano insieme.\n\nNessuno influenza nessuno prima del voto."
            },
            {
                id: '114_3',
                title: 'Serie di Fibonacci',
                content: "# 1, 2, 3, 5, 8, 13, 20...\n\nUsiamo Fibonacci modificato perché più la storia è grande, meno siamo precisi.\nLa differenza tra 1 e 2 è importante. Tra 20 e 21 è rumore.\n\nSe è 20 o più, probabilmente va divisa."
            },
            {
                id: '114_4',
                title: 'Convergenza',
                content: "# Discutere gli estremi\n\nSe io dico 2 e tu dici 13, abbiamo capito cose diverse.\nIo parlo: \"È facile\". Tu parli: \"Sì, ma il database è legacy\".\nIl valore è nella discussione, non nel numero finale."
            }
        ]
    },
    {
        id: '115',
        title: 'Kanban Board',
        description: 'Visualizzare il flusso di valore.',
        category: 'Artifacts',
        related_scenario_id: 'scenario_115',
        lessons: [
            {
                id: '115_1',
                title: 'Visualizzare il Lavoro',
                content: "# Se non lo vedi, non lo gestisci\n\nIl cervello umano elabora le immagini 60.000 volte più velocemente del testo.\nUna Kanban board mostra istantaneamente:\n- Cosa stiamo facendo.\n- A che punto siamo.\n- Dove siamo bloccati."
            },
            {
                id: '115_2',
                title: 'Le Colonne Base',
                content: "# To Do, Doing, Done\n\n- **To Do**: Opzioni future. Ancora non promesse.\n- **Doing**: Lavoro in corso (Work In Progress). Qui si crea valore.\n- **Done**: Finito, consegnabile. Valore incassato.\n\nPuoi aggiungere colonne (es. \"In Review\"), ma parti semplice."
            },
            {
                id: '115_3',
                title: 'Logica PULL',
                content: "# Smetti di Spingere\n\nIn un sistema PUSH, spingo lavoro a valle appena ho finito, intasando il collega.\nIn Kanban (PULL), tiro il lavoro da monte solo quando ho capacità libera.\n\nQuesto crea un flusso fluido e sostenibile."
            },
            {
                id: '115_4',
                title: 'Tutto il Lavoro',
                content: "# Nessun lavoro invisibile\n\nSulla board ci va TUTTO.\nAnche le telefonate, le email, le riunioni.\nSe occupa il tuo tempo, deve occupare spazio sulla board. Altrimenti la pianificazione è una bugia."
            }
        ]
    },
    {
        id: '116',
        title: 'WIP Limit',
        description: 'Work In Progress: il nemico numero uno del flusso.',
        category: 'Techniques',
        related_scenario_id: 'scenario_116',
        lessons: [
            {
                id: '116_1',
                title: 'Stop Starting, Start Finishing',
                content: "# Smetti di iniziare, inizia a finire\n\nAvere 10 cose iniziate e 0 finite = 0 Valore.\nAvere 2 cose iniziate e 2 finite = Valore Reale.\n\nIl WIP Limit ti costringe a chiudere task prima di aprirne nuovi."
            },
            {
                id: '116_2',
                title: 'Il costo del Context Switch',
                content: "# Il Multitasking non esiste\n\nSaltare da un task all'altro costa cognitivamente.\n- 1 Progetto: 100% tempo al lavoro.\n- 5 Progetti: 20% lavoro, 80% tempo perso a cambiare contesto (Gerald Weinberg).\n\nFai una cosa alla volta."
            },
            {
                id: '116_3',
                title: 'Legge di Little',
                content: "# Fisica del Flusso\n\n`Tempo di Attraversamento = WIP / Throughput`\n\nSe vuoi consegnare più veloce (ridurre il tempo), hai due leve:\n1. Lavorare più veloce (difficile, stressante).\n2. **Abbassare il WIP** (matematico, immediato).\n\nRiduci il WIP per andare più veloce."
            },
            {
                id: '116_4',
                title: 'Dove applicare il Limite?',
                content: "# Nelle colonne attive\n\nMetti un limite sulla colonna \"Doing\" o \"In Progress\".\nEsempio: Team di 3 persone? WIP Limit = 3 (o 4).\nSe la colonna è piena, è VIETATO iniziare roba nuova. Devi aiutare un collega a finire."
            }
        ]
    },
    {
        id: '117',
        title: 'Metriche di Flusso',
        description: 'Cycle Time, Throughput e prevedibilità.',
        category: 'Techniques',
        related_scenario_id: 'scenario_117',
        lessons: [
            {
                id: '117_1',
                title: 'Smetti di usare la Velocity',
                content: "# La Velocity serve a pianificare\n\nLa Velocity (punti per Sprint) è utile al PO per fare proiezioni.\nNON è una metrica di performance.\nNon confrontare la velocity di due team. È come confrontare chilometri e miglia senza saperlo."
            },
            {
                id: '117_2',
                title: 'Lead Time vs Cycle Time',
                content: "# Tempo percepito\n\n- **Lead Time**: Da quando il cliente chiede, a quando riceve. (Vista Cliente).\n- **Cycle Time**: Da quando inizi a lavorare, a quando finisci. (Vista Team).\n\nOttimizza il Cycle Time per migliorare la prevedibilità."
            },
            {
                id: '117_3',
                title: 'Throughput',
                content: "# Pezzi al giorno\n\nQuanti item finiamo (Done) in una settimana?\nQuesta è una metrica reale, basata sui fatti, non sulle stime.\nSe il throughput è stabile, possiamo fare previsioni probabilistiche."
            },
            {
                id: '117_4',
                title: 'Aging',
                content: "# Quanto invecchiano i ticket?\n\nUn ticket fermo in \"Doing\" da 10 giorni è un problema.\nControlla l'età dei task (Work Item Age). Intervieni sui task \"anziani\" prima che diventino ritardi."
            }
        ]
    },
    {
        id: '118',
        title: 'Monitoraggio Visuale',
        description: 'Grafici che parlano: CFD e Burn-down.',
        category: 'Techniques',
        related_scenario_id: 'scenario_118',
        lessons: [
            {
                id: '118_1',
                title: 'Burn-down Chart',
                content: "# Bruciare il lavoro\n\nGrafico cartesiano:\n- Asse Y: Lavoro rimanente.\n- Asse X: Tempo.\n\nDeve scendere verso lo zero. Se è piatto, siamo bloccati. Se sale, abbiamo aggiunto scopo (scope creep)."
            },
            {
                id: '118_2',
                title: 'Cumulative Flow Diagram',
                content: "# CFD\n\nMostra quanto lavoro c'è in ogni stato nel tempo.\nÈ potente per vedere i colli di bottiglia.\nSe l'area \"Doing\" si allarga, il WIP sta esplodendo. Se l'area \"Done\" cresce costante, siamo sani."
            },
            {
                id: '118_3',
                title: 'Radiatori di Informazioni',
                content: "# Passivi e Grandi\n\nNon nascondere i grafici in un file Excel in una cartella condivisa.\nAppenderli al muro (o dashboard TV sempre accesa).\nDevono \"radiare\" informazione a chi passa, senza che debba chiederla."
            },
            {
                id: '118_4',
                title: 'Trend > Dato puntuale',
                content: "# Guarda la tendenza\n\nUn giorno storto capita. Ma se il trend su 3 Sprint è in calo, c'è un problema sistemico.\nUsa i grafici per innescare conversazioni nelle Retrospettive."
            }
        ]
    },
    {
        id: '119',
        title: 'Eventi Scrum',
        description: 'Il battito cardiaco del team: Planning, Daily, Review, Retro.',
        category: 'Fundamentals',
        related_scenario_id: 'scenario_119',
        lessons: [
            {
                id: '119_1',
                title: 'Sprint Planning',
                content: "# Decidere la direzione\n\n- **Cosa** facciamo? (Scelto dal PO).\n- **Come** lo facciamo? (Scelto dal Team).\n\nNon è una dittatura. È una negoziazione. Alla fine, il team si impegna su un obiettivo (Sprint Goal)."
            },
            {
                id: '119_2',
                title: 'Daily Scrum',
                content: "# 15 Minuti in piedi\n\nNon è un report status al manager.\nÈ una sincronizzazione tra pari: \"Come ci organizziamo oggi per raggiungere il Goal?\"\nSe dura più di 15 minuti, lo state facendo male."
            },
            {
                id: '119_3',
                title: 'Sprint Review',
                content: "# Mostrare il prodotto\n\nNon Powerpoint. Software (o hardware) funzionante.\nInvitiamo gli stakeholder, facciamo vedere l'incremento, raccogliamo feedback.\nIspezione del Prodotto."
            },
            {
                id: '119_4',
                title: 'Retrospective',
                content: "# Migliorare il processo\n\nForse l'evento più importante.\nIl team si chiude in una stanza e discute: \"Cosa ha funzionato? Cosa no? Cosa cambiamo?\"\nIspezione del Processo. Ne deve uscire almeno 1 azione di miglioramento."
            }
        ]
    },
    {
        id: '120',
        title: 'Lean vs Agile',
        description: 'Due facce della stessa medaglia: efficienza ed efficacia.',
        category: 'Mindset',
        related_scenario_id: 'scenario_120',
        lessons: [
            {
                id: '120_1',
                title: 'Le Origini',
                content: "# Toyota vs Silicon Valley\n\n- **Lean**: Nasce in fabbrica (Toyota) negli anni '50. Focus su riduzione sprechi e qualità.\n- **Agile**: Nasce nel software (Snowbird) nel 2001. Focus su adattabilità e cliente.\n\nOggi convergono in \"Industrial Agile\"."
            },
            {
                id: '120_2',
                title: 'Efficienza vs Efficacia',
                content: "# Fare bene vs Fare la cosa giusta\n\n- **Lean** cerca l'Efficienza (Fare le cose bene, senza sprechi).\n- **Agile** cerca l'Efficacia (Fare la cosa giusta per il cliente, ora).\n\nServono entrambi. È inutile costruire in modo super-efficiente un prodotto che nessuno vuole."
            },
            {
                id: '120_3',
                title: 'I 7 Sprechi (Muda)',
                content: "# I nemici del Lean\n\n1. Sovrapproduzione (fare troppo)\n2. Attese (team fermo)\n3. Trasporti (spostare roba)\n4. Sovra-processo (burocrazia)\n5. Scorte (WIP alto)\n6. Movimenti (layout sbagliato)\n7. Difetti (bug)\n\nAgile combatte questi sprechi con iterazioni brevi."
            },
            {
                id: '120_4',
                title: 'Kaizen',
                content: "# Miglioramento Continuo\n\nIl cuore che unisce Lean e Agile.\nNon accontentarsi dello status quo.\nOggi meglio di ieri, domani meglio di oggi.\nPiccoli passi costanti, non grandi rivoluzioni traumatiche."
            }
        ]
    }
];
