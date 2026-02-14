<script setup lang="ts">
defineProps({
  background: { type: String, default: '#264DFF' },
})
</script>

<template>
  <div
    class="slidev-layout ia-title"
    :style="{ backgroundColor: background }"
  >
    <div class="ia-title-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ia-title {
  padding: 80px 70px 50px 70px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ia-title-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.ia-title-content :deep(h2) {
  font-size: 3em;
}

.ia-title-content :deep(p) {
  font-size: 1.3em;
  opacity: 0.9;
}

/* Portrait viewport */
@media (max-aspect-ratio: 1/1) {
  .ia-title {
    padding: 60px 50px 40px 50px;
  }
}
</style>
