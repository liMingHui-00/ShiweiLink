<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { userRegisterService, userLoginService } from '@/api/user'
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
// 控制登录还是注册的页面显示
const isRegister = ref(false)
// 整个用于提交的form数据对象 与rules一同绑定在el-form身上
const ruleForm = ref({
  username: '',
  password: '',
  repassword: ''
})
// 整个表单的校验规则
const rules = {
  // 与ruleForm里面的数据名字一致
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 10,
      message: '用户名必须是5-10位',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      // 正则
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符'
    }
  ],
  repassword: [
    {
      required: true,
      message: '请输入确定密码',
      trigger: 'blur'
    },
    {
      // 正则
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符'
    },
    {
      validator: (rule, value, callback) => {
        // 判断value和当前的form中收集的password是否一致
        if (value !== ruleForm.value.password) {
          callback(new Error('两次输入的密码不一致，请再次输入...'))
        } else {
          callback() //成功
        }
      }
    }
  ]
}
// 获取form
const form = ref()
const register = async () => {
  // 注册成功之前  先进行校验
  await form.value.validate()
  // 成功=> 请求
  await userRegisterService(ruleForm.value)
  ElMessage.success('注册成功')
  // 变成登录页面
  isRegister.value = !isRegister.value
}
const userStore = useUserStore()
const login = async () => {
  await form.value.validate()
  // 开始登录
  const {
    data: { token }
  } = await userLoginService(ruleForm.value)
  // 设置token
  userStore.setToken(token)
  ElMessage.success('登录成功')
  useRouter().push('/')
}

watch(isRegister, () => {
  ruleForm.value = {
    password: '',
    username: '',
    repassword: ''
  }
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form
        ref="form"
        size="large"
        :model="ruleForm"
        :rules="rules"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <!-- v-model 绑定form的子属性  prop  配置生效的是哪个校验规则  与rule中的字段一致 -->
          <el-input
            :prefix-icon="User"
            v-model="ruleForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            v-model="ruleForm.repassword"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            @click="register"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form
        ref="form"
        size="large"
        :model="ruleForm"
        :rules="rules"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            v-model="ruleForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            v-model="ruleForm.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            @click="login"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
