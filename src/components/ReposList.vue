<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { getUserRepos } from '../services/githubApi'
import StarsCounter from './StarsCounter.vue'

const props = defineProps<{
  username: string
}>()

const repos = await getUserRepos(props.username)
</script>

<template>
  <strong class="repos-list__title">Repositories:</strong>

  <ul class="repos-list">
    <li v-for="repo in repos" class="repos-list__item" :key="repo.id">
      <img
        class="repos-list__item__icon"
        :src="`/icons/${repo.fork ? 'fork' : 'repo'}.svg`"
        alt=""
      />
      <RouterLink :to="`/view/${props.username}/${repo.name}`">{{
        repo.name
      }}</RouterLink>
      <StarsCounter :number="repo.stargazers_count" :showLabel="false" />
    </li>
  </ul>
</template>

<style scoped>
.loading-repos {
  margin: 30px 0 0;
  width: 50%;
}
.repos-list__title {
  align-self: flex-start;
  font-size: 18px;
  margin: 0 0 16px;
}
.repos-list {
  --border-color: rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  position: relative;
  width: 100%;
  margin: 0px 0 0;
  list-style: none;
}
.repos-list__item {
  padding: 12px 16px 16px;
  display: flex;
  align-items: center;
}
.repos-list__item:not(:last-child) {
  border-bottom: 1px solid var(--border-color);
}
.repos-list__item__icon {
  width: 18px;
  height: 18px;
  opacity: 0.6;
  margin-right: 10px;
  margin-top: 4px;
}
.repos-list__item a {
  margin-right: auto;
}
</style>
