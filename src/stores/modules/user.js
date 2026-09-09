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
  return {
    token,
    setToken,
    removeToken
  }
},
{
  persist: true
})