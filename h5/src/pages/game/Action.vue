<!--  -->
<template>
  <div v-if="game" class="game-board">
    <h1 class="h1-title">{{ game.match.name }}</h1>
    <action-header
      :game="game"
      :curTime="curTime"
      :events="events"
      :rest="!!restCountdown"
      :pause="!!pauseCountdown"
    ></action-header>
    <div class="action-body d-flex">
      <player-list
        :team="game.teama"
        :rule="game.rule"
        :events="events.filter((o) => o.teamId == game.teama.id._id)"
        @action="handleActionEvent($event, game.teama)"
      ></player-list>
      <div class="split-line"></div>
      <player-list
        :team="game.teamb"
        :rule="game.rule"
        :events="events.filter((o) => o.teamId == game.teamb.id._id)"
        @action="handleActionEvent($event, game.teamb)"
      ></player-list>
    </div>
    <div class="bottom-btns-wrap">
      <van-button @click="endPause" v-if="pauseCountdown">结束暂停</van-button>
      <van-button @click="endRest" v-else-if="restCountdown">结束休息</van-button>
      <template v-else>
        <van-icon name="play-circle" v-if="!countdownActive" @click="startTime" />
        <van-icon name="pause-circle" v-else @click="pauseTime" />
      </template>
      <van-icon name="add" @click="moreActionVisible = true" />
    </div>
    <van-popup v-model:show="actionEventVisible" round>
      <div v-if="activePlayer" class="action-dialog">
        <div class="px-4 py-3">
          {{ activeTeam.id.name }}
          {{ activePlayer.number }}
          号队员：
          {{ activePlayer.name }}
        </div>
        <div class="action-dialog-body">
          <div class="action-event-item">
            <div class="action-label">罚球</div>
            <van-button
              type="primary"
              class="action-btn"
              plain
              @click="actionEventClick(gameEventType.罚球)"
              >+1</van-button
            >
            <van-button class="action-btn" plain @click="actionEventClick(gameEventType.罚球未进)"
              >未进</van-button
            >
          </div>
          <div class="action-event-item">
            <div class="action-label">投篮</div>
            <van-button
              type="primary"
              class="action-btn"
              plain
              @click="getScore(gameEventType.两分)"
              >+2</van-button
            >
            <van-button class="action-btn" plain @click="actionEventClick(gameEventType.两分未进)"
              >未进</van-button
            >
          </div>
          <div class="action-event-item">
            <div class="action-label">三分</div>
            <van-button
              type="primary"
              class="action-btn"
              plain
              @click="getScore(gameEventType.三分)"
              >+3</van-button
            >
            <van-button class="action-btn" plain @click="actionEventClick(gameEventType.三分未进)"
              >未进</van-button
            >
          </div>
          <van-divider />
          <div class="action-event-item">
            <div class="action-label">犯规</div>
            <van-button
              type="danger"
              class="action-btn"
              plain
              @click="actionEventClick(gameEventType.犯规)"
              >普通</van-button
            >
            <van-button
              type="danger"
              class="action-btn"
              plain
              @click="actionEventClick(gameEventType.技术犯规)"
              >技术</van-button
            >
            <van-button
              type="danger"
              class="action-btn"
              plain
              @click="actionEventClick(gameEventType.违体犯规)"
              >违体</van-button
            >
          </div>
          <div class="action-event-item">
            <div class="action-label">失误</div>
            <van-button
              type="danger"
              class="action-btn"
              plain
              @click="actionEventClick(gameEventType.失误)"
              >+1</van-button
            >
          </div>
          <van-divider />
          <div class="action-event-item">
            <div class="action-label">篮板</div>
            <van-button
              type="primary"
              class="action-btn"
              plain
              @click="actionEventClick(gameEventType.前场篮板)"
              >前场</van-button
            >
            <van-button
              type="primary"
              class="action-btn"
              plain
              @click="actionEventClick(gameEventType.后场篮板)"
              >后场</van-button
            >
          </div>
          <div class="action-event-item">
            <div class="action-label">助攻</div>
            <van-button
              type="primary"
              class="action-btn"
              plain
              @click="actionEventClick(gameEventType.助攻)"
              >+1</van-button
            >
          </div>
          <div class="action-event-item">
            <div class="action-label">抢断</div>
            <van-button
              type="primary"
              class="action-btn"
              plain
              @click="actionEventClick(gameEventType.抢断)"
              >+1</van-button
            >
          </div>
          <div class="action-event-item">
            <div class="action-label">盖帽</div>
            <van-button
              type="primary"
              class="action-btn"
              plain
              @click="actionEventClick(gameEventType.盖帽)"
              >+1</van-button
            >
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model:show="moreActionVisible" round>
      <div class="action-dialog">
        <div class="px-4 py-3">更多操作</div>
        <div class="action-dialog-body">
          <div class="action-event-item">
            <div class="action-label">暂停</div>
            <van-button type="primary" class="action-btn" plain @click="teamPause(game.teama.id)">
              {{ game.teama.id.name }}暂停
            </van-button>
            <van-button type="primary" class="action-btn" plain @click="teamPause(game.teamb.id)">
              {{ game.teamb.id.name }}暂停
            </van-button>
          </div>
          <div class="action-event-item">
            <div class="action-label">换人</div>
            <van-button type="primary" class="action-btn" plain @click="replacement(game.teama)">
              {{ game.teama.id.name }}换人
            </van-button>
            <van-button type="primary" class="action-btn" plain @click="replacement(game.teamb)">
              {{ game.teamb.id.name }}换人
            </van-button>
          </div>
          <div class="action-event-item">
            <div class="action-label">事件</div>
            <van-button type="primary" class="action-btn" plain @click="openEventVisible">
              查看
            </van-button>
          </div>

          <van-divider />
          <div v-if="game.section !== quarterNumber" class="action-event-item">
            <div class="action-label">结束本节</div>
            <van-button type="danger" class="action-btn" plain @click="handleCloseSection">
              结束本节
            </van-button>
          </div>
          <div class="action-event-item">
            <div class="action-label">结束比赛</div>
            <van-button type="danger" class="action-btn" plain @click="handleCloseGame">
              结束比赛
            </van-button>
          </div>
        </div>
      </div>
    </van-popup>

    <van-popup v-model:show="assistVisible" round>
      <div class="action-dialog" v-if="assistVisible">
        <div class="px-4 py-3 d-flex ai-center">
          选择助攻球员
          <div class="flex-1"></div>
          <van-icon name="close" @click="noAssistClick" />
        </div>
        <div class="action-dialog-body px-4 pb-5">
          <div>
            <div
              v-for="player in assistPlayers"
              :key="player._id"
              @click="assistEvent(player)"
              class="player-item"
            >
              <span class="player-number-item">{{ player.number }}</span>
              <span>{{ player.name }}</span>
            </div>
            <div @click="noAssistClick" class="player-item text-grey-1">无助攻球员</div>
          </div>
        </div>
      </div>
    </van-popup>

    <van-popup v-model:show="eventVisible">
      <div class="action-dialog">
        <div class="px-4 py-3 d-flex ai-center">
          <span>比赛事件列表</span>
          <div class="flex-1"></div>
          <van-icon name="close" @click="eventVisible = false" />
        </div>
        <div class="action-dialog-body px-4 pb-5">
          <event-list :events="events" :game="game"></event-list>
        </div>
      </div>
    </van-popup>

    <van-popup v-model:show="replaceVisible" round>
      <div v-if="replaceVisible" class="action-dialog">
        <div class="px-4 py-3 d-flex ai-center">
          <span>{{ activeReplaceTeam.id.name }}换人</span>
          <div class="flex-1"></div>
          <van-icon name="close" @click="replaceVisible = false" />
        </div>
        <div class="action-dialog-body px-4 pb-5">
          <replace-player
            :team="activeReplaceTeam"
            :game="game"
            :countdown="countdown"
            @reload="handleReplaceReload"
          ></replace-player>
        </div>
      </div>
    </van-popup>
  </div>
  <div class="van-overlay" v-if="startOverlayVisible">
    <overlay-cover v-if="game" :game="game" @start="firstStartGame"></overlay-cover>
  </div>
