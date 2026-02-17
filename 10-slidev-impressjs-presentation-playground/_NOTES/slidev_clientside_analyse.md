# Slidev Light: Client-seitige Version - Analyse

## Was Slidev server-seitig macht

| Funktion | Server-Abhängigkeit | Client-Ersatz möglich? |
|---|---|---|
| Markdown → Slides parsen | Vite Plugin (`@slidev/cli`) | Ja, markdown-it im Browser |
| Frontmatter parsen | gray-matter (Node) | Ja, gray-matter funktioniert auch im Browser |
| Vue SFC Kompilierung (Layouts) | Vite + `@vitejs/plugin-vue` | Ja, `@vue/compiler-sfc` im Browser (aber teuer ~200KB) |
| UnoCSS / Windi CSS | Vite Plugin | Teilweise, UnoCSS hat einen Runtime-Modus |
| Shiki Code-Highlighting | Node (WASM) | Ja, Shiki funktioniert im Browser (WASM) |
| HMR / Live Reload | Vite WebSocket | Entfällt (kein Dev-Server) |
| Monaco Editor | Client-seitig | Ja |
| PDF Export | Playwright (headless Chrome) | Nein - bräuchte Server oder `window.print()` |
| Presenter Mode | Broadcast Channel | Ja, rein client-seitig |
| Vue Components in Slides | Vite Kompilierung | Eingeschränkt |

## Machbar: Core-Features

- **Markdown → Slides** mit Frontmatter, Headings, Bilder, Listen
- **Layouts** (wenn vorcompiliert oder als JS-Bundle mitgeliefert)
- **Themes** (CSS + vorcompilierte Vue-Komponenten)
- **Code-Highlighting** via Shiki WASM
- **Slide-Navigation**, Keyboard, Touch
- **Animations / Transitions** (CSS-basiert)
- **Impress-Addon** (rein client-seitig, funktioniert jetzt schon)
- **Presenter Mode** via BroadcastChannel

## Nicht/schwer machbar

- **Beliebige Vue-Komponenten in Slides** (`<script setup>` in .md) - bräuchte Runtime-Compiler
- **UnoCSS Utilities** (Tailwind-artige Klassen) - nur mit Runtime-Engine, Performance-Hit
- **Vite Plugins** (z.B. für Mermaid, KaTeX) - müssten als Browser-Bundles portiert werden
- **PDF Export** - kein Playwright im Browser
- **Custom Addons** die Node-APIs nutzen

## Architektur-Vorschlag

```
Browser-only Slidev Light
├── Markdown Parser (markdown-it + frontmatter)
├── Slide Splitter (--- Separator)
├── Pre-built Theme Bundle (Vue-Komponenten als JS)
├── Pre-built Layout Bundle (default, title, section, v-split...)
├── Shiki WASM (Code-Highlighting)
├── CSS (Theme-Styles, statisch)
├── Impress Engine (bereits client-only)
└── Navigation + Presenter Mode
```

## Aufwand & Einschätzung

| Ansatz | Aufwand | Ergebnis |
|---|---|---|
| **A: Vorcompilierter Viewer** - Vite baut einmal, Ergebnis ist statisches JS das .md zur Laufzeit lädt | Mittel (~2-3 Wochen) | 90% der Features, kein Dev-Server nötig |
| **B: Voller Browser-Compiler** - Vue SFC + UnoCSS Runtime im Browser | Hoch (~6-8 Wochen) | ~95% der Features, aber großes Bundle (~1MB+) |
| **C: React-Neuentwicklung** | Sehr hoch | Kein Vorteil ggü. Vue, verliert Slidev-Ökosystem |

## Empfehlung

**Ansatz A** - Slidev als Build-Tool nutzen, das ein statisches Bundle erzeugt, das zur Laufzeit beliebige .md-Dateien rendern kann. Die Layouts und Themes werden vorcompiliert, nur das Markdown-Parsing passiert im Browser. Das wäre auch die Basis für einen .md-File-Switcher ohne Server-Restart.
