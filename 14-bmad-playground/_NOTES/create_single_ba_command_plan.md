# Implementierungsplan: Standalone Business Analyst Command

## Ziel

Erstellung eines einzelnen `.md`-Files als Claude Command, das die **komplette Funktionalität** des BMAD Business Analyst Agents ("Mary") enthält — **ohne jegliche Abhängigkeiten** zu anderen Commands, Skills, Agents, Workflows, Templates, Config-Files oder Step-Files.

---

## Analyse des Ist-Zustands

### Einstiegspunkt

- **Command**: `.claude/commands/bmad-agent-bmm-analyst.md` (17 Zeilen)
- **Agent-Datei**: `_bmad/bmm/agents/analyst.md` (79 Zeilen)
- Lädt bei Aktivierung: `_bmad/bmm/config.yaml`

### Dependency-Tree: 69 Dateien, ~12.154 Zeilen

| Bereich | Dateien | ~Zeilen |
|---|---|---|
| Agent + Config + Core-Engine | 7 | ~558 |
| Market Research (Workflow + 6 Steps + Template) | 8 | ~1.437 |
| Domain Research (Workflow + 6 Steps + Template) | 8 | ~1.342 |
| Technical Research (Workflow + 6 Steps + Template) | 8 | ~1.600 |
| Product Brief (Workflow + 7 Steps + Template) | 9 | ~1.189 |
| Document Project (YAML + Instructions + Templates) | 12 | ~2.710 |
| Brainstorming (Workflow + 10 Steps + CSV + Template) | 11 | ~2.097 |
| Party Mode (Workflow + 3 Steps) | 4 | ~688 |
| Advanced Elicitation (XML + CSV) | 2 | ~169 |
| Agent Manifest | 1 | ~18 |
| **TOTAL** | **69** | **~12.154** |

### Menüpunkte des Analyst-Agents

1. **[MH]** Menü erneut anzeigen
2. **[CH]** Chat mit dem Agenten
3. **[BP]** Brainstorm Project → `core/workflows/brainstorming/` (11 Dateien)
4. **[MR]** Market Research → `research/market-steps/` (6 Steps + Template)
5. **[DR]** Domain Research → `research/domain-steps/` (6 Steps + Template)
6. **[TR]** Technical Research → `research/technical-steps/` (6 Steps + Template)
7. **[CB]** Create Brief → `create-product-brief/` (7 Steps + Template)
8. **[DP]** Document Project → `document-project/` (12 Dateien, YAML-Workflow-Engine)
9. **[PM]** Party Mode → `core/workflows/party-mode/` (4 Dateien)
10. **[DA]** Dismiss Agent

---

## Kern-Herausforderung

12.154 Zeilen in ein einziges Command-File zu packen wäre unpraktisch und würde das Context-Window überlasten. Die Lösung muss die Funktionalität **kondensieren**, ohne sie zu verlieren.

### Strategie: Intelligente Kondensierung

1. **Config-Werte direkt einbetten** statt externe YAML zu laden
2. **Drei Research-Workflows vereinheitlichen** — sie sind strukturell identisch (6-Step-Pattern: Init → 4 Content-Steps → Synthesis), nur die Fragen/Themen unterscheiden sich
3. **Step-File-Architektur auflösen** — statt JIT-Loading von Step-Files werden die Schritte als nummerierte Sections inline dargestellt
4. **XML/YAML-Indirektionsebenen entfernen** — kein `workflow.xml`-Engine, kein Handler-System
5. **Templates inline einbetten** — Output-Templates als Sections statt als separate Dateien
6. **CSV-Daten kondensieren** — Brainstorming-Methoden und Elicitation-Methoden als kompakte Listen
7. **Redundanz eliminieren** — gemeinsame Patterns (Menü-Handling, State-Tracking, etc.) einmal definieren

### Geschätzte Ziel-Größe: ~2.500–3.500 Zeilen

---

## Implementierungsplan (Schritte)

### Schritt 1: Command-Header & Konfiguration

Erstelle das Command-File mit:
- YAML-Frontmatter (`name`, `description`, `disable-model-invocation: true`)
- Eingebettete Konfigurationswerte (aus `config.yaml`):
  - `user_name: aknip`
  - `communication_language: German`
  - `document_output_language: German`
  - `output_folder: {project-root}/_bmad-output`
  - `planning_artifacts: {project-root}/_bmad-output/planning-artifacts`
  - `project_name: 14-bmad-playground`
  - `user_skill_level: intermediate`

### Schritt 2: Persona & Aktivierung

