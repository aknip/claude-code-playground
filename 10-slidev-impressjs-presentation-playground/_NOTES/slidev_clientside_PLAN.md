# Slidev Client-Side Viewer: Implementierungsplan

> Referenz: `_NOTES/slidev_clientside_SPEC.md`
> Arbeitsverzeichnis: `client-viewer/` (neues Unterverzeichnis)
> Test-Präsentation: `slidev-ia-presenter.md` (ohne Impress, einfachster Fall)
> Volltest-Präsentation: `slidev-ia-impress-mgm.md` (alle Features)

---

## Übersicht der Iterationen

| Phase | Ergebnis | Testbar mit |
|---|---|---|
| 0 | Projekt-Scaffolding + Dev-Server | Browser: leere Seite lädt |
| 1 | Markdown-Parser (Frontmatter + Slides + Slots) | Unit-artige Console-Ausgabe im Browser |
| 2 | Einfaches Rendering: Default-Layout, nur Text | Erste Folien sichtbar |
| 3 | Theme-CSS + Typografie + Fonts | Visuell korrekte Darstellung |
| 4 | Alle 8 Layouts als Vue-Komponenten | Alle Folien von `slidev-ia-presenter.md` |
| 5 | Global-Bottom (Branding-Overlay) | Logo + Farbbalken sichtbar |
| 6 | Navigation (Keyboard + URL-Routing) | Vor/Zurück-Navigation |
| 7 | Impress-Engine (3D Canvas) | `slidev-ia-impress-mgm.md` voll funktional |
| 8 | Code-Highlighting (Shiki) | Code-Blöcke mit Syntax-Farben |
| 9 | Presenter-Modus | Zwei-Fenster-Sync |
| 10 | Polish + Referenz-Vergleich | Screenshot-Diff gegen Server-Slidev |

---

## Phase 0: Projekt-Scaffolding

### 0.1 Vite-Projekt initialisieren

- `client-viewer/` als neues Verzeichnis anlegen
- Vite + Vue 3 Projekt aufsetzen (kein Slidev CLI, kein SSR)
- `package.json` mit Abhängigkeiten:
  - `vue` (^3.5)
  - `vite` (^6)
  - `@vitejs/plugin-vue`
  - `markdown-it`
  - `gray-matter` (Browser-kompatible Variante, ggf. `gray-matter` mit Polyfill oder `yaml` direkt)
- Minimale `index.html` mit `<div id="app"></div>`
- `src/main.ts`: Vue-App mounten
- `vite.config.ts`: Plugin-Vue, ggf. Alias für Theme-Pfade

### 0.2 Statische Assets einrichten

- Fonts: Symlink oder Kopie von `theme-mgm/public/fonts/` nach `client-viewer/public/fonts/`
- SVGs: Symlink oder Kopie von `mgm-logo-white.svg`, `mgm-color-bar.svg` nach `client-viewer/public/`
- Bilder: Symlink oder Kopie von `public/images/` nach `client-viewer/public/images/`
- Test-MD-Dateien: Symlink oder Kopie von `slidev-ia-presenter.md` nach `client-viewer/public/`

### 0.3 Dev-Server starten

- `pnpm dev` startet Vite Dev-Server auf Port 5173 (oder nächster freier)
- Die `index.html` wird ausgeliefert

### Test Phase 0

```
agent-browser Prüfungen:
- [ ] http://localhost:5173 lädt ohne Fehler (HTTP 200)
- [ ] <div id="app"> ist im DOM vorhanden
- [ ] Keine Console-Errors
- [ ] Screenshot: Leere weiße Seite mit gemouneter Vue-App
```

---

## Phase 1: Markdown-Parser

### 1.1 Slide-Splitter implementieren

Datei: `src/parser/slideSplitter.ts`

Funktion `splitSlides(raw: string): RawSlide[]`

Algorithmus:
1. Globalen Frontmatter mit `gray-matter` (oder manuellem YAML-Parser) extrahieren
2. Verbleibenden Content nach dem schließenden `---` des globalen Frontmatters nehmen
3. An `\n---\n` splitten (Slide-Separatoren)
4. Für jeden Split: Prüfen ob ein Per-Slide-Frontmatter vorhanden ist (beginnt mit YAML-Feldern, endet mit `---`)
5. Frontmatter und Markdown-Body trennen

