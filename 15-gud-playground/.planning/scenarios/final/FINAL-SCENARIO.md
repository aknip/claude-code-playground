# Final Scenario: Kanban-Board + Dokument als UI (mit Guided Navigation)

> Core Idea: Ein Kanban-Board ist die zentrale Übersicht über alle laufenden Vorgänge. Jede Karte öffnet direkt das editierbare Angebotsdokument — das Dokument IST die Arbeitsumgebung. Ein Abschnitts-Navigator mit Vollständigkeitsanzeige führt den Underwriter, ohne ihn einzuschränken.
> Source: Automatische Synthese aus Szenario 1 (Wizard-basiert) + Szenario 2 (Kanban-Board + Dokument als UI)
> Created: 2026-02-22

## Synthesis Notes

| Element | Source | Rationale |
|---------|--------|-----------|
| Kanban-Board | Szenario 2 | Flexibler Überblick, natürliche Vorgangssteuerung |
| Dokument als UI | Szenario 2 | UW arbeitet im Zieldokument, nicht in Formularen |
| Abschnitts-Navigator mit Vollständigkeit | Szenario 1 (Wizard-Fortschritt) | Führung ohne Einschränkung — UW sieht was fehlt |
| Auto-Anreicherung mit Markierung | Szenario 2 | Nahtloser als separater Wizard-Schritt |
| Live-Prämie | Szenario 2 | Interaktiver als fixe Varianten |
| Risikobewertungs-Abschnitt | Szenario 2 | Manueller Trigger gibt UW Kontrolle |
| Ein Board für alle Vorgangstypen | Szenario 2 | Eleganter als separate Bereiche |
| 5-Phasen-Roadmap | Szenario 2 | Granularer, bessere Priorisierung |

## Mapping to Summary-Level Use Cases

| UC | Name | Implementation Approach |
|----|------|------------------------|
| UC-S-001 | Neugeschäft bearbeiten | Kanban-Board mit 6 Prozessschritt-Spalten. Neue Karte = neuer Vorgang. Karte öffnet festes Angebotstemplate (Sach) im Google-Docs-Stil. Abschnitts-Navigator mit Vollständigkeitsanzeige führt durch die Bearbeitung. |
| UC-S-002 | Risiko bewerten | Standort-Abschnitte im Dokument (je Standort: Adresse, Gebäude, Werte, Gefahren). Eigener Bewertungs-Abschnitt mit manuellem Trigger: Scoring, Zeichnungsrichtlinien, Vollständigkeit. |
| UC-S-003 | Dokumente erstellen | Das Dokument existiert von Anfang an als Angebotstemplate. UW füllt es aus. Am Ende: PDF-Export. Police als separates Dokument. |
| UC-S-004 | Bestand verwalten | Alles auf einem Board: Neugeschäft (weiß), Renewals (gelb), Nachträge (blau). Farb-Labels auf Karten. Bestandsvorgänge starten mit vorausgefülltem Dokument. |
| UC-S-005 | Daten anreichern | Automatisch bei Eingabe: Firma/Adresse → externe Felder füllen sich automatisch + blaue Markierung. UW kann jederzeit überschreiben. |
| UC-S-006 | Pricing & Kalkulation | Live-Prämie direkt im Dokumenttext. UW editiert SB → Prämie aktualisiert sich sofort. Benchmark-Hinweis am Rand. |

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

Karten bewegen sich von links nach rechts. Alle Vorgangstypen (Neugeschäft, Renewal, Nachtrag) auf einem Board, unterscheidbar durch farbcodierte Labels.

### Dokument als UI (Google-Docs-Stil)

Wenn der Underwriter eine Karte öffnet, sieht er direkt das **Angebotsdokument** — nicht ein Formular. Das Dokument enthält editierbare Inline-Felder im Fließtext. Änderungen an Feldern werden automatisch in die Datenbank übertragen.

**Prinzip:** Das Dokument IST gleichzeitig das Formular. Der Underwriter arbeitet im Dokument, nicht in einer Datenmaske.

### Geführte Navigation (aus Wizard-Szenario übernommen)

Am rechten Rand des Dokuments: **Abschnitts-Navigator** mit Vollständigkeitsanzeige pro Sektion:
- Vertragsdaten: ██████████ 100%
- Standorte: ████░░░░░░ 40%
- Risikobewertung: ░░░░░░░░░░ 0%
- Kalkulation: ░░░░░░░░░░ 0%

Der UW sieht jederzeit, welche Abschnitte vollständig sind und wo Daten fehlen — **ohne in einer festen Reihenfolge arbeiten zu müssen**. Das ist die Synthese: Guidance aus dem Wizard, Freiheit aus dem Kanban-Dokument.

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

Renewals und Nachträge starten mit **vorausgefülltem Dokument** aus Bestandsdaten.

### Workflow 1: Neuen Vorgang anlegen (UC-S-001)

1. Underwriter klickt "Neuer Vorgang" auf dem Board
2. Neue Karte erscheint in Spalte "Eingang"
3. Karte öffnen → festes Angebotstemplate mit leeren Inline-Feldern
4. Abschnitts-Navigator rechts zeigt Vollständigkeit pro Sektion
5. Underwriter füllt Basisdaten direkt im Dokument aus
6. Karte wandert automatisch in "Datenerfassung" wenn Pflichtfelder gefüllt

