-- COMPLETE SETUP SCRIPT
-- Copy ALL content below and run in Supabase SQL Editor

-- 1. CLEANUP (Drop existing tables to start fresh)
DROP TABLE IF EXISTS lessons CASCADE;
DROP TABLE IF EXISTS quizzes CASCADE;
DROP TABLE IF EXISTS scenarios CASCADE;
DROP TABLE IF EXISTS modules CASCADE;

-- 2. CREATE SCHEMA

-- Modules Table
CREATE TABLE modules (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT
);

-- Lessons Table
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id TEXT REFERENCES modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    order_index INTEGER,
    content TEXT
);

-- Quizzes Table
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id TEXT REFERENCES modules(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB, -- Stores array of strings
    correct_answer TEXT,
    explanation TEXT
);

-- Scenarios Table
CREATE TABLE scenarios (
    id TEXT PRIMARY KEY, -- Using text IDs like 'scenario_101'
    module_id TEXT REFERENCES modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    role_target TEXT, -- 'SM', 'PO', 'Agile Coach'
    difficulty TEXT,  -- 'Junior', 'Mid', 'Senior'
    initial_context TEXT
);

-- 3. ENABLE PUBLIC READ ACCESS (RLS)

ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Modules" ON modules;
CREATE POLICY "Public Read Modules" ON modules FOR SELECT USING (true);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Lessons" ON lessons;
CREATE POLICY "Public Read Lessons" ON lessons FOR SELECT USING (true);

ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Quizzes" ON quizzes;
CREATE POLICY "Public Read Quizzes" ON quizzes FOR SELECT USING (true);

ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Scenarios" ON scenarios;
CREATE POLICY "Public Read Scenarios" ON scenarios FOR SELECT USING (true);


-- 4. INSERT DATA

-- MODULES
INSERT INTO modules (id, title, description, category) VALUES

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

-- SCENARIOS
INSERT INTO scenarios (id, module_id, title, description, role_target, difficulty, initial_context) VALUES
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

-- QUIZZES
INSERT INTO quizzes (module_id, question, options, correct_answer, explanation) VALUES
('102', 'Quale mentalità è associata alla frase "Ho un problema da risolvere"?', '["Fixed Mindset", "Agile Mindset", "Growth Mindset", "Waterfall Mindset"]', 'Growth Mindset', 'Il Growth Mindset vede le sfide come opportunità di apprendimento.'),
('103', 'L''acronimo V.U.C.A. sta per:', '["Vision, Unity, Clarity, Action", "Volatility, Uncertainty, Complexity, Ambiguità", "Value, Understanding, Collaboration", "Velocity, Usability, Cost"]', 'Volatility, Uncertainty, Complexity, Ambiguità', 'Descrive la natura imprevedibile del contesto moderno.'),
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

