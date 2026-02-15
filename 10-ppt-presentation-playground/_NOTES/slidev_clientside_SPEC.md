# Slidev Client-Side Viewer: Spezifikation

## 1. Ziel und Grundprinzip

Eine rein clientseitige Implementierung (kein Node.js, kein Vite, kein Build-Server zur Laufzeit), die **dieselben `.md`-Präsentationsdateien, dasselbe Theme (`theme-mgm`) und dasselbe Addon (`slidev-addon-impress`)** rendert — ohne jegliche Anpassung an den Quelldateien.

**Kernprinzip:** Die `.md`-Datei ist die Single Source of Truth. Sie wird unverändert sowohl vom serverseitigen Slidev als auch vom clientseitigen Viewer gelesen und dargestellt.

---

## 2. Architektur-Ansatz

**Ansatz A aus der Analyse:** Vorcompilierter Viewer.

Die Layouts und Theme-Komponenten werden vorab (einmalig per Build-Schritt) zu JavaScript kompiliert und als Bundle ausgeliefert. Nur das Markdown-Parsing und die Zuordnung zu Layouts geschieht zur Laufzeit im Browser.

```
┌─────────────────────────────────────────────────────────┐
│  Browser (clientseitiger Viewer)                        │
│                                                         │
│  ┌──────────────┐   ┌──────────────┐   ┌────────────┐  │
│  │  .md Datei   │──▶│  MD Parser   │──▶│  Renderer  │  │
│  │  (per fetch)  │   │  + Splitter  │   │  (Vue 3)   │  │
│  └──────────────┘   └──────────────┘   └────────────┘  │
│                                               │         │
│                     ┌─────────────────────────┼───────┐ │
│                     │  Vorcompilierte Bundles  │       │ │
│                     │  ┌───────────┐ ┌────────▼────┐  │ │
│                     │  │  Theme    │ │  Layouts     │  │ │
│                     │  │  (CSS)    │ │  (Vue SFC)   │  │ │
│                     │  └───────────┘ └─────────────┘  │ │
│                     │  ┌───────────┐ ┌─────────────┐  │ │
│                     │  │  Impress  │ │  Global-     │  │ │
│                     │  │  Engine   │ │  Bottom      │  │ │
│                     │  └───────────┘ └─────────────┘  │ │
│                     └─────────────────────────────────┘ │
│                                                         │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────┐  │
│  │  Navigation │  │  Presenter │  │  Code-Highlight  │  │
│  │  + Keyboard │  │  Mode      │  │  (Shiki WASM)    │  │
│  └────────────┘  └────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Eingabeformat: Slidev-Markdown-Syntax

### 3.1 Slide-Separator

Slides werden durch horizontale Regeln (`---`) getrennt. Der erste Block (vor dem ersten `---`) ist zugleich der Frontmatter-Block der gesamten Präsentation UND der Inhalt der ersten Folie.

```
---                          ← YAML Frontmatter der Präsentation
theme: ./theme-mgm
title: Meine Präsentation
---

# Folie 1 Inhalt

---                          ← Slide-Separator
layout: title                ← Per-Slide Frontmatter
---

# Folie 2 Inhalt

