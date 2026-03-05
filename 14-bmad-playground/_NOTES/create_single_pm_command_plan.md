# Implementierungsplan: Standalone Product Manager Command

## Ziel

Erstellung eines einzelnen `.md`-Files als Claude Command, das die **komplette Funktionalität** des BMAD Product Manager Agents ("John") enthält — **ohne jegliche Abhängigkeiten** zu anderen Commands, Skills, Agents, Workflows, Templates, Config-Files oder Step-Files.

---

## Analyse des Ist-Zustands

### Einstiegspunkt

- **Command**: `.claude/commands/bmad-agent-bmm-pm.md` (17 Zeilen)
- **Agent-Datei**: `_bmad/bmm/agents/pm.md` (72 Zeilen)
- Lädt bei Aktivierung: `_bmad/bmm/config.yaml` (16 Zeilen)
- Nutzt Core-Engine: `_bmad/core/tasks/workflow.xml` (234 Zeilen, für YAML-Workflows)

### Dependency-Tree: ~75 Dateien, ~11.500+ Zeilen

| Bereich | Dateien | ~Zeilen | Beschreibung |
|---|---|---|---|
| Agent + Config + Core-Engine | 4 | ~340 | pm.md, config.yaml, workflow.xml, help.md |
| Create PRD (Workflow + 15 Steps + Template + 3 Data) | 20 | ~3.200 | Kompletter PRD-Erstellungs-Workflow |
| Validate PRD (Workflow + 14 Steps) | 15 | ~3.200 | Vollständige PRD-Validierung (13 Checks) |
| Edit PRD (Workflow + 5 Steps) | 6 | ~1.200 | PRD-Bearbeitungs-Workflow |
| Create Epics & Stories (Workflow + 4 Steps + Template) | 6 | ~970 | Epic/Story-Generierung aus PRD |
| Check Implementation Readiness (Workflow + 6 Steps) | 7 | ~1.090 | Readiness-Assessment |
| Correct Course (YAML + Instructions + Checklist) | 3 | ~250 | Sprint-Änderungsmanagement |
| Party Mode (Workflow + 3 Steps) | 4 | ~690 | Multi-Agent-Diskussion |
| Advanced Elicitation (XML + CSV) | 2 | ~170 | 50 Elicitation-Methoden |
| Shared Data (PRD-Purpose, CSVs, Agent Manifest) | 5 | ~320 | Geteilte Referenzdaten |
| **TOTAL** | **~75** | **~11.500+** | |

### Menüpunkte des PM-Agents

1. **[MH]** Redisplay Menu Help
2. **[CH]** Chat with the Agent about anything
3. **[CP]** Create PRD → `workflows/2-plan-workflows/create-prd/` (15 Step-Files + 3 Data-Files + Template)
4. **[VP]** Validate PRD → `workflows/2-plan-workflows/create-prd/steps-v/` (14 Step-Files)
5. **[EP]** Edit PRD → `workflows/2-plan-workflows/create-prd/steps-e/` (5 Step-Files)
6. **[CE]** Create Epics and Stories → `workflows/3-solutioning/create-epics-and-stories/` (4 Steps + Template)
7. **[IR]** Implementation Readiness → `workflows/3-solutioning/check-implementation-readiness/` (6 Steps)
8. **[CC]** Course Correction → `workflows/4-implementation/correct-course/` (YAML-Workflow + Instructions + Checklist)
9. **[PM]** Start Party Mode → `core/workflows/party-mode/` (3 Steps)
10. **[DA]** Dismiss Agent

---

## Kern-Herausforderung

~11.500 Zeilen in ein einziges Command-File zu packen wäre unpraktisch und würde das Context-Window überlasten. Die Lösung muss die Funktionalität **kondensieren**, ohne sie zu verlieren.

### Strategie: Intelligente Kondensierung

(Orientierung am bereits erstellten Analyst-Standalone `_NOTES/business-analyst.md` als bewährtes Muster)

1. **Config-Werte direkt einbetten** statt externe YAML zu laden
2. **XML/YAML-Indirektionsebenen entfernen** — kein `workflow.xml`-Engine, kein Handler-System
3. **Step-File-Architektur auflösen** — Schritte als nummerierte Sections inline
4. **Templates inline einbetten** — Output-Templates als Sections statt separate Dateien
5. **CSV-Daten kondensieren** — project-types.csv (10 Typen), domain-complexity.csv (15 Domains), methods.csv (50 Methoden) als kompakte Markdown-Tabellen
6. **Redundanz eliminieren** — Universal Rules, Step Processing Rules, Role Reinforcement werden einmal zentral definiert statt in jedem Step wiederholt
7. **14 Validate-Steps komprimieren** — Die Validierungskriterien folgen einem klaren Pattern (Analyse → Score → Report) und lassen sich zu einer kompakten Checkliste verdichten
8. **Shared PRD-Daten einmal definieren** — prd-purpose.md, project-types, domain-complexity zentral einmal einbetten, von Create/Validate/Edit referenziert

### Geschätzte Ziel-Größe: ~3.500–5.000 Zeilen

---

## Implementierungsplan (Schritte)

### Schritt 1: Command-Header & Konfiguration

