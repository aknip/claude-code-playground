# iA Presenter "mgm Theme" - Slidev Theme & Layout Specification

## 1. Source Analysis Summary

The source presentation is an iA Presenter HTML export based on the "San Francisco" theme, customized as **"mgm Theme"** (v1.0.0). It uses Reveal.js as the presentation engine and contains **25 slides** with various layouts, all featuring solid-color backgrounds from a rainbow gradient palette and white text.

---

## 2. Color System

### 2.1 Background Gradient Palette (Light Mode)

Each slide receives a unique background color from this 11-stop gradient, interpolated across all slides:

| Stop | Color     | Usage Example           |
|------|-----------|------------------------|
| 1    | `#00A8FF` | Slide 1 (cyan-blue)    |
| 2    | `#137AFF` | Slide 2                |
| 3    | `#264DFF` | Slide 3                |
| 4    | `#382CFF` | Slide 4                |
| 5    | `#4A13FF` | Slide 5                |
| 6    | `#5C00FF` | Slide 6                |
| 7    | `#6D00FF` | Slide 7                |
| 8    | `#7F00FF` | Slide 8                |
| 9    | `#9500FF` | Slide 9                |
| 10   | `#AD00FF` | Slide 10               |
| 11   | `#C300F9` | Slide 11               |
| ...  | ...       | continues to...        |
| end  | `#FFC400` | Last slide (amber)     |

Full slide-by-slide colors from the HTML:
```
#00A8FF, #137AFF, #264DFF, #382CFF, #4A13FF, #5C00FF, #6D00FF, #7F00FF,
#9500FF, #AD00FF, #C300F9, #D400EB, #E600DE, #F003C4, #FA06AB, #FF148D,
#FF276C, #FF3A4D, #FF4935, #FF571D, #FF6710, #FF7806, #FF8D00, #FFA800,
#FFC400
```

### 2.2 Dark Mode Gradient (defined but not used in this presentation)

```
#004B72, #1C238D, #320090, #51009D, #67008C, #73006F, #7D004E,
#7C0010, #9E2D00, #A45400, #9D7900
```

### 2.3 Accent Colors

| Accent   | Color     | Purpose              |
|----------|-----------|---------------------|
| Accent1  | `#f94144` | Red accent           |
| Accent2  | `#43aa8b` | Green accent         |
| Accent3  | `#f9c74f` | Yellow accent        |
| Accent4  | `#90be6d` | Light green accent   |
| Accent5  | `#f8961e` | Orange accent        |
| Accent6  | `#577590` | Blue-gray accent     |

### 2.4 Text Colors

- **All text (titles, body, headings)**: `#ffffff` (white) — both `LightTitleTextColor`, `LightBodyTextColor`, `DarkTitleTextColor`, `DarkBodyTextColor` are all `#fff`
- **Frame color**: `#000000`

### 2.5 mgm Color Bar Colors

The color bar SVG is a horizontal strip of 8 colored rectangles:
```
#36CEFA (cyan), #207475 (teal), #FC7340 (orange), #A0012C (dark red),
#FAD120 (yellow), #B562CD (purple), #1D4E86 (navy), #B0E341 (lime green)
```

---

## 3. Typography

### 3.1 Font Family

- **Title font**: `Inter`
- **Body font**: `Inter`
- Both are the same — the entire theme uses the Inter font family

### 3.2 Font Weights & Headings

| Element | Font Weight | CSS Variable                  |
|---------|-------------|-------------------------------|
| h1      | 900 (Black) | `--font-weight-h1`            |
| h2      | 800 (ExtraBold) | `--font-weight-h2`        |
| h3      | 700 (Bold)  | `--font-weight-h3`            |
| h4      | 700 (Bold)  | `--font-weight-h4`            |
| h5      | 600 (SemiBold) | `--font-weight-h5`         |
| h6      | 600 (SemiBold) | `--font-weight-h6`         |
| p/body  | 400 (Regular) | `--font-weight-p`           |
| strong  | 700/800     | Font variation settings       |

### 3.3 Available Font Files (woff2)

```
Inter-Regular.woff2       (400 normal)
Inter-Italic.woff2        (400 italic)
Inter-Medium.woff2        (500 normal)
Inter-MediumItalic.woff2  (500 italic)
Inter-SemiBold.woff2      (600 normal)
Inter-SemiBoldItalic.woff2(600 italic)
Inter-Bold.woff2          (700 normal)
Inter-BoldItalic.woff2    (700 italic)
Inter-ExtraBold.woff2     (800 normal)
Inter-ExtraBoldItalic.woff2(800 italic)
Inter-Black.woff2         (900 normal)
Inter-BlackItalic.woff2   (900 italic)
```

