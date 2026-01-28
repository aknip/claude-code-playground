# Projektplan: Makler-Portal für Versicherungsplattform

## Anforderungen

### Projektbeschreibung
Erweiterung einer bestehenden Versicherungsplattform um ein Frontend für Kooperationspartner (Makler). Implementierung einer separaten, eigenständigen Frontendanwendung, die Daten über neu zu erstellende fachliche APIs an die bestehende Versicherungsplattform überträgt.

### Fachliche Use Cases
- **Ausschreibungen:** neu anlegen, suchen, bearbeiten
- **Ausschreibungen → Angebote:** Ausschreibungen in Angebote wandeln
- **Angebote → Verträge:** Angebote in Verträge wandeln
- **Verträge:** suchen, einsehen
- **Kundendaten:** suchen, einsehen, bearbeiten

### Technische Rahmenbedingungen
- **Frontend:** React
- **APIs:** REST
- **Backend:** Java/Spring (bestehende Plattform)
- **Authentifizierung:** Keycloak (bestehendes System)
- **Geschäftslogik:** Bereits in der Plattform vorhanden, wird über APIs exponiert

### Nicht-funktionale Anforderungen
- Ca. 100 Makler als initiale Nutzer
- UI/UX-Design muss im Projekt erarbeitet werden

---

## Budget und Zeitrahmen

| Parameter | Wert |
|-----------|------|
| **Budget** | 80 Personentage (PT) |
| **Starttermin** | 01.02.2025 |
| **Endtermin** | 01.04.2025 |
| **Dauer** | 8 Wochen (40 Arbeitstage) |

---

## Lösungsszenario 1: Sequenzieller Ansatz

### Lösungsansatz
Klassischer, phasenorientierter Ansatz mit klaren Übergabepunkten zwischen den Phasen. Zunächst vollständige Analyse und Design, dann parallele Entwicklung von API und Frontend, abschließend Integration und Test. Dieser Ansatz minimiert Risiken durch gründliche Vorarbeit und eignet sich bei stabilen Anforderungen.

### Ressourcenbedarf

| Rolle | Anzahl Personen | Einsatzzeitraum | PT |
|-------|-----------------|-----------------|-----|
| Business Analyst | 1 | Woche 1-8 (Vollzeit) | 28 |
| Entwickler | 1 | Woche 1-8 (Vollzeit) | 42 |
| UI/UX Designer | 1 | Woche 2-3 (punktuell) | 10 |

### Lösungsschritte

| Nr. | Titel | Beschreibung | Start | Ende | Ressourcen | PT |
|-----|-------|--------------|-------|------|------------|-----|
| 1 | Projektsetup & Anforderungsanalyse | Projektinfrastruktur aufsetzen, Anforderungen detaillieren und priorisieren, User Stories erstellen | 01.02. | 07.02. | BA | 8 |
| 2 | API-Design & Architektur | REST-API-Spezifikation erstellen, Schnittstellendesign zur bestehenden Plattform, Architekturentscheidungen | 08.02. | 14.02. | BA, Entwickler | 8 |
| 3 | UI/UX-Design | Wireframes und Mockups erstellen, Designsystem definieren, Komponentenbibliothek auswählen | 08.02. | 18.02. | Designer | 10 |
| 4 | API-Entwicklung Ausschreibungen | REST-Endpoints für Ausschreibungen implementieren (CRUD), Keycloak-Integration | 15.02. | 25.02. | Entwickler | 10 |
| 5 | API-Entwicklung Angebote/Verträge/Kunden | REST-Endpoints für Angebote, Verträge und Kundendaten implementieren | 22.02. | 04.03. | Entwickler | 10 |
| 6 | Frontend-Entwicklung Basis & Ausschreibungen | React-Projektsetup, Routing, Auth-Integration, Ausschreibungsmasken | 26.02. | 11.03. | Entwickler | 12 |
| 7 | Frontend-Entwicklung Angebote/Verträge/Kunden | Masken für Angebote, Verträge und Kundendaten implementieren | 08.03. | 18.03. | BA, Entwickler | 10 |
| 8 | Integration & Systemtest | End-to-End-Integration, Systemtests, Bugfixing, Abnahme | 19.03. | 01.04. | BA, Entwickler | 12 |

