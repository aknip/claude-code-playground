# UC-UG-002: Basisdaten erfassen

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-UG-002 |
| **Level** | User-Goal |
| **Parent** | UC-S-001 (Neugeschaeft bearbeiten) |
| **Name** | Basisdaten erfassen |
| **Priority** | Must |
| **Phase** | Phase 1 in ROADMAP.md |
| **Status** | Draft |
| **Created** | 2026-02-22 |
| **Exploration Ref** | UG-E-002 |

## Goal

Der Underwriter erfasst die Basisdaten eines Vorgangs (Versicherungsnehmer, Makler, Vertragsbeginn etc.) direkt im Dokument als Inline-Felder.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur |

## Trigger

Der Underwriter oeffnet einen bestehenden Vorgang im Dokument-UI und beginnt Felder auszufuellen.

## Preconditions

- Ein Vorgang wurde angelegt (UC-UG-001).
- Das Dokument-UI ist geoeffnet.

## Main Success Scenario

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 1 | Underwriter | Klickt in das Feld "Versicherungsnehmer" im Dokument. |
| 2 | Underwriter | Gibt den Firmennamen ein. |
| 3 | System | Speichert die Eingabe automatisch. |
| 4 | System | Loest ggf. Datenanreicherung aus (UC-UG-005). |
| 5 | Underwriter | Fuellt weitere Basisdaten aus: Makler, Vertragsbeginn, Vertragslaufzeit, Sparte. |
| 6 | System | Aktualisiert den Abschnitts-Navigator: "Vertragsdaten" Fortschritt steigt. |
| 7 | System | Aktualisiert die Karte auf dem Board (Firmenname erscheint). |
| 8 | System | Wenn alle Pflichtfelder gefuellt: Karte wandert automatisch von "Eingang" nach "Datenerfassung". |

## Alternative Scenarios

### A1: Pflichtfeld nicht ausgefuellt

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 8a | System | Pflichtfelder sind nicht vollstaendig ausgefuellt. |
| 8b | System | Karte bleibt in "Eingang". Navigator zeigt fehlende Felder rot markiert. |

## Postconditions

- Basisdaten sind im Dokument gespeichert.
- Karte auf dem Board zeigt Firmennamen und Makler.
- Navigator zeigt aktualisierten Fortschritt fuer "Vertragsdaten".
- Bei vollstaendigen Pflichtfeldern: Karte in Spalte "Datenerfassung".

## Acceptance Criteria

```gherkin
Feature: Basisdaten erfassen
  Als Underwriter
  moechte ich die Basisdaten eines Vorgangs direkt im Dokument erfassen
  damit die Submission-Daten strukturiert vorliegen.

  Scenario: Basisdaten erfolgreich eingeben
    Given ein Vorgang ist im Dokument-UI geoeffnet
    When der Underwriter den Firmennamen "Muster GmbH" eingibt
    And den Makler "Aon" eingibt
    And den Vertragsbeginn "01.01.2027" eingibt
    Then werden die Daten automatisch gespeichert
    And der Navigator zeigt erhoehten Fortschritt bei "Vertragsdaten"
    And die Board-Karte zeigt "Muster GmbH" als Titel

  Scenario: Pflichtfelder unvollstaendig
    Given ein Vorgang ist im Dokument-UI geoeffnet
    And der Firmenname ist ausgefuellt
    But der Vertragsbeginn fehlt
    Then bleibt die Karte in der Spalte "Eingang"
    And der Navigator zeigt das fehlende Feld markiert

  Scenario: Automatische Spalten-Verschiebung bei vollstaendigen Pflichtfeldern
    Given ein Vorgang befindet sich in der Spalte "Eingang"
    When alle Basisdaten-Pflichtfelder ausgefuellt sind
    Then wandert die Karte automatisch in die Spalte "Datenerfassung"
```

## UI Notes

- Inline-Felder: gepunktete Unterstreichung, solid bei Hover/Focus.
- Automatische Speicherung ohne expliziten "Speichern"-Button.
- Datumsformat: DD.MM.YYYY.
- Waehrung: EUR.
