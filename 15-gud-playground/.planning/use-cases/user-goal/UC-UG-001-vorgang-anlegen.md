# UC-UG-001: Vorgang anlegen

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-UG-001 |
| **Level** | User-Goal |
| **Parent** | UC-S-001 (Neugeschaeft bearbeiten) |
| **Name** | Vorgang anlegen |
| **Priority** | Must |
| **Phase** | Phase 1 in ROADMAP.md |
| **Status** | Draft |
| **Created** | 2026-02-22 |
| **Exploration Ref** | UG-E-001 |

## Goal

Der Underwriter erstellt einen neuen Vorgang auf dem Kanban-Board und oeffnet das leere Angebotstemplate zur Bearbeitung.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur |

## Trigger

Der Underwriter klickt "Neuer Vorgang" auf dem Kanban-Board.

## Preconditions

- Der Underwriter ist im System angemeldet.
- Das Kanban-Board ist sichtbar.

## Main Success Scenario

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 1 | Underwriter | Klickt "Neuer Vorgang" auf dem Board. |
| 2 | System | Erstellt eine neue Karte in der Spalte "Eingang". |
| 3 | System | Weist eine Vorgangsnummer zu. |
| 4 | System | Oeffnet das leere Angebotstemplate (Sach-Industrieversicherung) im Dokument-UI. |
| 5 | System | Zeigt den Abschnitts-Navigator mit Vollstaendigkeitsanzeige (alle Abschnitte bei 0%). |
| 6 | Underwriter | Sieht das leere Dokument mit editierbaren Inline-Feldern. |

## Alternative Scenarios

_Keine._

## Postconditions

- Eine neue Karte existiert in der Spalte "Eingang" auf dem Board.
- Ein leeres Angebotstemplate ist dem Vorgang zugeordnet.
- Der Vorgang hat eine eindeutige Vorgangsnummer.
- Das Dokument-UI zeigt das Template mit editierbaren Feldern.

## Acceptance Criteria

```gherkin
Feature: Vorgang anlegen
  Als Underwriter
  moechte ich einen neuen Vorgang auf dem Board anlegen
  damit ich eine neue Submission bearbeiten kann.

  Scenario: Neuen Vorgang erfolgreich anlegen
    Given der Underwriter ist auf dem Kanban-Board
    When er auf "Neuer Vorgang" klickt
    Then erscheint eine neue Karte in der Spalte "Eingang"
    And die Karte hat eine eindeutige Vorgangsnummer
    And das Dokument-UI oeffnet sich mit dem leeren Angebotstemplate
    And der Abschnitts-Navigator zeigt alle Abschnitte bei 0% Vollstaendigkeit

  Scenario: Angebotstemplate enthaelt erwartete Abschnitte
    Given ein neuer Vorgang wurde angelegt
    When das Dokument-UI geoeffnet ist
    Then enthaelt das Template die Abschnitte "Vertragsdaten", "Standorte", "Risikobewertung", "Kalkulation"
    And alle Felder sind editierbare Inline-Felder
    And kein Feld ist vorausgefuellt
```

## UI Notes

- Karte: weiss mit Shadow, Vorgangsnummer, leerer Firmenname-Platzhalter.
- Dokument: weisses Dokument auf hellgrauem Hintergrund, Google-Docs-Stil.
- Navigator: rechte Sidebar mit TOC und Vollstaendigkeitsbalken pro Sektion.
