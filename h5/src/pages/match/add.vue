<template>
  <van-nav-bar title="创建赛事" left-text="返回" left-arrow @click-left="onClickLeft" />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="form.name"
        name="赛事名称"
        label="赛事名称"
        placeholder="请输入赛事名称"
        :rules="[{ required: true, message: '请填写赛事名称' }]"
      />
      <van-field
        v-model="form.logo"
        type="password"
        name="图标"
        label="图标"
        placeholder="图标"
        :rules="[{ required: true, message: '请填写图标' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit"> 提交 </van-button>
    </div>
  </van-form>
</template>
<script setup lang="ts">
import router from '@/router'
import { reactive } from 'vue'

const form = reactive({
  name: '',
  logo: '',
})

function onClickLeft() {
  router.back()
}
function onSubmit() {}
</script>
