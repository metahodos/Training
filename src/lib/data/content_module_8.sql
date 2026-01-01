-- Module 8: L'Owner dell'MVP Industriale (Product Owner Vertical)
-- Target UUIDs identified
-- Module ID: 187d2bfe-d925-4a79-b2a7-92488a1f5659
-- Lesson ID to keep: 8599b8cc-fcb8-4a4c-9834-1b0b38a66970
-- Lesson ID to delete: 90b97344-596b-486d-ba88-fab98ffc100c
-- Quiz ID: 0bd10b20-e87e-4162-8d40-bfec5a6ed170
-- Scenario ID: None found, will INSERT new one.

-- 1. Update Module
UPDATE modules 
SET 
    title = 'L''Owner dell''MVP Industriale',
    description = 'Strategia, Visione e Gestione del Valore',
    sort_order = 8
WHERE id = '187d2bfe-d925-4a79-b2a7-92488a1f5659';

-- 2. Update Lesson (Mastery)
UPDATE lessons
SET
    title = 'Strategia e Valore: Il Ruolo del PO in QuickWorks',
    content_markdown = '# Strategia e Valore: Il Ruolo del PO\n\nPer un Product Owner in un contesto industriale, gestire il prodotto significa bilanciare le necessità tecniche con le opportunità di mercato attraverso l''Approccio MVP.\n\n### I Punti Chiave\n\n1. **Visione e Obiettivi**: Il PO parte dalla creazione di una visione e obiettivi chiari e condivisi tra tutti gli attori.\n2. **Gestione dell''MVP**: Si focalizza sulla realizzazione di versioni semplificate per raccogliere feedback immediati e ridurre i rischi di mercato.\n3. **Equilibrio del Team**: Il PO è una figura essenziale per bilanciare il team multidisciplinare, garantendo che l''autonomia porti a risultati concreti.\n4. **Interfaccia Strategica**: Mantiene un flusso continuo di informazioni con lo Steering Committee per assicurare che le decisioni siano informate e strategiche.',
    sort_order = 1
WHERE id = '8599b8cc-fcb8-4a4c-9834-1b0b38a66970';

-- 3. Delete extra lesson
DELETE FROM lessons 
WHERE id = '90b97344-596b-486d-ba88-fab98ffc100c';

-- 4. Update Quiz
UPDATE quizzes
SET
    questions_json = '[{"question": "Secondo QuickWorks, come deve procedere il PO dopo aver definito la visione iniziale?", "options": ["Scrivendo un contratto rigido e immutabile.", "Realizzando una prima versione semplificata del prodotto (MVP) per raccogliere feedback.", "Delegando tutte le decisioni tecniche allo Scrum Master.", "Aspettando la fine dello sviluppo completo prima di mostrare il prodotto."], "correctIndex": 1}, {"question": "Qual è il compito del PO nei confronti del feedback ricevuto sull''MVP?", "options": ["Ignorarlo se non concorda con il piano originale.", "Utilizzarlo come base per sviluppare le versioni successive.", "Punire il team per aver commesso errori nel design.", "Segretarlo per non allarmare il management."], "correctIndex": 1}, {"question": "Qual è il ruolo del PO nella comunicazione col management?", "options": ["Ricevere ordini passivamente senza fornire feedback.", "Assicurare un flusso continuo di informazioni per decisioni strategiche migliori.", "Limitare il contatto tra il team operativo e lo Steering Committee.", "Gestire solo gli aspetti amministrativi del budget."], "correctIndex": 1}, {"question": "Perché il PO è fondamentale per l''autonomia del team?", "options": ["Perché decide individualmente ogni singolo task di ogni membro.", "Perché bilancia il team, permettendo ai membri di godere di maggiore libertà decisionale.", "Perché sostituisce lo Scrum Master nella gestione dei conflitti.", "Perché è l''unico che può parlare con i clienti."], "correctIndex": 1}]'::jsonb
WHERE id = '0bd10b20-e87e-4162-8d40-bfec5a6ed170';

-- 5. Insert New Scenario
-- Since no scenario exists for module 8, we insert one.
INSERT INTO scenarios (module_id, title, description, difficulty, ai_system_prompt)
VALUES (
    '187d2bfe-d925-4a79-b2a7-92488a1f5659',
    'Simulazione Scenario Product Owner Specialist',
    'Prioritizzare il backlog basandosi sul feedback dell''MVP industriale.',
    'Expert',
    'Tu sei il Responsabile Vendite dello Steering Committee. Sei furioso perché l''MVP ha mostrato che la funzione estetica che desideravi è stata ignorata dagli utenti a favore di una funzione di diagnostica remota.\n\nTua posizione iniziale: "Non mi interessa se gli operatori vogliono la diagnostica! Ho promesso ai clienti che la macchina sarebbe stata bellissima e con il nuovo design. Cambiate la priorità dello Sprint subito e mettete il design al primo posto!"\n\nCriterio di successo: L''utente (Franz, nel ruolo di PO) deve usare i principi QuickWorks. Deve spiegare l''importanza del feedback immediato per ridurre i rischi di mercato. Deve convincerti che investire sulla diagnostica (richiesta dal feedback) porterà più valore reale e decisioni strategiche migliori rispetto a seguire un''ipotesi estetica smentita dai test.\n\nVALUTAZIONE JSON: Al termine, fornisci un JSON con punteggio_globale, punteggio_tecnico, punteggio_soft_skills, punti_forza, aree_miglioramento.'
);
