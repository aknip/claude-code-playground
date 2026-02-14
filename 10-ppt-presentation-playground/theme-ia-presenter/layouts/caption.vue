<script setup lang="ts">
defineProps({
  background: { type: String, default: '' },
})
</script>

<template>
  <div
    class="slidev-layout ia-caption"
    :style="background ? { backgroundColor: background } : {}"
  >
    <div class="ia-caption-image">
      <slot name="image" />
    </div>
    <div class="ia-caption-text">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ia-caption {
  background-color: var(--ia-slide-bg, #00A8FF);
  padding: 60px 70px 50px 70px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ia-caption-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 0;
}

.ia-caption-image :deep(img) {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 6px;
}

.ia-caption-text {
  flex-shrink: 0;
  padding-top: 1rem;
  text-align: left;
}

.ia-caption-text :deep(p) {
  font-size: 1.1em;
  line-height: 1.5;
}

/* Portrait viewport */
@media (max-aspect-ratio: 1/1) {
  .ia-caption {
    padding: 50px 40px 35px 40px;
  }
}
</style>
