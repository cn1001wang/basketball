<!--  -->

<template>
  <div class="text-center pr-3 pl-4" @click="openTeamChose()">
    <template v-if="!modelValue">
      <van-icon name="add-o" size="36" color="#ababab" />
      <p class="chose-team-name">选择球队</p>
    </template>
    <template v-else>
      <team-logo size="36" radius="8" :logo="activeTeam.logo"></team-logo>
      <p class="chose-team-name">{{ activeTeam.name }}</p>
    </template>
  </div>
  <van-popup v-model:show="teamVisible" closeable position="bottom" :style="{ height: '80%' }">
    <div class="text-center" style="line-height: 52px">选择球队</div>
    <div>
      <div
        v-for="team in teams"
        :key="team.id"
        class="team-item"
        @click="teamActionClick(team)"
      >
        <van-image
          width="40"
          height="40"
          fit="cover"
          radius="8"
          :src="
            team.logo ||
            'https://itianwangmlmw.oss-cn-shanghai.aliyuncs.com/cdn/outsource/basketball/logo.png'
          "
        />
        <div class="flex-1 ml-4">
          <p class="team-name">{{ team.name }}</p>
          <p class="team-desc">队员：{{ team.players ? team.players.length : 0 }}</p>
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script setup lang="ts">
import { ref, defineProps, computed, defineEmits } from 'vue'
import { teamApi } from '@/service/api/index.js'

const emit = defineEmits<{
  (e: 'update:modelValue', teamId: string): void
  (e: 'update:name', name: string): void
}>()

const props = defineProps({
  modelValue: String,
  name:String,
})

const teams = ref()
;(function () {
  teamApi.get().then((res) => {
    teams.value = res
  })
})()
const teamVisible = ref(false)
const activeTeam = computed(() =>
  teams.value ? teams.value.find((o: any) => o._id === props.modelValue) : {}
)
function openTeamChose() {
  teamVisible.value = true
}
function teamActionClick(team: any) {
  emit('update:modelValue', team._id)
  emit('update:name', team.name)
  teamVisible.value = false
}
</script>
<style lang="scss" scoped>
.team-item {
  padding: 10px 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;
  margin-bottom: 5px;
  .team-name {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    padding-bottom: 5px;
  }
  .team-desc {
    color: #999;
    font-size: 14px;
  }
}
.chose-team-name {
  width: 4em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
