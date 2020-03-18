import Vue from 'vue'
import Router from 'vue-router'
import Routes from './routes-config'

Vue.use(Router)

const router = new Router({
  routes: Routes,
  base: process.env.BASE_URL,
  mode: 'history'
})

export default router
