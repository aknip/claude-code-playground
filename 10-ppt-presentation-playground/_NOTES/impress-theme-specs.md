# slidev-addon-impress: Detaillierte Spezifikation

**Datum:** 2026-02-14
**Typ:** Slidev Addon
**Name:** `slidev-addon-impress`
**Ziel:** impress.js-artige 3D-Canvas-Präsentationen in Slidev ermöglichen

---

## 1. Übersicht

### 1.1 Konzept

Das Addon ersetzt Slidevs Standard-Slide-Transitions durch ein impress.js-artiges "Infinite Canvas"-System. Alle Slides existieren gleichzeitig auf einem 2D/3D-Canvas, und eine virtuelle "Kamera" fliegt per CSS3-Transforms (translate3d, rotate3d, scale) zwischen den Slides.

### 1.2 Aktivierung

Per Frontmatter in der ersten Slide (globale Konfiguration):

```yaml
---
impressEnabled: true
impressWidth: 1024
impressHeight: 768
impressPerspective: 1000
impressTransitionDuration: 1000
impressMaxScale: 3
impressMinScale: 0
---
```

Per Frontmatter pro Slide (Positionierung):

```yaml
---
impressX: 850
impressY: 3000
impressZ: 0
impressRotate: 90
impressRotateX: 0
impressRotateY: 0
impressRotateOrder: xyz
impressScale: 5
impressTransitionDuration: 1000
impressClass: slide
---
```

---

## 2. Frontmatter-Parameter (pro Slide)

### 2.1 Positionierung

| Parameter | Typ | Default | Beschreibung |
|-----------|-----|---------|-------------|
| `impressX` | number | 0 | X-Position des Slide-Zentrums auf dem Canvas (px) |
| `impressY` | number | 0 | Y-Position des Slide-Zentrums auf dem Canvas (px) |
| `impressZ` | number | 0 | Z-Position (Tiefe, px). Negativ = weiter weg |

### 2.2 Rotation

| Parameter | Typ | Default | Beschreibung |
|-----------|-----|---------|-------------|
| `impressRotate` | number | 0 | Rotation um Z-Achse (Grad). Alias für `impressRotateZ` |
| `impressRotateX` | number | 0 | Rotation um X-Achse (Grad). Kippt vorwärts/rückwärts |
| `impressRotateY` | number | 0 | Rotation um Y-Achse (Grad). Kippt seitwärts |
| `impressRotateZ` | number | 0 | Rotation um Z-Achse (Grad). Dreht im Uhrzeigersinn |
| `impressRotateOrder` | string | "xyz" | Reihenfolge der Rotationsachsen |

### 2.3 Skalierung & Timing

| Parameter | Typ | Default | Beschreibung |
|-----------|-----|---------|-------------|
| `impressScale` | number | 1 | Skalierungsfaktor. 2 = doppelt so groß |
| `impressTransitionDuration` | number | (global) | Transitionsdauer in ms (überschreibt global) |

### 2.4 Styling-Klassen

| Parameter | Typ | Default | Beschreibung |
|-----------|-----|---------|-------------|
| `impressClass` | string | "" | Zusätzliche CSS-Klassen. `"slide"` = weißer Rahmen (klassische Slide) |

---

## 3. Globale Konfiguration (Frontmatter der ersten Slide)

| Parameter | Typ | Default | Beschreibung |
|-----------|-----|---------|-------------|
| `impressEnabled` | boolean | false | Aktiviert den impress.js-Modus |
| `impressWidth` | number | 1024 | Canvas-Breite für Skalierungsberechnung |
| `impressHeight` | number | 768 | Canvas-Höhe für Skalierungsberechnung |
| `impressPerspective` | number | 1000 | CSS Perspective-Wert (px). 0 = kein 3D |
| `impressTransitionDuration` | number | 1000 | Standard-Transitionsdauer (ms) |
| `impressMaxScale` | number | 3 | Maximaler Skalierungsfaktor |
| `impressMinScale` | number | 0 | Minimaler Skalierungsfaktor |
| `impressBackground` | string | "radial-gradient(rgb(240,240,240), rgb(190,190,190))" | Hintergrund des Canvas |

