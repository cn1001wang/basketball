<!--  -->
<template>
  <div>
    <div class="pb-4 pt-2">
      <van-button block type="primary" @click="handleConfirm">确定</van-button>
    </div>
    <div class="msg-label" vlo>场上球员</div>
    <div class="player-list">
      <div v-for="player in lineup" class="player-item" @click="handleDownClick(player)">
        <span class="player-number-item">{{ player.number }}</span>
        <span>{{ player.name }}</span>
        <div class="flex-1"></div>
        <span v-if="downPlayers.includes(player._id)" class="down-span">换下↓</span>
      </div>
    </div>
    <div class="msg-label mt-4">替补球员</div>
    <div class="player-list">
      <div v-for="player in substitute" class="player-item" @click="handleUpClick(player)">
        <span class="player-number-item">{{ player.number }}</span>
        <span>{{ player.name }}</span>
        <div class="flex-1"></div>
        <span v-if="upPlayers.includes(player._id)" class="up-span">换上↑</span>
      </div>
      <p v-if="substitute.length === 0">暂无替补选手</p>
    </div>
  </div>
</template>

<script>
import { gameApi, gameTimeApi } from '@/service/api'
import { showFailToast } from 'vant'
export default {
  props: {
    team: Object,
    game: Object,
    countdown: Number,
  },
  data() {
    return {
      downPlayers: [],
      upPlayers: [],
    }
  },
  computed: {
    lineup() {
      return this.team.activePlayers.filter((o) => this.team.lineup.includes(o._id))
    },
    substitute() {
      return this.team.activePlayers.filter((o) => !this.team.lineup.includes(o._id))
    },
  },
  methods: {
    handleUpClick(player) {
      let playerId = player._id
      let players = this.upPlayers
      if (players.includes(playerId)) {
        players.splice(players.indexOf(playerId), 1)
      } else {
        players.push(playerId)
      }
    },
    handleDownClick(player) {
      let playerId = player._id
      let players = this.downPlayers
      if (players.includes(playerId)) {
        players.splice(players.indexOf(playerId), 1)
      } else {
        players.push(playerId)
      }
    },
    async handleConfirm() {
      if (this.team.lineup.length + this.upPlayers.length - this.downPlayers.length > 5) {
        showFailToast('超过场上人数限制')
        return
      }
      let lineup = [...this.team.lineup]
      this.downPlayers.forEach((id) => {
        lineup.splice(lineup.indexOf(id), 1)
      })
      lineup = lineup.concat(this.upPlayers)
      let isTeama = this.team.id._id === this.game.teama.id._id
      let obj = {}
      let team = this.team
      obj[isTeama ? 'teama' : 'teamb'] = {
        lineup: lineup,
        id: team.id._id,
        color: team.color,
        activePlayers: team.activePlayers.map((o) => o._id),
        score: team.score,
        foulCount: team.foulCount,
        suspendCout: team.suspendCout,
      }
      this.insertGameTime()
      await gameApi.update(this.game._id, obj)
      this.$emit('reload')
    },
    async insertGameTime() {
      var arr = []
      this.downPlayers.forEach((o) => {
        arr.push({
          upOrDown: 0,
          player: o,
          quarter: this.game.section,
          time: this.countdown,
          matchId: this.game.match._id,
          gameId: this.game._id,
          teamId: this.team.id._id,
        })
      })
      this.upPlayers.forEach((o) => {
        arr.push({
          upOrDown: 1,
          player: o,
          quarter: this.game.section,
          time: this.countdown,
          matchId: this.game.match._id,
          gameId: this.game._id,
          teamId: this.team.id._id,
        })
      })
      gameTimeApi.add(arr)
    },
  },
}
</script>

<style lang="scss" scoped>
.msg-label {
  color: #999;
  font-size: 20px;
}
.player-list {
  .player-item {
    display: flex;
    border-bottom: 1px solid #e2e2e2;
    padding: 8px;
    align-items: center;
    .player-number-item {
      width: 50px;
      display: inline-block;
      color: #444;
    }
  }
}
.up-span,
.down-span {
  color: green;
  font-size: 20px;
  letter-spacing: 2px;
}
</style>