Erstelle das Command-File mit:
- YAML-Frontmatter (`name`, `description`, `disable-model-invocation: true`)
- Eingebettete Konfigurationswerte (aus `config.yaml`):
  ```yaml
  project_name: My Project
  user_name: John Doe
  user_skill_level: intermediate
  communication_language: German
  document_output_language: German
  output_folder: "{project-root}/output"
  planning_artifacts: "{project-root}/output/planning-artifacts"
  implementation_artifacts: "{project-root}/output/implementation-artifacts"
  project_knowledge: "{project-root}/docs"
  ```
- Variable Resolution Hinweis: `{project-root}`, `{date}`, alle `{config_variable}`

### Schritt 2: Persona & Aktivierung

Einbetten der Agent-Persona direkt im Command:
- **Name:** John
- **Title:** Product Manager
- **Icon:** 📋
- **Role:** Product Manager — PRD creation, requirements discovery, stakeholder alignment, user interviews
- **Identity:** Product management veteran with 8+ years launching B2B and consumer products. Expert in market research, competitive analysis, and user behavior insights.
- **Communication Style:** Asks 'WHY?' relentlessly like a detective on a case. Direct and data-sharp, cuts through fluff to what actually matters.
- **Principles:**
  - Channel expert product manager thinking: Jobs-to-be-Done framework, opportunity scoring
  - PRDs emerge from user interviews, not template filling
  - Ship the smallest thing that validates the assumption — iteration over perfection
  - Technical feasibility is a constraint, not the driver — user value first
- Aktivierungssequenz: Begrüßung mit `{user_name}`, Menü anzeigen, auf Input warten
- Regeln: Sprache, In-Character bleiben, Menü-Reihenfolge, `/bmad-help` Hinweis

### Schritt 3: Menü-System & Routing

Kompaktes Menü-System mit:
- Alle 10 Menüpunkte mit Shortcodes und Fuzzy-Matching-Beschreibung
- Routing-Logik: Number → Item | Text → Case-insensitive Substring Match | Multiple Matches → Clarify
- Jeder Menüpunkt verweist auf eine Section im selben Dokument (z.B. `→ See SECTION 5: CREATE PRD WORKFLOW`)

### Schritt 4: Shared PRD Reference Data (einmalig, zentral)

Alle drei PRD-Workflows (Create/Validate/Edit) teilen sich dieselben Referenzdaten:

#### 4a: PRD Quality Standards (kondensiert aus `data/prd-purpose.md`, ~80 Zeilen)
- **PRD-Philosophie:** Dual-audience Dokument (Human PMs + LLM Downstream Consumption)
- **Information Density:** High signal-to-noise ratio, Anti-Patterns ("The system will allow users to..." → "Users can..."), Maximum info per word, Zero fluff
- **Traceability Chain:** Vision → Success Criteria → User Journeys → FRs → (Epics → Stories)
- **FR Quality:** Capabilities not implementation, SMART, testable, implementation-agnostic
- **NFR Quality:** Measurable, mit Template "The system shall [metric] [condition] [measurement method]"
- **Domain-specific auto-detection:** Healthcare (HIPAA), Fintech (PCI-DSS), GovTech (NIST), etc.
- **Formatting:** ## Level 2 headers for all main sections, consistent structure

#### 4b: Project Types (kondensiert aus `data/project-types.csv`, ~40 Zeilen)
10 Projekttypen als kompakte Tabelle:

| Type | Detection Signals | Key Questions | Required Sections | Skip Sections | Innovation Signals |
|---|---|---|---|---|---|
| api_backend | API, REST, GraphQL, backend | Endpoints? Auth? Data formats? Rate limits? Versioning? SDK? | endpoint_specs, auth_model, data_schemas, rate_limits | ux_ui, visual_design | API composition, New protocol |
| mobile_app | iOS, Android, app, mobile | Native/cross-platform? Offline? Push? Device features? | platform_reqs, device_permissions, offline_mode, push_strategy | desktop_features, cli_commands | Gesture innovation, AR/VR |
| saas_b2b | SaaS, B2B, platform, dashboard | Multi-tenant? Permissions? Subscriptions? Integrations? | tenant_model, rbac_matrix, subscription_tiers, integration_list | cli_interface, mobile_first | Workflow automation, AI agents |
| developer_tool | SDK, library, package, npm, pip | Language support? Package managers? IDE integration? | language_matrix, api_surface, code_examples, migration_guide | visual_design, store_compliance | New paradigm, DSL creation |
| cli_tool | CLI, command, terminal, bash | Interactive/scriptable? Output formats? Config? Shell completion? | command_structure, output_formats, config_schema | visual_design, touch_interactions | Natural language CLI, AI commands |
| web_app | website, webapp, browser, SPA, PWA | SPA/MPA? Browser support? SEO? Real-time? Accessibility? | browser_matrix, responsive_design, performance_targets, seo | native_features, cli_commands | WebAssembly, New interaction |
| game | game, player, gameplay | REDIRECT TO GAME MODULE | game-brief, GDD | most_sections | Novel mechanics, Genre mixing |
| desktop_app | desktop, Windows, Mac, Linux | Cross-platform? Auto-update? System integration? Offline? | platform_support, system_integration, update_strategy | web_seo, mobile_features | Desktop AI, System automation |
| iot_embedded | IoT, embedded, device, sensor | Hardware specs? Connectivity? Power? Security? OTA? | hardware_reqs, connectivity_protocol, power_profile, security | visual_ui, browser_support | Edge AI, New sensors |
| blockchain_web3 | blockchain, crypto, DeFi, NFT | Chain selection? Wallet? Gas optimization? Security audit? | chain_specs, wallet_support, smart_contracts, security_audit | traditional_auth, centralized_db | Novel tokenomics, DAO |

