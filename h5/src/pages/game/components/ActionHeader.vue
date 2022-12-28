<!--  -->
<template>
  <div class="action-header">
    <action-header-team :events="events" :team="game.teama.id" :game="game"></action-header-team>
    <div class="time-item">
      <p>第{{ game.section }}节</p>
      <p class="time-p" :class="rest&&'rest-time-p'">
        <span class="cutdown-item">{{ curTime[0][0] }}</span>
        <span class="cutdown-item">{{ curTime[0][1] }}</span>
        <span>:</span>
        <span class="cutdown-item">{{ curTime[1][0] }}</span>
        <span class="cutdown-item">{{ curTime[1][1] }}</span>
      </p>
    </div>
    <action-header-team :events="events" :team="game.teamb.id" :game="game"></action-header-team>
  </div>
</template>

<script>
import ActionHeaderTeam from './ActionHeaderTeam.vue'
export default {
  props: {
    rest:Boolean,
    game: Object,
    curTime: Array,
    events: Array,
  },
  components: { ActionHeaderTeam },
  data() {
    return {}
  },
  computed: {},
}
</script>

<style lang="scss" scoped>
.action-header {
  display: flex;
  text-align: center;
  align-items: center;
  font-size: 36px;
  .time-item {
    text-align: center;
    width: 280px;
    .time-p {
      font-size: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      .cutdown-item {
        width: 125px;
        display: inline-block;
      }
    }
    .rest-time-p{
      color: #a1a1a1;
    }
  }
}
</style>
