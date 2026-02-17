---
theme: ./theme-mgm
addons:
  - "@/slidev-addon-impress"
title: impress.js Demo in Slidev
author: mgm
colorSchema: light
fonts:
  provider: none
  sans: Inter
  local: Inter
canvasWidth: 1024
aspectRatio: 4/3
transition: none
impressEnabled: true
impressWidth: 1024
impressHeight: 768
impressPerspective: 1000
impressTransitionDuration: 1000
impressMaxScale: 3
impressMinScale: 0
impressBackground: "radial-gradient(rgb(240,240,240), rgb(190,190,190))"
impressX: -1300
impressY: -1500
impressClass: slide
---

<!-- Slide 1: "bored" — Klassische Folie, horizontale Reihe links -->

<div class="impress-slide-content">
  <q>Aren't you just <b>bored</b> with all those slides-based presentations?</q>
</div>

<style>
.impress-slide-content q {
  display: block;
  font-size: 50px;
  line-height: 72px;
  margin-top: 100px;
  font-family: 'Open Sans', 'Inter', Arial, sans-serif;
  color: rgb(102, 102, 102);
}
.impress-slide-content q strong {
  white-space: nowrap;
}
</style>

---
impressX: 0
impressY: -1500
impressClass: slide
---

<!-- Slide 2: Horizontaler Pan nach rechts -->

<div class="impress-slide-content">
  <q>Don't you think that presentations given <strong>in modern browsers</strong> shouldn't <strong>copy the limits</strong> of 'classic' slide decks?</q>
</div>

<style>
.impress-slide-content q {
  display: block;
  font-size: 50px;
  line-height: 72px;
  margin-top: 100px;
  font-family: 'Open Sans', 'Inter', Arial, sans-serif;
  color: rgb(102, 102, 102);
}
.impress-slide-content q strong {
  white-space: nowrap;
}
</style>

---
impressX: 1300
impressY: -1500
impressClass: slide
---

<!-- Slide 3: Weiterer horizontaler Pan -->

<div class="impress-slide-content">
  <q>Would you like to <strong>impress your audience</strong> with <strong>stunning visualization</strong> of your talk?</q>
</div>

<style>
.impress-slide-content q {
  display: block;
  font-size: 50px;
  line-height: 72px;
  margin-top: 100px;
  font-family: 'Open Sans', 'Inter', Arial, sans-serif;
  color: rgb(102, 102, 102);
}
.impress-slide-content q strong {
  white-space: nowrap;
}
</style>

---
impressX: 0
impressY: 0
impressScale: 4
---

<!-- Slide 4: "title" — Dramatischer Zoom-Out auf 4x -->
<!-- Parallax-Effekt: Texte auf verschiedenen Z-Ebenen -->

<div class="title-step">
  <span class="try">then you should try</span>
  <h1>impress.js<sup>*</sup></h1>
  <span class="footnote"><sup>*</sup> no rhyme intended</span>
</div>

<style>
.title-step {
  padding: 0;
  position: relative;
  width: 900px;
  font-family: 'PT Serif', 'Inter', georgia, serif;
  font-size: 48px;
  line-height: 1.5;
}
.title-step .try {
  font-size: 64px;
  position: absolute;
  top: -0.5em;
  left: 1.5em;
  transform: translateZ(20px);
}
.title-step h1 {
  font-size: 190px;
  font-weight: 900;
  transform: translateZ(50px);
  color: rgb(102, 102, 102);
}
.title-step .footnote {
  font-size: 32px;
  color: rgb(102, 102, 102);
}
</style>

---
impressX: 850
impressY: 3000
impressRotate: 90
impressScale: 5
---

<!-- Slide 5: "its" — Pan + 90° Rotation + Zoom auf 5x -->

<div class="its-step">
  <p>It's a <strong>presentation tool</strong> <br/>
  inspired by the idea behind <a href="http://prezi.com">prezi.com</a> <br/>
  and based on the <strong>power of CSS3 transforms and transitions</strong> in modern browsers.</p>
</div>

<style>
.its-step {
  width: 900px;
  font-family: 'PT Serif', 'Inter', georgia, serif;
  font-size: 48px;
  line-height: 1.5;
  color: rgb(102, 102, 102);
}
.its-step a {
  color: inherit;
  text-decoration: none;
  padding: 0 0.1em;
  background: rgba(255,255,255,0.5);
  text-shadow: -1px -1px 2px rgba(100,100,100,0.9);
  border-radius: 0.2em;
}
</style>

---
impressX: 3500
impressY: 2100
impressRotate: 180
impressScale: 6
---

<!-- Slide 6: "big" — 180° Rotation, Zoom auf 6x -->
<!-- Wort "big" in riesiger Schrift -->

<div class="big-step">
  <p>visualize your <b>big</b> <span class="thoughts">thoughts</span></p>
</div>

<style>
.big-step {
  width: 600px;
  text-align: center;
  font-family: 'PT Serif', 'Inter', georgia, serif;
  font-size: 60px;
  line-height: 1;
  color: rgb(102, 102, 102);
}
.big-step b {
  display: block;
  font-size: 250px;
  line-height: 250px;
  font-weight: bold;
}
.big-step .thoughts {
  font-size: 90px;
  line-height: 150px;
}
</style>

---
impressX: 2825
impressY: 2325
impressZ: -3000
impressRotate: 300
impressScale: 1
---

<!-- Slide 7: "tiny" — Z-Achsen-Tauchgang, 3000px tief -->
<!-- Kontrast zu "big": zurück auf scale=1 -->

