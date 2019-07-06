<template>
  <div>
    <div :class="{hide: $store.state.matches.mode === 'next'}">
      <div v-if="$store.state.matches.CSGO.now !== null">
        <BetItem
          v-for="match in $store.state.matches.CSGO.now"
          :class="{hide: match.STATUS !== $store.state.matches.status && $store.state.matches.status !== 'all'}"
          :key="match.DATA_ID"
          :dataId="match.DATA_ID"
          :tournamentLogo="match.TOURNAMENT_LOGO"
          :status="match.STATUS"
          :teamA="match.TEAM_A"
          :teamB="match.TEAM_B"
        ></BetItem>
      </div>
      <div v-else>
        <v-card-text>{{ $store.state.errorMessage }}</v-card-text>
      </div>
    </div>
    <div :class="{hide: $store.state.matches.mode === 'now'}">
      NEXT
    </div>
  </div>
</template>

<script>
  import BetItem from '~/components/BetItem.vue'
  import Chance from 'chance'

  const chance = new Chance()

  export default {
    name: 'Index',
    components: {
      BetItem
    },
    data() {
      return {
        oddsIds: {}
      }
    },

    methods: {
      rand() {
        return chance.integer()
      }
    }
  }
</script>

<style scoped>
  .hide {
    display: none;
  }
</style>
