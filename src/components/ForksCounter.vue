<script setup lang="ts">
const props = defineProps<{
  iconSize?: number | string
  showLabel?: boolean
  number: number
}>()
</script>

<template>
  <div class="forks-counter">
    <img
      src="/icons/fork.svg"
      alt=""
      :width="props.iconSize"
      :height="props.iconSize"
    />
    {{ number }}
    <span v-if="props.showLabel">Fork{{ number === 1 ? '' : 's' }}</span>
  </div>
</template>

<style scoped>
.forks-counter {
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
