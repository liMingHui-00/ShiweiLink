import request from '../utils/request'
// 增加文章分类
export const addArticleService = ({ cate_name, cate_alias }) => {
  return request.post('/my/cate/add', { cate_name, cate_alias })
}
// 获取文章分类
export const getArticleService = () => {
  return request.get('/my/cate/list')
}
