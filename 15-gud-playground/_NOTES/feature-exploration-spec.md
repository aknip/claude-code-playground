# Spezifikation: `uc:feature-exploration`

> Interaktive Exploration von Umsetzungsszenarien auf Basis der Summary-Level Use Cases.
> Optionaler Schritt zwischen `/uc:new-project` und `/uc:use-case-analysis`.

---

## 1. Einordnung im Workflow

```
/uc:new-project          →  PROJECT.md mit Summary-Level Use Cases
/uc:feature-exploration  →  (OPTIONAL) Szenarien explorieren, Clickdummy, finale Auswahl
/uc:use-case-analysis    →  User-Goal Use Cases + Roadmap (nutzt finales Szenario als Input)
```

**Voraussetzung:** `.planning/PROJECT.md` muss existieren (mit `## Use Cases (Summary)` Sektion).

**Ergebnis:** Ein finales Umsetzungsszenario in `.planning/scenarios/final/FINAL-SCENARIO.md`, das von `/uc:use-case-analysis` als zusätzlicher Kontext gelesen wird.

---

## 2. Datenmodell & Persistenz

### 2.1 Verzeichnisstruktur

```
.planning/
  scenarios/
    SCENARIOS-STATE.md                          # Index aller Szenarien + Status
    scenario-01-[slug]/
      SCENARIO.md                               # Gesammelte Ideen, Entscheidungen, Features
      YYYYMMDD_HHMMSS_wireframe.html            # HTML-Clickdummy (jede Version eine neue Datei)
      roadmap.md                                 # Mermaid-Diagramm der vorgeschlagenen Roadmap
      HISTORY.md                                 # Chronologisches Protokoll aller Frage/Antwort-Runden
    scenario-02-[slug]/
      ...
    final/
      FINAL-SCENARIO.md                         # Das finale, freigegebene Szenario
      YYYYMMDD_HHMMSS_wireframe.html            # Finaler Clickdummy
      roadmap.md                                 # Finale Roadmap-Visualisierung
```

### 2.2 SCENARIOS-STATE.md (Index)

```markdown
# Feature Exploration — Szenarien

> Projekt: [Projektname]
> Erstellt: [Datum]
> Letzter Stand: [Datum]

## Szenarien

| # | Name | Status | Leitidee | Letzte Bearbeitung |
|---|------|--------|----------|--------------------|
| 1 | [Name] | Aktiv / Pausiert | [1 Satz] | [Datum] |
| 2 | [Name] | Aktiv / Pausiert | [1 Satz] | [Datum] |

## Finales Szenario

Status: Offen / Festgelegt
Quelle: — / Szenario X / Synthese aus X+Y / Automatisch generiert
```

### 2.3 SCENARIO.md (pro Szenario)

```markdown
# Szenario: [Name]

> Leitidee: [1-2 Sätze, die den Kern des Ansatzes beschreiben]
> Erstellt: [Datum]
> Letzter Stand: [Datum]

## Bezug zu Summary-Level Use Cases

| UC | Name | Umsetzungsidee in diesem Szenario |
|----|------|-----------------------------------|
| UC-S-001 | [Name] | [Wie wird dieser UC hier umgesetzt?] |
| UC-S-002 | [Name] | [Wie wird dieser UC hier umgesetzt?] |

## Bedienkonzept & Userworkflows

### [Workflow 1: z. B. Submission erfassen]
- [Beschreibung des Ablaufs aus Nutzersicht]
- [Besondere UI-Ideen, Interaktionsmuster]

### [Workflow 2: ...]
- ...

## Funktionalitäten & Features

| Feature | Beschreibung | Bezug UC | Priorität |
|---------|-------------|----------|-----------|
| [Feature] | [Beschreibung] | UC-S-XXX | Must/Should/Could |

## UI-Konzept

- [Layout-Ansatz: z. B. Dashboard-zentriert, Wizard-basiert, Kanban-Board]
- [Navigation: z. B. Sidebar, Tabs, Breadcrumbs]
- [Besonderheiten: z. B. Split-View, Drag & Drop]

## Vorgeschlagene User-Goal Use Cases

| ID (Entwurf) | Name | Bezug UC-S | Beschreibung |
|---------------|------|------------|--------------|
| UG-E-001 | [Name] | UC-S-001 | [Kurzbeschreibung] |
| UG-E-002 | [Name] | UC-S-001 | [Kurzbeschreibung] |

> Hinweis: IDs mit Prefix "UG-E" (Exploration) — werden bei Finalisierung
> in offizielle UC-UG-XXX IDs umgewandelt.

## Vorgeschlagene Roadmap-Phasen

| Phase | Ziel | Use Cases | Begründung |
|-------|------|-----------|------------|
| 1 | [Ziel] | UG-E-001, UG-E-002 | [Warum zuerst?] |
| 2 | [Ziel] | UG-E-003 | [Warum danach?] |

## Offene Fragen & Notizen

- [Noch ungeklärte Punkte]
- [Ideen für spätere Vertiefung]
```

