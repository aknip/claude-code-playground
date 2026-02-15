# Implementierungsplan: slidev-addon-impress

**Datum:** 2026-02-14
**Basis:** `_NOTES/impress-theme-specs.md`, `_NOTES/impress-Erste-Analyse.md`
**Ziel:** Funktionale impress.js-3D-Canvas-Transitionen in Slidev
**Demo-Präsentation:** `slidev-impress.md` (13 Slides, alle Koordinaten bereits definiert)

---

## 1. Architektur-Übersicht

### 1.1 Addon-Typ: Lokales Addon

```
10-ppt-presentation-playground/
├── slidev-addon-impress/           # <-- NEU: Addon-Verzeichnis
│   ├── package.json
│   ├── composables/
│   │   └── useImpress.ts           # Reaktiver State, Frontmatter-Parsing
│   ├── setup/
│   │   └── main.ts                 # Vue-App-Setup, DOM-Manipulation, Router-Hooks
│   ├── styles/
│   │   └── impress.css             # 3D-Canvas CSS, Slidev-Overrides
│   └── global-top.vue              # Viewport-Container (optional, für Vue-Reactivity)
├── theme-mgm/                      # Bestehendes Theme (unverändert)
├── slidev-impress.md               # Demo-Präsentation (bereits erstellt)
└── package.json                    # Addon registrieren
```

### 1.2 Registrierung in der Präsentation

```yaml
# slidev-impress.md (Frontmatter der ersten Slide)
---
addons:
  - ./slidev-addon-impress
impressEnabled: true
# ... weitere impress-Konfiguration
---
```

### 1.3 Kern-Entscheidung: Rendering-Strategie

**Problem:** Slidev rendert Slides in einer `TransitionGroup` und zeigt normalerweise nur die aktuelle Slide. impress.js braucht ALLE Slides gleichzeitig sichtbar auf einem 3D-Canvas.

**Lösung: CSS-Override + DOM-Wrapping**

Slidev preloadet nach 3 Sekunden ALLE Slide-Komponenten in den DOM. Die Strategie:

1. Slidev-Slides werden per CSS als absolute Elemente auf dem Canvas positioniert
2. `setup/main.ts` injiziert Viewport/Root-Wrapper-Elemente um `.slidev-slides`
3. `.slidev-slides` fungiert als Canvas-Element (rotate + translate)
4. Injizierter Root-Wrapper steuert Scale + Perspective
5. Kamera-Logik manipuliert Inline-Styles auf Root und Canvas

**Warum dieser Ansatz:**
- Nutzt Slidevs eigene Slide-Render-Pipeline (kein Duplikat-Rendering)
- Konsistent mit theme-mgm's existierendem Muster (DOM-Manipulation in setup/main.ts)
- Slide-interne Features (v-click, Layouts, Theme-Styling) bleiben funktional
- Kein Kampf mit Vues Virtual DOM -- wir wrappen nur, reparenten nicht

### 1.4 DOM-Struktur (Zielzustand)

```
VORHER (Standard-Slidev):
┌─ #app ─────────────────────────────────────────┐
│  ┌─ .slidev-slides (TransitionGroup) ──────────┐│
│  │  [data-slidev-no="1"] (normal flow)         ││
│  │  [data-slidev-no="2"] (normal flow)         ││
│  │  ...                                         ││
│  └──────────────────────────────────────────────┘│
│  <GlobalBottom /> (theme branding)               │
│  <GlobalTop />                                   │
└──────────────────────────────────────────────────┘

NACHHER (impress-Modus):
┌─ #app ─────────────────────────────────────────────────┐
│  ┌─ .impress-viewport (fixed, fullscreen, overflow:hidden)─┐
│  │  ┌─ .impress-root (scale, perspective) ──────────────┐  │
│  │  │  ┌─ .slidev-slides → .impress-canvas ────────────┐│  │
│  │  │  │  (rotate3d + translate3d)                      ││  │
│  │  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐    ││  │
│  │  │  │  │ Step 1   │  │ Step 2   │  │ Step 3   │    ││  │
│  │  │  │  │ (abs pos)│  │ (abs pos)│  │ (abs pos)│    ││  │
│  │  │  │  │ x:-1000  │  │ x:0      │  │ x:1000   │    ││  │
│  │  │  │  │ y:-1500  │  │ y:-1500  │  │ y:-1500  │    ││  │
│  │  │  │  └──────────┘  └──────────┘  └──────────┘    ││  │
│  │  │  └────────────────────────────────────────────────┘│  │
│  │  └────────────────────────────────────────────────────┘  │
│  └──────────────────────────────────────────────────────────┘
│  <GlobalBottom /> (theme branding -- HIDDEN im impress-Modus)│
│  <GlobalTop />   (global-top.vue vom Addon)                  │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Implementierungs-Phasen

---

### Phase 0: Addon-Grundstruktur

**Ziel:** Lauffähiges, leeres Addon das von Slidev erkannt wird.

**Dateien:**

#### `slidev-addon-impress/package.json`
```json
{
  "name": "slidev-addon-impress",
  "version": "0.1.0",
  "private": true,
  "slidev": {
    "name": "impress",
    "colorSchema": "both"
  },
  "engines": {
    "slidev": ">=0.50.0"
  }
}
```

#### `slidev-addon-impress/styles/impress.css`
```css
/* Placeholder -- wird in Phase 2 gefüllt */
```

#### `slidev-addon-impress/setup/main.ts`
```typescript
import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(({ app, router }) => {
  console.log('[impress] Addon loaded')
})
```

#### `slidev-impress.md` (Frontmatter erweitern)
```yaml
addons:
  - ./slidev-addon-impress
