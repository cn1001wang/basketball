<!--  -->
<template>
  <div class="team-title-item">
    <div class="team-name">{{ team.name }}</div>
    <div class="score-title">{{ score }}</div>
    <div class="count-wrap d-flex">
      <div class="flex-1">
        <p class="count-title">犯规</p>
        <div class="count-tag">{{ foul }}</div>
      </div>
      <div class="flex-1">
        <p class="count-title">暂停</p>
        <div class="count-tag">{{ getPause(team._id) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import gameEventType from '../gameEventType'
export default {
  props: {
    team: Object,
    events: Array,
    game: Object,
  },
  data() {
    return {}
  },
  computed: {
    score() {
      return this.getScore(this.team.id)
    },
    foul() {
      return this.getFoul(this.team.id).length
    },
  },
  methods: {
    getFoul(teamId) {
      let teamEvents = this.events.filter((o) => o.teamId === teamId)
      return teamEvents.filter(
        (o) =>
          [gameEventType.犯规, gameEventType.技术犯规, gameEventType.违体犯规].includes(o.type) &&
          o.quarter === this.game.section
      )
    },
    getPause(teamId) {
      let teamEvents = this.events.filter((o) => o.teamId === teamId)
      return teamEvents.filter(
        (o) => o.type === gameEventType.pause && o.quarter === this.game.section
      ).length
    },
    getScore(teamId) {
      let teamEvents = this.events.filter((o) => o.teamId === teamId)
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
.team-title-item {
  flex: 1;
}
.count-title {
  font-size: 18px;
}
.count-wrap {
  color: yellow;
}
.score-title {
  // font-size: 32px;
  color: red;
  font-weight: bold;
  font-size: 80px;
}
.team-name {
  color: yellow;
}
</style>
