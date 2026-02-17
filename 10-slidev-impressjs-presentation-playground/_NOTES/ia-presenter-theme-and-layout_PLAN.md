# Implementierungsplan: iA Presenter → Slidev Theme & Layouts

## Referenzen

- Spezifikation: `_NOTES/ia-presenter-theme-and-layout.md`
- Quellpräsentation: `_NOTES/theme-ia-presenter/index.html`
- Zielpräsentation: `slidev-ia-presenter.md`
- Theme-Verzeichnis: `theme-ia-presenter/` (im Projektroot)

---

## Phase 1: Grundgerüst & Minimaler Proof of Concept

**Ziel**: Slidev startet mit eigenem Theme, zeigt eine einzelne Folie mit korrekter Hintergrundfarbe und weißem Text.

### Schritt 1.1: Theme-Verzeichnisstruktur anlegen

Erstelle die Verzeichnisstruktur:
```
theme-ia-presenter/
  layouts/
  styles/
  public/
    fonts/
    images/
  package.json
```

`package.json`:
```json
{
  "name": "slidev-theme-ia-presenter",
  "version": "1.0.0",
  "engines": {
    "slidev": ">=0.47.0"
  },
  "slidev": {
    "colorSchema": "light",
    "defaults": {
      "fonts": {
        "provider": "none",
        "sans": "Inter",
        "local": "Inter"
      }
    }
  }
}
```

### Schritt 1.2: Assets kopieren

- `_NOTES/theme-ia-presenter/theme/fonts/*.woff2` → `theme-ia-presenter/public/fonts/`
- `_NOTES/theme-ia-presenter/theme/mgm-logo-white.svg` → `theme-ia-presenter/public/mgm-logo-white.svg`
- `_NOTES/theme-ia-presenter/theme/mgm-color-bar.svg` → `theme-ia-presenter/public/mgm-color-bar.svg`
- `_NOTES/theme-ia-presenter/theme/image*.webp` → `theme-ia-presenter/public/images/`
- `_NOTES/theme-ia-presenter/media/image*.webp` → `theme-ia-presenter/public/images/media/`

### Schritt 1.3: Globale Styles anlegen

`theme-ia-presenter/styles/index.ts`:
```ts
import './layouts.css'
```

`theme-ia-presenter/styles/layouts.css`:
- Alle 12 `@font-face`-Deklarationen für Inter (400-900, normal+italic)
- CSS-Custom-Properties auf `:root` (Farben, Schriftart)
- Basis `.slidev-layout`-Styling: weiße Schrift, Inter-Font, Padding
- Heading-Gewichte: h1=900, h2=800, h3/h4=700, h5/h6=600
- `text-wrap: balance` für h1, h2
- Slidev-eigene Navigation/UI ausblenden oder anpassen (damit sie auf buntem Hintergrund sichtbar bleibt)

### Schritt 1.4: Erstes Layout `default.vue` erstellen

`theme-ia-presenter/layouts/default.vue`:
- Props: `background` (String, Default: `'#00A8FF'`)
- Template: Äußerer Container mit `background-color` aus Prop, volle Slide-Höhe
- Default-Slot für Markdown-Inhalte
- Klasse `slidev-layout ia-default` für CSS-Targeting
- Flexbox/Grid mit vertikaler Zentrierung, links ausgerichtet

### Schritt 1.5: Minimale Präsentation `slidev-ia-presenter.md`

Erste Folie anlegen:
```yaml
---
theme: ./theme-ia-presenter
title: Instant Slides
colorSchema: light
fonts:
  provider: none
  sans: Inter
  local: Inter
---

##### Fast and Focused

# Instant Slides

Getting Started with iA Presenter
```

### Schritt 1.6: Slidev-Server starten & testen

```bash
(sleep 999999 | npx slidev slidev-ia-presenter.md --no-open) > /tmp/slidev-ia-output.log 2>&1 &
```

### --- BROWSER-CHECK 1 ---

