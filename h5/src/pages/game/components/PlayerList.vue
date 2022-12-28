<!--  -->
<template>
  <div class="flex-1 team-list">
    <div
      class="player-item"
      v-for="player in team.activePlayers"
      :key="player._id"
      :class="team.lineup.includes(player._id) && 'player-lineup-item'"
      @click="$emit('action', player)"
    >
      <div class="player-num">{{ player.number }}</div>
      <div class="player-name">{{ player.name }}</div>
      <div class="foul-dot-cell">
        <div
          class="foul-dot"
          v-for="i in rule.personalFoulLimit + 1"
          :key="i"
          :class="foulList[player._id] >= i && 'foul-full-dot'"
        ></div>
      </div>
      <span>{{ getScore(player._id) }}</span>
    </div>
  </div>
</template>

<script>
import gameEventType from '../gameEventType'
export default {
  props: {
    team: Object,
    rule: Object,
    // foulList: Object,
    events: Array,
  },
  data() {
    return {}
  },
  computed: {
    foulList() {
      let events = this.events.filter((o) =>
        [gameEventType.犯规, gameEventType.技术犯规, gameEventType.违体犯规].includes(o.type)
      )
      let obj = {}

      this.team.activePlayers.forEach((player) => {
        obj[player._id] = events.filter((o) => o.player._id === player._id).length
      })
      return obj
    },
  },
  methods: {
    getScore(playerId) {
      let teamEvents = this.events.filter((o) => o.player?._id === playerId)
      return (
        teamEvents.filter((o) => o.type === gameEventType.罚球).length +
        teamEvents.filter((o) => o.type === gameEventType.两分).length * 2 +
        teamEvents.filter((o) => o.type === gameEventType.三分).length * 3
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.player-item {
  font-size: 30px;
  display: flex;
  align-items: center;
  // justify-content: center;
}
.player-num {
  width: 60px;
  color: #b3e5fc;
}
.player-name {
  min-width: 4em;
}
.player-lineup-item {
  color: yellow;

  .player-num {
    color: yellow;
  }
}
.foul-dot-cell {
  padding-left: 10px;
  padding-right: 20px;
  display: flex;
  // flex: 1;
  .foul-dot {
    border-radius: 20px;
    width: 24px;
    height: 24px;
    border: 2px solid #fff;
    &.foul-full-dot {
      background-color: yellow;
    }
  }
}
</style>
