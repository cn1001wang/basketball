<!--  -->
<template>
  <van-nav-bar
    title="球队信息"
    left-text="球队"
    right-text="编辑"
    left-arrow
    @click-left="onClickLeft"
    @click-right="toEdit"
  />
  <div v-if="team">
    <div class="team-item">
      <van-image
        width="90"
        height="90"
        fit="cover"
        radius="8"
        :src="
          team.logo ||
          'https://itianwangmlmw.oss-cn-shanghai.aliyuncs.com/cdn/outsource/basketball/logo.png'
        "
      />
      <div class="flex-1 ml-4">
        <p class="team-name">{{ team.name }}</p>
        <p>队员：{{ team.players ? team.players.length : 0 }}</p>
        <p>联系人：{{ team.contactPerson }}</p>
        <p>联系电话：{{ team.contactPhone }}</p>
      </div>
    </div>
    <div>
      <van-tabs v-model:active="active">
        <van-tab title="队员管理">
          <div v-if="team.players" class="px-3">
            <div v-for="item in team.players" class="player-item" @click="toEditPlayer(item._id)">
              <span class="flex-1">{{ item.name }}</span>
              <span class="pl-2 pr-4">{{ item.number }}号</span>
              <van-icon name="arrow" />
            </div>
            <van-empty v-if="!team.players.length" description="点击下方按钮添加球员" />
          </div>
          <div class="add-player-btn">
            <i class="iconfont icon-renyuan-tianjia" @click="toPlayerAdd"></i>
          </div>
        </van-tab>
        <van-tab title="参与赛事"> </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue'
import router from '@/router'
import { teamApi } from '@/service/api'
const props = defineProps({
  id: String,
})
function onClickLeft() {
  router.back()
}
function toEdit() {
  router.push(`/team/edit/${props.id}`)
}
function toPlayerAdd() {
  router.push(`/player/add?teamId=${props.id}`)
}

const team = ref()

async function loadTeam() {
  team.value = await teamApi.getById(props.id)
}
loadTeam()
const active = ref(0)

function toEditPlayer(playerId: string) {
  router.push(`/player/add?teamId=${props.id}&playerId=${playerId}`)
}
</script>

<style lang="scss" scoped>
.team-item {
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
  margin-bottom: 20px;
  .team-name {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;
    padding-bottom: 5px;
  }
}
.player-item {
  display: flex;
  padding: 10px 15px;
  align-items: center;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  margin-bottom: 10px;
}
.add-player-btn {
  position: fixed;
  bottom: 10vh;
  left: 50%;
  transform: translateX(-50%);
  .iconfont {
    font-size: 36px;
    color: #1989fa;
    cursor: pointer;
  }
}
</style>
