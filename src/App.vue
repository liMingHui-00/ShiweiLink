<script setup>
import { useUserStore } from '@/stores'
const userStore = useUserStore()
</script>

<template>
  <h3>我是app组件</h3>
  <h3>{{ userStore.token }}</h3>
  <el-button @click="userStore.setToken('Bearer sadagdghagh')">登录</el-button>
  <el-button @click="userStore.removeToken()">退出</el-button>
  <router-view></router-view>
</template>

<style scoped></style>