---

## 4. Addon-Architektur

### 4.1 Verzeichnisstruktur

```
slidev-addon-impress/
├── components/
│   └── ImpressCanvas.vue         # Kern-Komponente: 3D Canvas + Kamera
├── composables/
│   └── useImpress.ts             # Reaktiver State, Kamera-Logik
├── setup/
│   └── main.ts                   # Vue Plugin: State injizieren, Keyboard-Handler
├── global-top.vue                # Globaler Overlay: rendert ImpressCanvas
├── styles/
│   └── index.css                 # 3D-Transforms, Perspective, Slide-Styles
└── package.json                  # Addon-Metadaten
```

### 4.2 Komponenten-Design

#### `ImpressCanvas.vue` -- Kern-Komponente

```
┌─────────────────────────────────────────────────────┐
│  #impress-viewport (position: absolute, overflow: hidden)      │
│  ┌───────────────────────────────────────────────┐  │
│  │  #impress-root (transform: scale(windowScale))│  │
│  │  perspective: config.perspective/scale         │  │
│  │  ┌───────────────────────────────────────────┐│  │
│  │  │  #impress-canvas                          ││  │
│  │  │  transform: rotate3d() translate3d()      ││  │
│  │  │  ┌──────┐  ┌──────┐  ┌──────┐           ││  │
│  │  │  │Slide1│  │Slide2│  │Slide3│  ...       ││  │
│  │  │  │(abs) │  │(abs) │  │(abs) │           ││  │
│  │  │  └──────┘  └──────┘  └──────┘           ││  │
│  │  └───────────────────────────────────────────┘│  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Zwei-Ebenen-Transform (wie impress.js original):**
- **Root-Element**: Steuert `scale()` -- Zoom-In/Out
- **Canvas-Element**: Steuert `rotate3d()` + `translate3d()` -- Kamerabewegung

**Grund für Zwei-Ebenen:**
Ermöglicht gestaffelte Transitions (Delay) für natürlich wirkende Kamerabewegungen:
- Zoom-In: Erst move/rotate (sofort), dann scale (verzögert)
- Zoom-Out: Erst scale (sofort), dann move/rotate (verzögert)

#### `useImpress.ts` -- Composable

```typescript
interface ImpressConfig {
  width: number         // Canvas target width (default: 1024)
  height: number        // Canvas target height (default: 768)
  perspective: number   // CSS perspective (default: 1000)
  transitionDuration: number  // Default transition ms (default: 1000)
  maxScale: number      // Max zoom factor (default: 3)
  minScale: number      // Min zoom factor (default: 0)
}

interface ImpressStepData {
  translate: { x: number, y: number, z: number }
  rotate: { x: number, y: number, z: number, order: string }
  scale: number
  transitionDuration: number
  cssClass: string
}

