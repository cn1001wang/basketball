<template>
  <van-nav-bar
    title="创建赛事"
    left-text="返回"
    right-text="存储"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onSubmit"
  />
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
    <!-- <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit"> 提交 </van-button>
    </div> -->
  </van-form>
</template>
<script setup lang="ts">
import router from '@/router'
import { reactive } from 'vue'
import { matchApi } from '@/service/api/index.js'
import { showToast } from 'vant'
import 'vant/es/toast/style';

const form = reactive({
  name: '',
  logo: '',
})

function onClickLeft() {
  router.back()
}
async function onSubmit() {
  if (!form.name) {
    return showToast({ type: 'fail', message: '请输入赛事名' })
  }
  var res = await matchApi.saveMatch(form)

  showToast({ type: 'success', message: '创建成功！' })
  router.back()
}
</script>
