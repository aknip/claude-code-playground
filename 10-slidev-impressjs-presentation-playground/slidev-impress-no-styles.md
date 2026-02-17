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


---
impressX: 0
impressY: -1500
impressClass: slide
---

<!-- Slide 2: Horizontaler Pan nach rechts -->

<div class="impress-slide-content">
  <q>Don't you think that presentations given <strong>in modern browsers</strong> shouldn't <strong>copy the limits</strong> of 'classic' slide decks?</q>
</div>


---
impressX: 1300
impressY: -1500
impressClass: slide
---

<!-- Slide 3: Weiterer horizontaler Pan -->

<div class="impress-slide-content">
  <q>Would you like to <strong>impress your audience</strong> with <strong>stunning visualization</strong> of your talk?</q>
</div>


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


---
impressX: 6700
impressY: -300
impressScale: 6
---

<!-- Slide 9: "imagination" — Großer Pan nach rechts -->

<div class="imagination-step">
  <p>the only <b>limit</b> is your <b class="imagination">imagination</b></p>
</div>


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


---
impressX: 6000
impressY: 4000
impressScale: 2
---

<!-- Slide 11: "one-more-thing" -->

<div class="one-more-step">
  <p>one more thing...</p>
</div>


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

