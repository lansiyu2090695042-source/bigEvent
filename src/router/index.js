
import { createRouter, createWebHistory } from 'vue-router'

// createRouter 创建路由实例
// 配置history模式
// 1.history模式： createRouter 地址栏c带#
// 2.hasg模式： createWebHashHistory 地址栏带#
// 两者区别： 地址栏带不带#m
const router = createRouter({
  base: '/', // 这个就是括号里的内容就是跳转名字的前缀 改成‘/jd’ 地址栏就是xxxx/jd/home
  // 里面的import是vite里面的环境变量 import.meta.env.BASE_URL
  history: createWebHistory(import.meta.env.BASE_URL),  // 括号里的内容就是跳转名字的前缀 例如‘/jd’ 跳转到home就是xxxx/jd/home
  routes: [
    {
      path: '/login', component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/acticle/manage',
      children: [
      {
        path: '/article/manage',
        component: () => import('@/views/article/ArticleManage.vue')
      },
      {
        path: '/article/channel',
        component: () => import('@/views/article/ArticleChannel.vue')
      },
      {
        path: '/user/avatar',
        component: () => import('@/views/user/UserProfile.vue')
      },
      {
        path: '/user/profile',
        component: () => import('@/views/user/UserAvatar.vue')
      },
      {
        path: '/user/password',
        component: () => import('@/views/user/UserPassword.vue')
      }
    ]
    }
  ]
})

export default router
