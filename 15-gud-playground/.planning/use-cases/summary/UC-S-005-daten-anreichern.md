# UC-S-005: Daten anreichern

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-S-005 |
| **Level** | Summary |
| **Name** | Daten anreichern |
| **Status** | Draft |
| **Created** | 2026-02-22 |

## Goal

Risikoinformationen werden automatisch aus externen Quellen ergaenzt, sobald der Underwriter Firma oder Adresse eingibt -- weniger manuelle Recherche, mehr Datenqualitaet.

## Scope

Underwriting Workbench -- automatische Datenanreicherung im Dokument-UI mit visueller Markierung.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur -- gibt Trigger-Daten ein, prueft und ueberschreibt ggf. |
| Externe Datenquellen | Unterstuetzend -- liefern Handelsregister, Branchenprofile, Naturgefahrzonen |

## Description

Externe Daten fliessen automatisch ins Dokument, sobald der UW Firma oder Adresse eingibt. Handelsregister-Daten (Branche, Mitarbeiter, Umsatz), Branchenrisikoprofile und Naturgefahrzonen werden automatisch befuellt. Automatisch befuellte Felder erhalten eine visuelle Markierung (blauer Rand), damit der UW sieht, was vom System kam. Der UW kann jederzeit ueberschreiben.

## Includes (User-Goal-Level)

| UC-ID | Name | Priority |
|-------|------|----------|
| UC-UG-005 | Daten anreichern lassen | Must |

## Extends

_Keine._

## Business Rules

- Anreicherung wird automatisch bei Eingabe von Firma oder Adresse ausgeloest.
- Automatisch befuellte Felder erhalten einen blauen Rand (4px links).
- UW kann automatisch befuellte Felder jederzeit ueberschreiben.
- Externe Quellen: Handelsregister, Branchenrisikoprofile, Naturgefahrzonen.

## Notes

- Mapping: Entspricht dem Exploration Use Case UG-E-005.
- In Phase 2 der Roadmap geplant (zusammen mit Standort-Erfassung).