### 2.4 HISTORY.md (pro Szenario)

Chronologisches Protokoll aller Interaktionen, damit bei Unterbrechung nahtlos fortgefahren werden kann:

```markdown
# Szenario [Name] — Verlauf

## Runde 1 — [Datum, Uhrzeit]
**Thema:** [Bereich, der besprochen wurde]
**Frage:** [Gestellte Frage]
**Antwort:** [Zusammenfassung der Benutzerantwort]
**Ergebnis:** [Was wurde in SCENARIO.md aktualisiert]
**Visualisierung:** [Clickdummy aktualisiert: ja/nein] [Roadmap aktualisiert: ja/nein]

## Runde 2 — [Datum, Uhrzeit]
...
```

---

## 3. Kommando-Definition (YAML Frontmatter)

```yaml
---
name: uc:feature-exploration
description: Explore implementation scenarios for Summary-Level use cases
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Task
  - AskUserQuestion
---
```

---

## 4. Prozessbeschreibung

### Phase 1: Voraussetzungen prüfen

1. **PROJECT.md prüfen:**
   ```bash
   [ ! -f .planning/PROJECT.md ] && echo "ERROR: Kein Projekt gefunden. Zuerst /uc:new-project ausführen." && exit 1
   ```

2. **Summary-Level Use Cases vorhanden?**
   - Lese `.planning/PROJECT.md`
   - Prüfe, ob `## Use Cases (Summary)` Sektion mindestens einen UC-S-XXX enthält
   - Falls nicht: Fehler mit Hinweis auf `/uc:new-project`

3. **Bestehende Szenarien laden:**
   ```bash
   if [ -f .planning/scenarios/SCENARIOS-STATE.md ]; then
     echo "Bestehende Exploration gefunden"
   fi
   ```

### Phase 2: Hauptmenü

**Stage Banner:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 UC ► FEATURE EXPLORATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Wenn keine Szenarien existieren:** Direkt zu "Neues Szenario anlegen" (Phase 3).

**Wenn Szenarien existieren:** Zeige Übersicht und Auswahlmenü.

```
## Aktuelle Szenarien

| # | Name | Status | Leitidee | Runden |
|---|------|--------|----------|--------|
| 1 | Wizard-basiert | Aktiv | Schritt-für-Schritt Wizard | 5 |
| 2 | Dashboard-First | Pausiert | Alles auf einen Blick | 3 |

Finales Szenario: Noch nicht festgelegt
```

AskUserQuestion:
- header: "Aktion"
- question: "Was möchtest du tun?"
- options:
  - "An Szenario weiterarbeiten" — Ein bestehendes Szenario weiter ausarbeiten
  - "Neues Szenario anlegen" — Eine neue Umsetzungsidee starten
  - "Szenario löschen" — Ein bestehendes Szenario entfernen
  - "Finales Szenario festlegen" — Exploration abschließen und finales Szenario definieren

### Phase 3: Neues Szenario anlegen

AskUserQuestion:
- header: "Szenario"
- question: "Gib dem neuen Szenario einen kurzen Namen (z. B. 'Wizard-basiert', 'Dashboard-First', 'Kanban-Style')."

Dann:
- header: "Leitidee"
- question: "Beschreibe in 1-2 Sätzen die Grundidee dieses Szenarios."

**Verzeichnis anlegen:**
```bash
SCENARIO_NUM=$(printf "%02d" [nächste freie Nummer])
SCENARIO_SLUG=[slug aus Name]
mkdir -p ".planning/scenarios/scenario-${SCENARIO_NUM}-${SCENARIO_SLUG}"
```

**Initiale Dateien erstellen:**
- `SCENARIO.md` mit Grundstruktur (Name, Leitidee, UC-Bezugstabelle mit leeren Umsetzungsideen)
- `HISTORY.md` mit Header
- `SCENARIOS-STATE.md` aktualisieren (neues Szenario eintragen)

**Weiter mit Phase 5 (Interaktive Arbeit am Szenario).**

