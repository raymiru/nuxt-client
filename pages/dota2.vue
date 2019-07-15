<template>
 <div>
   <div :class="{hide: $store.state.matches.mode === 'next'}">
     <div v-if="$store.state.matches.DOTA2.now !== null">
       <BetItemDota2
         v-for="match in $store.state.matches.DOTA2.now"
         :class="{hide: match.STATUS !== $store.state.matches.status && $store.state.matches.status !== 'all'}"
         :key="match.DATA_ID"
         :dataId="match.DATA_ID"
         :tournamentLogo="match.TOURNAMENT_LOGO"
         :status="match.STATUS"
         :statusString="match.STATUS_STRING"
         :statusBuilder="match.STATUS_BUILDER"
         :teamA="match.TEAM_A"
         :teamB="match.TEAM_B"
       ></BetItemDota2>
     </div>
     <div v-else>
       <v-card-text>{{ $store.state.errorMessage }}</v-card-text>
     </div>
   </div>
   <div :class="{hide: $store.state.matches.mode === 'now'}">
     <div v-if="$store.state.matches.DOTA2.next !== null">
       <BetItemDota2Next
         v-for="match in $store.state.matches.DOTA2.next"
         :key="match.DATA_ID"
         :additionalEvents="match.ADDITIONAL_EVENTS"
         :dataId="match.DATA_ID"
         :tournamentLogo="match.TOURNAMENT_LOGO"
         :statusString="match.STATUS_STRING"
         :teamA="match.TEAM_A"
         :teamB="match.TEAM_B"
       ></BetItemDota2Next>
     </div>
   </div>
 </div>
</template>

<script>
  import BetItemDota2 from '~/components/BetItemDota2.vue'
  import BetItemDota2Next from '~/components/BetItemDota2Next.vue'

  import Chance from 'chance'


  const chance = new Chance()

  export default {
    name: 'Index',
    components: {
      BetItemDota2,
      BetItemDota2Next
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
