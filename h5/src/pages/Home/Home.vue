<template>
  <router-view />
  {{ active }}
  <van-tabbar v-model="active">
    <van-tabbar-item replace to="/game" icon="home-o">比赛</van-tabbar-item>
    <van-tabbar-item replace to="/team" icon="search">球队</van-tabbar-item>
    <van-tabbar-item replace to="/setting" icon="friends-o">设置</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
</script>

<style lang="scss" scoped>
.test {
  color: $test-color;
}
</style>
