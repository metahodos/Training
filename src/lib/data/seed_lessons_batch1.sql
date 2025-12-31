-- Lessons for Modules 101-110

-- 101: Vision e Mission Metàhodos
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('101', 'La Vision: Felici e Veloci', 1, '# Aziende guidate da persone felici e veloci\n\nLa nostra Vision è chiara: crediamo che la felicità delle persone sia il motore della velocità aziendale.\n\nNon si tratta di "buonismo", ma di efficienza. Un team felice:\n- Collabora meglio\n- Risolve problemi più in fretta\n- È più creativo\n- Ha meno turnover\n\nLa velocità è una conseguenza del benessere, non il contrario.'),
('101', 'La Mission: Tras-formare sul campo', 2, '# Tras-formare sul campo\n\nNon facciamo solo consulenza teorica. La nostra Mission è "Tras-formare sul campo le aziende verso la business agility".\n\nSignifica:\n- Lavorare fianco a fianco con i team\n- Applicare i principi nel lavoro reale\n- Non usare slide, ma post-it e codice\n- Misurare i risultati concreti'),
('101', 'Il Paradosso della Lentezza', 3, '# Per andare veloci, bisogna rallentare\n\nSembra un paradosso, ma per aumentare la velocità sostenibile bisogna spesso rallentare per:\n- Ridurre il debito tecnico\n- Migliorare la qualità\n- Allinearsi sugli obiettivi\n\nLa fretta (rushing) porta errori. La velocità (speed) porta valore.'),
('101', 'Leadership Servente', 4, '# Il Leader Agile\n\nIn Metàhodos, il leader non è chi comanda, ma chi serve.\n\nIl "Servant Leader":\n- Rimuove gli ostacoli\n- Protegge il team dalle interferenze\n- Facilita la crescita delle persone\n- Non dà soluzioni, ma pone le giuste domande.');

-- 102: Agile Mindset
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('102', 'Growth vs Fixed Mindset', 1, '# Due modi di pensare\n\nAl centro del Mindset Agile c''è la distinzione di Carol Dweck:\n\n**Fixed Mindset**:\n- Evita le sfide\n- Si arrende agli ostacoli\n- Vede lo sforzo come inutile\n- Ignora i feedback negativi\n\n**Growth Mindset**:\n- Abbraccia le sfide\n- Persevera di fronte agli ostacoli\n- Vede lo sforzo come via per la maestria\n- Impara dalle critiche'),
('102', 'Ho un problema da risolvere', 2, '# La reazione all''errore\n\nDi fronte a un problema, il Fixed Mindset dice: "O no! Che sfortuna, capitano tutte a me. Vado già bene così".\n\nIl Growth Mindset dice: **"Ho un problema da risolvere"**.\n\nQuesta semplice frase cambia tutto. Trasforma la vittima in protagonista attivo.'),
('102', 'Culto dell''Apprendimento', 3, '# Imparare > Eseguire\n\nIn Agile, l''obiettivo non è solo "finire il task", ma imparare qualcosa di nuovo sul prodotto o sul processo.\n\nOgni fallimento è un''opportunità di apprendimento (Fail Fast, Learn Faster). Se no fallisci mai, non stai innovando.'),
('102', 'Essere Agile vs Fare Agile', 4, '# Doing Agile vs Being Agile\n\n**Doing Agile**:\n- Fare i meeting (Daily, Retro)\n- Usare Jira\n- Avere i ruoli\n\n**Being Agile**:\n- Vivere i valori (Rispetto, Coraggio...)\n- Avere un Mindset empirico\n- Adattarsi al cambiamento\n- Collaborare realmente\n\n"A fool with a tool is still a fool".');

