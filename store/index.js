import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// noinspection JSValidateTypes
const store = () =>
  new Vuex.Store({
    state: {
      matchesLoaded: false,
      matches: [],
      steamApiData: []
    },
    mutations: {
      matchesLoadedEvent(state) {
        state.matchesLoaded = true
      },
      matchesSync(state, payload) {
        state.matches = payload
      },
      steamApiDataSync(state, payload) {
        state.steamApiData = payload
      }
    }
  })

export default store
