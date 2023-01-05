<!--  -->
<template>
  <van-nav-bar
    :title="props.playerId ? '编辑球员' : '新增球员'"
    left-text="返回"
    right-text="存储"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onSubmit"
  />
  <div class="main-bg pt-4">
    <van-cell-group inset>
      <van-field v-model="form.name" name="playerName" label="名字" placeholder="请输入名字" />
      <van-field
        v-model="form.number"
        name="playerNumber"
        label="号码"
        placeholder="请输入号码"
        type="number"
      />
      <van-field v-model="form.logo" name="playerLogo" label="头像" placeholder="请输入头像" />
      <van-field v-model="form.height" name="height" label="身高" placeholder="请输入身高" />
      <van-field v-model="form.weight" name="weight" label="体重" placeholder="请输入体重" />

      <van-field name="caption" label="是否队长">
        <template #input>
          <van-switch v-model="form.caption" />
        </template>
      </van-field>
      <van-field
        name="position"
        label="习惯位置"
        :model-value="activePosition"
        is-link
        readonly
        placeholder="请选择位置"
        @click="positionVisible = true"
      >
      </van-field>
      <van-field v-model="form.age" name="playerAge" label="年龄" placeholder="请输入年龄" />
      <van-field
        v-model="form.remarks"
        label="备注"
        placeholder="请填写"
        type="textarea"
        rows="3"
        autosize
      />
    </van-cell-group>
  </div>
  <van-action-sheet
    v-model:show="positionVisible"
    :actions="positionList"
    cancel-text="取消"
    close-on-click-action
    @select="actionClick"
  />
</template>
<script setup lang="ts">
import router from '@/router'
import { playerApi } from '@/service/api'
import { showToast } from '@/utils/index.js'
import { reactive, ref, computed, defineProps } from 'vue'

const props = defineProps({
  teamId: String,
  playerId: String,
})
let form = reactive({
  teamId: props.teamId,
  name: '',
  logo: '',
  caption: false,
  number: '',
  height: '',
  weight: '',
  position: '',
  age: '',
  remarks: '',
})
const positionVisible = ref(false)
const positionList = [
  { name: '无', value: '' },
  { name: '得分后卫', value: 'SG' },
  { name: '控球后卫', value: 'PG' },
  { name: '小前锋', value: 'SF' },
  { name: '大前锋', value: 'PF' },
  { name: '中锋', value: 'C' },
]
const activePosition = computed(() => {
  let position = positionList.find((o) => o.value === form.position)
  return position?.name
})
function actionClick(item: any) {
  form.position = item.value
}
;(async function () {
  if (props.playerId) {
    var res: any = await playerApi.getById(props.playerId)
    form.teamId = props.teamId
    form.name = res.name
    form.logo = res.logo
    form.caption = res.caption
    form.number = res.number
    form.height = res.height
    form.weight = res.weight
    form.position = res.position
    form.age = res.age
    form.remarks = res.remarks
  }
})()

function onClickLeft() {
  router.back()
}
async function onSubmit() {
  if (!form.name) {
    return showToast({ type: 'fail', message: '请输入队员名字' })
  }
  if (!form.number) {
    return showToast({ type: 'fail', message: '请输入队员名号码' })
  }
  if (props.playerId) {
    var res = await playerApi.update(props.playerId, form)
  } else {
    var res = await playerApi.save(form)
  }

  showToast({ type: 'success', message: '创建成功！' })
  router.back()
}
</script>

<style lang="postcss" scoped></style>
