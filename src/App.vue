 <script setup>
import { useRouter, useRoute } from 'vue-router'
import TestVue from './components/testVue.vue'
import { useUserStore, useCountStore } from '@/stores/index.js'
// 获取路由对象 router useRouter
const router = useRouter()
// 获取路由参数 route useRoute
const route = useRoute()

const golist = () => {
  router.push('/list')
  console.log( route, router)
}
const userStore = useUserStore()
const countStore = useCountStore()
</script>

<template>
<div>
  <router-view></router-view>
  <hr>
  <hr>
  <el-button @click="$router.push('/home')">点击按钮跳转到home</el-button>
  <el-button @click="golist">点击按钮进行跳转</el-button>
  <test-vue></test-vue>
  <p>{{ userStore.token }}</p>
  <el-button @click="userStore.setToken('dasdjjkadka')" type="primary">登录</el-button>
  <el-button @click="userStore.removeToken('')" type="success">退出</el-button>
  <hr>
  {{ countStore.count }}
  <el-button @click="countStore.add(10)" >加法</el-button>

</div>
</template>

<style></style>