-- 103: Il Mondo V.U.C.A.
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('103', 'Cos''è il V.U.C.A.', 1, '# Volatility, Uncertainty, Complexity, Ambiguity\n\nL''acronimo V.U.C.A. (coniato dall''US Army War College) descrive il mondo moderno:\n\n- **Volatilità**: Cambiamenti rapidi e imprevedibili.\n- **Incertezza**: Difficoltà di prevedere il futuro.\n- **Complessità**: Molteplici forze interconnesse.\n- **Ambiguità**: Realtà poco chiare e interpretabili.'),
('103', 'Volatilità e Incertezza', 2, '# Affrontare il Caos\n\nLa Volatilità si combatte con la **Visione** e la prontezza di risposta.\nL''Incertezza si combatte con la **Comprensione** (Understanding) e l''Empirismo.\n\nNon puoi pianificare tutto a tavolino in un mondo volatile. Devi essere pronto a virare.'),
('103', 'Complessità e Ambiguità', 3, '# Navigare la nebbia\n\nLa Complessità si gestisce con la **Chiarezza** (Clarity) e la semplificazione (Scomporre il lavoro).\nL''Ambiguità si contrastare con l''**Agilità** (Agility) e la sperimentazione rapida.\n\nBetter done than perfect.'),
('103', 'La Risposta Agile', 4, '# Ispeziona e Adatta\n\nIn un mondo V.U.C.A., i piani a lungo termine (5 anni) sono inutili.\n\nLa risposta Agile è:\n1. Fai un piccolo passo\n2. Guardati intorno (Ispeziona)\n3. Decidi la prossima mossa (Adatta)\n\nQuesto ciclo continuo è l''unica bussola affidabile.');

-- 104: Framework Cynefin
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('104', 'I 5 Domini', 1, '# Capire il contesto\n\nIl framework Cynefin aiuta a capire in che situazione ci troviamo:\n1. **Chiaro (Simple)**: Causa-effetto evidenti.\n2. **Complicato**: Causa-effetto scopribili con analisi (esperti).\n3. **Complesso**: Causa-effetto visibili solo a posteriori.\n4. **Caotico**: Nessuna relazione causa-effetto apparente.\n5. **Disordine**: Non sai dove ti trovi.'),
('104', 'Semplice e Complicato', 2, '# Best Practice vs Good Practice\n\n- **Semplice**: Sense -> Categorize -> Respond. Qui valgono le "Best Practices". Procedure standard.\n- **Complicato**: Sense -> Analyze -> Respond. Qui servono gli Esperti. "Good Practices". C''è più di una soluzione giusta.'),
('104', 'Il Dominio Complesso', 3, '# Probe, Sense, Respond\n\nLo sviluppo software e business è quasi sempre **Complesso**.\nNon puoi analizzare tutto prima. Devi:\n1. **Probe**: Fare un piccolo esperimento (MVP).\n2. **Sense**: Vedere cosa succede.\n3. **Respond**: Reagire.\n\nQui nascono le pratiche emergenti.'),
('104', 'Dal Caos all''Ordine', 4, '# Act, Sense, Respond\n\nNel **Caos** (es. un server in fiamme), non c''è tempo per pensare.\n1. **Act**: Fai qualcosa per fermare l''emorragia.\n2. **Sense**: Valuta la stabilità.\n3. **Respond**: Spostati nel dominio Complesso.\n\nIl management tradizionale cerca di gestire il Complesso come se fosse Semplice. Questo porta al disastro.');

