-- Module 7: Il Facilitatore Fail Safe (Scrum Master Vertical)
-- Target UUIDs identified
-- Module ID: 399b9b1b-a39f-4066-acab-fa4b2c69a25a
-- Lesson ID to keep: 73b43322-c7fb-420b-be35-6f42c8f6a0bc
-- Lesson ID to delete: 0b97b7ce-5edd-4af0-99b6-e20c40119a11
-- Quiz ID: 728c2397-84ec-4b94-93a4-69f2ae122cf8
-- Scenario ID: (Update by matching module_id)

-- 1. Update Module
UPDATE modules 
SET 
    title = 'Il Facilitatore Fail Safe',
    description = 'L''Arte della Facilitazione negli ambienti industriali',
    sort_order = 7
WHERE id = '399b9b1b-a39f-4066-acab-fa4b2c69a25a';

-- 2. Update Lesson (Mastery)
UPDATE lessons
SET
    title = 'L''Arte della Facilitazione in QuickWorks',
    content_markdown = '# Facilitazione Fail Safe\n\nPer lo Scrum Master in un contesto industriale, il successo non si misura solo sulla velocità, ma sulla stabilità e l''autonomia del team multidisciplinare.\n\n### I Punti Chiave\n\n1. **Bilanciamento del Team**: Lo Scrum Master è una figura essenziale per bilanciare le dinamiche interne, garantendo che i membri del team operino "alla pari".\n2. **Protezione dell''Autonomia**: Promuovere la libertà decisionale del team incrementa direttamente la motivazione e la qualità dei risultati.\n3. **Custode del Fail Safe**: Il metodo QuickWorks richiede che lo SM faciliti le Retrospettive per analizzare i fallimenti non come errori, ma come opportunità di apprendimento.\n4. **Rimozione degli Impedimenti**: Lo SM agisce come un catalizzatore nell''Obeya Room, visualizzando i blocchi e guidando il team verso la loro risoluzione rapida.',
    sort_order = 1
WHERE id = '73b43322-c7fb-420b-be35-6f42c8f6a0bc';

-- 3. Delete extra lessons
DELETE FROM lessons 
WHERE id = '0b97b7ce-5edd-4af0-99b6-e20c40119a11';

-- 4. Update Quiz
-- Note: Using simple backslash for JSON escaping inside standard SQL string literals.
UPDATE quizzes
SET
    questions_json = '[{"question": "In QuickWorks, qual è l''obiettivo principale delle retrospettive guidate dallo Scrum Master?", "options": ["Individuare i colpevoli di un ritardo nello Sprint.", "Incoraggiare il cambiamento e trasformare i fallimenti in opportunità di apprendimento.", "Aggiornare esclusivamente la documentazione tecnica per lo Steering Committee.", "Ridurre l''autonomia decisionale dei singoli membri."], "correctIndex": 1}, {"question": "Quale caratteristica definisce un team multidisciplinare stabile secondo il Pilastro 4?", "options": ["La dipendenza totale dalle decisioni del management.", "La rotazione continua dei membri per evitare la noia.", "Membri strutturati \"alla pari\" con maggiore libertà decisionale.", "L''assenza di figure come lo Scrum Master o il Product Owner."], "correctIndex": 2}, {"question": "Come deve reagire lo Scrum Master di fronte a un \"fallimento rapido\" del team?", "options": ["Richiedendo una sanzione disciplinare per il team.", "Cancellando immediatamente il progetto per ridurre le perdite.", "Facilitando l''ispezione per estrarre insegnamenti utili a migliorare i cicli successivi.", "Nascondendo l''informazione alla Obeya Room per non allarmare nessuno."], "correctIndex": 2}, {"question": "Perché la figura dello Scrum Master è definita \"essenziale\" insieme al Product Owner?", "options": ["Per firmare le presenze dei membri del team.", "Per sostituire il management nel comando diretto.", "Per bilanciare il team e assicurarne il corretto funzionamento operativo.", "Per gestire gli ordini d''acquisto dei materiali industriali."], "correctIndex": 2}]'::jsonb
WHERE id = '728c2397-84ec-4b94-93a4-69f2ae122cf8';

-- 5. Update Scenario 
UPDATE scenarios
SET
    title = 'Simulazione Scenario Scrum Master Specialist',
    description = 'Facilitare una retrospettiva dopo un fallimento tecnico critico.',
    difficulty = 'Expert',
    ai_system_prompt = 'Tu sei il Team di Sviluppo Multidisciplinare. Siete molto scoraggiati: il prototipo MVP testato ieri è andato in corto circuito durante la prima prova. Due settimane di lavoro sembrano buttate.\n\nTua posizione iniziale: "È un disastro. Lo Steering Committee ci taglierà i fondi. Abbiamo sbagliato tutto e ora non sappiamo come giustificare questo errore. Non vogliamo fare nessuna retrospettiva, vogliamo solo dimenticare questa giornata."\n\nCriterio di successo: L''utente (Franz, nel ruolo di SM) deve usare i principi QuickWorks. Deve convincervi che questo è un momento di valore (Fail Safe). Deve guidarvi a identificare cosa avete imparato dal corto circuito e come questo feedback riduca i rischi per la versione successiva del prodotto.\n\nVALUTAZIONE JSON: Al termine, fornisci un JSON con punteggio_globale, punteggio_tecnico, punteggio_soft_skills, punti_forza, aree_miglioramento.'
WHERE module_id = '399b9b1b-a39f-4066-acab-fa4b2c69a25a';
