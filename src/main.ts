import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './pages/Home.vue'
import ProfilePage from './pages/Profile.vue'
import RepoPage from './pages/Repo.vue'
import './global.css'

const routes = [
  { path: '/', component: HomePage },
  { path: '/view/:username', component: ProfilePage },
  { path: '/view/:username/:reponame', component: RepoPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
