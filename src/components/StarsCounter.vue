<script setup lang="ts">
const props = defineProps<{
  iconSize?: number
  showLabel?: boolean
  number: number
}>()
</script>

<template>
  <div class="stars-counter">
    <img
      src="/icons/star.svg"
      alt=""
      :width="props.iconSize"
      :height="props.iconSize"
    />
    {{ number }}
    <span v-if="props.showLabel">Star{{ number === 1 ? '' : 's' }}</span>
  </div>
</template>

<style scoped>
.stars-counter {
  display: flex;
  align-items: center;
  opacity: 0.8;
}
.stars-counter > img {
  margin-right: 4px;
  margin-top: 2px;
}
</style>
