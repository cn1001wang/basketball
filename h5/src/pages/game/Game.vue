<template>
  <div class="page-header">
    <div class="page-header-action"><van-icon name="bar-chart-o" size="22" /></div>
    <span @click="gameChooseVisible = true"
      >美国职业篮球联赛<van-icon name="arrow-down" class="ml-2"
    /></span>
    <div class="page-header-action">
      <van-icon name="plus" size="22" @click="openAdd" />
    </div>
  </div>
  <van-tabs v-model:active="active">
    <van-tab title="未结束"></van-tab>
    <van-tab title="已结束"></van-tab>
  </van-tabs>
  <div class="text-center">
    <p class="date-p">2022-12</p>
    <div>
      <van-swipe-cell>
        <div class="d-flex ai-center game-list-item">
          <div class="team-avatar-item">
            <van-image
              class="team-logo"
              round
              width="58px"
              height="58px"
              fit="cover"
              src="https://ga-img.bytefly.cn/default-images/team-2.jpg"
            />
            <div>勇士队</div>
          </div>
          <div class="flex-1">
            <p>12月5日 20:22</p>
            <div class="score-wrap">
              <span class="score-span">23</span>
              <span>-</span>
              <span class="score-span">16</span>
            </div>
            <div>
              <van-tag type="success" round>进行中</van-tag>
            </div>
            <div class="text-grey">回浦中学篮球场</div>
          </div>
          <div class="team-avatar-item">
            <van-image
              class="team-logo"
              round
              width="58px"
              height="58px"
              fit="cover"
              src="https://ga-img.bytefly.cn/default-images/team-1.jpg"
            />
            <div>骑士队</div>
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
  />
  <van-popup v-model:show="gameChooseVisible" round :style="{ height: '50%' }">
    <div class="game-list-wrap">
      <div class="game-list-header">选择赛事</div>
      <div class="game-list-content">
        <div v-for="(game, i) in games" :key="i" class="game-list-data">
          <p>{{ game.name }}</p>
          <p class="fs-sm">{{ game.teams.length }}支球队</p>
        </div>
      </div>
      <div>
        <van-icon name="plus" size="22" />
        创建赛事
      </div>
    </div>
  </van-popup>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'

const active = ref(0)
const addVisible = ref(false)
const addActions = [{ name: '创建新比赛' }, { name: '添加比赛结果' }, { name: '创建队内赛' }]

function openAdd() {
  addVisible.value = true
}

const gameChooseVisible = ref(false)

const games = reactive([
  { _id: 1, name: '库里杯', teams: [{}, {}] },
  { _id: 2, name: '德杯', teams: [{}, {}] },
])
</script>
<style lang="scss">
.game-list-wrap {
  width: 70vw;
  .game-list-header {
    padding: 15px 10px 10px;
    border-bottom: 1px solid #f2f2f2;
  }
  .game-list-content {
    .game-list-data {
      padding: 5px 10px;
      border-bottom: 1px solid #f2f2f2;
      line-height: 1.8;
    }
  }
}
.date-p {
  font-size: 16px;
  color: #787878;
  padding: 10px 0;
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
.team-logo {
  border: 1px solid #b2b2b2;
  background-color: #dee6e9;
}
.score-wrap {
  padding: 4px 0;
  font-size: 24px;
  color: #000;
}
</style>