<div class="tiny-step">
  <p>and <b>tiny</b> ideas</p>
</div>

<style>
.tiny-step {
  width: 500px;
  text-align: center;
  font-family: 'PT Serif', 'Inter', georgia, serif;
  font-size: 48px;
  line-height: 1.5;
  color: rgb(102, 102, 102);
}
.tiny-step b {
  font-weight: bold;
}
</style>

---
impressX: 3500
impressY: -850
impressZ: 0
impressRotate: 270
impressScale: 6
---

<!-- Slide 8: "ing" — Animierte Wörter -->
<!-- "positioning" verschiebt sich, "rotating" dreht sich, "scaling" skaliert -->

<div class="ing-step">
  <p>by <b class="positioning">positioning</b>, <b class="rotating">rotating</b> and <b class="scaling">scaling</b> them on an infinite canvas</p>
</div>

<style>
.ing-step {
  width: 500px;
  font-family: 'PT Serif', 'Inter', georgia, serif;
  font-size: 48px;
  line-height: 1.5;
  color: rgb(102, 102, 102);
}
.ing-step b {
  display: inline-block;
  font-weight: bold;
  transition: 0.5s;
}
/* Animationen wenn Slide aktiv (impress-present Klasse) */
.impress-present .ing-step .positioning {
  transform: translateY(-10px);
}
.impress-present .ing-step .rotating {
  transform: rotate(-10deg);
  transition-delay: 0.25s;
}
.impress-present .ing-step .scaling {
  transform: scale(0.7);
  transition-delay: 0.5s;
}
</style>

---
impressX: 6700
impressY: -300
impressScale: 6
---

<!-- Slide 9: "imagination" — Großer Pan nach rechts -->

<div class="imagination-step">
  <p>the only <b>limit</b> is your <b class="imagination">imagination</b></p>
</div>

<style>
.imagination-step {
  width: 600px;
  font-family: 'PT Serif', 'Inter', georgia, serif;
  font-size: 48px;
  line-height: 1.5;
  color: rgb(102, 102, 102);
}
.imagination-step b {
  font-weight: bold;
}
.imagination-step .imagination {
  font-size: 78px;
}
</style>

---
impressX: 6300
impressY: 2000
impressRotate: 20
impressScale: 4
---

<!-- Slide 10: "source" — Use the Source, Luke! -->

<div class="source-step">
  <p>want to know more?</p>
  <q><a href="http://github.com/impress/impress.js">use the source</a>, Luke!</q>
</div>

<style>
.source-step {
  width: 700px;
  padding-bottom: 300px;
  font-family: 'PT Serif', 'Inter', georgia, serif;
  font-size: 48px;
  line-height: 1.5;
  color: rgb(102, 102, 102);
}
.source-step q {
  display: block;
  font-size: 60px;
}
.source-step a {
  color: inherit;
  text-decoration: none;
  padding: 0 0.1em;
  background: rgba(255,255,255,0.5);
  text-shadow: -1px -1px 2px rgba(100,100,100,0.9);
  border-radius: 0.2em;
}
</style>

---
impressX: 6000
impressY: 4000
impressScale: 2
---

<!-- Slide 11: "one-more-thing" -->

<div class="one-more-step">
  <p>one more thing...</p>
</div>

<style>
.one-more-step {
  font-family: 'PT Serif', 'Inter', georgia, serif;
  font-size: 48px;
  line-height: 1.5;
  color: rgb(102, 102, 102);
}
</style>

---
impressX: 6200
impressY: 4300
impressZ: -100
impressRotateX: -40
impressRotateY: 10
impressScale: 2
---

<!-- Slide 12: "its-in-3d" — Multi-Achsen 3D-Rotation -->
<!-- Wörter auf verschiedenen Z-Tiefen, kollabieren zu Z=0 wenn aktiv -->

<div class="its-in-3d-step">
  <p><span class="have">have</span> <span class="you">you</span> <span class="noticed">noticed</span> <span class="its">it's</span> <span class="in">in</span> <b>3D<sup>*</sup></b>?</p>
  <span class="footnote">* beat that, prezi ;)</span>
</div>

<style>
.its-in-3d-step {
  font-family: 'PT Serif', 'Inter', georgia, serif;
  font-size: 48px;
  line-height: 1.5;
  color: rgb(102, 102, 102);
}
.its-in-3d-step p {
  transform-style: preserve-3d;
}
.its-in-3d-step span,
.its-in-3d-step b {
  display: inline-block;
  transform: translateZ(40px);
  transition: 0.5s;
  font-weight: bold;
}
.its-in-3d-step .have    { transform: translateZ(-40px); }
.its-in-3d-step .you     { transform: translateZ(20px); }
.its-in-3d-step .noticed { transform: translateZ(-40px); }
.its-in-3d-step .its     { transform: translateZ(60px); }
.its-in-3d-step .in      { transform: translateZ(-10px); }
.its-in-3d-step .footnote {
  font-size: 32px;
  transform: translateZ(-10px);
}
/* Alle Wörter auf Z=0 wenn Slide aktiv */
.impress-present .its-in-3d-step span,
.impress-present .its-in-3d-step b {
  transform: translateZ(0px);
}
</style>

---
impressX: 3000
impressY: 1500
impressZ: 0
impressScale: 10
---

<!-- Slide 13: "overview" — Vogelperspektive -->
<!-- Zoom auf 10x zeigt alle Slides gleichzeitig -->

<div class="overview-step">
  <!-- Leerer Slide -- zeigt den gesamten Canvas -->
</div>

<style>
.overview-step {
  display: none;
}
</style>
