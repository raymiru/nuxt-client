import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initialState = () => {
  return {
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
  }
}


// noinspection JSValidateTypes
const store = () =>
  new Vuex.Store({
    state: initialState,
    mutations: {
      resetState(state) {
        state.matches.DOTA2.now = []
        state.matches.CSGO.now = []
        state.matches.DOTA2.next = []
        state.matches.CSGO.next = []
        state.players = []
        state.playersBets = {}
        state.steamApiData = []
      },


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
        state.matches.DOTA2.now = initialState().matches.DOTA2.now
        state.matches.DOTA2.now = payload
      },

      matchesSyncDOTA2Next(state, payload) {
        state.matches.DOTA2.next = initialState().matches.DOTA2.next
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
        state.playersBets = null
        state.playersBets = payload
      },

      playersSync(state, payload) {
        state.players = null
        state.players = payload
      },
      playersMatchSync(state, payload) {
        state.players[payload.index].match = payload.dataId
      }
    }
  })

export default store
