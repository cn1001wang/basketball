<template>
  <div v-show="show" class="r-toast" :class="!type && 'r-toast--text'">
    <van-icon v-if="type == 'success'" name="success" size="36" />
    <van-icon v-else-if="type == 'fail'" name="cross" size="36" />
    <p class="r-toast__textinner">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    type: String,
    duration: Number,
  },
  data() {
    return {
      show: true,
    }
  },
  mounted() {
    console.log(this.show)
    // 过了 duration 时间后隐藏
    setTimeout(() => {
      this.show = false
    }, this.duration)
  },
  // data() {
  //   return {
  //     message:null,
  //     type:null,
  //   }
  // },
}
</script>

<style scoped lang="scss">
.r-toast {
  position: fixed;
  left: 50%;
  top: 50%;
  background: rgba(0, 0, 0, 0.35);
  padding: 16px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 88px;
  min-width: 88px;
}
.r-toast__textinner {
  padding-top: 8px;
}
.r-toast--text {
  padding: 8px 12px;
  .r-toast__textinner {
    padding-top: 0;
  }
}
</style>
