<!--  -->
<template>
  <div v-if="game" class="game-board">
    <h1 class="h1-title">{{ game.match.name }}</h1>
    <action-header :game="game" :curTime="curTime" :events="events"></action-header>
    <div class="action-body d-flex">
      <player-list
        :team="game.teama"
        :rule="game.rule"
        :foulList="foulList"
        :events="events.filter((o) => o.teamId == game.teama.id._id)"
        @action="handleActionEvent($event, game.teama)"
      ></player-list>
      <div class="split-line"></div>
      <player-list
        :team="game.teamb"
        :rule="game.rule"
        :foulList="foulList"
        :events="events.filter((o) => o.teamId == game.teamb.id._id)"
        @action="handleActionEvent($event, game.teamb)"
      ></player-list>
    </div>
    <div class="bottom-btns-wrap">
      <van-icon name="play-circle" v-if="!countdownActive" @click="startTime" />
      <van-icon name="pause-circle" v-else @click="pauseTime" />
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
            <van-button type="primary" class="action-btn" plain> 换人 </van-button>
          </div>
          <div class="action-event-item">
            <div class="action-label">事件</div>
            <van-button type="primary" class="action-btn" plain @click="openEventVisible">
              查看
            </van-button>
          </div>

          <van-divider />
          <div class="action-event-item">
            <div class="action-label">结束本节</div>
            <van-button type="danger" class="action-btn" plain> 结束本节 </van-button>
          </div>
          <div class="action-event-item">
            <div class="action-label">结束比赛</div>
            <van-button type="danger" class="action-btn" plain> 结束比赛 </van-button>
          </div>
        </div>
      </div>
    </van-popup>

    <van-popup v-model:show="assistVisible" round>
      <div class="action-dialog">
        <div class="px-4 py-3 d-flex ai-center">
          选择助攻球员
          <div class="flex-1"></div>
          <van-icon name="close" @click="assistVisible = false" />
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
  </div>
</template>

<script>
import { gameApi, gameEventApi } from '@/service/api'
import ActionHeader from './components/ActionHeader.vue'
import PlayerList from './components/PlayerList.vue'
import EventList from './components/EventList.vue'
import gameEventType from './gameEventType'

export default {
  components: { ActionHeader, PlayerList, EventList },
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
      timer: null,

      actionEventVisible: false,
      activePlayer: null,
      activeTeam: null,

      moreActionVisible: false,

      assistVisible: false,
      eventVisible: false,
    }
  },
  computed: {
    assistPlayers() {
      return this.activeTeam.activePlayers.filter((o) => this.activeTeam.lineup.includes(o._id))
    },
    curTime() {
      let time = 10 * 60 - this.countdown
      time = time > 0 ? time : 0
      let first = Math.floor(time / 60)
      first = first >= 10 ? first : '0' + first
      let scend = time % 60
      scend = scend > 10 ? scend : '0' + scend
      return [first.toString(), scend.toString()]
    },
    foulList() {
      return {
        1: 0,
        2: 1,
      }
    },
  },
  async created() {
    let res = await gameApi.getById(this.id)
    this.game = res
    this.loadEvents()
  },
  methods: {
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
    startTime() {
      this.countdownActive = true
      this.timer = setTimeout(() => {
        this.countdown++
        // 存下当前时间
        // localStorage.setItem("lastname", "Smith");
        this.startTime()
      }, 1000)
    },
    pauseTime() {
      this.countdownActive = !this.countdownActive
      clearTimeout(this.timer)
      this.timer = null
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
    },
    getScore(type) {
      this.assistVisible = true
      this.activeEventType = type
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
