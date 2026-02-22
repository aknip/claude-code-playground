# Project Roadmap

**Project:** Underwriting Workbench
**Current Milestone:** v1.0.0
**Started:** 2026-02-22

---

## Milestone v1.0.0 - Underwriting Workbench MVP

**Status:** In Progress
**Target Date:** TBD

### Phase 1: Kanban-Board + Basisdokument

#### Goal

Der Underwriter kann neue Vorgaenge auf dem Kanban-Board anlegen, das editierbare Angebotstemplate im Dokument-UI oeffnen, Basisdaten direkt im Dokument erfassen und alle laufenden Vorgaenge im Board-Ueberblick sehen.

#### Use Cases

| ID | Name | Level | Priority | Status |
|----|------|-------|----------|--------|
| UC-UG-001 | Vorgang anlegen | User-Goal | Must | Planned |
| UC-UG-002 | Basisdaten erfassen | User-Goal | Must | Planned |
| UC-UG-003 | Board-Uebersicht nutzen | User-Goal | Must | Planned |

#### Success Criteria (from Postconditions)

1. [From UC-UG-001 POST-1] Eine neue Karte existiert in der Spalte "Eingang" auf dem Board
2. [From UC-UG-001 POST-2] Ein leeres Angebotstemplate ist dem Vorgang zugeordnet
3. [From UC-UG-001 POST-3] Der Vorgang hat eine eindeutige Vorgangsnummer
4. [From UC-UG-001 POST-4] Das Dokument-UI zeigt das Template mit editierbaren Feldern
5. [From UC-UG-002 POST-1] Basisdaten sind im Dokument gespeichert
6. [From UC-UG-002 POST-2] Karte auf dem Board zeigt Firmennamen und Makler
7. [From UC-UG-002 POST-3] Navigator zeigt aktualisierten Fortschritt fuer "Vertragsdaten"
8. [From UC-UG-002 POST-4] Bei vollstaendigen Pflichtfeldern: Karte in Spalte "Datenerfassung"
9. [From UC-UG-003 POST-1] Der Underwriter hat einen Ueberblick ueber alle laufenden Vorgaenge
10. [From UC-UG-003 POST-2] Ein Vorgang kann im Dokument-UI geoeffnet werden

#### Dependencies

- Keine (Fundament-Phase)

#### Included Subfunctions

- UC-SF-XXX: Kanban-Board Rendering (to be created during planning)
- UC-SF-XXX: Dokument-UI mit Inline-Feldern (to be created during planning)
- UC-SF-XXX: Abschnitts-Navigator mit Vollstaendigkeitsanzeige (to be created during planning)
- UC-SF-XXX: Automatische Speicherung (to be created during planning)

---

### Phase 2: Standort-Erfassung + Datenanreicherung

#### Goal

Der Underwriter kann Standort-Abschnitte im Dokument hinzufuegen und ausfuellen, und externe Daten (Firmendaten, Branchenprofil, Naturgefahrzonen) werden automatisch angereichert und visuell markiert.

#### Use Cases

| ID | Name | Level | Priority | Status |
|----|------|-------|----------|--------|
| UC-UG-004 | Standort erfassen | User-Goal | Must | Planned |
| UC-UG-005 | Daten anreichern lassen | User-Goal | Must | Planned |

#### Success Criteria (from Postconditions)

1. [From UC-UG-004 POST-1] Mindestens ein Standort-Abschnitt ist im Dokument vorhanden
2. [From UC-UG-004 POST-2] Standortdaten sind gespeichert (Adresse, Gebaeudetyp, Baujahr, Werte, Gefahren)
3. [From UC-UG-004 POST-3] Navigator zeigt aktualisierten Fortschritt fuer "Standorte"
4. [From UC-UG-004 POST-4] Naturgefahrzonen automatisch befuellt
5. [From UC-UG-005 POST-1] Externe Daten sind im Dokument befuellt
6. [From UC-UG-005 POST-2] Automatisch befuellte Felder sind blau markiert
7. [From UC-UG-005 POST-3] Manuell ueberschriebene Felder verlieren die blaue Markierung

#### Dependencies

- Phase 1: Vorgang und Dokument-UI muessen existieren (UC-UG-001, UC-UG-002). Standort-Erfassung setzt Basisdaten voraus. Datenanreicherung wird durch Basisdaten- und Standort-Eingabe getriggert.

#### Included Subfunctions

- UC-SF-XXX: Standort-Abschnitt hinzufuegen/entfernen (to be created during planning)
- UC-SF-XXX: Externe Datenquellen-Anbindung (to be created during planning)
- UC-SF-XXX: Visuelle Markierung angereichter Felder (to be created during planning)

---

### Phase 3: Risikobewertung + Kalkulation

#### Goal

Der Underwriter kann die strukturierte Risikobewertung ausloesen (Scoring, Zeichnungsrichtlinien), die Praemie live im Dokument berechnen und Markt-Benchmarks zur Einordnung nutzen.

#### Use Cases

| ID | Name | Level | Priority | Status |
|----|------|-------|----------|--------|
| UC-UG-006 | Risiko bewerten | User-Goal | Must | Planned |
| UC-UG-007 | Praemie berechnen | User-Goal | Must | Planned |
| UC-UG-008 | Benchmarks einsehen | User-Goal | Should | Planned |

#### Success Criteria (from Postconditions)

