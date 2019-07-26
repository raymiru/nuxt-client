import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// noinspection JSValidateTypes
const store = () =>
  new Vuex.Store({
    state: {
      errorMessage: '',

      matches: {
        mode: 'now',
        status: 'all',
        DOTA2: {
          now: [],
          next: []
        },
        CSGO: {
          now: [],
          next: []
        }
      },
      steamApiData: [],
      players: [],
      playersBets: {},
      listReadyToBetPlayers: {}
    },
    mutations: {
      errorMessageThrow(state, payload) {
        state.errorMessage = payload
      },

      setMatchMode(state, payload) {
        state.matches.mode = payload
      },

      setMatchStatus(state, payload) {
        state.matches.status = payload
      },

      matchesSyncDOTA2Now(state, payload) {
        state.matches.DOTA2.now = payload
      },

      matchesSyncDOTA2Next(state, payload) {
        state.matches.DOTA2.next = payload
      },

      matchesSyncCSGONow(state, payload) {
        state.matches.CSGO.now = payload
      },

      matchesSyncCSGONext(state, payload) {
        state.matches.CSGO.next = payload
      },

      steamApiDataSync(state, payload) {
        state.steamApiData = payload
      },

      playersBetsSync(state, payload) {
        state.playersBets = payload
      },

      playersSync(state, payload) {
        state.players = payload
        // state.matches.DOTA2.now.forEach(match => {
        //   if (match.STATUS === 'live') {
        //     state.listReadyToBetPlayers[match.DATA_ID] = []
        //     state.players.forEach(player => {
        //       if ((player.status === 'ready' || player.status === 'moving' || player.status === '2window') && player.now_bets[match.DATA_ID][match.STATUS_BUILDER].STATUS === 'ready') {
        //         state.listReadyToBetPlayers[match.DATA_ID].push(player.username)
        //       }
        //     })
        //   }
        // })
        // payload.forEach(player => {
        //   if (player.now_bets) {
        //     state.listReadyToBetPlayers.push(player.now_bets)
        //   }
        // })

        // listReadyToBetPlayers
      },
      playersMatchSync(state, payload) {
        state.players[payload.index].match = payload.dataId
      }
    }
  })

export default store