### 3.4 Font Size Scaling System

The original uses a dynamic scaling system with CSS variables:
- `--p-base-size: 64` (base paragraph font size unit)
- `--h1-offset: 30`, `--h2-offset: 14`, `--h3-offset: 0`, `--h4-offset: -16`, etc.
- Font sizes are calculated dynamically from base + offset values
- Text wrapping: `text-wrap: balance` on h1, h2, and single headings

### 3.5 Kicker Text (Subtitle above title)

- Class: `.kicker` on `<h5>` element
- Inherits font family and weight from the heading system
- Displayed above the main title (e.g., "Fast and Focused" above "Instant Slides")

---

## 4. Slide Structure

### 4.1 Overall Slide Anatomy

Every slide has this structure:
```
<section class="variable-size-headings light {container-type} responsive">
  <div class="header">
    <div class="leading"></div>
    <div class="middle"></div>
    <div class="trailing"></div>
  </div>
  <div class="layout-{type} slide-contents {optional-classes}">
    <!-- Content: element-groups, figures, etc. -->
  </div>
  <div class="footnotes"></div>
  <div class="footer">
    <div class="leading"></div>
    <div class="middle"></div>
    <div class="trailing"></div>
  </div>
</section>
```

### 4.2 Branding Overlays

#### mgm Logo (Top Right)
- Position: Top-right corner of every slide
- Implementation: `::after` pseudo-element on `.header`
- Size: `6vmax x 6vmax`
- Position: `right: 3vmax`, `top: 40px`
- Image: `mgm-logo-white.svg` (white mgm logo with letter forms)
- Background-size: `contain`, no-repeat
- Z-index: 1000

#### mgm Color Bar (Bottom Left)
- Position: Bottom-left area of every slide
- Implementation: `::after` pseudo-element on `.footer`
- Size: `10vmax x 10vmax`
- Position: `right: calc(-100vw + 18vmax + 200px)`, `top: -60px` (relative positioning)
- Image: `mgm-color-bar.svg` (8-segment horizontal color strip)
- Background-size: `contain`, no-repeat
- Z-index: 1000

### 4.3 Content Padding

```css
.slide-contents {
  padding-top: 100px;
  padding-bottom: 50px;
}
```

---

## 5. Layout Specifications

### 5.1 Layout: `default` (layout-default)

**Container class**: `default-container`
**Usage**: General content slides with text, lists, paragraphs
**Text alignment**: Left horizontal, center vertical
**Content**: Single `.element-group` containing headings + body text
**CSS Grid**: Uses `display: grid; height: 100%`

**Example slides**:
- Slide 1: Kicker "Fast and Focused" + h1 "Instant Slides" + p "Getting Started with iA Presenter"
- Slide 2: h3 "Table of Contents" + ordered list
- Slide 11: Long paragraph with bold lead-in

### 5.2 Layout: `title` (layout-title)

**Container class**: `title-container`
**Usage**: Section dividers / chapter title slides
**Text alignment**: Center horizontal, center vertical (configurable via CSS vars)
**Content**: Single `.element-group` with h2 + optional subtitle paragraph

**Example slides**:
- Slide 3: h2 "1. Write" + p "Start With a Script"
- Slide 7: h2 "2. Structure" + p "Separating What You Say and What You Show"
- Slide 12: h2 "3. Iterate" + p "Make It Better With Every Iteration"
- Slide 16: h2 "4. Design" + p "Layout and Themes"
- Slide 21: h2 "5. Action" + p "Teleprompter and Export"
- Slide 25: h2 "Now Go and Move Mountains" (no subtitle)

### 5.3 Layout: `section` (layout-section)

**Container class**: `section-container`
**Usage**: Sub-section content slides
**Text alignment**: Left horizontal, center vertical
**Content**: Single `.element-group` with h3 heading + body paragraph

**Example slide**:
- Slide 4: h3 "Tell Your Story" + p "The heart of a great presentation..."

### 5.4 Layout: `v-split` (layout-v-split)

**Container class**: `v-split-container`
**Usage**: Two-column layout — text on one side, text or image on the other
**Content**: Two `.element-group` divs OR one `.element-group` + one `<figure>`
**Grid**: Side-by-side columns (2 equal halves)

**Variants**:
- **Text + Text**: Two element-groups side by side (Slide 5)
- **Text + Image** (with `media-grid` class): Text left, image right (Slides 6, 8, 9, 13-15, 19, 22-23)
- **Image + Text**: Image left, text right (Slide 20)

