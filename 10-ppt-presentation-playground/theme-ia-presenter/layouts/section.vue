<script setup lang="ts">
defineProps({
  background: { type: String, default: '#382CFF' },
})
</script>

<template>
  <div
    class="slidev-layout ia-section"
    :style="{ backgroundColor: background }"
  >
    <div class="ia-section-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ia-section {
  padding: 80px 70px 50px 70px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ia-section-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  max-width: 75%;
}

.ia-section-content :deep(h3) {
  font-size: 2em;
  margin-bottom: 0.4em;
}

.ia-section-content :deep(p) {
  font-size: 1.25em;
  line-height: 1.5;
  opacity: 0.9;
}

/* Portrait viewport */
@media (max-aspect-ratio: 1/1) {
  .ia-section {
    padding: 60px 50px 40px 50px;
  }

  .ia-section-content {
    max-width: 90%;
  }
}
</style>
