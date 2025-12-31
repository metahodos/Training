-- Clear existing data (optional, be careful in prod)
TRUNCATE modules, lessons, quizzes, scenarios CASCADE;

-- MODULES
INSERT INTO modules (id, title, description, category) VALUES
('101', 'Vision e Mission Metàhodos', 'Aziende guidate da persone felici e veloci.', 'Mindset'),
('102', 'Agile Mindset', 'Growth vs Fixed Mindset: amare i problemi.', 'Mindset'),
('103', 'Il Mondo V.U.C.A.', 'Navigare nella Volatilità, Incertezza, Complessità e Ambiguità.', 'Context'),
('104', 'Framework Cynefin', 'Capire i domini: Semplice, Complicato, Complesso, Caotico.', 'Context'),
('105', 'Waterfall vs Agile', 'Perché la predizione rigida fallisce nei domini complessi.', 'Context'),
('106', 'Le Origini di Agile', 'Snowbird 2001 e il Manifesto Agile.', 'History'),
('107', 'I Valori Fondamentali', 'Impegno, Focus, Apertura, Rispetto, Coraggio.', 'Values'),
('108', 'Paradigma Pull vs Push', 'Dalla competizione individuale alla collaborazione di team.', 'Flow'),
('109', 'Il Ruolo del Product Owner', 'Massimizzare il valore e gestire il ROI.', 'Roles'),
('110', 'Sprint Review e Feedback', 'Ispezione e adattamento con gli stakeholder.', 'Events'),
('111', 'User Stories & INVEST', 'Generare conversazioni, non requisiti blindati.', 'Artifacts'),
('112', 'Stima Agile & Planning Poker', 'Story Points, Fibonacci e la relatività dello sforzo.', 'Techniques'),
('113', 'Kanban & WIP Limit', 'Smettere di iniziare, iniziare a finire.', 'Techniques'),
('114', 'Extreme Programming (XP)', 'Pratiche ingegneristiche per la qualità intrinseca.', 'Techniques'),
('115', 'Kanban Change Management', 'Evoluzione vs Rivoluzione. Iniziare da dove si è.', 'Techniques'),
('116', 'Metriche di Flusso', 'Lead Time, Throughput e prevedibilità.', 'Metrics'),
('117', 'La Facilitazione', 'Il leader come servitore e guida neutrale.', 'Roles'),
('118', 'Definition of Done (DoD)', 'La qualità non è negoziabile. Accordi di team.', 'Artifacts'),
('119', 'Cumulative Flow Diagram', 'Analizzare la salute del processo visivamente.', 'Metrics'),
('120', 'Lean vs Agile', 'Efficienza (Lean) ed Efficacia (Agile) a confronto.', 'Mindset');

