# Scenario: Kanban-Board + Dokument als UI

> Core Idea: Ein Kanban-Board ist die zentrale Übersicht über alle laufenden Vorgänge (Neugeschäft, Renewals, Nachträge). Jede Karte öffnet direkt das zentrale Dokument (Angebot, Vertrag, Nachtrag), in dem der Underwriter arbeitet. Änderungen im Dokument werden automatisch in die Datenbank übertragen — das Dokument ist die UI.
> Created: 2026-02-22
> Last Updated: 2026-02-22

## Mapping to Summary-Level Use Cases

| UC | Name | Implementation Approach in this Scenario |
|----|------|------------------------------------------|
| UC-S-001 | Neugeschäft bearbeiten | Kanban-Board mit Prozessschritt-Spalten. Neue Karte = neuer Vorgang. Karte öffnet festes Angebotstemplate (Sach), das ausgefüllt wird. |
| UC-S-002 | Risiko bewerten | Eigener Abschnitt "Risikobewertung" im Dokument. UW triggert manuell per Button "Bewertung starten". System füllt Scoring, Zeichnungsrichtlinien, Vollständigkeit in den Abschnitt ein. |
| UC-S-003 | Dokumente erstellen | Das Dokument existiert von Anfang an als festes Angebotstemplate. Der UW füllt es aus, das System generiert daraus das fertige PDF. Police als separates Dokument. |
| UC-S-004 | Bestand verwalten | Alles auf einem Board: Renewals und Nachträge als eigene Karten mit Farb-Labels (Neugeschäft=weiß, Renewal=gelb, Nachtrag=blau). Gleicher Prozess, vorausgefülltes Dokument. |
| UC-S-005 | Daten anreichern | Automatisch bei Eingabe: Firma/Adresse eingeben → externe Felder füllen sich automatisch + visuelle Markierung (blauer Rand). UW kann jederzeit überschreiben. |
| UC-S-006 | Pricing & Kalkulation | Live-Prämie direkt im Dokumenttext. UW editiert SB → Prämie aktualisiert sich sofort. Benchmark-Hinweise am Rand (Marktdurchschnitt, Abweichung). |

## Interaction Concept & User Workflows

### Kanban-Board: Prozessschritt-Spalten

Das Board bildet den Lebenszyklus eines Vorgangs ab. Jede Spalte = ein Prozessschritt:

**Spalten:**
1. **Eingang** — Neue Submissions, noch nicht bearbeitet
2. **Datenerfassung** — Basisdaten und Risikodaten werden erfasst
3. **Risikobewertung** — Scoring, Vollständigkeitsprüfung
4. **Kalkulation** — Prämienberechnung, Varianten
5. **Angebot** — Dokument wird erstellt, zur Freigabe
6. **Abschluss** — Fertig, Police erstellt

Karten bewegen sich von links nach rechts durch den Prozess.

### Dokument als UI (Google-Docs-Stil)

Wenn der Underwriter eine Karte öffnet, sieht er direkt das **Angebotsdokument** — nicht ein Formular. Das Dokument enthält editierbare Inline-Felder im Fließtext. Änderungen an Feldern werden automatisch in die Datenbank übertragen.

**Prinzip:** Das Dokument IST gleichzeitig das Formular. Der Underwriter arbeitet im Dokument, nicht in einer Datenmaske.

### Dokumentvorlage: Festes Angebotstemplate

Jeder neue Vorgang startet mit demselben **Angebotstemplate für Sach-Industrieversicherung**. Leere Felder werden nach und nach vom Underwriter ausgefüllt. Die Police wird später als separates Dokument generiert.

### Standorte als Dokument-Abschnitte

Jeder Standort ist ein eigener Abschnitt im Dokument: Adresse, Gebäudetyp, Baujahr, Gebäudewert, Inventarwert, Gefahren. Der UW kann Abschnitte hinzufügen ("+ Standort hinzufügen") und entfernen.

### Risikobewertung: Eigener Abschnitt (UC-S-002)

Eigener Abschnitt "RISIKOBEWERTUNG" im Dokument, nach den Standort-Abschnitten. UW klickt "Bewertung starten" → System berechnet:
- Risiko-Score (z.B. 3.4/5 — Mittel)
- Zeichnungsrichtlinie: OK / Überschreitung
- Hinweise (Baujahr-Risiko, Naturgefahrzonen, etc.)
- Vollständigkeit (% der ausgefüllten Felder)

### Datenanreicherung: Automatisch + Markierung (UC-S-005)

