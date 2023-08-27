import axios from 'axios'
import { useUserStore } from '@/stores'
import router from '@/router'
import { ElMessage } from 'element-plus'
const baseURL = 'http://big-event-vue-api-t.itheima.net'
const instance = axios.create({
  // todo 基地址  超时时间
  baseURL,
  timeout: 1000
})
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // todo 携带token
    if (useUserStore.token) {
      // 有token 存到请求头中
      config.headers.Authorization = useUserStore.token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // todo 处理业务失败  摘取核心响应数据
    if (response.data.code === 0) {
      return response
    }
    ElMessage({
      message: response.data.message || '服务异常',
      type: 'error'
    })
    return Promise.reject(response.data)
  },
  function (error) {
    // todo 处理401
    // 特殊错误 token过期或者权限不足
    if (error.response?.status === 401) {
      router.puth('/login')
    }
    // 默认错误
    ElMessage({
      message: error.response.message || '服务异常',
      type: 'error'
    })
    return Promise.reject(error)
  }
)
export default instance
export { baseURL }
