## Bericht: So erstellst du ein Custom Theme für **shadcn/ui** (Farben, Fonts, Radius, Spacing, …)

### 1) Grundprinzip: Was ist „Theming“ bei shadcn/ui?

**shadcn/ui** ist kein „fertiges CSS-Theme“, sondern eine Sammlung von Komponenten, die du **in dein Projekt kopierst** und die dann über **Tailwind CSS + Design Tokens** gestylt werden. Das Theming passiert vor allem über:

1. **Semantische CSS-Variablen** (Design Tokens) in deiner globalen CSS-Datei (z. B. `src/index.css`)
2. **Tailwind Utilities**, die diese Variablen konsumieren (`bg-background`, `text-foreground`, `bg-primary`, …)
3. Optional: **Komponenten-spezifische Klassen/Varianten** (z. B. `Button`-Sizes mit `px-4 py-2`, `rounded-md`, …)

In den offiziellen shadcn/ui Docs kannst du wählen zwischen:

* **CSS Variables (empfohlen)** und
* **Utility Classes (nicht empfohlen für echte Themes, eher für simple Overrides)**.

---

### 2) Projekt-Setup: Welche Dateien sind relevant?

#### 2.1 `components.json` – Theming-Modus festlegen

Damit shadcn/ui weiß, dass du mit CSS-Variablen themen willst, muss in deiner `components.json` Folgendes aktiv sein:

* `tailwind.cssVariables: true`
* `tailwind.css`: Pfad zu deiner globalen CSS Datei (z. B. `src/index.css`)

Beispiel (sinngemäß, wichtig sind die Felder `cssVariables`, `css`, `baseColor`):

```json
{
  "style": "new-york",
  "tailwind": {
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true
  }
}
```

> **Merke:** `baseColor` beeinflusst, welche „Basis-Neutralpalette“ die CLI/Theme-Templates anfangs nutzen. Dein echtes Custom Theme definierst du danach über die Variablen in `index.css`.

---

#### 2.2 `src/index.css` – Dein Theme-Zentrum

In shadcn/ui + Tailwind v4 ist das typische Muster:

* `:root { … }` definiert **Light Theme Tokens**
* `.dark { … }` definiert **Dark Theme Tokens** (Overrides)
* `@theme inline { … }` **mappt** deine semantischen Tokens auf Tailwind-Theme-Namespaces (z. B. `--color-primary`) und erzeugt damit die passenden Utility-Klassen.

Ein typisches Layout (gekürzt und kommentiert):

```css
@import "tailwindcss";
/* optional in shadcn-Setups: */
@import "tw-animate-css";

/* Tailwind v4: Dark-Variant an .dark koppeln (class-based dark mode) */
@custom-variant dark (&:is(.dark *));

/* 1) Mapping: semantische Tokens -> Tailwind Theme Variablen */
@theme inline {
  /* Radius-System (siehe Abschnitt 5) */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);

  /* Farben (Beispiele; in echten Projekten ist das umfangreicher) */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
}

/* 2) Light Theme */
:root {
  --radius: 0.625rem;

  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);

  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);

  --border: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
}

/* 3) Dark Theme */
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);

  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);

  --border: oklch(1 0 0 / 10%);
  --ring: oklch(0.556 0 0);
}

/* 4) Base Styles, die überall gelten */
@layer base {
  body {
    @apply bg-background text-foreground;
  }
}
```

Dieses Muster entspricht der „CSS-Variable-first“-Architektur bei shadcn/ui (u. a. mit semantischen Variablen und Radius-Mapping).

---

## 3) Farben anpassen (detailliert)

### 3.1 Welche Farb-Tokens gibt es?

shadcn/ui gibt dir eine definierte Liste an Tokens, die du im Theme verändern kannst – u. a.:

* **Grundflächen**: `--background`, `--foreground`
* **Container**: `--card`, `--popover` + jeweils `-foreground`
* **Interaktionen**: `--primary`, `--secondary`, `--accent` + jeweils `-foreground`
* **Zustände**: `--destructive` (und i. d. R. `--destructive-foreground` je nach Setup)
* **UI-Struktur**: `--border`, `--input`, `--ring`
* **Charts**: `--chart-1 … --chart-5`
* **Sidebar**: `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, …

> Du änderst diese Werte in `:root` (Light) und `.dark` (Dark).

---

### 3.2 Die „Background/Foreground“-Konvention verstehen

shadcn/ui nutzt konsequent ein Paar-System:

* Hintergrundtoken: `--primary`
* passender Text/Icon-Token: `--primary-foreground`

Damit kannst du in Komponenten extrem konsistent arbeiten, z. B.:

```jsx
<div className="bg-primary text-primary-foreground">Hello</div>
```

Diese Konvention ist ausdrücklich dokumentiert.

---

### 3.3 Vorgehensweise: Ein eigenes Farb-Theme bauen (Schritt-für-Schritt)

#### Schritt A: Brand-Farben festlegen

Definiere zuerst (außerhalb von Code) mindestens:

* **Brand Primary** (CTA-Buttons, Links)
* **Neutrals** (Background/Foreground/Border)
* **Semantic States** (Destructive, ggf. Success/Warning/Info)
* Optional: **Accent** (Highlights, Hover-Flächen)

#### Schritt B: Tokens im Light Theme setzen (`:root`)

Du trägst deine Werte in `:root` ein. shadcn/ui verwendet in den Docs **OKLCH**-Werte (z. B. `oklch(0.205 0 0)`), was gut zur modernen Tailwind v4 Farblogik passt.

#### Schritt C: Dark Theme Gegenstücke setzen (`.dark`)

Für Dark Mode überschreibst du dieselben Tokens in `.dark`.

#### Schritt D: Mapping prüfen (`@theme inline`)

Wenn du die Standard-Tokens nutzt, ist das Mapping normalerweise bereits vorhanden (siehe oben). Wenn du **neue** Tokens einführst, musst du sie im `@theme inline` Bereich **zusätzlich mappen** – sonst existieren die entsprechenden Utility-Klassen nicht.

---

### 3.4 Neue semantische Farben hinzufügen (z. B. `warning`)

Offizielles Vorgehen:

1. Neue Variablen unter `:root` und `.dark` definieren
2. Dann im `@theme inline` Block als `--color-*` verfügbar machen
3. Danach kannst du `bg-warning`, `text-warning-foreground` nutzen

Beispiel (aus dem offiziellen Muster, leicht gekürzt):

```css
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}

.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}

@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

Dann im UI:

```jsx
<div className="bg-warning text-warning-foreground" />
```

Genau so ist es in der shadcn/ui Theming-Doku beschrieben.

---

### 3.5 Theme-Generatoren (optional, praktisch)

Wenn du schnell „stimmige“ Token-Sets erzeugen willst, gibt es Tools, die speziell shadcn/ui Themes generieren/anpassen (z. B. Theme Generator oder TweakCN).

---

## 4) Fonts anpassen (detailliert)

Bei shadcn/ui hängt die Typografie in der Praxis an:

* **Wie du Fonts lädst** (Next.js: `next/font`, oder klassisch via CSS)
* **Wie Tailwind die Font-Families kennt** (`--font-*` Theme Variables)
* **Wie du sie global anwendest** (z. B. `body { @apply font-sans; }`)

### 4.1 Tailwind v4: Fonts sind Theme-Variablen (`--font-*`)

Tailwind v4 arbeitet mit Theme Variables. Für Fonts ist der relevante Namespace `--font-*`, der wiederum Utility-Klassen wie `font-sans`, `font-mono`, oder eigene wie `font-brand` erzeugt.

---

### 4.2 Next.js (typisch bei shadcn): Fonts mit `next/font` laden

`next/font` lädt Fonts lokal optimiert und lässt dich sie über `className` oder über eine **CSS Variable** nutzen.

**Beispiel: zwei Fonts, als CSS-Variablen exportiert** (`app/layout.tsx`):

```tsx
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

`variable` ist ein offizieller Parameter in der Next.js Font API.

---

### 4.3 Tailwind „auf die Next.js Font-Variablen zeigen lassen“

Jetzt willst du, dass `font-sans` wirklich deinen Inter nutzt. Dafür setzt du in deiner `index.css`:

* `--font-sans: var(--font-inter);`
* `--font-mono: var(--font-mono);`

**Wichtig:** Wenn du Theme-Variablen auf andere CSS Variablen referenzieren lässt, empfiehlt Tailwind das `inline`-Flag, damit die Utilities direkt auf den Zielwert zeigen (und du keine „CSS Variable Resolution“-Fallen bekommst).

Beispiel:

```css
@theme inline {
  --font-sans: var(--font-inter);
  --font-mono: var(--font-mono);
}