#### 4c: Domain Complexity (kondensiert aus `data/domain-complexity.csv`, ~50 Zeilen)
15 Domains als kompakte Tabelle mit: domain, complexity (low/medium/high), key_concerns, compliance_requirements, web_search_triggers. Wichtigste:

| Domain | Complexity | Key Concerns | Compliance |
|---|---|---|---|
| healthcare | high | FDA approval, Clinical validation, Patient safety | HIPAA, FDA medical device classification |
| fintech | high | Regional compliance, Fraud prevention, Data protection | PCI-DSS, KYC/AML, Open banking |
| govtech | high | Procurement rules, Security clearance, Transparency | FedRAMP, Section 508, NIST |
| edtech | medium | Student privacy, Content moderation, Age verification | COPPA/FERPA, WCAG |
| aerospace | high | Safety certification, Performance validation, Export controls | DO-178C, ITAR |
| automotive | high | Safety standards, Real-time requirements | ISO 26262, V2X |
| scientific | medium | Reproducibility, Validation methodology, Accuracy | Peer review standards |
| legaltech | high | Legal ethics, Attorney-client privilege, Court integration | Bar regulations, Data retention |
| process_control | high | Functional safety, OT cybersecurity, Real-time control | IEC 62443, ISA-95 |
| building_automation | high | Life safety codes, Multi-trade coordination, Commissioning | BACnet, ASHRAE |
| general | low | Standard requirements, Basic security | Standard practices |

#### 4d: PRD-Template (inline, ~10 Zeilen)
```markdown
---
stepsCompleted: []
inputDocuments: []
workflowType: 'prd'
---
# Product Requirements Document - {{project_name}}
**Author:** {{user_name}}
**Date:** {{date}}
```

### Schritt 5: Create PRD Workflow (15 Step-Files → 12 inline Steps)

Der umfangreichste Workflow — vollständig inline mit allen Details:

**Workflow-Einleitung:**
- Goal: Comprehensive PRDs through structured workflow facilitation
- Role: Product-focused PM facilitator collaborating with expert peer
- Referenz auf SECTION 4 für PRD Quality Standards und Referenzdaten
- Referenz auf SECTION 13 für Step Processing Rules

#### Step C-1: Initialization
- **Check for existing PRD** at `{planning_artifacts}/prd.md`
  - Wenn existiert mit `stepsCompleted` aber nicht complete: → Step C-1b (auto-proceed)
  - Wenn existiert und complete: inform user, offer review
- **Fresh Workflow Setup:**
  - Input Document Discovery in `{planning_artifacts}/**`, `{output_folder}/**`, `{project_knowledge}/**`, `docs/**`
  - Suche: `*brief*.md`, `*research*.md`, `**/project-context.md`, sharded folders (`*/index.md`)
  - CRITICAL: Confirm findings with user, ask if they want to provide anything else
  - Create initial PRD from Template (Section 4d) at `{planning_artifacts}/prd.md`
  - Present initialization report (document setup, input docs discovered, files loaded)
- Menu: `[C] Continue`

#### Step C-1b: Continuation
- Analyse `stepsCompleted` array im Frontmatter
- Restore alle Dokumente aus `inputDocuments`
- Bestimme nächsten Step aus letztem Eintrag
- Wenn already complete: offer review/revision
- Present "Welcome back" mit Status-Übersicht
- Menu: `[C] Continue to {next step}`

#### Step C-2: Discovery & Classification
- **Check document state** (brief count, research count, etc.)
- **Load classification data** aus Section 4b (Project Types) und 4c (Domain Complexity)
- **Discovery conversation:**
  - Wenn Product Brief/Docs vorhanden: acknowledge, share understanding, ask clarifying questions
  - Wenn greenfield ohne Docs: "What problem does this solve? Who's it for? What excites you?"
  - Listen for classification signals
- **Confirm classification:** projectType, domain, complexityLevel, greenfield/brownfield
- **Save to frontmatter** als `classification:` block
- Menu: `[A] Advanced Elicitation [P] Party Mode [C] Continue to Vision (Step 2b)`

#### Step C-2b: Vision Discovery
- **Explore What Makes It Special:**
  - User delight: "What would make users say 'this is exactly what I needed'?"
  - Differentiation moment: "What's the moment where users realize this is different?"
  - Core insight: "What insight makes this product possible or unique?"
  - Value proposition: One-sentence explanation of why someone should use this
- **Understand the Vision:**
  - Problem framing: "What's the real problem — not the surface symptom?"
  - Future state: "When successful, what does the world look like for your users?"
  - Why now: "Why is this the right time to build this?"
