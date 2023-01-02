<template>
  <div class="page-header">
    <div class="page-header-action">
      <van-icon name="bar-chart-o" size="22" />
    </div>
    <div @click="openMatchList">
      <span v-if="data.activeMatch">{{ data.activeMatch.name }}</span>
      <span v-else>请添加赛事</span>
      <van-icon name="arrow-down" class="ml-2" />
    </div>
    <div class="page-header-action">
      <van-icon v-if="data.activeMatch" name="plus" size="22" @click="actionClick" />
    </div>
  </div>
  <van-empty v-if="!data.activeMatch" description="暂无赛事记录" />
  <van-empty v-if="!games.length" description="暂无比赛记录" />
  <div class="text-center">
    <div v-for="game in games" :key="game._id">
      <p v-if="isFirstMonth(game)" class="date-p">{{ formatMonth(game.dateTime) }}</p>
      <van-swipe-cell class="game-cell">
        <div class="d-flex ai-center game-list-item" @click="toAction(game)">
          <div class="team-avatar-item">
            <team-logo size="58" round :logo="game.teama.team.logo" class="team-logo"></team-logo>
            <div class="text-black pt-1">{{ game.teama.team.name }}</div>
          </div>
          <div class="flex-1">
            <p>{{ formatDate(game.dateTime) }}</p>
            <div class="score-wrap">
              <span class="score-span">{{ game.teama.score || 0 }}</span>
              <span>-</span>
              <span class="score-span">{{ game.teamb.score || 0 }}</span>
            </div>
            <div v-if="!game.status">
              <van-tag type="success" round>进行中</van-tag>
            </div>
            <div v-else>
              <van-tag type="success" round>已完成</van-tag>
            </div>
            <div class="text-grey">{{ game.place }}</div>
          </div>
          <div class="team-avatar-item">
            <team-logo size="58" round :logo="game.teamb.team.logo" class="team-logo"></team-logo>
            <div class="text-black pt-1">{{ game.teamb.team.name }}</div>
          </div>
        </div>
        <template #right>
          <van-button class="delete-button" square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
  <van-action-sheet
    v-model:show="addVisible"
    :actions="addActions"
    cancel-text="取消"
    close-on-click-action
    @select="actionClick"
  />
  <van-popup v-model:show="matchListVisible" round :style="{ height: '50%' }">
    <div class="game-list-wrap">
      <div class="game-list-header">选择赛事</div>
      <div class="game-list-content">
        <div v-for="(match, i) in matches" :key="i" class="game-list-data">
          <p>{{ match.name }}</p>
          <button @click="removeMatch(match)">删除</button>
          <p class="fs-sm">{{ match.teams.length }}支球队</p>
        </div>
      </div>
      <div class="game-list-footer" @click="toMatchAdd">
        <van-icon name="plus" size="22" />
        创建赛事
      </div>
    </div>
  </van-popup>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { matchApi, gameApi } from '@/service/api/index.js'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
const router = useRouter()

const addVisible = ref(false)
const addActions = [{ name: '创建新比赛' }, { name: '添加比赛结果' }, { name: '创建队内赛' }]
function actionClick(item) {
  let match = data.activeMatch
  router.push(`/game/add?matchId=${match._id}&matchName=${match.name}`)
}

function openAdd() {
  addVisible.value = true
}

const matchListVisible = ref(false)
function openMatchList() {
  matchListVisible.value = true
  loadMatches()
}
const matches = ref([])
const data = reactive({
  activeMatch: null,
})
async function loadMatches() {
  await matchApi.getMatches().then((res) => {
    matches.value = res
    if (res.length === 0) {
      matchListVisible.value = true
    } else {
      data.activeMatch = res[0]
    }
  })
}
const games = ref([])
;(async () => {
  await loadMatches()
  if (data.activeMatch) {
    let res = await gameApi.getByMatchId(data.activeMatch._id)
    games.value = res
  }
})()

function toMatchAdd() {
  router.push('/match/add')
}
async function removeMatch(match) {
  await matchApi.removeMatch(match._id)
  loadMatches()
  alert('删除成功')
}

function formatDate(time) {
  if (!time) return ''
  time = dayjs(time)
  let nowYear = new Date().getFullYear()
  if (nowYear === time.year()) return time.format('MM月DD日 HH:mm')
  return time.format('YYYY-MM-DD HH:mm')
}
function formatMonth(time) {
  return dayjs(time).format('YYYY-MM')
}
// 是否是这个月第一条
function isFirstMonth(game) {
  let month = formatMonth(game.dateTime)
  let toMonthArr = games.value.filter((o) => formatMonth(o.dateTime) === month)
  if (!game || !toMonthArr.length) return
  return toMonthArr[0]._id === game._id
}

// 跳转到比赛页
function toAction(game) {
  console.log(game.status)
  if (game.status==1) {
    router.push(`/game/result?id=${game._id}`)
  } else {
    router.push(`/game/action?id=${game._id}`)
  }
}
</script>
<style lang="scss">
.game-list-wrap {
  width: 70vw;
  height: 100%;
  .game-list-header {
    padding: 15px 10px 10px;
    border-bottom: 1px solid #f2f2f2;
  }
  .game-list-content {
    height: calc(100% - 90px);
    overflow: auto;
    .game-list-data {
      padding: 5px 10px;
      border-bottom: 1px solid #f2f2f2;
      line-height: 1.8;
    }
  }
  .game-list-footer {
    padding: 10px;
  }
}
.date-p {
  font-size: 16px;
  color: #787878;
  padding: 10px 0 5px;
  // font-weight: bold;
}
.game-list-item {
  color: #8f8f8f;
}
.team-avatar-item {
  padding: 10px 15px;
}
.delete-button {
  height: 100%;
}
.score-wrap {
  padding: 4px 0;
  font-size: 24px;
  color: #000;
}
.game-cell {
  border-bottom: 1px solid #e2e2e2;
  padding: 10px 0 5px;
}
</style>