Externe Daten fließen **automatisch** ins Dokument, sobald der UW Firma oder Adresse eingibt:
- Handelsregister-Daten (Branche, Mitarbeiter, Umsatz)
- Branchenrisikoprofil
- Naturgefahrzonen (bei Adresseingabe)

Automatisch befüllte Felder erhalten eine **visuelle Markierung** (blauer Rand), damit der UW sieht, was vom System kam. UW kann jederzeit überschreiben.

### Pricing: Live-Prämie im Dokument (UC-S-006)

Die Prämie steht direkt im Angebotstext und aktualisiert sich **live**, wenn der UW Parameter ändert:
- Selbstbeteiligung: editierbares Feld → Prämie reagiert sofort
- Benchmark-Hinweis am Rand: Marktdurchschnitt und Abweichung
- Keine Varianten-Auswahl, sondern direkte Parameter-Steuerung

### Bestandsverwaltung: Alles auf einem Board (UC-S-004)

Neugeschäft, Renewals und Nachträge laufen auf **demselben Board** — unterscheidbar durch Farb-Labels:
- **Neugeschäft** — weiß (Standard)
- **Renewal** — gelb
- **Nachtrag** — blau

Renewals und Nachträge starten mit **vorausgefülltem Dokument** aus Bestandsdaten. Der UW prüft, aktualisiert und durchläuft denselben Prozess wie bei Neugeschäft.

### Workflow 1: Neuen Vorgang anlegen (UC-S-001)

1. Underwriter klickt "Neuer Vorgang" auf dem Board
2. Neue Karte erscheint in Spalte "Eingang"
3. Karte öffnen → festes Angebotstemplate mit leeren Inline-Feldern
4. Underwriter füllt Basisdaten direkt im Dokument aus
5. Karte wandert automatisch in "Datenerfassung" wenn Pflichtfelder gefüllt

### Workflow 2: Risikodaten + Bewertung (UC-S-002)

1. Im Dokument: Standort-Abschnitte ausfüllen (+ Standort hinzufügen)
2. Externe Daten werden automatisch eingefüllt (blau markiert)
3. UW klickt "Bewertung starten" im Bewertungs-Abschnitt
4. System füllt Scoring, Hinweise, Vollständigkeit ein
5. Karte wandert in "Risikobewertung" → "Kalkulation"

### Workflow 3: Prämie + Angebot (UC-S-006, UC-S-003)

1. UW passt SB und Parameter im Dokument an → Prämie live
2. Benchmark-Vergleich am Rand
3. UW klickt "Angebot finalisieren" → PDF wird generiert
4. Karte wandert in "Angebot"

## Capabilities & Features

| Feature | Description | Related UC | Priority |
|---------|------------|------------|----------|
| Kanban-Board | Zentrale Übersicht aller Vorgänge in Prozessschritt-Spalten | UC-S-001 | Must |
| Dokument als UI | Editierbares Dokument im Google-Docs-Stil mit Inline-Feldern, die direkt die Datenbank aktualisieren | UC-S-001, UC-S-003 | Must |
| Festes Angebotstemplate | Jeder Vorgang startet mit demselben Sach-Angebotstemplate. Felder werden ausgefüllt. | UC-S-001, UC-S-003 | Must |
| Standort-Abschnitte | Jeder Standort als eigener Abschnitt im Dokument. Hinzufügen/Entfernen von Abschnitten. | UC-S-002 | Must |
| Risikobewertungs-Abschnitt | Eigener Abschnitt im Dokument. Manueller Trigger per Button. Scoring, Zeichnungsrichtlinien, Vollständigkeit. | UC-S-002 | Must |
| Auto-Anreicherung mit Markierung | Externe Daten füllen sich automatisch bei Eingabe. Blaue Markierung zeigt System-Daten. UW kann überschreiben. | UC-S-005 | Must |
| Live-Prämie | Prämie aktualisiert sich live im Dokumenttext bei Parameteränderung. Benchmark am Rand. | UC-S-006 | Must |
| Ein Board für alle Vorgangstypen | Neugeschäft, Renewals, Nachträge auf einem Board. Farb-Labels zur Unterscheidung. Vorausgefüllte Dokumente bei Bestandsvorgängen. | UC-S-004 | Must |

## UI Concept

### Layout
- **Header:** "Underwriting Workbench" + Nutzer-Info (Name, Rolle)
- **Sidebar:** Navigation (Board, Verträge, Berichte, Einstellungen)
- **Content:** Entweder Kanban-Board (Vollbreite) oder Dokument-Ansicht (max 800px zentriert auf grauem Hintergrund)

