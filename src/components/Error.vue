<script setup lang="ts">
const props = defineProps<{
  title?: string
  message: string
}>()
</script>

<template>
  <div class="page page--error">
    <strong>{{ props.title ?? '🚨 ERROR' }}</strong>
    <p>{{ props.message }}</p>
  </div>
</template>

<style scoped>
.page--error {
  font-size: 18px;
  text-align: center;
  /* color: red; */
}
.page--error strong {
  font-size: 22px;
  margin-bottom: 4px;
}
</style>