**Gesamt: 80 PT**

### Visualisierung
Siehe Datei: `projektplan-szenario1.excalidraw`

---

## Lösungsszenario 2: AI-First Rapid Development

### Lösungsansatz
Zweiphasiger Ansatz mit Fokus auf maximale Entwicklungsgeschwindigkeit in Phase 1. Der Business Analyst nutzt AI-Agenten (z.B. Claude Code, Cursor, GitHub Copilot) um in kurzer Zeit einen funktionierenden Prototyp der gesamten Anwendung zu erstellen. In Phase 2 übernimmt das Team die Qualitätssicherung: Code-Review, Refactoring, Testabdeckung und Optimierung.

**Vorteile:**
- Schneller erster lauffähiger Stand (nach ca. 3 Wochen)
- Frühes Feedback möglich
- BA kann fachliches Wissen direkt einbringen

**Risiken:**
- Code-Qualität initial ggf. niedriger
- Nacharbeit in Phase 2 erforderlich
- Abhängigkeit von AI-Tooling-Kompetenz des BA

### Ressourcenbedarf

| Rolle | Anzahl Personen | Einsatzzeitraum | PT |
|-------|-----------------|-----------------|-----|
| Business Analyst | 1 | Woche 1-8 (Vollzeit, Schwerpunkt W1-4) | 33 |
| Entwickler | 1 | Woche 2-8 (ab W2 parallel Review) | 37 |
| UI/UX Designer | 1 | Woche 1-2 (punktuell) | 10 |

### Lösungsschritte

| Nr. | Titel | Beschreibung | Start | Ende | Ressourcen | PT |
|-----|-------|--------------|-------|------|------------|-----|
| 1 | Anforderungen & AI-Tooling Setup | Anforderungen priorisieren, AI-Entwicklungsumgebung einrichten, Prompts und Workflows vorbereiten | 01.02. | 05.02. | BA | 5 |
| 2 | UI/UX-Design | Wireframes und Mockups erstellen, Designsystem definieren, Komponentenbibliothek auswählen | 01.02. | 12.02. | Designer | 10 |
| 3 | AI-gestützte API-Entwicklung | Komplette REST-API mit AI-Unterstützung entwickeln, Keycloak-Integration, alle Endpoints | 06.02. | 14.02. | BA | 8 |
| 4 | AI-gestützte Frontend-Entwicklung | Komplettes React-Frontend mit AI-Unterstützung entwickeln, alle Masken und Workflows | 13.02. | 24.02. | BA | 10 |
| 5 | Code-Review & Refactoring | Kontinuierliche Review des AI-generierten Codes (parallel zur Entwicklung), Architektur-Verbesserungen, Best Practices | 13.02. | 14.03. | Entwickler, BA | 15 |
| 6 | Testabdeckung & Qualitätssicherung | Unit-Tests, Integrationstests, E2E-Tests schreiben, Code Coverage erhöhen | 20.02. | 28.02. | Entwickler, BA | 12 |
| 7 | Optimierung & Performance | Performance-Analyse, Optimierungen, Security-Review, Dokumentation | 07.03. | 17.03. | Entwickler | 10 |
| 8 | Integration & Abnahme | Finale Integration in Plattform, Systemtests, Bugfixing, Abnahme | 17.03. | 01.04. | BA, Entwickler | 10 |

**Gesamt: 80 PT**

### Phasenübersicht

```
Phase 1: Rapid Development mit Continuous Review (Woche 1-4)
├── BA + AI-Agenten → Funktionsfähiger Prototyp
├── Designer → UI/UX parallel (W1-2)
├── Entwickler → Continuous Code-Review (ab W2)
└── Testing → Parallel zur Entwicklung (W3-4)

Phase 2: Quality Engineering (Woche 5-8)
├── Refactoring → Architektur-Verbesserungen abschließen
├── Optimierung → Performance & Security
└── Integration → Production-Ready
```

### Visualisierung
Siehe Datei: `projektplan-szenario2.excalidraw`