</template>

<script>
import { gameApi, gameEventApi, gameTimeApi } from '@/service/api'
import ActionHeader from './components/ActionHeader.vue'
import PlayerList from './components/PlayerList.vue'
import EventList from './components/EventList.vue'
import ReplacePlayer from './components/ReplacePlayer.vue'
import OverlayCover from './components/OverlayCover.vue'
import gameEventType from './gameEventType'
import local from '@/utils/local'
import { showConfirmDialog, showDialog } from 'vant'
import router from '@/router'

export default {
  components: { ActionHeader, PlayerList, EventList, ReplacePlayer, OverlayCover },
  props: {
    id: String,
  },
  data() {
    return {
      gameEventType,
      game: null,
      events: [],
      countdownActive: false,
      countdown: 0,
      restCountdown: null,
      pauseCountdown: null,
      pauseTimer: null,
      restTimer: null,
      timer: null,

      actionEventVisible: false,
      activePlayer: null,
      activeTeam: null,

      moreActionVisible: false,

      assistVisible: false,
      eventVisible: false,

      activeReplaceTeam: null,
      replaceVisible: false,

      startOverlayVisible: true,
    }
  },
  computed: {
    assistPlayers() {
      if (!this.activeTeam) return []
      return this.activeTeam.activePlayers.filter(
        (o) => this.activeTeam.lineup.includes(o._id) && o._id != this.activePlayer._id
      )
    },
    // 每节比赛时间
    timeOfEach() {
      return this.game.rule.timeOfEach * 60
    },
    // 常规时间节数
    quarterNumber() {
      return this.game.rule.quarterNumber
    },
    // 节间休息时间
    quarterRestTime() {
      return this.game.rule.quarterRestTime
    }, // 半场休息时间
    halftimeRestTime() {
      return this.game.rule.halftimeRestTime
    },
    // // 加时赛休息时间
    // overtimeRestTime: { type: Number, default: 2 },
    // // 加时赛时间
    // timeOfOvertime: { type: Number, default: 5 },
    curTime() {
      let time = this.pauseCountdown
        ? this.pauseCountdown
        : this.restCountdown
        ? this.restCountdown
        : this.timeOfEach - this.countdown

      time = time > 0 ? time : 0
      let first = Math.floor(time / 60)
      first = first >= 10 ? first : '0' + first
      let scend = time % 60
      scend = scend >= 10 ? scend : '0' + scend
      return [first.toString(), scend.toString()]
    },
  },
  async created() {
    let res = await gameApi.getById(this.id)
    this.game = res
    this.loadEvents()
    // getById里没有players的信息
    // this.events = res.events
    let countdown = local.data('gameTime')[this.game._id]
    if (countdown) {
      this.countdown = countdown
    }
  },
  beforeDestroy() {
    this.resetTimer()
  },
  methods: {
    // 根据队伍id获取分数
    getTeamScore(teamId) {
      let teamEvents = this.events.filter((o) => o.teamId === teamId)
      return (
        teamEvents.filter((o) => o.type === gameEventType.罚球).length +
        teamEvents.filter((o) => o.type === gameEventType.两分).length * 2 +
        teamEvents.filter((o) => o.type === gameEventType.三分).length * 3
      )
    },
    resetTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (this.restTimer) {
        clearTimeout(this.restTimer)
      }
      if (this.pauseTimer) {
        clearTimeout(this.pauseTimer)
      }
    },
    openEventVisible() {
      this.eventVisible = true
      this.moreActionVisible = false
    },
    async loadEvents() {
      this.events = await gameEventApi.getEventsByGameId(this.game._id)
    },
    handleActionEvent(player, team) {
      this.actionEventVisible = true
      this.activePlayer = player
      this.activeTeam = team
    },
    handleCloseGame() {
      this.moreActionVisible = false
      showConfirmDialog({
        title: '立即结束比赛？',
        message: '结束后自动保存所有数据到服务器',
        confirmButtonText: '确定',
      })
        .then(() => {
          this.closeGame()
        })
        .catch(() => {})
    },
    // 结束比赛
    async closeGame() {
      this.resetTimer()
      await gameApi.endGame(this.game._id)
      router.replace(`/game/result?id=${this.game._id}`)
    },
    // 手动结束本节
    handleCloseSection() {
      this.moreActionVisible = false
      showConfirmDialog({
        title: '结束本节比赛？',
        message: '点击确定进入节间休息',
        confirmButtonText: '确定',
      })
        .then(() => {
          this.goInRest()
        })
        .catch(() => {})
    },
    // 进入休息时间
    goInRest() {
      this.countdown = 0
      // 存下当前时间
      local.data('gameTime', {
        key: this.game._id,
        value: this.countdown,
      })
      gameApi.update(this.game._id, { countdown: this.countdown })
      this.countdownActive = false
      this.resetTimer()
      // 休息时间
      this.restCountdown =
        (this.game.section === this.quarterNumber / 2
          ? this.halftimeRestTime
          : this.quarterRestTime) * 60
      this.startRestTime()
      this.game.section++
      gameApi.update(this.game._id, { section: this.game.section })
    },
    endRest() {
      this.restCountdown = null
      clearTimeout(this.restTimer)
      this.startTime()
    },
    startRestTime() {
      this.restTimer = setTimeout(() => {
        this.restCountdown--
        if (this.restCountdown === 0) {
          this.endRest()
          // 休息时间到
          return
        }

        // 存下当前时间
        let data = {
          key: this.game._id,
          value: this.restCountdown,
        }
        local.data('gameRestTime', data)

        this.startRestTime()
      }, 1000)
    },
    // 第一次自动开始比赛
    firstStartGame() {
      this.startTime()
      this.startOverlayVisible = false
      let arr = []
      this.game.teama.lineup.forEach((o) => {
        arr.push({
          upOrDown: 1,
          player: o,
          quarter: this.game.section,
          time: this.countdown,
          matchId: this.game.match._id,
          gameId: this.game._id,
          teamId: this.game.teama.id._id,
        })
      })
      this.game.teamb.lineup.forEach((o) => {
        arr.push({
          upOrDown: 1,
          player: o,
          quarter: this.game.section,
          time: this.countdown,
          matchId: this.game.match._id,
          gameId: this.game._id,
          teamId: this.game.teamb.id._id,
        })
      })
      gameTimeApi.add(arr)
    },
    startTime() {
      this.countdownActive = true
      this.timer = setTimeout(() => {
        this.countdown++
        if (this.countdown > this.timeOfEach) {
          if (this.game.section === this.quarterNumber) {
            let teamaScore = this.getTeamScore(this.game.teama.id._id)
            let teambScore = this.getTeamScore(this.game.teamb.id._id)
            let message =
              teamaScore > teambScore
                ? this.game.teama.id.name + '获胜'
                : teamaScore < teambScore
                ? this.game.teamb.id.name + '获胜'
                : '平局'
            // 比赛结束
            showDialog({
              title: '比赛结束',
              message: message,
              confirmButtonText: '确定',
            }).then(() => {
              this.closeGame()
            })
            return
          }
          // 小节结束
          showDialog({
            title: '本节已经结束',
            message: '点击确定进入节间休息',
            confirmButtonText: '确定',
          }).then(() => {
            this.goInRest()
          })
          return
        }

        // 存下当前时间
        let data = {
          key: this.game._id,
          value: this.countdown,
        }
        local.data('gameTime', data)

        gameApi.update(this.game._id, { countdown: this.countdown })

        this.startTime()
      }, 1000)
    },
    pauseTime() {
      this.countdownActive = !this.countdownActive
      clearTimeout(this.timer)
      this.timer = null
    },
    replacement(team) {
      this.moreActionVisible = false
      this.activeReplaceTeam = team
      this.replaceVisible = true
    },
    async handleReplaceReload() {
      this.replaceVisible = false

      let res = await gameApi.getById(this.id)
      let isTeama = this.activeReplaceTeam.id._id === this.game.teama.id._id
      this.activeReplaceTeam.lineup = res[isTeama ? 'teama' : 'teamb'].lineup
    },
    async teamPause(team) {
      await gameEventApi.add({
        type: gameEventType.暂停,
        // player: player._id,
        quarter: this.game.section,
        time: this.curTime.join(':'),
        matchId: this.game.match._id,
        gameId: this.game._id,
        teamId: team._id,
      })
      this.loadEvents()
      this.moreActionVisible = false
      this.pauseTime()

      this.bolPauseGame = true
      this.pauseCountdown = this.game.rule.pauseDuration
      this.startPauseTime()
    },
    startPauseTime() {
      this.pauseTimer = setTimeout(() => {
        this.pauseCountdown--
        if (this.pauseCountdown === 0) {
          this.endRest()
          // 暂停时间到
          return
        }

        // 存下当前时间
        let data = {
          key: this.game._id,
          value: this.pauseCountdown,
        }
        local.data('gamePauseTime', data)

        this.startPauseTime()
      }, 1000)
    },
    endPause() {
      this.pauseCountdown = null
      clearTimeout(this.pauseTimer)
      this.startTime()
    },
    getScore(type) {
      this.actionEventVisible = false
      this.assistVisible = true
      this.activeEventType = type
    },
    noAssistClick() {
      this.assistVisible = false
      this.actionEventClick(this.activeEventType)
      this.activeEventType = null
    },
    async assistEvent(player) {
      this.assistVisible = false
      await gameEventApi.add({
        type: gameEventType.助攻,
        player: player._id,
        quarter: this.game.section,
        time: this.curTime.join(':'),
        matchId: this.game.match._id,
        gameId: this.game._id,
        teamId: this.activePlayer.teamId,
      })
      this.actionEventClick(this.activeEventType)
      this.activeEventType = null
    },
    async actionEventClick(type) {
      this.actionEventVisible = false
      await gameEventApi.add({
        type: type,
        player: this.activePlayer._id,
        quarter: this.game.section,
        time: this.curTime.join(':'),
        matchId: this.game.match._id,
        gameId: this.game._id,
        teamId: this.activePlayer.teamId,
      })
      this.loadEvents()

      this.activePlayer = null
      this.activeTeam = null
    },
  },
}
</script>