**Prüfpunkte**:
- [ ] Slidev startet fehlerfrei (Port aus Log prüfen)
- [ ] Slide 1 hat Hintergrundfarbe `#00A8FF` (Cyan-Blau)
- [ ] Text ist weiß (#ffffff)
- [ ] Inter-Schrift wird korrekt geladen (h1 in Black-Gewicht, h5 in SemiBold)
- [ ] "Fast and Focused" erscheint als kleinerer Heading über "Instant Slides"
- [ ] Layout: Text links ausgerichtet, vertikal zentriert
- [ ] Keine Fehlermeldungen in der Browser-Console

---

## Phase 2: Branding-Layer (Logo & Color Bar)

**Ziel**: mgm-Logo oben rechts und Farbbalken unten links erscheinen auf jeder Folie.

### Schritt 2.1: `global-bottom.vue` erstellen

`theme-ia-presenter/global-bottom.vue`:
- Template: Container mit `<img>` für Logo und Color Bar
- Logo: `position: absolute`, oben rechts, ca. 60px breit
- Color Bar: `position: absolute`, unten links, ca. 100px breit
- Z-Index über Content aber unter Slidev-UI

### Schritt 2.2: Zweite Folie hinzufügen

Folie 2 (Table of Contents) zu `slidev-ia-presenter.md` hinzufügen, um zu verifizieren, dass Branding auf beiden Folien erscheint:
```yaml
---
layout: default
background: '#137AFF'
---

### Table of Contents

1. Write
2. Structure
3. Iterate
4. Design
5. Action
```

### --- BROWSER-CHECK 2 ---

**Prüfpunkte**:
- [ ] mgm-Logo (weiß) sichtbar oben rechts auf Slide 1
- [ ] mgm-Logo (weiß) sichtbar oben rechts auf Slide 2
- [ ] mgm Color Bar sichtbar unten links auf Slide 1
- [ ] mgm Color Bar sichtbar unten links auf Slide 2
- [ ] Logo überlappt nicht mit dem Titel-Text
- [ ] Color Bar kollidiert nicht mit Footer-Bereich
- [ ] Hintergrundfarbe Slide 2 korrekt: `#137AFF`
- [ ] Geordnete Liste (1-5) wird korrekt angezeigt mit weißem Text

---

## Phase 3: Layout `title` (Kapitel-Divider)

**Ziel**: Zentrierter Kapiteltrennfolien-Layout funktioniert.

### Schritt 3.1: `title.vue` Layout erstellen

`theme-ia-presenter/layouts/title.vue`:
- Props: `background` (String)
- Text horizontal und vertikal zentriert
- h2 in ExtraBold (800), mit optionalem Untertitel-Paragraph
- Volle Slide-Höhe, Flexbox center/center

### Schritt 3.2: Folien 3-4 hinzufügen

Slide 3 (title-Layout "1. Write") und Slide 4 (section-Layout als Fallback auf default vorerst):
```yaml
---
layout: title
background: '#264DFF'
---

## 1. Write

Start With a Script
```

### --- BROWSER-CHECK 3 ---

**Prüfpunkte**:
- [ ] Slide 3: Text "1. Write" zentriert (horizontal + vertikal)
- [ ] Slide 3: h2 hat font-weight 800
- [ ] Slide 3: Untertitel "Start With a Script" unter dem Heading, ebenfalls zentriert
- [ ] Slide 3: Hintergrundfarbe `#264DFF`
- [ ] Logo + Color Bar auch auf Slide 3 korrekt positioniert
- [ ] Übergang zwischen Slides 1→2→3 funktioniert (Pfeiltasten)

---

## Phase 4: Layout `section`

**Ziel**: Sections-Layout für Sub-Kapitel-Inhalte.

### Schritt 4.1: `section.vue` Layout erstellen

`theme-ia-presenter/layouts/section.vue`:
- Props: `background`
- Text links ausgerichtet, vertikal zentriert
- h3 in Bold (700), darunter Body-Text
- Ähnlich wie `default`, aber semantisch getrennt

### Schritt 4.2: Slide 4 einfügen

```yaml
---
layout: section
background: '#382CFF'
---

### Tell Your Story

The heart of a great presentation is the message. Get the script right before anything else.
```

### --- BROWSER-CHECK 4 ---

**Prüfpunkte**:
- [ ] Slide 4: h3 "Tell Your Story" linksbündig, vertikal zentriert
- [ ] Slide 4: Body-Text unterhalb des Headings
- [ ] Slide 4: Hintergrund `#382CFF`
- [ ] Visueller Unterschied zwischen `default` (Slide 1-2) und `section` (Slide 4) erkennbar
- [ ] `title`-Layout (Slide 3) deutlich anders (zentriert) als `section` (links)

---

## Phase 5: Layout `v-split` (Zwei-Spalten)

**Ziel**: Zwei-Spalten-Layout für Text+Text und Text+Bild Varianten.

### Schritt 5.1: `v-split.vue` Layout erstellen

`theme-ia-presenter/layouts/v-split.vue`:
- Props: `background`
- CSS Grid: `grid-template-columns: 1fr 1fr`, `gap: 2rem`
- Default-Slot = linke Spalte
- Named Slot `::right::` = rechte Spalte
- Beide Spalten vertikal zentriert (Flexbox column, justify-content: center)
- Bilder in rechter Spalte: `object-fit: cover`, volle Höhe

### Schritt 5.2: Slides 5-6 einfügen (Text+Text und Text+Bild)

Slide 5 — Text+Text Split:
```yaml
---
layout: v-split
background: '#4A13FF'
---

### Write it

Think about what you want to achieve. Then write it down like an email.

::right::

### Or Paste it

From DMs to articles, any existing text can become a presentation in no time.
```

Slide 6 — Text+Bild Split:
```yaml
---
layout: v-split
background: '#5C00FF'
---

### Use Placeholder Images

You will be tempted to add images while writing. Resist the temptation.

::right::

![placeholder](/images/image2.webp)
```

### --- BROWSER-CHECK 5 ---

**Prüfpunkte**:
- [ ] Slide 5: Zwei Textblöcke nebeneinander, gleichmäßig 50/50 aufgeteilt
- [ ] Slide 5: Links "Write it", rechts "Or Paste it"
- [ ] Slide 5: Beide Spalten vertikal zentriert
- [ ] Slide 6: Links Text, rechts Bild (image2.webp — SF-Straßenszene)
- [ ] Slide 6: Bild füllt die rechte Spalte sauber aus (object-fit: cover oder contain)
- [ ] Slide 6: Hintergrund `#5C00FF`
- [ ] Bilder werden korrekt aus `public/images/` geladen
- [ ] Logo + Color Bar weiterhin sichtbar auf beiden Slides

---

## Phase 6: Restliche Layouts (`grid`, `caption`, `title-and-columns`)

**Ziel**: Alle verbleibenden Layout-Typen implementieren.

### Schritt 6.1: `grid.vue` Layout erstellen

`theme-ia-presenter/layouts/grid.vue`:
- Props: `background`, `cols` (Number, Default: 3)
- CSS Grid: Dynamische Spalten (z.B. 3x2 für 6 Items)
- Default-Slot enthält alle Grid-Items
- Items werden abwechselnd verteilt (Bilder + Text-Blöcke)
- `gap: 1.5rem`, Items füllen ihre Zelle

### Schritt 6.2: `caption.vue` Layout erstellen

`theme-ia-presenter/layouts/caption.vue`:
- Props: `background`
- Zwei Bereiche: Bild (oberer Bereich, flex-grow) + Caption-Text (unterer Bereich)
- Named Slot `::image::` für das Bild
- Default-Slot für Caption-Text
- Bild: `object-fit: contain`, zentriert
- Caption: Links-aligned, kleinere Schrift, mit Padding

### Schritt 6.3: `title-and-columns.vue` Layout erstellen

`theme-ia-presenter/layouts/title-and-columns.vue`:
- Props: `background`
- Zwei Bereiche: Titel/Text oben, Spalten-Bereich unten
- Default-Slot für Titel-Bereich
- Named Slot `::columns::` für die Spalten
- Grid im Spalten-Bereich: `grid-template-columns: 1fr 1fr`

### Schritt 6.4: Test-Slides für neue Layouts

Slide 10 (Grid — 3x2 Mixed):
```yaml
---
layout: grid
background: '#AD00FF'
cols: 3
---

<!-- Alternating image + text blocks -->
```

Slide 18 (Caption):
```yaml
---
layout: caption
background: '#FF3A4D'
---

Auto-Layout, Built In: The design adjusts itself to any device.

::image::

![responsive](/images/responsive.png)
```

Slide 24 (Title-and-Columns):
```yaml
---
layout: title-and-columns
background: '#FFA800'
---

### Share and Export:

When you're done, share the presentation as a handout...

::columns::

<!-- Two images side by side -->
```

### --- BROWSER-CHECK 6 ---

**Prüfpunkte**:
- [ ] Grid-Layout: Items in 3-Spalten-Grid angeordnet
- [ ] Grid-Layout: Bilder und Textblöcke abwechselnd sichtbar
- [ ] Caption-Layout: Bild nimmt Großteil der Fläche ein, Caption-Text unten
- [ ] Title-and-Columns: Titel oben, zwei Spalten unten mit Bildern
- [ ] Alle neuen Layouts: Hintergrundfarbe korrekt angewendet
- [ ] Alle neuen Layouts: Logo + Color Bar sichtbar
- [ ] Kein Layout bricht aus der Slide-Begrenzung aus (kein Overflow)

---

## Phase 7: Vollständige Präsentation mit allen 25 Folien

**Ziel**: Alle Inhalte aus der Quellpräsentation als Slidev-Markdown umsetzen.

### Schritt 7.1: Alle 25 Slides in `slidev-ia-presenter.md` eintragen

Vollständiges Slide-Mapping (aus Spezifikation Abschnitt 7):

| Slide | Layout              | Background | Inhalt (Kurzform)                                      |
|-------|---------------------|------------|--------------------------------------------------------|
| 1     | default             | #00A8FF    | Kicker "Fast and Focused" + h1 "Instant Slides"       |
| 2     | default             | #137AFF    | h3 "Table of Contents" + ol (1-5)                      |
| 3     | title               | #264DFF    | h2 "1. Write" + p                                      |
| 4     | section             | #382CFF    | h3 "Tell Your Story" + p                               |
| 5     | v-split             | #4A13FF    | Text + Text (Write it / Or Paste it)                   |
| 6     | v-split             | #5C00FF    | Text + Bild (Placeholder Images)                       |
| 7     | title               | #6D00FF    | h2 "2. Structure" + p                                  |
| 8     | v-split             | #7F00FF    | Text + Bild (Chop Chop)                               |
| 9     | v-split             | #9500FF    | Text + Bild (Don't show everything)                    |
| 10    | grid                | #AD00FF    | 3x2 Grid: Image+Text Paare (Headings/Body/Visuals)    |
| 11    | default             | #C300F9    | Langer Paragraph (bold lead-in)                        |
| 12    | title               | #D400EB    | h2 "3. Iterate" + p                                    |
| 13    | v-split             | #E600DE    | Text + Bild (Editor and Thumbnails)                    |
| 14    | v-split             | #F003C4    | Text + Bild (Editor and Preview)                       |
| 15    | v-split             | #FA06AB    | Text + Bild (The Teleprompter)                         |
| 16    | title               | #FF148D    | h2 "4. Design" + p                                     |
| 17    | grid                | #FF276C    | 5 Bilder Gallery (has-only-media)                      |
| 18    | caption             | #FF3A4D    | Bild + Caption (Auto-Layout)                           |
| 19    | v-split             | #FF4935    | Text + Bild (Layout Picker)                            |
| 20    | v-split             | #FF571D    | Bild + Text (Templates — Bild links!)                  |
| 21    | title               | #FF6710    | h2 "5. Action" + p                                     |
| 22    | v-split             | #FF7806    | Text + Bild (A Safety Net)                             |
| 23    | v-split             | #FF8D00    | Text + Bild (Your Audience Sees)                       |
| 24    | title-and-columns   | #FFA800    | h3 + p + 2 Bilder-Spalten (Share and Export)           |
| 25    | title               | #FFC400    | h2 "Now Go and Move Mountains"                         |

**Hinweis zu Bildern**: Slides 8, 9, 13-15, 17, 18, 19, 20 referenzieren `iapresenter://`-URLs (App-interne Bilder, nicht exportiert). Diese Slides erhalten **Platzhalter-Bilder** aus den verfügbaren theme/media-Bildern oder werden als reine Text-Slides umgesetzt.

### Schritt 7.2: Verfügbare Bilder zuordnen

Vorhandene Bilder:
- `theme/image1.webp` — Golden Gate Bridge (Luftbild)
- `theme/image2.webp` — SF Straßenszene (Dusk)
- `theme/image3.webp` — Gelbe Kreuzung SF
- `theme/image4.webp` — Golden Gate Turm
- `theme/image5.webp`, `image6.webp` — weitere Theme-Bilder
- `media/image1-4.webp` — Identisch/ähnlich wie theme/

Für Slides mit `iapresenter://`-Bildern: Entweder theme-Bilder als Platzhalter verwenden oder das Bild weglassen und stattdessen den Text-only-Fallback nutzen.

### --- BROWSER-CHECK 7 ---

**Prüfpunkte**:
- [ ] Alle 25 Slides sind navigierbar (Pfeiltasten oder Slide-Nummer)
- [ ] Jeder Slide hat seine korrekte Hintergrundfarbe (Farbverlauf von Blau → Amber sichtbar)
- [ ] Text auf allen Slides gut lesbar (weiß auf farbigem Hintergrund)
- [ ] Kapitel-Divider (Slides 3, 7, 12, 16, 21, 25) sind visuell erkennbar (zentrierter Text)
- [ ] v-split Slides zeigen zwei Spalten
- [ ] Grid-Slide 10: 3x2 Grid sichtbar
- [ ] Grid-Slide 17: Bild-Gallery sichtbar (oder Platzhalter)
- [ ] Caption-Slide 18: Bild + Caption-Text korrekt
- [ ] Slide 24: Title-and-Columns Layout korrekt
- [ ] Logo + Color Bar auf ALLEN 25 Slides durchgehend sichtbar
- [ ] Slides-Overview (Route `/overview/`) zeigt alle 25 Slides als Thumbnails

---

## Phase 8: Feinschliff Typografie & Spacing

**Ziel**: Schriftgrößen, Abstände und Gewichte pixelgenau an die Vorlage anpassen.

### Schritt 8.1: Heading-Größen kalibrieren

Anhand der Vorlage die Font-Sizes anpassen:
- h1: ca. `3.5em` (für Default-Layout) / `4em` (für Title-Layout)
- h2: ca. `2.8em`
- h3: ca. `1.8em`
- h5 (Kicker): ca. `1.2em`, font-weight 600, Abstand nach unten zu h1
- p: ca. `1.2em`, line-height 1.5

### Schritt 8.2: Layout-Padding anpassen

- Default-Layout: `padding: 80px 60px 50px 60px`
- Title-Layout: gleichmäßiges Padding, Inhalt zentriert
- v-Split: Grid-Gap und inneres Padding für Spalten
- Grid: Gap zwischen Grid-Items

### Schritt 8.3: Listen-Styling

- Ordered Lists: Weiße Nummern, passende Einrückung
- Unordered Lists: Weiße Bullets, passende Einrückung

### Schritt 8.4: Bild-Styling in Layouts

- Bilder in v-split: `border-radius: 8px` (optional), `object-fit: cover`
- Bilder in Grid: `object-fit: cover`, volle Zellhöhe
- Bilder in Caption: `object-fit: contain`, zentriert

### --- BROWSER-CHECK 8 ---

**Prüfpunkte**:
- [ ] h1 "Instant Slides" (Slide 1) visuell groß und dominant (900 Black)
- [ ] h5 "Fast and Focused" (Slide 1) deutlich kleiner, über h1 positioniert
- [ ] h2 auf Title-Slides zentriert, große Schrift (800 ExtraBold)
- [ ] h3 auf Section/v-split-Slides gut lesbar (700 Bold)
- [ ] Absätze haben ausreichend Zeilenabstand (nicht gequetscht)
- [ ] Geordnete Liste (Slide 2) hat korrekte Nummerierung und Einrückung
- [ ] Bilder in v-split-Slides füllen die rechte Spalte sauber aus
- [ ] Kein Text wird abgeschnitten oder überläuft den Slide
- [ ] Vertikale Zentrierung funktioniert auf allen Layout-Typen

---

## Phase 9: Branding Fine-Tuning

**Ziel**: Logo und Color Bar in Größe und Position exakt an die Vorlage anpassen.

### Schritt 9.1: Logo-Positionierung verfeinern

Vergleiche mit der Vorlage:
- Originalgröße: `6vmax x 6vmax`
- Position: `right: 3vmax`, `top: 40px`
- In Slidev-Kontext (feste Canvas-Größe 980px): Ca. 60-80px breit
- Anpassung auf absolute Pixel-Werte für konsistentes Verhalten

### Schritt 9.2: Color Bar Positionierung verfeinern

- Original-Position: Unten links, `10vmax` breit
- In Slidev umrechnen auf ca. 100-120px Breite
- Position: `bottom: 15-25px`, `left: 25-35px`

### Schritt 9.3: Sicherstellen, dass Branding nicht mit Inhalt kollidiert

- Padding-Bereiche im Layout berücksichtigen
- Logo-Bereich: Top-Right 100x100px freihalten
- Color-Bar-Bereich: Bottom-Left 120x30px freihalten

### --- BROWSER-CHECK 9 ---

**Prüfpunkte**:
- [ ] Logo: Korrekte Größe (nicht zu groß, nicht zu klein)
- [ ] Logo: Exakte Position oben rechts (mit Abstand zum Rand)
- [ ] Color Bar: Korrekte Proportionen (breiter Streifen mit 8 Farbsegmenten)
- [ ] Color Bar: Position unten links
- [ ] Weder Logo noch Color Bar überlappen Slide-Inhalte auf irgendeinem Slide
- [ ] Bei Slides mit viel Text (Slide 11): Logo/Bar verdecken keinen Inhalt
- [ ] Screenshot von Slide 1 visuell vergleichen mit Original-Vorlage

---

## Phase 10: Visueller Gesamtvergleich mit der Vorlage

**Ziel**: Systematischer Vergleich der Slidev-Präsentation mit dem HTML-Original.

### Schritt 10.1: Original-HTML-Präsentation im Browser öffnen

Die Original-Datei `_NOTES/theme-ia-presenter/index.html` als Referenz öffnen.

### Schritt 10.2: Seite-für-Seite Vergleich (Stichproben)

Vergleiche folgende repräsentative Slides:
1. **Slide 1** (Default + Kicker): Farbton, Textgröße, Positionierung
2. **Slide 3** (Title): Zentrierter Text, Schriftgröße h2
3. **Slide 5** (v-split Text+Text): Spalten-Aufteilung, Abstände
4. **Slide 6** (v-split Text+Bild): Bildgröße, Spalten-Verhältnis
5. **Slide 10** (Grid): Grid-Anordnung
6. **Slide 25** (Title, letzter Slide): Hintergrundfarbe Amber

### --- BROWSER-CHECK 10 (Final) ---

**Prüfpunkte**:

#### A. Farbsystem
- [ ] Farbverlauf über alle 25 Slides: Blau → Violett → Magenta → Rot → Orange → Amber
- [ ] Kein Slide hat eine falsche/fehlende Hintergrundfarbe
- [ ] Text ist auf ALLEN Hintergrundfarben gut lesbar

#### B. Typografie
- [ ] Inter-Font wird korrekt geladen (keine Fallback-Schrift sichtbar)
- [ ] Heading-Hierarchie visuell klar: h1 > h2 > h3 > h5
- [ ] Font-Gewichte korrekt (h1 ist merkbar fetter als h3)

#### C. Layouts
- [ ] Default: Text links, vertikal zentriert
- [ ] Title: Text zentriert
- [ ] Section: Text links, vertikal zentriert
- [ ] v-Split: Saubere 50/50 Spalten
- [ ] Grid: Items gleichmäßig verteilt
- [ ] Caption: Bild + Text korrekt angeordnet
- [ ] Title-and-Columns: Titel oben, Spalten unten

#### D. Branding
- [ ] Logo auf allen 25 Slides sichtbar, gleiche Position
- [ ] Color Bar auf allen 25 Slides sichtbar, gleiche Position
- [ ] Branding überlappt nirgendwo mit Inhalt

#### E. Responsives Verhalten
- [ ] Browser-Fenster auf 1920x1080 vergrößern: Slide skaliert proportional hoch
- [ ] Browser-Fenster auf 1280x720 verkleinern: Slide skaliert proportional runter
- [ ] Browser-Fenster auf 800x600: Slide passt sich an, alles lesbar
- [ ] Kein horizontaler Scrollbar bei keiner Fenstergröße

#### F. Navigation & Funktionalität
- [ ] Pfeiltasten navigieren korrekt durch alle 25 Slides
- [ ] Slide-Overview (`/overview/`) zeigt alle 25 Thumbnails
- [ ] Presenter-Mode (`/presenter/`) funktioniert
- [ ] Kein JavaScript-Fehler in der Console

---

## Zusammenfassung der Browser-Checks

| Check | Phase | Fokus                         | Kritische Prüfpunkte |
|-------|-------|-------------------------------|---------------------|
| 1     | 1     | Grundgerüst                   | Theme lädt, Farbe, Schrift, Layout |
| 2     | 2     | Branding                      | Logo + Color Bar auf allen Slides |
| 3     | 3     | Title-Layout                  | Zentrierter Text, h2-Gewicht |
| 4     | 4     | Section-Layout                | Links-aligned, visuelle Differenzierung |
| 5     | 5     | v-Split-Layout                | Spalten, Bilder, Slot-Mapping |
| 6     | 6     | Grid/Caption/Title-Columns    | Alle Sonderlayouts funktional |
| 7     | 7     | Vollständige Präsentation     | Alle 25 Slides korrekt |
| 8     | 8     | Typografie & Spacing          | Pixelgenaue Anpassungen |
| 9     | 9     | Branding Fine-Tuning          | Logo/Bar Position + Größe |
| 10    | 10    | Finaler Gesamtvergleich       | Komplett-Abnahme gegen Vorlage |
