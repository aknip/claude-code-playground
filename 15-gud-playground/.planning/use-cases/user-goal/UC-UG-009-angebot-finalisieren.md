# UC-UG-009: Angebot finalisieren

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-UG-009 |
| **Level** | User-Goal |
| **Parent** | UC-S-001 (Neugeschaeft bearbeiten), UC-S-003 (Dokumente erstellen) |
| **Name** | Angebot finalisieren |
| **Priority** | Must |
| **Phase** | Phase 4 in ROADMAP.md |
| **Status** | Draft |
| **Created** | 2026-02-22 |
| **Exploration Ref** | UG-E-009 |

## Goal

Der Underwriter finalisiert das Angebotsdokument und generiert ein PDF fuer den Versand an den Makler/Kunden.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur |

## Trigger

Der Underwriter klickt "Angebot finalisieren" im Dokument, nachdem alle Abschnitte vollstaendig sind.

## Preconditions

- Ein Vorgang ist im Dokument-UI geoeffnet.
- Alle Pflichtabschnitte sind ausgefuellt (Navigator zeigt 100%).
- Risikobewertung ist durchgefuehrt (UC-UG-006).
- Praemie ist berechnet (UC-UG-007).

## Main Success Scenario

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 1 | System | Navigator zeigt 100% Vollstaendigkeit fuer alle Pflichtabschnitte. |
| 2 | Underwriter | Prueft das Dokument final. |
| 3 | Underwriter | Klickt "Angebot finalisieren". |
| 4 | System | Zeigt Zusammenfassung: Versicherungsnehmer, Standorte, Praemie, Risiko-Score. |
| 5 | Underwriter | Bestaetigt die Zusammenfassung. |
| 6 | System | Generiert ein PDF des Angebots. |
| 7 | System | Stellt PDF zum Download bereit. |
| 8 | System | Karte wandert in die Spalte "Angebot" auf dem Board. |

## Alternative Scenarios

### A1: Pflichtabschnitte nicht vollstaendig

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 3a | Underwriter | Klickt "Angebot finalisieren". |
| 4a | System | Zeigt Fehlermeldung: "Folgende Abschnitte sind unvollstaendig: [Liste]". |
| 5a | System | Markiert fehlende Abschnitte im Navigator rot. |

### A2: Vorgang ist freigabepflichtig

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 3b | System | Erkennt, dass der Vorgang freigabepflichtig ist (Zeichnungsvollmacht ueberschritten). |
| 4b | System | Zeigt Hinweis: "Vorgang erfordert Freigabe durch Senior Underwriter". |
| 5b | System | Bietet stattdessen "Zur Freigabe vorlegen" an (UC-UG-010). |

## Postconditions

- PDF des Angebots ist generiert und verfuegbar.
- Karte auf dem Board ist in der Spalte "Angebot".
- Dokument ist als finalisiert markiert.

## Acceptance Criteria

```gherkin
Feature: Angebot finalisieren
  Als Underwriter
  moechte ich das Angebot als PDF finalisieren
  damit ich es an den Makler oder Kunden senden kann.

  Scenario: Angebot erfolgreich finalisieren
    Given alle Pflichtabschnitte sind vollstaendig (100%)
    And die Risikobewertung ist durchgefuehrt
    And die Praemie ist berechnet
    When der Underwriter auf "Angebot finalisieren" klickt
    And die Zusammenfassung bestaetigt
    Then wird ein PDF generiert
    And das PDF steht zum Download bereit
    And die Board-Karte wandert in die Spalte "Angebot"

  Scenario: Finalisierung bei unvollstaendigen Abschnitten verhindern
    Given der Abschnitt "Standorte" ist bei 60% Vollstaendigkeit
    When der Underwriter auf "Angebot finalisieren" klickt
    Then wird eine Fehlermeldung mit den fehlenden Abschnitten angezeigt
    And kein PDF wird generiert

  Scenario: Freigabepflichtiger Vorgang
    Given die Zeichnungsvollmacht ist ueberschritten
    When der Underwriter auf "Angebot finalisieren" klickt
    Then wird der Hinweis "Vorgang erfordert Freigabe" angezeigt
    And stattdessen wird "Zur Freigabe vorlegen" angeboten
```

## UI Notes

- "Angebot finalisieren" Button prominent am Ende des Dokuments.
- Zusammenfassung als modaler Dialog mit Kerndaten.
- PDF-Download als Button nach erfolgreicher Generierung.
- Freigabe-Hinweis in orange/gelb.