<style lang="scss" scoped>
.h1-title {
  text-align: center;
  line-height: 1;
  font-size: 40px;
}
.game-board {
  height: 100vh;
  background: black;
  color: white;
  // font-size: 40px;
}
.action-body {
  height: calc(100vh - 252px);
}
.split-line {
  border-left: 2px solid #fff;
}
.team-list {
  height: 100%;
  overflow: auto;
  padding: 10px 25px;
  box-sizing: border-box;
}
.bottom-btns-wrap {
  display: flex;
  position: absolute;
  bottom: 15px;
  right: 15px;
  font-size: 42px;
  i {
    margin: 0 5px;
  }
}
.action-dialog {
  color: #000;
  width: 80vw;
  font-size: 25px;
  .action-event-item {
    margin-bottom: 15px;
    padding: 0 15px;
    display: flex;
  }
  .action-label {
    color: #666;
  }
  .action-btn {
    width: 200px;
    line-height: 40px;
    height: 40px;
    font-size: 25px;
    // text-align: center;
    // border: 1px solid #000;
    margin: 0 15px;
    // border-radius: 10px;
  }
}
.player-item {
  line-height: 50px;
  border-bottom: 1px solid #e2e2e2;
  .player-number-item {
    display: inline-block;
    width: 35px;
    margin-right: 5px;
  }
}
</style>
