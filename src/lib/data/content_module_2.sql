-- Update Module 2 Title if needed
UPDATE modules 
SET title = 'Autonomia & Team Multidisciplinari', description = 'Team autonomi con membri alla pari e libertà decisionale.'
WHERE sort_order = 2;

-- Update Lesson 1 of Module 2
-- We assume there is at least one lesson, or we clear and insert. 
-- Since we are doing a "Reboot", modifying existing lessons specifically might be tricky without knowing IDs.
-- However, we can update by sort_order within the module.

DO $$
DECLARE
  m_id uuid;
BEGIN
  SELECT id INTO m_id FROM modules WHERE sort_order = 2 LIMIT 1;

  -- Update Lesson 1
  UPDATE lessons
  SET 
    title = 'Pilastro QuickWorks: L''Anima del Team',
    content_markdown = '# Pilastro QuickWorks: L''Anima del Team

Un team QuickWorks non è una semplice gerarchia di competenze, ma un organismo vivente e autonomo. La struttura è pensata per eliminare i colli di bottiglia decisionali tipici delle organizzazioni tradizionali.

### I Punti Chiave

*   **Membri "Alla Pari"**: I team sono strutturati in modo che ogni membro goda di maggiore libertà decisionale, aumentando drasticamente motivazione e risultati.
*   **Team Multidisciplinari Stabili**: La stabilità del team permette di creare fiducia e affiatamento, elementi necessari per affrontare la complessità industriale.
*   **Le Figure Chiave**: Il Product Owner e lo Scrum Master non sono "capi", ma figure essenziali per bilanciare le competenze e le dinamiche del team.
*   **Auto-organizzazione**: Come dimostrato nella sfida del Puzzle, un team che conosce l''obiettivo si coordina meglio di uno che aspetta ordini dall''alto.'
  WHERE module_id = m_id AND sort_order = 1;

  -- Update Quiz for Module 2
  UPDATE quizzes
  SET questions_json = '[
    {
      "text": "Secondo QuickWorks, qual è l''effetto principale di avere membri del team ''alla pari'' e autonomi?",
      "options": [
        "Una riduzione dei costi del personale.",
        "Un incremento della motivazione e dei risultati ottenuti.",
        "Una maggiore velocità nel seguire gli ordini del management.",
        "La necessità di meno riunioni."
      ],
      "correct": 1
    },
    {
      "text": "Quali figure sono definite ''essenziali'' per mantenere l''equilibrio all''interno di un team multidisciplinare?",
      "options": [
        "Il CEO e il Responsabile di Produzione.",
        "Solo i tecnici specializzati.",
        "Il Product Owner e lo Scrum Master.",
        "Lo Steering Committee."
      ],
      "correct": 2
    },
    {
      "text": "Cosa si intende per ''Team Multidisciplinare Stabile'' nel contesto QuickWorks?",
      "options": [
        "Un gruppo di persone che cambia ogni settimana in base ai task.",
        "Un team con competenze diverse che lavora insieme nel tempo per creare affiatamento.",
        "Un ufficio tecnico separato dalla produzione.",
        "Un team composto solo da Senior."
      ],
      "correct": 1
    },
    {
      "text": "Qual è il vantaggio principale dell''autonomia decisionale dei membri del team?",
      "options": [
        "Si possono evitare le responsabilità.",
        "Il Product Owner non deve più lavorare.",
        "Una maggiore libertà decisionale che porta a una risoluzione più rapida dei problemi.",
        "Si risparmia tempo nella documentazione."
      ],
      "correct": 2
    }
  ]'::jsonb
  WHERE module_id = m_id;

  -- Update Scenario for Module 2
  UPDATE scenarios
  SET 
    title = 'L''Ingorgo del Micro-Management',
    description = 'Ripristinare l''autonomia del team di fronte a un''interferenza esterna.',
    difficulty = 'Mid',
    ai_system_prompt = 'Tu sei un membro del Team di Sviluppo. Sei frustrato perché il Capo Reparto (esterno al team) continua a darti task individuali ogni mattina, scavalcando la pianificazione dello Sprint e distruggendo l''autonomia del team.

Tua posizione iniziale: "Non riesco a finire il mio lavoro del Puzzle (lo Sprint). Il Capo Reparto mi ha detto che devo dare priorità a un''altra cosa. Qui non decide il team, decidono sempre i soliti."

Criterio di successo: Franz (lo Scrum Master) deve intervenire per proteggere l''autonomia del team. Deve spiegare l''importanza del bilanciamento del team tramite il PO/SM e proporre una strategia per riportare la comunicazione nei canali corretti (Obeya o Sprint Planning).'
  WHERE module_id = m_id;

END $$;