interface ImpressState {
  config: ImpressConfig
  steps: ImpressStepData[]
  currentStep: number
  currentState: {
    translate: { x: number, y: number, z: number }
    rotate: { x: number, y: number, z: number, order: string }
    scale: number
  }
  windowScale: number
}
```

### 4.3 Kamera-Algorithmus

Exakte Reimplementierung des impress.js-Kamera-Algorithmus:

```typescript
function gotoStep(stepIndex: number) {
  const step = steps[stepIndex]

  // 1. Berechne Ziel-Transform (Inverse der Step-Koordinaten)
  const target = {
    rotate: {
      x: -step.rotate.x,
      y: -step.rotate.y,
      z: -step.rotate.z,
      order: step.rotate.order
    },
    translate: {
      x: -step.translate.x,
      y: -step.translate.y,
      z: -step.translate.z
    },
    scale: 1 / step.scale
  }

  // 2. Bestimme Zoom-Richtung
  const zoomin = target.scale >= currentState.scale
  const duration = step.transitionDuration || config.transitionDuration
  const delay = duration / 2

  // 3. Berechne finale Skalierung
  const targetScale = target.scale * windowScale

  // 4. Setze Root-Transform (Scale)
  root.style.perspective = `${config.perspective / targetScale}px`
  root.style.transform = `scale(${targetScale})`
  root.style.transitionDuration = `${duration}ms`
  root.style.transitionDelay = `${zoomin ? delay : 0}ms`

  // 5. Setze Canvas-Transform (Rotate + Translate)
  canvas.style.transform = buildRotateCSS(target.rotate, true) +
                            buildTranslateCSS(target.translate)
  canvas.style.transitionDuration = `${duration}ms`
  canvas.style.transitionDelay = `${zoomin ? 0 : delay}ms`

  // 6. State aktualisieren
  currentState = target
}
```

**Build-Funktionen:**

```typescript
function buildTranslateCSS(t) {
  return `translate3d(${t.x}px, ${t.y}px, ${t.z}px)`
}

function buildRotateCSS(r, revert = false) {
  const axes = r.order.split('')
  if (revert) axes.reverse()
  return axes.map(a => `rotate${a.toUpperCase()}(${r[a]}deg)`).join(' ')
}
```

---

## 5. CSS-Spezifikation

### 5.1 Viewport & Canvas

```css
/* Viewport: Vollbild, versteckt Overflow */
.impress-viewport {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1000;
}

/* Root: Zentriert, steuert Scale */
.impress-root {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: top left;
  transform-style: preserve-3d;
  transition: all 0s ease-in-out;
}

/* Canvas: Steuert Rotation & Translation */
.impress-canvas {
  position: absolute;
  transform-origin: top left;
  transform-style: preserve-3d;
  transition: all 0s ease-in-out;
}
```

### 5.2 Step-Positionierung

```css
/* Jeder Step wird absolut positioniert via inline transform */
.impress-step {
  position: absolute;
  transform-style: preserve-3d;
  /* transform wird per JS gesetzt:
     transform: translate(-50%, -50%)
                translate3d(Xpx, Ypx, Zpx)
                rotateX(deg) rotateY(deg) rotateZ(deg)
                scale(N) */
}
```

### 5.3 Step-Sichtbarkeit & Opacity

```css
/* Inaktive Steps: gedimmt */
.impress-step {
  opacity: 0.3;
  transition: opacity 1s;
}

/* Aktiver Step: voll sichtbar */
.impress-step.impress-active {
  opacity: 1;
}

/* Future/Present/Past Klassen für Slide-interne Animationen */
.impress-step.impress-future { /* Noch nicht besucht */ }
.impress-step.impress-present { /* Aktuell aktiv */ }
.impress-step.impress-past { /* Bereits besucht */ }

/* Overview: alle Steps sichtbar */
.impress-overview .impress-step {
  opacity: 1;
  cursor: pointer;
}
```

### 5.4 "slide"-Klasse (klassische Folien-Optik)

```css
/* Wenn impressClass: "slide" gesetzt ist */
.impress-step.impress-slide {
  display: block;
  width: 900px;
  height: 700px;
  padding: 40px 60px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  color: rgb(102, 102, 102);
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 30px;
  line-height: 36px;
  letter-spacing: -1px;
}
```

### 5.5 Hintergrund

```css
/* Canvas-Hintergrund (konfigurierbar via impressBackground) */
body.impress-enabled {
  background: radial-gradient(rgb(240,240,240), rgb(190,190,190));
  overflow: hidden;
  height: 100%;
}
```

### 5.6 Slidev-Override (wenn impress aktiv)

```css
/* Slidev Standard-Transitions deaktivieren */
body.impress-enabled .slidev-slides {
  /* Default-TransitionGroup-Verhalten ausschalten */
}

