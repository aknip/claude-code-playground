# UC-UG-005: Daten anreichern lassen

## Metadata

| Field | Value |
|-------|-------|
| **ID** | UC-UG-005 |
| **Level** | User-Goal |
| **Parent** | UC-S-005 (Daten anreichern) |
| **Name** | Daten anreichern lassen |
| **Priority** | Must |
| **Phase** | Phase 2 in ROADMAP.md |
| **Status** | Draft |
| **Created** | 2026-02-22 |
| **Exploration Ref** | UG-E-005 |

## Goal

Der Underwriter profitiert von automatisch angereicherten Daten aus externen Quellen und kann diese pruefen und bei Bedarf ueberschreiben.

## Actors

| Actor | Role |
|-------|------|
| Underwriter | Primaerer Akteur -- gibt Trigger-Daten ein, prueft Ergebnisse |
| Externe Datenquellen | Unterstuetzend -- liefern Daten |

## Trigger

Der Underwriter gibt einen Firmennamen oder eine Adresse in ein Dokument-Feld ein.

## Preconditions

- Ein Vorgang ist im Dokument-UI geoeffnet.
- Externe Datenquellen sind verfuegbar.

## Main Success Scenario

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 1 | Underwriter | Gibt den Firmennamen ein (z.B. "Muster GmbH"). |
| 2 | System | Erkennt die Eingabe und fragt externe Datenquellen ab. |
| 3 | System | Befuellt automatisch: Branche, Mitarbeiteranzahl, Umsatz aus Handelsregister. |
| 4 | System | Befuellt automatisch: Branchenrisikoprofil. |
| 5 | System | Markiert alle automatisch befuellten Felder mit blauem Rand. |
| 6 | Underwriter | Sieht die angereicherten Daten und die blaue Markierung. |
| 7 | Underwriter | Prueft die Daten und behaelt oder ueberschreibt sie. |

## Alternative Scenarios

### A1: Adresseingabe loest Naturgefahrzonen aus

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 1a | Underwriter | Gibt eine Standort-Adresse ein. |
| 2a | System | Fragt Naturgefahrzonen-Datenquelle ab. |
| 3a | System | Befuellt Naturgefahrzonen (Hochwasser, Erdbeben, Sturm) automatisch mit blauem Rand. |

### A2: Externe Quelle nicht erreichbar

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 2b | System | Externe Datenquelle ist nicht erreichbar. |
| 3b | System | Zeigt dezenten Hinweis: "Automatische Anreicherung nicht verfuegbar". |
| 4b | System | Felder bleiben leer, UW kann manuell ausfuellen. |

### A3: UW ueberschreibt angereicherte Daten

| Schritt | Akteur | Aktion / Systemreaktion |
|---------|--------|------------------------|
| 7a | Underwriter | Aendert ein automatisch befuelltes Feld. |
| 7b | System | Entfernt die blaue Markierung fuer dieses Feld. |
| 7c | System | Speichert den manuellen Wert. |

## Postconditions

- Externe Daten sind im Dokument befuellt (oder Felder bleiben leer bei Nicht-Erreichbarkeit).
- Automatisch befuellte Felder sind blau markiert.
- Manuell ueberschriebene Felder verlieren die blaue Markierung.

## Acceptance Criteria

```gherkin
Feature: Daten anreichern lassen
  Als Underwriter
  moechte ich dass externe Daten automatisch ins Dokument fliessen
  damit ich weniger manuell recherchieren muss.

  Scenario: Firmendaten automatisch anreichern
    Given ein Vorgang ist im Dokument-UI geoeffnet
    When der Underwriter den Firmennamen "Muster GmbH" eingibt
    Then werden Branche, Mitarbeiteranzahl und Umsatz automatisch befuellt
    And die automatisch befuellten Felder haben einen blauen Rand

  Scenario: Naturgefahrzonen bei Adresseingabe
    Given ein Standort-Abschnitt existiert im Dokument
    When der Underwriter die Adresse "Industriestr. 42, 40213 Duesseldorf" eingibt
    Then werden Naturgefahrzonen automatisch befuellt
    And die Felder haben einen blauen Rand

  Scenario: Angereicherte Daten ueberschreiben
    Given ein Feld wurde automatisch mit "Maschinenbau" befuellt und ist blau markiert
    When der Underwriter den Wert auf "Anlagenbau" aendert
    Then wird der neue Wert gespeichert
    And die blaue Markierung wird entfernt

  Scenario: Externe Quelle nicht erreichbar
    Given die externe Datenquelle ist nicht erreichbar
    When der Underwriter einen Firmennamen eingibt
    Then wird ein Hinweis angezeigt: "Automatische Anreicherung nicht verfuegbar"
    And die Felder bleiben leer fuer manuelle Eingabe
```

## UI Notes

- Automatisch befuellte Felder: 4px blauer linker Rand.
- Bei Ueberschreiben: blauer Rand verschwindet.
- Anreicherung geschieht nahtlos ohne separaten Dialog oder Wizard-Schritt.
- Hinweis bei Nicht-Erreichbarkeit: dezenter Toast oder Inline-Hinweis.
