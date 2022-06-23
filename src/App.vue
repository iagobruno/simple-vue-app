<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Loading from './components/Loading.vue'
import ErrorComp from './components/Error.vue'

const route = useRoute()

let error = $ref<Error | null>(null)
onErrorCaptured((er) => {
  error = er
})
</script>

<template>
  <div v-if="error">
    <ErrorComp :message="error.message" />
  </div>

  <RouterView v-else v-slot="{ Component }">
    <Suspense :key="route.path">
      <component :is="Component" />

      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </RouterView>
</template>
