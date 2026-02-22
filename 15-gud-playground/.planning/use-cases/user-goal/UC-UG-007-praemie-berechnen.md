# UC-UG-007: Praemie berechnen

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-UG-007 |
| **Level** | User-Goal |
| **Parent** | UC-S-006 (Pricing und Kalkulation) |
| **Name** | Praemie berechnen |
| **Priority** | Must |
| **Phase** | Phase 3 in ROADMAP.md |
| **Status** | Draft |
| **Created** | 2026-02-22 |
| **Exploration Ref** | UG-E-007 |

## Goal

Der Underwriter sieht die berechnete Praemie live im Dokument und kann Parameter (z.B. Selbstbeteiligung) anpassen, wobei sich die Praemie sofort aktualisiert.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur |

## Trigger

Der Underwriter navigiert zum Kalkulationsabschnitt des Dokuments oder aendert einen praemienrelevanten Parameter.

## Preconditions

- Ein Vorgang ist im Dokument-UI geoeffnet.
- Risikodaten sind erfasst (UC-UG-004).
- Idealerweise Risikobewertung durchgefuehrt (UC-UG-006).

## Main Success Scenario

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 1 | Underwriter | Navigiert zum Abschnitt "Kalkulation" im Dokument. |
| 2 | System | Zeigt die aktuelle Praemie basierend auf den erfassten Risikodaten. |
| 3 | System | Zeigt editierbare Parameter: Selbstbeteiligung, Deckungssumme, etc. |
| 4 | Underwriter | Aendert die Selbstbeteiligung (z.B. von 10.000 EUR auf 25.000 EUR). |
| 5 | System | Berechnet die Praemie sofort neu (live). |
| 6 | System | Aktualisiert die Praemie im Dokumenttext. |
| 7 | Underwriter | Sieht die neue Praemie und deren Auswirkung. |

## Alternative Scenarios

### A1: Risikodaten unvollstaendig fuer Praemienberechnung

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 2a | System | Stellt fest, dass wesentliche Risikodaten fuer die Berechnung fehlen. |
| 3a | System | Zeigt Hinweis: "Praemienberechnung nicht moeglich -- fehlende Daten: [Liste]". |

## Postconditions

- Praemie ist berechnet und im Dokument sichtbar.
- Praemie reagiert live auf Parameteraenderungen.
- Alle Parameter sind als editierbare Inline-Felder verfuegbar.

## Acceptance Criteria

```gherkin
Feature: Praemie berechnen
  Als Underwriter
  moechte ich die Praemie live im Dokument sehen und Parameter anpassen
  damit ich die optimale Konditionen fuer den Kunden finden kann.

  Scenario: Praemie wird angezeigt
    Given ein Vorgang hat vollstaendige Risikodaten
    When der Underwriter den Abschnitt "Kalkulation" oeffnet
    Then wird die berechnete Praemie im Dokumenttext angezeigt
    And die Praemie wird in EUR formatiert

  Scenario: Live-Aktualisierung bei Parameteraenderung
    Given die Praemie wird im Dokument angezeigt
    When der Underwriter die Selbstbeteiligung von "10.000 EUR" auf "25.000 EUR" aendert
    Then aktualisiert sich die Praemie sofort im Dokumenttext
    And die Aenderung ist ohne Seitenneuladen sichtbar

  Scenario: Praemienberechnung bei fehlenden Daten
    Given wesentliche Risikodaten fehlen
    When der Underwriter den Abschnitt "Kalkulation" oeffnet
    Then wird ein Hinweis angezeigt mit den fehlenden Datenfeldern
    And keine Praemie wird berechnet
```

## UI Notes

- Praemie steht direkt im Angebotstext als hervorgehobenes Feld.
- Selbstbeteiligung und andere Parameter als editierbare Inline-Felder.
- Live-Aktualisierung ohne merkbare Verzoegerung.
- Waehrungsformat: EUR mit Tausenderpunkt (z.B. "125.340 EUR").
