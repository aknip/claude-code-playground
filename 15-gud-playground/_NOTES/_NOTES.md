

# Get Usecases Done

claude --dangerously-skip-permissions


# Autopilot
npx tsx .claude/use-case-driven/bin/autopilot/src/index.tsx --phases "3,4,5"

compiled version:
node .claude/use-case-driven/bin/autopilot/dist/index.js --phases "1,2,3,4"

.planning/autopilot.sh   



git add -A ; git commit -am "x" ; git push

============================================================

Kurzfassung: 
/uc:new-project = Was soll gebaut werden.
/uc:plan-phase = Wie wird es gebaut (inkl. Recherche).

============================================================

Idee: Split nach Phase 5

Beende das Kommando "new-project.md" nach Phase 5 und lege ein neues Kommando "use-case-analysis.md" an, das Phase 5 - 8 enthält. Nach Abschluss von ""new-project.md"" kann dann "use-case-analysis.md" separat aufgerufen werden. An den Inhalten und Fuktionen innerhalb der Phasen soll nichts verändert werden. Passe ggf. die Statusverwaltung (für STATE.md) an, um den Fortschritt bzw. Abschluss der beiden Kommands zu tracken, wenn dies notwendig sein sollte.


Erstelle ein neues Kommando "uc:feature-exploration.md". Dieses kann optional nach "uc:new-project.md" bzw. vor "uc:use-case-analysis.md" ausgeführt werden.
Idee: Auf Basis der Summary-Level Use Cases in PROJECT.md können 1 bis n verschiedene Umsetzungsszenarien parallel durchgespielt werden, die User-Goal Usecases vordefinieren, visualisieren (HTML Clickdummy / Wireframe) und Roadmaps vordefinieren. 
Die 1 bis n Umsetzungsszenarien werden völlig unabhängig voneinander behandelt, es können auch während des Prozesses neue Umsetzungsszenarien hinzugefügt oder besethende wieder gelöscht werden.
Zum Schluss wird ein finales Umsetzungsszenario definiert, das dann als Grundlage für den nächsten Schritt "uc:use-case-analysis.md" dient.
Das Kommonado "uc:feature-exploration.md" kann jederzeit unterbrochen bzw. neu gestartet werden, der Benutzer entscheidet dann
1. an welchem Umsetzungsszenario er weiterarbeiten möchte
2. ob er ein neues Umsetzungsszenario anlegen möchte
3. ob er ein bestehendes Umsetzungsszenario löschen möchte
4. ob er das finale Umsetzungsszenario definieren möchte
Zu 1:
Die Arbeit am Umsetzungsszenario ist der Kernprozess. In einem interaktiven Prozess (ähnlich "15-gud-playground/.claude/commands/projekt-steckbrief.md") werden Ideen zur Umsetzung der Summary-Level Use Cases abgefragt, vorgeschlagen, entwickelt. z. B. Ideen zur Bedienung, zu Userworkflows, zu Funktionalitäten etc. Nach jeder Frage/Antwort wird optional eine neue Version des HTML-Clickdummy/Wireframe erstellt und eine Visualiserung einer möglichen Roadmap (Mermaid-Diagramm). Der Anwender kann aber auch jederzeit eine andere der oben genannten 4 Funktionen auswählen. Nach jeder Frage/Antwort werden alle bisher gesammelten Informationen zum Umsetzungsszenario persistiert, so dass die Arbeit bei Unterbrechung (z. B. Wechsel zu einem anderen Szenario) nahtlos fortgeführt werden kann
Zu 4:
Für die Festlegung des finalen Umsetzungsszenarios stehen mehrere Optionen zur Verfügung:
- Auswahl eines der angelegten Umsetzungsszenarien
- Dialoggestützte Synthese aus mehreren Umsetzungsszenarien: Welche Ideen, Funktionen, Features sollen aus welchem Umsetzungsszenario übernommen werden?
- Automatisch - die beste Kombination aus mehreren Umsetzungsszenarien automatisch generieren
Bitte erstelle eine Spezifikation für die Umsetzung dieses Kommandos "uc:feature-exploration.md" und speichere es in "15-gud-playground/_NOTES/feature-exploration-spec.md" - stelle Fragen, falls Unklarheiten bestehen.



============================================================

uc/new project 

#
Ich möchte eine Underwriting Workbench bauen, die einem Underwriter (Industrieversicherung) bei der Bearbeitung von Neugeschäft (Angebote, Verträge) und Bestandsgeschäft (Vertragsänderungen), Risikobewertung und Abrechnung unterstützt.

  Spannend — eine Underwriting Workbench   
  für Industrieversicherung. Da steckt
  einiges drin.                            
                                         
  Lass mich ein paar Dinge verstehen, um   
  das Bild zu schärfen:                  
                                           
  Zum Kern: Du sagst Neugeschäft und       
  Bestandsgeschäft — was ist heute der
  größte Schmerzpunkt? Wo verliert ein
  Underwriter die meiste Zeit oder macht
  die meisten Fehler?

  Zum Ablauf: Nimm mich mal durch einen
  typischen Fall — sagen wir, eine Anfrage
  für eine neue Industrieversicherung kommt
   rein. Was passiert dann Schritt für
  Schritt, von der Anfrage bis zum fertigen
   Angebot?