---
```

### 3.2 Globaler Frontmatter (erste Folie)

Folgende Properties MÜSSEN aus dem globalen Frontmatter gelesen und angewendet werden:

| Property | Typ | Default | Beschreibung |
|---|---|---|---|
| `theme` | string | — | Theme-Referenz (z.B. `./theme-mgm`) |
| `addons` | string[] | `[]` | Liste von Addons (z.B. `["@/slidev-addon-impress"]`) |
| `title` | string | `""` | Präsentationstitel |
| `author` | string | `""` | Autor |
| `colorSchema` | string | `"light"` | Farbschema (`light` / `dark`) |
| `canvasWidth` | number | `980` | Slide-Canvas-Breite in Pixel |
| `aspectRatio` | string | `"16/9"` | Seitenverhältnis (z.B. `"16/9"`, `"4/3"`) |
| `transition` | string | `"none"` | Folientransition |
| `fonts.provider` | string | `"none"` | Schrift-Provider (`"none"` = lokal) |
| `fonts.sans` | string | `"Inter"` | Sans-Serif-Schriftart |
| `fonts.local` | string | `"Inter"` | Lokale Schriftart |

**Impress-spezifische globale Properties:**

| Property | Typ | Default | Beschreibung |
|---|---|---|---|
| `impressEnabled` | boolean | `false` | Aktiviert den Impress-Modus |
| `impressWidth` | number | `1024` | Canvas-Breite für Impress |
| `impressHeight` | number | `768` | Canvas-Höhe für Impress |
| `impressPerspective` | number | `1000` | CSS Perspective-Wert |
| `impressTransitionDuration` | number | `1000` | Transition-Dauer in ms |
| `impressMaxScale` | number | `3` | Maximaler Zoom-Faktor |
| `impressMinScale` | number | `0` | Minimaler Zoom-Faktor |
| `impressBackground` | string | `"radial-gradient(rgb(240,240,240), rgb(190,190,190))"` | Canvas-Hintergrund |

### 3.3 Per-Slide Frontmatter

Jede Folie kann einen eigenen YAML-Block zwischen zwei `---` haben:

| Property | Typ | Default | Beschreibung |
|---|---|---|---|
| `layout` | string | `"default"` | Layout-Name |
| `background` | string | `""` | Hintergrundfarbe (CSS) |
| `cols` | number | `3` | Spaltenanzahl (nur bei `grid`-Layout) |
| `class` | string | `""` | Zusätzliche CSS-Klasse(n) |

**Impress-spezifische Per-Slide Properties:**

| Property | Typ | Default | Beschreibung |
|---|---|---|---|
| `impressX` | number | `0` | X-Position auf dem Canvas |
| `impressY` | number | `0` | Y-Position auf dem Canvas |
| `impressZ` | number | `0` | Z-Position (Tiefe) |
| `impressRotate` | number | `0` | Z-Achsen-Rotation (Grad) |
| `impressRotateX` | number | `0` | X-Achsen-Rotation |
| `impressRotateY` | number | `0` | Y-Achsen-Rotation |
| `impressRotateOrder` | string | `"xyz"` | Rotations-Reihenfolge der Achsen |
| `impressScale` | number | `1` | Zoom-Faktor |
| `impressTransitionDuration` | number | `null` | Überschreibt globale Transition |
| `impressClass` | string | `""` | CSS-Klasse (z.B. `"slide"` → `.impress-slide`) |

### 3.4 Slot-Syntax für Multi-Content-Layouts

Slidev verwendet `::slotname::` als Slot-Separator innerhalb einer Folie:

```markdown
---
layout: v-split
---

# Linke Spalte (Default-Slot)

Text links

::right::

# Rechte Spalte (Named Slot "right")

![Bild](image.webp)
```

**Unterstützte Slot-Namen nach Layout:**

| Layout | Default-Slot | Named Slots |
|---|---|---|
| `default` | Gesamter Inhalt | — |
| `cover` | Gesamter Inhalt | — |
| `title` | Gesamter Inhalt | — |
| `section` | Gesamter Inhalt | — |
| `v-split` | Linke Spalte | `right` (rechte Spalte) |
| `grid` | Grid-Inhalt | — |
| `caption` | Beschreibungstext | `image` (Bild-Bereich) |
| `title-and-columns` | Titel-Bereich | `columns` (Spalten-Bereich) |

### 3.5 Markdown-Inhalte

Der Viewer MUSS folgende Markdown-Elemente korrekt rendern:

- **Überschriften** H1–H6 (`#` bis `######`)
- **Absätze** (Fließtext)
- **Fettdruck** (`**text**`) und *Kursiv* (`*text*`)
- **Listen** (geordnet `1.` und ungeordnet `-`)
- **Links** (`[text](url)`)
- **Bilder** (`![alt](src)`) — mit relativen und absoluten Pfaden
- **Code-Blöcke** (` ```language ... ``` `) — mit Syntax-Highlighting
- **Inline-Code** (`` `code` ``)
- **HTML in Markdown** (`<div class="grid-item">`, `<br>`, etc.)