```

**Verifizierung:**
- `pnpm install` ausführen (falls nötig)
- Slidev starten: `(sleep 999999 | npx slidev slidev-impress.md --no-open --port 3033) > /tmp/slidev-impress-output.log 2>&1 &`
- Console-Log `[impress] Addon loaded` im Browser bestätigen
- Keine Build-Fehler

**Risiko:** Slidev erkennt lokale Addon-Pfade mit `./` möglicherweise nicht. Falls nötig: Addon als Workspace-Package in `pnpm-workspace.yaml` registrieren oder über symlink in `node_modules/`.

**Fallback:** Statt separatem Addon direkt im `theme-mgm/` implementieren (Theme kann dieselben Extension Points nutzen).

---

### Phase 1: State-Management (useImpress.ts)

**Ziel:** Reaktiver State der Frontmatter-Daten aller Slides ausliest und als typisierte Datenstruktur bereitstellt.

**Datei:** `slidev-addon-impress/composables/useImpress.ts`

```typescript
import { computed, ref, reactive } from 'vue'
import { useNav } from '@slidev/client'

// ---- Typen ----

export interface ImpressConfig {
  enabled: boolean
  width: number           // Default: 1024
  height: number          // Default: 768
  perspective: number     // Default: 1000
  transitionDuration: number  // Default: 1000 (ms)
  maxScale: number        // Default: 3
  minScale: number        // Default: 0
  background: string      // Default: radial-gradient(...)
}

export interface ImpressStep {
  translate: { x: number; y: number; z: number }
  rotate: { x: number; y: number; z: number; order: string }
  scale: number
  transitionDuration: number | null  // null = global default
  cssClass: string
}

export interface ImpressState {
  config: ImpressConfig
  steps: ImpressStep[]
  currentStepIndex: number
  windowScale: number
  camera: {
    translate: { x: number; y: number; z: number }
    rotate: { x: number; y: number; z: number; order: string }
    scale: number
  }
}

// ---- Composable ----

export function useImpress() {
  const { slides, currentPage } = useNav()

  // Globale Konfiguration aus erstem Slide-Frontmatter
  const config = computed<ImpressConfig>(() => {
    const fm = slides.value[0]?.meta?.slide?.frontmatter ?? {}
    return {
      enabled: fm.impressEnabled === true,
      width: fm.impressWidth ?? 1024,
      height: fm.impressHeight ?? 768,
      perspective: fm.impressPerspective ?? 1000,
      transitionDuration: fm.impressTransitionDuration ?? 1000,
      maxScale: fm.impressMaxScale ?? 3,
      minScale: fm.impressMinScale ?? 0,
      background: fm.impressBackground ?? 'radial-gradient(rgb(240,240,240), rgb(190,190,190))',
    }
  })

  // Step-Daten aus jedem Slide-Frontmatter
  const steps = computed<ImpressStep[]>(() => {
    return slides.value.map(slide => {
      const fm = slide.meta?.slide?.frontmatter ?? {}
      return {
        translate: {
          x: fm.impressX ?? 0,
          y: fm.impressY ?? 0,
          z: fm.impressZ ?? 0,
        },
        rotate: {
          x: fm.impressRotateX ?? 0,
          y: fm.impressRotateY ?? 0,
          z: fm.impressRotate ?? fm.impressRotateZ ?? 0,
          order: fm.impressRotateOrder ?? 'xyz',
        },
        scale: fm.impressScale ?? 1,
        transitionDuration: fm.impressTransitionDuration ?? null,
        cssClass: fm.impressClass ?? '',
      }
    })
  })

  // Aktueller Step-Index (0-basiert, Slidev currentPage ist 1-basiert)
  const currentStepIndex = computed(() => currentPage.value - 1)

  // Window-Scale: Passt Canvas in Viewport ein
  const windowScale = ref(1)

  // Kamera-State (wird von gotoStep aktualisiert)
  const camera = reactive({
    translate: { x: 0, y: 0, z: 0 },
    rotate: { x: 0, y: 0, z: 0, order: 'xyz' },
    scale: 1,
  })

  return {
    config,
    steps,
    currentStepIndex,
    windowScale,
    camera,
    slides,
    currentPage,
  }
}
```

**Verifizierung:**
- Composable importierbar ohne Fehler
- `config.enabled` ist `true` für slidev-impress.md
- `steps` enthält 13 Einträge mit korrekten Koordinaten
- `currentStepIndex` ändert sich bei Navigation

**Hinweis:** `slides.value[i].meta.slide.frontmatter` -- der exakte Pfad zum Frontmatter muss beim ersten Test verifiziert werden. Möglicherweise ist es `slides.value[i].meta?.frontmatter` oder `slides.value[i].frontmatter`. Debug-Log einbauen.

---

### Phase 2: CSS-Fundament (styles/impress.css)

**Ziel:** Wenn `impressEnabled: true`, wird Slidevs Standard-Rendering überschrieben und alle Slides gleichzeitig sichtbar + absolut positioniert.

**Datei:** `slidev-addon-impress/styles/impress.css`

```css
/* ============================================
   IMPRESS MODE: Aktiviert via body.impress-enabled
   Die Klasse wird von setup/main.ts gesetzt
   ============================================ */

