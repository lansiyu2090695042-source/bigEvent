import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
// createRouter 创建路由实例
// 配置history模式
// 1.history模式： createRouter 地址栏不带#
// 2.hash模式： createWebHashHistory 地址栏带#
// 两者区别： 地址栏带不带#
const router = createRouter({
  base: '/', // 这个就是括号里的内容就是跳转名字的前缀 改成‘/jd’ 地址栏就是xxxx/jd/home
  // 里面的import是vite里面的环境变量 import.meta.env.BASE_URL
  history: createWebHistory(import.meta.env.BASE_URL), // 括号里的内容就是跳转名字的前缀 例如‘/jd’ 跳转到home就是xxxx/jd/home
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue'), // 登陆页
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage', // 重定向到子路由
      children: [
        {
          path: 'article/manage',
          component: () => import('@/views/article/ArticleManage.vue'),
        },
        {
          path: 'article/channel',
          component: () => import('@/views/article/ArticleChannel.vue'),
        },
        {
          path: 'user/avatar',
          component: () => import('@/views/user/UserAvatar.vue'),
        },
        {
          path: 'user/profile',
          component: () => import('@/views/user/UserProfile.vue'),
        },
        {
          path: 'user/password',
          component: () => import('@/views/user/UserPassword.vue'),
        },
      ],
    },
  ],
})

// 登陆访问拦截 => 默认值是直接放行的
// 根据返回值决定是放行还是拦截
// 返回值
// 1.undefined / true 直接放行
// 2.false 返回form地址页面
// 3.具体地址 或 路径对象 拦截到对应地址
router.beforeEach((to) => {
  // 如果没有token且访问的是非登陆页，拦截到登陆,其他情况放行
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})

export default router
