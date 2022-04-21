<script setup lang="ts">
import { useRoute } from 'vue-router'
import ghApi from '../services/githubApi'
import ReposList from '../components/ReposList.vue'

const { username } = useRoute().params as Record<string, string>

const user = (await ghApi.get(`/users/${username}`)) as any
</script>

<template>
  <div class="page page-profile">
    <div class="avatar__wrapper">
      <img class="avatar" :src="user.avatar_url" alt="" />
      <div class="gh-badge"></div>
    </div>
    <div class="username">@{{ user.login }}</div>
    <h2 class="name">{{ user.name }}</h2>
    <div class="company" v-if="user.company">Works on {{ user.company }}</div>
    <div class="infos-row">
      <div class="infos-row__col">
        <strong>{{ user.followers }}</strong>
        <span>Followers</span>
      </div>
      <div class="infos-row__col">
        <strong>{{ user.following }}</strong>
        <span>Following</span>
      </div>
      <div class="infos-row__col">
        <strong>{{ user.public_repos }}</strong>
        <span>Repositories</span>
      </div>
    </div>
    <p class="bio" v-if="user.bio">{{ user.bio }}</p>
    <a
      v-if="user.blog"
      class="website"
      :href="user.blog"
      target="_blank"
      rel="noopener noreferrer"
      >{{ user.blog }}</a
    >
    <Suspense>
      <template #fallback>
        <progress class="loading-repos matter-progress-linear"></progress>
      </template>
      <ReposList :username="username" />
    </Suspense>
    <a
      :href="`https://github.com/` + user.login"
      class="matter-button-outlined"
      target="_blank"
      rel="noopener noreferrer"
      >VIEW FULL PROFILE ON GITHUB</a
    >
  </div>
</template>

<style scoped>
.page--loading progress {
  width: 60px;
  height: 60px;
}
.page-profile {
  padding: 60px 20px;
}
.avatar__wrapper {
  --size: 124px;
  height: var(--size);
  width: var(--size);
  position: relative;
  margin-bottom: 10px;
}
.avatar {
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: block;
  width: 100%;
  height: 100%;
}
.gh-badge {
  background: url(/icons/github.svg) center no-repeat;
  background-color: white;
  background-size: cover;
  border: 1.6px solid white;
  border-radius: 50%;
  height: 28px;
  width: 28px;
  position: absolute;
  bottom: 3px;
  right: 7px;
}
.username {
  opacity: 0.7;
  font-size: 15px;
}
.name {
  font-size: 28px;
  font-weight: bold;
  margin: -2px 0 0;
}
.company {
  margin: 8px 0 2px;
}
.company::before {
  background: url(/icons/org.svg) no-repeat center;
  background-size: contain;
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 6px;
}
.infos-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 20px 0 24px;
  font-size: 15px;
}
.infos-row__col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* .infos-row__col > span {
    font-size: 14px;
  } */
.bio {
  text-align: center;
  margin: 0 0 24px;
}
.website {
  display: flex;
  align-items: center;
  font-size: 16px;
  margin: -10px 0 24px;
}
.website::before {
  background: url(/icons/link.svg) no-repeat center;
  background-size: contain;
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 6px;
}
a.matter-button-outlined {
  text-decoration: none;
  margin: 34px 0 0;
}
</style>
