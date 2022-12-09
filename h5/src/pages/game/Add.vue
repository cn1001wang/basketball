<template>
  <van-nav-bar
    title="创建比赛"
    :left-text="tick ? '上一步' : '取消'"
    :right-text="tick ? '开始' : '下一步'"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onSubmit"
  />
  <!-- <van-form @submit="onSubmit">
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
  </van-form> -->
</template>
<script setup lang="ts">
import router from '@/router'
import { reactive, ref, defineProps } from 'vue'
import { matchApi } from '@/service/api/index.js'
import { showToast } from 'vant'
import dayjs from 'dayjs'
import 'vant/es/toast/style'

const props = defineProps({
  matchId: Number,
  matchName: String,
})

const tick = ref(0)

const form = reactive({
  match: props.matchId,
  dateTime: dayjs().format('YYYY-MM-DD HH:mm'),
  rule: null,
  place: null,
  teama: '',
  teamb: '',
})

function onClickLeft() {
  router.back()
}
async function onSubmit() {
  // 第一步
  if (tick.value == 0) {
    if (!form.teama || !form.teamb) {
      return showToast({ type: 'fail', message: '请选择比赛队伍' })
    }
    tick.value = 1
  } else {
  }
  var res = await matchApi.saveMatch(form)

  showToast({ type: 'success', message: '创建成功！' })
  router.back()
}
</script>
