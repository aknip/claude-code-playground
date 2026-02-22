# Use Case Index

> Underwriting Workbench -- Traceability Index
> Generated: 2026-02-22

## Metrics

| Metric | Count |
|--------|-------|
| Summary-Level | 6 |
| User-Goal-Level | 12 |
| Subfunction-Level | 0 (created during planning) |
| Actors | 3 |

## Actors

| Actor | Type | Primary Goals | Use Cases |
|-------|------|---------------|-----------|
| Underwriter | End User (primaer) | Submissions bearbeiten, Risiken bewerten, Angebote erstellen, Bestand verwalten | UC-UG-001 bis UC-UG-012 |
| Senior Underwriter | End User | Vorgaenge pruefen und freigeben bei Ueberschreitung der Zeichnungsvollmacht | UC-UG-010 |
| Externe Datenquellen | System | Firmendaten, Branchenrisikoprofile, Naturgefahrzonen bereitstellen | UC-UG-005 |

## Summary-Level Use Cases

| ID | Name | User-Goal Children | Status |
|----|------|--------------------|--------|
| UC-S-001 | Neugeschaeft bearbeiten | UC-UG-001, UC-UG-002, UC-UG-003, UC-UG-009, UC-UG-010 | Draft |
| UC-S-002 | Risiko bewerten | UC-UG-004, UC-UG-006 | Draft |
| UC-S-003 | Dokumente erstellen | UC-UG-009 | Draft |
| UC-S-004 | Bestand verwalten | UC-UG-011, UC-UG-012 | Draft |
| UC-S-005 | Daten anreichern | UC-UG-005 | Draft |
| UC-S-006 | Pricing und Kalkulation | UC-UG-007, UC-UG-008 | Draft |

## User-Goal-Level Use Cases

| ID | Name | Parent(s) | Priority | Phase | Exploration Ref | Status |
|----|------|-----------|----------|-------|-----------------|--------|
| UC-UG-001 | Vorgang anlegen | UC-S-001 | Must | **Phase 1** | UG-E-001 | Draft |
| UC-UG-002 | Basisdaten erfassen | UC-S-001 | Must | **Phase 1** | UG-E-002 | Draft |
| UC-UG-003 | Board-Uebersicht nutzen | UC-S-001 | Must | **Phase 1** | UG-E-003 | Draft |
| UC-UG-004 | Standort erfassen | UC-S-002 | Must | **Phase 2** | UG-E-004 | Draft |
| UC-UG-005 | Daten anreichern lassen | UC-S-005 | Must | **Phase 2** | UG-E-005 | Draft |
| UC-UG-006 | Risiko bewerten | UC-S-002 | Must | **Phase 3** | UG-E-006 | Draft |
| UC-UG-007 | Praemie berechnen | UC-S-006 | Must | **Phase 3** | UG-E-007 | Draft |
| UC-UG-008 | Benchmarks einsehen | UC-S-006 | Should | **Phase 3** | UG-E-008 | Draft |
| UC-UG-009 | Angebot finalisieren | UC-S-001, UC-S-003 | Must | **Phase 4** | UG-E-009 | Draft |
| UC-UG-010 | Freigabe erteilen | UC-S-001 | Should | **Phase 4** | UG-E-010 | Draft |
| UC-UG-011 | Renewal bearbeiten | UC-S-004 | Should | **Phase 5** | UG-E-011 | Draft |
| UC-UG-012 | Nachtrag bearbeiten | UC-S-004 | Should | **Phase 5** | UG-E-012 | Draft |

## Subfunction-Level Use Cases

_Werden waehrend der Planungsphase erstellt._

## Traceability Matrix

| Summary | User-Goal | Priority | Phase |
|---------|-----------|----------|-------|
| UC-S-001: Neugeschaeft bearbeiten | UC-UG-001: Vorgang anlegen | Must | 1 |
| UC-S-001: Neugeschaeft bearbeiten | UC-UG-002: Basisdaten erfassen | Must | 1 |
| UC-S-001: Neugeschaeft bearbeiten | UC-UG-003: Board-Uebersicht nutzen | Must | 1 |
| UC-S-002: Risiko bewerten | UC-UG-004: Standort erfassen | Must | 2 |
| UC-S-005: Daten anreichern | UC-UG-005: Daten anreichern lassen | Must | 2 |
| UC-S-002: Risiko bewerten | UC-UG-006: Risiko bewerten | Must | 3 |
| UC-S-006: Pricing und Kalkulation | UC-UG-007: Praemie berechnen | Must | 3 |
| UC-S-006: Pricing und Kalkulation | UC-UG-008: Benchmarks einsehen | Should | 3 |
| UC-S-001, UC-S-003: Dokumente erstellen | UC-UG-009: Angebot finalisieren | Must | 4 |
| UC-S-001: Neugeschaeft bearbeiten | UC-UG-010: Freigabe erteilen | Should | 4 |
| UC-S-004: Bestand verwalten | UC-UG-011: Renewal bearbeiten | Should | 5 |
| UC-S-004: Bestand verwalten | UC-UG-012: Nachtrag bearbeiten | Should | 5 |

## Priority Distribution

