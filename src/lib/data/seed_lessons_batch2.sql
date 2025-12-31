-- Lessons for Modules 111-120

-- 111: User Stories & INVEST (Scomposizione)
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('111', 'La User Story', 1, '# Generare una conversazione\n\nLa User Story non è un requisito scritto nella pietra.\nÈ l''inizio di una conversazione.\n\nTemplate:\n**"Come [Role], voglio [Feature], affinché [Goal]"**.\n\nL''obiettivo è capire CHI, COSA e PERCHÉ, lasciando il COME (la soluzione tecnica) al team.'),
('111', 'Gerarchia del Lavoro', 2, '# Dal Progetto al Task\n\n1. **Progetto**: Iniziativa business.\n2. **Epica**: Funzionalità grande (es. "Gestione Utenti").\n3. **Feature**: Pezzo dell''Epica (es. "Login").\n4. **User Story**: Unità di valore (es. "Login con Google").\n5. **Task**: Compito tecnico (es. "Configurare OAuth").'),
('111', 'Vertical Slicing', 3, '# La Torta a strati\n\nNon scomporre per livello tecnico (prima tutto il DB, poi tutto il Frontend).\nScomponi per valore (una fetta sottile di torta: DB + Logic + UI).\n\nL''utente deve poter usare quella fetta subito. Un DB perfetto senza interfaccia ha valore ZERO per l''utente.'),
('111', 'Criteri di Accettazione', 4, '# La definizione dei confini\n\nOgni storia ha dei Criteri di Accettazione (Acceptance Criteria).\nSono le condizioni specifiche che devono essere soddisfatte perché la storia sia accettata dal PO.\n"Dato che... Quando... Allora...". Aiutano a creare i test.');

-- 112: Stima e Planning Poker (Mapping to Quiz 11/12 areas)
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('112', 'Story Point vs Ore', 1, '# Perché non stimiamo in ore?\n\nLe ore sono assolute, ma le persone lavorano a velocità diverse.\nGli Story Point misurano la **dimensione relativa** del problema.\nÈ come stimare la distanza tra due città: i chilometri sono fissi (complessità), il tempo dipende dall''auto (team).'),
('112', 'I 3 Fattori della Stima', 2, '# Cosa c''è in uno Story Point?\n\n1. **Volume**: Quanto codice c''è da scrivere?\n2. **Complessità**: Quanto è difficile l''algoritmo?\n3. **Rischio/Incertezza**: Cosa non sappiamo?\n\nUn task piccolo ma rischioso vale più punti di uno grande ma banale.'),
('112', 'Fibonacci e Planning Poker', 3, '# La saggezza della folla\n\nUsiamo la serie di Fibonacci (1, 2, 3, 5, 8, 13...) perché l''incertezza cresce esponenzialmente.\n\nIl **Planning Poker**:\n- Evita il bias dell''autorità (tutti votano insieme).\n- Fa emergere le differenze di opinione.\n- Genera discussioni preziose sulle soluzioni.'),
('112', 'Velocità del Team', 4, '# Yesterday''s Weather\n\nLa "Velocity" è la somma dei punti finiti in uno Sprint.\nNon serve per giudicare il team, ma per prevedere il futuro.\n"Se ieri abbiamo fatto 20 punti, probabilmente ne faremo 20 anche domani". Usiamo il dato empirico per pianificare.');

-- 113: Kanban & WIP Limit
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('113', 'Cos''è Kanban', 1, '# Visualizzare il invisibile\n\nKanban ("Scheda Visiva") serve a visualizzare il lavoro intellettuale (Knowledge Work).\n\nNon puoi gestire ciò che non vedi.\nLa Board mostra lo stato reale del flusso: chi lavora su cosa, e dove siamo bloccati.'),
('113', 'Il Potere del WIP Limit', 2, '# Stop Starting, Start Finishing\n\nSenza limiti, iniziamo mille cose e non ne finiamo nessuna.\nIl WIP Limit (Work In Progress Limit) è un vincolo artificiale che ci costringe a finire le card prima di prenderne di nuove.\n\nMeno WIP = Più Flow.'),
('113', 'La Legge di Little', 3, '# La matematica del flusso\n\n`Lead Time = WIP / Throughput`\n\nSe vuoi ridurre il tempo di consegna (Lead Time), hai due leve:\n1. Aumentare la velocità (difficile).\n2. Abbassare il WIP (facile e immediato).\n\nRiduci le cose in corso, e tutto andrà più veloce.'),
('113', 'Gestire i Blocchi', 4, '# Swarming\n\nQuando una card si blocca, o si raggiunge il limite WIP, il team non ne prende una nuova.\nIl team fa "Swarming" (sciame): tutti si buttano sulla card bloccata per sbloccarla.\nCollaborazione estrema per il flusso.');

