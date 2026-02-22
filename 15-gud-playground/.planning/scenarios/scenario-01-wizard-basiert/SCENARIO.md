# Scenario: Wizard-basiert

> Core Idea: Der Underwriter wird Schritt für Schritt durch den gesamten Vorgang geführt — von der Submission-Erfassung über Risikobewertung und Kalkulation bis zum fertigen Angebot. Jeder Schritt zeigt genau, was als Nächstes zu tun ist.
> Created: 2026-02-21
> Last Updated: 2026-02-21

## Mapping to Summary-Level Use Cases

| UC | Name | Implementation Approach in this Scenario |
|----|------|------------------------------------------|
| UC-S-001 | Neugeschäft bearbeiten | Wizard-geführte manuelle Erfassung: Underwriter legt neuen Vorgang an und wird Schritt für Schritt durch Risikodaten-Erfassung geführt |
| UC-S-002 | Risiko bewerten | Eingebettet in Wizard-Schritte 2+3: Standorte einzeln nacheinander erfassen (je Standort: Adresse, Gebäude, Werte, Gefahren), dann Bewertung/Scoring |
| UC-S-003 | Dokumente erstellen | Komplett automatisch: System generiert PDF aus den erfassten Daten. Underwriter prüft und gibt frei. Kein manuelles Editing. |
| UC-S-004 | Bestand verwalten | Gleicher 5-Schritt-Wizard wie Neugeschäft, aber vorausgefüllt mit Bestandsdaten. Renewals und Nachträge laufen durch denselben Prozess. |
| UC-S-005 | Daten anreichern | Eigener Wizard-Zwischenschritt nach Basisdaten: System zeigt externe Daten (Handelsregister, Branche, Naturgefahrzonen), UW bestätigt/korrigiert |
| UC-S-006 | Pricing & Kalkulation | System generiert automatisch 3 Standard-Varianten (niedrige/mittlere/hohe SB). UW wählt eine aus oder passt Parameter manuell an. |

## Interaction Concept & User Workflows

### Wizard-Konzept: Lineare Kette

Der Wizard führt den Underwriter in einer **festen Reihenfolge** durch den Vorgang. Jeder Schritt muss abgeschlossen sein, bevor der nächste beginnt. Kein Überspringen möglich.

**Wizard-Schritte (Neugeschäft) — 6 Schritte:**

1. **Basisdaten** — Versicherungsnehmer, Makler, Sparte, Vertragsbeginn
2. **Datenanreicherung** — System zeigt externe Daten (Handelsregister, Branchenrisiko, Naturgefahrzonen), UW bestätigt/korrigiert (UC-S-005)
3. **Risikodaten** — Standorte, Gebäude, Werte, Gefahren (UC-S-002)
4. **Risikobewertung** — Scoring, Vollständigkeitsprüfung, Zeichnungsrichtlinien (UC-S-002)
5. **Kalkulation** — Prämienberechnung, Varianten, Benchmarks (UC-S-006)
6. **Angebot** — Dokumentenerstellung, Zusammenfassung, Freigabe (UC-S-003)

### Workflow 1: Neuen Vorgang anlegen (UC-S-001)

1. Underwriter klickt "Neuer Vorgang"
2. Wizard startet mit Schritt 1: Basisdaten erfassen
3. Nach Abschluss jedes Schritts → automatisch weiter zum nächsten
4. Fortschrittsanzeige zeigt aktuellen Stand im Gesamtprozess
5. Am Ende steht ein fertiges Angebot zur Freigabe

### Workflow 2: Datenanreicherung prüfen (UC-S-005, Wizard-Schritt 2)

1. Nach Abschluss der Basisdaten startet automatisch die Abfrage externer Quellen
2. System zeigt gefundene Daten: Handelsregister-Info, Branchenrisikoprofil, Naturgefahrzonen der bekannten Adressen
3. Underwriter prüft die angereicherten Daten, bestätigt oder korrigiert
4. Bestätigte Daten fließen automatisch in die nächsten Wizard-Schritte ein

### Workflow 3: Standorte/Risiken erfassen (UC-S-002, innerhalb Wizard-Schritt 3)

1. Wizard zeigt "Standort hinzufügen"
2. Underwriter erfasst einen Standort vollständig: Adresse, Gebäudedetails, Werte, spezifische Gefahren
3. Nach Abschluss: "Weiteren Standort hinzufügen?" oder "Weiter zur Risikobewertung"
4. Jeder Standort wird einzeln durchlaufen — klare Struktur auch bei vielen Standorten
5. Übersicht aller erfassten Standorte mit Zusammenfassung vor Weitergang

### Workflow 4: Renewal / Nachtrag bearbeiten (UC-S-004)

1. Underwriter öffnet bestehenden Vertrag aus der Vertragsliste oder aus einem Renewal-Hinweis
2. System startet denselben 6-Schritt-Wizard, **vorausgefüllt mit den bestehenden Vertragsdaten**
3. Underwriter überprüft/aktualisiert jeden Schritt — Änderungen werden hervorgehoben
4. Bei Nachträgen: nur die geänderten Schritte müssen durchlaufen werden (Rest bleibt vorausgefüllt)
5. Am Ende: Nachtragsdokument oder neues Angebot für Renewal wird generiert

## Capabilities & Features