**Example slides**:
- Slide 5: h3 "Write it" + p | h3 "Or Paste it" + p (text-text split)
- Slide 6: h3 "Use Placeholder Images" + p | image (text-image split with `media-grid`)

### 5.5 Layout: `grid` (layout-grid)

**Container class**: `grid-container`
**Usage**: Multi-item grid (3x2 for 6 items, or image gallery for 5 items)
**Additional classes**: `grid-items-N` (where N = number of items), `media-grid`, `has-only-media`

**Variants**:
- **Mixed grid** (Slide 10): Alternating images + text blocks in 3x2 grid (`grid-items-6`)
- **Image-only grid** (Slide 17): 5 images in grid (`grid-items-5 has-only-media`)

### 5.6 Layout: `caption` (layout-caption)

**Container class**: `caption-container`
**Usage**: Full-width image with caption text
**Content**: `<figure>` with image + `.element-group` with caption text
**Layout**: Image fills most of the slide, text caption below

**Example slide**:
- Slide 18: Image + p "Auto-Layout, Built In: The design adjusts itself..."

### 5.7 Layout: `title-and-columns` (layout-title-and-columns)

**Container class**: (uses `title-and-columns-container` implied)
**Usage**: Title/text header + image columns below
**Additional classes**: `columns-items-N`, `media-grid`
**Content**: `.title-part.element-group` for header + `<figure>` elements for columns

**Example slide**:
- Slide 24: h3 "Share and Export:" + p description + 2 images side by side

---

## 6. Slidev Theme Implementation Plan

### 6.1 Directory Structure

```
theme-ia-presenter/
  layouts/
    default.vue          # layout-default
    title.vue            # layout-title (section divider)
    section.vue          # layout-section
    v-split.vue          # layout-v-split (two columns: text+text or text+image)
    grid.vue             # layout-grid (multi-item grid)
    caption.vue          # layout-caption (image + caption)
    title-and-columns.vue # layout-title-and-columns
  styles/
    index.ts             # Style entry point
    layouts.css          # Layout-specific styles
  public/
    fonts/               # Inter woff2 files (all 12 variants)
    mgm-logo-white.svg   # Logo SVG
    mgm-color-bar.svg    # Color bar SVG
    images/              # Theme images (image1-6.webp, media images)
  global-bottom.vue      # Global layer for mgm logo + color bar on every slide
  layoutHelper.ts        # Background color handling utility
  package.json           # Theme metadata
```

### 6.2 Frontmatter Configuration

```yaml
---
theme: ./theme-ia-presenter
title: Instant Slides - Getting Started with iA Presenter
author: mgm
fonts:
  provider: none
  sans: Inter
  local: Inter
  weights: '400,500,600,700,800,900'
  italic: true
colorSchema: light
canvasWidth: 980
aspectRatio: 16/9
---
```

### 6.3 Layout Props

Each layout should accept these common props:

```typescript
// Common props for all layouts
interface CommonLayoutProps {
  background?: string  // Slide background color (from gradient palette)
  class?: string       // Additional CSS classes
}
```

### 6.4 Global Layer: Logo & Color Bar (`global-bottom.vue`)

A global bottom layer renders the mgm branding on every slide:

```vue
<template>
  <div class="ia-branding">
    <img src="/mgm-logo-white.svg" class="ia-logo" />
    <img src="/mgm-color-bar.svg" class="ia-color-bar" />
  </div>
</template>

<style scoped>
.ia-logo {
  position: fixed;
  top: 40px;
  right: 3vw;
  width: 6vw;
  height: 6vw;
  object-fit: contain;
  z-index: 100;
}
.ia-color-bar {
  position: fixed;
  bottom: 20px;
  left: 30px;
  width: 10vw;
  height: auto;
  object-fit: contain;
  z-index: 100;
}
</style>
```

### 6.5 Slide Background Color Assignment

Each slide specifies its background color via frontmatter:

```yaml
---
layout: default
background: '#00A8FF'
---
```

The layout components apply this as `background-color` to the slide container.

### 6.6 Style Implementation

#### Global Styles (`styles/layouts.css`)