### Kanban-Board UI
- **Spalten:** 6 Spalten nebeneinander, horizontal scrollbar bei engem Bildschirm
- **Karten:** Weiß mit Shadow, abgerundete Ecken. Firmenname + Vorgangsnummer oben, Makler-Subtitle, Fortschrittsbalken, farbcodiertes Badge (Neugeschäft=grau, Renewal=amber, Nachtrag=blau)
- **"Neuer Vorgang" Button** prominent über dem Board

### Dokument-UI
- **Seitenlayout:** Weißes Dokument auf hellgrauem Hintergrund (wie Google Docs)
- **Editierbare Felder:** Gepunktete Unterstreichung, wird solide bei Hover/Focus
- **Auto-angereicherte Felder:** 4px blauer linker Rand + Punkt-Indikator
- **Dokument-Navigation:** Abschnitts-TOC rechts am Rand mit Vollständigkeitsanzeige pro Abschnitt
- **Buttons:** "Bewertung starten", "Angebot finalisieren", "Zur Freigabe vorlegen" an den jeweiligen Abschnitten

### Farbschema
- Neutral/Shadcn-basiert: Schwarz/Weiß/Grau als Basis
- Blau für Auto-Anreicherung und "In Bearbeitung"
- Grün für Erfolg/Abgeschlossen/Innerhalb Richtlinie
- Gelb/Orange für Warnungen/Renewal-Label
- Rot für Überschreitungen/Fehler

## Proposed User-Goal Use Cases

| ID (Draft) | Name | Related UC-S | Description |
|-------------|------|--------------|-------------|
| UG-E-001 | Vorgang anlegen | UC-S-001 | Neue Karte auf dem Board erstellen, leeres Angebotstemplate öffnen |
| UG-E-002 | Basisdaten erfassen | UC-S-001 | Inline-Felder im Dokument ausfüllen (VN, Makler, Vertragsbeginn) |
| UG-E-003 | Board-Übersicht | UC-S-001 | Alle Vorgänge auf dem Kanban-Board sehen, filtern, Status erkennen |
| UG-E-004 | Standort erfassen | UC-S-001, UC-S-002 | Standort-Abschnitt im Dokument hinzufügen und ausfüllen |
| UG-E-005 | Daten anreichern | UC-S-005 | Automatische Anreicherung bei Eingabe, blau markierte Felder prüfen |
| UG-E-006 | Risiko bewerten | UC-S-002 | Bewertung im Dokument triggern, Scoring und Hinweise einsehen |
| UG-E-007 | Prämie berechnen | UC-S-006 | Live-Prämie im Dokument, SB anpassen, Auswirkung sofort sehen |
| UG-E-008 | Benchmarks einsehen | UC-S-006 | Marktvergleich am Rand des Dokuments |
| UG-E-009 | Angebot finalisieren | UC-S-001, UC-S-003 | PDF generieren, Zusammenfassung prüfen |
| UG-E-010 | Freigabe erteilen | UC-S-001 | Vorgang zur Freigabe vorlegen (Senior Underwriter) |
| UG-E-011 | Renewal bearbeiten | UC-S-004 | Vorausgefülltes Dokument für Vertragserneuerung auf dem Board |
| UG-E-012 | Nachtrag bearbeiten | UC-S-004 | Vorausgefülltes Dokument für Vertragsänderung auf dem Board |

> Note: IDs with prefix "UG-E" (Exploration) — will be converted
> to official UC-UG-XXX IDs upon finalization.

## Proposed Roadmap Phases

| Phase | Goal | Use Cases | Rationale |
|-------|------|-----------|-----------|
| 1 | Kanban-Board + Basisdokument | UG-E-001, UG-E-002, UG-E-003 | Grundgerüst: Board mit Spalten, Karten-CRUD, editierbares Angebotstemplate mit Inline-Feldern |
| 2 | Standort-Erfassung + Datenanreicherung | UG-E-004, UG-E-005 | Risikodaten erfassen und externe Daten automatisch einfließen lassen |
| 3 | Risikobewertung + Kalkulation | UG-E-006, UG-E-007, UG-E-008 | Kernwertschöpfung: Scoring, Live-Prämie, Benchmarks |
| 4 | Angebot & Dokumente | UG-E-009, UG-E-010 | Prozess end-to-end abschließen: PDF, Freigabe |
| 5 | Bestandsverwaltung | UG-E-011, UG-E-012 | Renewals und Nachträge als Erweiterung |

## Open Questions & Notes

- [None yet]
