<template>
  <div v-if="$store.state.matches.length > 0">
    <BetItem
      v-for="match in $store.state.matches"
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
    sockets: {
      updatematch_dota: function(data) {
        const oddsObj = JSON.parse(data)
        for (const match in this.$store.state.matches) {
          if (
            this.$store.state.matches[match].LIVE_DATA_IDS.includes(
              oddsObj.id.toString()
            )
          ) {
            console.log('TRUE')
            this.$store.commit('oddsSync', { match, oddsObj })
          } else {
            console.log(oddsObj.id)
            console.log(this.$store.state.matches[match].LIVE_DATA_IDS)
          }
        }
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
  .container {
  }
</style>
