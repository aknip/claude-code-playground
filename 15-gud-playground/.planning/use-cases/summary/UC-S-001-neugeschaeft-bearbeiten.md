# UC-S-001: Neugeschaeft bearbeiten

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-S-001 |
| **Level** | Summary |
| **Name** | Neugeschaeft bearbeiten |
| **Status** | Draft |
| **Created** | 2026-02-22 |

## Goal

Der Underwriter kann eine neue Submission von der Erfassung ueber die Risikobewertung und Kalkulation bis zum fertigen Angebot bearbeiten -- der komplette Neugeschaeft-Prozess in einer strukturierten Umgebung.

## Scope

Underwriting Workbench -- gesamter Neugeschaeft-Lebenszyklus auf dem Kanban-Board und im Dokument-UI.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur -- erstellt und bearbeitet Vorgaenge |
| Senior Underwriter | Unterstuetzend -- erteilt Freigabe bei Vollmacht-Ueberschreitung |

## Description

Dieses Summary-Level Use Case umfasst den gesamten Neugeschaeft-Prozess: Ein neuer Vorgang wird auf dem Kanban-Board angelegt, das Angebotstemplate im Dokument-UI geoeffnet und schrittweise ausgefuellt. Der Abschnitts-Navigator mit Vollstaendigkeitsanzeige fuehrt den Underwriter durch die Bearbeitung. Die Karte wandert ueber die 6 Prozessschritt-Spalten (Eingang, Datenerfassung, Risikobewertung, Kalkulation, Angebot, Abschluss) bis zum fertigen Angebot.

## Includes (User-Goal-Level)

| UC-ID | Name | Priority |
|-------|------|----------|
| UC-UG-001 | Vorgang anlegen | Must |
| UC-UG-002 | Basisdaten erfassen | Must |
| UC-UG-003 | Board-Uebersicht nutzen | Must |
| UC-UG-009 | Angebot finalisieren | Must |
| UC-UG-010 | Freigabe erteilen | Should |

## Extends

_Keine._

## Business Rules

- Jeder Vorgang startet mit einem festen Angebotstemplate fuer Sach-Industrieversicherung.
- Das Kanban-Board zeigt alle Vorgangstypen (Neugeschaeft, Renewal, Nachtrag) auf einem Board.
- Neugeschaeft-Karten haben keine Farb-Markierung (weiss/Standard).
- Karten wandern automatisch in die naechste Spalte, wenn Pflichtfelder gefuellt sind.

## Notes

- Mapping: Entspricht den Exploration Use Cases UG-E-001, UG-E-002, UG-E-003, UG-E-009, UG-E-010.
- Der Abschnitts-Navigator (Guided Navigation) ist ein zentrales UI-Konzept, das Wizard-Fuehrung mit Dokumenten-Freiheit kombiniert.
