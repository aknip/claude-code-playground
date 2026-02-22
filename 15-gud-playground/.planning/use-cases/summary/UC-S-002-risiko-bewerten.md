# UC-S-002: Risiko bewerten

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-S-002 |
| **Level** | Summary |
| **Name** | Risiko bewerten |
| **Status** | Draft |
| **Created** | 2026-02-22 |

## Goal

Der Underwriter kann Risikoinformationen strukturiert erfassen, Standortdaten pflegen und eine systematische Risikobewertung mit Scoring und Zeichnungsrichtlinien-Pruefung durchfuehren -- als Basis fuer die Praemien-Kalkulation.

## Scope

Underwriting Workbench -- Standort-Abschnitte im Dokument-UI und Risikobewertungs-Abschnitt mit manuellem Trigger.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur -- erfasst Risikodaten und triggert Bewertung |

## Description

Standortdaten werden als eigene Abschnitte im Dokument erfasst (Adresse, Gebaeudetyp, Baujahr, Werte, Gefahren). Der Underwriter kann beliebig viele Standorte hinzufuegen. Im separaten Bewertungs-Abschnitt kann der UW die Risikobewertung manuell ausloesen. Das System berechnet dann Risiko-Score, prueft Zeichnungsrichtlinien und zeigt Hinweise und Vollstaendigkeit.

## Includes (User-Goal-Level)

| UC-ID | Name | Priority |
|-------|------|----------|
| UC-UG-004 | Standort erfassen | Must |
| UC-UG-006 | Risiko bewerten | Must |

## Extends

_Keine._

## Business Rules

- Jeder Standort ist ein eigener Abschnitt im Dokument (Adresse, Gebaeudetyp, Baujahr, Gebaeuewert, Inventarwert, Gefahren).
- Risikobewertung wird manuell vom UW getriggert ("Bewertung starten").
- Risiko-Score wird auf einer 5er-Skala dargestellt (z.B. 3.4/5 -- Mittel).
- Zeichnungsrichtlinien-Pruefung: OK oder Ueberschreitung.
- Der Navigator zeigt Fortschritt pro Standort.

## Notes

- Mapping: Entspricht den Exploration Use Cases UG-E-004, UG-E-006.
- Standort-Abschnitte koennen einzeln angereichert werden (UC-S-005).
