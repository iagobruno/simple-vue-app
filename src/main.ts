import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import Profile from './pages/Profile.vue'
import './global.css'

const routes = [
  { path: '/', component: Home },
  { path: '/view/:username', component: Profile },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