Kantenfälle:
- Erste Folie hat keinen separaten Frontmatter-Block (globaler FM gilt)
- `---` innerhalb von Code-Blöcken (```) NICHT als Separator behandeln
- Leere Folien überspringen

### 1.2 Slot-Splitter implementieren

Datei: `src/parser/slotSplitter.ts`

Funktion `splitSlots(markdown: string): Record<string, string>`

Algorithmus:
1. Regex: `/^::(\w[\w-]*)::$/gm`
2. Alles vor dem ersten Match → Slot `default`
3. Jeder Match definiert den Slot-Namen für den folgenden Content
4. Output: `{ default: "...", right: "...", image: "...", ... }`

### 1.3 Markdown → HTML Konvertierung

Datei: `src/parser/markdownRenderer.ts`

- `markdown-it` Instanz mit `html: true` (für `<div class="grid-item">` etc.)
- Bilder: Relative Pfade relativ zur Base-URL der .md-Datei auflösen
- Output: HTML-String pro Slot

### 1.4 Gesamter Parser

Datei: `src/parser/index.ts`

Funktion `parsePresentation(raw: string): ParsedPresentation`

Exportiert:
```typescript
interface ParsedSlide {
  index: number
  frontmatter: Record<string, any>
  slots: Record<string, string>  // Slot-Name → HTML
}
interface ParsedPresentation {
  globalFrontmatter: Record<string, any>
  slides: ParsedSlide[]
}
```

### 1.5 Debug-Ausgabe im Browser

- `.md` Datei per `fetch('/slidev-ia-presenter.md')` laden
- Parsing-Ergebnis als JSON in `<pre>` Element anzeigen
- Console-Log: Anzahl Slides, Frontmatter-Keys, Slot-Namen

### Test Phase 1

```
agent-browser Prüfungen:
- [ ] Seite zeigt JSON-Ausgabe des Parse-Ergebnisses
- [ ] globalFrontmatter enthält: theme="./theme-mgm", title="Instant Slides - Getting Started", canvasWidth=980
- [ ] slides Array hat exakt 25 Einträge (slidev-ia-presenter.md)
- [ ] Slide[0].slots.default enthält "<h2>" und "<h1>" HTML-Tags
- [ ] Slide[4] (v-split) hat slots.default UND slots.right
- [ ] Slide[4].frontmatter.layout === "v-split"
- [ ] Slide[10] (grid, cols:3) hat frontmatter.cols === 3
- [ ] Slide[20] (caption) hat slots.default UND slots.image
- [ ] Keine Console-Errors
```

---

## Phase 2: Einfaches Rendering (Default-Layout)

### 2.1 Slide-Container-Struktur

Datei: `src/App.vue`

DOM-Struktur (analog zu Slidev):
```html
<div id="slide-container">
  <div id="slide-content" :style="canvasStyle">
    <div id="slideshow">
      <SlideRenderer
        v-for="(slide, i) in slides"
        :key="i"
        :slide="slide"
        :active="i === currentSlide"
      />
    </div>
  </div>
</div>
```

Canvas-Sizing:
- Breite: `canvasWidth` aus Frontmatter (Default: 980)
- Höhe: berechnet aus `canvasWidth / aspectRatio`
- Skalierung via CSS `transform: scale(factor)` um in den Viewport zu passen

### 2.2 SlideRenderer-Komponente

Datei: `src/components/SlideRenderer.vue`

- Empfängt `ParsedSlide` als Prop
- Wählt Layout-Komponente basierend auf `slide.frontmatter.layout`
- Zunächst nur `DefaultLayout`: Rendert `slots.default` als `v-html`
- Setzt `data-slidev-no` Attribut (1-basiert)
- Nur aktive Folie sichtbar (`v-show`)

### 2.3 DefaultLayout als erste Komponente

Datei: `src/layouts/DefaultLayout.vue`

- Minimale Implementierung: `<div class="slidev-layout ia-default"><slot /></div>`
- Props: `background`
- Slot-Content kommt als `v-html` vom SlideRenderer

### 2.4 Basis-CSS

- Slide-Dimensionen: 980px × 551px (16:9 bei 980 Breite)
- Zentrierung im Viewport
- Schwarzer Hintergrund für Letterbox-Bereiche

### Test Phase 2

```
agent-browser Prüfungen:
- [ ] Erste Folie ist sichtbar (weißer/blauer Bereich mit Text)
- [ ] Text "Instant Slides" und "Fast and Focused" sind sichtbar auf der ersten Folie
- [ ] Folie ist zentriert im Viewport
- [ ] Nur eine Folie ist gleichzeitig sichtbar (nicht alle 25 übereinander)
- [ ] Screenshot: Erste Folie mit Rohtext, noch ohne Theme-Styling
- [ ] Keine Console-Errors
```

---

## Phase 3: Theme-CSS + Typografie + Fonts

### 3.1 Inter Font-Faces laden

Datei: `src/styles/fonts.css`

- Kopie der `@font-face` Deklarationen aus `theme-mgm/styles/layouts.css`
- Pfade zeigen auf `/fonts/*.woff2` (aus `public/fonts/`)
- Import in `main.ts`

### 3.2 CSS Custom Properties

Datei: `src/styles/theme.css`

- `:root` Variablen aus Spec §4.4: `--ia-text-color`, `--ia-font-family`, `--ia-accent1`–`--ia-accent6`
- Import in `main.ts`

### 3.3 Typografie-Styles

Datei: `src/styles/typography.css`

- Alle `.slidev-layout` Styles aus `theme-mgm/styles/layouts.css`:
  - H1–H6 Größen, Gewichte, Zeilenabstände
  - P, Listen, Links, Strong
  - Bild-Styling (`border-radius: 6px`)

### 3.4 Responsive Portrait-Styles

- `@media (max-aspect-ratio: 1/1)` Regeln aus `layouts.css`
- `#slide-container`, `#slide-content` Overrides
- `font-size: clamp(14px, 3.7vw, 36px)`

### 3.5 Slide-Hintergrundfarbe

- Default-Hintergrund: `var(--ia-slide-bg, #00A8FF)` auf allen `.slidev-layout` Elementen
- `background` Prop aus Per-Slide-Frontmatter überschreibt via inline-style

### Test Phase 3

```
agent-browser Prüfungen:
- [ ] Text wird in Inter-Schriftart dargestellt (keine System-Fallback-Schrift)
- [ ] Hintergrundfarbe der Folie ist blau (#00A8FF)
- [ ] Textfarbe ist weiß (#ffffff)
- [ ] H1 "Instant Slides" ist deutlich größer als H2 "Fast and Focused"
- [ ] Font-Weight von H1 ist visuell Bold (700)
- [ ] Font-Weight von H2 ist visuell ExtraBold (800)
- [ ] Screenshot: Erste Folie sieht visuell korrekt aus (blauer Hintergrund, weiße Inter-Schrift)
- [ ] Bei Viewport-Resize < 1:1 Aspect: Font skaliert mit Viewport-Breite
```

---

## Phase 4: Alle 8 Layouts

### 4.1 Layout-Registry

Datei: `src/layouts/index.ts`

```typescript
export const layouts: Record<string, Component> = {
  'default': DefaultLayout,
  'cover': CoverLayout,
  'title': TitleLayout,
  'section': SectionLayout,
  'v-split': VSplitLayout,
  'grid': GridLayout,
  'caption': CaptionLayout,
  'title-and-columns': TitleAndColumnsLayout,
}
```

### 4.2 SlideRenderer erweitern

- Layout-Auswahl aus Registry basierend auf `slide.frontmatter.layout`
- Fallback auf `DefaultLayout` wenn Layout nicht gefunden
- Props weiterleiten: `background`, `cols`
- Named Slots: Für jedes Layout den richtigen Slot-Content zuordnen
  - `v-html` für Default-Slot
  - Template-Slots für Named Slots (`right`, `image`, `columns`)

### 4.3 CoverLayout

Datei: `src/layouts/CoverLayout.vue`
- Zentrierter Inhalt, H1 `3.5em`, H2 `1.15em` mit Opacity
- Scoped CSS aus `theme-mgm/layouts/cover.vue`

### 4.4 TitleLayout

Datei: `src/layouts/TitleLayout.vue`
- Zentriert, H1 `3em`, 800 weight, `text-wrap: balance`
- Scoped CSS aus `theme-mgm/layouts/title.vue`

### 4.5 SectionLayout

Datei: `src/layouts/SectionLayout.vue`
- max-width 75%, H1 `2em`, P `1.25em`
- Scoped CSS aus `theme-mgm/layouts/section.vue`

### 4.6 VSplitLayout

Datei: `src/layouts/VSplitLayout.vue`
- Zwei Named Slots: `default` (links) + `right` (rechts)
- Grid `1fr 1fr`, Gap `2.5rem`
- Bild-Styling, Portrait-Responsive
- Scoped CSS aus `theme-mgm/layouts/v-split.vue`

### 4.7 GridLayout

Datei: `src/layouts/GridLayout.vue`
- Props: `cols` (Default: 3)
- Dynamisches `grid-template-columns: repeat(cols, 1fr)`
- Scoped CSS aus `theme-mgm/layouts/grid.vue`

### 4.8 CaptionLayout

Datei: `src/layouts/CaptionLayout.vue`
- Named Slots: `default` (Caption-Text) + `image`
- Scoped CSS aus `theme-mgm/layouts/caption.vue`

### 4.9 TitleAndColumnsLayout

Datei: `src/layouts/TitleAndColumnsLayout.vue`
- Named Slots: `default` (Titel) + `columns`
- Scoped CSS aus `theme-mgm/layouts/title-and-columns.vue`

### Test Phase 4

```
agent-browser Prüfungen (slidev-ia-presenter.md, Folie durchblättern):
- [ ] Slide 1 (kein Layout → default): Blauer Hintergrund, "Instant Slides" als H1
- [ ] Slide 2 (layout: default): "Table of Contents" mit nummerierter Liste 1-5
- [ ] Slide 3 (layout: title): "1. Write" groß zentriert, "Start With a Script" darunter
- [ ] Slide 4 (layout: section): "Tell Your Story" mit langem Absatz, max-width begrenzt
- [ ] Slide 5 (layout: v-split): Links "Write it" Text, rechts "Or Paste it" Text — zwei Spalten nebeneinander
- [ ] Slide 6 (layout: v-split): Links Text, rechts Bild (image2.webp sichtbar, object-fit cover)
- [ ] Slide 8 (layout: v-split mit Bild): Bild wird mit cover und border-radius dargestellt
- [ ] Slide 11 (layout: grid, cols:3): 6 Grid-Items in 3 Spalten, Bilder + Text
- [ ] Slide 21 (layout: caption): Bild oben, Caption-Text darunter
- [ ] Slide 23 (layout: title-and-columns): Titel oben, zwei Bilder in Spalten darunter
- [ ] Alle Bilder laden korrekt (keine broken images)
- [ ] Screenshot jeder Layout-Variante
```

---

## Phase 5: Global-Bottom (Branding-Overlay)

### 5.1 GlobalBottom-Komponente

Datei: `src/components/GlobalBottom.vue`

- Exakte Kopie der Template-/Style-Logik aus `theme-mgm/global-bottom.vue`
- Absolut positioniert über jeder Folie
- Logo: `mgm-logo-white.svg`, oben rechts, 70px
- Farbbalken: `mgm-color-bar.svg`, unten rechts, 140px
- `pointer-events: none`, `z-index: 10`

### 5.2 Integration in SlideRenderer

- GlobalBottom in jedes Slide-Element einfügen (innerhalb des `.slidev-page` Containers)
- Im Impress-Modus wird es später per CSS ausgeblendet (`body.impress-enabled .ia-branding { display: none }`)

### Test Phase 5

```
agent-browser Prüfungen:
- [ ] mgm Logo ist oben rechts auf jeder Folie sichtbar
- [ ] mgm Farbbalken ist unten rechts auf jeder Folie sichtbar
- [ ] Logo und Farbbalken sind nicht klickbar (pointer-events: none)
- [ ] Logo-Breite beträgt ca. 70px
- [ ] Beim Resize auf Portrait-Viewport: Logo verkleinert sich auf ~55px
- [ ] Screenshot: Folie mit Branding-Elementen
```

---

## Phase 6: Navigation

### 6.1 Keyboard-Handler

Datei: `src/composables/useNavigation.ts`

State:
- `currentSlide: Ref<number>` (0-basierter Index)
- `totalSlides: computed` (aus Parser-Output)

Keyboard-Events (`keydown`):
- `ArrowRight`, `ArrowDown`, `Space`, `Enter` → `nextSlide()`
- `ArrowLeft`, `ArrowUp`, `Backspace` → `prevSlide()`
- `Home` → `goToSlide(0)`
- `End` → `goToSlide(totalSlides - 1)`
- `f` → `toggleFullscreen()`

### 6.2 URL-Routing (Hash-basiert)

- Format: `#/{slideNumber}` (1-basiert) — Hash-Routing statt History-Routing für statischen Betrieb
- Bei Navigation: `window.location.hash = `#/${slideNumber}`
- Bei Seitenlade: Hash auslesen und zur entsprechenden Folie springen
- `hashchange` Event: Folie aktualisieren

### 6.3 Touch-Navigation

- `touchstart` / `touchend` Events
- Swipe-Erkennung: Horizontale Distanz > 50px → Navigation
- Links-Swipe → Nächste Folie
- Rechts-Swipe → Vorherige Folie

### 6.4 Slide-Übergang

- Standard-Modus: Nur aktive Folie sichtbar (`v-show`)
- Optional: CSS-Transition `slide-left` wenn in Frontmatter konfiguriert (`transition: slide-left`)

### 6.5 Folienzähler-UI

- Kleine Anzeige unten rechts: "5 / 25"
- Ausblendbar via Klick oder Tastenkürzel

### Test Phase 6

```
agent-browser Prüfungen:
- [ ] Pfeil-rechts-Taste → Folie wechselt von 1 zu 2
- [ ] Pfeil-links-Taste → Folie wechselt zurück von 2 zu 1
- [ ] Space-Taste → Nächste Folie
- [ ] Home-Taste → Erste Folie
- [ ] End-Taste → Letzte Folie (25)
- [ ] URL zeigt #/1 auf erster Folie, #/2 auf zweiter, etc.
- [ ] Direkte Eingabe von #/12 in URL → Folie 12 wird angezeigt
- [ ] Folienzähler zeigt "1 / 25" auf erster Folie
- [ ] Folienzähler aktualisiert sich bei Navigation
- [ ] Am Ende (Folie 25): Pfeil-rechts tut nichts (kein Crash)
- [ ] Am Anfang (Folie 1): Pfeil-links tut nichts
- [ ] F-Taste → Vollbildmodus (falls Browser erlaubt)
```

---

## Phase 7: Impress-Engine

### 7.1 Impress-Konfiguration parsen

Datei: `src/impress/config.ts`

- `parseImpressConfig()` und `parseStepData()` aus `slidev-addon-impress/composables/useImpress.ts` portieren
- Identische Interfaces: `ImpressConfig`, `ImpressStep`, `CameraState`
- Kein Vue-Composable nötig, reine Funktionen

### 7.2 DOM-Umstrukturierung

Datei: `src/impress/engine.ts`

Funktion `initImpress(config, slides, slideshowEl)`

1. `body.classList.add('impress-enabled')`
2. Ggf. `body.classList.add('impress-opaque-bg')`
3. Viewport-Element erstellen (`.impress-viewport`, `position: fixed`)
4. Root-Element erstellen (`.impress-root`)
5. Slideshow-Element in Root reparentieren
6. Alle Slides sichtbar machen (`display: block`)
7. Jeden Slide positionieren: `positionStep(el, stepData)`

### 7.3 Kamera-Navigation

Datei: `src/impress/camera.ts`

Funktion `gotoStep(stepIndex, animate)`

Algorithmus (identisch zu Addon):
1. Inverse Transformation berechnen
2. Window-Scale berechnen
3. Target-Scale = inverse.scale * windowScale
4. Zoom-Richtung bestimmen (in vs. out)
5. Root: `transform: scale(targetScale)`, `perspective`
6. Canvas: `rotateCSS` + `translate3d`
7. Gestaffelte Transition-Delays

### 7.4 CSS-Klassen-Management

- `updateStepClasses(activeIndex)` — setzt `impress-past`, `impress-present`/`impress-active`, `impress-future`
- Opacity-Transitions: 0.3 → 1.0 für aktiven Step

### 7.5 Impress-CSS

Datei: `src/styles/impress.css`

- Exakte Kopie von `slidev-addon-impress/styles/impress.css`
- Anpassungen der CSS-Selektoren falls die DOM-Struktur leicht abweicht
- Nur geladen wenn `impressEnabled: true`

### 7.6 Window-Resize-Handler

- Bei Resize: `computeWindowScale()` neu berechnen
- Aktiven Step ohne Animation neu positionieren

### 7.7 Integration in App.vue

- Nach dem Rendering aller Slides: Prüfe `globalFrontmatter.impressEnabled`
- Wenn true: `initImpress()` aufrufen
- Navigation-Composable erweitern: Bei `nextSlide()`/`prevSlide()` statt v-show-Wechsel die Kamera bewegen

### Test Phase 7

```
agent-browser Prüfungen (slidev-ia-impress-mgm.md):
- [ ] Alle 25 Folien sind gleichzeitig im DOM (nicht nur die aktive)
- [ ] body hat Klasse "impress-enabled"
- [ ] .impress-viewport existiert und ist fullscreen (position: fixed, 100% × 100%)
- [ ] Erste Folie ist zentriert und voll sichtbar (opacity: 1)
- [ ] Andere Folien sind sichtbar aber mit opacity 0.3
- [ ] Pfeil-rechts → Kamera fährt zu Folie 2 (smooth Transition)
- [ ] Folie 2 hat Position impressX:0, impressY:1500 → visuell nach unten verschoben
- [ ] Folie 7 (impressRotate: 90) → Kamera rotiert um 90°
- [ ] Folie 25 (impressScale: 22) → starkes Herauszoomen
- [ ] Window-Resize → Kamera passt sich an, kein Abschneiden
- [ ] impressClass: "slide" erzeugt weißen Karten-Stil (sofern in slidev-impress.md verwendet)
- [ ] Screenshot: Impress-Ansicht mit sichtbaren benachbarten Folien im Hintergrund
- [ ] Screenshot: Folie mit Rotation (z.B. Folie 7)
```

---

## Phase 8: Code-Highlighting

### 8.1 Shiki im Browser laden

Datei: `src/highlight/index.ts`

- `shiki` NPM-Package installieren (Browser-kompatibel via WASM)
- Highlighter-Instanz lazy initialisieren
- Sprachen laden: js, ts, html, css, json, yaml, md, bash (mindestens)
- Theme: `one-dark-pro` oder `github-light` passend zu `colorSchema`

### 8.2 Markdown-it Plugin

- Custom Plugin für `markdown-it`: Code-Blöcke via Shiki rendern
- Fence-Renderer überschreiben: `md.renderer.rules.fence = (tokens, idx) => shikiHighlight(code, lang)`
- Fallback: Wenn Shiki noch nicht geladen → `<pre><code>` ohne Farben

### 8.3 Async Rendering

- Shiki WASM laden ist async → Slides zunächst ohne Highlighting rendern
- Nach Shiki-Load: Code-Blöcke aktualisieren (entweder Re-Render oder DOM-Patching)

### Test Phase 8

```
agent-browser Prüfungen:
- [ ] Code-Blöcke (falls in Test-Präsentation vorhanden) zeigen farbiges Syntax-Highlighting
- [ ] Verschiedene Sprachen werden korrekt erkannt (JavaScript, HTML, CSS)
- [ ] Code-Block hat dunklen Hintergrund passend zum Theme
- [ ] Fallback: Ohne Shiki ist Code trotzdem lesbar (monospace, <pre><code>)
- [ ] Keine Console-Errors beim Laden von Shiki WASM
```

---

## Phase 9: Presenter-Modus

### 9.1 Presenter-Erkennung

- URL enthält `?presenter=true` oder Hash enthält `/presenter`
- Wenn Presenter: Anderes App-Layout laden

### 9.2 Presenter-Layout

Datei: `src/views/PresenterView.vue`

Layout:
```
┌──────────────────────┬─────────────┐
│                      │  Nächste    │
│  Aktuelle Folie      │  Folie      │
│  (groß)              │  (klein)    │
│                      │             │
├──────────────────────┴─────────────┤
│  Folienzähler  │  Timer  │ Notizen │
└────────────────┴─────────┴─────────┘
```

- Aktuelle Folie: Skalierte Darstellung
- Nächste Folie: Kleinere Vorschau
- Folienzähler: "5 / 25"
- Timer: Seit Start der Präsentation (einfacher `setInterval`)
- Notizen: Aus HTML-Kommentaren im Slide-Content extrahieren (`<!-- ... -->`)

### 9.3 BroadcastChannel-Synchronisation

Datei: `src/composables/usePresenterSync.ts`

- Channel: `new BroadcastChannel('slidev-viewer')`
- Senden: Bei Navigation im Presenter → `{ type: 'navigate', slideIndex }`
- Empfangen: Im Audience-Fenster → Navigation zur empfangenen Folie
- Bidirektional: Audience-Fenster kann auch navigieren und sendet zurück

### 9.4 Impress-Deaktivierung im Presenter

- Im Presenter-Modus: Impress-Engine NICHT initialisieren
- Folien werden in Standard-2D-Ansicht gezeigt

### Test Phase 9

```
agent-browser Prüfungen:
- [ ] URL mit ?presenter=true zeigt Presenter-Layout (nicht normales Slide-Vollbild)
- [ ] Aktuelle Folie und Vorschau der nächsten Folie sind sichtbar
- [ ] Folienzähler zeigt korrekte Zahlen
- [ ] Timer läuft (Sekunden erhöhen sich)
- [ ] Notizen aus HTML-Kommentaren werden angezeigt (z.B. "This is a **note** page 1")
- [ ] Navigation im Presenter-Fenster → Audience-Fenster wechselt auch die Folie
  (Test: Zwei Browser-Tabs öffnen, einer normal, einer mit ?presenter=true)
- [ ] Impress-Modus ist im Presenter-Fenster NICHT aktiv (keine 3D-Transforms)
```

---

## Phase 10: Polish + Referenz-Vergleich

### 10.1 .md-Datei-Auswahl

- URL-Parameter `?file=dateiname.md` unterstützen
- Default: `slides.md`
- Alle drei Test-Präsentationen testen:
  - `slidev-ia-presenter.md`
  - `slidev-ia-impress-mgm.md`
  - `slidev-impress.md`

### 10.2 Fehlende CSS-Details nachziehen

- `transition: slide-left` für `slidev-ia-presenter.md` (CSS-Slide-Transition)
- `<style>` Blöcke in Slides: Letzte Folie von `slidev-ia-impress-mgm.md` hat einen `<style>` Block
  - Einfaches Parsen: `<style>...</style>` extrahieren und als Scoped-CSS in die Folie injizieren

### 10.3 Edge-Cases

- Slide mit leerem Content
- Slide mit nur einem Bild
- Slide mit HTML-in-Markdown (wie die Grid-Items in `slidev-ia-impress-mgm.md`)
- Inline-Styles auf Bildern (`style="height: 140px; ..."`)

### 10.4 Referenz-Screenshots vom Server-Slidev

Vorgehen:
1. Server-Slidev mit `slidev-ia-presenter.md` starten
2. agent-browser: Alle 25 Folien durchblättern, je Screenshot speichern in `screenshots/reference/`
3. Client-Viewer mit derselben .md starten
4. agent-browser: Alle 25 Folien durchblättern, je Screenshot speichern in `screenshots/client/`
5. Visueller Vergleich (manuell oder per Pixel-Diff-Tool)

### 10.5 Build für Produktion

- `vite build` → Output in `dist/`
- Testen dass `dist/index.html` standalone funktioniert (ohne Dev-Server)
- Alle Assets (Fonts, Bilder, CSS, JS) korrekt gebundelt

### Test Phase 10

```
agent-browser Prüfungen:

Gesamttest slidev-ia-presenter.md (Standard-Modus, 25 Folien):
- [ ] Alle 25 Folien durchblättern ohne Fehler
- [ ] Jede Folie hat korrektes Layout (default/title/section/v-split/grid/caption/title-and-columns)
- [ ] Alle Bilder laden (keine broken images)
- [ ] Branding (Logo + Farbbalken) auf jeder Folie sichtbar
- [ ] Screenshot jeder Folie für Referenz-Vergleich

Gesamttest slidev-ia-impress-mgm.md (Impress-Modus, 25 Folien):
- [ ] Impress-Modus aktiv (3D-Canvas sichtbar)
- [ ] Alle 25 Steps durchnavigieren
- [ ] Rotationen korrekt (Folien 7-12 mit impressRotate: 90, etc.)
- [ ] Zoom korrekt (verschiedene impressScale-Werte)
- [ ] Z-Achse korrekt (Folien 22-24 mit impressZ: -1000/-2000)
- [ ] Letzte Folie (Scale 22) zeigt extremes Herauszoomen
- [ ] Branding ist im Impress-Modus ausgeblendet
- [ ] Screenshot jeder Folie für Referenz-Vergleich

Gesamttest slidev-impress.md (Impress-Modus, klassisches Demo):
- [ ] Canvas-Größe 1024×768 (nicht 980×551)
- [ ] Gradient-Hintergrund sichtbar
- [ ] impressClass: "slide" → weiße Karten-Optik
- [ ] Alle Steps korrekt positioniert

URL-Parameter-Test:
- [ ] ?file=slidev-ia-presenter.md → Lädt korrekte Präsentation
- [ ] ?file=slidev-ia-impress-mgm.md → Lädt Impress-Präsentation
- [ ] Ohne ?file → Default-Datei wird geladen

Production-Build-Test:
- [ ] dist/index.html öffnen (via statischem Server) → Viewer funktioniert
- [ ] Alle Assets geladen (keine 404)
- [ ] Performance: Initiales Laden < 3 Sekunden
```

---

## Dateistruktur nach Abschluss

```
client-viewer/
├── public/
│   ├── fonts/                          ← Inter woff2 (aus theme-mgm)
│   ├── images/                         ← Präsentations-Bilder
│   ├── mgm-logo-white.svg
│   ├── mgm-color-bar.svg
│   ├── slidev-ia-presenter.md          ← Test-Präsentationen
│   ├── slidev-ia-impress-mgm.md
│   └── slidev-impress.md
├── src/
│   ├── main.ts                         ← Vue-App Entry
│   ├── App.vue                         ← Haupt-Container
│   ├── parser/
│   │   ├── index.ts                    ← parsePresentation()
│   │   ├── slideSplitter.ts            ← Slide-Trennung
│   │   ├── slotSplitter.ts             ← Slot-Trennung
│   │   └── markdownRenderer.ts         ← MD → HTML (markdown-it)
│   ├── layouts/
│   │   ├── index.ts                    ← Layout-Registry
│   │   ├── DefaultLayout.vue
│   │   ├── CoverLayout.vue
│   │   ├── TitleLayout.vue
│   │   ├── SectionLayout.vue
│   │   ├── VSplitLayout.vue
│   │   ├── GridLayout.vue
│   │   ├── CaptionLayout.vue
│   │   └── TitleAndColumnsLayout.vue
│   ├── components/
│   │   ├── SlideRenderer.vue           ← Einzelne Folie rendern
│   │   └── GlobalBottom.vue            ← Branding-Overlay
│   ├── impress/
│   │   ├── config.ts                   ← parseImpressConfig/parseStepData
│   │   ├── engine.ts                   ← DOM-Umstrukturierung
│   │   └── camera.ts                   ← Kamera-Algorithmus
│   ├── composables/
│   │   ├── useNavigation.ts            ← Keyboard/Touch/URL Navigation
│   │   └── usePresenterSync.ts         ← BroadcastChannel
│   ├── views/
│   │   └── PresenterView.vue           ← Presenter-Layout
│   ├── highlight/
│   │   └── index.ts                    ← Shiki WASM Integration
│   └── styles/
│       ├── fonts.css                   ← @font-face Inter
│       ├── theme.css                   ← CSS Custom Properties
│       ├── typography.css              ← .slidev-layout Typografie
│       ├── impress.css                 ← Impress-Mode Styles
│       └── base.css                    ← Slide-Container, Letterbox
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Abhängigkeiten zwischen Phasen

```
Phase 0 (Scaffolding)
  └─▶ Phase 1 (Parser)
       └─▶ Phase 2 (Default-Rendering)
            ├─▶ Phase 3 (Theme CSS) ──▶ Phase 4 (Alle Layouts)
            │                              └─▶ Phase 5 (Global-Bottom)
            │                                   └─▶ Phase 6 (Navigation)
            │                                        ├─▶ Phase 7 (Impress)
            │                                        ├─▶ Phase 9 (Presenter)
            │                                        └─▶ Phase 10 (Polish)
            └─▶ Phase 8 (Code-Highlighting) ──────────────▶ Phase 10
```

Phasen 7, 8 und 9 können parallel entwickelt werden, da sie voneinander unabhängig sind. Alle fließen in Phase 10 (Endtest) ein.

---

## Risiken und Mitigationen

| Risiko | Wahrscheinlichkeit | Mitigation |
|---|---|---|
| `gray-matter` funktioniert nicht im Browser (Node-Dependencies) | Mittel | Eigenen YAML-Frontmatter-Parser schreiben (regex + `yaml` Package) |
| Scoped CSS von Vue-SFCs verhält sich anders als im Server-Slidev | Niedrig | CSS-Selektoren mit Klassen statt Scoped-IDs verwenden |
| Shiki WASM zu groß / langsam | Niedrig | Lazy Loading, nur benötigte Sprachen |
| `v-html` für Slot-Content erzeugt XSS-Risiko | Niedrig | Nur eigene .md-Dateien werden geladen, kein User-Input |
| Impress 3D-Transforms rendern auf Mobilgeräten schlecht | Mittel | GPU-Optimierung mit `will-change: transform`, Fallback auf 2D |
| `::slotname::` Parsing-Konflikte mit Markdown-Syntax | Niedrig | Regex-Pattern auf Zeilenanfang beschränken (`^::`) |