### 3.6 Vue-spezifisches Markup in Markdown (Scope)

Der Viewer MUSS folgendes HTML-Markup unterstützen, das in den bestehenden Präsentationen vorkommt:

- `<div class="grid-item">...</div>` — Container-Divs mit CSS-Klassen
- `<br>` — Zeilenumbrüche
- Beliebiges statisches HTML innerhalb von Slides

Der Viewer MUSS NICHT unterstützen:
- `<script setup>` in Slides
- Dynamische Vue-Direktiven (`v-if`, `v-for`, `v-model`)
- Eigene Vue-Komponenten innerhalb von Markdown-Content (außer Layouts)

---

## 4. Theme-System

### 4.1 Theme-Bundle-Anforderungen

Das Theme `theme-mgm` wird bei einem einmaligen Build-Schritt vorcompiliert. Der Viewer lädt das resultierende Bundle (JS + CSS).

Ein Theme-Bundle MUSS enthalten:

1. **Alle Layout-Komponenten** als vorcompilierte Vue-Komponenten
2. **Global-Bottom-Komponente** (`global-bottom.vue`)
3. **CSS** (`styles/layouts.css`)
4. **Statische Assets** (Fonts, SVGs, Bilder)
5. **Theme-Konfiguration** (`package.json` → `slidev.colorSchema`, `slidev.defaults.fonts`)

### 4.2 Layouts

Der Viewer MUSS alle 8 Layouts des Theme `theme-mgm` unterstützen:

#### 4.2.1 `default`

- Props: `background` (optional)
- Content: Zentrierter Inhalt in Flex-Column
- Padding: `80px 70px 50px 70px`
- Hintergrund: `var(--ia-slide-bg, #00A8FF)`

#### 4.2.2 `cover`

- Props: `background` (optional)
- Content: Zentriert (horizontal + vertikal)
- H1: `3.5em`, H2: `1.15em` mit Opacity
- Hintergrund: `var(--ia-slide-bg, #00A8FF)`
- Portrait: Angepasste Paddings

#### 4.2.3 `title`

- Props: `background` (optional)
- Content: Zentriert (horizontal + vertikal)
- H1: `3em`, 800 weight, `text-wrap: balance`
- Hintergrund: `var(--ia-slide-bg, #00A8FF)`

#### 4.2.4 `section`

- Props: `background` (optional)
- Content: max-width 75% (Portrait: 90%)
- H1: `2em`, P: `1.25em` mit `0.9` Opacity
- Hintergrund: `var(--ia-slide-bg, #00A8FF)`

#### 4.2.5 `v-split`

- Props: `background` (optional)
- Slots: Default (links), `right` (rechts)
- Grid: `1fr 1fr`, Gap `2.5rem`
- Bilder im rechten Slot: `object-fit: cover`, `border-radius: 6px`
- Portrait: Vertikal gestapelt; bei Bild rechts → `column-reverse` (Bild oben)

#### 4.2.6 `grid`

- Props: `background` (optional), `cols` (number, Default: 3)
- Dynamisches Grid: `grid-template-columns: repeat(cols, 1fr)`
- Gap: `1.2rem` × `1.8rem`
- Bilder: `object-fit: cover`, `border-radius: 6px`
- Portrait: Erzwungen 2 Spalten

#### 4.2.7 `caption`

- Props: `background` (optional)
- Slots: Default (Beschreibungstext), `image` (Bild-Bereich)
- Bild: Flex:1, `object-fit: contain`
- Text: Unter dem Bild, linksbündig, `1.1em`

#### 4.2.8 `title-and-columns`