/* Slidev Standard-Rendering verstecken */
body.impress-enabled .slidev-page {
  /* Wird durch ImpressCanvas gerendert */
}
```

---

## 6. Slide-interne Animationen

### 6.1 CSS-Klassen-System (wie impress.js)

Jeder Step bekommt automatisch Klassen zugewiesen:

| Klasse | Zeitpunkt | Beschreibung |
|--------|-----------|-------------|
| `impress-future` | Initial | Step wurde noch nicht besucht |
| `impress-present` | Step wird aktiv | Transition startet, Step ist Ziel |
| `impress-past` | Step wird verlassen | Step wurde besucht |
| `impress-active` | Step ist aktuell | Entspricht `impress-present` für Opacity |

### 6.2 Demo-spezifische Animationen

Für die Reproduktion der impress.js-Demo werden folgende CSS-Animationen benötigt:

#### Slide "ing" (positioning, rotating, scaling):

```css
/* Wörter animieren sich wenn Step present wird */
.impress-step[data-slide-id="ing"] .positioning,
.impress-step[data-slide-id="ing"] .rotating,
.impress-step[data-slide-id="ing"] .scaling {
  display: inline-block;
  transition: 0.5s;
}

.impress-step[data-slide-id="ing"].impress-present .positioning {
  transform: translateY(-10px);
}

.impress-step[data-slide-id="ing"].impress-present .rotating {
  transform: rotate(-10deg);
  transition-delay: 0.25s;
}

.impress-step[data-slide-id="ing"].impress-present .scaling {
  transform: scale(0.7);
  transition-delay: 0.5s;
}
```

#### Slide "its-in-3d" (3D-Typografie):

```css
/* Wörter auf verschiedenen Z-Ebenen */
.impress-step[data-slide-id="its-in-3d"] p {
  transform-style: preserve-3d;
}

.impress-step[data-slide-id="its-in-3d"] span,
.impress-step[data-slide-id="its-in-3d"] b {
  display: inline-block;
  transition: 0.5s;
}

.impress-step[data-slide-id="its-in-3d"] .have    { transform: translateZ(-40px); }
.impress-step[data-slide-id="its-in-3d"] .you     { transform: translateZ(20px); }
.impress-step[data-slide-id="its-in-3d"] .noticed { transform: translateZ(-40px); }
.impress-step[data-slide-id="its-in-3d"] .its     { transform: translateZ(60px); }
.impress-step[data-slide-id="its-in-3d"] .in      { transform: translateZ(-10px); }

/* Alle auf Z=0 wenn present */
.impress-step[data-slide-id="its-in-3d"].impress-present span,
.impress-step[data-slide-id="its-in-3d"].impress-present b {
  transform: translateZ(0px);
}
```

#### Slide "title" (Parallax-Titel):

```css
.impress-step[data-slide-id="title"] .try {
  font-size: 64px;
  position: absolute;
  top: -0.5em;
  left: 1.5em;
  transform: translateZ(20px);
}

