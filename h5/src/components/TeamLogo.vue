<!--  -->
<template>
  <van-image
    :width="size"
    :height="size"
    fit="cover"
    :radius="radius"
    :round="round"
    :src="
      logo || 'https://itianwangmlmw.oss-cn-shanghai.aliyuncs.com/cdn/outsource/basketball/logo.png'
    "
  />
</template>

<script>
export default {
  props: {
    radius: [String, Number],
    size: [String, Number],
    logo: String,
    round:Boolean
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
