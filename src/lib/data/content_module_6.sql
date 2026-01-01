-- Module 6: Comunicazione col Management
-- Target UUIDs identified from DB
-- Module ID: 6882f3d7-2729-4b1c-b0ea-d8995374ee2d
-- Lesson ID (to keep): 996c9f84-c39e-4b16-b030-5ed5e6943e87
-- Lessons to delete: 7f568135-3d0b-4729-825c-aab20ab30c0f, da4e67fc-69dd-4b1e-9c8c-3b3cb094076a
-- Quiz ID: 800c07c1-1a83-4427-abbf-1e53be60e45e
-- Scenario ID: df544e21-33d6-4b76-9d54-b12f48626ff0

-- 1. Update Module (No difficulty column)
UPDATE modules 
SET 
    title = 'Comunicazione col Management',
    description = 'Allineamento Strategico e Steering Committee',
    sort_order = 6
WHERE id = '6882f3d7-2729-4b1c-b0ea-d8995374ee2d';

-- 2. Update Lesson (Mastery) (content_markdown)
UPDATE lessons
SET
    title = 'Allineamento Strategico: Il Pilastro della Trasparenza Verticale',
    content_markdown = '# Pilastro QuickWorks: Allineamento Strategico\n\nIl metodo QuickWorks non isola il team, ma assicura un flusso continuo di informazioni tra il team operativo e il management (Steering Committee). Questo permette di prendere decisioni strategiche migliori e più informate.\n\n### I Punti Chiave\n\n1. **Flusso Continuo**: La comunicazione non avviene solo a fine progetto, ma è un dialogo costante.\n2. **Steering Committee**: Il management partecipa attivamente al monitoraggio e riceve aggiornamenti regolari per supportare il team.\n3. **Decisioni Informate**: Grazie ai feedback e ai dati provenienti dagli Sprint, il management può aggiustare la rotta strategica in tempo reale.\n4. **Ruolo del PO**: Il Product Owner è la figura chiave che bilancia le esigenze del team con le aspettative del management.',
    sort_order = 1
WHERE id = '996c9f84-c39e-4b16-b030-5ed5e6943e87';

-- 3. Delete extra lessons for this module
DELETE FROM lessons 
WHERE id IN ('7f568135-3d0b-4729-825c-aab20ab30c0f', 'da4e67fc-69dd-4b1e-9c8c-3b3cb094076a');

-- 4. Update Quiz (No title column)
UPDATE quizzes
SET
    questions_json = '[{"question": "Cosa assicura il metodo QuickWorks tra il team operativo e il management?", "options": ["Una separazione netta dei ruoli per evitare interferenze.", "Un flusso continuo di informazioni per prendere decisioni strategiche migliori.", "Una relazione basata esclusivamente su report mensili cartacei.", "La totale indipendenza del team dalle strategie aziendali."], "correctIndex": 1}, {"question": "Come viene chiamato l''organo di management con cui il team QuickWorks comunica costantemente?", "options": ["Board of Directors", "Steering Committee", "Quality Assurance Team", "Project Management Office"], "correctIndex": 1}, {"question": "Qual è il vantaggio principale di una comunicazione costante col management?", "options": ["Ridurre il numero di ore lavorative del team.", "Controllare ogni singola attività tecnica dei membri del team.", "Permettere di prendere decisioni strategiche più informate.", "Evitare che il team debba fare retrospettive."], "correctIndex": 2}, {"question": "Chi è essenziale per bilanciare il team e gestire il rapporto con gli obiettivi strategici?", "options": ["Figure come il Product Owner e lo Scrum Master.", "Solo i consulenti esterni.", "Il membro più anziano del team tecnico.", "Esclusivamente il management dello Steering Committee."], "correctIndex": 0}]'::jsonb
WHERE id = '800c07c1-1a83-4427-abbf-1e53be60e45e';

-- 5. Update Scenario
UPDATE scenarios
SET
    title = 'Simulazione Scenario Roleplay Management',
    description = 'Gestire una riunione strategica con lo Steering Committee per validare un cambio di direzione (Pivot).',
    difficulty = 'Hard',
    ai_system_prompt = 'Tu sei un membro dello Steering Committee. Sei preoccupato perché l''ultimo feedback dall''MVP ha mostrato che la funzione su cui avevate investito di più non interessa al mercato.\n\nTua posizione iniziale: "Abbiamo speso budget e mesi su questa visione. Non mi interessa cosa dice il feedback dell''MVP, dobbiamo finire quello che abbiamo iniziato come da piano originale!"\n\nCriterio di successo: L''utente (Franz, nel ruolo di PO) deve usare i pilastri QuickWorks per convincerti. Deve spiegare che la comunicazione costante serve proprio a prendere decisioni migliori e che insistere su una funzione inutile è uno spreco. Deve proporre di usare i feedback per aggiustare la strategia ora, riducendo i rischi futuri.\n\nVALUTAZIONE JSON: Al termine, fornisci un JSON con punteggio_globale, punteggio_tecnico, punteggio_soft_skills, punti_forza, aree_miglioramento.'
WHERE id = 'df544e21-33d6-4b76-9d54-b12f48626ff0';