/* --- Viewport: Vollbild, Overflow versteckt --- */
.impress-viewport {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 100;
  /* Background wird via JS gesetzt (aus config.background) */
}

/* --- Root: Steuert Scale + Perspective --- */
.impress-root {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  transform-origin: top left;
  transform-style: preserve-3d;
  transition: all 0ms ease-in-out;
  /* transform + perspective werden via JS gesetzt */
}

/* --- Canvas (.slidev-slides): Steuert Rotate + Translate --- */
body.impress-enabled .slidev-slides {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  transform-origin: top left;
  transform-style: preserve-3d;
  transition: all 0ms ease-in-out;
  overflow: visible !important;
  /* transform wird via JS gesetzt */
}

/* --- Jeder Step: Absolut positioniert mit 3D Transform --- */
body.impress-enabled .slidev-slides > [data-slidev-no] {
  position: absolute !important;
  transform-style: preserve-3d;
  /* Zentriert: translate(-50%, -50%) wird als Teil des transforms gesetzt */
  /* transform wird via JS gesetzt (translate3d + rotate + scale) */

  /* Opacity-Transition für Dimming inaktiver Slides */
  opacity: 0.3;
  transition: opacity 1000ms;
}

/* --- Aktiver Step --- */
body.impress-enabled .slidev-slides > [data-slidev-no].impress-active {
  opacity: 1;
}

/* --- Present Step (für Slide-interne Animationen) --- */
body.impress-enabled .slidev-slides > [data-slidev-no].impress-present {
  /* Klasse für CSS-Selektoren in Slide-Styles */
}

/* --- Slidev SlideContainer Override --- */
body.impress-enabled .slidev-slide-content {
  /* SlideContainer Scale deaktivieren -- wir managen Scale selbst */
  transform: none !important;
  width: var(--impress-step-width, 1024px) !important;
  height: var(--impress-step-height, 768px) !important;
}

/* --- "slide" Klasse: Klassische Folien-Optik --- */
body.impress-enabled .impress-slide {
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 40px 60px;
}

/* --- Theme-Branding im impress-Modus verstecken --- */
body.impress-enabled .ia-branding {
  display: none !important;
}

/* --- Slidev Layout-Hintergrund im impress-Modus transparent --- */
body.impress-enabled .slidev-layout {
  background-color: transparent !important;
  /* impress-Slides nutzen eigene Hintergründe (Canvas-BG oder .slide-Klasse) */
}

/* --- GPU-Optimierung --- */
body.impress-enabled .impress-root,
body.impress-enabled .slidev-slides {
  will-change: transform;
}
```

**setup/main.ts ergänzen:** Klasse `impress-enabled` auf `<body>` setzen:

```typescript
if (config.enabled) {
  document.body.classList.add('impress-enabled')
}
```

**Verifizierung:**
- Mit `impress-enabled` Klasse auf body: Alle Slides gleichzeitig sichtbar
- Slides absolut positioniert (übereinander gestapelt, da transforms noch fehlen)
- Ohne `impress-enabled`: Standard-Slidev-Rendering unverändert
- Keine Slidev-eigenen Transitions mehr aktiv

---

### Phase 3: DOM-Wrapping & Viewport-Aufbau (setup/main.ts)

**Ziel:** Viewport + Root-Elemente injizieren, `.slidev-slides` darin einbetten.

**Datei:** `slidev-addon-impress/setup/main.ts`

**Algorithmus:**

```
1. Router ready abwarten
2. Prüfen: impressEnabled === true?
3. body.classList.add('impress-enabled')
4. Warten bis .slidev-slides im DOM existiert (MutationObserver)
5. Viewport-Element erstellen (.impress-viewport)
6. Root-Element erstellen (.impress-root)
7. .slidev-slides in Root einbetten (DOM-Reparenting)
8. Root in Viewport einbetten
9. Viewport in #app (oder body) einfügen
10. WindowScale berechnen
11. Slides positionieren (Phase 4)
12. Ersten Step ansteuern (Phase 5)
13. Router-Watcher für Navigation starten
```

**Kern-Code:**

```typescript
import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(({ app, router }) => {
  if (typeof window === 'undefined') return

  router.isReady().then(() => {
    // Konfiguration aus Frontmatter auslesen
    // (Zugriff über __slidev__.nav oder DOM-basiert)

    const waitForSlides = () => {
      const slidesEl = document.querySelector('.slidev-slides')
      if (!slidesEl) {
        // Retry via MutationObserver oder requestAnimationFrame
        requestAnimationFrame(waitForSlides)
        return
      }
      initImpress(slidesEl as HTMLElement)
    }

    // Kurzes Delay damit Slidev seinen DOM aufgebaut hat
    setTimeout(waitForSlides, 100)
  })
})

