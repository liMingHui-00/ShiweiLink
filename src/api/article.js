import request from '../utils/request'
// 添加文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)
// 编辑文章分类
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)
// 获取文章分类
export const getArticleService = () => {
  return request.get('/my/cate/list')
}
//删除文章分类
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })
//////////////////////////////////////////
// 获取文章列表
export const artGetListService = (params) =>
  request.get('/my/article/list', { params })
// 添加文章管理

export const artPublishService = (data) => request.post('/my/article/add', data)
//获取文章详情
export const artGetDetailService = (id) =>
  request.get('my/article/info', { params: { id } })
//编辑文章功能
export const artEditService = (data) => request.put('my/article/info', data)
//文章删除
export const artDelService = (id) =>
  request.delete('my/article/info', { params: { id } })
