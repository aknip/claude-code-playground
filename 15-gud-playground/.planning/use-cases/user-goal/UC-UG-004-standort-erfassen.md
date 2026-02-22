# UC-UG-004: Standort erfassen

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-UG-004 |
| **Level** | User-Goal |
| **Parent** | UC-S-002 (Risiko bewerten) |
| **Name** | Standort erfassen |
| **Priority** | Must |
| **Phase** | Phase 2 in ROADMAP.md |
| **Status** | Draft |
| **Created** | 2026-02-22 |
| **Exploration Ref** | UG-E-004 |

## Goal

Der Underwriter erfasst Standortdaten (Adresse, Gebaeudetyp, Baujahr, Werte, Gefahren) als eigenen Abschnitt im Dokument und kann beliebig viele Standorte hinzufuegen.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur |

## Trigger

Der Underwriter klickt "+ Standort hinzufuegen" im Standort-Bereich des Dokuments.

## Preconditions

- Ein Vorgang ist im Dokument-UI geoeffnet.
- Basisdaten sind erfasst (UC-UG-002).

## Main Success Scenario

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 1 | Underwriter | Klickt "+ Standort hinzufuegen" im Dokument. |
| 2 | System | Fuegt einen neuen Standort-Abschnitt ins Dokument ein. |
| 3 | Underwriter | Gibt die Adresse des Standorts ein. |
| 4 | System | Loest Datenanreicherung aus: Naturgefahrzonen werden automatisch befuellt (UC-UG-005). |
| 5 | Underwriter | Fuellt Gebaeudetyp, Baujahr, Gebaeuewert, Inventarwert aus. |
| 6 | Underwriter | Erfasst standortspezifische Gefahren. |
| 7 | System | Speichert alle Daten automatisch. |
| 8 | System | Navigator zeigt Fortschritt fuer diesen Standort. |
| 9 | System | Navigator aktualisiert Gesamtfortschritt fuer "Standorte". |

## Alternative Scenarios

### A1: Standort entfernen

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 1a | Underwriter | Klickt "Standort entfernen" bei einem bestehenden Standort-Abschnitt. |
| 2a | System | Zeigt Bestaetigung: "Standort wirklich entfernen?" |
| 3a | Underwriter | Bestaetigt. |
| 4a | System | Entfernt den Standort-Abschnitt aus dem Dokument. |
| 5a | System | Aktualisiert den Navigator. |

### A2: Mehrere Standorte erfassen

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 9a | Underwriter | Klickt erneut "+ Standort hinzufuegen". |
| 9b | System | Fuegt weiteren Standort-Abschnitt hinzu. Schritte 3-9 wiederholen. |

## Postconditions

- Mindestens ein Standort-Abschnitt ist im Dokument vorhanden.
- Standortdaten sind gespeichert (Adresse, Gebaeudetyp, Baujahr, Werte, Gefahren).
- Navigator zeigt aktualisierten Fortschritt fuer "Standorte".
- Ggf. Naturgefahrzonen automatisch befuellt.

## Acceptance Criteria

```gherkin
Feature: Standort erfassen
  Als Underwriter
  moechte ich Standortdaten im Dokument erfassen
  damit die Risikoinformationen pro Standort strukturiert vorliegen.

  Scenario: Neuen Standort hinzufuegen
    Given ein Vorgang ist im Dokument-UI geoeffnet
    When der Underwriter auf "+ Standort hinzufuegen" klickt
    Then wird ein neuer Standort-Abschnitt im Dokument eingefuegt
    And der Abschnitt enthaelt Felder fuer Adresse, Gebaeudetyp, Baujahr, Gebaeuewert, Inventarwert, Gefahren

  Scenario: Standortdaten ausfuellen
    Given ein Standort-Abschnitt existiert im Dokument
    When der Underwriter die Adresse "Industriestr. 42, 40213 Duesseldorf" eingibt
    And den Gebaeudetyp "Produktionshalle" eingibt
    And das Baujahr "1995" eingibt
    And den Gebaeuewert "5.000.000 EUR" eingibt
    Then werden alle Daten automatisch gespeichert
    And der Navigator zeigt erhoehten Fortschritt fuer diesen Standort

  Scenario: Standort entfernen
    Given ein Standort-Abschnitt existiert im Dokument
    When der Underwriter auf "Standort entfernen" klickt
    And die Bestaetigung bestaetigt
    Then wird der Standort-Abschnitt aus dem Dokument entfernt
    And der Navigator wird aktualisiert

  Scenario: Mehrere Standorte verwalten
    Given zwei Standort-Abschnitte existieren im Dokument
    Then zeigt der Navigator den Fortschritt fuer jeden Standort einzeln
    And den Gesamtfortschritt fuer den Bereich "Standorte"
```

## UI Notes

- Jeder Standort ist ein visuell abgegrenzter Abschnitt im Dokument.
- "+ Standort hinzufuegen" Button am Ende des Standort-Bereichs.
- "Standort entfernen" als dezenter Link im Abschnitt.
- Inline-Felder im gleichen Stil wie Basisdaten.
