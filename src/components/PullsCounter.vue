<script setup lang="ts">
const props = defineProps<{
  iconSize?: number | string
  showLabel?: boolean
  number: number
}>()
</script>

<template>
  <div class="pulls-counter">
    <img
      src="/icons/pull.svg"
      alt=""
      :width="props.iconSize"
      :height="props.iconSize"
    />
    {{ number }}
    <span v-if="props.showLabel">Pull{{ number === 1 ? '' : 's' }}</span>
  </div>
</template>

<style scoped>
.pulls-counter {
  display: flex;
  align-items: center;
  opacity: 0.8;
}
img {
  margin-right: 4px;
  margin-top: 2px;
}
span {
  margin-left: 2px;
}
</style>