```css
/* Font faces - loaded from local files */
@font-face { font-family: 'Inter'; font-weight: 400; font-style: normal; src: url('/fonts/Inter-Regular.woff2') format('woff2'); font-display: swap; }
@font-face { font-family: 'Inter'; font-weight: 400; font-style: italic; src: url('/fonts/Inter-Italic.woff2') format('woff2'); font-display: swap; }
/* ... all 12 variants ... */

:root {
  --ia-text-color: #ffffff;
  --ia-font-family: 'Inter', sans-serif;
  --ia-accent1: #f94144;
  --ia-accent2: #43aa8b;
  --ia-accent3: #f9c74f;
  --ia-accent4: #90be6d;
  --ia-accent5: #f8961e;
  --ia-accent6: #577590;
}

/* Base slide styling */
.slidev-layout {
  font-family: var(--ia-font-family);
  color: var(--ia-text-color);
  padding: 60px 60px 40px 60px;
}

/* Heading weights */
.slidev-layout h1 { font-weight: 900; }
.slidev-layout h2 { font-weight: 800; }
.slidev-layout h3, .slidev-layout h4 { font-weight: 700; }
.slidev-layout h5, .slidev-layout h6 { font-weight: 600; }

/* Text wrapping */
.slidev-layout h1, .slidev-layout h2 { text-wrap: balance; }
```

---

## 7. Slide Content Mapping (HTML → Slidev Markdown)

### Slide 1 — Layout: `default`, BG: `#00A8FF`
```markdown
---
layout: default
background: '#00A8FF'
---

##### Fast and Focused

# Instant Slides

Getting Started with iA Presenter
```

### Slide 2 — Layout: `default`, BG: `#137AFF`
```markdown
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

### Slide 3 — Layout: `title`, BG: `#264DFF`
```markdown
---
layout: title
background: '#264DFF'
---

## 1. Write

Start With a Script
```

### Slide 4 — Layout: `section`, BG: `#382CFF`
```markdown
---
layout: section
background: '#382CFF'
---

### Tell Your Story

The heart of a great presentation is the message. Get the script right before anything else.
```

### Slide 5 — Layout: `v-split`, BG: `#4A13FF`
```markdown
---
layout: v-split
background: '#4A13FF'
---

### Write it

Think about what you want to achieve. Then write it down like an email.

::right::

### Or Paste it

From DMs to articles, any existing text can become a presentation in no time. Paste your instant messages, a work chat, or a Mastodon thread.
```

### Slide 6 — Layout: `v-split`, BG: `#5C00FF`
```markdown
---
layout: v-split
background: '#5C00FF'
---

### Use Placeholder Images

You will be tempted to add images while writing. Resist the temptation. To move fast, use placeholders.

::right::

![placeholder](/images/image2.webp)
```

### Slides 7-25 follow the same pattern...

---

## 8. Responsive Behavior

### 8.1 Slidev Canvas Scaling

Slidev uses a **fixed canvas** (default 980px wide, 16:9 aspect ratio) that **scales proportionally** to the viewport. This inherently provides responsive behavior — no media queries needed.

### 8.2 Original iA Presenter Responsive Features

- Class `responsive` on all slides
- Variable-size headings with dynamic scaling via CSS custom properties
- `text-wrap: balance` on headings for optimal line breaking
- `element-group` uses `display: flex; flex-direction: column; justify-content: center` for vertical centering

### 8.3 Slidev Implementation Notes

- Font sizes should use `em` or `rem` units (they scale with the canvas)
- Grid/flex layouts will work correctly within the fixed canvas
- The `v-split` layout should use CSS Grid `grid-template-columns: 1fr 1fr`
- Images within `v-split` should use `object-fit: cover` and fill their grid cell

---

## 9. Assets to Copy

### From `theme/` directory:
- `mgm-logo-white.svg` → `public/mgm-logo-white.svg`
- `mgm-color-bar.svg` → `public/mgm-color-bar.svg`
- `fonts/Inter-*.woff2` (12 files) → `public/fonts/`
- `image1.webp` through `image6.webp` → `public/images/`

### From `media/` directory:
- `image1.webp` through `image4.webp` → `public/images/media/`

---

## 10. Key Design Decisions for Slidev Port

1. **Background colors per slide**: Each slide gets its own background color via frontmatter prop. The gradient palette is documented above for manual assignment.

2. **White text on all slides**: Since all backgrounds are vivid colors, all text stays white. No dark/light mode toggle needed.

3. **Logo & color bar**: Implemented as a `global-bottom.vue` layer, always visible. Positioned with `position: fixed` to stay in place.

4. **Font loading**: Use `provider: none` in Slidev fonts config and load Inter from local woff2 files via `@font-face` rules.

5. **Layout slot mapping**:
   - `v-split`: default slot = left, `::right::` named slot = right
   - `grid`: default slot = all items in grid (use Vue grid layout)
   - `caption`: default slot = caption text, `::image::` = image
   - `title-and-columns`: default slot = title area, `::columns::` = column content

6. **No slide margin/offset**: The original has `margin-left: 200px` (likely from iA Presenter's editor UI). This is **not** replicated in Slidev.

7. **Variable-size headings**: Simplified in Slidev using responsive `em`-based sizes rather than the complex CSS custom property calculation system.
