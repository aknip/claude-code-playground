# UC-UG-008: Benchmarks einsehen

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-UG-008 |
| **Level** | User-Goal |
| **Parent** | UC-S-006 (Pricing und Kalkulation) |
| **Name** | Benchmarks einsehen |
| **Priority** | Should |
| **Phase** | Phase 3 in ROADMAP.md |
| **Status** | Draft |
| **Created** | 2026-02-22 |
| **Exploration Ref** | UG-E-008 |

## Goal

Der Underwriter sieht Markt-Benchmarks (Marktdurchschnitt und Abweichung) am Rand des Dokuments, um die kalkulierte Praemie einzuordnen.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur |

## Trigger

Die Praemie wurde berechnet (UC-UG-007) und der Kalkulationsabschnitt ist sichtbar.

## Preconditions

- Ein Vorgang ist im Dokument-UI geoeffnet.
- Eine Praemie ist berechnet (UC-UG-007).
- Benchmark-Daten sind verfuegbar.

## Main Success Scenario

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 1 | System | Zeigt Benchmark-Hinweis am rechten Rand neben der Praemie. |
| 2 | System | Zeigt Marktdurchschnitt fuer vergleichbare Risiken. |
| 3 | System | Zeigt Abweichung der kalkulierten Praemie vom Marktdurchschnitt. |
| 4 | Underwriter | Liest den Benchmark-Vergleich. |
| 5 | Underwriter | Passt ggf. Parameter an, um sich dem Markt anzunaehern. |

## Alternative Scenarios

### A1: Keine Benchmark-Daten verfuegbar

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 1a | System | Keine Benchmark-Daten fuer diese Risikoklasse verfuegbar. |
| 2a | System | Zeigt Hinweis: "Keine Vergleichsdaten verfuegbar". |

## Postconditions

- Benchmark-Informationen sind am Rand des Dokuments sichtbar.
- Der Underwriter hat eine Markteinordnung seiner Praemie.

## Acceptance Criteria

```gherkin
Feature: Benchmarks einsehen
  Als Underwriter
  moechte ich Markt-Benchmarks neben der Praemie sehen
  damit ich meine Kalkulation am Markt einordnen kann.

  Scenario: Benchmark-Hinweis anzeigen
    Given eine Praemie ist im Dokument berechnet
    And Benchmark-Daten sind verfuegbar
    When der Underwriter den Kalkulationsabschnitt sieht
    Then wird am rechten Rand der Marktdurchschnitt angezeigt
    And die Abweichung der eigenen Praemie vom Marktdurchschnitt

  Scenario: Benchmark aktualisiert sich mit Praemie
    Given ein Benchmark-Hinweis wird angezeigt
    When der Underwriter die Selbstbeteiligung aendert
    And die Praemie sich live aktualisiert
    Then aktualisiert sich auch die Abweichung zum Benchmark

  Scenario: Keine Benchmark-Daten verfuegbar
    Given fuer diese Risikoklasse sind keine Benchmark-Daten vorhanden
    When die Praemie berechnet wird
    Then wird der Hinweis "Keine Vergleichsdaten verfuegbar" angezeigt
```

## UI Notes

- Benchmark als dezenter Hinweis am rechten Rand des Dokuments.
- Farbcodierung: gruen wenn nah am Markt, gelb bei moderater Abweichung, rot bei starker Abweichung.
- Kein separater Dialog -- integriert in das Dokument-Layout.