1. [From UC-UG-006 POST-1] Risiko-Score ist berechnet und im Dokument sichtbar
2. [From UC-UG-006 POST-2] Zeichnungsrichtlinien sind geprueft
3. [From UC-UG-006 POST-3] Hinweise und Empfehlungen sind dargestellt
4. [From UC-UG-006 POST-4] Vollstaendigkeitsstatus ist aktualisiert
5. [From UC-UG-006 POST-5] Bei Ueberschreitung: Vorgang als freigabepflichtig markiert
6. [From UC-UG-007 POST-1] Praemie ist berechnet und im Dokument sichtbar
7. [From UC-UG-007 POST-2] Praemie reagiert live auf Parameteraenderungen
8. [From UC-UG-007 POST-3] Alle Parameter sind als editierbare Inline-Felder verfuegbar
9. [From UC-UG-008 POST-1] Benchmark-Informationen sind am Rand des Dokuments sichtbar
10. [From UC-UG-008 POST-2] Der Underwriter hat eine Markteinordnung seiner Praemie

#### Dependencies

- Phase 2: Mindestens ein Standort muss erfasst sein (UC-UG-004). Risikodaten sind Voraussetzung fuer Bewertung und Praemienberechnung.

#### Included Subfunctions

- UC-SF-XXX: Risiko-Scoring-Engine (to be created during planning)
- UC-SF-XXX: Zeichnungsrichtlinien-Pruefung (to be created during planning)
- UC-SF-XXX: Praemienberechnung (to be created during planning)
- UC-SF-XXX: Benchmark-Datenanbindung (to be created during planning)

---

### Phase 4: Angebot + Freigabe

#### Goal

Der Underwriter kann das Angebotsdokument finalisieren, ein PDF generieren und bei Ueberschreitung der Zeichnungsvollmacht den Vorgang dem Senior Underwriter zur Freigabe vorlegen.

#### Use Cases

| ID | Name | Level | Priority | Status |
|----|------|-------|----------|--------|
| UC-UG-009 | Angebot finalisieren | User-Goal | Must | Planned |
| UC-UG-010 | Freigabe erteilen | User-Goal | Should | Planned |

#### Success Criteria (from Postconditions)

1. [From UC-UG-009 POST-1] PDF des Angebots ist generiert und verfuegbar
2. [From UC-UG-009 POST-2] Karte auf dem Board ist in der Spalte "Angebot"
3. [From UC-UG-009 POST-3] Dokument ist als finalisiert markiert
4. [From UC-UG-010 POST-1] Vorgang ist freigegeben oder zurueckgewiesen
5. [From UC-UG-010 POST-2] Bei Freigabe: Underwriter kann Angebot finalisieren
6. [From UC-UG-010 POST-3] Bei Zurueckweisung: Begruendung ist dokumentiert

#### Dependencies

- Phase 3: Risikobewertung und Praemienberechnung muessen durchgefuehrt sein (UC-UG-006, UC-UG-007). Finalisierung erfordert 100% Vollstaendigkeit. Freigabe wird durch Zeichnungsrichtlinien-Ueberschreitung ausgeloest.

#### Included Subfunctions

- UC-SF-XXX: PDF-Generierung (to be created during planning)
- UC-SF-XXX: Zusammenfassungs-Dialog (to be created during planning)
- UC-SF-XXX: Freigabe-Workflow (to be created during planning)

---

### Phase 5: Bestandsverwaltung

#### Goal

Der Underwriter kann Renewals und Nachtraege auf demselben Board wie Neugeschaeft bearbeiten, mit vorausgefuellten Dokumenten aus Bestandsdaten und visueller Markierung von Aenderungen.

#### Use Cases

| ID | Name | Level | Priority | Status |
|----|------|-------|----------|--------|
| UC-UG-011 | Renewal bearbeiten | User-Goal | Should | Planned |
| UC-UG-012 | Nachtrag bearbeiten | User-Goal | Should | Planned |

#### Success Criteria (from Postconditions)

1. [From UC-UG-011 POST-1] Renewal-Dokument ist aktualisiert
2. [From UC-UG-011 POST-2] Aenderungen gegenueber dem Bestand sind nachvollziehbar
3. [From UC-UG-011 POST-3] Vorgang durchlaeuft den Standard-Prozess auf dem Board
4. [From UC-UG-012 POST-1] Nachtragsdokument ist erstellt mit Aenderungsuebersicht
5. [From UC-UG-012 POST-2] Aenderungen gegenueber dem Bestand sind dokumentiert
6. [From UC-UG-012 POST-3] Praemienanpassung ist berechnet

#### Dependencies

- Phase 1-4: Gesamter Neugeschaeft-Prozess muss funktionieren. Renewals und Nachtraege nutzen Board, Dokument-UI, Standort-Erfassung, Bewertung, Kalkulation und Finalisierung. Bestandsdaten-Vorbefuellung setzt abgeschlossene Vorgaenge voraus.

#### Included Subfunctions

- UC-SF-XXX: Bestandsdaten-Vorbefuellung (to be created during planning)
- UC-SF-XXX: Aenderungs-Markierung gegenueber Bestand (to be created during planning)
- UC-SF-XXX: Nachtragsdokument-Generierung (to be created during planning)

---

## Future Milestones

(Created after /uc:new-milestone)

---

*Generated: 2026-02-22 by uc-modeler*
*Use Cases: 12 User-Goal mapped to 5 phases*
*Milestone: v1.0.0*
