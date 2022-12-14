<template>
  <van-nav-bar
    title="创建比赛"
    :left-text="tick ? '上一步' : '取消'"
    :right-text="tick ? '开始' : '下一步'"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onSubmit"
  />
  <div v-if="tick == 0" class="main-bg">
    <div class="bg-light-f2 py-4 mb-4">
      <p class="text-center py-2 fs-xl">{{ props.matchName }}</p>
      <div class="d-flex jc-between ai-center">
        <div class="d-flex pl-3">
          <team-chose v-model="form.teama.id" v-model:name="form.teama.name"></team-chose>
          <jersey-chose v-model="form.teama.color"></jersey-chose>
        </div>
        <div class="fs-xxl">VS</div>
        <div class="d-flex pr-2">
          <jersey-chose v-model="form.teamb.color"></jersey-chose>
          <team-chose v-model="form.teamb.id" v-model:name="form.teamb.name"></team-chose>
        </div>
      </div>
    </div>
    <div class="bg-white mb-4">
      <van-cell-group inset>
        <van-field
          v-model="form.dateTime"
          is-link
          readonly
          name="dateTime"
          label="比赛时间"
          placeholder="点击选择比赛时间"
          @click="timePickerVisible = true"
        />
        <van-popup v-model:show="timePickerVisible" position="bottom">
          <van-picker-group
            title="比赛时间"
            :tabs="['选择日期', '选择时间']"
            @confirm="onTimeConfirm"
            @cancel="timePickerVisible = false"
          >
            <van-date-picker v-model="currentDate" />
            <van-time-picker v-model="currentTime" />
          </van-picker-group>
        </van-popup>
        <van-field
          :model-value="activeRuleName"
          is-link
          readonly
          name="rule"
          label="比赛规则"
          placeholder="选择规则"
          @click="rulePickerVisible = true"
        />
        <van-popup v-model:show="rulePickerVisible" position="bottom">
          <van-picker
            v-model="rule"
            :columns="ruleColumns"
            @confirm="onRuleConfirm"
            @cancel="rulePickerVisible = false"
          />
        </van-popup>
        <van-field
          :model-value="activePlaceName"
          is-link
          readonly
          name="rule"
          label="比赛场地"
          placeholder="选择场地"
          @click="placePickerVisible = true"
        />
        <van-popup v-model:show="placePickerVisible" position="bottom">
          <van-picker
            v-model="place"
            :columns="placeColumns"
            @confirm="onPlaceConfirm"
            @cancel="placePickerVisible = false"
          />
        </van-popup>
      </van-cell-group>
    </div>
  </div>
  <div v-else class="main-bg">
    <player-chose v-model:activePlayers="form.teama.activePlayers" v-model:lineup="form.teama.lineup" :team="form.teama" isTeama></player-chose>
    <div class="py-2"></div>
    <player-chose v-model:activePlayers="form.teamb.activePlayers" v-model:lineup="form.teamb.lineup" :team="form.teamb"></player-chose>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import { reactive, ref, defineProps, computed } from 'vue'
import { gameApi } from '@/service/api/index.js'
import { showToast } from 'vant'
import dayjs from 'dayjs'
import 'vant/es/toast/style'
import TeamChose from './components/TeamChose.vue'
import JerseyChose from './components/JerseyChose.vue'
import PlayerChose from './components/PlayerChose.vue'

const props = defineProps({
  matchId: String,
  matchName: String,
})

const tick = ref(0)
let now = dayjs()
const form = reactive({
  match: props.matchId,
  dateTime: dayjs().format('YYYY-MM-DD HH:mm'),
  rule: '1',
  place: '1',
  teama: {
    id: '',
    name: '',
    color: '',
    activePlayers: [],
    lineup: [],
  },
  teamb: {
    id: '',
    name: '',
    color: '',
    activePlayers: [],
    lineup: [],
  },
})
const rule = ref(['1'])
const place = ref(['1'])
const currentDate = ref([now.format('YYYY'), now.format('MM'), now.format('DD')])
const currentTime = ref([now.format('HH'), now.format('mm')])
const ruleColumns = reactive([
  { text: 'FIBA正式比赛规则', value: '1' },
  { text: '抢分模式（单节）', value: '2' },
  { text: '抢分模式（累计）', value: '3' },
])
const activeRuleName = computed(() => ruleColumns.find((o) => o.value === form.rule)?.text)
const placeColumns = reactive([
  { text: '浙江大学紫金港校区篮球馆', value: '1' },
  { text: '深圳大学篮球馆', value: '2' },
])
const activePlaceName = computed(() => placeColumns.find((o) => o.value === form.place)?.text)

const timePickerVisible = ref(false)
const rulePickerVisible = ref(false)
const placePickerVisible = ref(false)

function onTimeConfirm() {}
function onRuleConfirm({ selectedValues }: { selectedValues: Array<string> }) {
  form.rule = selectedValues[0]
  rulePickerVisible.value = false
}
function onPlaceConfirm({ selectedValues }: { selectedValues: Array<string> }) {
  form.place = selectedValues[0]
  placePickerVisible.value = false
}

function onClickLeft() {
  if (tick.value == 0) {
    router.back()
  } else {
    tick.value = 0
  }
}
async function onSubmit() {
  // 第一步
  if (tick.value == 0) {
    if (!form.teama.id || !form.teamb.id) {
      return showToast({ type: 'fail', message: '请选择比赛队伍' })
    }
    tick.value = 1
  } else {
    var res = await gameApi.save(form)

    showToast({ type: 'success', message: '创建成功！' })
    router.back()
  }
}
</script>
<style lang="scss">
.icon-jersey {
  font-size: 32px;
  margin-top: 12px;
  color: #a1a1a1;
}
</style>
