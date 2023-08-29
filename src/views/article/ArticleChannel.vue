<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel"> 添加分类 </el-button>
    </template>
    <!-- 主体部分 -->
    <el-table :data="articleList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <ChannelEdit @success="onSuccess" ref="dialog"></ChannelEdit>
  </PageContainer>
</template>

<script setup>
import { getArticleService } from '@/api/article'
import { nextTick, onMounted, ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
const articleList = ref([])
const dialog = ref()
onMounted(async () => {
  const res = await getArticleService()
  articleList.value = res.data.data
  // console.log(articleList.value)
})
const onSuccess = () => {
  nextTick(async () => {
    const res = await getArticleService()
    articleList.value = res.data.data
  })
}
// 文章分类按钮
const onAddChannel = () => {
  dialog.value.open({})
}
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onDelChannel = (row) => {
  console.log(row)
}
</script>

<style lang="scss" scoped></style>
