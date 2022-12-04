import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/pages/login/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home/Home.vue'),
    children: [
      {
        path: 'game',
        name: 'game',
        component: () => import('@/pages/game/Game.vue'),
      },
      {
        path: 'team',
        name: 'team',
        component: () => import('@/pages/team/Team.vue'),
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/pages/setting/Setting.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