.impress-step[data-slide-id="title"] h1 {
  font-size: 190px;
  transform: translateZ(50px);
}
```

---

## 7. Slide-Map: impress.js Demo -> Slidev Frontmatter

Exaktes Mapping aller 13 Steps der impress.js-Demo:

### Slide 1: "bored" (klassische Slide)
```yaml
impressX: -1000
impressY: -1500
impressClass: slide
```
**Inhalt:** "Aren't you just **bored** with all those slides-based presentations?"
**Transition:** Initial -- kein Kameraflug

### Slide 2: step-2 (klassische Slide)
```yaml
impressX: 0
impressY: -1500
impressClass: slide
```
**Inhalt:** "Don't you think that presentations given **in modern browsers** shouldn't **copy the limits** of 'classic' slide decks?"
**Transition:** Horizontaler Pan (+1000px X)

### Slide 3: step-3 (klassische Slide)
```yaml
impressX: 1000
impressY: -1500
impressClass: slide
```
**Inhalt:** "Would you like to **impress your audience** with **stunning visualization** of your talk?"
**Transition:** Horizontaler Pan (+1000px X)

### Slide 4: "title" (Zoom-Out Titel)
```yaml
impressX: 0
impressY: 0
impressScale: 4
```
**Inhalt:** "then you should try" / "impress.js*" / "* no rhyme intended"
**Transition:** Kamera zieht auf 4x zurück, zentriert sich. Dramatischer Zoom-Out.
**Spezial:** Title-Text mit translateZ(20px/50px) Parallax-Effekt

### Slide 5: "its" (Pan + Rotate + Zoom)
```yaml
impressX: 850
impressY: 3000
impressRotate: 90
impressScale: 5
```
**Inhalt:** "It's a **presentation tool** inspired by the idea behind prezi.com..."
**Transition:** Pan weit nach unten-rechts, 90-Grad-Drehung, Zoom auf 5x

### Slide 6: "big" (180-Grad-Drehung)
```yaml
impressX: 3500
impressY: 2100
impressRotate: 180
impressScale: 6
```
**Inhalt:** "visualize your **big** thoughts"
**Transition:** Pan, 180-Grad-Rotation, Zoom auf 6x. "big" in 250px.
**Spezial:** Wort "big" riesig (250px), zentriert

### Slide 7: "tiny" (Z-Achsen-Tauchgang)
```yaml
impressX: 2825
impressY: 2325
impressZ: -3000
impressRotate: 300
impressScale: 1
```
**Inhalt:** "and **tiny** ideas"
**Transition:** Kamera taucht 3000px in den Bildschirm. Vertiginöser 3D-Effekt.
**Spezial:** Starker Kontrast zu "big" -- scale zurück auf 1

### Slide 8: "ing" (Animierte Wörter)
```yaml
impressX: 3500
impressY: -850
impressZ: 0
impressRotate: 270
impressScale: 6
```
**Inhalt:** "by **positioning**, **rotating** and **scaling** them on an infinite canvas"
**Transition:** Zurück aus Z-Tiefe, 270-Grad-Rotation
**Spezial:** Wort "positioning" verschiebt sich nach oben, "rotating" dreht sich, "scaling" skaliert herunter -- alles verzögert

### Slide 9: "imagination"
```yaml
impressX: 6700
impressY: -300
impressScale: 6
```
**Inhalt:** "the only **limit** is your **imagination**"
**Transition:** Großer Pan nach rechts, keine Rotation
**Spezial:** "imagination" in 78px

### Slide 10: "source" (Use the Source, Luke!)
```yaml
impressX: 6300
impressY: 2000
impressRotate: 20
impressScale: 4
```
**Inhalt:** "want to know more?" / "use the source, Luke!"
**Transition:** Leichte 20-Grad-Rotation

### Slide 11: "one-more-thing"
```yaml
impressX: 6000
impressY: 4000
impressScale: 2
```
**Inhalt:** "one more thing..."
**Transition:** Pan nach unten

### Slide 12: "its-in-3d" (Volle 3D-Power)
```yaml
impressX: 6200
impressY: 4300
impressZ: -100
impressRotateX: -40
impressRotateY: 10
impressScale: 2
```
**Inhalt:** "have you noticed it's in **3D***?" / "* beat that, prezi ;)"
**Transition:** Multi-Achsen 3D-Rotation (X: -40, Y: 10)
**Spezial:** Individuelle Wörter auf verschiedenen Z-Tiefen (-40, +20, -40, +60, -10px), kollabieren zu Z=0 wenn present

### Slide 13: "overview" (Vogelperspektive)
```yaml
impressX: 3000
impressY: 1500
impressZ: 0
impressScale: 10
```
**Inhalt:** (leer)
**Transition:** Enormer Zoom-Out auf 10x, zeigt gesamten Canvas
**Spezial:** Alle Steps werden sichtbar mit opacity: 1

---

## 8. Keyboard-Navigation

| Taste | Aktion |
|-------|--------|
| `Space`, `ArrowRight`, `ArrowDown`, `PageDown` | Nächster Step |
| `ArrowLeft`, `ArrowUp`, `PageUp` | Vorheriger Step |
| `Home` | Erster Step |
| `End` | Letzter Step |
| `Tab` | Nächster Step (prevent default scroll) |

---

## 9. Integration mit Slidev

### 9.1 Zusammenspiel mit useNav()

```typescript
import { useNav } from '@slidev/client'