Einbetten der Agent-Persona direkt im Command:
- Name: Mary
- Rolle: Strategic Business Analyst + Requirements Expert
- Communication Style: "Speaks with the excitement of a treasure hunter..."
- Aktivierungssequenz (Begrüßung, Menü anzeigen, auf Input warten)
- Regeln (Sprache, In-Character bleiben, Menü-Reihenfolge)

### Schritt 3: Menü-System & Routing

Kompaktes Menü-System mit:
- Alle 10 Menüpunkte mit Shortcodes und Fuzzy-Matching-Beschreibung
- Routing-Logik: Number → Item | Text → Case-insensitive Substring Match
- Keine externen Handler-Referenzen — jeder Menüpunkt verweist auf eine Section im selben Dokument

### Schritt 4: Research-Workflows (vereinheitlicht)

**Ein gemeinsamer Research-Abschnitt** für alle drei Typen (Market/Domain/Technical):

#### 4a: Research-Workflow-Router
- Gemeinsame Initialisierung: Thema erfragen, Ziele klären, Scope festlegen
- Type-spezifische Verzweigung nach Initialisierung

#### 4b: Market Research (6 Steps inline)
- Step 1: Scope-Definition (Marktanalyse-spezifisch)
- Step 2: Customer Behavior (4 Web-Searches, 6 Sections)
- Step 3: Customer Pain Points (4 Web-Searches, 7 Sections)
- Step 4: Customer Decisions (4 Web-Searches, 8 Sections)
- Step 5: Competitive Analysis (Web-Searches, 7 Sections)
- Step 6: Synthese → vollständiges 11-Section-Dokument
- Output-Template inline

#### 4c: Domain Research (6 Steps inline)
- Step 1: Scope-Definition (Domain-spezifisch)
- Step 2: Industry Analysis (4 Web-Searches, 5 Sections)
- Step 3: Competitive Landscape (4 Web-Searches, 6 Sections)
- Step 4: Regulatory Focus (3 Web-Searches, 7 Sections)
- Step 5: Technical Trends (3 Web-Searches, 8 Sections)
- Step 6: Synthese → vollständiges 10-Section-Dokument

#### 4d: Technical Research (6 Steps inline)
- Step 1: Scope-Definition (Technical-spezifisch)
- Step 2: Technology Stack (4 Web-Searches, 6 Sections)
- Step 3: Integration Patterns (4 Web-Searches, 6 Sections)
- Step 4: Architectural Patterns (3 Web-Searches, 7 Sections)
- Step 5: Implementation Research (3 Web-Searches, 8 Sections)
- Step 6: Synthese → vollständiges 12-Section-Dokument

#### 4e: Research Output Template (inline)
- YAML-Frontmatter-Vorlage für alle Research-Typen

### Schritt 5: Product Brief Workflow (inline)

- Step 1: Initialisierung + Dokument-Discovery (bestehende Brainstorming-Reports, Research-Docs suchen)
- Step 1b: Continuation Handler (falls bestehender Workflow gefunden)
- Step 2: Product Vision Discovery (Problem, Lösung, Differenzierung)
- Step 3: Target Users (Personas, User Journeys)
- Step 4: Success Metrics (KPIs, Business Objectives)
- Step 5: MVP Scope (Core Features, Out-of-Scope, Future Vision)
- Step 6: Completion + Validation + Next Steps
- Template inline einbetten
- `[A]` Advanced Elicitation und `[P]` Party Mode als inline-Optionen in jedem Step

### Schritt 6: Brainstorming Workflow (inline)

- Session Setup: Thema/Ziele erfragen, 4 Approach-Optionen (User-Selected/AI-Recommended/Random/Progressive)
- Continuation Detection für bestehende Sessions
- **Brainstorming-Techniken** als kondensierte Liste (60 Techniken, 7 Kategorien) — statt externer CSV
- Technique Selection (4 Varianten: User-Selected/AI-Recommended/Random/Progressive Flow)
- Technique Execution: Facilitation Engine (100+ Ideen Ziel, Domain-Pivot alle 10 Ideen, Coaching-Modus)
- Idea Organization: Clustering, Priorisierung, Action Plans
- Template inline
- Context-Template (`project-context-template.md`) inline einbetten

### Schritt 7: Document Project Workflow (inline)