- Props: `background` (optional)
- Slots: Default (Titel), `columns` (Spalten-Inhalt)
- Titel: `flex-shrink: 0`, Margin `1.5rem`
- Spalten: `1fr 1fr` Grid, Gap `2rem`
- Portrait: 1 Spalte

### 4.3 Global-Bottom-Komponente

Jede Folie zeigt ein Branding-Overlay:
- **Logo** (`mgm-logo-white.svg`): Position oben rechts, `70px` Breite
- **Farbbalken** (`mgm-color-bar.svg`): Position unten rechts, `140px` Breite
- `pointer-events: none`, z-index: 10
- Portrait: Verkleinert auf `55px` / `110px`
- Im Impress-Modus: Ausgeblendet (`display: none`)

### 4.4 CSS Custom Properties

Der Viewer MUSS folgende CSS-Variablen auf `:root` setzen:

```css
--ia-text-color: #ffffff;
--ia-font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--ia-accent1: #f94144;
--ia-accent2: #43aa8b;
--ia-accent3: #f9c74f;
--ia-accent4: #90be6d;
--ia-accent5: #f8961e;
--ia-accent6: #577590;
```

### 4.5 Typografie

Alle Styles aus `theme-mgm/styles/layouts.css` MÜSSEN angewendet werden:

| Element | Größe | Gewicht | Zeilenhöhe |
|---|---|---|---|
| H1 | `1.6em` | 700 | 1.25 |
| H2 | `2.6em` | 800 | 1.15 |
| H3 | `1.6em` | 700 | 1.25 |
| H4 | `1.3em` | 700 | 1.3 |
| H5 | `1.1em` | 600 | 1.35 |
| H6 | `0.95em` | 600 | 1.4 |
| P | `1.15em` | 400 | 1.5 |
| Listen | `1.15em` | — | 1.6 |

### 4.6 Fonts

- Schriftart: **Inter** (lokal, kein Google Fonts Provider)
- Gewichte: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold), 900 (Black)
- Jeweils Normal + Italic
- Format: `.woff2`
- Die Font-Dateien werden aus dem Theme-Verzeichnis (`/fonts/`) geladen

### 4.7 Responsive Verhalten (Portrait)

Bei `max-aspect-ratio: 1/1` (Portrait-Viewport):

1. `#slide-container` Hintergrund transparent (keine schwarzen Letterbox-Balken)
2. `#slide-content` füllt Viewport (100% width/height, `transform: none`)
3. Font-Size skaliert mit `clamp(14px, 3.7vw, 36px)`
4. Layouts passen sich an (siehe Layout-Spezifikationen)

---

## 5. Impress-Addon (Infinite Canvas)

### 5.1 Aktivierung

Das Impress-Feature wird aktiviert wenn `impressEnabled: true` im globalen Frontmatter steht.

### 5.2 DOM-Struktur

Wenn Impress aktiv ist, wird folgende DOM-Struktur erzeugt:

```html
<body class="impress-enabled [impress-opaque-bg]">
  <!-- Impress Viewport (fullscreen, fixed) -->
  <div class="impress-viewport" style="background: {config.background}">
    <!-- Root (Scale + Perspective) -->
    <div class="impress-root" style="transform: scale({targetScale}); perspective: {perspective}px">
      <!-- Canvas = Slide-Container (Rotate + Translate) -->
      <div id="slideshow" style="transform: rotateZ(deg) translate3d(x, y, z)">
        <!-- Jede Folie: absolut positioniert mit 3D-Transform -->
        <div class="slidev-page" data-slidev-no="1"
             style="transform: translate(-50%,-50%) translate3d(x,y,z) rotateZ(deg) scale(s)">
          <!-- Layout + Content -->
        </div>
        <div class="slidev-page" data-slidev-no="2" ...>
        ...
      </div>
    </div>
  </div>
  <!-- UI Controls (above viewport, z-index: 200) -->
</body>
```

### 5.3 Step-Positionierung

