# UC-UG-010: Freigabe erteilen

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-UG-010 |
| **Level** | User-Goal |
| **Parent** | UC-S-001 (Neugeschaeft bearbeiten) |
| **Name** | Freigabe erteilen |
| **Priority** | Should |
| **Phase** | Phase 4 in ROADMAP.md |
| **Status** | Draft |
| **Created** | 2026-02-22 |
| **Exploration Ref** | UG-E-010 |

## Goal

Der Underwriter legt einen freigabepflichtigen Vorgang dem Senior Underwriter zur Pruefung vor, und der Senior Underwriter kann den Vorgang genehmigen oder zurueckweisen.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur -- legt Vorgang zur Freigabe vor |
| Senior Underwriter | Primaerer Akteur -- prueft und gibt frei oder weist zurueck |

## Trigger

Der Underwriter klickt "Zur Freigabe vorlegen" bei einem freigabepflichtigen Vorgang.

## Preconditions

- Ein Vorgang ist als freigabepflichtig markiert (Zeichnungsvollmacht ueberschritten).
- Alle Pflichtabschnitte sind ausgefuellt.
- Risikobewertung ist durchgefuehrt.

## Main Success Scenario

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 1 | Underwriter | Klickt "Zur Freigabe vorlegen" im Dokument. |
| 2 | System | Markiert den Vorgang als "Wartet auf Freigabe". |
| 3 | System | Karte auf dem Board erhaelt Freigabe-Markierung. |
| 4 | Senior Underwriter | Oeffnet den Vorgang im Dokument-UI. |
| 5 | Senior Underwriter | Prueft Risikobewertung, Kalkulation und Dokument. |
| 6 | Senior Underwriter | Klickt "Freigabe erteilen". |
| 7 | System | Markiert den Vorgang als freigegeben. |
| 8 | System | Underwriter kann nun "Angebot finalisieren" (UC-UG-009). |

## Alternative Scenarios

### A1: Freigabe zurueckgewiesen

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 6a | Senior Underwriter | Klickt "Zurueckweisen" mit Begruendung. |
| 7a | System | Markiert den Vorgang als "Zurueckgewiesen". |
| 8a | System | Zeigt dem Underwriter die Begruendung. |
| 9a | Underwriter | Ueberarbeitet den Vorgang und legt erneut vor. |

## Postconditions

- Vorgang ist freigegeben oder zurueckgewiesen.
- Bei Freigabe: Underwriter kann Angebot finalisieren.
- Bei Zurueckweisung: Begruendung ist dokumentiert.

## Acceptance Criteria

```gherkin
Feature: Freigabe erteilen
  Als Underwriter
  moechte ich einen freigabepflichtigen Vorgang zur Pruefung vorlegen
  damit der Senior Underwriter ihn genehmigen kann.

  Scenario: Vorgang zur Freigabe vorlegen
    Given ein Vorgang ist als freigabepflichtig markiert
    And alle Pflichtabschnitte sind vollstaendig
    When der Underwriter auf "Zur Freigabe vorlegen" klickt
    Then wird der Vorgang als "Wartet auf Freigabe" markiert
    And die Board-Karte zeigt eine Freigabe-Markierung

  Scenario: Freigabe erteilen
    Given ein Vorgang wartet auf Freigabe
    When der Senior Underwriter auf "Freigabe erteilen" klickt
    Then wird der Vorgang als freigegeben markiert
    And der Underwriter kann "Angebot finalisieren" nutzen

  Scenario: Freigabe zurueckweisen
    Given ein Vorgang wartet auf Freigabe
    When der Senior Underwriter auf "Zurueckweisen" klickt
    And eine Begruendung eingibt
    Then wird der Vorgang als "Zurueckgewiesen" markiert
    And die Begruendung ist fuer den Underwriter sichtbar
```

## UI Notes

- "Zur Freigabe vorlegen" Button ersetzt "Angebot finalisieren" bei freigabepflichtigen Vorgaengen.
- Freigabe-Status auf der Board-Karte als Badge.
- Senior Underwriter sieht "Freigabe erteilen" und "Zurueckweisen" Buttons im Dokument.
- Zurueckweisung erfordert Begruendungsfeld (Pflicht).
