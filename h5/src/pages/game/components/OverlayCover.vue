<!--  -->
<template>
  <div class="overlay-bg"></div>
  <div class="overlay-wrap">
    <div class="match-div">
      <div>所属赛事</div>
      <p>{{ game.match.name }}</p>
    </div>
    <div class="rule-div">
      <div>比赛规则</div>
      <p>{{ game.rule.name }}</p>
    </div>
    <div class="d-flex team-div">
      <div class="team-avatar-item">
        <team-logo size="78" round :logo="game.teama.id.logo" class="team-logo"></team-logo>
        <div class="pt-1">{{ game.teama.id.name }}</div>
      </div>
      <div class="vs-div">VS</div>
      <div class="team-avatar-item">
        <team-logo size="78" round :logo="game.teamb.id.logo" class="team-logo"></team-logo>
        <div class="pt-1">{{ game.teamb.id.name }}</div>
      </div>
    </div>
    <div class="flex-1"></div>
    <div class="start-btn" @click="$emit('start')">开始计时({{ countdown }})</div>
    <div style="height: 10vh"></div>
  </div>
</template>

<script>
export default {
  props: {
    game: Object,
  },
  data() {
    return {
      countdown: 3,
      timer: null,
    }
  },
  mounted() {
    this.setTime()
  },
  beforeDestroy() {
    if (this.timer) clearTimeout(this.timer)
  },
  methods: {
    setTime() {
      setTimeout(() => {
        this.countdown--
        if (this.countdown === 0) {
          this.$emit('start')
          clearTimeout(this.timer)
          return
        }
        this.setTime()
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
.overlay-wrap {
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  height: 100vh;
}
.match-div {
  margin-top: 40px;
  font-size: 24px;
  color: #e1e1e1;
  p {
    color: #fff;
    font-size: 32px;
  }
}
.rule-div {
  margin-top: 40px;
  font-size: 24px;
  color: #e1e1e1;
  p {
    color: #fff;
    font-size: 32px;
  }
}
.team-div {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 24px;
  padding: 50px 0;
}
.vs-div{
    font-size: 42px;
    margin: 0 50px;
}
.start-btn {
  width: 8em;
  border-radius: 25px;
  text-align: center;
  margin: 0 auto;
  background-color: #fff;
  color: #000;
  padding: 10px;
}
.overlay-bg {
  position: absolute;
  top: 0;
  bottom: calc(10vh + 21px);
  left: 0;
  right: 0;
//   background-color: rgba(0, 0, 0, 0.3);
  background-image: url(../../../assets/bg.jpg);
//   opacity: 0.9;
  background-size: 100% 100%;
  z-index: -1;
}
</style>