#
Unstrukturierte Prozesse, viel Handarbeit (Daten aus Emails und anderen Quellen verarbeiten), viel Recherche da unvollständige Risikoinformationen vom Kunden oder Makler, aufwändige Dokumentierung (Angebote, Verträge in Word)

   Das klingt nach einem klassischen Muster:
   Der Underwriter ist mehr Sachbearbeiter 
  als Risikoexperte, weil er den Großteil  
  der Zeit mit Datensammlung und           
  Dokumentenerstellung verbringt statt mit 
  der eigentlichen Risikobewertung.        
      
  Lass mich da tiefer reingehen:         
                                           
  Zu den Datenquellen: Wenn eine Anfrage
  reinkommt — was kommt da typischerweise?
  Eine Email vom Makler mit Anhängen? Ein
  Formular? Und welche Quellen nutzt der
  Underwriter dann für die Recherche —
  externe Datenbanken, Brancheninfos,
  interne historische Daten?

  Zur Risikobewertung: Wie läuft die
  Risikobewertung heute ab? Gibt es ein
  strukturiertes Scoring-Modell oder ist
  das eher Erfahrungswissen im Kopf des
  Underwriters? Gibt es
  Zeichnungsrichtlinien, die geprüft werden
   müssen?

#
Bitte recherchiere selber (Arbeitsprozess, Painpoints, Lösungsansätze)   
...

#
- Nach 10 min Recherche: PROJECT.md erstellt
- Nach 10 min Recherche: Uce Cases (5 x Level 'summary' und 22 x 'user-goal' erstellt)
- Frage nach "Freigeben" oder "Anpassen"
- Nach 5 min: Roadmap erstellt 


============================================================


Kanban-Board und das Dokument als UI: Ein Kanban-Board ist die zentrale Übersicht über alle laufenden Vorgänge (neu eintreffende Angebote, fällige Renewals etc.). Jede Karte im Kanban-Board öffnet direkt das zentrale Dokument (Angebot, Vertrag, Nachtrag...), in dem direkt gearbeitet werden kann: Daten sind vorberfüllt, Änderungen im Dokument werden automatisch in die dahinterliegende Datenbank (Kundendaten, Risikodaten etc.) übertragen: Das Dokument als UI.



============================================================

# Vorgehen

Check, was mögliche nächste Schritte sind: /uc:progress

# Step 1: Brainstorming, alles in eine .md Datei

# Step 2: Grobe Implementierungsreihenfolge klären
- Kanbanboard mit stark vereinfachten  Vorgängen und Aufgaben
- Datenmodell für Objekte, Risiken, Deckungen, Angebote/Verträge
- 1 Vorgang detailliert ausarbeiten

# Step 3: Usecases definieren
- Per uc/new project 
- Plus: Beispieldaten definieren, in Usecases als Akzeptanzkriterien einbringen
- Plus: Visualisierungen (Storybaords) erstellen (Excalidraw)

(ab hier für jeden Milestone)

# Step 4: Roadmap für erste (bzw. neue Phase) erstellen
/uc:create-roadmap
- erstellt auch Usecases, falls nötig

# Step 5: Phase 1 planen
/uc:discuss -phase 1
- Event‑Sourcing‑Datenmodell mit SQLite
- Kibo UI für Kanban Komponente (nach Recherche)

/uc:plan-phase 1 
/uc:plan-phase 1,2,3,4,5
- ggf. nachträgliche Anpassungen: /uc:plan-phase 1  "Ich habe einige Anpassungen bzw. Vorgaben"

# Step 6: Ausführen
/uc:execute-phase 1


# Regelmässig (nach Abschluss von Phasen)

Überprüfe anhand der ergebnisse und des aktuellen code standes, ob die Usecases angepasst werden müssen  

Analysiere, warum diese Fehler nicht schon während der Implementierung (Execution) und dem Review aufgetaucht sind. Optimiere die entsprechenden Commands unter ".claude/commands/uc" anhand der Analyseergebnisse    

# Optional: Nachträgliches Ergänzen / Einschieben von Phasen

/uc:add-phase 
oder /uc:insert-phase 
/uc:plan-phase {neue Phase} => erzeugt auch Usecases


# Step 7: Abschluss

/uc:complete-milestone    


# Step 8: Neuer Milestone
/uc:new-milestone   
- weiter mit Step 3 ???



