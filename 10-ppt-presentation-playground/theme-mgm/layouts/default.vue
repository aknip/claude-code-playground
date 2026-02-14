<script setup lang="ts">
defineProps({
  background: { type: String, default: '' },
})
</script>

<template>
  <div
    class="slidev-layout ia-default"
    :style="background ? { backgroundColor: background } : {}"
  >
    <div class="ia-default-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ia-default {
  background-color: var(--ia-slide-bg, #00A8FF);
  padding: 80px 70px 50px 70px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ia-default-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

/* Portrait viewport */
@media (max-aspect-ratio: 1/1) {
  .ia-default {
    padding: 60px 50px 40px 50px;
  }
}
</style>
