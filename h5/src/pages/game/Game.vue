<template>
  <div class="page-header">
    <span>美国职业篮球联赛</span><van-icon name="setting-o" />
    <van-icon name="plus" />
  </div>
  <van-tabs v-model:active="active">
    <van-tab title="标签 1">内容 1</van-tab>
    <van-tab title="标签 2">内容 2</van-tab>
  </van-tabs>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
</script>