| Priority | Count | Percentage |
|----------|-------|------------|
| Must | 8 | 67% |
| Should | 4 | 33% |
| Could | 0 | 0% |

## Relationship Map

```
UC-S-001: Neugeschaeft bearbeiten
  <<include>> UC-UG-001: Vorgang anlegen [Must] → Phase 1
  <<include>> UC-UG-002: Basisdaten erfassen [Must] → Phase 1
  <<include>> UC-UG-003: Board-Uebersicht nutzen [Must] → Phase 1
  <<include>> UC-UG-009: Angebot finalisieren [Must] (shared with UC-S-003) → Phase 4
  <<include>> UC-UG-010: Freigabe erteilen [Should] → Phase 4

UC-S-002: Risiko bewerten
  <<include>> UC-UG-004: Standort erfassen [Must] → Phase 2
  <<include>> UC-UG-006: Risiko bewerten [Must] → Phase 3

UC-S-003: Dokumente erstellen
  <<include>> UC-UG-009: Angebot finalisieren [Must] (shared with UC-S-001) → Phase 4

UC-S-004: Bestand verwalten
  <<include>> UC-UG-011: Renewal bearbeiten [Should] → Phase 5
  <<include>> UC-UG-012: Nachtrag bearbeiten [Should] → Phase 5

UC-S-005: Daten anreichern
  <<include>> UC-UG-005: Daten anreichern lassen [Must] → Phase 2

UC-S-006: Pricing und Kalkulation
  <<include>> UC-UG-007: Praemie berechnen [Must] → Phase 3
  <<include>> UC-UG-008: Benchmarks einsehen [Should] → Phase 3
```

## Cross-References (extends)

| Source | extends | Target | Condition |
|--------|---------|--------|-----------|
| UC-UG-002 | <<extend>> | UC-UG-005 | Wenn Firmenname eingegeben wird |
| UC-UG-004 | <<extend>> | UC-UG-005 | Wenn Standort-Adresse eingegeben wird |
| UC-UG-009 | <<extend>> | UC-UG-010 | Wenn Zeichnungsvollmacht ueberschritten |

## Dependency Graph (Phase Order)

```
Phase 1: UC-UG-001, UC-UG-002, UC-UG-003 (independent -- foundation)
    ↓
Phase 2: UC-UG-004, UC-UG-005 (depends on Phase 1: Vorgang + Basisdaten)
    ↓
Phase 3: UC-UG-006, UC-UG-007, UC-UG-008 (depends on Phase 2: Standortdaten)
    ↓
Phase 4: UC-UG-009, UC-UG-010 (depends on Phase 3: Bewertung + Praemie)
    ↓
Phase 5: UC-UG-011, UC-UG-012 (depends on Phase 1-4: full process)
```

## File Listing

### Summary-Level

- [UC-S-001](summary/UC-S-001-neugeschaeft-bearbeiten.md) -- Neugeschaeft bearbeiten
- [UC-S-002](summary/UC-S-002-risiko-bewerten.md) -- Risiko bewerten
- [UC-S-003](summary/UC-S-003-dokumente-erstellen.md) -- Dokumente erstellen
- [UC-S-004](summary/UC-S-004-bestand-verwalten.md) -- Bestand verwalten
- [UC-S-005](summary/UC-S-005-daten-anreichern.md) -- Daten anreichern
- [UC-S-006](summary/UC-S-006-pricing-und-kalkulation.md) -- Pricing und Kalkulation

### User-Goal-Level

- [UC-UG-001](user-goal/UC-UG-001-vorgang-anlegen.md) -- Vorgang anlegen (Phase 1)
- [UC-UG-002](user-goal/UC-UG-002-basisdaten-erfassen.md) -- Basisdaten erfassen (Phase 1)
- [UC-UG-003](user-goal/UC-UG-003-board-uebersicht-nutzen.md) -- Board-Uebersicht nutzen (Phase 1)
- [UC-UG-004](user-goal/UC-UG-004-standort-erfassen.md) -- Standort erfassen (Phase 2)
- [UC-UG-005](user-goal/UC-UG-005-daten-anreichern-lassen.md) -- Daten anreichern lassen (Phase 2)
- [UC-UG-006](user-goal/UC-UG-006-risiko-bewerten.md) -- Risiko bewerten (Phase 3)
- [UC-UG-007](user-goal/UC-UG-007-praemie-berechnen.md) -- Praemie berechnen (Phase 3)
- [UC-UG-008](user-goal/UC-UG-008-benchmarks-einsehen.md) -- Benchmarks einsehen (Phase 3)
- [UC-UG-009](user-goal/UC-UG-009-angebot-finalisieren.md) -- Angebot finalisieren (Phase 4)
- [UC-UG-010](user-goal/UC-UG-010-freigabe-erteilen.md) -- Freigabe erteilen (Phase 4)
- [UC-UG-011](user-goal/UC-UG-011-renewal-bearbeiten.md) -- Renewal bearbeiten (Phase 5)
- [UC-UG-012](user-goal/UC-UG-012-nachtrag-bearbeiten.md) -- Nachtrag bearbeiten (Phase 5)

---
*Last updated: 2026-02-22 -- Roadmap phase assignments added*
