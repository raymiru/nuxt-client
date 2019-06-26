import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// noinspection JSValidateTypes
const store = () =>
  new Vuex.Store({
    state: {
      errorMessage: '',
      matches: [],
      steamApiData: [],
      players: []
    },
    mutations: {
      errorMessageThrow(state, payload) {
        state.errorMessage = payload
      },

      matchesSync(state, payload) {
        state.matches = payload
      },
      steamApiDataSync(state, payload) {
        state.steamApiData = payload
      },
      playersSync(state, payload) {
        state.players = payload
      }
    }
  })

export default store