### Phase 4: Szenario auswählen (Weiterarbeiten)

**Wenn nur 1 Szenario:** Direkt auswählen.

**Wenn mehrere Szenarien:**

AskUserQuestion:
- header: "Szenario"
- question: "An welchem Szenario möchtest du weiterarbeiten?"
- options: [Liste der Szenarien mit Name + Leitidee]

**Lade:**
- `SCENARIO.md` — aktueller Stand
- `HISTORY.md` — bisherige Fragen/Antworten (letzte 3 Runden als Kontext)

**Zeige Zusammenfassung:**
```
## Szenario: [Name]
Leitidee: [...]
Bisherige Runden: [N]
Zuletzt besprochen: [Thema der letzten Runde]

Noch nicht abgedeckte Summary Use Cases: UC-S-003, UC-S-005
```

**Weiter mit Phase 5.**

### Phase 5: Interaktive Arbeit am Szenario (Kernprozess)

Dies ist der zentrale, iterative Prozess. Er wiederholt sich, bis der Benutzer wechselt oder abbricht.

#### 5.1 Themenvorschlag & Frage

**Analysiere den aktuellen Stand des Szenarios:**
- Welche Summary-Level UCs sind noch nicht/schwach abgedeckt?
- Welche Bereiche fehlen: Bedienkonzept? Workflows? Features? UI-Konzept?
- Was ergibt sich logisch aus den bisherigen Antworten?

**Stelle EINE gezielte Frage** (analog zum `projekt-steckbrief.md` Pattern):
- Fragen zu Bedienung, Userworkflows, Funktionalitäten, UI-Ansätzen
- Schlage Optionen vor, wo sinnvoll (AskUserQuestion mit konkreten Alternativen)
- Zeige Kontext: "Im Bezug auf UC-S-002 (Risiko bewerten)..."

**Fragebereiche (nicht erschöpfend):**

| Bereich | Beispielfragen |
|---------|---------------|
| **Userworkflow** | "Wie soll der Underwriter eine neue Submission starten — über ein Formular, per E-Mail-Import oder per Drag & Drop?" |
| **UI-Layout** | "Soll die Workbench eher ein Dashboard mit Übersicht oder ein fokussierter Wizard sein?" |
| **Navigation** | "Wie navigiert der Underwriter zwischen Vorgängen — Sidebar, Tabs, Suchleiste?" |
| **Datenerfassung** | "Sollen Risikodaten in einem großen Formular oder in logischen Schritten erfasst werden?" |
| **Automatisierung** | "Welche Schritte sollen automatisch passieren (z. B. Vollständigkeitsprüfung)?" |
| **Zusammenarbeit** | "Wie soll die Freigabe durch den Senior Underwriter funktionieren?" |
| **Priorisierung** | "Welche der 6 Summary Use Cases ist für dich am wichtigsten zum Start?" |

**Thema-Guardrails:**
- Keine technischen Architektur-Fragen (das entscheidet Claude später)
- Keine Library/Framework-Fragen
- Fokus auf Nutzer-sichtbares Verhalten, Workflows, Features

#### 5.2 Antwort verarbeiten & persistieren

Nach JEDER Antwort:

1. **SCENARIO.md aktualisieren** — neue Informationen in die passende Sektion eintragen
2. **HISTORY.md aktualisieren** — Frage, Antwort und Ergebnis protokollieren
3. **SCENARIOS-STATE.md aktualisieren** — Zeitstempel der letzten Bearbeitung

#### 5.3 Visualisierung anbieten

Nach jeder Antwort fragen:

AskUserQuestion:
- header: "Visualisierung"
- question: "Soll ich Clickdummy und/oder Roadmap aktualisieren?"
- options:
  - "Beides aktualisieren" — Clickdummy + Roadmap-Diagramm neu generieren
  - "Nur Clickdummy" — HTML-Wireframe aktualisieren
  - "Nur Roadmap" — Mermaid-Diagramm aktualisieren
  - "Nein, weiter mit Fragen" — Keine Visualisierung, nächste Frage

**Alternativ:** Wenn die Antwort keine visuell relevante Änderung enthält (z. B. reine Priorisierung), kann die Frage übersprungen und direkt "Nein, weiter mit Fragen" vorgeschlagen werden.

#### 5.4 HTML-Clickdummy generieren