-- QUIZZES (Mapped 1:1 from Guida allo Studio)
INSERT INTO quizzes (module_id, question, options, correct_answer, explanation) VALUES
('101', 'Qual è la Vision dell''azienda Metàhodos?', '["Tras-formare sul campo le aziende", "Aziende guidate da persone felici e veloci", "Leader silenziosi", "Impegno e Rispetto"]', 'Aziende guidate da persone felici e veloci', 'La Vision è esplicitamente "Aziende guidate da persone felici e veloci".'),
('102', 'Quale mentalità è associata alla frase "Ho un problema da risolvere"?', '["Fixed Mindset", "Agile Mindset", "Growth Mindset", "Waterfall Mindset"]', 'Growth Mindset', 'Il Growth Mindset vede le sfide come opportunità di apprendimento.'),
('103', 'L''acronimo V.U.C.A. sta per:', '["Vision, Unity, Clarity, Action", "Volatility, Uncertainty, Complexity, Ambiguity", "Value, Understanding, Collaboration", "Velocity, Usability, Cost"]', 'Volatility, Uncertainty, Complexity, Ambiguity', 'Descrive la natura imprevedibile del contesto moderno.'),
('104', 'Nel framework Cynefin, quale approccio si adotta in un dominio Complesso?', '["Sense, Analyse, Respond", "Act, Sense, Respond", "Probe, Sense, Respond", "Sense, Categorize, Respond"]', 'Probe, Sense, Respond', 'Nei sistemi complessi la relazione causa-effetto non è nota a priori, bisogna sondare (Probe).'),
('105', 'Vero o Falso: Il modello Waterfall è efficace nei cambiamenti continui.', '["Vero", "Falso"]', 'Falso', 'Waterfall è rigido e fatica a gestire i cambiamenti in corso d''opera.'),
('106', 'Dove e quando è nato il Manifesto Agile?', '["Utah, Febbraio 2001", "Giappone, Anni 30", "OOPSLA, 1995", "US Army, 2001"]', 'Utah, Febbraio 2001', 'Diciassette professionisti si incontrarono a Snowbird, Utah.'),
('107', 'Quale NON è un valore fondamentale Metàhodos?', '["Coraggio", "Focus", "Competizione", "Rispetto"]', 'Competizione', 'La competizione è tipica dei sistemi Push; Agile promuove la collaborazione.'),
('108', 'Nel paradigma organizzativo "Pull", quali sono gli elementi chiave?', '["Gerarchia e controllo", "Auto-organizzazione e valore", "Compliance e predizione", "Efficienza individuale"]', 'Auto-organizzazione e valore', 'I team si auto-organizzano per tirare (Pull) il lavoro di valore.'),
('109', 'Chi massimizza il valore del lavoro del team Scrum?', '["Scrum Master", "Development Team", "Stakeholder", "Product Owner"]', 'Product Owner', 'È l''accountability principale del PO.'),
('110', 'Qual è lo scopo principale della Sprint Review?', '["Pianificare lo sprint successivo", "Ispezionare l''incremento e adattare il Backlog", "Migliorare i processi", "Risolvere bug"]', 'Ispezionare l''incremento e adattare il Backlog', 'È un momento di feedback sul prodotto con gli stakeholder.'),
('111', 'Cosa definisce l''acronimo INVEST per una User Story?', '["Independent, Negotiable, Valuable...", "Important, Noticeable, Viable...", "Integrated, Narrative, Validated...", "Incremental, Necessary, Value-driven..."]', 'Independent, Negotiable, Valuable...', 'Independent, Negotiable, Valuable, Estimable, Small, Testable.'),
('112', 'Tecnica di stima che usa la sequenza di Fibonacci:', '["Timeboxing", "T-shirt Sizing", "Planning Poker", "Burndown Chart"]', 'Planning Poker', 'Facilita il consenso e usa i numeri relativi di Fibonacci.'),
('113', 'In Kanban, l''obiettivo è massimizzare il WIP?', '["Vero", "Falso"]', 'Falso', 'Bisogna LIMITARE il WIP per migliorare il flusso.'),
('114', 'Pratica XP dove due programmatori lavorano su un PC:', '["Refactoring", "Pair programming", "TDD", "CI"]', 'Pair programming', 'Migliora la qualità e la condivisione della conoscenza.'),
('115', 'Principio fondamentale del Change Management Kanban:', '["Sostituire tutto subito", "Iniziare da dove si è oggi", "Definire ruoli rigidi", "Feedback loop immediati"]', 'Iniziare da dove si è oggi', 'Kanban è evolutivo, non rivoluzionario.'),
('116', 'Cosa misura il "Lead Time"?', '["Task per settimana", "Tempo fix bug", "Tempo da commitment a delivery", "Tempo meeting"]', 'Tempo da commitment a delivery', 'Il tempo di attraversamento totale del sistema.'),
('117', 'Caratteristica principale di un facilitatore:', '["Esperto di contenuto", "Guida neutrale di processo", "Decisore finale", "Assegna compiti"]', 'Guida neutrale di processo', 'Aiuta il gruppo a raggiungere i propri obiettivi senza imporre contenuti.'),
('118', 'La Definition of Done (DoD) definisce:', '["Criteri di Ready", "Criteri di Completamento", "Lista task", "Fine progetto"]', 'Criteri di Completamento', 'Assicura la qualità dell''incremento.'),
('119', 'Cosa indica un CFD divergente?', '["Ritmo sostenibile", "Aumento WIP e ritardi", "Progetto in anticipo", "Scope change"]', 'Aumento WIP e ritardi', 'Le bande si allargano, indicando un collo di bottiglia e un aumento del Lead Time.'),
('120', 'Differenza Lean vs Agile:', '["Lean=Adattamento, Agile=Sprechi", "Lean=Efficienza/Sprechi, Agile=Efficacia/Adattamento", "Nessuna", "Agile usa 5S"]', 'Lean=Efficienza/Sprechi, Agile=Efficacia/Adattamento', 'Lean punta a togliere il superfluo, Agile a rispondere al cambiamento.');

