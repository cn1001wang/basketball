<!--  -->
<template>
  <van-nav-bar
    title="创建比赛"
    left-text="取消"
    right-text="存储"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onSubmit"
  />
  <div>
    <van-cell-group inset>
      <van-field v-model="form.name" name="teamName" label="名字" placeholder="请输入名字" />
      <van-field v-model="form.logo" name="teamlogo" label="头像" placeholder="请输入头像" />
      <van-field
        v-model="form.contactPerson"
        name="teamContactPerson"
        label="联系人"
        placeholder="请输入联系人"
      />
      <van-field
        v-model="form.contactPhone"
        name="teamContactPhone"
        label="联系电话"
        placeholder="请输入联系电话"
      />
    </van-cell-group>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import { teamApi } from '@/service/api'
import { showToast } from 'vant/lib/toast'
import { reactive } from 'vue'

const form = reactive({
  name: '',
  logo: '',
  contactPerson: '',
  contactPhone: '',
})

function onClickLeft() {
  router.back()
}
async function onSubmit() {
  if (!form.name) {
    return showToast({ type: 'fail', message: '请输入队伍名' })
  }

  var res = await teamApi.save(form)

  showToast({ type: 'success', message: '创建成功！' })
  router.back()
}
</script>
<style lang="postcss" scoped></style>
