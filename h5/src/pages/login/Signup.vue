<template>
  <div class="py-5">
    <h1 class="text-center py-2">新用户注册</h1>
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
      <van-field
        v-model="form.passwordConfirm"
        name="passwordConfirm"
        label="确认密码"
        placeholder="请再输入一遍密码"
        type="password"
      />
      <div class="py-4"></div>
      <van-button type="success" block @click="submit">注册新用户</van-button>
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
  passwordConfirm: '',
})

async function submit() {
  if (!form.username) {
    return showToast({ type: 'fail', message: '请输入用户名' })
  }
  if (!form.password) {
    return showToast({ type: 'fail', message: '请输入密码' })
  }
  if (form.password.length < 6) {
    return showToast({ type: 'fail', message: '请输入超过六位的密码' })
  }
  if (form.password != form.passwordConfirm) {
    return showToast({ type: 'fail', message: '两次密码输入不一致' })
  }
  var res: any = await userApi.signup(form)

  showToast({ type: 'success', message: '注册成功！' })
  //   localStorage.setItem('token', res.token)
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.test {
  color: $test-color;
}
</style>
