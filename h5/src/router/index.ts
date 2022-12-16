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
        meta: { tab: 0 },
      },
      {
        path: 'team',
        name: 'team',
        component: () => import('@/pages/team/Team.vue'),
        meta: { tab: 1 },
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/pages/setting/Setting.vue'),
        meta: { tab: 2 },
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
    props: (route) => ({ matchId: route.query.matchId, matchName: route.query.matchName }),
  },
  {
    path: '/team/add',
    name: 'TeamAdd',
    component: () => import('@/pages/team/Add.vue'),
  },
  {
    path: '/team/edit',
    name: 'TeamEdit',
    component: () => import('@/pages/team/Add.vue'),
    props: (route) => ({ teamId: route.query.teamId }),
  },
  {
    path: '/team/detail/:id',
    name: 'TeamDetail',
    component: () => import('@/pages/team/Detail.vue'),
    props: true,
  },
  {
    path: '/player/add',
    name: 'PlayerAdd',
    component: () => import('@/pages/player/Add.vue'),
    props: (route) => ({ teamId: route.query.teamId, playerId: route.query.playerId }),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
