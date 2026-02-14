<script setup lang="ts">
defineProps({
  background: { type: String, default: '' },
})
</script>

<template>
  <div
    class="slidev-layout ia-v-split"
    :style="background ? { backgroundColor: background } : {}"
  >
    <div class="ia-v-split-grid">
      <div class="ia-v-split-left">
        <slot />
      </div>
      <div class="ia-v-split-right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ia-v-split {
  background-color: var(--ia-slide-bg, #00A8FF);
  padding: 80px 70px 50px 70px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ia-v-split-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
  min-height: 0;
}

.ia-v-split-left,
.ia-v-split-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  min-height: 0;
}

.ia-v-split-right :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.ia-v-split-right :deep(p):has(img) {
  height: 100%;
  display: flex;
  align-items: center;
}

/* Portrait viewport: stack columns vertically */
@media (max-aspect-ratio: 1/1) {
  .ia-v-split {
    padding: 60px 50px 40px 50px;
  }

  .ia-v-split-grid {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1.5rem;
  }

  /* When right column has an image, reverse order (image on top, text below) */
  .ia-v-split-grid:has(.ia-v-split-right img) {
    direction: ltr;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
  }

  .ia-v-split-grid:has(.ia-v-split-right img) .ia-v-split-left,
  .ia-v-split-grid:has(.ia-v-split-right img) .ia-v-split-right {
    flex: 1;
    min-height: 0;
  }
}
</style>
