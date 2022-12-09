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
    redirect: '/game',
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
  {
    path: '/match/add',
    name: 'MatchAdd',
    component: () => import('@/pages/match/add.vue'),
  },
  {
    path: '/game/add',
    name: 'GameAdd',
    component: () => import('@/pages/game/Add.vue'),
    props: (route) => ({ matchId: Number(route.query.matchId), matchName: route.query.matchName }),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
