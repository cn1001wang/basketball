<template>
  <div class="page-header">
    <div class="page-header-action"></div>
    <div>球队</div>
    <div class="page-header-action">
      <van-icon name="plus" size="22" @click="addTeam" />
    </div>
  </div>
  <div class="main-bg">
    <ul>
      <li v-for="team in teamData" class="team-item" @click="toTeam(team._id)">
        <van-image
          width="56"
          height="56"
          fit="cover"
          radius="8"
          :src="
            team.logo ||
            'https://itianwangmlmw.oss-cn-shanghai.aliyuncs.com/cdn/outsource/basketball/logo.png'
          "
        />
        <div class="flex-1 ml-4">
          <p class="team-name">{{ team.name }}</p>
          <div class="team-desc">
            <span>{{ team.players.length }}名队员</span>
            <span> | </span>
            <span>2场 2胜 0负</span>
          </div>
        </div>
      </li>
    </ul>
    <van-empty v-if="!teamData||!teamData.length" description="暂无球队" />
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import {  teamApi } from '@/service/api'

function toTeam(id: string) {
  router.push(`/team/detail/${id}`)
}
function addTeam() {
  router.push('/team/add')
}
const route = useRoute()
const teamData = ref()
async function loadTeams() {
  teamData.value = await teamApi.get()
}
loadTeams()
// fetch the user information when params change
watch(
  () => route,
  async () => {
    loadTeams()
  }
)
</script>
<style lang="scss">
.team-item {
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #fff;
  display: flex;
  .team-name {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;
    padding-bottom: 5px;
  }
  .team-desc {
    font-size: 16px;
    color: #a2a2a2;
  }
}
</style>