function initImpress(slidesEl: HTMLElement) {
  // 1. Body-Klasse setzen
  document.body.classList.add('impress-enabled')

  // 2. Viewport erstellen
  const viewport = document.createElement('div')
  viewport.className = 'impress-viewport'
  viewport.style.background = config.background

  // 3. Root erstellen
  const root = document.createElement('div')
  root.className = 'impress-root'

  // 4. DOM-Hierarchie aufbauen
  // WICHTIG: slidesEl.parentNode muss existieren
  const parent = slidesEl.parentNode!
  parent.insertBefore(viewport, slidesEl)
  viewport.appendChild(root)
  root.appendChild(slidesEl)
  // slidesEl ist jetzt innerhalb von viewport > root
  // Vue's VirtualDOM verliert es nicht, weil die Referenz erhalten bleibt

  // 5. WindowScale berechnen
  computeWindowScale(viewport, root)
  window.addEventListener('resize', () => computeWindowScale(viewport, root))

  // 6. Slides positionieren (Phase 4)
  positionAllSteps(slidesEl)

  // 7. Alle Slides abwarten (Slidev preloaded nach ~3s)
  waitForAllSlides(slidesEl, () => {
    positionAllSteps(slidesEl)
  })

  // 8. Ersten Step ansteuern
  gotoStep(0, root, slidesEl)

  // 9. Router-Watcher
  // ...
}
```

**DOM-Reparenting Risiko-Analyse:**

Das Verschieben von `.slidev-slides` in den neuen Viewport ist der kritischste Schritt. Vue 3 hält interne Referenzen auf DOM-Elemente. Wenn wir ein Element reparenten (im DOM verschieben), können folgende Probleme auftreten:

1. **TransitionGroup verliert Referenz** -- Unwahrscheinlich, da wir das Container-Element verschieben, nicht die Kinder
2. **Event-Listener gehen verloren** -- Nein, DOM-Event-Listener bleiben bei reparenting erhalten
3. **Vue Patch-Algorithmus findet Element nicht** -- Möglich bei nächstem Re-render

**Mitigation:**
- Reparenting einmalig durchführen, BEVOR Vue weitere Updates macht
- Alternative: Statt Reparenting, Viewport/Root via CSS `position: fixed` über dem bestehenden DOM platzieren und `.slidev-slides` per CSS in Position bringen (ohne DOM-Verschiebung)

**Alternative ohne Reparenting (sicherer):**

```css
/* Statt DOM-Reparenting: CSS-basierte Viewport-Simulation */
body.impress-enabled {
  overflow: hidden;
}

/* .slidev-slides wird direkt zum "Canvas" */
body.impress-enabled .slidev-slides {
  position: fixed !important;
  top: 50%;
  left: 50%;
  /* ... canvas transforms ... */
}
```

In diesem Fall entfällt der separate Root-Wrapper. Scale und Rotate/Translate müssen auf dem gleichen Element passieren, was die Zoom-Delay-Logik komplizierter macht (siehe Phase 5 Alternative).

**Empfehlung:** Erst den sicheren CSS-only-Ansatz ohne Reparenting versuchen. Wenn Zoom-Delay benötigt wird, DOM-Reparenting als Upgrade implementieren.

**Verifizierung Phase 3:**
- Viewport existiert im DOM als `.impress-viewport`
- Root existiert als `.impress-root`
- `.slidev-slides` ist innerhalb der neuen Hierarchie
- Kein Vue-Rendering-Fehler in der Console
- Background des Viewports sichtbar (radial-gradient)

---

### Phase 4: Slide-Positionierung

**Ziel:** Jeder Slide bekommt seinen 3D-Transform basierend auf Frontmatter-Koordinaten.

**Algorithmus für jeden Step:**

```typescript
function positionStep(stepEl: HTMLElement, step: ImpressStep) {
  // Transform-String aufbauen:
  // 1. Zentrieren: translate(-50%, -50%)
  // 2. Position: translate3d(x, y, z)
  // 3. Rotation: rotateZ(z) rotateY(y) rotateX(x) [nach order]
  // 4. Scale: scale(s)

  const t = step.translate
  const r = step.rotate
  const rotateCSS = buildRotateCSS(r)

  stepEl.style.transform = [
    'translate(-50%, -50%)',
    `translate3d(${t.x}px, ${t.y}px, ${t.z}px)`,
    rotateCSS,
    `scale(${step.scale})`,
  ].join(' ')

  // CSS-Klasse setzen (z.B. "slide")
  if (step.cssClass) {
    step.cssClass.split(' ').forEach(cls => {
      stepEl.classList.add(`impress-${cls}`)
    })
  }
}

