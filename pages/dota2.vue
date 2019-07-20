<template>
  <div>
    <div :class="{hide: $store.state.matches.mode === 'next'}">
      <div v-if="$store.state.matches.DOTA2.now !== null">
        <BetItemDota2
          v-for="(match, index) in $store.state.matches.DOTA2.now"
          :class="{hide: match.STATUS !== $store.state.matches.status && $store.state.matches.status !== 'all'}"
          :index="match.LIVE_INDEX"
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
        oddsIds: {},
        matchNowIndex: null
      }
    },

    mounted() {
      let allowed = true

      window.addEventListener('keydown', e => {


        if (e.repeat !== undefined) {
          allowed = !e.repeat
        }
        if (!allowed) return;
        allowed = false

        const findStartItem = () => {
          console.log('findStartItem');
          if (document.getElementById('0')) {
            document.getElementById('0').focus()
          } else if (document.getElementById('1')) {
            document.getElementById('1').focus()
          } else if (document.getElementById('2')) {
            document.getElementById('2').focus()
          } else if (document.getElementById('3')) {
            document.getElementById('3').focus()
          } else if (document.getElementById('4')) {
            document.getElementById('4').focus()
          }
        }


        if (e.key === 'ArrowDown') {
          console.info('Dota2 component:')
          console.log('Active Element:' + document.activeElement)
          console.info('Key: ' + e.key)
          if (document.activeElement.id !== '') {
            this.matchNowIndex = parseInt(document.activeElement.id)
            if (document.getElementById(`${this.matchNowIndex + 1}`).id) {
              document.getElementById(`${this.matchNowIndex + 1}`).focus()
              this.matchNowIndex = parseInt(document.activeElement.id)
            }
          } else {
            findStartItem()
          }
        } else if (e.key === 'ArrowUp') {
          console.info('Dota2 component:')
          console.log('Active Element:' + document.activeElement)
          console.info('Key: ' + e.key)
          if (document.activeElement.id !== '') {
            this.matchNowIndex = parseInt(document.activeElement.id)
            if (document.getElementById(`${this.matchNowIndex - 1}`).id) {
              document.getElementById(`${this.matchNowIndex - 1}`).focus()
              this.matchNowIndex = parseInt(document.activeElement.id)
            }
          } else {
            findStartItem()
          }
        }


      })
      window.addEventListener('keyup', e => {
        allowed = true
      })
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