- Initialisierung: Prüfe auf bestehenden `project-scan-report.json`
- Mode-Erkennung: initial_scan / full_rescan / deep_dive
- Documentation Requirements (11 Projekttypen) als kondensierte Tabelle statt CSV
- Full Scan Instructions (12 Steps):
  - Projektstruktur lesen, Typ erkennen, Scan-Level bestimmen
  - Source Tree, Architecture Doc, Component Inventory generieren
  - Development Guide, API Contracts, Data Models, Deployment Guide
  - Multi-Part-Handling, Master Index
- Deep Dive Instructions (7 Steps): Exhaustive Analyse eines spezifischen Bereichs
- Templates (Project Overview, Index, Source Tree, Deep Dive) inline
- Checklist inline (kondensiert)

### Schritt 8: Party Mode (inline)

- Agent-Roster als eingebettete Tabelle (statt `agent-manifest.csv`)
  - Alle 16 Agenten mit: Name, Titel, Icon, Rolle, Identity, Communication Style, Principles
- Aktivierung: Begrüßung, Agenten vorstellen
- Discussion Orchestration: Topic-Analyse, Agent-Selection (2-3 pro Runde), In-Character-Responses
- Graceful Exit mit Return-Protocol
- Moderation Notes

### Schritt 9: Advanced Elicitation (inline)

- 50 Elicitation-Methoden als kondensierte Liste (10 Kategorien)
- Context-Analyse → 5 best-matching Methoden vorschlagen
- Shuffle/List-All/Proceed Optionen
- Iterative Anwendung mit Confirm/Reject

### Schritt 10: Gemeinsame Patterns & Regeln

Am Ende des Dokuments — zentrale Regeln die überall gelten:
- **Step-Processing Rules**: Sequenziell, kein Überspringen, State-Tracking
- **Menü-Verhalten**: Halt bei Menüs, auf User-Input warten
- **Output-Regeln**: Append-Only, Frontmatter-Updates
- **Sprach-Regeln**: Kommunikation in `{communication_language}`, Dokumente in `{document_output_language}`
- **Web-Search-Protocol**: Prerequisite-Check, parallele Suchen

---

## Datei-Struktur des Standalone-Commands

```
.claude/commands/bmad-standalone-analyst.md
```

### Grob-Gliederung des Files:

```markdown
---
name: 'standalone-analyst'
description: 'Standalone Business Analyst Agent (Mary) - no dependencies'
disable-model-invocation: true
---

# SECTION 1: CONFIGURATION
(eingebettete Config-Werte)

# SECTION 2: AGENT PERSONA & ACTIVATION
(Persona, Begrüßung, Menü)

# SECTION 3: MENU SYSTEM & ROUTING
(Menüpunkte, Routing-Logik)

# SECTION 4: MARKET RESEARCH WORKFLOW
(6 Steps inline, Template)

# SECTION 5: DOMAIN RESEARCH WORKFLOW
(6 Steps inline, Template)

# SECTION 6: TECHNICAL RESEARCH WORKFLOW
(6 Steps inline, Template)

# SECTION 7: PRODUCT BRIEF WORKFLOW
(7 Steps inline, Template)

# SECTION 8: BRAINSTORMING WORKFLOW
(Setup, Techniques, Execution, Organization)

# SECTION 9: DOCUMENT PROJECT WORKFLOW
(Full Scan, Deep Dive, Templates, Checklist)

# SECTION 10: PARTY MODE
(Agent Roster, Orchestration, Exit)

# SECTION 11: ADVANCED ELICITATION
(Methods, Selection, Application)

# SECTION 12: SHARED RULES & PATTERNS
(Step-Processing, Output, Language, Web Search)
```

---

## Risiken & Mitigationen

| Risiko | Mitigation |
|---|---|
| File wird zu groß (>3500 Zeilen) | Aggressive Kondensierung: Research-Steps komprimieren, redundante Instruktionen zusammenfassen |
| Context-Window-Überlastung bei Activation | `disable-model-invocation: true` + Claude liest das File bei Bedarf sectionweise |
| Verlust von Nuancen bei Kondensierung | Kritische Details (Web-Search-Patterns, Output-Strukturen, Synthese-Vorgaben) vollständig beibehalten |
| Config-Werte hardcoded | Config-Section am Anfang des Files — User kann dort Werte anpassen |
| Agent Manifest für Party Mode | Alle 16 Agenten-Personas kompakt inline — Tabelle mit allen Feldern |

---

## Nächste Schritte

1. **Review dieses Plans** durch den User
2. **Implementierung** in der Reihenfolge der Schritte 1–10
3. **Test** des Standalone-Commands mit allen Menüpunkten
4. **Iteration** falls Funktionalität fehlt oder Probleme auftreten
