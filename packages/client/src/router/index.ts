import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/DocView',
      name: 'DocView',
      component: () => import('../views/DocView.vue'),
      redirect: 'Intro',
      children: [
        {
          path: '/uploadLargeFile',
          name: 'UploadLargeFile',
          component: () => import('../views/UploadLargeFile/index.vue')
        },
        {
          path: '/H5Camera',
          name: 'H5Camera',
          component: () => import('../views/H5Camera/index.vue')
        },
        {
          path: '/EffectScope',
          name: 'EffectScope',
          component: () => import('../views/EffectScope/index.vue')
        },
        {
          path: '/CssAnimation',
          name: 'CssAnimation',
          component: () => import('../views/CssAnimation/demo.vue')
        },
        {
          path: '/GhostInput',
          name: 'GhostInput',
          component: () => import('../views/GhostInput/index.vue')
        },
        {
          path: '/FaceApi',
          name: 'FaceApi',
          component: () => import('../views/FaceApi/index.vue')
        },
        {
          path: '/VirtualScroll',
          name: 'VirtualScroll',
          component: () => import('../views/VirtualScroll/index.vue')
        },
        {
          path: '/Intro',
          name: 'Intro',
          component: () => import('../views/UserGuide/intro.vue')
        },
        {
          path: '/AnimateLogo',
          name: 'AnimateLogo',
          component: () => import('../views/AnimateLogo/index.vue')
        },
        {
          path: '/Wave',
          name: 'Wave',
          component: () => import('../views/Wave/index.vue')
        },
        {
          path: '/SvgA',
          name: 'SvgA',
          component: () => import('../views/SvgA/index.vue')
        },
        {
          path: '/WeChatShare',
          name: 'WeChatShare',
          component: () => import('../views/WeChatShare/index.vue')
        },
        {
          path: '/IconComponents',
          name: 'IconComponents',
          component: () => import('../views/IconComponents/index.vue')
        },
        {
          path: '/VueQuery',
          name: 'VueQuery',
          component: () => import('../views/VueQuery/index.vue')
        }
      ]
    },

    // 404路由处理
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/Features/404.vue')
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404'
    }
  ]
})

export default router