Jede Folie wird als absolut positioniertes Element mit folgendem Transform platziert:

```
transform: translate(-50%, -50%)
           translate3d({impressX}px, {impressY}px, {impressZ}px)
           rotateX({impressRotateX}deg) rotateY({impressRotateY}deg) rotateZ({impressRotate}deg)
           scale({impressScale})
```

- `transform-origin: 50% 50%` (kritisch für korrekte Rotation)
- `transform-style: preserve-3d`
- Feste Dimensionen: `{impressWidth}px` × `{impressHeight}px`

### 5.4 Kamera-Algorithmus

Die Kamera berechnet die inverse Transformation des aktiven Steps:

```
Kamera-Position = Inverse(Step-Position)
  translate: (-step.x, -step.y, -step.z)
  rotate:    (-step.rx, -step.ry, -step.rz)
  scale:     1 / step.scale
```

**Window-Scale-Berechnung:**

```
windowScale = min(viewportHeight / canvasHeight, viewportWidth / canvasWidth)
windowScale = clamp(minScale, windowScale, maxScale)
targetScale = (1 / step.scale) * windowScale
```

**Gestaffelte Transition (Zoom-In vs Zoom-Out):**

| Zoom-Richtung | Root (Scale) | Canvas (Rotate+Translate) |
|---|---|---|
| Zoom-In (hinein) | Delay = `duration/2` | Delay = `0` |
| Zoom-Out (heraus) | Delay = `0` | Delay = `duration/2` |

Effekt: Bei Zoom-Out bewegt sich zuerst die Kamera, dann zoomen; bei Zoom-In zuerst zoomen, dann bewegen.

### 5.5 CSS-Klassen für Slide-States

| Klasse | Bedeutung | Opacity |
|---|---|---|
| `impress-future` | Noch nicht besucht | `0.3` |
| `impress-present` + `impress-active` | Aktuelle Folie | `1.0` |
| `impress-past` | Bereits besucht | `0.3` |

### 5.6 Impress-Slide-Klasse

Wenn `impressClass: slide` gesetzt ist, erhält das Slide-Element die Klasse `impress-slide`:

```css
.impress-slide {
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 40px 60px;
}
```

### 5.7 Opaker Hintergrund

Wenn `impressBackground` nicht `"transparent"` ist:
- `body` erhält Klasse `impress-opaque-bg`
- Alle `.slidev-layout` Hintergründe werden auf `transparent` gesetzt
- Der Canvas-Hintergrund wird stattdessen auf dem Viewport dargestellt

### 5.8 Presenter-Modus-Erkennung

Wenn die URL `/presenter` enthält, wird die Impress-Engine NICHT initialisiert. Der Presenter-Modus zeigt die Folien in Standard-2D-Ansicht.

---

## 6. Markdown-Parser

### 6.1 Parser-Anforderungen

1. **YAML-Frontmatter** extrahieren (globaler Block und per-Slide Blöcke)
2. **Slide-Splitting** an `---`-Separatoren (Unterscheidung: Frontmatter-Delimiter vs. Slide-Separator)
3. **Slot-Splitting** an `::slotname::` Markern
4. **Markdown → HTML** Konvertierung

### 6.2 Empfohlene Libraries

| Funktion | Library | Grund |
|---|---|---|
| YAML-Frontmatter | `gray-matter` | Funktioniert im Browser, identisch zu Slidev |
| Markdown → HTML | `markdown-it` | Identischer Parser wie Slidev |
| Code-Highlighting | `shiki` (WASM) | Identisch zu Slidev, Browser-kompatibel |

### 6.3 Slide-Parsing-Algorithmus

```
1. Input: Gesamter .md-Dateiinhalt
2. Extrahiere globalen Frontmatter (erster YAML-Block)
3. Splitte verbleibenden Inhalt an "---\n" (mit optionalem Whitespace)
4. Für jede Folie:
   a. Prüfe ob ein YAML-Frontmatter-Block vorhanden ist
   b. Extrahiere Frontmatter (layout, background, impress-Properties, etc.)
   c. Splitte Inhalt an "::slotname::" Markern
   d. Parse jeden Slot-Inhalt als Markdown → HTML
5. Output: Array von Slide-Objekten
```

