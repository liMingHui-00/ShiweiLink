import { ref } from 'vue'
import { defineStore } from 'pinia'

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
    return { token, setToken, removeToken }
  },
  {
    persist: true //开启持久化
  }
)
