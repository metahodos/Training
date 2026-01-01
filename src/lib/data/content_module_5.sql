-- Add skills column to profiles if not exists
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS skills jsonb DEFAULT '{}'::jsonb;

-- Update Module 5 Title
UPDATE modules 
SET title = 'Obeya Room & Trasparenza', description = 'Spazio dedicato per trasparenza, monitoraggio e risoluzione rapida.'
WHERE sort_order = 5;

DO $$
DECLARE
  m_id uuid;
BEGIN
  SELECT id INTO m_id FROM modules WHERE sort_order = 5 LIMIT 1;

  -- Update Lesson 1
  UPDATE lessons
  SET 
    title = 'Pilastro QuickWorks: La "Grande Stanza" del Progetto',
    content_markdown = '# Pilastro QuickWorks: La "Grande Stanza" del Progetto

In QuickWorks, la trasparenza non è un concetto astratto, ma un luogo fisico o virtuale: l''Obeya Room. Questo spazio è il centro di controllo dove il team si riunisce per condividere informazioni e monitorare il progetto in tempo reale.

### I Punti Chiave

*   **Spazio Dedicato**: L''Obeya (dal giapponese "grande stanza") è destinata alla comunicazione, alla condivisione e al monitoraggio costante.
*   **Trasparenza Totale**: Ogni impedimento, progresso o rischio deve essere visibile a tutti. Non ci sono informazioni nascoste nei file personali.
*   **Risoluzione Rapida**: Grazie alla visualizzazione immediata dei dati, il team può identificare i problemi e risolverli velocemente prima che diventino critici.
*   **Collaborazione**: Questo ambiente favorisce una cultura di cooperazione attiva tra i membri del team e gli stakeholder.
*   **Visualizzazione Kanban**: All''interno dell''Obeya, utilizziamo strumenti come il Kanban per visualizzare il flusso di lavoro (Work in Progress) e individuare immediatamente i colli di bottiglia.'
  WHERE module_id = m_id AND sort_order = 1;

  -- Update Quiz for Module 5
  UPDATE quizzes
  SET questions_json = '[
    {
      "text": "Secondo il metodo QuickWorks, cos''è l''Obeya Room?",
      "options": [
        "Una sala riunioni riservata esclusivamente al top management.",
        "Un archivio digitale per conservare i vecchi progetti.",
        "Uno spazio fisico o virtuale dedicato alla comunicazione, condivisione e monitoraggio del progetto.",
        "Un ufficio dove si lavora in isolamento per aumentare la concentrazione."
      ],
      "correct": 2
    },
    {
      "text": "Qual è uno dei benefici principali favoriti dall''ambiente dell''Obeya?",
      "options": [
        "La riduzione del numero di collaboratori necessari.",
        "La trasparenza, la collaborazione e la rapida risoluzione dei problemi.",
        "La possibilità di nascondere gli errori al management.",
        "L''automazione totale di ogni processo decisionale."
      ],
      "correct": 1
    },
    {
      "text": "Nella simulazione Kanban, cosa ci aiuta a identificare la visualizzazione del flusso?",
      "options": [
        "Il dipendente più lento del team.",
        "Il costo esatto di ogni singola vite.",
        "I colli di bottiglia e gli sprechi nel processo produttivo.",
        "La data esatta di fine progetto con un anno di anticipo."
      ],
      "correct": 2
    },
    {
      "text": "Perché il monitoraggio nell''Obeya Room deve essere costante?",
      "options": [
        "Per permettere al team di prendere decisioni informate e tempestive.",
        "Per controllare che nessuno faccia pause troppo lunghe.",
        "Per riempire le pareti con grafici colorati.",
        "Perché è un requisito legale della sicurezza sul lavoro."
      ],
      "correct": 0
    }
  ]'::jsonb
  WHERE module_id = m_id;

  -- Update Scenario for Module 5
  UPDATE scenarios
  SET 
    title = 'Il Silos Informativo',
    description = 'Distruggere i silos informativi e creare una dashboard visiva condivisa.',
    difficulty = 'Senior',
    ai_system_prompt = 'Tu sei un Ingegnere Meccanico esperto. Stai lavorando a una modifica critica di un componente, ma tieni tutti i tuoi disegni e i tuoi stati di avanzamento sul tuo PC locale. Il resto del team (Software e Produzione) non sa a che punto sei e non può pianificare le attività successive.

Tua posizione iniziale: "Perché dovrei condividere bozze incomplete? Le mostrerò quando sarò sicuro che siano perfette. Non voglio che gli altri perdano tempo con versioni provvisorie. La mia porta è sempre aperta se qualcuno ha bisogno di sapere qualcosa."

Criterio di successo: Franz (nel ruolo di Scrum Master o facilitatore) deve convincerti ad applicare il pilastro dell''Obeya Room. Deve spiegarti che la trasparenza e la condivisione precoce dei dati (anche provvisori) permettono al team di collaborare meglio e risolvere i problemi prima che sia troppo tardi.'
  WHERE module_id = m_id;

END $$;