function buildRotateCSS(r: { x: number; y: number; z: number; order: string }): string {
  const axes = r.order.split('')
  return axes
    .map(a => {
      const val = r[a as 'x' | 'y' | 'z']
      if (val === 0) return ''
      return `rotate${a.toUpperCase()}(${val}deg)`
    })
    .filter(Boolean)
    .join(' ')
}
```

**Frontmatter-Zugriff:**

```typescript
function getStepData(slideNo: number): ImpressStep {
  // Option A: Über Slidev's interne API
  const slideInfo = __slidev__?.nav?.slides?.[slideNo - 1]
  const fm = slideInfo?.meta?.slide?.frontmatter ?? {}

  // Option B: Über HTML-Kommentare im Slide (Fallback)
  // slidev-impress.md hat Kommentare wie:
  // <!-- impressX: -1000, impressY: -1500, impressClass: slide -->

  return {
    translate: {
      x: fm.impressX ?? 0,
      y: fm.impressY ?? 0,
      z: fm.impressZ ?? 0,
    },
    rotate: {
      x: fm.impressRotateX ?? 0,
      y: fm.impressRotateY ?? 0,
      z: fm.impressRotate ?? fm.impressRotateZ ?? 0,
      order: fm.impressRotateOrder ?? 'xyz',
    },
    scale: fm.impressScale ?? 1,
    transitionDuration: fm.impressTransitionDuration ?? null,
    cssClass: fm.impressClass ?? '',
  }
}
```

**Alle Slides positionieren:**

```typescript
function positionAllSteps(canvasEl: HTMLElement) {
  const stepElements = canvasEl.querySelectorAll('[data-slidev-no]')
  stepElements.forEach(el => {
    const slideNo = parseInt(el.getAttribute('data-slidev-no')!, 10)
    const stepData = getStepData(slideNo)
    positionStep(el as HTMLElement, stepData)
  })
}
```

**Preload-Handling:**

Slidev preloaded Slides gestaffelt. Neue Slides erscheinen im DOM durch Vue-Rendering. MutationObserver auf `.slidev-slides` lauscht auf neue Kinder und positioniert sie:

```typescript
function waitForAllSlides(canvasEl: HTMLElement, onNewSlide: () => void) {
  const observer = new MutationObserver((mutations) => {
    let hasNewSlides = false
    for (const m of mutations) {
      if (m.type === 'childList' && m.addedNodes.length) {
        hasNewSlides = true
      }
    }
    if (hasNewSlides) onNewSlide()
  })
  observer.observe(canvasEl, { childList: true })
}
```

**Verifizierung Phase 4:**
- Alle 13 Slides auf dem Canvas verteilt (nicht mehr übereinander)
- Koordinaten stimmen mit Frontmatter überein
- Slides mit `impressClass: slide` haben weißen Hintergrund + Rahmen
- 3D-Rotation sichtbar bei Slides 5-8, 12

---

### Phase 5: Kamera-Algorithmus (gotoStep)

**Ziel:** Virtuelle Kamera fliegt zum Ziel-Slide per CSS-Transition.

**Kern: Inverse Transformation**

Die Kamera-Position ist die INVERSE der Slide-Koordinaten:
- Slide bei `x=1000, y=-1500, rotate=90, scale=5`
- Kamera: `translate(-1000, 1500, 0)`, `rotate(-90)`, `scale(1/5)`

**Implementierung:**

```typescript
interface CameraState {
  translate: { x: number; y: number; z: number }
  rotate: { x: number; y: number; z: number; order: string }
  scale: number
}

let currentCamera: CameraState = {
  translate: { x: 0, y: 0, z: 0 },
  rotate: { x: 0, y: 0, z: 0, order: 'xyz' },
  scale: 1,
}

function gotoStep(
  stepIndex: number,
  rootEl: HTMLElement,
  canvasEl: HTMLElement,
  config: ImpressConfig
) {
  const step = getStepData(stepIndex + 1) // slideNo ist 1-basiert

  // 1. Inverse Transformation berechnen
  const target: CameraState = {
    translate: {
      x: -step.translate.x,
      y: -step.translate.y,
      z: -step.translate.z,
    },
    rotate: {
      x: -step.rotate.x,
      y: -step.rotate.y,
      z: -step.rotate.z,
      order: step.rotate.order,
    },
    scale: 1 / step.scale,
  }

  // 2. WindowScale berechnen
  const windowScale = computeWindowScale(config)

  // 3. Finale Skalierung
  const targetScale = target.scale * windowScale

  // 4. Zoom-Richtung bestimmen
  const zoomin = target.scale >= currentCamera.scale
  const duration = step.transitionDuration ?? config.transitionDuration
  const delay = duration / 2

  // 5. Root-Transform setzen (Scale + Perspective)
  rootEl.style.perspective = `${config.perspective / targetScale}px`
  rootEl.style.transform = `scale(${targetScale})`
  rootEl.style.transitionDuration = `${duration}ms`
  rootEl.style.transitionDelay = `${zoomin ? delay : 0}ms`

  // 6. Canvas-Transform setzen (Rotate + Translate)
  const rotateCSS = buildRotateCSS(target.rotate, true) // revert=true
  const translateCSS = `translate3d(${target.translate.x}px, ${target.translate.y}px, ${target.translate.z}px)`
  canvasEl.style.transform = `${rotateCSS} ${translateCSS}`
  canvasEl.style.transitionDuration = `${duration}ms`
  canvasEl.style.transitionDelay = `${zoomin ? 0 : delay}ms`

  // 7. CSS-Klassen aktualisieren
  updateStepClasses(canvasEl, stepIndex)

  // 8. State aktualisieren
  currentCamera = target
}

