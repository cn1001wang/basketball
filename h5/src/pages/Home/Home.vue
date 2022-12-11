<template>
  <router-view />
  <van-tabbar v-model="active">
    <van-tabbar-item replace to="/game" icon="home-o">比赛</van-tabbar-item>
    <van-tabbar-item replace to="/team" icon="friends-o">球队</van-tabbar-item>
    <van-tabbar-item replace to="/setting" icon="setting-o">设置</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import { ref } from 'vue'

const active: any = ref(useRoute().meta.tab)
</script>

<style lang="scss" scoped>
.test {
  color: $test-color;
}
</style>
