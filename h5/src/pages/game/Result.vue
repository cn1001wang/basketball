<!--  -->
<template>
  <div class="main-body">
    <van-nav-bar title="技术统计" left-text="完成" @click-left="onClickLeft" />
    <!-- left-arrow -->
    <div v-if="game" class="result-body">
      <div class="result-card">
        <div class="text-title">赛况</div>
        <div>
          <van-row class="text-grey-1">
            <van-col :span="totalRowSpan">球队</van-col>
            <van-col :span="totalRowSpan">总分</van-col>
            <van-col :span="totalRowSpan" v-for="i in quarterNumber" :key="i">第{{ i }}节</van-col>
          </van-row>
          <div class="divider-row"></div>
          <van-row>
            <van-col span="4">{{ game.teama.id.name }}</van-col>
            <van-col span="4">{{ getScoreByTeamId(game.teama) }}</van-col>
            <van-col :span="totalRowSpan" v-for="i in quarterNumber" :key="i">
              {{ getScoreByIndex(i, game.teama) }}
            </van-col>
          </van-row>
          <van-row>
            <van-col span="4">{{ game.teamb.id.name }}</van-col>
            <van-col span="4">{{ getScoreByTeamId(game.teamb) }}</van-col>
            <van-col :span="totalRowSpan" v-for="i in quarterNumber" :key="i">
              {{ getScoreByIndex(i, game.teamb) }}
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="sizebox-15"></div>
      <div class="result-card">
        <div class="text-title">{{ game.teamb.id.name }}</div>
        <div class="table-wrap">
          <table class="qgg-table" style="width: 680px">
            <thead>
              <tr>
                <th width="120">球员</th>
                <th width="80">得分</th>
                <th width="80">罚球</th>
                <th width="80">两分</th>
                <th width="80">三分</th>
                <th width="80">篮板</th>
                <th width="80">助攻</th>
                <th width="80">抢断</th>
                <th width="80">盖帽</th>
                <th width="80">犯规</th>
                <th width="120">上场时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="player in game.teama.activePlayers" :key="player._id">
                <td>{{ player.name }}</td>
                <td>{{ getScoreByPlayer(player._id) }}</td>
                <td>{{ getPointByPlayer(player._id, '1') }}</td>
                <td>{{ getPointByPlayer(player._id, '2') }}</td>
                <td>{{ getPointByPlayer(player._id, '3') }}</td>
                <td>{{ getEventByPT(player._id, 'offensiveRebounds', 'defensiveRebounds') }}</td>
                <td>{{ getEventByPT(player._id, 'assist') }}</td>
                <td>{{ getEventByPT(player._id, 'steal') }}</td>
                <td>{{ getEventByPT(player._id, 'blockShot') }}</td>
                <td>{{ getEventByPT(player._id, 'foul', 'technicalFoul', 'flagrantFoul') }}</td>
                <td>{{ getTimeFilter(getGameTimeByP(player._id)) }}</td>
              </tr>
              <tr>
                <td>合计</td>
                <td>{{ getScoreByTeamId(game.teama) }}</td>
                <td>{{ getPointByTeam(game.teama, '1') }}</td>
                <td>{{ getPointByTeam(game.teama, '2') }}</td>
                <td>{{ getPointByTeam(game.teama, '3') }}</td>
                <td>{{ getEventByTT(game.teama, 'offensiveRebounds', 'defensiveRebounds') }}</td>
                <td>{{ getEventByTT(game.teama, 'assist') }}</td>
                <td>{{ getEventByTT(game.teama, 'steal') }}</td>
                <td>{{ getEventByTT(game.teama, 'blockShot') }}</td>
                <td>{{ getEventByTT(game.teama, 'foul', 'technicalFoul', 'flagrantFoul') }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="sizebox-15"></div>
      <div class="result-card">
        <div class="text-title">{{ game.teamb.id.name }}</div>
        <div class="table-wrap">
          <table class="qgg-table" style="width: 680px">
            <thead>
              <tr>
                <th width="120">球员</th>
                <th width="80">得分</th>
                <th width="80">罚球</th>
                <th width="80">两分</th>
                <th width="80">三分</th>
                <th width="80">篮板</th>
                <th width="80">助攻</th>
                <th width="80">抢断</th>
                <th width="80">盖帽</th>
                <th width="80">犯规</th>
                <th width="120">上场时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="player in game.teamb.activePlayers" :key="player._id">
                <td>{{ player.name }}</td>
                <td>{{ getScoreByPlayer(player._id) }}</td>
                <td>{{ getPointByPlayer(player._id, '1') }}</td>
                <td>{{ getPointByPlayer(player._id, '2') }}</td>
                <td>{{ getPointByPlayer(player._id, '3') }}</td>
                <td>{{ getEventByPT(player._id, 'offensiveRebounds', 'defensiveRebounds') }}</td>
                <td>{{ getEventByPT(player._id, 'assist') }}</td>
                <td>{{ getEventByPT(player._id, 'steal') }}</td>
                <td>{{ getEventByPT(player._id, 'blockShot') }}</td>
                <td>{{ getEventByPT(player._id, 'foul', 'technicalFoul', 'flagrantFoul') }}</td>
                <td>{{ getTimeFilter(getGameTimeByP(player._id)) }}</td>
              </tr>
              <tr>
                <td>合计</td>
                <td>{{ getScoreByTeamId(game.teamb) }}</td>
                <td>{{ getPointByTeam(game.teamb, '1') }}</td>
                <td>{{ getPointByTeam(game.teamb, '2') }}</td>
                <td>{{ getPointByTeam(game.teamb, '3') }}</td>
                <td>{{ getEventByTT(game.teamb, 'offensiveRebounds', 'defensiveRebounds') }}</td>
                <td>{{ getEventByTT(game.teamb, 'assist') }}</td>
                <td>{{ getEventByTT(game.teamb, 'steal') }}</td>
                <td>{{ getEventByTT(game.teamb, 'blockShot') }}</td>
                <td>{{ getEventByTT(game.teamb, 'foul', 'technicalFoul', 'flagrantFoul') }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import gameEventType from './gameEventType'
import { gameApi, gameTimeApi } from '@/service/api/index.js'
export default {
  props: {
    id: String,
  },
  data() {
    return {
      game: null,
      gameTimes: [],
    }
  },
  computed: {
    // 常规时间节数
    quarterNumber() {
      return this.game.rule.quarterNumber
    },
    totalRowSpan() {
      return 24 / (2 + this.quarterNumber)
    },
  },
  created() {
    this.loadGame()
    this.loadGameTimes()
  },
  methods: {
    async loadGameTimes() {
      let res = await gameTimeApi.getTimesByGameId(this.id)
      this.gameTimes = res
    },
    //---start---
    getTimeFilter(total){
      return Math.ceil(total / 60) + "' " + (total % 60)
    },
    getGameTimeByP(playerId) {
      // let quarterNumber = this.game.rule.quarterNumber
      let timeOfEach = this.game.rule.timeOfEach * 60
      let times = this.gameTimes.filter((o) => o.player === playerId)
      let temp = null
      let total = 0
      for (let i = 0; i < times.length; i++) {
        let time = times[i]
        if (time.upOrDown === 1) {
          temp = {
            quarter: time.quarter,
            time: time.time,
          }
        } else {
          if (!temp) continue
          if (time.quarter === temp.quarter) {
            total += Number(time.time) - Number(temp.time)
          } else {
            let quarterSpan = time.quarter - temp.quarter - 1
            if (quarterSpan > 0) total += quarterSpan * timeOfEach
            total += timeOfEach - Number(temp.time)
            total += Number(time.time)
          }
          temp = null
        }
      }
      if (temp != null) {
        let quarter = this.game.rule.quarterNumber
        let quarterSpan = quarter - temp.quarter
        if (quarterSpan > 0) total += quarterSpan * timeOfEach
        total += timeOfEach - Number(temp.time)
        temp = null
      }
      return total
    },
    getEventsByPlayer(playerId) {
      return this.game.events.filter((o) => o.player === playerId)
    },
    getScoreByPlayer(playerId) {
      return this.getScore(this.getEventsByPlayer(playerId))
    },
    getEventByPT(playerId, ...eventTypes) {
      return this.getEventsByPlayer(playerId).filter((o) => eventTypes.includes(o.type)).length
    },
    getEventByTT(team, ...eventTypes) {
      return this.getEventsByTeam(team).filter((o) => eventTypes.includes(o.type)).length
    },
    getFoulByPlayer(playerId) {
      return this.getEventsByPlayer(playerId).filter(
        (o) =>
          [gameEventType.犯规, gameEventType.技术犯规, gameEventType.违体犯规].includes(o.type) &&
          o.quarter === this.game.section
      ).length
    },

    getPointByPlayer(playerId, pointNumber) {
      let gotNum = this.getEventByPT(playerId, pointNumber + 'points')
      let lossNum = this.getEventByPT(playerId, 'loss' + pointNumber + 'points')
      return gotNum + '/' + (gotNum + lossNum)
    },
    getPointByTeam(team, pointNumber) {
      let gotNum = this.getEventByTT(team, pointNumber + 'points')
      let lossNum = this.getEventByTT(team, 'loss' + pointNumber + 'points')
      return gotNum + '/' + (gotNum + lossNum)
    },

    //---end--
    getScore(teamEvents) {
      return (
        teamEvents.filter((o) => o.type === gameEventType.罚球).length +
        teamEvents.filter((o) => o.type === gameEventType.两分).length * 2 +
        teamEvents.filter((o) => o.type === gameEventType.三分).length * 3
      )
    },
    getEventsByTeam(team) {
      return this.game.events.filter((o) => o.teamId === team.id._id)
    },
    getScoreByIndex(i, team) {
      return this.getScore(this.getEventsByTeam(team).filter((o) => o.quarter === i))
    },
    getScoreByTeamId(team) {
      return this.getScore(this.getEventsByTeam(team))
    },
    async loadGame() {
      let res = await gameApi.getById(this.id)
      this.game = res
    },
    onClickLeft() {
      router.back()
    },
  },
}
</script>

<style lang="scss" scoped>
.sizebox-15 {
  height: 15px;
}
.result-body {
  background-color: #f2f2f2;
  min-height: calc(100vh - 46px);
  box-sizing: border-box;
}
.result-card {
  padding: 15px;
  background-color: #fff;
}
.text-title {
  font-size: 24px;
  margin-bottom: 10px;
}
.divider-row {
  border-top: 1px solid #e2e2e2;
  margin: 10px 0 15px;
}

.r-row {
  display: flex;
  overflow: auto;
}
.table-wrap {
  width: 100%;
  overflow: auto;
}
</style>