-- 105: Waterfall vs Agile
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('105', 'La Cascata (Waterfall)', 1, '# Il modello predittivo\n\nIl Waterfall prevede fasi sequenziali:\n1. Requisiti\n2. Analisi\n3. Design\n4. Implementazione\n5. Test\n6. Rilascio\n\nFunziona solo se sai ESATTAMENTE cosa vuoi e nulla cambierà per mesi. Cioè quasi mai.'),
('105', 'I Limiti del Waterfall', 2, '# L''illusione del controllo\n\nI problemi del Waterfall:\n- Il valore arriva solo alla fine (Big Bang).\n- I cambiamenti sono costosi ("Change Request").\n- I test sono compressi alla fine.\n- Il cliente vede il prodotto troppo tardi.\n\nL''approccio Agile invece consegna piccoli pezzi di valore funzionante frequentemente.'),
('105', 'Empirismo', 3, '# Trasparenza, Ispezione, Adattamento\n\nAgile si basa sull''empirismo:\n- **Trasparenza**: Tutti vedono tutto.\n- **Ispezione**: Controlliamo frequentemente come sta andando.\n- **Adattamento**: Se qualcosa non va, cambiamo rotta subito.\n\nNon seguiamo il piano ciecamente.'),
('105', 'Il Triangolo di Ferro', 4, '# Ribaltare i vincoli\n\n- **Waterfall**: Lo SCOPO è fisso. Tempo e Costi variano (spesso esplodono).\n- **Agile**: Tempo e Costi (Team) sono fissi. Lo SCOPO varia (facciamo prima le cose più importanti).\n\nAgile accetta che non faremo "tutto", ma faremo sicuramente le cose di maggior valore.');

-- 106: Le Origini di Agile
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('106', 'La Crisi del Software', 1, '# Anni 90: Application Crisis\n\nNegli anni ''90, il tasso di fallimento dei progetti software era altissimo.\nTempi lunghi, costi fuori controllo, prodotti che nessuno usava.\nServiva un cambio di paradigma radicale rispetto ai metodi pesanti (Heavyweight).'),
('106', 'Snowbird 2001', 2, '# L''incontro storico\n\nTra l''11 e il 13 febbraio 2001, in uno ski resort nello Utah, 17 "anarchici organizzativi" si riunirono.\nRappresentavano Scrum, XP, DSDM, Crystal, ecc.\nCercavano un terreno comune. Ne uscirono con il "Manifesto Agile".'),
('106', 'I 4 Valori', 3, '# Il cuore del Manifesto\n\n1. **Individui e interazioni** più che processi e strumenti.\n2. **Software funzionante** più che documentazione esaustiva.\n3. **Collaborazione col cliente** più che negoziazione dei contratti.\n4. **Rispondere al cambiamento** più che seguire un piano.\n\n(C''è valore nelle cose a destra, ma diamo più valore a quelle a sinistra).'),
('106', 'I 12 Principi (Sintesi)', 4, '# Linee guida pratiche\n\nAlcuni principi chiave:\n- La nostra massima priorità è soddisfare il cliente.\n- Accogliamo i cambiamenti, anche a stadio avanzato.\n- Consegnamo software funzionante frequentemente.\n- Business e sviluppatori devono lavorare insieme quotidianamente.\n- Semplicità: l''arte di massimizzare il lavoro non svolto.');

-- 107: I Valori Fondamentali
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('107', 'Coraggio e Focus', 1, '# Valori Scrum\n\n- **Coraggio**: Di fare la cosa giusta, di dire "No", di affrontare problemi difficili.\n- **Focus**: Tutti si concentrano sul lavoro dello Sprint e sugli obiettivi del Team. Finiamo una cosa prima di iniziarne un''altra.'),
('107', 'Impegno (Commitment)', 2, '# Non è una promessa di sangue\n\nIl "Commitment" non significa "prometto che finirò tutto costi quel che costi lavorando di notte".\nSignifica: "Ci impegniamo a fare del nostro meglio per raggiungere l''obiettivo e ci supportiamo a vicenda".\nÈ un impegno verso il Team e la Qualità.'),
('107', 'Rispetto e Apertura', 3, '# Le basi della fiducia\n\n- **Rispetto**: I membri del team si rispettano come persone capaci e indipendenti. Rispettiamo le skill diverse.\n- **Apertura**: Siamo aperti riguardo al lavoro, alle sfide e ai problemi. Non nascondiamo la polvere sotto il tappeto.'),
('107', 'I Valori in Azione', 4, '# Comportamenti osservabili\n\nSenza valori, Scrum è solo "Zombie Scrum".\n- Se non c''è Apertura, il Daily è una bugia.\n- Se non c''è Rispetto, il codice fa schifo.\n- Se non c''è Focus, non si finisce nulla.\n- Se non c''è Coraggio, non si migliora mai.');