const { currentPage, go, next, prev, slides } = useNav()

// Slides-Frontmatter auslesen
const impressSteps = computed(() => {
  return slides.value.map(slide => ({
    translate: {
      x: slide.frontmatter?.impressX ?? 0,
      y: slide.frontmatter?.impressY ?? 0,
      z: slide.frontmatter?.impressZ ?? 0,
    },
    rotate: {
      x: slide.frontmatter?.impressRotateX ?? 0,
      y: slide.frontmatter?.impressRotateY ?? 0,
      z: slide.frontmatter?.impressRotate ?? slide.frontmatter?.impressRotateZ ?? 0,
      order: slide.frontmatter?.impressRotateOrder ?? 'xyz',
    },
    scale: slide.frontmatter?.impressScale ?? 1,
    transitionDuration: slide.frontmatter?.impressTransitionDuration,
    cssClass: slide.frontmatter?.impressClass ?? '',
  }))
})

// Bei Seitennavigation Kamera bewegen
watch(currentPage, (page) => {
  gotoStep(page - 1)
})
```

### 9.2 Rendering-Strategie

**Problem:** Slidev rendert nur aktuelle + benachbarte Slides.
**Lösung:** `global-top.vue` rendert ALLE Slides gleichzeitig in eigenen Containern.

```vue
<!-- global-top.vue -->
<template>
  <ImpressCanvas v-if="impressEnabled" />
</template>
```

### 9.3 Kompatibilität

| Feature | Kompatibilität |
|---------|---------------|
| Theme-Styling | Voll -- Addon ist Theme-unabhängig |
| v-click | Funktioniert innerhalb einzelner Steps |
| Presenter Mode | Fallback auf Standard-Rendering |
| PDF Export | Fallback auf Standard-Rendering |
| Overview | Eigener Overview-Step (scale=10) |
| Keyboard-Navigation | Übernimmt Slidevs Tastatur-Handler |

---

## 10. Performance-Überlegungen

| Aspekt | Strategie |
|--------|-----------|
| DOM-Größe | Alle Slides im DOM, aber nur sichtbare mit vollem Rendering |
| GPU-Nutzung | CSS `will-change: transform` auf Canvas/Root |
| Transition-Timing | `setTimeout` für stepenter Event (wie Original) |
| Reflow-Vermeidung | Nur `transform` und `opacity` animieren (GPU-composited) |

---

## 11. Spezifikation der Demo-Präsentation

Die Datei `slidev-impress.md` reproduziert die impress.js-Demo mit:
- Theme: `theme-mgm`
- 13 Slides mit exakten Koordinaten aus der Original-Demo
- Identische Inhalte (Texte, Typografie)
- Slide-interne CSS-Animationen für "ing" und "its-in-3d"
- Overview-Slide als letzter Step
- Background: radial-gradient (grau, wie Original)

---

## Quellen

- impress.js Quellcode: `src/impress.js` -- Kamera-Algorithmus, Transform-Berechnung
- impress.js Demo: `index.html` -- Step-Koordinaten, CSS-Klassen
- impress.js CSS: `css/impress-demo.css` -- Styling der Demo-Steps
- Slidev Addon Docs: https://sli.dev/guide/write-addon
- Slidev useNav: https://sli.dev/guide/global-context
- Slidev Global Layers: https://sli.dev/features/global-layers
- Erste Analyse: `_NOTES/impress-Erste-Analyse.md`
