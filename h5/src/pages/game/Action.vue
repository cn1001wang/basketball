<!--  -->
<template>
  <div v-if="game">
    <div class="action-header">
      <div class="team-title-item">
        <div>{{ game.team.id.name }}</div>
      </div>
      <div class="team-title-item">
        <div>{{ game.team.id.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { gameApi } from '@/service/api'

export default {
  props: {
    id: String,
  },
  data() {
    return {
      game: null,
    }
  },
  async created() {
    let res = await gameApi.getById(this.id)
    this.game = res
  },
}
</script>

<style lang="scss" scoped></style>
