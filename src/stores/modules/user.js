import { userGetInfoService } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

//用户模块 setToken token removeToken
export const useUserStore = defineStore('userStore', () => {
  const token = ref('')
  const setToken = (newToken) => {
    token.value = newToken
    // console.log('点击了')
  }
  const removeToken = () => {
    token.value = ''
  }

  const user = ref({})
  const getUser = async () => {
    const res = await userGetInfoService() // 请求获取数据
    user.value = res.data
  }
  const setUser = (obj) => {
    user.value = obj
  }
  return {
    token,
    setToken,
    removeToken,
    user,
    getUser,
    setUser
  }
},
{
  persist: true
})
