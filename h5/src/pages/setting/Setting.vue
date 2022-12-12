<template>
  <div class="page-header">
    <div class="page-header-action"></div>
    <div>设置</div>
    <div class="page-header-action"></div>
  </div>
  <div class="main-bg">
    <div class="py-4 px-4 d-flex ai-center bg-white">
      <van-image
        radius="10"
        width="58px"
        height="58px"
        fit="cover"
        src="https://ga-img.bytefly.cn/default-images/team-2.jpg"
      />
      <div class="pl-4">
        <span>掌上篮球</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
</script>
