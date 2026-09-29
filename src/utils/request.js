import axios from 'axios'
import { useUserStore } from '@/stores'
import  router  from '@/router/index'
import { ElMessage } from 'element-plus'

const baseURL = ''

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore()
    if(userStore.token) {
      //console.log('发送请求的 token：', userStore.token)
      config.headers.Authorization =  userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)
// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    if(
      res.data.code === 0
    ) {
      return res.data
    }
    ElMessage.error(res.data.message || '服务异常')
    // 处理业务失败 给错误提示
    return Promise.reject(res.data)
  },
  (err) => {
    // 错误的特使情况 401
    if (err.response?.status === 401) {
      router.push('/login')
    }
    // 错误的默认情况
    ElMessage.error(err.response?.data?.message || '服务异常')
    // TODO 5. 处理401错误
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
