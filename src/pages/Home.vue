<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')

function handleSubmit() {
  location.hash = `/view/${username.value?.trim()}`
}
</script>

<template>
  <div class="page page--form">
    <img class="logo" src="/vue.svg" alt="Vue Logo" />
    <h1 class="title">GitHub Explorer</h1>
    <p class="description">Enter a GitHub username to see a profile preview.</p>

    <form @submit.prevent="handleSubmit">
      <label class="matter-textfield-outlined">
        <input
          type="text"
          name="gh-username"
          v-model="username"
          placeholder=" "
          minlength="1"
          maxlength="32"
          required
        />
        <span>GitHub username...</span>
      </label>

      <button
        type="submit"
        class="matter-button-contained"
        :disabled="!username.length"
      >
        VIEW PROFILE
      </button>
    </form>

    <p class="page--home__footer">
      Built with <a href="https://vuejs.org/">Vue</a> by
      <a href="https://github.com/iagobruno">Iago Bruno</a>.
    </p>
  </div>
</template>

<style scoped>
.page--form {
  text-align: center;
  max-width: 460px;
}
.logo {
  display: block;
  width: 160px;
  height: 160px;
}
.title {
  font-size: 38px;
  font-weight: 700;
  margin: 6px 0 0;
}
.description {
  margin: 8px 0 0;
  opacity: 0.76;
}
form {
  margin-top: 30px;
  display: block;
  width: 100%;
}
form label,
input {
  width: 100%;
}
form button {
  margin-top: 24px;
}
.page--home__footer {
  margin-top: 30px;
  margin-bottom: -30px;
  font-size: 14px;
}
</style>
