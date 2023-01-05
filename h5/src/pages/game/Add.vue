<template>
  <van-nav-bar
    title="创建比赛"
    :left-text="tick ? '上一步' : '取消'"
    :right-text="tick ? '开始' : '下一步'"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onSubmit"
  />
  <div v-show="tick == 0" class="main-bg">
    <div class="bg-light-f2 py-4 mb-4">
      <p class="text-center py-2 fs-xl">{{ props.matchName }}</p>
      <div class="d-flex jc-between ai-center">
        <div class="d-flex pl-3">
          <team-chose
            v-model="form.teama.id"
            v-model:name="form.teama.name"
            @change="handleTeamaChange"
          ></team-chose>
          <jersey-chose v-model="form.teama.color"></jersey-chose>
        </div>
        <div class="fs-xxl">VS</div>
        <div class="d-flex pr-2">
          <jersey-chose v-model="form.teamb.color"></jersey-chose>
          <team-chose
            v-model="form.teamb.id"
            v-model:name="form.teamb.name"
            @change="handleTeambChange"
          ></team-chose>
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
        <van-field v-model="form.place" label="比赛场地" placeholder="请输入场地" />
      </van-cell-group>
    </div>
  </div>
  <div v-if="tick == 1" class="main-bg">
    <player-chose
      v-model:activePlayers="form.teama.activePlayers"
      v-model:lineup="form.teama.lineup"
      :team="form.teama"
      isTeama
    ></player-chose>
    <div class="py-2"></div>
    <player-chose
      v-model:activePlayers="form.teamb.activePlayers"
      v-model:lineup="form.teamb.lineup"
      :team="form.teamb"
    ></player-chose>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import { reactive, ref, defineProps, computed, Ref } from 'vue'
import { gameApi, ruleApi } from '@/service/api/index.js'
import { showToast } from '@/utils/index.js'
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
  rule: '',
  place: '',
  teama: {
    id: '',
    name: '',
    color: '',
    activePlayers: [],
    lineup: [],
    players: [],
  },
  teamb: {
    id: '',
    name: '',
    color: '',
    activePlayers: [],
    lineup: [],
    players: [],
  },
})
const rule = ref(['1'])
const currentDate = ref([now.format('YYYY'), now.format('MM'), now.format('DD')])
const currentTime = ref([now.format('HH'), now.format('mm')])
const ruleColumns: Ref<any> = ref([])

const activeRuleName = computed(
  () => ruleColumns.value.find((o: any) => o.value === form.rule)?.text
)

const timePickerVisible = ref(false)
const rulePickerVisible = ref(false)

;(async () => {
  let res: any = await ruleApi.get()
  ruleColumns.value = res.map((o: any) => {
    return {
      text: o.name,
      value: o._id,
    }
  })
  form.rule=res[0]._id
})()

function onTimeConfirm() {}
function onRuleConfirm({ selectedValues }: { selectedValues: Array<string> }) {
  form.rule = selectedValues[0]
  rulePickerVisible.value = false
}
function handleTeamaChange(team: any) {
  form.teama.activePlayers = team.players.map((o: any) => o._id)
  form.teama.lineup = team.players.slice(0, 5).map((o: any) => o._id)
  form.teama.players = team.players
}
function handleTeambChange(team: any) {
  form.teamb.activePlayers = team.players.map((o: any) => o._id)
  form.teamb.lineup = team.players.slice(0, 5).map((o: any) => o._id)
  form.teamb.players = team.players
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