**Format:** Identisch zum `projekt-steckbrief.md` Pattern:
- Neue Datei pro Version: `YYYYMMDD_HHMMSS_wireframe.html`
- Standalone HTML mit eingebettetem CSS (shadcn Styling) und JavaScript
- Im Browser direkt öffenbar
- Interaktive Elemente: Navigation klickbar, Beispieldaten, Tooltips

**Inhalt des Clickdummy:**
- Visualisiert die bisher gesammelten UI-Konzepte, Workflows und Features
- Zeigt die wichtigsten Screens/Views des Szenarios
- Nutzt Platzhalter `[TBD]` für noch nicht besprochene Bereiche
- Deutsche Beschriftung (Labels, Buttons, Fehlermeldungen)
- Responsive oder zumindest Desktop-optimiert

**Ablage:** Im Szenario-Verzeichnis:
```
.planning/scenarios/scenario-01-[slug]/YYYYMMDD_HHMMSS_wireframe.html
```

#### 5.5 Mermaid-Roadmap generieren

**Format:** Markdown-Datei mit Mermaid-Code-Block.

**Inhalt:**
```markdown
# Roadmap — Szenario: [Name]

> Generiert: [Datum]

## Phasenübersicht

```mermaid
gantt
    title Roadmap — [Szenarioname]
    dateFormat YYYY-MM-DD
    axisFormat %B %Y

    section Phase 1 — [Ziel]
    [Task 1]           :p1t1, 2026-03-01, 2w
    [Task 2]           :p1t2, after p1t1, 1w

    section Phase 2 — [Ziel]
    [Task 3]           :p2t1, after p1t2, 2w
`` `

## Phasen-Details

| Phase | Ziel | User-Goal UCs (Entwurf) | Geschätzte Komplexität |
|-------|------|-------------------------|------------------------|
| 1 | [...] | UG-E-001, UG-E-002 | Mittel |
| 2 | [...] | UG-E-003, UG-E-004 | Hoch |
```

**Ablage:** `roadmap.md` im Szenario-Verzeichnis (wird bei jeder Aktualisierung überschrieben).

#### 5.6 Nächste Aktion wählen

Nach Visualisierung (oder wenn übersprungen):

AskUserQuestion:
- header: "Weiter"
- question: "Wie möchtest du fortfahren?"
- options:
  - "Nächste Frage" — Weiter am aktuellen Szenario arbeiten
  - "Zurück zum Hauptmenü" — Szenario wechseln, neues anlegen, löschen oder finalisieren

**Bei "Nächste Frage":** Zurück zu 5.1.
**Bei "Zurück zum Hauptmenü":** Zurück zu Phase 2.

### Phase 6: Szenario löschen

AskUserQuestion:
- header: "Löschen"
- question: "Welches Szenario möchtest du löschen?"
- options: [Liste der Szenarien]

**Sicherheitsabfrage:**

AskUserQuestion:
- header: "Bestätigung"
- question: "Szenario '[Name]' wirklich löschen? Alle Dateien (inkl. Clickdummies) werden entfernt."
- options:
  - "Ja, löschen" — Unwiderruflich entfernen
  - "Abbrechen" — Zurück zum Hauptmenü

**Bei Bestätigung:**
```bash
rm -rf ".planning/scenarios/scenario-NN-[slug]"
```
- `SCENARIOS-STATE.md` aktualisieren (Szenario entfernen)
- Zurück zu Phase 2

### Phase 7: Finales Szenario festlegen

**Stage Banner:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 UC ► FINALISIERUNG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Szenarien-Vergleich anzeigen:**

```
## Szenarien im Vergleich

| Aspekt | Szenario 1: Wizard | Szenario 2: Dashboard |
|--------|--------------------|-----------------------|
| Leitidee | Schritt-für-Schritt | Alles auf einen Blick |
| UC-S-001 | Wizard mit 5 Steps | Dashboard-Widget |
| UC-S-002 | Inline-Scoring | Separate Bewertungsseite |
| Features | 12 | 8 |
| Entwurfs-UGs | 8 | 6 |
| Phasen | 4 | 3 |
```

AskUserQuestion:
- header: "Finalisierung"
- question: "Wie möchtest du das finale Szenario bestimmen?"
- options:
  - "Szenario direkt übernehmen" — Eines der Szenarien 1:1 als finales Szenario verwenden
  - "Synthese (dialoggestützt)" — Elemente aus mehreren Szenarien im Dialog kombinieren
  - "Automatische Synthese" — Beste Kombination automatisch generieren lassen

#### 7.1 Direkte Übernahme

