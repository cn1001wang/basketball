<!--  -->
<template>
  <i class="iconfont icon-jersey" :style="{ color: modelValue }" @click="openColorChose"></i>

  <van-popup v-model:show="colorVisible" closeable position="bottom" :style="{ height: '30%' }">
    <p class="text-center" style="line-height: 52px">选择队服颜色</p>
    <div class="color-wrap">
      <div
        v-for="color in colors"
        :style="{ backgroundColor: color }"
        class="color-item"
        @click="onColorClick(color)"
      ></div>
    </div>
  </van-popup>
</template>
<script setup lang="ts">
import { ref, defineProps, computed, defineEmits } from 'vue'
const emit = defineEmits<{
  (e: 'update:modelValue', color: string): void
}>()

const props = defineProps({
  modelValue: String,
})
const colorVisible = ref(false)
function openColorChose() {
  colorVisible.value = true
}

const colors = ['#fff', '#F44336', '#4CAF50', '#2962FF', '#000']
function onColorClick(color: string) {
  emit('update:modelValue', color)
  colorVisible.value = false
}
</script>

<style lang="scss" scoped>
.color-wrap {
  display: flex;
  height: calc(100% - 52px);
  padding: 20px;
  box-sizing: border-box;
  background-color: #f0f0f0;
  .color-item {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    margin-right: 15px;
  }
}
</style>
