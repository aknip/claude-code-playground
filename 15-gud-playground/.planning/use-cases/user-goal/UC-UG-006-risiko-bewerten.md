# UC-UG-006: Risiko bewerten

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-UG-006 |
| **Level** | User-Goal |
| **Parent** | UC-S-002 (Risiko bewerten) |
| **Name** | Risiko bewerten |
| **Priority** | Must |
| **Phase** | Phase 3 in ROADMAP.md |
| **Status** | Draft |
| **Created** | 2026-02-22 |
| **Exploration Ref** | UG-E-006 |

## Goal

Der Underwriter loest die strukturierte Risikobewertung im Dokument aus und erhaelt Scoring, Zeichnungsrichtlinien-Pruefung und Hinweise.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur |

## Trigger

Der Underwriter klickt "Bewertung starten" im Abschnitt "Risikobewertung" des Dokuments.

## Preconditions

- Ein Vorgang ist im Dokument-UI geoeffnet.
- Mindestens ein Standort ist erfasst (UC-UG-004).
- Standortdaten sind zumindest teilweise ausgefuellt.

## Main Success Scenario

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 1 | Underwriter | Scrollt zum Abschnitt "Risikobewertung" im Dokument. |
| 2 | Underwriter | Klickt "Bewertung starten". |
| 3 | System | Analysiert die erfassten Risikodaten aller Standorte. |
| 4 | System | Berechnet Risiko-Score (z.B. 3.4/5 -- Mittel). |
| 5 | System | Prueft Zeichnungsrichtlinien: OK oder Ueberschreitung. |
| 6 | System | Zeigt Hinweise: Baujahr-Risiko, Naturgefahrzonen, etc. |
| 7 | System | Zeigt Vollstaendigkeit: Prozent der ausgefuellten Felder. |
| 8 | System | Fuellt den Bewertungs-Abschnitt im Dokument mit den Ergebnissen. |
| 9 | Underwriter | Liest Bewertung und Hinweise. |

## Alternative Scenarios

### A1: Zeichnungsrichtlinie ueberschritten

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 5a | System | Zeichnungsrichtlinie ist ueberschritten (z.B. Summe > Vollmacht). |
| 6a | System | Zeigt rot markierten Hinweis: "Ueberschreitung Zeichnungsvollmacht". |
| 7a | System | Markiert Vorgang als freigabepflichtig. |

### A2: Unvollstaendige Risikodaten

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 3a | System | Stellt fest, dass wesentliche Felder fehlen. |
| 4a | System | Berechnet Score mit Hinweis "vorlaeufig -- Daten unvollstaendig". |
| 5a | System | Listet fehlende Felder explizit auf. |

## Postconditions

- Risiko-Score ist berechnet und im Dokument sichtbar.
- Zeichnungsrichtlinien sind geprueft.
- Hinweise und Empfehlungen sind dargestellt.
- Vollstaendigkeitsstatus ist aktualisiert.
- Bei Ueberschreitung: Vorgang als freigabepflichtig markiert.

## Acceptance Criteria

```gherkin
Feature: Risiko bewerten
  Als Underwriter
  moechte ich eine strukturierte Risikobewertung im Dokument ausloesen
  damit ich eine fundierte Entscheidungsgrundlage habe.

  Scenario: Risikobewertung erfolgreich durchfuehren
    Given ein Vorgang hat mindestens einen Standort mit ausgefuellten Daten
    When der Underwriter "Bewertung starten" klickt
    Then wird ein Risiko-Score angezeigt (z.B. "3.4/5 -- Mittel")
    And die Zeichnungsrichtlinien-Pruefung zeigt "OK" oder "Ueberschreitung"
    And relevante Hinweise werden aufgelistet
    And der Vollstaendigkeitsgrad wird angezeigt

  Scenario: Zeichnungsrichtlinie ueberschritten
    Given die erfassten Werte ueberschreiten die Zeichnungsvollmacht
    When der Underwriter "Bewertung starten" klickt
    Then zeigt das System einen rot markierten Hinweis "Ueberschreitung Zeichnungsvollmacht"
    And der Vorgang wird als freigabepflichtig markiert

  Scenario: Bewertung bei unvollstaendigen Daten
    Given wesentliche Standortfelder sind nicht ausgefuellt
    When der Underwriter "Bewertung starten" klickt
    Then wird ein vorlaeufiger Score mit dem Hinweis "vorlaeufig" angezeigt
    And fehlende Felder werden explizit aufgelistet
```

## UI Notes

- "Bewertung starten" Button im Abschnitt "Risikobewertung".
- Risiko-Score: grosse Zahl mit Farbcodierung (gruen/gelb/rot).
- Zeichnungsrichtlinien: OK in gruen, Ueberschreitung in rot.
- Hinweise als nummerierte Liste.
- Vollstaendigkeit als Prozentbalken.