AskUserQuestion:
- header: "Auswahl"
- question: "Welches Szenario soll als finales Szenario übernommen werden?"
- options: [Liste der Szenarien]

**Aktion:**
- Kopiere `SCENARIO.md` → `final/FINAL-SCENARIO.md`
- Kopiere neuesten Clickdummy → `final/`
- Kopiere `roadmap.md` → `final/`
- `SCENARIOS-STATE.md` aktualisieren (Status: Festgelegt, Quelle: Szenario X)

#### 7.2 Dialoggestützte Synthese

Interaktiver Prozess, der die Szenarien Bereich für Bereich vergleicht:

**Für jeden Bereich (Workflows, Features, UI-Konzept, Roadmap):**

1. Zeige die Ansätze der verschiedenen Szenarien nebeneinander
2. AskUserQuestion: "Welchen Ansatz bevorzugst du für [Bereich]?"
   - Optionen: Szenario 1 / Szenario 2 / ... / Eigene Idee
3. Ergebnis in `FINAL-SCENARIO.md` eintragen

**Nach Abschluss aller Bereiche:**
- Neuen Clickdummy generieren, der die Synthese visualisiert
- Neue Roadmap generieren
- AskUserQuestion: "Ist das finale Szenario so korrekt?"
  - "Ja, finalisieren" — Abschluss
  - "Anpassen" — Welcher Bereich soll geändert werden?

#### 7.3 Automatische Synthese

Claude analysiert alle Szenarien und generiert automatisch ein optimales finales Szenario:

**Kriterien:**
- Features mit der höchsten Abdeckung der Summary-Level UCs
- Konsistentestes UI-Konzept
- Pragmatischste Roadmap (Must-Features zuerst)
- Keine widersprüchlichen Ansätze

**Ergebnis präsentieren:**
- Zeige `FINAL-SCENARIO.md` mit Markierungen, woher jedes Element stammt
- Generiere Clickdummy + Roadmap
- AskUserQuestion: "Ist die automatische Synthese akzeptabel?"
  - "Ja, finalisieren" — Abschluss
  - "Anpassen" — Wechsel zu dialoggestützter Synthese (7.2)
  - "Neu generieren" — Andere Gewichtung vorgeben

### Phase 8: Abschluss

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 UC ► FEATURE EXPLORATION COMPLETE ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**[Projektname]**

| Artefakt              | Ablageort                                    |
|-----------------------|----------------------------------------------|
| Finales Szenario      | `.planning/scenarios/final/FINAL-SCENARIO.md` |
| Finaler Clickdummy    | `.planning/scenarios/final/[timestamp]_wireframe.html` |
| Finale Roadmap        | `.planning/scenarios/final/roadmap.md`        |
| Szenarien-Index       | `.planning/scenarios/SCENARIOS-STATE.md`      |

**[N] Szenarien exploriert** | **Finales Szenario: [Name/Synthese]** ✓

───────────────────────────────────────────────────────

## ▶ Next Up

**Use Case Analysis & Roadmap** — nutzt finales Szenario als zusätzlichen Kontext

`/uc:use-case-analysis`

<sub>`/clear` first → fresh context window</sub>

───────────────────────────────────────────────────────

**Auch verfügbar:**
- `/uc:feature-exploration` — Exploration erneut öffnen (Szenarien bearbeiten)
- `/uc:progress` — Use Case Fortschritt anzeigen
- `/uc:help` — Alle verfügbaren Kommandos

───────────────────────────────────────────────────────
```

---

## 5. Integration mit `uc:use-case-analysis`

### 5.1 Erweiterung von `uc:use-case-analysis`

`uc:use-case-analysis` muss angepasst werden, um das finale Szenario als Input zu erkennen:

**In Phase 1 (Prerequisites Check) zusätzlich:**
```bash
if [ -f .planning/scenarios/final/FINAL-SCENARIO.md ]; then
  echo "Finales Exploration-Szenario gefunden — wird als zusätzlicher Kontext verwendet"
  EXPLORATION_CONTEXT=".planning/scenarios/final/FINAL-SCENARIO.md"
