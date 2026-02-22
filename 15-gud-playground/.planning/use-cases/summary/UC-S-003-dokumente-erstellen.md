# UC-S-003: Dokumente erstellen

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-S-003 |
| **Level** | Summary |
| **Name** | Dokumente erstellen |
| **Status** | Draft |
| **Created** | 2026-02-22 |

## Goal

Das System generiert Angebote und Policen automatisch aus den im Dokument erfassten Risikodaten -- der Underwriter arbeitet im Zieldokument und kann per Knopfdruck ein finales PDF exportieren.

## Scope

Underwriting Workbench -- Dokument-Generierung, PDF-Export, Police-Erstellung.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur -- finalisiert Dokument und loest Export aus |

## Description

Das Dokument existiert von Anfang an als Angebotstemplate und wird vom Underwriter schrittweise ausgefuellt. Am Ende des Prozesses wird das Dokument als PDF exportiert. Die Police wird als separates Dokument generiert. Das System stellt sicher, dass alle Pflichtfelder ausgefuellt und die Bewertung abgeschlossen ist, bevor der Export moeglich ist.

## Includes (User-Goal-Level)

| UC-ID | Name | Priority |
|-------|------|----------|
| UC-UG-009 | Angebot finalisieren | Must |

## Extends

_Keine._

## Business Rules

- Das Angebotstemplate ist spezifisch fuer Sach-Industrieversicherung.
- PDF-Export nur moeglich bei vollstaendig ausgefuellten Pflichtfeldern.
- Police ist ein separates Dokument, das aus den Angebotsdaten generiert wird.
- Dokument-Layout im Google-Docs-Stil: weisses Dokument auf hellgrauem Hintergrund, max 800px zentriert.

## Notes

- Mapping: UC-UG-009 gehoert sowohl zu UC-S-001 als auch UC-S-003 (shared Use Case).
- In Phase 4 der Roadmap geplant.
