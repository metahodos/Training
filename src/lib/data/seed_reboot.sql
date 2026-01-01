DO $$
DECLARE
  m_id uuid;
BEGIN
  -- Clear existing data (optional, for safety during dev)
  DELETE FROM public.user_attempts;
  DELETE FROM public.scenarios;
  DELETE FROM public.lesson_completions;
  DELETE FROM public.quiz_results;
  DELETE FROM public.modules; -- Cascades to everything

  -- =============================================
  -- MODULO 1: Mindset & Fail Safe
  -- =============================================
  INSERT INTO public.modules (title, description, pillar, day, sort_order)
  VALUES ('Mindset & Fail Safe', 'Vedere il fallimento rapido non come errore, ma come apprendimento.', 'Fail Safe Innovation', 1, 1)
  RETURNING id INTO m_id;

  INSERT INTO public.lessons (module_id, title, content_markdown, sort_order)
  VALUES 
  (m_id, 'Introduzione al Mindset Agile', '# Mindset Agile\n\nBenvenuti al corso. Il mindset agile non è solo una metodologia, è un modo di pensare.\n\n## Punti chiave\n- Adattabilità\n- Collaborazione\n- Valore al cliente', 1),
  (m_id, 'Cultura Fail Safe', '# Cultura Fail Safe\n\nIn un ambiente complesso, il fallimento è inevitabile. Il segreto è fallire in fretta e imparare.\n\n> "Fail fast, learn faster."\n\nNon punire gli errori, ma analizzali.', 2),
  (m_id, 'Esperienza: Torre di Marshmallow', '# Esperienza: Torre di Marshmallow\n\n**Obiettivo**: Costruire la torre più alta con spaghetti e un marshmallow in cima.\n\n## Istruzioni\n1. Formate un team.\n2. Avete 18 minuti.\n3. Prototipate rapidamente!\n\nQuesta simulazione dimostra il valore della prototipazione rispetto alla pianificazione eccessiva.', 3);

  INSERT INTO public.quizzes (module_id, questions_json)
  VALUES (m_id, '[
    {"question": "Cosa significa Fail Safe?", "options": ["Evitare ogni errore", "Imparare dai fallimenti rapidi", "Pianificare tutto perfettaente", "Non prendere rischi"], "correctIndex": 1},
    {"question": "Qual è il focus principale?", "options": ["Apprendimento", "Punizione", "Documentazione", "Gerarchia"], "correctIndex": 0},
    {"question": "Nell''esperienza Marshmallow, chi vince spesso?", "options": ["CEO", "Bambini dell''asilo", "Avvocati", "Studenti MBA"], "correctIndex": 1},
    {"question": "Quale principio agile supporta il Fail Safe?", "options": ["Negoziazione contratti", "Rispondere al cambiamento", "Seguire il piano", "Documentazione esaustiva"], "correctIndex": 1}
  ]'::jsonb);

  INSERT INTO public.scenarios (module_id, title, description, initial_context, difficulty)
  VALUES (m_id, 'Simulazione Torre di Marshmallow', 'Costruisci la torre più alta in un ambiente virtuale.', 'Sei il facilitatore di un team che deve costruire la torre. Il team sta litigando sul piano. Cosa fai?', 'Junior');

  -- =============================================
  -- MODULO 2: Autonomia & Team Multidisciplinari
  -- =============================================
  INSERT INTO public.modules (title, description, pillar, day, sort_order)
  VALUES ('Autonomia & Team Multidisciplinari', 'Team autonomi con membri alla pari e libertà decisionale.', 'Team Autonomy', 1, 2)
  RETURNING id INTO m_id;

  INSERT INTO public.lessons (module_id, title, content_markdown, sort_order)
  VALUES 
  (m_id, 'Il Team Cross-Funzionale', '# Team Cross-Funzionale\n\nUn team agile deve avere tutte le competenze necessarie per completare il lavoro.\n\n- Sviluppatori\n- Tester\n- Analisti\n- Designer', 1),
  (m_id, 'Ruoli Chiave: SM e PO', '# Product Owner e Scrum Master\n\n## Product Owner (PO)\nDefinisce il **COSA**.\n\n## Scrum Master (SM)\nFacilita il **COME** e rimuove gli impedimenti.', 2),
  (m_id, 'Esperienza: Il Puzzle', '# Esperienza: Il Puzzle\n\nAuto-organizzazione sotto pressione.\n\nIl team deve completare un puzzle complesso senza un leader designato che comanda. Ognuno trova il suo posto.', 3);

  INSERT INTO public.quizzes (module_id, questions_json)
  VALUES (m_id, '[
    {"question": "Chi decide il lavoro da fare nello sprint?", "options": ["Il Team", "Il Manager", "Lo Scrum Master", "Il cliente"], "correctIndex": 0},
    {"question": "Chi è responsabile del valore del prodotto?", "options": ["Team", "Scrum Master", "Product Owner", "Stakeholder"], "correctIndex": 2},
    {"question": "Cosa caratterizza un team agile?", "options": ["Gerarchia rigida", "Silos funzionali", "Autonomia e cross-funzionalità", "Micro-management"], "correctIndex": 2},
    {"question": "L''esperienza Puzzle insegna...", "options": ["La competizione", "L''auto-organizzazione", "Il waterfall", "La documentazione"], "correctIndex": 1}
  ]'::jsonb);
  
  INSERT INTO public.scenarios (module_id, title, description, initial_context, difficulty)
  VALUES (m_id, 'Il Puzzle Caotico', 'Gestisci un team che non riesce a coordinarsi.', 'Il team ha i pezzi del puzzle sparsi sul tavolo. Nessuno parla. Il tempo scorre. Come intervieni come SM?', 'Mid');

  -- =============================================
  -- MODULO 3: Vision & MVP
  -- =============================================
  INSERT INTO public.modules (title, description, pillar, day, sort_order)
  VALUES ('Vision & MVP', 'Creazione di una visione chiara e di una prima versione semplificata.', 'Vision & MVP', 1, 3)
  RETURNING id INTO m_id;

  INSERT INTO public.lessons (module_id, title, content_markdown, sort_order)
  VALUES 
  (m_id, 'Definire la Vision', '# Vision\n\nUna visione chiara allinea il team e gli stakeholder verso un obiettivo comune.\n\nDeve essere:\n- Ispiratrice\n- Chiara\n- Concisa', 1),
  (m_id, 'Minimum Viable Product (MVP)', '# MVP\n\nLa versione più semplice del prodotto che permette di validare le ipotesi.\n\nNon è un prodotto "scadente", è un prodotto "minimale" ma funzionante.', 2),
  (m_id, 'Esperienza: Aerei di Carta', '# Esperienza: Aerei di Carta\n\nIterazione basata sul volo.\n\n1. Costruite un aereo.\n2. Lanciatelo.\n3. Misurate la distanza.\n4. Migliorate il design.\n5. Ripetete.', 3);

  INSERT INTO public.quizzes (module_id, questions_json)
  VALUES (m_id, '[
    {"question": "Cosa significa MVP?", "options": ["Most Valuable Player", "Minimum Viable Product", "Maximum Viable Product", "Minimum Viable Planner"], "correctIndex": 1},
    {"question": "A cosa serve l''MVP?", "options": ["A risparmiare soldi", "A validare ipotesi rapidamente", "A fare bella figura", "A consegnare tutto subito"], "correctIndex": 1},
    {"question": "La Vision deve essere...", "options": ["Lunga", "Segreta", "Condivisa e chiara", "Tecnica"], "correctIndex": 2},
    {"question": "Nell''esperimento aerei carta, cosa guida il design?", "options": ["Il feedback del volo (realtà)", "L''opinione del capo", "Il colore della carta", "Il costo"], "correctIndex": 0}
  ]'::jsonb);

  INSERT INTO public.scenarios (module_id, title, description, initial_context, difficulty)
  VALUES (m_id, 'Design Aerei di Carta', 'Itera sul design in base ai feedback.', 'Il primo lancio è fallito miseramente (0 metri). Il team è demoralizzato. Cosa suggerisci?', 'Junior');

  -- =============================================
  -- MODULO 4: Sviluppo Iterativo & Scrum Framework
  -- =============================================
  INSERT INTO public.modules (title, description, pillar, day, sort_order)
  VALUES ('Sviluppo Iterativo & Scrum Framework', 'Cicli brevi (Sprint) per flessibilità e velocità.', 'Iterative Cycles', 2, 4)
  RETURNING id INTO m_id;

  INSERT INTO public.lessons (module_id, title, content_markdown, sort_order)
  VALUES (m_id, 'Cicli Iterativi', '# Iterazione\n\nInvece di un "Big Bang" finale, rilasciamo valore incrementale in cicli brevi.', 1);

  INSERT INTO public.lessons (module_id, title, content_markdown, sort_order)
  VALUES (m_id, 'Scrum Guide', '# Scrum Framework\n\n- **Sprint Planning**: Definire cosa fare.\n- **Daily Scrum**: Allineamento giornaliero.\n- **Sprint Review**: Mostrare il lavoro fatto.\n- **Sprint Retrospective**: Migliorare il processo.', 2);

  INSERT INTO public.lessons (module_id, title, content_markdown, sort_order)
  VALUES (m_id, 'Esperienza: Simulazione Scrum', '# Simulazione Scrum\n\nApplichiamo Scrum in un contesto simulato (es. costruzione LEGO City).\n\nViviamo tutti gli eventi in timebox ridotti.', 3);

  INSERT INTO public.quizzes (module_id, questions_json)
  VALUES (m_id, '[
    {"question": "Quanto dura uno Sprint?", "options": ["1-4 settimane", "3 mesi", "1 anno", "Variabile"], "correctIndex": 0},
    {"question": "Quale evento serve a ispezionare l''incremento?", "options": ["Daily", "Planning", "Review", "Retro"], "correctIndex": 2},
    {"question": "Quale evento serve a ispezionare il processo?", "options": ["Daily", "Planning", "Review", "Retrospective"], "correctIndex": 3},
    {"question": "Scrum è...", "options": ["Una metodologia predittiva", "Un framework empirico", "Un software", "Una burocrazia"], "correctIndex": 1}
  ]'::jsonb);

  INSERT INTO public.scenarios (module_id, title, description, initial_context, difficulty)
  VALUES (m_id, 'Scrum Master Crisis', 'Gestisci un Daily Scrum che dura troppo.', 'Il Daily Scrum è al 20° minuto. Tutti stanno risolvendo problemi tecnici invece di allinearsi. Cosa fai?', 'Mid');


  -- =============================================
  -- MODULO 5: Obeya Room & Trasparenza
  -- =============================================
  INSERT INTO public.modules (title, description, pillar, day, sort_order)
  VALUES ('Obeya Room & Trasparenza', 'Spazio dedicato per trasparenza, monitoraggio e risoluzione rapida.', 'Obeya Room', 2, 5)
  RETURNING id INTO m_id;

  INSERT INTO public.lessons (module_id, title, content_markdown, sort_order)
  VALUES 
  (m_id, 'La Obeya Room', '# Obeya ("Grande Stanza")\n\nUn luogo fisico o virtuale dove tutte le informazioni critiche sono visibili a tutti.\n- Metriche\n- Problemi\n- Strategia', 1),
  (m_id, 'Visual Management', '# Gestione Visiva\n\nRendere il lavoro visibile per gestirlo meglio. Se non lo vedi, non puoi gestirlo.', 2),
  (m_id, 'Esperienza: Simulazione Kanban', '# Esperienza: Kanban\n\nVisualizzare il flusso di lavoro.\nLimitare il WIP (Work In Progress).\nGestire i colli di bottiglia.', 3);

  INSERT INTO public.quizzes (module_id, questions_json)
  VALUES (m_id, '[
    {"question": "Cosa significa Obeya?", "options": ["Ufficio del capo", "Grande Stanza", "Sala relax", "Archivio"], "correctIndex": 1},
    {"question": "A cosa serve il Visual Management?", "options": ["A decorare", "A rendere evidenti problemi e progressi", "A nascondere i ritardi", "A complicare il lavoro"], "correctIndex": 1},
    {"question": "Cos''è il WIP in Kanban?", "options": ["Work In Progress", "Work Is Perfect", "Wait In Process", "Work In Paris"], "correctIndex": 0},
    {"question": "Limitare il WIP aiuta a...", "options": ["Rallentare", "Migliorare il flusso (Flow)", "Aumentare lo stress", "Creare scorte"], "correctIndex": 1}
  ]'::jsonb);

  INSERT INTO public.scenarios (module_id, title, description, initial_context, difficulty)
  VALUES (m_id, 'Kanban Bottleneck', 'Risolvi un collo di bottiglia nel flusso.', 'La colonna "Testing" è piena. Gli sviluppatori continuano a buttare codice in "Testing". Il lavoro si accumula. Cosa suggerisci?', 'Senior');

  -- =============================================
  -- MODULO 6: Comunicazione Strategica
  -- =============================================
  INSERT INTO public.modules (title, description, pillar, day, sort_order)
  VALUES ('Comunicazione Strategica', 'Flusso continuo di informazioni tra team e Steering Committee.', 'Strategic Comms', 2, 6)
  RETURNING id INTO m_id;

  INSERT INTO public.lessons (module_id, title, content_markdown, sort_order)
  VALUES 
  (m_id, 'Allineamento Verticale', '# Allineamento\n\nLa comunicazione non deve essere a senso unico. Serve un loop di feedback continuo tra strategia (Steering) e operatività (Team).', 1),
  (m_id, 'Reportistica Efficace', '# Reportistica\n\nEvitare report "anguria" (verdi fuori, rossi dentro). Essere onesti e trasparenti sui rischi.', 2),
  (m_id, 'Esperienza: Steering Committee Roleplay', '# Roleplay\n\nSimuliamo una riunione di Steering Committee.\nIl PO presenta i dati reali, lo Steering prende decisioni basate sui dati, non sulle opinioni.', 3);

  INSERT INTO public.quizzes (module_id, questions_json)
  VALUES (m_id, '[
    {"question": "Cos''è un report ''anguria''?", "options": ["Un report dolce", "Un report verde fuori (tutto ok) ma rosso dentro (problemi)", "Un report estivo", "Un report dettagliato"], "correctIndex": 1},
    {"question": "La comunicazione strategica deve essere...", "options": ["Unidirezionale", "Bidirezionale e trasparente", "Solo scritta", "Solo orale"], "correctIndex": 1},
    {"question": "Chi partecipa tipicamente allo Steering?", "options": ["Tutti i developer", "Stakeholder chiave e PO", "Clienti finali", "Fornitori"], "correctIndex": 1},
    {"question": "Su cosa si basano le decisioni?", "options": ["Opinioni", "Dati reali", "Speranze", "Rumors"], "correctIndex": 1}
  ]'::jsonb);

  INSERT INTO public.scenarios (module_id, title, description, initial_context, difficulty)
  VALUES (m_id, 'Steering Committee Tough Questions', 'Affronta stakeholder difficili.', 'Il progetto è in ritardo. Lo Steering Committee chiede "Quando sarà finito tutto?". Non hai una data certa. Come rispondi?', 'Senior');


  -- =============================================
  -- MODULO 7: Facilitazione (SM)
  -- =============================================
  INSERT INTO public.modules (title, description, pillar, day, role_access, sort_order)
  VALUES ('Facilitazione e rimozione impedimenti', 'Modulo Specialistico per Scrum Master.', 'Servant Leadership', 3, 'SM', 7)
  RETURNING id INTO m_id;

  INSERT INTO public.lessons (module_id, title, content_markdown, sort_order)
  VALUES (m_id, 'Il ruolo del Facilitatore', '# Facilitazione\n\nLo SM non decide per il team, ma aiuta il team a decidere.', 1);
  INSERT INTO public.lessons (module_id, title, content_markdown, sort_order)
  VALUES (m_id, 'Rimuovere gli Impedimenti', '# Impedimenti\n\nTutto ciò che rallenta il team. Lo SM deve proteggere il team e rimuovere gli ostacoli.', 2);

  INSERT INTO public.quizzes (module_id, questions_json)
  VALUES (m_id, '[
    {"question": "Qual è il compito primario di uno SM?", "options": ["Assegnare task", "Rimuovere impedimenti", "Scrivere codice", "Fare il capo"], "correctIndex": 1},
    {"question": "Facilitare significa...", "options": ["Rendere le cose facili per sé", "Guidare il gruppo verso un obiettivo comune senza imporsi", "Dettare le regole", "Prendere appunti"], "correctIndex": 1},
    {"question": "Un impedimento è...", "options": ["Un bug", "Qualcosa che blocca il progresso", "Una feature nuova", "Un test fallito"], "correctIndex": 1},
    {"question": "Servant Leader significa...", "options": ["Leader che serve il team", "Team che serve il leader", "Tutti servono il cliente", "Nessuna delle precedenti"], "correctIndex": 0}
  ]'::jsonb);

  -- =============================================
  -- MODULO 8: Gestione Backlog (PO)
  -- =============================================
  INSERT INTO public.modules (title, description, pillar, day, role_access, sort_order)
  VALUES ('Gestione Backlog e Roadmap MVP', 'Modulo Specialistico per Product Owner.', 'Value Maximization', 3, 'PO', 8)
  RETURNING id INTO m_id;

  INSERT INTO public.lessons (module_id, title, content_markdown, sort_order)
  VALUES (m_id, 'Gestione del Product Backlog', '# Backlog Management\n\nIl Backlog non è una discarica. Deve essere ordinato, stimato e pulito (DEEP).', 1);
  INSERT INTO public.lessons (module_id, title, content_markdown, sort_order)
  VALUES (m_id, 'Roadmap & Release Planning', '# Roadmap\n\nUna visione di alto livello di come il prodotto evolverà nel tempo.', 2);

  INSERT INTO public.quizzes (module_id, questions_json)
  VALUES (m_id, '[
    {"question": "Chi possiede il Product Backlog?", "options": ["Il Team", "Lo Scrum Master", "Il Product Owner", "Il Cliente"], "correctIndex": 2},
    {"question": "DEEP sta per...", "options": ["Detailed, Estimated, Emergent, Prioritized", "Deeply estimated", "Double estimated", "Directly prioritized"], "correctIndex": 0},
    {"question": "La Roadmap serve a...", "options": ["Tracciare i bug", "Comunicare la visione temporale", "Pianificare le vacanze", "Micro-gestire"], "correctIndex": 1},
    {"question": "Quando è finito il Backlog?", "options": ["Mai, finché vive il prodotto", "Alla fine del progetto", "Quando il capo dice stop", "Dopo 3 sprint"], "correctIndex": 0}
  ]'::jsonb);

END $$;
