-- Add missing column for AI System Prompt
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS ai_system_prompt text;

-- Update Module 1 Title if needed (Optional, but good to align)
UPDATE modules 
SET title = 'Mindset & Cultura Fail Safe', description = 'Comprendere la differenza tra Fare Agile ed Essere Agile.'
WHERE sort_order = 1;

-- Update Lesson 1
UPDATE lessons
SET 
    title = 'Il Cuore di QuickWorks: Essere Agile vs Fare Agile',
    content_markdown = '# Il Cuore di QuickWorks: Essere Agile vs Fare Agile

In un contesto industriale, la velocità non è nulla senza la direzione. Molte aziende commettono l''errore di "fare" Agile (usare Jira, fare i Daily) senza "essere" Agile (cambiare mentalità).

### I Punti Chiave

*   **Oltre il Waterfall**: Nei progetti industriali complessi, pianificare tutto all''inizio (V-Model) aumenta il rischio di scoprire errori troppo tardi.
*   **Cultura Fail Safe**: QuickWorks non vede il fallimento come un errore, ma come un''opportunità di apprendimento rapido per migliorare.
*   **Apprendimento Empirico**: Invece di discutere per settimane su un design, costruiamo un prototipo. Se cade, abbiamo imparato qualcosa che la teoria non poteva insegnarci.'
WHERE module_id = (SELECT id FROM modules WHERE sort_order = 1 LIMIT 1) AND sort_order = 1;

-- Update Quiz 1
UPDATE quizzes
SET questions_json = '[
  {
    "text": "Qual è il pilastro di QuickWorks che trasforma un errore tecnico in un vantaggio competitivo?",
    "options": [
      "Sviluppo Iterativo",
      "Cultura dell''Innovazione ''Fail Safe''",
      "Obeya Room",
      "Approccio MVP"
    ],
    "correct": 1
  },
  {
    "text": "Durante la sfida della ''Torre di Marshmallow'', perché molti team falliscono all''ultimo secondo?",
    "options": [
      "Perché il marshmallow è troppo pesante.",
      "Perché non hanno abbastanza tempo.",
      "Perché spendono troppo tempo a pianificare e poco tempo a testare la stabilità del prototipo.",
      "Perché mancano le risorse."
    ],
    "correct": 2
  },
  {
    "text": "Cosa significa ''Essere Agile'' in una fabbrica o in un centro R&D?",
    "options": [
      "Seguire alla lettera lo schema Scrum.",
      "Adottare un mindset empirico basato su trasparenza, ispezione e adattamento.",
      "Eliminare tutti i manager.",
      "Lavorare più velocemente senza pause."
    ],
    "correct": 1
  },
  {
    "text": "Secondo il metodo QuickWorks, come si riducono i rischi di mercato in contesti industriali?",
    "options": [
      "Realizzando una prima versione semplificata (MVP) per raccogliere feedback immediati.",
      "Aumentando il numero di riunioni di controllo.",
      "Seguendo rigidamente il piano iniziale.",
      "Esternalizzando i test di qualità."
    ],
    "correct": 0
  }
]'::jsonb
WHERE module_id = (SELECT id FROM modules WHERE sort_order = 1 LIMIT 1);

-- Update Scenario 1
UPDATE scenarios
SET 
    title = 'La Torre di vetro',
    description = 'Portare il team dalla "Pianificazione Paralizzante" all'' "Azione Empirica".',
    difficulty = 'Easy',
    ai_system_prompt = 'Tu sei il Team di Sviluppo. Sei bloccato in una discussione tecnica infinita su come progettare il supporto di una nuova macchina. Hai paura di sbagliare perché i materiali costano cari. Franz (l''utente) interviene come Agile Coach/SM.

Tua posizione iniziale: "Non possiamo iniziare a costruire finché non siamo certi al 100% che il calcolo strutturale sia perfetto. Un errore qui ci costerebbe settimane di ritardo."

Criterio di successo: Franz deve convincerti ad applicare la cultura Fail Safe di QuickWorks, suggerendo di creare un prototipo rapido ed economico (MVP) per testare l''ipotesi invece di calcolare tutto a tavolino.'
WHERE module_id = (SELECT id FROM modules WHERE sort_order = 1 LIMIT 1);
