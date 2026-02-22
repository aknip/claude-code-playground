# UC-UG-011: Renewal bearbeiten

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-UG-011 |
| **Level** | User-Goal |
| **Parent** | UC-S-004 (Bestand verwalten) |
| **Name** | Renewal bearbeiten |
| **Priority** | Should |
| **Phase** | Phase 5 in ROADMAP.md |
| **Status** | Draft |
| **Created** | 2026-02-22 |
| **Exploration Ref** | UG-E-011 |

## Goal

Der Underwriter bearbeitet eine Vertragserneuerung (Renewal) mit einem vorausgefuellten Dokument aus den Bestandsdaten auf demselben Board wie Neugeschaeft.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur |

## Trigger

Ein Renewal-Vorgang erscheint auf dem Board (gelb markiert), oder der Underwriter erstellt manuell einen Renewal-Vorgang.

## Preconditions

- Ein bestehender Vertrag ist im System vorhanden.
- Der Vertrag steht zur Erneuerung an.

## Main Success Scenario

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 1 | System | Zeigt Renewal-Karte (gelb) auf dem Board in Spalte "Eingang". |
| 2 | Underwriter | Klickt auf die Renewal-Karte. |
| 3 | System | Oeffnet das Dokument-UI mit vorausgefuellten Bestandsdaten. |
| 4 | System | Alle Felder aus dem bestehenden Vertrag sind bereits befuellt. |
| 5 | System | Navigator zeigt hohen Vollstaendigkeitsgrad. |
| 6 | Underwriter | Prueft die vorausgefuellten Daten. |
| 7 | Underwriter | Aktualisiert geaenderte Werte (z.B. neue Versicherungswerte, Adressaenderungen). |
| 8 | System | Markiert Aenderungen gegenueber dem Bestand visuell. |
| 9 | Underwriter | Durchlaeuft den gleichen Prozess wie Neugeschaeft (Bewertung, Kalkulation, Finalisierung). |

## Alternative Scenarios

### A1: Keine Aenderungen noetig

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 7a | Underwriter | Bestaetigt alle Daten ohne Aenderungen. |
| 8a | System | Vorgang kann direkt zur Kalkulation weitergehen. |

## Postconditions

- Renewal-Dokument ist aktualisiert.
- Aenderungen gegenueber dem Bestand sind nachvollziehbar.
- Vorgang durchlaeuft den Standard-Prozess auf dem Board.

## Acceptance Criteria

```gherkin
Feature: Renewal bearbeiten
  Als Underwriter
  moechte ich Renewals mit vorausgefuellten Bestandsdaten bearbeiten
  damit ich Vertragserneuerungen effizient durchfuehren kann.

  Scenario: Renewal-Karte auf dem Board
    Given ein Vertrag steht zur Erneuerung an
    Then erscheint eine gelb markierte Karte auf dem Board
    And die Karte zeigt den Firmennamen und "Renewal" als Badge

  Scenario: Vorausgefuelltes Dokument oeffnen
    Given eine Renewal-Karte existiert auf dem Board
    When der Underwriter die Karte oeffnet
    Then ist das Dokument mit den Bestandsdaten vorausgefuellt
    And der Navigator zeigt einen hohen Vollstaendigkeitsgrad

  Scenario: Aenderungen gegenueber Bestand markieren
    Given ein Renewal-Dokument ist mit Bestandsdaten geoeffnet
    When der Underwriter den Gebaeuewert von "4.000.000 EUR" auf "4.500.000 EUR" aendert
    Then wird die Aenderung visuell gegenueber dem alten Wert markiert

  Scenario: Renewal durchlaeuft Standard-Prozess
    Given ein Renewal-Vorgang wurde aktualisiert
    Then durchlaeuft die Karte die gleichen 6 Spalten wie Neugeschaeft
```

## UI Notes

- Renewal-Karten: gelbes Badge/Label auf dem Board.
- Vorausgefuellte Felder: normaler Stil (nicht blau, da keine externe Anreicherung).
- Aenderungen: Hervorhebung mit "vorher"-Wert als Tooltip oder dezenter Anzeige.