-- LESSONS (Batch 1 + Batch 2)
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('102', 'Growth vs Fixed Mindset', 1, '# Due modi di pensare\n\nAl centro del Mindset Agile c''è la distinzione di Carol Dweck:\n\n**Fixed Mindset**:\n- Evita le sfide\n- Si arrende agli ostacoli\n- Vede lo sforzo come inutile\n- Ignora i feedback negativi\n\n**Growth Mindset**:\n- Abbraccia le sfide\n- Persevera di fronte agli ostacoli\n- Vede lo sforzo come via per la maestria\n- Impara dalle critiche'),
('102', 'Ho un problema da risolvere', 2, '# La reazione all''errore\n\nDi fronte a un problema, il Fixed Mindset dice: "O no! Che sfortuna, capitano tutte a me. Vado già bene così".\n\nIl Growth Mindset dice: **"Ho un problema da risolvere"**.\n\nQuesta semplice frase cambia tutto. Trasforma la vittima in protagonista attivo.'),
('102', 'Culto dell''Apprendimento', 3, '# Imparare > Eseguire\n\nIn Agile, l''obiettivo non è solo "finire il task", ma imparare qualcosa di nuovo sul prodotto o sul processo.\n\nOgni fallimento è un''opportunità di apprendimento (Fail Fast, Learn Faster). Se no fallisci mai, non stai innovando.'),
('102', 'Essere Agile vs Fare Agile', 4, '# Doing Agile vs Being Agile\n\n**Doing Agile**:\n- Fare i meeting (Daily, Retro)\n- Usare Jira\n- Avere i ruoli\n\n**Being Agile**:\n- Vivere i valori (Rispetto, Coraggio...)\n- Avere un Mindset empirico\n- Adattarsi al cambiamento\n- Collaborare realmente\n\n"A fool with a tool is still a fool".'),
('103', 'Cos''è il V.U.C.A.', 1, '# Volatility, Uncertainty, Complexity, Ambiguity\n\nL''acronimo V.U.C.A. (coniato dall''US Army War College) descrive il mondo moderno:\n\n- **Volatilità**: Cambiamenti rapidi e imprevedibili.\n- **Incertezza**: Difficoltà di prevedere il futuro.\n- **Complessità**: Molteplici forze interconnesse.\n- **Ambiguità**: Realtà poco chiare e interpretabili.'),
('103', 'Volatilità e Incertezza', 2, '# Affrontare il Caos\n\nLa Volatilità si combatte con la **Visione** e la prontezza di risposta.\nL''Incertezza si combatte con la **Comprensione** (Understanding) e l''Empirismo.\n\nNon puoi pianificare tutto a tavolino in un mondo volatile. Devi essere pronto a virare.'),
('103', 'Complessità e Ambiguità', 3, '# Navigare la nebbia\n\nLa Complessità si gestisce con la **Chiarezza** (Clarity) e la semplificazione (Scomporre il lavoro).\nL''Ambiguità si contrastare con l''**Agilità** (Agility) e la sperimentazione rapida.\n\nBetter done than perfect.'),
('103', 'La Risposta Agile', 4, '# Ispeziona e Adatta\n\nIn un mondo V.U.C.A., i piani a lungo termine (5 anni) sono inutili.\n\nLa risposta Agile è:\n1. Fai un piccolo passo\n2. Guardati intorno (Ispeziona)\n3. Decidi la prossima mossa (Adatta)\n\nQuesto ciclo continuo è l''unica bussola affidabile.'),
('104', 'I 5 Domini', 1, '# Capire il contesto\n\nIl framework Cynefin aiuta a capire in che situazione ci troviamo:\n1. **Chiaro (Simple)**: Causa-effetto evidenti.\n2. **Complicato**: Causa-effetto scopribili con analisi (esperti).\n3. **Complesso**: Causa-effetto visibili solo a posteriori.\n4. **Caotico**: Nessuna relazione causa-effetto apparente.\n5. **Disordine**: Non sai dove ti trovi.'),
('104', 'Semplice e Complicato', 2, '# Best Practice vs Good Practice\n\n- **Semplice**: Sense -> Categorize -> Respond. Qui valgono le "Best Practices". Procedure standard.\n- **Complicato**: Sense -> Analyze -> Respond. Qui servono gli Esperti. "Good Practices". C''è più di una soluzione giusta.'),
('104', 'Il Dominio Complesso', 3, '# Probe, Sense, Respond\n\nLo sviluppo software e business è quasi sempre **Complesso**.\nNon puoi analizzare tutto prima. Devi:\n1. **Probe**: Fare un piccolo esperimento (MVP).\n2. **Sense**: Vedere cosa succede.\n3. **Respond**: Reagire.\n\nQui nascono le pratiche emergenti.'),
('104', 'Dal Caos all''Ordine', 4, '# Act, Sense, Respond\n\nNel **Caos** (es. un server in fiamme), non c''è tempo per pensare.\n1. **Act**: Fai qualcosa per fermare l''emorragia.\n2. **Sense**: Valuta la stabilità.\n3. **Respond**: Spostati nel dominio Complesso.\n\nIl management tradizionale cerca di gestire il Complesso come se fosse Semplice. Questo porta al disastro.'),
('105', 'La Cascata (Waterfall)', 1, '# Il modello predittivo\n\nIl Waterfall prevede fasi sequenziali:\n1. Requisiti\n2. Analisi\n3. Design\n4. Implementazione\n5. Test\n6. Rilascio\n\nFunziona solo se sai ESATTAMENTE cosa vuoi e nulla cambierà per mesi. Cioè quasi mai.'),
('105', 'I Limiti del Waterfall', 2, '# L''illusione del controllo\n\nI problemi del Waterfall:\n- Il valore arriva solo alla fine (Big Bang).\n- I cambiamenti sono costosi ("Change Request").\n- I test sono compressi alla fine.\n- Il cliente vede il prodotto troppo tardi.\n\nL''approccio Agile invece consegna piccoli pezzi di valore funzionante frequentemente.'),
('105', 'Empirismo', 3, '# Trasparenza, Ispezione, Adattamento\n\nAgile si basa sull''empirismo:\n- **Trasparenza**: Tutti vedono tutto.\n- **Ispezione**: Controlliamo frequentemente come sta andando.\n- **Adattamento**: Se qualcosa non va, cambiamo rotta subito.\n\nNon seguiamo il piano ciecamente.'),
('105', 'Il Triangolo di Ferro', 4, '# Ribaltare i vincoli\n\n- **Waterfall**: Lo SCOPO è fisso. Tempo e Costi variano (spesso esplodono).\n- **Agile**: Tempo e Costi (Team) sono fissi. Lo SCOPO varia (facciamo prima le cose più importanti).\n\nAgile accetta che non faremo "tutto", ma faremo sicuramente le cose di maggior valore.'),
('106', 'La Crisi del Software', 1, '# Anni 90: Application Crisis\n\nNegli anni ''90, il tasso di fallimento dei progetti software era altissimo.\nTempi lunghi, costi fuori controllo, prodotti che nessuno usava.\nServiva un cambio di paradigma radicale rispetto ai metodi pesanti (Heavyweight).'),
('106', 'Snowbird 2001', 2, '# L''incontro storico\n\nTra l''11 e il 13 febbraio 2001, in uno ski resort nello Utah, 17 "anarchici organizzativi" si riunirono.\nRappresentavano Scrum, XP, DSDM, Crystal, ecc.\nCercavano un terreno comune. Ne uscirono con il "Manifesto Agile".'),
('106', 'I 4 Valori', 3, '# Il cuore del Manifesto\n\n1. **Individui e interazioni** più che processi e strumenti.\n2. **Software funzionante** più che documentazione esaustiva.\n3. **Collaborazione col cliente** più che negoziazione dei contratti.\n4. **Rispondere al cambiamento** più che seguire un piano.\n\n(C''è valore nelle cose a destra, ma diamo più valore a quelle a sinistra).'),
('106', 'I 12 Principi (Sintesi)', 4, '# Linee guida pratiche\n\nAlcuni principi chiave:\n- La nostra massima priorità è soddisfare il cliente.\n- Accogliamo i cambiamenti, anche a stadio avanzato.\n- Consegnamo software funzionante frequentemente.\n- Business e sviluppatori devono lavorare insieme quotidianamente.\n- Semplicità: l''arte di massimizzare il lavoro non svolto.'),
('107', 'Coraggio e Focus', 1, '# Valori Scrum\n\n- **Coraggio**: Di fare la cosa giusta, di dire "No", di affrontare problemi difficili.\n- **Focus**: Tutti si concentrano sul lavoro dello Sprint e sugli obiettivi del Team. Finiamo una cosa prima di iniziarne un''altra.'),
('107', 'Impegno (Commitment)', 2, '# Non è una promessa di sangue\n\nIl "Commitment" non significa "prometto che finirò tutto costi quel che costi lavorando di notte".\nSignifica: "Ci impegniamo a fare del nostro meglio per raggiungere l''obiettivo e ci supportiamo a vicenda".\nÈ un impegno verso il Team e la Qualità.'),
('107', 'Rispetto e Apertura', 3, '# Le basi della fiducia\n\n- **Rispetto**: I membri del team si rispettano come persone capaci e indipendenti. Rispettiamo le skill diverse.\n- **Apertura**: Siamo aperti riguardo al lavoro, alle sfide e ai problemi. Non nascondiamo la polvere sotto il tappeto.'),
('107', 'I Valori in Azione', 4, '# Comportamenti osservabili\n\nSenza valori, Scrum è solo "Zombie Scrum".\n- Se non c''è Apertura, il Daily è una bugia.\n- Se non c''è Rispetto, il codice fa schifo.\n- Se non c''è Focus, non si finisce nulla.\n- Se non c''è Coraggio, non si migliora mai.'),
('108', 'Il Mondo Push', 1, '# Spingere il lavoro\n\nNel modello tradizionale (Push):\n- Il management assegna i task ("Spinge").\n- Focus sull''efficienza individuale ("Tieniti occupato").\n- Competizione tra colleghi.\n- Compliance alle regole.\n- "Non è il mio lavoro".'),
('108', 'Il Mondo Pull', 2, '# Tirare il valore\n\nNel modello Agile (Pull):\n- Il team "Tira" il lavoro quando è pronto.\n- Focus sull''efficacia del flusso.\n- Collaborazione.\n- Auto-organizzazione.\n- Responsabilità condivisa.'),
('108', 'Collaboration vs Competition', 3, '# Collaborazione\n\nIn un sistema Pull, se io ho finito e tu sei in difficoltà, ti aiuto.\nIl successo è del Team, non del singolo.\nNon ci sono "eroi", c''è un gruppo vincente.'),
('108', 'Self-Organization', 4, '# Il potere al team\n\nI team migliori si auto-organizzano.\nNon serve un Project Manager che dica "Tu fai questo".\nIl Team sa COME fare il lavoro meglio di chiunque altro.\nIl Management definisce COSA (Goal) e PERCHÉ (Vision), il Team decide COME.'),
('109', 'La Voce del Cliente', 1, '# Product Owner Accountability\n\nIl PO è responsabile di **massimizzare il valore** del prodotto.\nÈ l''unica persona autorizzata a decidere cosa si fa e cosa no.\nGestisce il "Product Backlog".'),
('109', 'Gestione del ROI', 2, '# Valore > Volume\n\nIl PO non deve volere "tutto". Deve volere "le cose che valgono di più".\nIl suo compito è dire di NO a mille idee per dire di SÌ all''unica che conta davvero.\nCerca il massimo Ritorno sull''Investimento.'),
('109', 'Lavorare col Team', 3, '# Collaborazione quotidiana\n\nIl PO non scrive requisiti e sparisce.\nSta col team.\nRisponde alle domande.\nChiarisce i dubbi.\nAccetta o rifiuta il lavoro finito.\nÈ parte dello Scrum Team.'),
('109', 'Anti-pattern del PO', 4, '# Cosa NON è un PO\n\n- **Il Segretario**: Scrive solo ticket dettati da altri.\n- **Il Proxy**: Fa da passacarte tra stakeholder e team senza potere decisionale.\n- **Il Dittatore**: "Dovete fare così perché lo dico io" (senza spiegare il perché).'),
('110', 'Non è solo una Demo', 1, '# Sprint Review\n\nLa Review non è una presentazione PowerPoint.\nÈ un momento di lavoro.\nSi ispeziona l''INCREMENTO di prodotto funzionante.\nIl Team mostra cosa ha fatto (e cosa no).'),
('110', 'Il Ruolo degli Stakeholder', 2, '# Feedback Loop\n\nGli Stakeholder sono vitali.\nDevono provare il prodotto, dare feedback, dire "questo non mi piace" o "manca questo".\nSenza feedback reali, stiamo volando alla cieca.'),
('110', 'Adattare il Backlog', 3, '# Inspection & Adaptation\n\nSulla base di ciò che vediamo in Review, il Product Backlog cambia.\nNuove idee emergono.\nPriorità cambiano.\nÈ il momento in cui business e tecnologia si allineano sulla realtà.'),
('110', 'Celebrare il Rilascio', 4, '# Morale del Team\n\nLa Review è anche un momento per celebrare il successo.\nAnche se piccolo, un incremento funzionante è una vittoria.\nRiconoscere il lavoro aumenta l''engagement e la voglia di fare meglio nel prossimo Sprint.'),
('111', 'La User Story', 1, '# Generare una conversazione\n\nLa User Story non è un requisito scritto nella pietra.\nÈ l''inizio di una conversazione.\n\nTemplate:\n**"Come [Role], voglio [Feature], affinché [Goal]"**.\n\nL''obiettivo è capire CHI, COSA e PERCHÉ, lasciando il COME (la soluzione tecnica) al team.'),
('111', 'Gerarchia del Lavoro', 2, '# Dal Progetto al Task\n\n1. **Progetto**: Iniziativa business.\n2. **Epica**: Funzionalità grande (es. "Gestione Utenti").\n3. **Feature**: Pezzo dell''Epica (es. "Login").\n4. **User Story**: Unità di valore (es. "Login con Google").\n5. **Task**: Compito tecnico (es. "Configurare OAuth").'),
('111', 'Vertical Slicing', 3, '# La Torta a strati\n\nNon scomporre per livello tecnico (prima tutto il DB, poi tutto il Frontend).\nScomponi per valore (una fetta sottile di torta: DB + Logic + UI).\n\nL''utente deve poter usare quella fetta subito. Un DB perfetto senza interfaccia ha valore ZERO per l''utente.'),
('111', 'Criteri di Accettazione', 4, '# La definizione dei confini\n\nOgni storia ha dei Criteri di Accettazione (Acceptance Criteria).\nSono le condizioni specifiche che devono essere soddisfatte perché la storia sia accettata dal PO.\n"Dato che... Quando... Allora...". Aiutano a creare i test.'),
('112', 'Story Point vs Ore', 1, '# Perché non stimiamo in ore?\n\nLe ore sono assolute, ma le persone lavorano a velocità diverse.\nGli Story Point misurano la **dimensione relativa** del problema.\nÈ come stimare la distanza tra due città: i chilometri sono fissi (complessità), il tempo dipende dall''auto (team).'),
('112', 'I 3 Fattori della Stima', 2, '# Cosa c''è in uno Story Point?\n\n1. **Volume**: Quanto codice c''è da scrivere?\n2. **Complessità**: Quanto è difficile l''algoritmo?\n3. **Rischio/Incertezza**: Cosa non sappiamo?\n\nUn task piccolo ma rischioso vale più punti di uno grande ma banale.'),
('112', 'Fibonacci e Planning Poker', 3, '# La saggezza della folla\n\nUsiamo la serie di Fibonacci (1, 2, 3, 5, 8, 13...) perché l''incertezza cresce esponenzialmente.\n\nIl **Planning Poker**:\n- Evita il bias dell''autorità (tutti votano insieme).\n- Fa emergere le differenze di opinione.\n- Genera discussioni preziose sulle soluzioni.'),
('112', 'Velocità del Team', 4, '# Yesterday''s Weather\n\nLa "Velocity" è la somma dei punti finiti in uno Sprint.\nNon serve per giudicare il team, ma per prevedere il futuro.\n"Se ieri abbiamo fatto 20 punti, probabilmente ne faremo 20 anche domani". Usiamo il dato empirico per pianificare.'),
('113', 'Cos''è Kanban', 1, '# Visualizzare il invisibile\n\nKanban ("Scheda Visiva") serve a visualizzare il lavoro intellettuale (Knowledge Work).\n\nNon puoi gestire ciò che non vedi.\nLa Board mostra lo stato reale del flusso: chi lavora su cosa, e dove siamo bloccati.'),
('113', 'Il Potere del WIP Limit', 2, '# Stop Starting, Start Finishing\n\nSenza limiti, iniziamo mille cose e non ne finiamo nessuna.\nIl WIP Limit (Work In Progress Limit) è un vincolo artificiale che ci costringe a finire le card prima di prenderne di nuove.\n\nMeno WIP = Più Flow.'),
('113', 'La Legge di Little', 3, '# La matematica del flusso\n\n`Lead Time = WIP / Throughput`\n\nSe vuoi ridurre il tempo di consegna (Lead Time), hai due leve:\n1. Aumentare la velocità (difficile).\n2. Abbassare il WIP (facile e immediato).\n\nRiduci le cose in corso, e tutto andrà più veloce.'),
('113', 'Gestire i Blocchi', 4, '# Swarming\n\nQuando una card si blocca, o si raggiunge il limite WIP, il team non ne prende una nuova.\nIl team fa "Swarming" (sciame): tutti si buttano sulla card bloccata per sbloccarla.\nCollaborazione estrema per il flusso.'),
('114', 'Qualità Intrinseca', 1, '# Agile non significa "veloce e sporco"\n\nPer mantenere l''agilità nel tempo, il codice deve essere pulito.\nSe il debito tecnico esplode, la velocità crolla.\nXP (Extreme Programming) fornisce le pratiche tecniche per mantenere il software sano.'),
('114', 'Pair Programming', 2, '# Due teste, un computer\n\nDue sviluppatori lavorano sullo stesso codice.\n- **Driver**: Scrive il codice.\n- **Navigator**: Cerca errori, pensa al design, guarda avanti.\n\nRiducono i bug, diffondono la conoscenza, aumentano la qualità. Non è spreco, è investimento.'),
('114', 'Test-Driven Development (TDD)', 3, '# Red, Green, Refactor\n\n1. **Red**: Scrivi un test che fallisce (prima del codice).\n2. **Green**: Scrivi il codice minimo per passarlo.\n3. **Refactor**: Pulisci il codice.\n\nGarantisce che ogni riga di codice sia testata e necessaria.'),
('114', 'Refactoring Continuo', 4, '# Manutenzione costante\n\nIl codice marcisce se non curato.\nIl Refactoring è il miglioramento della struttura interna del codice senza cambiarne il comportamento esterno.\nVa fatto continuamente, non "alla fine del progetto".'),
('115', 'Start Where You Are', 1, '# Evoluzione, non Rivoluzione\n\nScrum richiede uno "switch" di ruoli immediato. Kanban no.\nPrincipio 1: **Inizia con ciò che fai adesso**.\nNon cambiare titoli o ruoli il primo giorno.\nMappa il processo attuale, anche se fa schifo. Poi miglioralo.'),
('115', 'Change Management Evolutivo', 2, '# Piccoli passi\n\nInvece di riorganizzare tutta l''azienda (che crea resistenza), Kanban suggerisce piccoli cambiamenti incrementali.\n- Visualizza.\n- Nota i problemi.\n- Fai una piccola policy di cambiamento.\n- Ripeti.'),
('115', 'Leadership a tutti i livelli', 3, '# Ognuno è un leader\n\nIn Kanban, chiunque può identificare un collo di bottiglia e proporre un miglioramento.\nNon serve essere manager per guidare il cambiamento.\nL''iniziativa individuale è incoraggiata.'),
('115', 'Make Policies Explicit', 4, '# Le regole del gioco\n\nLe "Policy" devono essere scritte ed esplicite sulla board.\n- Quando una card è "Done"?\n- Chi può spostare le card?\n- Qual è il limite di WIP?\n\nSe le regole sono visibili, le discussioni sono sui fatti, non sulle opinioni.'),
('116', 'Perché misurare?', 1, '# Dati non per giudicare, ma per migliorare\n\nMisuriamo il SISTEMA, non le PERSONE.\nSe il Lead Time è alto, non è colpa di un dev lento, ma di un processo inefficiente.\nLe metriche servono al team per autovalutarsi e migliorare.'),
('116', 'Lead Time vs Cycle Time', 2, '# Tempi di attraversamento\n\n- **Lead Time**: Dal momento in cui il cliente chiede (o il ticket entra nel backlog) al momento in cui è LIVE.\n- **Cycle Time**: Dal momento in cui iniziamo lavorarci (Doing) al momento in cui è finito.\n\nIl cliente è interessato al Lead Time.'),
('116', 'Throughput', 3, '# La vera velocità\n\nIl Throughput è il numero di item finiti in un periodo (es. 10 ticket a settimana).\nÈ la metrica più onesta.\nSe il throughput è stabile, possiamo fare previsioni affidabili (Monte Carlo) su "quando finiremo".'),
('116', 'Work Item Age', 4, '# L''invecchiamento delle card\n\nMisuriamo da quanto tempo un ticket è fermo nel sistema.\nSe un ticket è lì da 20 giorni, è a rischio.\n"Watch the baton, not the runners". Concentrati a far muovere il ticket, non a far correre le persone.'),
('117', 'Chi è il Facilitatore?', 1, '# Guida neutrale\n\nLo Scrum Master (o Agile Coach) agisce come facilitatore.\n**Non prende decisioni** sul contenuto.\nGestisce il **processo** della riunione.\nSi assicura che tutti siano ascoltati.'),
('117', 'Obbiettivi chiari', 2, '# Perché siamo qui?\n\nOgni riunione Agile deve avere uno scopo chiaro.\nIl facilitatore apre dicendo: "L''obiettivo di questa sessione è..."\nUsa il Time Mining per rispettare i tempi.'),
('117', 'Gestire il Conflitto', 3, '# Divergenza e Convergenza\n\nIl conflitto di idee è sano. Il conflitto personale no.\nIl facilitatore crea un ambiente sicuro (Psychological Safety) dove le persone possono dissentire sul problema tecnico senza attaccarsi a vicenda.'),
('117', 'Consenso', 4, '# Thumb Voting\n\nTecniche rapide per decidere:\n- **Pollice su**: D''accordo.\n- **Pollice verso**: Contrario.\n- **Piatto**: Ho dubbi ma mi adeguo (Disagree and Commit).\n- Non cerchiamo l''unanimità perfetta, ma il consenso sufficiente per agire.'),
('118', 'Cos''è Finito?', 1, '# Evitare "Finito ma..."\n\nIl peggior nemico di Agile è: "Ho finito, manca solo il test".\n"Ho finito, ma deve vederlo Luca".\n\nLa **Definition of Done (DoD)** è una checklist condivisa: se non è tutto spuntato, NON è finito.'),
('118', 'Contratto di Qualità', 2, '# Esempio di DoD\n\n- Codice scritto\n- Unit test passati\n- Code review fatta\n- Accettato dal PO\n- Deploy in ambiente di test\n\nLa DoD protegge la qualità del prodotto.'),
('118', 'DoD vs Criteri di Accettazione', 3, '# Distinzione importante\n\n- **DoD**: Si applica a TUTTE le User Story (Standard qualitativo generale).\n- **Criteri di Accettazione**: Si applicano alla SINGOLA storia (Specifiche funzionali).\n\nUna storia è Done quando soddisfa entrambi.'),
('118', 'Undone Work', 4, '# Il costo del debito\n\nSe dichiariamo cose "Finite" che non lo sono, accumuliamo "Undone Work".\nQuesto debito tornerà a morderci prima del rilascio.\nMeglio fare meno cose, ma farle veramente Done.'),
('119', 'Leggere il grafico', 1, '# Bande colorate\n\nIl CFD mostra quanto lavoro c''è in ogni stato ogni giorno.\n- Asse X: Tempo.\n- Asse Y: Numero di ticket.\n- Bande: Backlog, ToDo, Doing, Done.\n\nLa pendenza della banda "Done" è la velocità media.'),
('119', 'Pattern Divergente', 2, '# Il collo di bottiglia\n\nSe la banda "Doing" si allarga (diventa più spessa), significa che iniziamo più cose di quante ne finiamo.\nIl WIP sta aumentando.\nIl Lead Time aumenterà.\nÈ un allarme rosso: smettete di iniziare cose!'),
('119', 'Pattern Piatto', 3, '# Il blocco totale\n\nSe la banda "Done" diventa piatta, nessuno sta consegnando nulla.\nSe le bande orizzontali sono "scalini", significa Batch transfer (rilasciamo in blocco).\nAgile cerca un flusso continuo e liscio.'),
('119', 'Little''s Law visiva', 4, '# Vedere il futuro\n\nGuardando il CFD, puoi tracciare una linea orizzontale per vedere il Lead Time medio.\nPuoi tracciare una linea verticale per vedere il WIP.\nÈ lo strumento diagnostico più potente per un Agile Coach.'),
('120', 'Origini diverse, stessi obiettivi', 1, '# Toyota vs Silicon Valley\n\n- **Lean**: Nasce in Toyota (manifattura) negli anni ''50. Focus su riduzione sprechi (Muda) e flusso.\n- **Agile**: Nasce nel software (2001). Focus su adattabilità e feedback.\n\nOggi convergono nel "Lean-Agile Mindset".'),
('120', 'Efficienza vs Efficacia', 2, '# Fare bene vs Fare la cosa giusta\n\n- **Lean** enfatizza l''**Efficienza**: Fare le cose nel modo giusto, senza sprechi.\n- **Agile** enfatizza l''**Efficacia**: Fare la cosa giusta per il cliente in questo momento.\n\nServe un equilibrio. È inutile produrre in modo efficientissimo qualcosa che nessuno vuole.'),
('120', 'I 7 Sprechi (Muda)', 3, '# Waste nel Software\n\nLean identifica 7 sprechi. Nel software:\n1. Lavoro parzialmente fatto (WIP)\n2. Funzionalità extra (Gold plating)\n3. Relearning (non documentare/condividere)\n4. Handoffs (passaggi di mano)\n5. Task switching\n6. Ritardi\n7. Difetti'),
('120', 'Kaizen', 4, '# Miglioramento Continuo\n\nEntrambi credono nel Kaizen: "Migliorare in meglio".\nNon ci si ferma mai.\nLa perfezione è un asintoto a cui tendere, non una destinazione.\nSperimenta -> Misura -> Impara -> Ripeti.');