fi
```

**In Phase 2 (Use Case Analysis) an den uc-analyst Agent übergeben:**
```
<exploration_context>
@.planning/scenarios/final/FINAL-SCENARIO.md
</exploration_context>
```

Der uc-analyst nutzt dann:
- Die vorgeschlagenen User-Goal Use Cases (UG-E-XXX) als Ausgangsbasis
- Die Feature-Liste für die Priorisierung
- Die vorgeschlagene Roadmap als Orientierung für die Phaseneinteilung
- Die UI-Konzepte für die Scenario-Beschreibungen

### 5.2 Mapping UG-E → UC-UG

Bei der Übernahme durch `uc:use-case-analysis`:
- `UG-E-001` → `UC-UG-001` (offizielle ID)
- Exploration-spezifische Details werden in die Use-Case-Templates übernommen
- Nicht alle UG-E müssen 1:1 übernommen werden — der uc-analyst kann zusammenfassen, splitten oder ergänzen

---

## 6. Unterbrechbarkeit & Session-Management

### 6.1 Persistenz-Garantie

**Nach JEDER Interaktion** (Frage/Antwort) werden folgende Dateien gespeichert:
1. `SCENARIO.md` — aktueller Stand des Szenarios
2. `HISTORY.md` — neue Runde angehängt
3. `SCENARIOS-STATE.md` — Zeitstempel aktualisiert

→ Bei Abbruch (Ctrl+C, `/clear`, Kontextfenster-Wechsel) geht KEIN Fortschritt verloren.

### 6.2 Nahtloses Fortsetzen

Beim erneuten Aufruf von `/uc:feature-exploration`:
1. Lade `SCENARIOS-STATE.md`
2. Zeige Hauptmenü mit allen existierenden Szenarien
3. Bei "Weiterarbeiten": Lade `SCENARIO.md` + letzte 3 Runden aus `HISTORY.md`
4. Fahre dort fort, wo aufgehört wurde

### 6.3 Git-Commits

**Automatische Commits an definierten Punkten:**
- Neues Szenario angelegt
- Nach jeder 3. Interaktionsrunde (nicht nach jeder einzelnen, um Commit-Noise zu vermeiden)
- Szenario gelöscht
- Finales Szenario festgelegt

**Commit-Format:**
```
docs(exploration): [Aktion] — [Szenario-Name]

Beispiele:
docs(exploration): neues Szenario angelegt — Wizard-basiert
docs(exploration): Szenario aktualisiert — Dashboard-First (Runden 4-6)
docs(exploration): Szenario gelöscht — Kanban-Style
docs(exploration): finales Szenario festgelegt — Synthese aus Wizard + Dashboard
```

---

## 7. Erfolgs-Kriterien

- [ ] Voraussetzungen geprüft (PROJECT.md mit Summary-Level UCs vorhanden)
- [ ] Bestehende Szenarien erkannt und geladen (falls vorhanden)
- [ ] Hauptmenü mit allen 4 Aktionen funktional
- [ ] Neues Szenario anlegen: Name, Leitidee, Verzeichnis, initiale Dateien
- [ ] Interaktiver Kernprozess: Fragen stellen, Antworten verarbeiten, persistieren
- [ ] HTML-Clickdummy: Standalone, shadcn-Styling, interaktiv, versioniert
- [ ] Mermaid-Roadmap: Gantt-Diagramm mit Phasen und Tasks
- [ ] Unterbrechung jederzeit möglich, Fortschritt geht nicht verloren
- [ ] Szenario löschen mit Sicherheitsabfrage
- [ ] Finalisierung: Direkte Übernahme, dialoggestützte Synthese ODER automatische Synthese
- [ ] Finales Szenario in `.planning/scenarios/final/` abgelegt
- [ ] `SCENARIOS-STATE.md` konsistent aktualisiert
- [ ] Benutzer weiß, dass nächster Schritt `/uc:use-case-analysis` ist
- [ ] Integration mit `uc:use-case-analysis` spezifiziert (Kontext-Übergabe)

---

## 8. Designentscheidungen (geklärt)

| # | Frage | Entscheidung |
|---|-------|-------------|
| 1 | Vergleichsmodus im Clickdummy? | **Nein** — Szenarien werden einzeln betrachtet, Vergleich erfolgt über die Tabelle in der Finalisierungsphase |
| 2 | Shared UI-Elemente zwischen Szenarien? | **Nein** — Jedes Szenario ist eine vollständig eigenständige HTML-Datei, keine Abhängigkeiten |
| 3 | Maximale Anzahl Szenarien? | **Kein Limit, keine Warnung** — Beliebig viele Szenarien ohne Einschränkung |
| 4 | Konfidenzwerte bei automatischer Synthese? | **Nein** — Automatische Synthese ohne Konfidenzwerte, einfacher und weniger Noise |

---

*Erstellt: 2026-02-21*
*Version: 1.1 (Designentscheidungen geklärt)*
