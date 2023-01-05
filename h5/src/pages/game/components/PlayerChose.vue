<!--  -->
<template>
  <div v-if="players.length">
    <p class="team-title">
      {{ isTeama ? '主' : '客' }}队球员（出场{{ team.lineup.length }}人｜首发
      {{ team.activePlayers.length }}人）
    </p>
    <div class="title-item" @click="choseVisible = true">
      <team-logo size="24" radius="8" :logo="team.logo"></team-logo>
      <div class="title-name">{{ team.name }}</div>
      <div class="flex-1"></div>
      <span class="text-grey mr-2">请选择</span>
      <van-icon name="arrow" color="#999" />
    </div>
    <div class="title-item" v-for="player in activePlayers">
      <div style="width: 4em; color: #666">{{ getPlayerById(player).number }}号</div>
      <span>{{ getPlayerById(player).name }}</span>
      <div class="flex-1"></div>
      <div class="text-grey">{{ getPostionByCode(getPlayerById(player).position) }}</div>
      <div class="text-grey ml-4" :class="[lineup.includes(player) ? 'text-success' : 'text-grey']">
        {{ lineup.includes(player) ? '首发' : '出场' }}
      </div>
    </div>
  </div>
  <van-popup v-model:show="choseVisible" round :style="{ height: '80%' }" position="bottom">
    <div class="van-picker__toolbar">
      <!-- <button type="button" class="van-picker__cancel van-haptics-feedback" @click="choseVisible=false">取消</button> -->
      <div style="width: 60px"></div>
      <div class="van-picker__title van-ellipsis">选择球员出场</div>
      <button
        type="button"
        class="van-picker__confirm van-haptics-feedback"
        @click="choseVisible = false"
      >
        确认
      </button>
    </div>
    <div class="player-wrap">
      <div
        v-for="player in players"
        class="player-item"
        :class="[activePlayers.includes(player._id) && 'active-item']"
      >
        <div style="width: 4em; color: #666">{{ player.number }}号</div>
        <span>{{ player.name }}</span>
        <div class="flex-1"></div>
        <van-button
          :type="activePlayers.includes(player._id) ? 'primary' : 'default'"
          size="small"
          @click="handleActiveClick(player)"
        >
          出场
        </van-button>
        <div class="mx-3"></div>
        <van-button
          :type="lineup.includes(player._id) ? 'success' : 'default'"
          size="small"
          @click="handleLineupClick(player)"
        >
          首发
        </van-button>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { teamApi } from '@/service/api'
import { showToast } from '@/utils/index.js'
import { defineProps, defineEmits, ref, Ref } from 'vue'

const positionList = [
  { name: '无', value: '' },
  { name: '得分后卫', value: 'SG' },
  { name: '控球后卫', value: 'PG' },
  { name: '小前锋', value: 'SF' },
  { name: '大前锋', value: 'PF' },
  { name: '中锋', value: 'C' },
]
function getPostionByCode(code: any) {
  let position = positionList.find((o) => o.value === code)
  return position?.name
}
const props = defineProps({
  team: { type: Object, required: true },
  isTeama: { type: Boolean },
  activePlayers: { type: Array, required: true },
  lineup: { type: Array, required: true },
})
const emit = defineEmits<{
  (e: 'update:activePlayers', players: any[]): void
  (e: 'update:lineup', players: any[]): void
}>()

const choseVisible = ref(false)
const players: Ref<any[]> = ref([])
;(async () => {
  let res: any = await teamApi.getById(props.team.id)
  players.value = res.players
  console.log(players.value)
})()
function getPlayerById(playerId: any) {
  return players.value.find((o) => o._id === playerId)
}
function handleActiveClick(player: any) {
  let lineup = [...props.lineup]
  let activePlayers = [...props.activePlayers]
  if (activePlayers.includes(player._id)) {
    activePlayers = activePlayers.filter((id: any) => id !== player._id)
    // 首发球员不出场，直接删掉首发
    if (lineup.includes(player._id)) {
      lineup = lineup.filter((id: any) => id !== player._id)
      emit('update:lineup', lineup)
    }
  } else {
    activePlayers.push(player._id)
  }
  emit('update:activePlayers', activePlayers)
}
function handleLineupClick(player: any) {
  let lineup = [...props.lineup]
  let activePlayers = [...props.activePlayers]
  console.log(lineup.length)
  if (lineup.length == 5) {
    return showToast({ type: 'fail', message: '每队首发最多5名球员' })
  }
  if (lineup.includes(player._id)) {
    lineup = lineup.filter((id: any) => id !== player._id)
    // activePlayers = activePlayers.filter((id: any) => id !== player._id)
  } else {
    lineup.push(player._id)
    // 首发不球员未出场时，自动出场
    if (!activePlayers.includes(player._id)) {
      activePlayers.push(player._id)
      emit('update:activePlayers', activePlayers)
    }
  }
  emit('update:lineup', lineup)
}
</script>

<style lang="scss" scoped>
.team-title {
  padding: 8px 15px;
  color: #999;
}
.title-item {
  background-color: #fff;
  padding: 10px 15px;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
  .title-name {
    padding: 0 20px 0 20px;
  }
}
.player-wrap {
  height: calc(100% - 44px);
  background-color: #f2f2f2;
}
.player-item {
  padding: 10px 15px;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
  &.active-item {
    background-color: #fff;
  }
}
</style>
