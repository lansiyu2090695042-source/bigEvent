import { defineStore } from 'pinia'
import { ref } from 'vue'

//数字计数器模块
export const useCountStore = defineStore('countStore', () => {
  const count = ref(100)
  const add = (newValue) => {
    count.value += newValue
  }
  return {
    count,
    add
  }
}
)