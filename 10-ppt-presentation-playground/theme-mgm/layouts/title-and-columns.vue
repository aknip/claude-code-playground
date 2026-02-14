<script setup lang="ts">
defineProps({
  background: { type: String, default: '' },
})
</script>

<template>
  <div
    class="slidev-layout ia-title-and-columns"
    :style="background ? { backgroundColor: background } : {}"
  >
    <div class="ia-tac-title">
      <slot />
    </div>
    <div class="ia-tac-columns">
      <slot name="columns" />
    </div>
  </div>
</template>

<style scoped>
.ia-title-and-columns {
  background-color: var(--ia-slide-bg, #00A8FF);
  padding: 80px 70px 50px 70px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ia-tac-title {
  flex-shrink: 0;
  margin-bottom: 1.5rem;
}

.ia-tac-columns {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  min-height: 0;
}

.ia-tac-columns :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 6px;
}

/* Portrait viewport: stack columns */
@media (max-aspect-ratio: 1/1) {
  .ia-title-and-columns {
    padding: 60px 50px 40px 50px;
  }

  .ia-tac-title {
    margin-bottom: 1rem;
  }

  .ia-tac-columns {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
}
</style>
