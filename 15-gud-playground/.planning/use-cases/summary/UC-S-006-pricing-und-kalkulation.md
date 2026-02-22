# UC-S-006: Pricing und Kalkulation

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-S-006 |
| **Level** | Summary |
| **Name** | Pricing und Kalkulation |
| **Status** | Draft |
| **Created** | 2026-02-22 |

## Goal

Der Underwriter kann Praemien direkt im Dokument berechnen, Parameter anpassen und die Auswirkungen sofort sehen -- mit Markt-Benchmarks als Orientierung.

## Scope

Underwriting Workbench -- Live-Praemie im Dokument-UI, Benchmark-Vergleich.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur -- passt Parameter an und sieht Live-Praemie |

## Description

Die Praemie steht direkt im Angebotstext und aktualisiert sich live, wenn der UW Parameter aendert. Selbstbeteiligung und andere Praemien-Parameter sind editierbare Felder im Dokument. Bei Aenderung reagiert die Praemie sofort. Am Rand werden Benchmark-Hinweise angezeigt (Marktdurchschnitt und Abweichung). Keine Varianten-Auswahl, sondern direkte Parameter-Steuerung.

## Includes (User-Goal-Level)

| UC-ID | Name | Priority |
|-------|------|----------|
| UC-UG-007 | Praemie berechnen | Must |
| UC-UG-008 | Benchmarks einsehen | Should |

## Extends

_Keine._

## Business Rules

- Praemie wird live im Dokumenttext angezeigt und aktualisiert.
- Selbstbeteiligung ist ein editierbares Inline-Feld.
- Benchmark-Hinweis am Rand zeigt Marktdurchschnitt und Abweichung.
- Keine Varianten-Auswahl -- direkte Parameter-Steuerung.
- Praemienberechnung setzt ausgefuellte Risikodaten voraus.

## Notes

- Mapping: Entspricht den Exploration Use Cases UG-E-007, UG-E-008.
- In Phase 3 der Roadmap geplant.
