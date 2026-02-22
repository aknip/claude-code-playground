# UC-S-004: Bestand verwalten

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-S-004 |
| **Level** | Summary |
| **Name** | Bestand verwalten |
| **Status** | Draft |
| **Created** | 2026-02-22 |

## Goal

Der Underwriter kann bestehende Vertraege verwalten, Renewals vorbereiten und Nachtraege erfassen -- mit vorausgefuellten Dokumenten aus Bestandsdaten auf demselben Kanban-Board.

## Scope

Underwriting Workbench -- Bestandsverwaltung, Renewals, Nachtraege auf dem gemeinsamen Board.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur -- bearbeitet Renewals und Nachtraege |

## Description

Alle Vorgangstypen laufen auf demselben Kanban-Board. Renewals (gelb markiert) und Nachtraege (blau markiert) starten mit vorausgefuelltem Dokument aus Bestandsdaten. Der Underwriter prueft und aktualisiert das Dokument -- der Prozess ist identisch zum Neugeschaeft. Aenderungen gegenueber dem Bestand werden visuell markiert.

## Includes (User-Goal-Level)

| UC-ID | Name | Priority |
|-------|------|----------|
| UC-UG-011 | Renewal bearbeiten | Should |
| UC-UG-012 | Nachtrag bearbeiten | Should |

## Extends

_Keine._

## Business Rules

- Renewals werden gelb markiert auf dem Board.
- Nachtraege werden blau markiert auf dem Board.
- Bestandsvorgaenge starten mit vorausgefuelltem Dokument.
- Aenderungen gegenueber dem Bestand werden visuell hervorgehoben.
- Gleicher 6-Spalten-Prozess wie Neugeschaeft.

## Notes

- Mapping: Entspricht den Exploration Use Cases UG-E-011, UG-E-012.
- In Phase 5 der Roadmap geplant.
