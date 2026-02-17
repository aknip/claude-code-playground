# impress.js-Effekte in Slidev: Erste Analyse & Empfehlung

**Datum:** 2026-02-14
**Ziel:** impress.js-artige Präsentationen (Prezi-Stil: 3D-Canvas, Kamera-Flüge, Zoom/Rotation) optional in Slidev ermöglichen.
**Kernfrage:** Slidev-Theme oder Slidev-Addon?

---

## 1. Was macht impress.js? -- Detailanalyse

### 1.1 Grundprinzip: Infinite Canvas mit Kamera-Modell

impress.js verwendet ein fundamental anderes Paradigma als klassische Präsentationstools:

| Aspekt | Klassisch (PowerPoint, Slidev default) | impress.js |
|--------|---------------------------------------|------------|
| **Sichtbarkeit** | Nur aktuelle Folie sichtbar | Alle Folien gleichzeitig auf Canvas |
| **Positionierung** | Folien stapeln sich, eine ersetzt die andere | Folien frei auf unendlichem 2D/3D-Canvas verteilt |
| **Navigation** | Folie wird ausgetauscht (enter/leave) | "Kamera" fliegt zum Ziel (translate + rotate + scale) |
| **Transition** | Vue TransitionGroup (CSS enter/leave) | CSS `transform` + `transition` auf Canvas-Element |
| **DOM-Modell** | Eine Folie gleichzeitig im Viewport | Alle Folien im DOM, Kamera schwenkt dazwischen |
| **3D-Raum** | Nicht genutzt | `perspective`, `preserve-3d`, rotate-x/y/z |

### 1.2 Technische Funktionsweise (aus Quellcode-Analyse von `src/impress.js`)

**Zwei-Ebenen-Rendering:**
- **`root`-Element**: Steuert **Skalierung** (Zoom) via `transform: scale()`
- **`canvas`-Element**: Steuert **Rotation und Translation** via `transform: rotate3d() translate3d()`

**Kamera-Berechnung (inverse Transformation):**
```javascript
// Zielposition = Inverse der Slide-Koordinaten
var target = {
    rotate:    { x: -step.rotate.x, y: -step.rotate.y, z: -step.rotate.z },
    translate: { x: -step.translate.x, y: -step.translate.y, z: -step.translate.z },
    scale:     1 / step.scale
};
```

**Intelligentes Zoom-Sequencing:**
- Zoom-In: Erst move/rotate, dann scale (mit Delay)
- Zoom-Out: Erst scale, dann move/rotate (mit Delay)
- Erzeugt natürlich wirkende Kamerabewegungen

### 1.3 Positionierungs-Attribute pro Folie

| Attribut | Beschreibung | Default |
|----------|-------------|---------|
| `data-x` | X-Position auf Canvas (px) | 0 |
| `data-y` | Y-Position auf Canvas (px) | 0 |
| `data-z` | Z-Position (Tiefe, px) | 0 |
| `data-rotate` / `data-rotate-z` | Rotation um Z-Achse (Grad) | 0 |
| `data-rotate-x` | Rotation um X-Achse (Grad) | 0 |
| `data-rotate-y` | Rotation um Y-Achse (Grad) | 0 |
| `data-rotate-order` | Reihenfolge der Rotationen ("xyz", "zyx", etc.) | "xyz" |
| `data-scale` | Skalierungsfaktor | 1 |
| `data-transition-duration` | Transitionsdauer (ms) | 1000 |

### 1.4 Visuelle Effekte der Demo & Beispiele

#### Haupt-Demo (`index.html`)

Die Haupt-Demo zeigt das volle Spektrum:

1. **Horizontaler Pan** (Folien 1-3): Drei klassisch aussehende Folien nebeneinander, Kamera fährt horizontal
2. **Dramatischer Zoom-Out** (Folie 4, "title"): `scale=4` -- Kamera zieht sich auf 4x zurück, zeigt riesigen Titel "impress.js". Text-Elemente schweben auf verschiedenen Z-Ebenen (Parallax-Effekt via `translateZ`)
3. **Kombination Pan + Rotation + Zoom** (Folie 5, "its"): `rotate=90, scale=5` -- Gleichzeitiges Schwenken, 90-Grad-Drehung und Zoom-Out
4. **180-Grad-Drehung** (Folie 6, "big"): Kopfstehend relativ zum Start, `scale=6`, Wort "big" in 250px
5. **Z-Achsen-Tauchgang** (Folie 7, "tiny"): `z=-3000` -- Kamera taucht tief in den Bildschirm, vertiginöser 3D-Effekt
6. **CSS-Animationen im Slide** (Folie 8, "ing"): Wörter "positioning", "rotating", "scaling" animieren sich selbst (translate, rotate, scale) wenn die Folie aktiv wird
7. **Multi-Achsen 3D-Rotation** (Folie 12, "its-in-3d"): `rotate-x=-40, rotate-y=10` -- Folie schwebt auf geneigter 3D-Ebene, individuelle Wörter auf verschiedenen Z-Tiefen
8. **Overview-Zoom** (Folie 13): `scale=10` -- Zeigt alle Folien gleichzeitig in Vogelperspektive