@layer base {
  body {
    @apply font-sans;
  }
}
```

---

### 4.4 Headline-Font vs. Body-Font (empfohlenes Pattern)

Statt alles über `font-sans` zu steuern, ist für Design-Systeme oft sinnvoll:

* `--font-body` (Fließtext)
* `--font-heading` (Überschriften)

In Tailwind v4 kannst du dafür eigene `--font-*` Tokens anlegen; dann existiert automatisch z. B. `font-heading`.

---

### 4.5 (Optional) Typografie-Skala (Textgrößen, Weights)

Wenn du nicht nur Font-Familien, sondern auch **Textgrößen/Weights/Tracking/Leading** systematisch themen willst:

* `--text-*` → `text-*` Utilities
* `--font-weight-*` → `font-*` Utilities
* `--tracking-*` / `--leading-*` → `tracking-*` / `leading-*`

Das ist nicht „shadcn-spezifisch“, aber sehr gut kombinierbar für ein konsistentes UI-System.

---

## 5) Rundungen (Border Radius) anpassen

### 5.1 Globaler Basis-Radius: `--radius`

shadcn/ui listet `--radius` als zentralen Token für Rundungen.

Wenn du z. B. mehr „soft UI“ willst:

```css
:root { --radius: 0.9rem; }
```

Wenn du eher „sharp“ willst:

```css
:root { --radius: 0.25rem; }
```

---

### 5.2 Warum das überall wirkt: Radius-Mapping via `@theme inline`

In modernen shadcn Setups wird aus einem Basiswert ein System abgeleitet:

* `--radius-sm`
* `--radius-md`
* `--radius-lg`
* `--radius-xl`

… und diese werden aus `--radius` berechnet.

Tailwind erzeugt Radius-Utilities über den Namespace `--radius-*` (z. B. `rounded-sm`, `rounded-md`, …).

**Konsequenz:** Du änderst **einen** Wert (`--radius`) und bekommst konsistente Rundungen in Buttons, Inputs, Cards, etc.

---

### 5.3 Komponenten-spezifisch: „Buttons pill-shaped, Rest normal“

Manchmal willst du z. B. nur Buttons „pillenförmig“, aber Cards weiterhin `rounded-lg`.

Das machst du **nicht** über `--radius`, sondern direkt in der Komponente, z. B. in `components/ui/button.tsx`:

* `rounded-md` → `rounded-full`
* oder eine neue Variante: `shape: { default: "rounded-md", pill: "rounded-full" }`

Viele shadcn Komponenten nutzen dafür `cva(...)` Variants; im Button ist z. B. ein `size`-Variant mit Klassen wie `h-10 px-4 py-2` etc. dokumentiert.

---

## 6) Abstände (Margins, Paddings, Gaps) anpassen

Hier gibt es zwei „Ebenen“:

1. **Design-System Ebene (Tokens/Scale):** Welche Abstände existieren überhaupt als Utilities?
2. **Komponenten Ebene:** Welche Abstände nutzen Buttons, Inputs, Cards standardmäßig?

### 6.1 Tailwind v4: Spacing kommt aus `--spacing-*`

Tailwind definiert Spacing als Theme Variables im Namespace `--spacing-*`. Daraus entstehen Utilities wie:

* `p-*`, `px-*`, `py-*`
* `m-*`, `gap-*`
* auch Sizing wie `w-*`, `h-*`, `max-w-*`, etc.

#### Neue Spacing-Tokens hinzufügen (z. B. „gutter“)

Wenn du Design Tokens willst wie „Seitenrand = 24px“, kannst du einen Token definieren (Tailwind v4 Style):

```css
@theme {
  --spacing-gutter: 1.5rem; /* 24px */
}
```

Dann kannst du im Layout:

* `px-gutter`
* `gap-gutter`
* `mt-gutter`

verwenden (weil `--spacing-*` auf entsprechende Utilities gemappt wird).

> **Hinweis:** Das ist mächtig, aber übertreib es nicht: Zu viele „Sonderabstände“ machen das System unübersichtlich. Meist reichen 1–3 semantische Layout-Spacings zusätzlich zur Standard-Skala.

---

### 6.2 Komponenten-Abstände: Buttons, Inputs & Co. direkt anpassen

Sehr oft willst du z. B.:

* Buttons etwas höher/niedriger
* mehr/weniger Horizontal-Padding
* Inputs kompakter

Das passiert **in der jeweiligen Komponente** über die Klassenstrings. Beispiel Button-Sizes (aus einem shadcn Setup):

* `default: "h-10 px-4 py-2"`
* `sm: "h-9 … px-3"`
* `lg: "h-11 … px-8"`

Wenn du also global „kleinere“ Buttons willst, ist der sauberste Weg:

* In `components/ui/button.tsx` die `size`-Variants anpassen
* ggf. auch `text-sm` → `text-[13px]` etc (wenn du eine feinere Typo-Skala willst)

---

### 6.3 Layout-Spacings konsistent halten

Best Practice:

* Definiere 1–2 semantische Layout Tokens (z. B. `gutter`, `section`)
* Nutze diese in Seiten-Layouts und großen Containern
* Nutze für Komponenten weiterhin die Standard-Skala (`p-2`, `p-4`, …) oder kontrollierte Variants in den shadcn Komponenten

So bleibt dein Design-System „konsistent und lesbar“.

---

## 7) Weitere sinnvolle Theme-Anpassungen („usw.“)

### 7.1 Borders, Inputs, Focus-Ring

shadcn/ui stellt dafür Tokens bereit:

* `--border`
* `--input`
* `--ring`

In modernen Setups wird das global angewandt (z. B. `border-border`, `outline-ring/50`).

**Praxis-Tipp:** Wenn sich dein Theme „nicht crisp“ anfühlt, liegt es oft an:

* zu niedrigem Kontrast bei `--border`
* unpassendem `--ring` (Focus wirkt zu schwach oder zu aggressiv)

---

### 7.2 Shadows

Tailwind v4 kann Shadows ebenfalls über Theme Variables steuern (`--shadow-*`).
Wenn du also ein „flaches“ Theme willst, reduzierst du Shadows global; bei „floating UI“ erhöhst du sie.

---

### 7.3 Animationen / Motion

Tailwind kann Animationen über `--animate-*` Theme Variables definieren (inkl. `@keyframes` im `@theme` Block).
In shadcn Setups taucht außerdem häufig `tw-animate-css` als Import auf.

---

### 7.4 Charts & Sidebar Tokens

Wenn du Charts oder Sidebar-Komponenten nutzt, sind separate Tokens vorhanden:

* Charts: `--chart-1 … --chart-5`
* Sidebar: `--sidebar`, `--sidebar-primary`, `--sidebar-accent`, etc.

Damit kannst du z. B. ein Brand-Theme bauen, in dem die Sidebar stärker „brand“ ist als der Content.

---

## 8) Dark Mode & Theme Switching (konkret)

### 8.1 CSS-Ebene: `.dark` überschreibt Tokens

Du definierst im `.dark` Block deine Dark-Werte.

### 8.2 Next.js-Ebene: `next-themes` (Standard bei shadcn)

Die shadcn Docs zeigen für Next.js:

* `next-themes` installieren
* `ThemeProvider` im Root Layout verwenden
* `attribute="class"` nutzen → dadurch wird `.dark` als Klasse gesetzt

Das ist der „klassische“ Weg, damit deine `.dark { … }` Tokens aktiv werden.

---

## 9) Checkliste: So gehst du sauber vor

1. **`components.json` prüfen:** `tailwind.cssVariables: true` + korrekter Pfad zu `globals.css`
2. **`globals.css` aufräumen:**

   * Tokens in `:root` (Light) und `.dark` (Dark)
   * Mapping in `@theme inline` (damit Klassen wie `bg-primary` existieren)
3. **Farben setzen:** Background/Foreground, Primary, Secondary, Border, Ring – erst dann Feintuning
4. **Fonts setzen:** `next/font` + `@theme inline` Mapping für `--font-sans`
5. **Radius setzen:** `--radius` ändern und UI prüfen
6. **Spacing entscheiden:**

   * Layout Tokens als `--spacing-*` ergänzen
   * Component-Spacing in Komponentenvarianten (z. B. Button sizes) anpassen
7. **Testen:** Buttons, Inputs, Dialogs, Hover/Focus/Disabled, Dark Mode

---

## 10) Troubleshooting (die häufigsten Fehler)

* **`bg-warning` funktioniert nicht:**
  Du hast zwar `--warning` gesetzt, aber **nicht** `--color-warning` im `@theme inline` gemappt → Tailwind generiert dann keine `bg-warning` Utility.

* **Dark Mode tut nichts:**
  `.dark` wird nicht auf dem Root gesetzt (oder Dark Variant ist nicht korrekt konfiguriert). In Next.js ist `next-themes` mit `attribute="class"` der Standardweg.

* **Fonts werden nicht global übernommen:**
  Du hast die Font geladen, aber nicht auf Root angewandt (`<html className=…>`) oder Tailwind zeigt noch auf `--font-sans` Default. `@theme inline { --font-sans: var(--font-inter); }` ist der saubere Fix.

---

## Kurz zu Tailwind v3 (falls dein Projekt älter ist)

Die aktuellen shadcn/ui Docs auf `ui.shadcn.com` sind für Tailwind v4; für ältere Setups gibt es explizit **Legacy Docs**.
Wenn du mir sagst, ob dein Projekt Tailwind v3 oder v4 nutzt (erkennbar u. a. an `@theme` in CSS), kann ich dir das Vorgehen exakt auf deine Projektstruktur zuschneiden – aber mit dem obigen Vorgehen bist du für **Tailwind v4 + shadcn/ui** bereits „richtig“ unterwegs.
