# UC-UG-003: Board-Uebersicht nutzen

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-UG-003 |
| **Level** | User-Goal |
| **Parent** | UC-S-001 (Neugeschaeft bearbeiten) |
| **Name** | Board-Uebersicht nutzen |
| **Priority** | Must |
| **Phase** | Phase 1 in ROADMAP.md |
| **Status** | Draft |
| **Created** | 2026-02-22 |
| **Exploration Ref** | UG-E-003 |

## Goal

Der Underwriter sieht alle laufenden Vorgaenge auf dem Kanban-Board, erkennt deren Status auf einen Blick und kann filtern und navigieren.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur |

## Trigger

Der Underwriter oeffnet das Kanban-Board (Startseite der Applikation).

## Preconditions

- Der Underwriter ist im System angemeldet.

## Main Success Scenario

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 1 | Underwriter | Oeffnet das Kanban-Board. |
| 2 | System | Zeigt 6 Spalten: Eingang, Datenerfassung, Risikobewertung, Kalkulation, Angebot, Abschluss. |
| 3 | System | Zeigt alle Vorgaenge als Karten in den jeweiligen Spalten. |
| 4 | System | Karten zeigen: Firmenname, Vorgangsnummer, Makler, Fortschrittsbalken, Farbcode (weiss/gelb/blau). |
| 5 | Underwriter | Erkennt den Status aller Vorgaenge auf einen Blick. |
| 6 | Underwriter | Klickt auf eine Karte, um den Vorgang im Dokument-UI zu oeffnen. |

## Alternative Scenarios

### A1: Board filtern

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 5a | Underwriter | Filtert das Board nach Vorgangstyp (Neugeschaeft/Renewal/Nachtrag). |
| 5b | System | Zeigt nur Karten des gewaehlten Typs. |

## Postconditions

- Der Underwriter hat einen Ueberblick ueber alle laufenden Vorgaenge.
- Optional: Ein Vorgang ist im Dokument-UI geoeffnet.

## Acceptance Criteria

```gherkin
Feature: Board-Uebersicht nutzen
  Als Underwriter
  moechte ich alle Vorgaenge auf dem Kanban-Board sehen
  damit ich den Status meiner Arbeit ueberblicke.

  Scenario: Board mit 6 Spalten anzeigen
    Given der Underwriter oeffnet das Kanban-Board
    Then werden 6 Spalten angezeigt: "Eingang", "Datenerfassung", "Risikobewertung", "Kalkulation", "Angebot", "Abschluss"
    And jede Spalte zeigt die Anzahl der enthaltenen Karten

  Scenario: Karten mit Vorgangsdetails anzeigen
    Given es existieren Vorgaenge im System
    When das Board geladen wird
    Then zeigt jede Karte den Firmennamen und die Vorgangsnummer
    And zeigt den Makler als Subtitle
    And zeigt einen Fortschrittsbalken
    And zeigt ein farbcodiertes Badge fuer den Vorgangstyp

  Scenario: Vorgang oeffnen
    Given eine Karte ist auf dem Board sichtbar
    When der Underwriter auf die Karte klickt
    Then oeffnet sich das Dokument-UI fuer diesen Vorgang

  Scenario: Board nach Vorgangstyp filtern
    Given es existieren Vorgaenge verschiedener Typen
    When der Underwriter nach "Renewal" filtert
    Then werden nur Karten mit gelbem Badge angezeigt
```

## UI Notes

- 6 Spalten nebeneinander, horizontal scrollbar bei kleinem Bildschirm.
- Karten: weiss mit Shadow, Hover-Effekt.
- Farbcodierung: weiss (Neugeschaeft), gelb (Renewal), blau (Nachtrag).
- "Neuer Vorgang" Button prominent sichtbar.
