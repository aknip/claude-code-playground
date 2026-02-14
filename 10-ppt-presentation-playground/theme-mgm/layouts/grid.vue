<script setup lang="ts">
defineProps({
  background: { type: String, default: '' },
  cols: { type: Number, default: 3 },
})
</script>

<template>
  <div
    class="slidev-layout ia-grid"
    :style="background ? { backgroundColor: background } : {}"
  >
    <div
      class="ia-grid-content"
      :style="{ gridTemplateColumns: `repeat(${cols}, 1fr)` }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ia-grid {
  background-color: var(--ia-slide-bg, #00A8FF);
  padding: 60px 50px 40px 50px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ia-grid-content {
  flex: 1;
  display: grid;
  gap: 1.2rem 1.8rem;
  align-items: start;
  align-content: center;
}

.ia-grid-content :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.ia-grid-content :deep(.grid-item) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.ia-grid-content :deep(h3) {
  font-size: 1.15em;
  margin-bottom: 0.15em;
}

.ia-grid-content :deep(p) {
  font-size: 0.85em;
  line-height: 1.35;
  opacity: 0.9;
}

/* Portrait viewport: reduce columns */
@media (max-aspect-ratio: 1/1) {
  .ia-grid {
    padding: 50px 40px 35px 40px;
  }

  .ia-grid-content {
    grid-template-columns: 1fr 1fr !important;
    gap: 1rem 1.2rem;
  }
}
</style>