function buildRotateCSS(
  r: { x: number; y: number; z: number; order: string },
  revert = false
): string {
  let axes = r.order.split('')
  if (revert) axes = axes.reverse()
  return axes
    .map(a => {
      const val = r[a as 'x' | 'y' | 'z']
      return `rotate${a.toUpperCase()}(${val}deg)`
    })
    .join(' ')
}
```

**WindowScale-Berechnung:**

```typescript
function computeWindowScale(config: ImpressConfig): number {
  const hScale = window.innerHeight / config.height
  const wScale = window.innerWidth / config.width
  const scale = Math.min(hScale, wScale)

  // Clampen auf maxScale/minScale
  if (config.maxScale && scale > config.maxScale) return config.maxScale
  if (config.minScale && scale < config.minScale) return config.minScale
  return scale
}
```

**Zoom-Delay-Logik (Zwei-Ebenen-Transform):**

| Richtung | Root (Scale) | Canvas (Rotate+Translate) | Effekt |
|----------|-------------|---------------------------|--------|
| **Zoom-In** (Scale wird größer) | `delay = duration/2` | `delay = 0` | Erst bewegen, dann zoomen |
| **Zoom-Out** (Scale wird kleiner) | `delay = 0` | `delay = duration/2` | Erst zoomen, dann bewegen |

Diese Staffelung erzeugt natürlich wirkende Kamerabewegungen -- das Herzstück des impress.js-Erlebnisses.

**Alternative ohne Zwei-Ebenen-Transform (CSS-only Ansatz):**

Falls DOM-Reparenting Probleme macht und alles auf einem Element passieren muss, können wir individuelle CSS-Transformations-Properties nutzen (CSS Transform Level 2):

```css
.slidev-slides {
  scale: var(--impress-scale);
  rotate: var(--impress-rotate);
  translate: var(--impress-translate);
  transition:
    scale var(--impress-duration) ease-in-out var(--impress-scale-delay),
    rotate var(--impress-duration) ease-in-out var(--impress-rotate-delay),
    translate var(--impress-duration) ease-in-out var(--impress-translate-delay);
}
```

Problem: `rotate` als einzelne Property unterstützt nur `rotate: z-angle` oder `rotate: axis angle`, nicht multi-Achsen-Rotation wie `rotateX(40) rotateY(10) rotateZ(300)`. Für volle 3D-Rotation ist daher der Zwei-Ebenen-Ansatz nötig.

**Verifizierung Phase 5:**
- Navigation (Pfeiltasten) löst Kameraflug aus
- Zoom-In/Out haben unterschiedliche Delay-Sequenzen
- Kamera zentriert auf aktuellem Slide
- Smooth CSS-Transitions (1000ms default)
- Perspective ändert sich passend zum Scale

---

### Phase 6: CSS-Klassen & Slide-Animationen

**Ziel:** Steps bekommen CSS-Klassen (future/present/past/active) für Slide-interne Animationen.

```typescript
function updateStepClasses(canvasEl: HTMLElement, activeIndex: number) {
  const steps = canvasEl.querySelectorAll('[data-slidev-no]')

  steps.forEach((el, i) => {
    el.classList.remove('impress-future', 'impress-present', 'impress-past', 'impress-active')

    // sortedIndex basiert auf data-slidev-no, nicht DOM-Position
    const slideNo = parseInt(el.getAttribute('data-slidev-no')!, 10)
    const stepIdx = slideNo - 1

    if (stepIdx < activeIndex) {
      el.classList.add('impress-past')
    } else if (stepIdx === activeIndex) {
      el.classList.add('impress-present', 'impress-active')
    } else {
      el.classList.add('impress-future')
    }
  })
}
```

**Slide-interne Animationen (bereits in slidev-impress.md definiert):**

Die CSS-Selektoren in `slidev-impress.md` nutzen `.impress-present`:

```css
/* Slide 8 "ing": Wörter animieren wenn present */
.impress-present .ing-step .positioning {
  transform: translateY(-10px);
}
.impress-present .ing-step .rotating {
  transform: rotate(-10deg);
  transition-delay: 0.25s;
}

/* Slide 12 "its-in-3d": Wörter auf Z=0 wenn present */
.impress-present .its-in-3d-step span,
.impress-present .its-in-3d-step b {
  transform: translateZ(0px);
}
```

Diese Selektoren funktionieren automatisch, sobald die `.impress-present` Klasse korrekt gesetzt wird.

**Verifizierung Phase 6:**
- Slide 8 "ing": Wörter animieren sich beim Aktivieren
- Slide 12 "its-in-3d": 3D-Wörter kollabieren zu Z=0
- Inaktive Slides bei 30% Opacity
- Aktiver Slide bei 100% Opacity
- Transition bei Opacity-Wechsel (1000ms)

---

### Phase 7: Router-Integration & Navigation

**Ziel:** Slidev-Navigation (Pfeiltasten, Klick) triggert Kamera-Transition.

**setup/main.ts (Navigation-Handler):**

```typescript
// In initImpress():

// A: Vue Router Watch
router.afterEach((to) => {
  const match = to.path.match(/\/(\d+)/)
  if (match) {
    const page = parseInt(match[1], 10)
    gotoStep(page - 1, rootEl, canvasEl, config)
  }
})