### Workflow 2: Risikodaten + Bewertung (UC-S-002)

1. Im Dokument: Standort-Abschnitte ausfüllen (+ Standort hinzufügen)
2. Externe Daten werden automatisch eingefüllt (blau markiert)
3. Navigator zeigt Fortschritt pro Standort
4. UW klickt "Bewertung starten" im Bewertungs-Abschnitt
5. System füllt Scoring, Hinweise, Vollständigkeit ein
6. Karte wandert in "Risikobewertung" → "Kalkulation"

### Workflow 3: Prämie + Angebot (UC-S-006, UC-S-003)

1. UW passt SB und Parameter im Dokument an → Prämie live
2. Benchmark-Vergleich am Rand
3. Navigator zeigt 100% Vollständigkeit
4. UW klickt "Angebot finalisieren" → PDF wird generiert
5. Karte wandert in "Angebot"

### Workflow 4: Renewal / Nachtrag (UC-S-004)

1. Renewal/Nachtrag erscheint als Karte auf dem Board (gelb/blau)
2. Karte öffnen → vorausgefülltes Dokument aus Bestandsdaten
3. UW prüft/aktualisiert → gleicher Prozess wie Neugeschäft
4. Änderungen gegenüber Bestand sind markiert

## Capabilities & Features

| Feature | Description | Related UC | Priority |
|---------|------------|------------|----------|
| Kanban-Board | Zentrale Übersicht aller Vorgänge in 6 Prozessschritt-Spalten | UC-S-001 | Must |
| Dokument als UI | Editierbares Dokument im Google-Docs-Stil mit Inline-Feldern | UC-S-001, UC-S-003 | Must |
| Abschnitts-Navigator mit Vollständigkeit | Rechte Sidebar zeigt Fortschritt pro Dokumentabschnitt — Guidance ohne Zwang | UC-S-001 | Must |
| Festes Angebotstemplate | Jeder Vorgang startet mit Sach-Angebotstemplate | UC-S-001, UC-S-003 | Must |
| Standort-Abschnitte | Jeder Standort als eigener Abschnitt im Dokument | UC-S-002 | Must |
| Risikobewertungs-Abschnitt | Manueller Trigger, Scoring, Zeichnungsrichtlinien | UC-S-002 | Must |
| Auto-Anreicherung mit Markierung | Externe Daten automatisch bei Eingabe, blau markiert | UC-S-005 | Must |
| Live-Prämie | Prämie live im Dokument, Benchmark am Rand | UC-S-006 | Must |
| Ein Board für alle Vorgangstypen | Farb-Labels: Neugeschäft/Renewal/Nachtrag | UC-S-004 | Must |

## UI Concept

### Layout
- **Header:** "Underwriting Workbench" + Nutzer-Info (Name, Rolle)
- **Sidebar:** Navigation (Board, Verträge, Berichte, Einstellungen)
- **Content:** Kanban-Board (Vollbreite) oder Dokument-Ansicht (max 800px zentriert auf grauem Hintergrund)

### Kanban-Board UI
- 6 Spalten nebeneinander
- Karten: weiß mit Shadow, Firmenname + Vorgangsnummer, Makler-Subtitle, Fortschrittsbalken, farbcodiertes Badge
- "Neuer Vorgang" Button prominent

### Dokument-UI
- Weißes Dokument auf hellgrauem Hintergrund (Google-Docs-Stil)
- Editierbare Felder: gepunktete Unterstreichung, solid bei Hover/Focus
- Auto-angereicherte Felder: 4px blauer linker Rand
- **Abschnitts-Navigator rechts:** TOC + Vollständigkeitsbalken pro Sektion (Synthese-Element)
- Buttons: "Bewertung starten", "Angebot finalisieren", "Zur Freigabe vorlegen"

### Farbschema
- Neutral/Shadcn-basiert: Schwarz/Weiß/Grau als Basis
- Blau für Auto-Anreicherung und "In Bearbeitung"
- Grün für Erfolg/Abgeschlossen
- Gelb/Orange für Warnungen/Renewal
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
| UG-E-011 | Renewal bearbeiten | UC-S-004 | Vorausgefülltes Dokument für Vertragserneuerung |
| UG-E-012 | Nachtrag bearbeiten | UC-S-004 | Vorausgefülltes Dokument für Vertragsänderung |

> Note: IDs with prefix "UG-E" (Exploration) — will be converted
> to official UC-UG-XXX IDs upon finalization.

## Proposed Roadmap Phases

| Phase | Goal | Use Cases | Rationale |
|-------|------|-----------|-----------|
| 1 | Kanban-Board + Basisdokument | UG-E-001, UG-E-002, UG-E-003 | Grundgerüst: Board + editierbares Template + Navigator |
| 2 | Standort-Erfassung + Datenanreicherung | UG-E-004, UG-E-005 | Risikodaten erfassen, externe Daten integrieren |
| 3 | Risikobewertung + Kalkulation | UG-E-006, UG-E-007, UG-E-008 | Kernwertschöpfung: Scoring, Live-Prämie, Benchmarks |
| 4 | Angebot & Dokumente | UG-E-009, UG-E-010 | End-to-end: PDF, Freigabe |
| 5 | Bestandsverwaltung | UG-E-011, UG-E-012 | Renewals + Nachträge als Erweiterung |
