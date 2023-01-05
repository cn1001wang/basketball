<template>
  <div class="py-5">
    <h1 class="text-center py-2">用户登陆</h1>
    <van-cell-group inset>
      <van-field
        v-model="form.username"
        name="username"
        label="用户名"
        placeholder="请输入用户名"
      />
      <van-field
        v-model="form.password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        type="password"
      />
      <div class="py-4"></div>
      <van-button type="primary" block @click="submit">登录</van-button>
      <div class="py-4"></div>
      <van-button block @click="tosignup">注册</van-button>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { showToast } from '@/utils/index.js'
import { reactive } from 'vue'
import { userApi } from '@/service/api'
import router from '@/router'
const form = reactive({
  username: '',
  password: '',
})

async function submit() {
  if (!form.username) {
    return showToast({ type: 'fail', message: '请输入用户名' })
  }
  if (!form.password) {
    return showToast({ type: 'fail', message: '请输入密码' })
  }
  var res: any = await userApi.login(form)

  showToast({ type: 'success', message: '登录成功！' })
  localStorage.setItem('token', res.token)
  router.push('/')
}
function tosignup() {
  router.push('/signup')
}
</script>

<style lang="scss" scoped>
.test {
  color: $test-color;
}
</style>
