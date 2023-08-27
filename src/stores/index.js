import { createPinia } from 'pinia'
// 仓库持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
export const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
export * from './modules/user' //这里既做到了引入 也做到了导出
