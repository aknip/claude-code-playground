<script setup lang="ts">
defineProps({
  background: { type: String, default: '#00A8FF' },
})
</script>

<template>
  <div
    class="slidev-layout cover"
    :style="{ backgroundColor: background }"
  >
    <div class="ia-cover-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.cover {
  padding: 80px 70px 50px 70px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ia-cover-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.ia-cover-content :deep(h5) {
  font-size: 1.15em;
  font-weight: 600;
  opacity: 0.9;
  margin-bottom: 0.35em;
  letter-spacing: 0.01em;
}

.ia-cover-content :deep(h1) {
  font-size: 3.5em;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 0.3em;
}

.ia-cover-content :deep(p) {
  font-size: 1.3em;
  opacity: 0.85;
}

/* Portrait viewport */
@media (max-aspect-ratio: 1/1) {
  .cover {
    padding: 50px 40px 35px 40px;
  }
}
</style>
