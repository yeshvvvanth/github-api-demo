import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Repo from '@/views/RepoPage.vue'
import Page404 from '@/views/Page404.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/:id',
    name: 'repo-list',
    component: Repo
  },
  {
    path: '/:id/*',
    name: 'repo-detail',
    component: Repo
  },
  {
    path: '/history',
    name: 'history',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HistoryPage.vue')
  },
  {
    path:'*',
    component: Page404
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
