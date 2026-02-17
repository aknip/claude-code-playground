<script setup>
import logoSvg from './public/mgm-logo-white.svg'
import colorBarSvg from './public/mgm-color-bar.svg'
</script>

<template>
  <div class="ia-branding">
    <img :src="logoSvg" class="ia-logo" alt="mgm logo" />
    <img :src="colorBarSvg" class="ia-color-bar" alt="mgm color bar" />
  </div>
</template>

<style scoped>
.ia-branding {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}

.ia-logo {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 70px;
  height: auto;
  object-fit: contain;
}

.ia-color-bar {
  position: absolute;
  bottom: 16px;
  right: 28px;
  width: 140px;
  height: auto;
  object-fit: contain;
}

/* Portrait viewport: adjust branding positioning */
@media (max-aspect-ratio: 1/1) {
  .ia-logo {
    top: 20px;
    right: 20px;
    width: 55px;
  }

  .ia-color-bar {
    bottom: 12px;
    right: 20px;
    width: 110px;
  }
}
</style>