-- 108: Paradigma Pull vs Push
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('108', 'Il Mondo Push', 1, '# Spingere il lavoro\n\nNel modello tradizionale (Push):\n- Il management assegna i task ("Spinge").\n- Focus sull''efficienza individuale ("Tieniti occupato").\n- Competizione tra colleghi.\n- Compliance alle regole.\n- "Non è il mio lavoro".'),
('108', 'Il Mondo Pull', 2, '# Tirare il valore\n\nNel modello Agile (Pull):\n- Il team "Tira" il lavoro quando è pronto.\n- Focus sull''efficacia del flusso.\n- Collaborazione.\n- Auto-organizzazione.\n- Responsabilità condivisa.'),
('108', 'Collaboration vs Competition', 3, '# Collaborazione\n\nIn un sistema Pull, se io ho finito e tu sei in difficoltà, ti aiuto.\nIl successo è del Team, non del singolo.\nNon ci sono "eroi", c''è un gruppo vincente.'),
('108', 'Self-Organization', 4, '# Il potere al team\n\nI team migliori si auto-organizzano.\nNon serve un Project Manager che dica "Tu fai questo".\nIl Team sa COME fare il lavoro meglio di chiunque altro.\nIl Management definisce COSA (Goal) e PERCHÉ (Vision), il Team decide COME.');

-- 109: Il Ruolo del Product Owner
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('109', 'La Voce del Cliente', 1, '# Product Owner Accountability\n\nIl PO è responsabile di **massimizzare il valore** del prodotto.\nÈ l''unica persona autorizzata a decidere cosa si fa e cosa no.\nGestisce il "Product Backlog".'),
('109', 'Gestione del ROI', 2, '# Valore > Volume\n\nIl PO non deve volere "tutto". Deve volere "le cose che valgono di più".\nIl suo compito è dire di NO a mille idee per dire di SÌ all''unica che conta davvero.\nCerca il massimo Ritorno sull''Investimento.'),
('109', 'Lavorare col Team', 3, '# Collaborazione quotidiana\n\nIl PO non scrive requisiti e sparisce.\nSta col team.\nRisponde alle domande.\nChiarisce i dubbi.\nAccetta o rifiuta il lavoro finito.\nÈ parte dello Scrum Team.'),
('109', 'Anti-pattern del PO', 4, '# Cosa NON è un PO\n\n- **Il Segretario**: Scrive solo ticket dettati da altri.\n- **Il Proxy**: Fa da passacarte tra stakeholder e team senza potere decisionale.\n- **Il Dittatore**: "Dovete fare così perché lo dico io" (senza spiegare il perché).');

-- 110: Sprint Review e Feedback
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('110', 'Non è solo una Demo', 1, '# Sprint Review\n\nLa Review non è una presentazione PowerPoint.\nÈ un momento di lavoro.\nSi ispeziona l''INCREMENTO di prodotto funzionante.\nIl Team mostra cosa ha fatto (e cosa no).'),
('110', 'Il Ruolo degli Stakeholder', 2, '# Feedback Loop\n\nGli Stakeholder sono vitali.\nDevono provare il prodotto, dare feedback, dire "questo non mi piace" o "manca questo".\nSenza feedback reali, stiamo volando alla cieca.'),
('110', 'Adattare il Backlog', 3, '# Inspection & Adaptation\n\nSulla base di ciò che vediamo in Review, il Product Backlog cambia.\nNuove idee emergono.\nPriorità cambiano.\nÈ il momento in cui business e tecnologia si allineano sulla realtà.'),
('110', 'Celebrare il Rilascio', 4, '# Morale del Team\n\nLa Review è anche un momento per celebrare il successo.\nAnche se piccolo, un incremento funzionante è una vittoria.\nRiconoscere il lavoro aumenta l''engagement e la voglia di fare meglio nel prossimo Sprint.');
