-- Update Module 4 Title
UPDATE modules 
SET title = 'Sviluppo Iterativo & Scrum Framework', description = 'Cicli brevi (Sprint) per flessibilità e velocità.'
WHERE sort_order = 4;

DO $$
DECLARE
  m_id uuid;
BEGIN
  SELECT id INTO m_id FROM modules WHERE sort_order = 4 LIMIT 1;

  -- Update Lesson 1
  UPDATE lessons
  SET 
    title = 'Pilastro QuickWorks: Il Ritmo del Valore',
    content_markdown = '# Pilastro QuickWorks: Il Ritmo del Valore

Il metodo QuickWorks non prevede lunghi periodi di sviluppo al chiuso, ma utilizza lo sviluppo iterativo e incrementale per garantire flessibilità e velocità di esecuzione.

### I Punti Chiave

*   **Lo Sprint**: Il lavoro viene diviso in cicli brevi chiamati Sprint, che permettono di vedere immediatamente i risultati delle attività.
*   **Adattamento Rapido**: Questo approccio favorisce un rapido adattamento ai cambiamenti, aumentando la velocità complessiva del progetto.
*   **I Ruoli Operativi**: In questa fase, il Product Owner (che gestisce le priorità) e lo Scrum Master (che facilita il processo) lavorano a stretto contatto per bilanciare il carico del team.
*   **I Riti di Scrum**:
    *   **Planning**: Decidiamo cosa fare nell''iterazione corrente.
    *   **Daily**: Allineamento quotidiano rapido.
    *   **Review**: Mostriamo l''incremento di prodotto per raccogliere feedback.
    *   **Retrospective**: Analizziamo come abbiamo lavorato per migliorare nel ciclo successivo.'
  WHERE module_id = m_id AND sort_order = 1;

  -- Update Quiz for Module 4
  UPDATE quizzes
  SET questions_json = '[
    {
      "text": "Secondo il metodo QuickWorks, cosa sono gli ''Sprint''?",
      "options": [
        "Corse di velocità tra i membri del team.",
        "Cicli brevi di lavoro che permettono di vedere subito i risultati.",
        "Riunioni fiume con il management.",
        "Periodi di pausa tra un progetto e l''altro."
      ],
      "correct": 1
    },
    {
      "text": "Qual è il vantaggio principale dell''approccio iterativo e incrementale?",
      "options": [
        "Ridurre il numero di persone necessarie nel team.",
        "Favorire un rapido adattamento, aumentando flessibilità e velocità di esecuzione.",
        "Garantire che il piano iniziale non venga mai cambiato.",
        "Eliminare la necessità di documentazione tecnica."
      ],
      "correct": 1
    },
    {
      "text": "Quali figure sono considerate essenziali per bilanciare il team multidisciplinare durante lo sviluppo?",
      "options": [
        "Il Direttore Generale e lo Steering Committee.",
        "Il Product Owner e lo Scrum Master.",
        "Solo i tecnici esperti di settore.",
        "Consulenti esterni specializzati."
      ],
      "correct": 1
    },
    {
      "text": "Cosa permette di fare l''utilizzo di cicli brevi nel processo QuickWorks?",
      "options": [
        "Aumentare il carico di lavoro individuale.",
        "Rimandare le decisioni difficili alla fine del progetto.",
        "Vedere subito i risultati del lavoro svolto.",
        "Evitare di consultare gli stakeholder."
      ],
      "correct": 2
    }
  ]'::jsonb
  WHERE module_id = m_id;

  -- Update Scenario for Module 4
  UPDATE scenarios
  SET 
    title = 'Lo Sprint sotto Pressione',
    description = 'Gestire un imprevisto tecnico a metà Sprint senza perdere il focus sull''incremento di valore.',
    difficulty = 'Mid',
    ai_system_prompt = 'Tu sei il Team di Sviluppo. Siete a metà di uno Sprint di 2 settimane per prototipare una nuova scheda elettronica. Improvvisamente, scoprite che un componente scelto non è disponibile a magazzino e arriverà tra un mese.

Tua posizione iniziale: "Lo Sprint è fallito. Non possiamo andare avanti senza quel componente. Fermiamoci e aspettiamo che arrivi, oppure cancelliamo tutto lo Sprint e ricominciamo da capo."

Criterio di successo: Franz (nel ruolo di SM o PO) deve guidare il team verso un adattamento rapido. Deve proporre di rivedere il piano dello Sprint (Planning/Daily) per focalizzarsi su altri incrementi di valore che non dipendono da quel pezzo, o trovare una soluzione ''Quick'' (prototipazione con componenti alternativi) per non perdere il ritmo iterativo.'
  WHERE module_id = m_id;

END $$;