**Slide-Objekt-Struktur:**

```typescript
interface ParsedSlide {
  index: number
  frontmatter: Record<string, any>      // Per-Slide YAML
  slots: {
    default: string                      // HTML des Default-Slots
    [slotName: string]: string           // HTML benannter Slots
  }
}

interface ParsedPresentation {
  globalFrontmatter: Record<string, any> // Globale Konfiguration
  slides: ParsedSlide[]
}
```

---

## 7. Rendering-Pipeline

### 7.1 Ablauf

```
1. .md-Datei per fetch() laden
2. Parser: Frontmatter + Slides + Slots extrahieren
3. Globale Konfiguration anwenden (Theme-CSS, Font-Faces, CSS-Variablen)
4. Für jede Folie:
   a. Layout-Komponente aus Theme-Bundle auswählen (nach "layout" Property)
   b. Frontmatter-Props an Layout übergeben (background, cols, etc.)
   c. Slot-Inhalte als HTML in die Layout-Slots einfügen
   d. Global-Bottom-Komponente anhängen
5. Falls impressEnabled: Impress-Engine initialisieren
6. Navigation + Keyboard-Handler registrieren
```

### 7.2 Layout-Zuordnung

Die Layout-Zuordnung erfolgt über den `layout`-String im Per-Slide-Frontmatter:

```
"default"           → DefaultLayout
"cover"             → CoverLayout
"title"             → TitleLayout
"section"           → SectionLayout
"v-split"           → VSplitLayout
"grid"              → GridLayout
"caption"           → CaptionLayout
"title-and-columns" → TitleAndColumnsLayout
```

Fehlt die `layout`-Property, wird `"default"` verwendet.

### 7.3 Slot-Rendering

1. Markdown-Inhalt vor dem ersten `::slotname::` → Default-Slot
2. `::right::` → Slot `right` (bei `v-split`)
3. `::image::` → Slot `image` (bei `caption`)
4. `::columns::` → Slot `columns` (bei `title-and-columns`)

---

## 8. Navigation

### 8.1 Standard-Modus (ohne Impress)

| Aktion | Trigger |
|---|---|
| Nächste Folie | `→`, `↓`, `Space`, `Enter`, Klick |
| Vorherige Folie | `←`, `↑`, `Backspace` |
| Erste Folie | `Home` |
| Letzte Folie | `End` |
| Fullscreen | `F` |

### 8.2 Impress-Modus

Identische Tastenbelegung, aber statt Slide-Wechsel wird die Kamera zum nächsten/vorherigen Step bewegt.

### 8.3 URL-Routing

- Format: `/{slideNumber}` (1-basiert)
- Änderung der URL → Kamera-Navigation
- Navigation → URL-Update (History Push oder Replace)

### 8.4 Touch-Navigation

- Swipe links → Nächste Folie
- Swipe rechts → Vorherige Folie

---

## 9. Presenter-Modus

### 9.1 Zugang

URL: `/presenter/` oder `?presenter=true`

### 9.2 Funktionalität

- **Zwei-Fenster-Synchronisation** via `BroadcastChannel`
- Presenter-Fenster zeigt:
  - Aktuelle Folie
  - Nächste Folie (Vorschau)
  - Folienzähler (z.B. "5 / 25")
  - Timer (optional)
  - Notizen (falls in Frontmatter als `notes:` vorhanden)
- Steuerung im Presenter-Fenster → Synchronisation zum Audience-Fenster

### 9.3 BroadcastChannel-Protokoll

```typescript
interface PresenterMessage {
  type: 'navigate'
  slideIndex: number
}
```

Channel-Name: `slidev-presenter` (oder ein präsentationsspezifischer Name)

---

## 10. Code-Highlighting

