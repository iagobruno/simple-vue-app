<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import { RouterView } from 'vue-router'
import Loading from './components/Loading.vue'
import ErrorComp from './components/Error.vue'

const error = ref<null | Error>(null)

onErrorCaptured((er) => {
  error.value = er
})
</script>

<template>
  <div v-if="error">
    <ErrorComp :message="error.message" />
  </div>

  <Suspense v-else>
    <template #fallback>
      <Loading />
    </template>

    <template #default>
      <RouterView />
    </template>
  </Suspense>
</template>

<style scoped></style>
