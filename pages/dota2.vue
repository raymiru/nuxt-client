<template>
  <div>
    <div :class="{hide: $store.state.matches.mode === 'next'}">
      <div v-if="$store.state.matches.DOTA2.now !== null">
        <BetItemDota2
          v-for="(match, index) in $store.state.matches.DOTA2.now"
          :class="{hide: match.STATUS !== $store.state.matches.status && $store.state.matches.status !== 'all'}"
          :index="index"
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
      window.addEventListener('keydown', e => {
        const findStartItem = () => {
          console.log('findStartItem');
          if (!document.getElementById('0').classList.contains('hide')) {
            document.getElementById('0').focus()
          } else if (!document.getElementById('1').classList.contains('hide')) {
            document.getElementById('1').focus()
          } else if (!document.getElementById('2').classList.contains('hide')) {
            document.getElementById('2').focus()
          } else if (!document.getElementById('3').classList.contains('hide')) {
            document.getElementById('3').focus()
          } else if (!document.getElementById('4').classList.contains('hide')) {
            document.getElementById('4').focus()
          }
        }

        const arrowDown = (z) => {
          if (document.getElementById(`${z + 1}`).id !== '' && !document.getElementById(`${z + 1}`).classList.contains('hide')) {
            document.getElementById(`${z + 1}`).focus()
          } else {
            console.log('INACHE')
            arrowUp(z+1)
          }
        }


        const arrowUp = (z) => {
          if (document.getElementById(`${z - 1}`).id !== '' && !document.getElementById(`${z - 1}`).classList.contains('hide')) {
            document.getElementById(`${z - 1}`).focus()
          } else {
            console.log('INACHE')
            arrowUp(z-1)
          }
        }


        if (e.key === 'ArrowDown') {
          if (document.activeElement.id !== '') {
            let z = 0
            this.matchNowIndex = parseInt(document.activeElement.id)
            z = this.matchNowIndex + z

            if (document.getElementById(`${z + 1}`).id !== '' && !document.getElementById(`${z + 1}`).classList.contains('hide')) {
              console.log('F1')
              document.getElementById(`${z + 1}`).focus()
            } else if (document.getElementById(`${z + 2}`).id !== '' && !document.getElementById(`${z + 2}`).classList.contains('hide')) {
              console.log('F2')
              document.getElementById(`${z  - 2}`).focus()
            } else if (document.getElementById(`${z + 3}`).id !== '' && !document.getElementById(`${z + 3}`).classList.contains('hide')) {
              console.log('F3')
              document.getElementById(`${z  - 3}`).focus()
            }
          } else {
            findStartItem()
          }
        } else if (e.key === 'ArrowUp') {
          if (document.activeElement.id !== '') {
            let z = 0
            this.matchNowIndex = parseInt(document.activeElement.id)
            z = this.matchNowIndex + z

            if (document.getElementById(`${z - 1}`).id !== '' && !document.getElementById(`${z - 1}`).classList.contains('hide')) {
              document.getElementById(`${z  - 1}`).focus()
            } else if (document.getElementById(`${z - 2}`).id !== '' && !document.getElementById(`${z - 2}`).classList.contains('hide')) {
              document.getElementById(`${z  - 2}`).focus()
            } else if (document.getElementById(`${z - 3}`).id !== '' && !document.getElementById(`${z - 3}`).classList.contains('hide')) {
              document.getElementById(`${z  - 3}`).focus()
            }
          } else {
            findStartItem()
          }
        }

        console.log(e)
        // if (e.key === 'ArrowUp' && this.matchNowIndex) {
        //   document.getElementById(this.matchNowIndex-1).focus()
        //   this.matchNowIndex = document.activeElement.id
        // } else if (e.key === 'ArrowDown') {
        //   document.getElementById(this.matchNowIndex+1).focus()
        //   this.matchNowIndex = document.activeElement.id
        // }
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
