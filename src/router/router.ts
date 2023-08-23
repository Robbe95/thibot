import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import type { Component } from 'vue'
import { routeNames } from './routes.type'
import { authMiddleware } from '@/middleware/auth.middleware'
import { cookiesMiddleware } from '@/middleware/cookies.middleware'

export const routes: RouteRecordRaw[] = [
  {
    path: '/v1',
    component: (): Promise<Component> => import('../layouts/MainLayout.vue'),
    name: routeNames.MAIN,
    children: [
      {
        component: (): Promise<Component> => import('../modules/chat/views/ChatView.vue'),
        name: routeNames.INDEX,
        path: '',
      },
    ],
  },
  {
    path: '/v2',
    component: (): Promise<Component> => import('../layouts/MainLayoutV2.vue'),
    name: routeNames.MAIN_V2,
    children: [
      {
        component: (): Promise<Component> => import('../modules/chat/views/ChatViewV2.vue'),
        name: routeNames.INDEX_V2,
        path: '',
      },
    ],
  },
  {
    path: '',
    redirect: { name: routeNames.INDEX },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  authMiddleware(next)
  cookiesMiddleware()
})

export default router
