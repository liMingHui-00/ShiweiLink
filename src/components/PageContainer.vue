<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>
<template>
  <el-card class="page-container">
    <div class="header">
      <span>{{ title }}</span>
      <div class="extra">
        <slot name="extra"></slot>
      </div>
    </div>

    <slot></slot>
  </el-card>
</template>
<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