-- 114: Extreme Programming (XP)
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('114', 'Qualità Intrinseca', 1, '# Agile non significa "veloce e sporco"\n\nPer mantenere l''agilità nel tempo, il codice deve essere pulito.\nSe il debito tecnico esplode, la velocità crolla.\nXP (Extreme Programming) fornisce le pratiche tecniche per mantenere il software sano.'),
('114', 'Pair Programming', 2, '# Due teste, un computer\n\nDue sviluppatori lavorano sullo stesso codice.\n- **Driver**: Scrive il codice.\n- **Navigator**: Cerca errori, pensa al design, guarda avanti.\n\nRiducono i bug, diffondono la conoscenza, aumentano la qualità. Non è spreco, è investimento.'),
('114', 'Test-Driven Development (TDD)', 3, '# Red, Green, Refactor\n\n1. **Red**: Scrivi un test che fallisce (prima del codice).\n2. **Green**: Scrivi il codice minimo per passarlo.\n3. **Refactor**: Pulisci il codice.\n\nGarantisce che ogni riga di codice sia testata e necessaria.'),
('114', 'Refactoring Continuo', 4, '# Manutenzione costante\n\nIl codice marcisce se non curato.\nIl Refactoring è il miglioramento della struttura interna del codice senza cambiarne il comportamento esterno.\nVa fatto continuamente, non "alla fine del progetto".');

-- 115: Kanban Change Management
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('115', 'Start Where You Are', 1, '# Evoluzione, non Rivoluzione\n\nScrum richiede uno "switch" di ruoli immediato. Kanban no.\nPrincipio 1: **Inizia con ciò che fai adesso**.\nNon cambiare titoli o ruoli il primo giorno.\nMappa il processo attuale, anche se fa schifo. Poi miglioralo.'),
('115', 'Change Management Evolutivo', 2, '# Piccoli passi\n\nInvece di riorganizzare tutta l''azienda (che crea resistenza), Kanban suggerisce piccoli cambiamenti incrementali.\n- Visualizza.\n- Nota i problemi.\n- Fai una piccola policy di cambiamento.\n- Ripeti.'),
('115', 'Leadership a tutti i livelli', 3, '# Ognuno è un leader\n\nIn Kanban, chiunque può identificare un collo di bottiglia e proporre un miglioramento.\nNon serve essere manager per guidare il cambiamento.\nL''iniziativa individuale è incoraggiata.'),
('115', 'Make Policies Explicit', 4, '# Le regole del gioco\n\nLe "Policy" devono essere scritte ed esplicite sulla board.\n- Quando una card è "Done"?\n- Chi può spostare le card?\n- Qual è il limite di WIP?\n\nSe le regole sono visibili, le discussioni sono sui fatti, non sulle opinioni.');

-- 116: Metriche di Flusso
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('116', 'Perché misurare?', 1, '# Dati non per giudicare, ma per migliorare\n\nMisuriamo il SISTEMA, non le PERSONE.\nSe il Lead Time è alto, non è colpa di un dev lento, ma di un processo inefficiente.\nLe metriche servono al team per autovalutarsi e migliorare.'),
('116', 'Lead Time vs Cycle Time', 2, '# Tempi di attraversamento\n\n- **Lead Time**: Dal momento in cui il cliente chiede (o il ticket entra nel backlog) al momento in cui è LIVE.\n- **Cycle Time**: Dal momento in cui iniziamo lavorarci (Doing) al momento in cui è finito.\n\nIl cliente è interessato al Lead Time.'),
('116', 'Throughput', 3, '# La vera velocità\n\nIl Throughput è il numero di item finiti in un periodo (es. 10 ticket a settimana).\nÈ la metrica più onesta.\nSe il throughput è stabile, possiamo fare previsioni affidabili (Monte Carlo) su "quando finiremo".'),
('116', 'Work Item Age', 4, '# L''invecchiamento delle card\n\nMisuriamo da quanto tempo un ticket è fermo nel sistema.\nSe un ticket è lì da 20 giorni, è a rischio.\n"Watch the baton, not the runners". Concentrati a far muovere il ticket, non a far correre le persone.');

-- 117: La Facilitazione
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('117', 'Chi è il Facilitatore?', 1, '# Guida neutrale\n\nLo Scrum Master (o Agile Coach) agisce come facilitatore.\n**Non prende decisioni** sul contenuto.\nGestisce il **processo** della riunione.\nSi assicura che tutti siano ascoltati.'),
('117', 'Obbiettivi chiari', 2, '# Perché siamo qui?\n\nOgni riunione Agile deve avere uno scopo chiaro.\nIl facilitatore apre dicendo: "L''obiettivo di questa sessione è..."\nUsa il Time Mining per rispettare i tempi.'),
('117', 'Gestire il Conflitto', 3, '# Divergenza e Convergenza\n\nIl conflitto di idee è sano. Il conflitto personale no.\nIl facilitatore crea un ambiente sicuro (Psychological Safety) dove le persone possono dissentire sul problema tecnico senza attaccarsi a vicenda.'),
('117', 'Consenso', 4, '# Thumb Voting\n\nTecniche rapide per decidere:\n- **Pollice su**: D''accordo.\n- **Pollice verso**: Contrario.\n- **Piatto**: Ho dubbi ma mi adeguo (Disagree and Commit).\n\nNon cerchiamo l''unanimità perfetta, ma il consenso sufficiente per agire.');

