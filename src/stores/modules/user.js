import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userGetInfoService } from '@/api/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    // 设置token
    const setToken = (newToken) => {
      token.value = newToken
    }
    // 清除token
    const removeToken = () => {
      token.value = ''
    }
    // 存储用户个人信息
    const user = ref({})
    const userInfo = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    const userSet = (obj) => {
      user.value = obj
    }
    return { token, userSet, setToken, removeToken, userInfo, user }
  },
  {
    persist: true //开启持久化
  }
)
