import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// noinspection JSValidateTypes
const store = () =>
  new Vuex.Store({
    state: {
      matchesLoaded: false,
      matches: []
    },
    mutations: {
      matchesLoadedEvent(state) {
        state.matchesLoaded = true
      },
      matchesSync(state, payload) {
        state.matches = payload
      },
      oddsSync(state, payload) {
        console.log(payload)
        state.matches[payload.match].live_odds = payload.oddsObj
      }
    }
  })

export default store