-- 118: Definition of Done (DoD)
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('118', 'Cos''è Finito?', 1, '# Evitare "Finito ma..."\n\nIl peggior nemico di Agile è: "Ho finito, manca solo il test".\n"Ho finito, ma deve vederlo Luca".\n\nLa **Definition of Done (DoD)** è una checklist condivisa: se non è tutto spuntato, NON è finito.'),
('118', 'Contratto di Qualità', 2, '# Esempio di DoD\n\n- Codice scritto\n- Unit test passati\n- Code review fatta\n- Accettato dal PO\n- Deploy in ambiente di test\n\nLa DoD protegge la qualità del prodotto.'),
('118', 'DoD vs Criteri di Accettazione', 3, '# Distinzione importante\n\n- **DoD**: Si applica a TUTTE le User Story (Standard qualitativo generale).\n- **Criteri di Accettazione**: Si applicano alla SINGOLA storia (Specifiche funzionali).\n\nUna storia è Done quando soddisfa entrambi.'),
('118', 'Undone Work', 4, '# Il costo del debito\n\nSe dichiariamo cose "Finite" che non lo sono, accumuliamo "Undone Work".\nQuesto debito tornerà a morderci prima del rilascio.\nMeglio fare meno cose, ma farle veramente Done.');

-- 119: Cumulative Flow Diagram (CFD)
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('119', 'Leggere il grafico', 1, '# Bande colorate\n\nIl CFD mostra quanto lavoro c''è in ogni stato ogni giorno.\n- Asse X: Tempo.\n- Asse Y: Numero di ticket.\n- Bande: Backlog, ToDo, Doing, Done.\n\nLa pendenza della banda "Done" è la velocità media.'),
('119', 'Pattern Divergente', 2, '# Il collo di bottiglia\n\nSe la banda "Doing" si allarga (diventa più spessa), significa che iniziamo più cose di quante ne finiamo.\nIl WIP sta aumentando.\nIl Lead Time aumenterà.\nÈ un allarme rosso: smettete di iniziare cose!'),
('119', 'Pattern Piatto', 3, '# Il blocco totale\n\nSe la banda "Done" diventa piatta, nessuno sta consegnando nulla.\nSe le bande orizzontali sono "scalini", significa Batch transfer (rilasciamo in blocco).\nAgile cerca un flusso continuo e liscio.'),
('119', 'Little''s Law visiva', 4, '# Vedere il futuro\n\nGuardando il CFD, puoi tracciare una linea orizzontale per vedere il Lead Time medio.\nPuoi tracciare una linea verticale per vedere il WIP.\nÈ lo strumento diagnostico più potente per un Agile Coach.');

-- 120: Lean vs Agile
INSERT INTO lessons (module_id, title, order_index, content) VALUES
('120', 'Origini diverse, stessi obiettivi', 1, '# Toyota vs Silicon Valley\n\n- **Lean**: Nasce in Toyota (manifattura) negli anni ''50. Focus su riduzione sprechi (Muda) e flusso.\n- **Agile**: Nasce nel software (2001). Focus su adattabilità e feedback.\n\nOggi convergono nel "Lean-Agile Mindset".'),
('120', 'Efficienza vs Efficacia', 2, '# Fare bene vs Fare la cosa giusta\n\n- **Lean** enfatizza l''**Efficienza**: Fare le cose nel modo giusto, senza sprechi.\n- **Agile** enfatizza l''**Efficacia**: Fare la cosa giusta per il cliente in questo momento.\n\nServe un equilibrio. È inutile produrre in modo efficientissimo qualcosa che nessuno vuole.'),
('120', 'I 7 Sprechi (Muda)', 3, '# Waste nel Software\n\nLean identifica 7 sprechi. Nel software:\n1. Lavoro parzialmente fatto (WIP)\n2. Funzionalità extra (Gold plating)\n3. Relearning (non documentare/condividere)\n4. Handoffs (passaggi di mano)\n5. Task switching\n6. Ritardi\n7. Difetti'),
('120', 'Kaizen', 4, '# Miglioramento Continuo\n\nEntrambi credono nel Kaizen: "Migliorare in meglio".\nNon ci si ferma mai.\nLa perfezione è un asintoto a cui tendere, non una destinazione.\nSperimenta -> Misura -> Impara -> Ripeti.');