| Feature | Description | Related UC | Priority |
|---------|------------|------------|----------|
| Manuelle Vorgangsanlage | Neuer Vorgang per Wizard mit schrittweiser Datenerfassung | UC-S-001 | Must |
| Linearer Wizard | Feste Reihenfolge: Basisdaten → Anreicherung → Risiko → Bewertung → Kalkulation → Angebot (6 Schritte). Kein Überspringen. | UC-S-001 | Must |
| Fortschrittsanzeige | Stepper/Progress-Bar zeigt aktuellen Schritt und Gesamtfortschritt | UC-S-001 | Must |
| Standort-Einzelerfassung | Jeder Standort wird einzeln im Wizard erfasst: Adresse, Gebäude, Werte, Gefahren. Loop bis alle Standorte erfasst. | UC-S-002 | Must |
| Auto-Dokumentenerstellung | PDF wird vollautomatisch aus erfassten Daten generiert. Kein manuelles Editing, nur Prüfen + Freigabe. | UC-S-003 | Must |
| Vorausgefüllter Wizard (Bestand) | Gleicher Wizard für Renewals/Nachträge, vorausgefüllt mit Bestandsdaten. Änderungen hervorgehoben. | UC-S-004 | Must |
| Datenanreicherung-Schritt | Dedizierter Wizard-Schritt nach Basisdaten: System holt externe Daten, zeigt sie dem UW zur Bestätigung/Korrektur. | UC-S-005 | Must |
| Auto-Varianten | System generiert automatisch 3 Standard-Varianten (niedrige/mittlere/hohe SB). UW wählt eine oder passt Parameter an. | UC-S-006 | Must |

## UI Concept

### Layout
- **Header:** Appname + Nutzer-Info
- **Sidebar:** Navigation (Dashboard, Neuer Vorgang, Alle Vorgänge, Renewals, Verträge)
- **Content:** Max 960px, Wizard-Stepper oben, Cards für Formular-Sektionen

### Wizard UI
- **Stepper:** 6 Schritte als nummerierte Kreise mit Verbindungslinien. Aktiver Schritt hervorgehoben, abgeschlossene mit Häkchen (grün).
- **Pro Schritt:** Card mit Titel, Beschreibung, Formularfeldern
- **Navigation:** "Zurück" / "Weiter" Buttons am unteren Rand. "Weiter" nur aktiv, wenn Pflichtfelder ausgefüllt.

### Dashboard
- Tabelle aller Vorgänge mit: Vorgangsnummer, VN, Makler, Status, aktueller Wizard-Schritt, Erstellt-Datum
- "Neuer Vorgang" Button prominent oben

### Farbschema
- Neutral/Shadcn-basiert: Schwarz/Weiß/Grau als Basis
- Grün für Erfolg/Abgeschlossen
- Gelb/Orange für Warnungen/Mittel
- Blau für "In Bearbeitung"

## Proposed User-Goal Use Cases

| ID (Draft) | Name | Related UC-S | Description |
|-------------|------|--------------|-------------|
| UG-E-001 | Vorgang anlegen | UC-S-001 | Underwriter legt neuen Vorgang an und erfasst Basisdaten |
| UG-E-002 | Standort erfassen | UC-S-001, UC-S-002 | Standort mit Gebäuden, Werten, Gefahren einzeln im Wizard erfassen |
| UG-E-003 | Vorgänge anzeigen | UC-S-001 | Dashboard mit Übersicht aller Vorgänge und Status |
| UG-E-004 | Risiko bewerten | UC-S-002 | Scoring, Vollständigkeitsprüfung, Zeichnungsrichtlinien prüfen |
| UG-E-005 | Prämie berechnen | UC-S-006 | Prämienberechnung auf Basis der Risikodaten |
| UG-E-006 | Varianten vergleichen | UC-S-006 | Verschiedene SB-/Prämien-Varianten nebeneinander vergleichen |
| UG-E-007 | Angebot erstellen | UC-S-001, UC-S-003 | Zusammenfassung + Angebotsdokument generieren |
| UG-E-008 | Dokument generieren | UC-S-003 | PDF-Generierung für Angebot, Deckungsnote |
| UG-E-009 | Freigabe erteilen | UC-S-001 | Vorgang zur Freigabe vorlegen (ggf. Senior Underwriter) |
| UG-E-010 | Bestand verwalten | UC-S-004 | Vertragslaufzeiten, Renewals, Nachträge |
| UG-E-011 | Daten anreichern | UC-S-005 | Externe Datenquellen für Risikoinformationen |
| UG-E-012 | Benchmarks nutzen | UC-S-006 | Portfolio-Benchmarks für Pricing |

> Note: IDs with prefix "UG-E" (Exploration) — will be converted
> to official UC-UG-XXX IDs upon finalization.

## Proposed Roadmap Phases

| Phase | Goal | Use Cases | Rationale |
|-------|------|-----------|-----------|
| 1 | Basis-Wizard: Basisdaten + Standorterfassung + Dashboard | UG-E-001, UG-E-002, UG-E-003 | Kernprozess lauffähig machen — Daten erfassen und Vorgänge sehen |
| 2 | Bewertung & Kalkulation | UG-E-004, UG-E-005, UG-E-006 | Underwriting-Kernwertschöpfung: Risiko bewerten und Prämie berechnen |
| 3 | Angebot & Dokumente | UG-E-007, UG-E-008, UG-E-009 | Prozess end-to-end abschließbar: Angebot erstellen und freigeben |
| 4 | Bestand & Erweiterung | UG-E-010, UG-E-011, UG-E-012 | Bestandsgeschäft, externe Daten und Benchmarks als Erweiterung |

## Open Questions & Notes

- [None yet]
