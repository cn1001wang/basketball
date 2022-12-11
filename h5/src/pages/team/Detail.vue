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
        <p>队员：{{ team.players.length }}</p>
        <p>联系人：{{ team.contactPerson }}</p>
        <p>联系电话：{{ team.contactPhone }}</p>
      </div>
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

const team = ref()

async function loadTeam() {
  team.value = await teamApi.getById(props.id)
}
loadTeam()
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
  .team-desc {
    font-size: 16px;
    color: #a2a2a2;
  }
}
</style>
