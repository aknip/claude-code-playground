# Roadmap — Scenario: Kanban-Board + Dokument als UI

> Generated: 2026-02-22

## Phase Overview

```mermaid
gantt
    title Roadmap — Kanban-Board + Dokument als UI
    dateFormat  YYYY-MM-DD
    axisFormat  %b %Y

    section Phase 1 – Kanban-Board + Basisdokument
    Kanban-Board mit 6 Spalten (Drag & Drop)        :p1a, 2026-03-02, 3w
    Card CRUD (anlegen, bearbeiten, löschen)         :p1b, after p1a, 2w
    Editierbares Dokumenten-Template (Basisdaten)    :p1c, after p1a, 3w
    Inline-Felder für Basisdaten im Dokument         :p1d, after p1c, 2w
    Board-Übersicht & Filterung                      :p1e, after p1b, 1w

    section Phase 2 – Standort-Erfassung + Datenanreicherung
    Standort-Abschnitte im Dokument (hinzufügen/entfernen) :p2a, 2026-05-11, 3w
    Standort-Felder & Validierung                          :p2b, after p2a, 2w
    Externe Datenanreicherung (API-Anbindung)              :p2c, after p2a, 3w
    Visuelle Markierung angereicherter Daten (blauer Rand) :p2d, after p2c, 1w

    section Phase 3 – Risikobewertung + Kalkulation
    Risikobewertungs-Abschnitt im Dokument       :p3a, 2026-07-06, 2w
    Scoring-Logik & manueller Trigger             :p3b, after p3a, 3w
    Live-Prämienberechnung im Dokument            :p3c, after p3b, 3w
    SB-Anpassung & Auswirkung auf Prämie          :p3d, after p3c, 1w
    Benchmark-Hinweise (Marktvergleich am Rand)   :p3e, after p3b, 2w

    section Phase 4 – Angebot & Dokumente
    PDF-Generierung aus Dokument                  :p4a, 2026-09-28, 3w
    Angebots-Finalisierung & Zusammenfassung      :p4b, after p4a, 2w
    Freigabe-Workflow (Senior UW)                 :p4c, after p4b, 3w
    Benachrichtigungen & Audit-Trail              :p4d, after p4c, 1w

    section Phase 5 – Bestandsverwaltung
    Renewal-Vorgänge (vorausgefülltes Dokument)   :p5a, 2026-12-07, 3w
    Nachtrags-Vorgänge (vorausgefülltes Dokument) :p5b, after p5a, 3w
    Farbcodierte Karten nach Vorgangstyp           :p5c, after p5a, 1w
    Ein Board für alle Typen (Neu, Renewal, Nachtrag) :p5d, after p5b, 2w
```

## Phase Details

| Phase | Ziel | User-Goal UCs (Entwurf) | Geschätzte Komplexität |
|-------|------|--------------------------|------------------------|
| **Phase 1 — Kanban-Board + Basisdokument** | Funktionsfähiges Kanban-Board mit 6 Prozesschritt-Spalten, Card-CRUD und ein editierbares Dokumenten-Template mit Inline-Feldern für Basisdaten (VN, Branche, Vertragsdaten). | UG-E-001: Vorgang anlegen — Neue Karte auf Board, leeres Template öffnen | **Hoch** |
| | | UG-E-002: Basisdaten erfassen — Inline-Felder im Dokument ausfüllen | |
| | | UG-E-003: Board-Übersicht — Alle Vorgänge auf dem Kanban-Board sehen | |
| **Phase 2 — Standort-Erfassung + Datenanreicherung** | Standort-Abschnitte im Dokument dynamisch hinzufügen/entfernen, externe Datenquellen anbinden und angereicherte Felder visuell mit blauem Rand markieren. | UG-E-004: Standort erfassen — Standort-Abschnitt im Dokument hinzufügen/ausfüllen | **Hoch** |
| | | UG-E-005: Daten anreichern — Automatische Anreicherung mit Markierung | |
| **Phase 3 — Risikobewertung + Kalkulation** | Risikobewertungs-Abschnitt mit manuell auslösbarem Scoring, Live-Prämienberechnung direkt im Dokument und Benchmark-Hinweise am Dokumentrand. | UG-E-006: Risiko bewerten — Bewertung im Dokument triggern, Scoring einsehen | **Sehr hoch** |
| | | UG-E-007: Prämie berechnen — Live-Prämie im Dokument, SB anpassen | |
| | | UG-E-008: Benchmarks einsehen — Marktvergleich am Rand | |
| **Phase 4 — Angebot & Dokumente** | PDF-Generierung aus dem Dokument, Finalisierung des Angebots mit Zusammenfassung und Freigabe-Workflow über Senior Underwriter. | UG-E-009: Angebot finalisieren — PDF generieren, Zusammenfassung | **Mittel** |
| | | UG-E-010: Freigabe erteilen — Vorgang zur Freigabe vorlegen (Senior UW) | |
| **Phase 5 — Bestandsverwaltung** | Renewal- und Nachtrags-Vorgänge mit vorausgefüllten Dokumenten, farbcodierte Karten nach Vorgangstyp, ein gemeinsames Board für alle Vorgangsarten. | UG-E-011: Renewal bearbeiten — Vorausgefülltes Dokument für Vertragserneuerung | **Mittel** |
| | | UG-E-012: Nachtrag bearbeiten — Vorausgefülltes Dokument für Vertragsänderung | |