### 10.1 Anforderungen

- Shiki WASM im Browser
- Sprachen: Mindestens JavaScript, TypeScript, HTML, CSS, JSON, YAML, Markdown, Shell/Bash
- Theme: Kompatibel mit dem gewählten `colorSchema`

### 10.2 Fallback

Falls Shiki nicht geladen werden kann (z.B. Offline ohne Cache): Einfache `<pre><code>` Darstellung ohne Highlighting.

---

## 11. Build-Prozess (einmalig)

### 11.1 Was wird vorcompiliert

| Artefakt | Quelle | Output |
|---|---|---|
| Layout-Komponenten | `theme-mgm/layouts/*.vue` | JavaScript-Module (Vue Render-Funktionen) |
| Global-Bottom | `theme-mgm/global-bottom.vue` | JavaScript-Modul |
| Theme-CSS | `theme-mgm/styles/layouts.css` | CSS-Datei |
| Impress-Engine | `slidev-addon-impress/` | JavaScript-Modul |
| Impress-CSS | `slidev-addon-impress/styles/impress.css` | CSS-Datei |

### 11.2 Build-Tool

Vite als Build-Tool (einmaliger Build, **nicht** als Dev-Server zur Laufzeit).

### 11.3 Output-Struktur

```
dist/
├── index.html              ← Viewer-Shell
├── viewer.js               ← Hauptlogik (Parser, Renderer, Navigation)
├── theme-mgm.js            ← Vorcompilierte Layouts + Global-Bottom
├── theme-mgm.css           ← Theme-Styles
├── impress.js              ← Impress-Engine
├── impress.css             ← Impress-Styles
├── shiki/                  ← Shiki WASM + Sprachdefinitionen
├── fonts/                  ← Inter woff2 Dateien
└── assets/                 ← SVGs, Bilder
```

### 11.4 Erweiterbarer Theme-Build

Der Build-Prozess MUSS so gestaltet sein, dass ein anderes Theme (mit eigenen Layouts, Styles, Assets) auf dieselbe Weise kompiliert und als Bundle bereitgestellt werden kann. Die Schnittstelle zwischen Viewer und Theme-Bundle:

```typescript
interface ThemeBundle {
  layouts: Record<string, Component>   // Name → Vue-Komponente
  globalTop?: Component                // Optional
  globalBottom?: Component             // Optional
  css: string[]                        // CSS-Dateipfade
  config: {
    colorSchema: 'light' | 'dark' | 'both'
    defaults: {
      fonts?: { provider: string; sans: string; local: string }
    }
  }
}
```

---

## 12. .md-Datei laden

### 12.1 Methoden

1. **URL-Parameter:** `?file=pfad/zu/presentation.md`
2. **Default-Datei:** Konfigurierbar (z.B. `slides.md`)
3. **File-Picker:** Drag & Drop oder `<input type="file">` zum Laden lokaler Dateien

### 12.2 Asset-Auflösung

Relative Pfade in Markdown-Bildern (`![](./images/foto.webp)`) MÜSSEN relativ zum Verzeichnis der .md-Datei aufgelöst werden.

Wenn die .md-Datei per `fetch()` geladen wird: Base-URL = Verzeichnis der .md-Datei.
Wenn die .md-Datei per File-Input geladen wird: Bilder mit relativen Pfaden können nicht aufgelöst werden — der Viewer MUSS entweder:
- Einen Hinweis anzeigen, oder
- Auch die Assets per Drag & Drop / Verzeichnis-Upload akzeptieren.

---

## 13. Kompatibilitäts-Matrix

### 13.1 Features: Server-Slidev vs. Client-Viewer

