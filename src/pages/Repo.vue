<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import ghApi from '../services/githubApi'
import { parse as parseMarkdown } from 'marked'
import StarsCounter from '../components/StarsCounter.vue'
import ForksCounter from '../components/ForksCounter.vue'
import IssuesCounter from '../components/IssuesCounter.vue'
import PullsCounter from '../components/PullsCounter.vue'

const { username, reponame } = useRoute().params as Record<string, string>

const repo = (await ghApi.get(`/repos/${username}/${reponame}`)) as any
const readme = (await ghApi
  .get(`/repos/${username}/${reponame}/readme`, {
    headers: {
      Accept: 'application/vnd.github.VERSION.raw',
    },
  })
  .then((markdown) => parseMarkdown(markdown))) as any
</script>

<template>
  <div class="page page--repo">
    <div class="repo__header">
      <RouterLink class="repo__owner" :to="`/view/${repo.owner.login}`">
        <img :src="repo.owner.avatar_url" alt="" />
        {{ repo.owner.login }}
      </RouterLink>
      <a
        class="repo__name"
        :href="repo.html_url"
        target="_blank"
        rel="noopener noreferrer"
        >{{ repo.name }}</a
      >
      <div v-if="repo.fork" class="repo_forkinfo">
        forked from
        <RouterLink :to="`/view/${repo.parent.full_name}/`">{{
          repo.parent.full_name
        }}</RouterLink>
      </div>
      <p v-if="repo.description" class="repo__description">
        {{ repo.description }}
      </p>
      <a
        v-if="repo.homepage"
        class="repo__website"
        :href="repo.homepage"
        target="_blank"
        rel="noopener noreferrer"
        >{{ repo.homepage }}</a
      >

      <div class="counters-row">
        <StarsCounter :number="repo.stargazers_count" iconSize="16" showLabel />
        <ForksCounter :number="repo.forks_count" iconSize="16" showLabel />
        <IssuesCounter
          :number="repo.open_issues_count"
          iconSize="16"
          showLabel
        />
        <PullsCounter
          :number="repo.open_issues_count"
          iconSize="16"
          showLabel
        />
      </div>

      <a
        :href="repo.html_url"
        class="matter-button-outlined repo__open"
        target="_blank"
        rel="noopener noreferrer"
        >VIEW REPO ON GITHUB</a
      >
    </div>

    <div
      v-if="readme"
      class="repo__readme markdown-body"
      id="readme"
      v-html="readme"
    ></div>
  </div>
</template>

<style scoped>
.page--repo {
  padding: 0 0 30px;
  align-items: flex-start;
  justify-content: flex-start;
}
.repo__header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  width: inherit;
}
.repo__owner {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.repo__owner > img {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-right: 6px;
}
.repo__name {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 8px;
}
.repo_forkinfo {
  opacity: 0.9;
  margin: -6px 0 8px;
}
.repo_forkinfo::before {
  background: url(/icons/fork.svg) no-repeat center;
  background-size: contain;
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 6px;
}
.repo__description {
  font-size: 15px;
  margin-bottom: 6px;
}
.repo__website {
  font-size: 15px;
}
.repo__website::before {
  background: url(/icons/link.svg) no-repeat center;
  background-size: contain;
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 6px;
}
.counters-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 6px;
  column-gap: 20px;
  row-gap: 6px;
}
.repo__open {
  width: inherit;
  margin-top: 16px;
}
.repo__readme {
  padding: 20px 0px;
  font-size: 16px;
  line-height: normal;
  max-width: 100%;
}
@media (max-width: 600px) {
  .repo__readme {
    padding: 20px 20px;
    font-size: 14px;
  }
  .repo__header {
    padding: 24px 22px;
  }
}
</style>