- **Validate understanding:** Reflect back Vision + What Makes It Special + Core Insight
- FORBIDDEN: Generate executive summary content (that's next step)
- FORBIDDEN: Append anything to document in this step
- Menu: `[A] [P] [C] Continue to Executive Summary (Step 2c)`

#### Step C-2c: Executive Summary
- **Synthesize** classification (Step 2) + vision/differentiator (Step 2b) + input documents
- **Draft content** applying PRD quality standards from Section 4a
- **Present for review** — allow user to request changes, add info, refine, or approve
- **Append to PRD on [C]:**
  ```
  ## Executive Summary
  {vision_alignment_content}
  ### What Makes This Special
  {product_differentiator_content}
  ## Project Classification
  {project_classification_content}
  ```
- Menu: `[A] [P] [C] Continue to Success Criteria (Step 3)`

#### Step C-3: Success Criteria
- **Check input docs** for success indicators
- **Explore User Success:** Emotional success, "aha!" moments, completion scenarios
- **Define Business Success:** 3-month and 12-month timelines, key metrics
- **Challenge vague metrics:** Push for specificity ("10,000 users" → "What kind? Doing what?")
- **Connect to differentiator** from Step 2b
- **Smart Scope Negotiation:** MVP (must work) / Growth (competitive) / Vision (dream)
- **Domain-specific:** Compliance milestones for regulated domains
- **Append on [C]:** `## Success Criteria` (User/Business/Technical/Measurable Outcomes) + `## Product Scope` (MVP/Growth/Vision)
- Menu: `[A] [P] [C] Continue to User Journeys (Step 4)`

#### Step C-4: User Journey Mapping
- **Identify ALL user types:** Primary users, admins, moderators, support, API consumers, internal ops
- **Create narrative story-based journeys** per user type:
  - Opening Scene (current pain), Rising Action (steps taken), Climax (product delivers value), Resolution (improved situation)
  - Specific steps, what could go wrong, recovery path, info needed, emotional state
- **Connect journeys to requirements:** Explicitly state what capabilities each journey reveals
- **Minimum coverage:** Primary-Success, Primary-EdgeCase, Admin/Ops, Support, API/Integration (if applicable)
- **Append on [C]:** `## User Journeys` + `### Journey Requirements Summary`
- Menu: `[A] [P] [C] Continue to Domain (Step 5)`

#### Step C-5: Domain Requirements (OPTIONAL)
- **Check domain complexity** from Step 2 classification
- **If LOW:** offer `[C] Skip` or `[D] Do anyway`
- **If MEDIUM/HIGH:** Load domain reference data from Section 4c
  - Explore: Regulations, Standards, Certifications, Integrations, Technical constraints
  - Document: Compliance & Regulatory, Technical Constraints, Integration Requirements, Risk Mitigations
- **Append on [C]:** `## Domain-Specific Requirements` (or nothing if skipped)
- Menu: `[A] [P] [C] Continue to Innovation (Step 6)`

#### Step C-6: Innovation Discovery (OPTIONAL)
- **Load innovation signals** from Section 4b (project-type specific)
- **Listen for indicators:** "nothing like this exists", "rethinking how X works", "combining A with B", "novel approach"
- **If detected:** Deep exploration — what's unique? what assumption challenged? how to validate? fallback? market context?
- **If NOT detected:** "That's fine" → offer `[A]` to try finding innovative angles, or `[C] Skip`
- **Append on [C] if innovation found:** `## Innovation & Novel Patterns` (Detected Areas, Market Context, Validation, Risk)
- Menu: `[A] [P] [C] Continue to Project Type (Step 7)`

#### Step C-7: Project Type Deep Dive
- **Load project-type config** from Section 4b
- **Conduct guided discovery** using `key_questions` (semicolon-separated)
  - Ask each question naturally in conversational style
  - Follow-ups, connect to product value proposition
- **Document type-specific requirements** covering `required_sections`, skipping `skip_sections`
- **Append on [C]:** `## [Project Type] Specific Requirements` (Overview, Technical Architecture, Dynamic Sections, Implementation Considerations)
- Menu: `[A] [P] [C] Continue to Scoping (Step 8)`

#### Step C-8: Scoping
- **Review everything documented so far** — synthesize vision, success, journeys
- **Define MVP strategy:** Problem-solving / Experience / Platform / Revenue MVP
- **Must-Have vs Nice-to-Have analysis** per journey/success criterion
- **Progressive Feature Roadmap:** Phase 1 (MVP), Phase 2 (Growth), Phase 3 (Expansion)
- **Risk-Based Scoping:** Technical / Market / Resource risks
- **Append on [C]:** `## Project Scoping & Phased Development` (MVP Strategy, Feature Set, Post-MVP, Risk Mitigation)
- Menu: `[A] [P] [C] Continue to Functional Requirements (Step 9)`

#### Step C-9: Functional Requirements (THE CAPABILITY CONTRACT)
- **Critical:** UX designers, Architects, Epic breakdown will ONLY work with what's listed here
- **Extract capabilities** from all previous sections (Executive Summary, Success, Journeys, Domain, Innovation, Project Type)
- **Organize by Capability Area** (5-8 areas, NOT technology): "User Management", "Content Discovery" — not "Authentication System", "Search Algorithm"
- **Format:** `FR#: [Actor] can [capability] [context/constraint]` — Number sequentially, aim 20-50 FRs
- **Altitude check:** WHAT capability, not HOW implemented
- **Self-validation:** Completeness Check, Altitude Check, Quality Check
- **Append on [C]:** `## Functional Requirements` (per Capability Area)
- **Capability Contract Reminder:** "Any feature not listed here will not exist in the final product"
- Menu: `[A] [P] [C] Continue to Non-Functional (Step 10)`

#### Step C-10: Non-Functional Requirements (SELECTIVE)
- **Only document NFRs that apply** to THIS product
- **Quick assessment:** Performance? Security? Scalability? Accessibility? Integration? Reliability?
- **For each relevant category:** Explore specifics, make measurable
  - NOT "system should be fast" → "User actions complete within 2 seconds"
  - NOT "system should be secure" → "All data encrypted at rest and in transit"
- **Append on [C]:** `## Non-Functional Requirements` (nur relevante Kategorien)
- Menu: `[A] [P] [C] Continue to Polish (Step 11)`

#### Step C-11: Polish
- **Load PRD Quality Standards** from Section 4a
- **Full document review:** Information Density, Flow & Coherence, Duplication Detection, Header Structure, Readability
- **Optimization:** Improve flow, reduce duplication, enhance coherence, optimize headers
- **Preserve:** All FRs, NFRs, success criteria, journeys, scope decisions, vision, domain requirements
- **Can consolidate:** Repeated explanations, redundant background, overlapping examples
- **On [C]:** Replace entire document content with polished version (full rewrite, not append)
- Menu: `[A] [P] [C] Continue to Complete (Step 12)`

#### Step C-12: Complete
- **Announce completion** — celebrate, summarize all sections
- **Offer next steps:**
  - `[V]` Validate PRD (→ Section 6)
  - `[E]` Edit PRD (→ Section 7)
  - `[CE]` Create Epics & Stories (→ Section 8)
  - Return to main menu
- **Reminder:** "The polished PRD serves as the foundation for all subsequent product development activities."

### Schritt 6: Validate PRD Workflow (14 Step-Files → kompakter Workflow)

Die 14 Validierungs-Steps folgen einem klaren Pattern und lassen sich stark komprimieren:

**Workflow-Einleitung:**
- Goal: Validate existing PRD against BMAD standards
- Role: Validation Architect and Quality Assurance Specialist
- Output: Validation Report at `{planning_artifacts}/prd-validation-report.md`

#### Step V-1: Discovery & Setup
- Confirm PRD path, discover input documents (Product Brief, Research docs)
- Initialize validation report with frontmatter
- Load PRD completely, load prd-purpose.md (Section 4a)
- Present initial assessment
- Menu: `[C] Continue`

#### Step V-2: Format Detection & Parity
- Detect PRD format: BMAD Standard / BMAD Variant / Non-Standard
- **BMAD Standard:** Has all expected sections (Executive Summary, Success Criteria, User Journeys, FRs, NFRs, etc.)
- **BMAD Variant:** Has most sections, different structure
- **Non-Standard:** Custom format — run Parity Check (map existing content to BMAD sections, identify missing equivalents)
- Score: Format Compliance (1-5)
- Append findings to report

#### Step V-3: Information Density Analysis
- Check Anti-Patterns: Verbose phrasing ("The system will allow users to..." statt "Users can..."), filler words, placeholder text, thin sections (<2 sentences), over-specified sections (implementation details in requirements)
- Score: Information Density (1-5)
- Append findings with specific examples

#### Step V-4: Brief Coverage (if brief exists)
- Cross-reference PRD against Product Brief
- Check: Vision alignment, Feature coverage, User type coverage, Business goals addressed
- Score: Brief Coverage (0-100%)
- Append findings with gap analysis

#### Step V-5: Measurability
- Check all FRs: Are they testable? Specific enough?
- Check all NFRs: Have measurable targets? Percentiles? Load context?
- Check Success Criteria: Quantified? Timebound?
- Score: Measurability (1-5)
- Append findings with specific unmeasurable items listed

#### Step V-6: Traceability
- Validate requirement chain: Vision → Success Criteria → Journeys → FRs
- Check: Every FR traceable to a journey/success criterion? Orphan FRs? Missing capabilities from journeys?
- Score: Traceability (1-5)
- Append findings with traceability matrix

#### Step V-7: Implementation Leakage
- Detect technology/implementation details in requirements
- Anti-patterns: Technology names in FRs, UI specifics, database choices, API implementation details
- FRs should state WHAT not HOW
- Score: Abstraction Level (1-5)
- Append findings with leaky items listed

#### Step V-8: Domain Compliance
- Load domain reference from Section 4c
- Check: Required compliance items present? Regulatory requirements addressed? Domain-specific NFRs included?
- Skip if domain = "general" / complexity = "low"
- Score: Domain Compliance (1-5 or N/A)
- Append findings

#### Step V-9: Project Type Validation
- Load project-type config from Section 4b
- Check: Required sections present? Appropriate sections skipped? Type-specific questions addressed?
- Score: Project Type Coverage (1-5)
- Append findings

#### Step V-10: SMART Criteria
- Apply SMART (Specific, Measurable, Attainable, Relevant, Traceable) to ALL requirements
- Flag: Vague adjectives ("easy", "intuitive", "fast"), missing quantifiers, unmeasurable claims
- Score: SMART Compliance (1-5)
- Append findings with per-requirement assessment

#### Step V-11: Holistic Quality
- Overall quality assessment considering: Coherence, Completeness, Consistency, Clarity
- Identify strongest and weakest areas
- Score: Holistic Quality (1-5)
- Append narrative assessment

#### Step V-12: Completeness
- Final completeness percentage based on all required sections
- Section-by-section coverage check
- Score: Completeness (0-100%)
- Append section coverage table

#### Step V-13: Final Report
- **Zusammenfassung aller Findings:**
  - Overall Score (Weighted average)
  - Critical Issues (must fix)
  - Recommendations (should fix)
  - Nice-to-haves (could improve)
  - Section-by-section score summary
- **Offer next steps:**
  - `[E]` Edit PRD with these findings (→ Section 7)
  - Return to main menu

### Schritt 7: Edit PRD Workflow (5 Step-Files → inline)

**Workflow-Einleitung:**
- Goal: Edit and improve existing PRDs
- Role: PRD Improvement Specialist

#### Step E-1: Discovery
- Load PRD, detect format (BMAD Standard / Variant / Non-Standard)
- Check for existing Validation Report → use findings to guide edits
- Ask user: What do you want to edit? Global improvements or specific sections?
- **If Non-Standard format detected:** Route to Step E-1b (Legacy Conversion)
- Menu: `[C] Continue to Review`

#### Step E-1b: Legacy Conversion (Alternativpfad)
- Convert Non-Standard PRD to BMAD format
- Map existing content to BMAD sections
- Preserve all original content, restructure
- Present conversion plan for user approval
- Menu: `[C] Continue with converted PRD`

#### Step E-2: Review & Analysis
- Deep review of PRD content
- If Validation Report exists: use as guide for improvements
- If no report: perform quick assessment of problem areas
- Present findings and proposed edit strategy
- Menu: `[A] [P] [C] Continue to Edit`

#### Step E-3: Execute Edits
- Apply edits based on user intent and review findings
- Present each change for user approval
- Track all modifications
- Menu: `[C] Continue to Complete`

#### Step E-4: Complete
- Summary of all changes made
- **Offer next steps:**
  - `[V]` Validate updated PRD (→ Section 6)
  - `[E]` More edits (→ loop back)
  - Return to main menu

### Schritt 8: Create Epics & Stories Workflow (4 Steps + Template inline)

**Workflow-Einleitung:**
- Goal: Transform PRD requirements + Architecture decisions into implementation-ready epics and user stories
- Role: Product strategist + technical specifications writer collaborating with product owner
- **Prerequisites:** Completed PRD + Architecture documents (UX recommended if UI exists)

#### Step 1: Validate Prerequisites
- Discover and load: PRD (`*prd*.md`), Architecture (`*architecture*.md`), UX Design (`*ux*.md`), existing Epics
- Validate completeness: PRD must have FRs, Architecture must exist
- Extract all FRs and NFRs from PRD
- Initialize Epics document from template
- Menu: `[C] Continue to Design Epics`

#### Step 2: Design Epics
- Group related FRs into logical Epics (user-value oriented, not tech-oriented)
- Each Epic: Title, Description, Acceptance Criteria, FRs covered, NFRs addressed
- Present epic structure for user review
- Menu: `[C] Continue to Create Stories`

#### Step 3: Create Stories
- For each Epic: decompose into User Stories
- Format: "As a [user type], I want to [action] so that [benefit]"
- Each Story: Given/When/Then Acceptance Criteria, Story Points estimate, Dependencies
- Technical stories for infrastructure/non-user-facing work
- Menu: `[C] Continue to Validation`

#### Step 4: Final Validation
- Completeness check: All FRs covered by at least one story?
- No orphan stories (every story traces to an FR)
- Acceptance criteria are testable
- Dependencies identified
- Present validation results, save document

**Epics Template (inline):**
```markdown
---
stepsCompleted: []
workflowType: 'epics'
sourceDocuments: []
---
# Epics and Stories - {{project_name}}
**Author:** {{user_name}}
**Date:** {{date}}
**Source PRD:** {{prd_path}}
```

### Schritt 9: Check Implementation Readiness (6 Steps inline)

**Workflow-Einleitung:**
- Goal: Validate PRD, Architecture, Epics & Stories are complete and aligned before Phase 4 implementation
- Role: Expert PM and Scrum Master specializing in requirements traceability and gap detection

#### Step 1: Document Discovery
- Inventarisiere alle Projekt-Dokumente: PRD, Architecture, Epics/Stories, UX Design
- Load all documents completely
- Note any missing documents
- Present inventory and readiness to proceed
- Menu: `[C] Continue`

#### Step 2: PRD Analysis
- Analyze PRD completeness and quality
- Check: All required sections present? FRs specific enough for development? NFRs measurable?
- Flag critical gaps
- Score: PRD Readiness (1-5)

#### Step 3: Epic Coverage
- Map every FR from PRD to at least one Epic/Story
- Identify: Uncovered FRs, over-engineered stories, scope creep (stories without FR backing)
- Score: Epic Coverage (0-100%)

#### Step 4: UX Alignment
- If UX exists: Cross-reference UX screens/flows with PRD journeys and Epics
- Check: Every journey has corresponding UX? UX aligns with FRs? No orphan screens?
- Score: UX Alignment (1-5 or N/A)

#### Step 5: Epic Quality Review
- Review individual Epic/Story quality
- Check: Acceptance criteria testable? Dependencies clear? Story sizing reasonable? Technical stories included?
- Score: Epic Quality (1-5)

#### Step 6: Final Assessment
- **Readiness Report:**
  - Overall Readiness Score
  - Blockers (must resolve before implementation)
  - Warnings (should address)
  - Ready items
  - Per-document assessment
  - Recommendation: Ready / Needs Work / Not Ready
- **Offer next steps based on findings:**
  - Fix PRD (→ Section 7: Edit PRD)
  - Fix Epics (→ Section 8: Create Epics)
  - Proceed to implementation
  - Return to main menu

### Schritt 10: Course Correction Workflow (inline)

**Workflow-Einleitung:**
- Goal: Navigate significant changes during sprint execution
- Trigger: Bug discovered, scope change, new requirement, technical blocker

**6-Step Process:**

1. **Initialize:** Capture change context — What triggered this? What's the impact? Priority level?
2. **Discover Inputs:** Load existing docs (PRD, Epics, Architecture, UX) for impact analysis
3. **Analyze via Checklist:**
   - **Trigger & Context:** What changed? Why? Who reported? Impact severity?
   - **Epic Impact Analysis:** Which Epics/Stories affected? New stories needed? Stories to remove/modify?
   - **Artifact Conflict Detection:** Does change conflict with PRD? Architecture? UX? NFRs?
   - **Path Forward Analysis:** Options (absorb change, defer, pivot, reject), trade-offs, recommendations
   - **Proposal Components:** Specific changes to each document, new stories, modified acceptance criteria
   - **Final Review:** Risk assessment, stakeholder communication plan
4. **Draft Change Proposal:** Detailed proposal document
5. **Generate Sprint Change Proposal:** Save to `{implementation_artifacts}/sprint-change-proposal-{date}.md`
6. **Finalize & Route:** Present proposal, suggest next actions (update PRD, modify Epics, architecture review)

### Schritt 11: Party Mode (inline)

- **Agent-Roster als eingebettete Tabelle** (aus `core/agent-manifest.csv`):
  Alle verfügbaren Agenten mit: Name, Title, Icon, Role, Identity, Communication Style
  - Beispiel: "John" (PM, 📋), "Larry" (Architect, 🏗️), "Shawna" (UX Designer, 🎨), etc.
  - ~17 Agenten total
- **Aktivierung:** Begrüßung, verfügbare Agenten vorstellen
- **Discussion Orchestration:**
  - Topic-Analyse: Welche Agenten sind für das Thema relevant?
  - Agent-Selection: 2-3 Agenten pro Runde
  - In-Character-Responses: Jeder Agent spricht in seiner Communication Style
  - Multi-round Discussion: Topic rotieren, neue Perspektiven einbringen
- **Graceful Exit:** Return-Protocol, Zusammenfassung der Erkenntnisse
- **Moderation Notes:** PM (John) moderiert, hält Diskussion fokussiert

### Schritt 12: Advanced Elicitation (inline)

- **50 Elicitation-Methoden** in 11 Kategorien:
  - Direct: Interviews, Surveys, Questionnaires, Observation, Protocol Analysis
  - Creative: Brainstorming, Mind Mapping, Storyboarding, Analogy, Role Playing
  - Analytical: Gap Analysis, Root Cause, Decision Trees, SWOT, Risk Analysis
  - Collaborative: Workshops, Focus Groups, JAD, User Stories, Personas
  - Exploratory: Prototyping, Ethnography, Context Inquiry, Card Sorting, Affinity
  - (+ 6 weitere Kategorien)
- **Invocation:** Wird aus jedem Step via `[A]` aufgerufen
- **Process:**
  1. Context-Analyse: Aktuellen Step und bisherige Erkenntnisse analysieren
  2. 5 best-matching Methoden vorschlagen (basierend auf Kontext)
  3. Optionen: `[S]` Shuffle für andere Methoden, `[L]` List All, `[1-5]` Methode auswählen
  4. Ausgewählte Methode anwenden
  5. Ergebnisse präsentieren: Accept / Reject / Modify
  6. Zurück zum aufrufenden Step

### Schritt 13: Gemeinsame Patterns & Regeln

Am Ende des Dokuments — zentrale Regeln die überall gelten:

- **Step-Processing Rules:**
  - Sequenziell ausführen, kein Überspringen
  - Step komplett lesen bevor irgendwas getan wird
  - State-Tracking: `stepsCompleted` Array im Frontmatter aktualisieren
  - Nur aktuellen Step laden, nie vorausschauen
- **Menü-Verhalten:**
  - Bei jedem Menü: HALT und auf User-Input warten
  - `[C]` = Continue zum nächsten Step
  - `[A]` = Advanced Elicitation (→ Section 12)
  - `[P]` = Party Mode (→ Section 11)
  - Fuzzy Matching für Texteingaben
- **Facilitator Role:**
  - NEVER generate content without user input
  - Collaborative dialogue, not command-response
  - YOU are a facilitator, not a content generator
  - Present drafts for review before appending
- **Output-Regeln:**
  - Append-Only: Content an Output-File anhängen, nie bestehenden Content überschreiben (Ausnahme: Step 11 Polish)
  - Frontmatter-Updates: `stepsCompleted`, `inputDocuments`, `classification` aktuell halten
  - Save after each step completion
- **Sprach-Regeln:**
  - Kommunikation in `{communication_language}`
  - Dokument-Output in `{document_output_language}`
  - Agent bleibt in Character (Communication Style, Persona)
- **File-Save-Protocol:**
  - PRD: `{planning_artifacts}/prd.md`
  - Validation Report: `{planning_artifacts}/prd-validation-report.md`
  - Epics: `{planning_artifacts}/epics.md`
  - Readiness Report: `{planning_artifacts}/implementation-readiness-report.md`
  - Course Correction: `{implementation_artifacts}/sprint-change-proposal-{date}.md`

---

## Datei-Struktur des Standalone-Commands

```
.claude/commands/product-manager.md
```

### Grob-Gliederung des Files:

```markdown
---
name: 'product-manager'
description: 'Standalone Product Manager Agent (John) - no dependencies'
disable-model-invocation: true
---

# SECTION 1: CONFIGURATION
(eingebettete Config-Werte)

# SECTION 2: AGENT PERSONA & ACTIVATION
(Persona, Begrüßung, Menü)

# SECTION 3: MENU SYSTEM & ROUTING
(Menüpunkte, Routing-Logik)

# SECTION 4: SHARED PRD REFERENCE DATA
(PRD Quality Standards, Project Types, Domain Complexity, PRD-Template)

# SECTION 5: CREATE PRD WORKFLOW
(12 Steps inline, nutzt Section 4 Data)

# SECTION 6: VALIDATE PRD WORKFLOW
(13 Validierungs-Checks als komprimierter Workflow)

# SECTION 7: EDIT PRD WORKFLOW
(5 Steps inline)

# SECTION 8: CREATE EPICS & STORIES WORKFLOW
(4 Steps + Template inline)

# SECTION 9: CHECK IMPLEMENTATION READINESS
(6 Steps + Report-Template inline)

# SECTION 10: COURSE CORRECTION WORKFLOW
(6-Step Workflow + Checklist inline)

# SECTION 11: PARTY MODE
(Agent Roster, Orchestration, Exit)

# SECTION 12: ADVANCED ELICITATION
(Methods, Selection, Application)

# SECTION 13: SHARED RULES & PATTERNS
(Step-Processing, Facilitator Role, Output, Language, File-Save)
```

---

## Unterschiede zum Analyst-Standalone

| Aspekt | Analyst (Jarvis) | PM (John) |
|---|---|---|
| Kern-Workflows | 3x Research, 1x Brief, 1x Brainstorming, 1x Document Project | 3x PRD (Create/Validate/Edit), 1x Epics, 1x Readiness, 1x Course Correction |
| Größter Workflow | Document Project (12 Steps) | Create PRD (15 Step-Files → 12 inline Steps) |
| Shared Data | Keine geteilten Daten zwischen Workflows | Massiv: PRD-Purpose, Project-Types, Domain-Complexity werden von Create/Validate/Edit geteilt |
| Besondere Komplexität | Web-Search-Integration bei Research | Validierungs-Framework (13 Checks mit Scoring), Cross-Workflow-Referenzen (Create→Validate→Edit) |
| Shared Features | Party Mode, Advanced Elicitation | Party Mode, Advanced Elicitation |
| Geschätzte Größe | ~2.500-3.500 Zeilen | ~3.500-5.000 Zeilen |

---

## Risiken & Mitigationen

| Risiko | Mitigation |
|---|---|
| File wird zu groß (>5000 Zeilen) | Aggressive Kondensierung der 13 Validation-Steps; Research-ähnliche Steps komprimieren; Universal Rules nur einmal in Section 13 |
| Context-Window-Überlastung | `disable-model-invocation: true` + sectionweises Lesen bei Bedarf |
| Verlust von Nuancen bei Kondensierung | Kritische Details vollständig beibehalten: PRD-Struktur, Validation-Kriterien, FR/NFR-Quality-Standards, Output-Templates |
| Config-Werte hardcoded | Config-Section am Anfang des Files — User kann Werte anpassen |
| Cross-Workflow-Navigation (Create→Validate→Edit) | Klare Section-Referenzen: "→ See SECTION 6" statt externe Dateipfade |
| Agent Manifest für Party Mode | Alle Agenten-Personas kompakt inline als Tabelle |
| CSV-Daten verlieren Struktur | Als Markdown-Tabellen mit allen Spalten einbetten — lesbarer als CSV |
| 15 Create-Steps haben viel Redundanz (Universal Rules in jedem Step) | Universal Rules, Step Processing Rules, Role Reinforcement einmal in Section 13 definieren, Steps referenzieren "Follow SECTION 13 rules" |

---

## Nächste Schritte

1. **Review dieses Plans** durch den User
2. **Implementierung** in der Reihenfolge der Schritte 1–13
3. **Test** des Standalone-Commands mit allen Menüpunkten
4. **Iteration** falls Funktionalität fehlt oder Probleme auftreten
