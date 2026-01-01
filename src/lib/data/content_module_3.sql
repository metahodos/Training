-- Update Module 3 Title if needed
UPDATE modules 
SET title = 'Vision & MVP', description = 'Creazione di una visione chiara e di una prima versione semplificata.'
WHERE sort_order = 3;

DO $$
DECLARE
  m_id uuid;
BEGIN
  SELECT id INTO m_id FROM modules WHERE sort_order = 3 LIMIT 1;

  -- Update Lesson 1
  UPDATE lessons
  SET 
    title = 'Pilastro QuickWorks: Ridurre il Rischio con l''MVP',
    content_markdown = '# Pilastro QuickWorks: Ridurre il Rischio con l''MVP

Nell''industria tradizionale, spesso si attende il completamento totale di un macchinario o di un software prima di mostrarlo al cliente. QuickWorks ribalta questa logica tramite l''Approccio MVP.

### I Punti Chiave

*   **Visione Condivisa**: Ogni progetto parte dalla creazione di una visione e di obiettivi chiari e condivisi tra team e stakeholder.
*   **Versione Semplificata**: Si realizza una prima versione "minima" del prodotto per raccogliere feedback immediati.
*   **Riduzione del Rischio**: L''obiettivo dell''MVP non è vendere un prodotto incompleto, ma ridurre i rischi di mercato testando le ipotesi tecniche e commerciali il prima possibile.
*   **Sviluppo Incrementale**: Le versioni successive non sono "correzioni", ma evoluzioni basate sui feedback reali ricevuti.
*   **Sprint Industriali**: Utilizziamo cicli brevi di lavoro (Sprint) per vedere subito i risultati e aumentare la flessibilità.'
  WHERE module_id = m_id AND sort_order = 1;

  -- Update Quiz for Module 3
  UPDATE quizzes
  SET questions_json = '[
    {
      "text": "Secondo il metodo QuickWorks, da cosa deve partire ogni iniziativa di sviluppo?",
      "options": [
        "Dalla stesura di un manuale tecnico di 200 pagine.",
        "Dalla creazione di una visione e obiettivi chiari e condivisi.",
        "Dall''acquisto di tutti i materiali necessari per l''intera produzione.",
        "Dalla nomina di un capo progetto autoritario."
      ],
      "correct": 1
    },
    {
      "text": "Qual è lo scopo principale della realizzazione di un MVP nell''industria?",
      "options": [
        "Risparmiare sui costi di produzione finale.",
        "Consegnare un prodotto di bassa qualità.",
        "Raccogliere feedback immediati e ridurre i rischi di mercato.",
        "Sostituire i test di laboratorio."
      ],
      "correct": 2
    },
    {
      "text": "Come vengono definite le caratteristiche delle versioni successive di un prodotto in QuickWorks?",
      "options": [
        "Vengono decise solo dal Product Owner all''inizio dell''anno.",
        "Vengono sviluppate basandosi sui feedback raccolti dalle versioni precedenti.",
        "Sono imposte dallo Steering Committee senza consultare il team.",
        "Rimangono identiche a quelle del piano originale."
      ],
      "correct": 1
    },
    {
      "text": "Qual è il vantaggio principale dell''utilizzo di Sprint brevi nello sviluppo incrementale?",
      "options": [
        "Permettono ai dipendenti di fare più vacanze.",
        "Riducono la necessità di comunicare con il management.",
        "Favoriscono un rapido adattamento, aumentando la flessibilità e la velocità di esecuzione.",
        "Eliminano la necessità di avere uno Scrum Master."
      ],
      "correct": 2
    }
  ]'::jsonb
  WHERE module_id = m_id;

  -- Update Scenario for Module 3
  UPDATE scenarios
  SET 
    title = 'Il Decollo dell''MVP',
    description = 'Definire un MVP per un nuovo sistema di monitoraggio industriale.',
    difficulty = 'Junior',
    ai_system_prompt = 'Tu sei uno Stakeholder molto esigente del reparto Produzione. Vuoi un nuovo software di monitoraggio che faccia tutto: analisi predittiva, reportistica automatica, integrazione con 50 macchine diverse e app mobile per tutti gli operai.

Tua posizione iniziale: "Non mi serve a niente una versione base. Se il software non ha tutte queste 10 funzioni dall''inizio, non lo installeremo nemmeno. È una perdita di tempo."

Criterio di successo: Franz (nel ruolo di PO) deve convincerti a partire con un MVP (es. monitoraggio di una sola linea critica con allarmi base). Deve spiegare che questo permetterà di raccogliere feedback immediati e ridurre i rischi tecnici, garantendo che le versioni successive siano costruite su ciò che serve realmente agli operatori.'
  WHERE module_id = m_id;

END $$;