// B: Alternativ, über Slidevs internen State (robuster)
// Falls __slidev__ global verfügbar:
const nav = (window as any).__slidev__?.nav
if (nav?.currentPage) {
  watch(nav.currentPage, (page: number) => {
    gotoStep(page - 1, rootEl, canvasEl, config)
  })
}
```

**Keyboard-Handler:**

Slidev hat bereits Keyboard-Navigation (Pfeiltasten → next/prev). Diese lösen Router-Navigation aus, was unseren afterEach-Hook triggert. Keine zusätzlichen Keyboard-Handler nötig.

Falls zusätzliche Keys gewünscht (Tab, Home, End):

```typescript
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault()
    nav.next()
  } else if (e.key === 'Home') {
    e.preventDefault()
    nav.goFirst()
  } else if (e.key === 'End') {
    e.preventDefault()
    nav.goLast()
  }
})
```

**Verifizierung Phase 7:**
- Pfeiltasten: nächster/vorheriger Slide mit Kameraflug
- URL ändert sich bei Navigation (/1, /2, ...)
- Direkte URL-Eingabe (/5) fliegt zu Slide 5
- Kein Doppel-Triggern der Navigation

---

### Phase 8: Theme-Kompatibilität & Fallback

**Ziel:** Sauberes Zusammenspiel mit theme-mgm und Fallback ohne impress.

#### 8.1 Theme-mgm Gradient-Kompatibilität

theme-mgm setzt `--ia-slide-bg` als Hintergrundfarbe pro Slide. Im impress-Modus:

- Option A: **Gradient als Step-Hintergrund** -- Jeder Step behält seinen farbigen Hintergrund (statt transparent). Die Steps schweben als farbige Karten auf dem Canvas.
- Option B: **Canvas-Hintergrund** -- Steps sind transparent, Canvas hat einheitlichen Hintergrund (impress-Original). Theme-Gradient wird deaktiviert.
- **Empfehlung:** Option B für authentisches impress.js-Feeling. Option A als configurable Feature (`impressThemeBackground: true`).

#### 8.2 theme-mgm Branding

- mgm-Logo und Color-Bar (aus `global-bottom.vue`) werden im impress-Modus per CSS versteckt
- Alternativ: Branding im impress-Modus auf dem Viewport anzeigen (fixiert, nicht auf Canvas)

```css
/* Branding auf Viewport-Ebene statt Slide-Ebene */
body.impress-enabled .ia-branding {
  position: fixed;
  z-index: 200;
  /* Logo weiterhin oben rechts */
}
```

#### 8.3 Fallback (impressEnabled: false oder fehlend)

```typescript
// In setup/main.ts:
if (!config.enabled) {
  // Nichts tun -- Standard-Slidev-Rendering
  return
}
```

Ohne `impressEnabled: true` im Frontmatter:
- Keine CSS-Klasse auf body
- Keine DOM-Manipulation
- Keine Kamera-Logik
- Standard-Slidev mit theme-mgm funktioniert wie gewohnt

#### 8.4 Presenter Mode

Im Presenter Mode (`/presenter/`) deaktivieren oder adaptieren:

```typescript
if (window.location.pathname.includes('/presenter')) {
  // Impress-Mode deaktivieren für Presenter
  // Oder: Miniatur-Vorschau des Canvas rendern
  return
}
```

---

### Phase 9: Test & Verifizierung

**Testplan für jede Phase:**

| Phase | Test | Methode |
|-------|------|---------|
| 0 | Addon wird geladen | Console-Log prüfen |
| 1 | Frontmatter-Daten korrekt | Console-Log der 13 Steps |
| 2 | CSS-Overrides aktiv | Visuell: Alle Slides sichtbar |
| 3 | DOM-Struktur korrekt | DevTools: Viewport/Root/Canvas Hierarchie |
| 4 | Slides positioniert | Visuell: Slides verteilt auf Canvas |
| 5 | Kameraflug funktional | Navigation: Smooth Transition zwischen Slides |
| 6 | CSS-Klassen gesetzt | DevTools: impress-present/past/future |
| 7 | Navigation komplett | Alle Keyboard-Shortcuts, URL-Navigation |
| 8 | Theme-Kompatibilität | Standard-Präsentation unverändert |

**Browser-Agent-Verifizierung (nach jeder Major-Phase):**
- Screenshot aller 13 Slides
- Navigation durchspielen (Slide 1 → 13)
- Spezielle Transitions prüfen:
  - Slide 4 → 5: 90° Rotation + Zoom
  - Slide 6 → 7: Z-Achsen-Tauchgang (z=-3000)
  - Slide 11 → 12: Multi-Achsen 3D-Rotation
  - Slide 12 → 13: Zoom-Out auf 10x (Overview)
- Slide-interne Animationen:
  - Slide 8: Wort-Animationen (positioning/rotating/scaling)
  - Slide 12: 3D-Typografie-Kollaps

---

## 3. Risiken & Mitigationen

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| **Slidev erkennt lokales Addon nicht** | Mittel | Blockierend | Fallback: In theme-mgm integrieren |
| **DOM-Reparenting bricht Vue** | Mittel | Hoch | CSS-only Ansatz ohne Reparenting |
| **Slidev preloaded nicht alle Slides** | Niedrig | Hoch | Manuelles Mounting aller Route-Komponenten |
| **TransitionGroup interferiert** | Mittel | Mittel | `transition: none` + CSS `!important` Overrides |
| **SlideContainer Scale kollidiert** | Hoch | Mittel | `transform: none !important` Override |
| **Frontmatter-Zugriff-Pfad falsch** | Mittel | Niedrig | Debug-Logging, mehrere Pfade testen |
| **Performance bei 13+ Slides** | Niedrig | Niedrig | GPU-Compositing via will-change |
| **Presenter Mode bricht** | Mittel | Niedrig | Impress-Mode in Presenter deaktivieren |

---

## 4. Implementierungs-Reihenfolge (empfohlen)

```
Phase 0 (Addon-Setup)              → 30 min
  ↓
Phase 1 (useImpress.ts)            → 45 min
  ↓
