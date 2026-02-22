# UC-UG-012: Nachtrag bearbeiten

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-UG-012 |
| **Level** | User-Goal |
| **Parent** | UC-S-004 (Bestand verwalten) |
| **Name** | Nachtrag bearbeiten |
| **Priority** | Should |
| **Phase** | Phase 5 in ROADMAP.md |
| **Status** | Draft |
| **Created** | 2026-02-22 |
| **Exploration Ref** | UG-E-012 |

## Goal

Der Underwriter bearbeitet einen Nachtrag (Vertragsaenderung) mit einem vorausgefuellten Dokument aus den Bestandsdaten, wobei nur die geaenderten Teile angepasst werden.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur |

## Trigger

Der Underwriter erstellt einen Nachtrag-Vorgang fuer einen bestehenden Vertrag.

## Preconditions

- Ein bestehender Vertrag ist im System vorhanden.
- Eine Vertragsaenderung ist erforderlich.

## Main Success Scenario

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 1 | Underwriter | Erstellt einen Nachtrag-Vorgang fuer einen bestehenden Vertrag. |
| 2 | System | Erstellt eine blaue Karte auf dem Board in Spalte "Eingang". |
| 3 | System | Oeffnet das Dokument-UI mit vorausgefuellten Bestandsdaten. |
| 4 | Underwriter | Identifiziert die zu aendernden Abschnitte. |
| 5 | Underwriter | Nimmt die Aenderungen vor (z.B. neuer Standort, geaenderte Werte). |
| 6 | System | Markiert Aenderungen gegenueber dem Bestand visuell. |
| 7 | System | Berechnet ggf. Praemienanpassung (UC-UG-007). |
| 8 | Underwriter | Finalisiert den Nachtrag. |
| 9 | System | Generiert Nachtragsdokument mit Aenderungsuebersicht. |

## Alternative Scenarios

### A1: Neuer Standort hinzugefuegt

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 5a | Underwriter | Fuegt einen neuen Standort hinzu (UC-UG-004). |
| 6a | System | Markiert den neuen Standort als "Neu im Nachtrag". |
| 7a | System | Berechnet Praemienanpassung inklusive neuem Standort. |

## Postconditions

- Nachtragsdokument ist erstellt mit Aenderungsuebersicht.
- Aenderungen gegenueber dem Bestand sind dokumentiert.
- Praemienanpassung ist berechnet.

## Acceptance Criteria

```gherkin
Feature: Nachtrag bearbeiten
  Als Underwriter
  moechte ich Nachtraege mit vorausgefuellten Bestandsdaten bearbeiten
  damit ich Vertragsaenderungen effizient durchfuehren kann.

  Scenario: Nachtrag-Karte auf dem Board
    Given ein bestehender Vertrag erfordert eine Aenderung
    When der Underwriter einen Nachtrag erstellt
    Then erscheint eine blau markierte Karte auf dem Board
    And die Karte zeigt den Firmennamen und "Nachtrag" als Badge

  Scenario: Vorausgefuelltes Dokument fuer Nachtrag
    Given eine Nachtrag-Karte existiert auf dem Board
    When der Underwriter die Karte oeffnet
    Then ist das Dokument mit den aktuellen Bestandsdaten vorausgefuellt
    And der Underwriter kann gezielt Abschnitte aendern

  Scenario: Aenderungen gegenueber Bestand markieren
    Given ein Nachtrag-Dokument ist geoeffnet
    When der Underwriter die Deckungssumme aendert
    Then wird die Aenderung visuell gegenueber dem alten Wert markiert
    And die Praemie wird entsprechend angepasst

  Scenario: Nachtragsdokument generieren
    Given ein Nachtrag wurde fertiggestellt
    When der Underwriter den Nachtrag finalisiert
    Then wird ein Nachtragsdokument mit Aenderungsuebersicht generiert
```

## UI Notes

- Nachtrag-Karten: blaues Badge/Label auf dem Board.
- Aenderungen im Dokument: Hervorhebung mit Vergleich zum Bestand.
- Nachtragsdokument: separate Aenderungsuebersicht im PDF.
