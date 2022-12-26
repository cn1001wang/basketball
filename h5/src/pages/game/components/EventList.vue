<!--  -->
<template>
  <div class="event-list-wrap">
    <div v-for="event in comEvents" :key="event._id">
      <div>第{{ event.quarter }}节</div>
      <div class="d-flex event-list-item">
        <span> {{ event.time }}</span>
        <span> 【{{ teamIdMap[event.teamId] }}】</span>
        <span v-if="event.player"> {{ event.player.number }}号 {{ event.player.name }}</span>
        <div class="flex-1"></div>

        <span> {{ gameEventTypeMap[event.type] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import gameEventType from '../gameEventType'
export default {
  props: { events: Array, game: Object },
  data() {
    let obj = {}
    Object.keys(gameEventType).forEach((key) => {
      obj[gameEventType[key]] = key
    })
    return {
      gameEventTypeMap: obj,
    }
  },
  computed: {
    teamIdMap() {
      let obj = {}
      obj[this.game.teama.id._id] = this.game.teama.id.name
      obj[this.game.teamb.id._id] = this.game.teamb.id.name
      return obj
    },
    playerIdMap() {
      this.game.teama.activePlayers
    },
    comEvents() {
      let events = [...this.events]
      return events.reverse()
    },
  },
  methods: {
    //     getPlayer(event) {
    //       let team = this.game.teama.id._id === event.teamId ? this.game.teama : this.game.teamb
    // console.log(team.activePlayers,event.playerId)
    //       return team.activePlayers.find((o) => o._id === event.playerId)??{}
    //     },
  },
}
</script>

<style lang="scss" scoped>
.event-list-wrap{
    height: calc(95vh - 56px);
    overflow: auto;
}
.event-list-item{
    border-bottom: 1px solid #e2e2e2;
    line-height: 45px;
    padding: 0 15px;
}
</style>
