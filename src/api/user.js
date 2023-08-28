import request from '@/utils/request'
// 注册
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}
// 登录
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}