#### Beispiel: Classic Slides

- Traditionelles PowerPoint-Aussehen mit impress.js als Engine
- Horizontale Anordnung mit `data-rel-x` (relative Positionierung)
- Enthält: Syntax-Highlighting (Highlight.js), Mermaid-Diagramme, MathJax, Markdown, interaktive Balkendiagramme
- Substep-Animationen (Bullet-Points einzeln einblenden)
- Beweist: impress.js kann auch "normal", aber mit smoothen Canvas-Übergängen

#### Beispiel: 3D Rotations

- 8 Folien auf helikaler/spiralförmiger 3D-Bahn
- Nutzt `data-rotate-order="zyx"` für Positionen, die mit Default "xyz" unmöglich wären
- Dunkler Hintergrund (#00000f), dramatische Raumschiff-Atmosphäre
- 2s Transitionsdauer für langsame, eindrucksvolle 3D-Flüge
- Folien bei nur 10% Opazität wenn inaktiv

#### Beispiel: Cube

- 6 Folien als Würfelflächen angeordnet (je 350px vom Zentrum)
- **Räumliche Navigation**: Pfeiltasten navigieren zur physisch benachbarten Würfelfläche
- Kamera dreht sich um 90 Grad zwischen Flächen -- Gefühl, einen Würfel in der Hand zu drehen
- Overview-Position zeigt Würfel von außen

#### Beispiel: 2D Navigation

- Grid-basiertes Layout mit Bookmark-Plugin
- Tastatur-Shortcuts für direkte Navigation (1-9, J/K/L, U/I/O)
- Hintergrundbilder fixiert relativ zum Canvas
- Zeigt: impress.js ermöglicht auch nicht-lineare Navigationspfade

#### Beispiel: Markdown

- Inhalt komplett in Markdown geschrieben (im HTML eingebettet)
- `-----` als Slide-Separator
- Zeigt CSS-Theme-Switching live (Black&White, Devopsy, Effects)
- Beweist Kombination aus einfacher Authoring und voller impress.js-Power

### 1.5 Schlüsselmerkmale, die impress.js einzigartig machen

1. **Infinite Canvas**: Alle Inhalte existieren gleichzeitig, räumliche Beziehungen sind sichtbar
2. **Echter 3D-Raum**: CSS3 `perspective`, `preserve-3d`, Rotation um alle drei Achsen
3. **Stufenlose Kameraflüge**: Gleichzeitige Interpolation von Position, Rotation und Skalierung
4. **Scale als Storytelling**: Zoom-In für Details, Zoom-Out für große Konzepte
5. **Kontextuelle Sichtbarkeit**: Inaktive Folien bleiben sichtbar (gedimmt), Orientierung im Canvas
6. **CSS-getriebene Micro-Animationen**: `future` -> `present` -> `past` Klassen für Slide-interne Effekte
7. **Overview-Muster**: Zoom auf `scale=10+` zeigt gesamte Präsentation als visuelles Artefakt

---

## 2. Slidev-Architektur: Themes vs. Addons

### 2.1 Theme-Architektur

**Was ein Theme bereitstellen kann:**

| Kategorie | Verzeichnis/Datei | Beschreibung |
|-----------|-------------------|-------------|
| Globale Styles | `styles/index.css` | CSS für gesamte Präsentation |
| Layouts | `layouts/*.vue` | Slide-Layout Vue-Komponenten |
| Komponenten | `components/*.vue` | Auto-importierte Vue-Komponenten |
| Setup | `setup/main.ts` | Vue App Config, Plugins, Injections |
| Vite Plugins | `setup/vite-plugins.ts` | Build-Pipeline-Erweiterung |
| Default Config | `package.json` `slidev.defaults` | Default Frontmatter-Werte |
| Global Layers | `global-top.vue`, `global-bottom.vue` | Persistente Overlay-Komponenten |

**Einschränkungen:**
- **Nur EIN Theme pro Projekt** -- ein impress.js-Theme würde andere Themes ausschließen
- Theme soll primär **visuelles Erscheinungsbild** definieren, nicht Funktionalität
- Kann die Default-Transition setzen, aber **nicht den Transitions-Mechanismus selbst ersetzen**

### 2.2 Addon-Architektur

**Identische technische Fähigkeiten wie Themes**, aber:

| Aspekt | Theme | Addon |
|--------|-------|-------|
| **Kardinalität** | Nur EINES pro Projekt | MEHRERE erlaubt |
| **Zweck** | Visuelles Erscheinungsbild | Feature-Erweiterung, Funktionalität |
| **Sollte bieten** | Styles, Layout-Overrides | Komponenten, Code Runner, Tools |
| **Naming** | `slidev-theme-*` | `slidev-addon-*` |

**Addon kann alles, was ein Theme kann:**
- `setup/main.ts` -- Voller Zugriff auf Vue-App-Instanz
- `global-top.vue` / `global-bottom.vue` -- Globale Overlay-Komponenten
- `components/*.vue` -- Auto-importierte Komponenten
- `setup/vite-plugins.ts` -- Custom Vite Plugins
- `styles/index.css` -- CSS

### 2.3 Slidev's Transitions-System

**Default-Ablauf:**
```
Markdown -> Parser -> SlideInfo[] -> Vue Router -> SlidesShow.vue ->
  TransitionGroup -> SlideWrapper -> Layout -> Content
```

- Basiert auf **Vue's `TransitionGroup`** Komponente
- Built-in: `fade`, `slide-left`, `slide-right`, `slide-up`, `slide-down`, `view-transition`
- Custom Transitions: CSS-Klassen (`.my-transition-enter-active`, etc.)
- `SlidesShow.vue` ist **intern in `@slidev/client`** -- nicht durch Themes/Addons ersetzbar
- Slidev rendert nur **aktuelle + benachbarte Folien** (nicht alle gleichzeitig)

### 2.4 Verfügbare Extension Points für impress.js-Integration

| Extension Point | Verfügbar via | Potenzial für impress.js |
|----------------|---------------|-------------------------|
| `setup/main.ts` | Theme & Addon | Vue Plugin, Router-Hooks, globaler State |
| `global-top.vue` | Theme & Addon | Overlay mit eigenem Canvas-Rendering |
| `global-bottom.vue` | Theme & Addon | Underlay unter allen Slides |
| `components/*.vue` | Theme & Addon | Canvas-Komponente, Kamera-Steuerung |
| `styles/index.css` | Theme & Addon | 3D-Transforms, Perspective, Default-Override |
| `setup/vite-plugins.ts` | Theme & Addon | Frontmatter-Parsing, Content-Transformation |
| `useNav()` Composable | `@slidev/client` | `currentPage`, `next()`, `prev()`, `go()`, alle Routes mit Frontmatter |

---

## 3. Empfehlung: Addon (nicht Theme)

### 3.1 Entscheidung: `slidev-addon-impress`

**Klare Empfehlung: Addon.** Begründung:

#### Warum KEIN Theme:

1. **Exklusivität**: Nur ein Theme pro Projekt -- Nutzer müssten auf ihr bisheriges visuelles Theme (seriph, apple-basic, etc.) verzichten
2. **Falsche Abstraktion**: impress.js-Positionierung ist **Funktionalität/Verhalten**, nicht visuelles Erscheinungsbild
3. **Keine Kombinierbarkeit**: Ein Theme kann nicht mit einem anderen Theme kombiniert werden
4. **Slidev-Designintent**: Themes sind für "global styles, layout overrides, config overrides"

#### Warum Addon:

1. **Koexistenz**: Mehrere Addons können kombiniert werden -- Nutzer behalten ihr visuelles Theme UND bekommen impress.js-Navigation
2. **Feature-Extension**: Exakt der Zweck von Addons -- "functionality usable independently of appearance"
3. **Optionalität**: Addon kann pro Folie aktiviert/deaktiviert werden (Frontmatter)
4. **Zukunftssicherheit**: Unabhängig vom gewählten visuellen Theme

### 3.2 Vorgeschlagene Architektur

```
slidev-addon-impress/
├── components/
│   └── ImpressCanvas.vue        # 3D Canvas/Kamera-System
├── setup/
│   ├── main.ts                  # Vue Plugin: impress State, Router-Hooks
│   └── vite-plugins.ts          # Frontmatter-Erweiterung parsen
├── global-top.vue               # Overlay: implementiert impress.js Canvas
├── styles/
│   └── index.css                # 3D Transforms, Perspective, Override Default-Transitions
├── layouts/
│   └── impress.vue              # Optional: Layout für Canvas-Content
└── package.json
```

### 3.3 Implementierungs-Strategie: Global Layer Override + CSS Hijacking

**Bevorzugter Ansatz (Layout + Global Layer):**

1. **Frontmatter pro Folie** definiert räumliche Koordinaten:
   ```yaml
   ---
   impressX: 850
   impressY: 3000
   impressZ: 0
   impressRotate: 90
   impressRotateX: 0
   impressRotateY: 0
   impressScale: 5
   ---
   ```

2. **`global-top.vue`** liest via `useNav()` den aktuellen Slide und alle Slide-Routes (inkl. Frontmatter), rendert eigenes Canvas-System mit 3D-Transforms

3. **`setup/main.ts`** registriert Vue Plugin:
   - Reaktiver impress-State (aktuelle Position, Zielposition, Animationsstatus)
   - Router-Interception für smooth Camera-Transitions statt Default-Transitions
   - `app.provide('impressState', state)` für Zugriff in allen Komponenten

4. **CSS-Overrides** deaktivieren Standard-TransitionGroup und ersetzen mit Canvas-Transforms:
   ```css
   /* Standard-Transitions deaktivieren wenn impress aktiv */
   .impress-mode .slidev-slides { transition: none !important; }
   ```

5. **Fallback**: Wenn keine impress-Koordinaten im Frontmatter, verhält sich alles wie Standard-Slidev

### 3.4 Technische Herausforderungen

| Herausforderung | Schwierigkeit | Lösungsansatz |
|----------------|---------------|---------------|
| **Alle Folien gleichzeitig rendern** | Hoch | `global-top.vue` rendert eigene Slide-Container; oder CSS-Override der Default-Visibility |
| **Default-Transition ersetzen** | Mittel | CSS `!important` Overrides + Router-Interception in `setup/main.ts` |
| **Presenter Mode Kompatibilität** | Mittel | Detect `?presenter` Route, deaktiviere impress-Mode oder adaptiere |
| **Overview Mode** | Niedrig | Natürliches impress.js-Feature (scale=10 Slide am Ende) |
| **v-click / Animationen** | Niedrig | Funktionieren innerhalb einzelner Slides weiterhin |
| **Export (PDF)** | Mittel | Im Export-Modus Standard-Rendering verwenden |
| **Performance bei vielen Slides** | Mittel | Lazy-Rendering für weit entfernte Slides, nur nahe Slides voll rendern |

### 3.5 Alternative Ansätze (nachrangig)

| Ansatz | Beschreibung | Bewertung |
|--------|-------------|-----------|
| **A: Full Vue-Level Replacement** | `setup/main.ts` ersetzt komplettes Rendering | Mächtig, aber fragil bei Slidev-Updates |
| **B: Custom Vite Plugin** | `setup/vite-plugins.ts` transformiert Slide-Output zur Build-Time | Komplex, schwer debugbar |
| **C: Layout + Global Layer** (empfohlen) | Layout-Komponente + `global-top.vue` für Canvas | Am wartbarsten, nutzt offizielle Extension Points |

---

## 4. Existierende Lösungen

**Es gibt keine existierende impress.js-Integration für Slidev.** Weder als Theme noch als Addon. Dies wäre eine **Neuimplementierung**.

Recherchiert wurden:
- npm Registry (`slidev-addon-impress`, `slidev-theme-impress`, `slidev-addon-3d`, `slidev-addon-canvas`)
- GitHub Suche
- Slidev Addon Gallery (https://sli.dev/resources/addon-gallery)
- Slidev Community Discussions

---

## 5. Zusammenfassung

| Aspekt | Empfehlung |
|--------|-----------|
| **Theme oder Addon?** | **Addon** (`slidev-addon-impress`) |
| **Implementierungs-Ansatz** | Layout + Global Layer (Ansatz C) |
| **Priorität der Features** | 1. 2D-Positionierung (x,y) + Scale, 2. Rotation (z), 3. Z-Achse/3D, 4. Overview |
| **Kompatibilität** | Kombinierbar mit jedem Slidev-Theme |
| **Aktivierung** | Per Frontmatter opt-in (kein impress-Frontmatter = Standard-Verhalten) |
| **Neuheit** | Keine existierende Lösung -- Neuimplementierung erforderlich |

---

## Quellen

- impress.js Quellcode: `_NOTES/impress.js/src/impress.js` (lokal analysiert)
- impress.js Demo: `_NOTES/impress.js/index.html` (lokal analysiert)
- impress.js Beispiele: `_NOTES/impress.js/examples/` (classic-slides, 3D-rotations, cube, 2D-navigation, markdown)
- [Slidev Theme & Addon Docs](https://sli.dev/guide/theme-addon)
- [Slidev Writing Themes](https://sli.dev/guide/write-theme)
- [Slidev Writing Addons](https://sli.dev/guide/write-addon)
- [Slidev Animations & Transitions](https://sli.dev/guide/animations.html)
- [Slidev Global Layers](https://sli.dev/features/global-layers)
- [Slidev SlidesShow.vue (Source)](https://github.com/slidevjs/slidev/blob/main/packages/client/internals/SlidesShow.vue)
- [impress.js GitHub](https://github.com/impress/impress.js)