-- SCENARIOS (Mapped from local scenarios.ts)
INSERT INTO scenarios (id, module_id, title, description, role_target, difficulty, initial_context) VALUES
('scenario_101', '101', 'L''Urgenza nel Mondo V.U.C.A.', 'Il Direttore Commerciale impone una modifica all''ultimo minuto.', 'Scrum Master / PO', 'Intermedio', 'Il Direttore entra urlando: "Il cliente Alpha vuole la modifica X ENTRO DOMANI!". Il team è carico. Cosa fai?'),
('scenario_102', '102', 'Doing Agile vs Being Agile', 'Zombie Scrum: meeting fatti, ma zero collaborazione.', 'Agile Coach', 'Avanzato', 'Il team fa il Daily leggendo appunti, senza guardarsi in faccia. Sembra una catena di montaggio. Come intervieni?'),
('scenario_103', '103', 'Felicità o Velocità?', 'Un manager critica le troppe risate nel team.', 'Agile Coach', 'Intermedio', 'Il Resp. Produzione dice: "Se si divertono, non lavorano". Difendi i valori Metàhodos.'),
('scenario_104', '104', 'Trasparenza Radicale', 'Progetto in ritardo, il PM vuole mentire al CEO (Semaforo Verde).', 'Scrum Master', 'Difficile', 'Devi convincere il PM a dire la verità brutale per permettere "Inspection & Adaptation".'),
('scenario_105', '105', 'Negoziare l''MVP', 'Il cliente vuole tutto e subito con budget fisso.', 'Product Owner', 'Intermedio', 'Cliente chiede e-commerce completo in 1 mese. Proponi un MVP per validare il mercato.'),
('scenario_106', '106', 'Sprint Goal a Rischio', 'Emergenza server a metà Sprint. Goal a rischio.', 'Scrum Master', 'Intermedio', 'Il PO chiede straordinari. Difendi il ritmo sostenibile o cerchi compromessi intelligenti?'),
('scenario_107', '107', 'Obeya Room - Problem Solving', 'Un KPI rosso scatena la caccia al colpevole.', 'Agile Coach', 'Avanzato', 'Il Direttore cerca il colpevole del difetto. Sposta l''attenzione sul PROCESSO, non sulla PERSONA.'),
('scenario_108', '108', 'Silos di Competenza', 'Backend vs Frontend: "Io ho finito, sono affari tuoi".', 'Scrum Master', 'Intermedio', 'Stop Starting, Start Finishing. Insegna al team a lavorare come sciame (Swarming).'),
('scenario_109', '109', 'Stakeholder Invadente', 'Direttore Marketing assegna task diretti a un junior dev.', 'Scrum Master', 'Difficile', 'Proteggi il team e reindirizza lo stakeholder al Product Backlog/PO.'),
('scenario_110', '110', 'Post-Mortem Senza Colpa', 'Database cancellato per errore. Silenzio in retrospettiva.', 'Facilitatore', 'Difficile', 'Crea sicurezza psicologica. Nessuno deve aver paura di ammettere l''errore per imparare.'),
('scenario_111', '111', 'L''Arte della Scomposizione', 'Epica gigante: "Voglio il nuovo Gestionale SAP".', 'Agile Coach', 'Intermedio', 'Usa il Vertical Slicing per trovare una piccola storia di valore da consegnare subito.'),
('scenario_112', '112', 'INVEST Investigation', 'User Story: "Il sistema deve essere veloce".', 'PO Coach', 'Base', 'Trasforma questo requisito vago in una storia INVEST e testabile (es. "caricamento < 2s").'),
('scenario_113', '113', 'Stima in Punti vs Ore', 'Manager chiede: "5 punti sono 5 ore?".', 'Scrum Master', 'Intermedio', 'Spiega la complessità relativa e perché la conversione in ore è pericolosa e imprecisa.'),
('scenario_114', '114', 'Planning Poker Facilitation', 'Divergenza: Senior vota 2, Junior vota 13.', 'Scrum Master', 'Intermedio', 'Facilita il confronto. Non fare la media! Fai emergere le ipotesi e i rischi non visti.'),
('scenario_115', '115', 'Kanban WIP Explosion', 'Colonna Doing esplosa (25 card). Manager porta urgenza.', 'Kanban Master', 'Avanzato', 'Se accetti l''urgenza, il flusso si ferma. Applica il WIP Limit e spiega la Legge di Little.'),
('scenario_116', '116', 'Il Multitasker Compulsivo', 'Dev lavora su 4 task insieme "per portarsi avanti".', 'Scrum Master', 'Base', 'Il Context Switch uccide la produttività. Fagli chiudere una cosa alla volta.'),
('scenario_117', '117', 'Analisi Throughput', 'Management nervoso per stime sbagliate.', 'Agile Coach', 'Avanzato', 'Usa il Throughput (ticket/settimana) per fare previsioni probabilistiche (Monte Carlo) invece delle stime.'),
('scenario_118', '118', 'Burn-down Piatto', 'Giorno 5/10, grafico orizzontale. "Siamo al 90%".', 'Scrum Master', 'Intermedio', 'Il 90% non esiste. Indaga sugli impedimenti nascosti. Visualizza il lavoro reale.'),
('scenario_119', '119', 'Retrospective Silenziosa', 'Tutti dicono "Tutto ok, niente da migliorare".', 'Scrum Master', 'Difficile', 'Rompi l''armonia artificiale. Usa tecniche o domande potenti per far emergere i problemi reali.'),
('scenario_120', '120', 'Kaizen Spirit', 'Team soddisfatto: "Siamo arrivati, siamo agili".', 'Agile Coach', 'Avanzato', 'Agile è un viaggio senza fine. Sfida lo status quo per un miglioramento marginale ulteriore.');