Phase 2 (CSS-Fundament)            → 30 min
  ↓
Phase 3 (DOM-Wrapping)             → 60 min  ← Kritischste Phase
  ↓
Phase 4 (Slide-Positionierung)     → 30 min
  ↓
  → CHECKPOINT: Alle Slides sichtbar auf Canvas, statisch
  ↓
Phase 5 (Kamera-Algorithmus)       → 60 min  ← Kern-Feature
  ↓
  → CHECKPOINT: Navigation mit Kameraflug funktional
  ↓
Phase 6 (CSS-Klassen)              → 20 min
  ↓
Phase 7 (Router-Integration)       → 30 min
  ↓
  → CHECKPOINT: Vollständige Demo funktional
  ↓
Phase 8 (Theme/Fallback)           → 30 min
  ↓
Phase 9 (Test)                     → 45 min
```

**Gesamtaufwand:** ~6 Stunden

**Kritischer Pfad:** Phase 3 (DOM-Wrapping) → Phase 5 (Kamera). Wenn DOM-Reparenting fehlschlägt, muss auf CSS-only umgestellt werden.

---

## 5. Datei-Übersicht (zu erstellen)

| Datei | Phase | Beschreibung |
|-------|-------|-------------|
| `slidev-addon-impress/package.json` | 0 | Addon-Metadaten |
| `slidev-addon-impress/composables/useImpress.ts` | 1 | State-Management, Frontmatter-Parsing |
| `slidev-addon-impress/styles/impress.css` | 2 | CSS-Overrides, 3D-Canvas-Styles |
| `slidev-addon-impress/setup/main.ts` | 3,4,5,6,7 | DOM-Setup, Kamera, Navigation |
| `slidev-addon-impress/global-top.vue` | 3 | Optional: Vue-basierter Viewport |
| `slidev-impress.md` | - | Bereits erstellt (Frontmatter erweitern um `addons`) |

---

## 6. Offene Fragen (während Implementierung zu klären)

1. **Frontmatter-Zugriffspfad:** Wie genau ist der Pfad zu Slide-Frontmatter in Slidev v52.12? (`slides[i].meta.slide.frontmatter` vs. `slides[i].frontmatter` vs. `__slidev__.nav.slides[i].meta.frontmatter`)

2. **Lokale Addons:** Unterstützt Slidev v52 relative Pfade (`./slidev-addon-impress`) in der `addons`-Frontmatter-Config? Falls nicht: Workspace-Package oder Integration in Theme.

3. **Alle Slides im DOM:** Ab wann sind alle 13 Slides im DOM? Nur nach 3s Preload, oder gibt es eine API um sofortiges Rendering aller Slides zu erzwingen?

4. **Vue-Reaktivität nach DOM-Reparenting:** Bleibt Vue's Patch-Algorithmus stabil wenn `.slidev-slides` reparentet wird? Muss bei jedem Vue-Update die Position überprüft werden?

5. **Slide-Dimensionen im impress-Modus:** Haben Steps eine feste Größe (`impressWidth × impressHeight`) oder nutzen sie die Theme-Layout-Dimensionen? Die Original-impress.js-Demo hat `width: 900px` auf `.step`-Elementen.

---

## 7. Akzeptanzkriterien

Die Implementierung ist erfolgreich wenn:

- [ ] `slidev-impress.md` zeigt alle 13 Slides auf einem 3D-Canvas
- [ ] Navigation per Pfeiltasten fliegt die Kamera zum Ziel-Slide
- [ ] Slides 1-3: Horizontaler Pan (keine Rotation, kein Zoom)
- [ ] Slide 4: Dramatischer Zoom-Out auf Scale 4
- [ ] Slide 5: Pan + 90°-Rotation + Zoom auf Scale 5
- [ ] Slide 6: 180°-Rotation + Zoom auf Scale 6
- [ ] Slide 7: Z-Achsen-Tauchgang (z=-3000)
- [ ] Slide 8: Wort-Animationen ("positioning" bewegt sich, "rotating" dreht sich, "scaling" skaliert)
- [ ] Slide 12: Multi-Achsen 3D-Rotation (rotateX=-40, rotateY=10) + 3D-Typografie
- [ ] Slide 13: Overview-Zoom auf Scale 10 zeigt alle Slides
- [ ] Inaktive Slides bei ~30% Opacity, aktiver bei 100%
- [ ] Transitions dauern 1000ms mit natürlichem Zoom-Sequencing
- [ ] Ohne `impressEnabled: true`: Standard-Slidev-Rendering unverändert
- [ ] Keine Console-Errors
- [ ] Kompatibel mit theme-mgm Layouts

---

## Quellen

- Spezifikation: `_NOTES/impress-theme-specs.md`
- Erste Analyse: `_NOTES/impress-Erste-Analyse.md`
- impress.js Quellcode: `_NOTES/impress.js/src/impress.js`
- impress.js Demo: `_NOTES/impress.js/index.html`
- Slidev SlidesShow.vue: `node_modules/@slidev/client/internals/SlidesShow.vue`
- Slidev SlideWrapper.vue: `node_modules/@slidev/client/internals/SlideWrapper.vue`
- Slidev useNav.ts: `node_modules/@slidev/client/composables/useNav.ts`
- theme-mgm setup/main.ts: `theme-mgm/setup/main.ts`
- Demo-Präsentation: `slidev-impress.md`