| Feature | Server-Slidev | Client-Viewer | Anmerkung |
|---|---|---|---|
| Markdown → Slides | Ja | Ja | Identischer Parser (markdown-it) |
| YAML-Frontmatter | Ja | Ja | Identisch (gray-matter) |
| Layouts (theme-mgm) | Ja | Ja | Vorcompiliert |
| Global-Bottom | Ja | Ja | Vorcompiliert |
| CSS Custom Properties | Ja | Ja | Identisch |
| Impress-Addon (3D Canvas) | Ja | Ja | Portiert als JS-Modul |
| Code-Highlighting (Shiki) | Ja | Ja | WASM im Browser |
| Slide-Navigation + Keyboard | Ja | Ja | Reimplementiert |
| Presenter-Mode | Ja | Ja | BroadcastChannel |
| Portrait-Responsive | Ja | Ja | CSS identisch |
| Vue-Komponenten in Slides | Ja | **Nein** | Bräuchte Runtime-Compiler |
| `<script setup>` in Slides | Ja | **Nein** | Bräuchte Runtime-Compiler |
| UnoCSS Utility-Klassen | Ja | **Nein** | Bräuchte UnoCSS Runtime |
| HMR / Live Reload | Ja | **Nein** | Kein Dev-Server |
| PDF Export | Ja | **Eingeschränkt** | Nur `window.print()` |
| Slide-Transitions (CSS) | Ja | Ja | CSS-basiert |
| Monaco Editor | Ja | **Nein** | Nicht im Scope |

### 13.2 Nicht unterstützt (bewusst ausgeschlossen)

- **Beliebige Vue-Komponenten in Markdown** — bräuchte `@vue/compiler-sfc` im Browser (~200KB)
- **UnoCSS / Windi CSS Utility-Klassen** — bräuchte Runtime-Engine mit Performance-Overhead
- **Vite-Plugins** (Mermaid, KaTeX, etc.) — müssten als separate Browser-Bundles portiert werden
- **Custom Addons mit Node-APIs** — per Definition nicht clientfähig
- **PDF-Export via Playwright** — nur `window.print()` als Alternative

---

## 14. Testbarkeit / Akzeptanzkriterien

### 14.1 Identisches Rendering

Für jede der bestehenden Präsentationen (`slidev-ia-impress-mgm.md`, `slidev-ia-presenter.md`, `slidev-impress.md`) MUSS gelten:

1. Jede Folie wird im selben Layout gerendert wie im Server-Slidev
2. Texte, Bilder und Listen sind korrekt positioniert
3. Typografie (Schriftgrößen, Gewichte, Zeilenabstände) stimmen visuell überein
4. Hintergrundfarben und CSS-Variablen werden korrekt angewendet
5. Responsive-Verhalten in Portrait-Viewports ist identisch

### 14.2 Impress-Modus

1. Alle Steps sind an den korrekten 3D-Koordinaten positioniert
2. Kamera-Navigation bewegt sich korrekt zwischen Steps
3. Zoom-In/Out-Timing (gestaffelte Transition) ist identisch
4. CSS-Klassen (past/present/future) werden korrekt gesetzt
5. `impressClass: slide` erzeugt den weißen Karten-Stil

### 14.3 Navigation

1. Tastatur-Navigation funktioniert vorwärts und rückwärts
2. URL-Routing synchronisiert mit der aktuellen Folie
3. Direkte URL-Eingabe (z.B. `/12`) springt zur korrekten Folie

### 14.4 Referenz-Vergleich

Visueller Vergleich (Screenshot-Diff) zwischen Server-Slidev-Output und Client-Viewer-Output für alle Folien aller bestehenden Präsentationen.

---

## 15. Abgrenzung / Out of Scope

Folgendes ist explizit NICHT Teil dieser Spezifikation:

1. Authoring / Editieren von Präsentationen im Browser
2. Echtzeit-Sync mit einem Server
3. Multi-User-Collaboration
4. Persistenz / Speichern von Einstellungen
5. Plugin-System für Drittanbieter-Erweiterungen
6. Unterstützung anderer Themes als `theme-mgm` (das Build-System ist erweiterbar, aber nur `theme-mgm` ist initial im Scope)
7. Unterstützung anderer Addons als `slidev-addon-impress`
