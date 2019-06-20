import Vue from 'vue'
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io-extended'

export default ({ store }) => {
  Vue.use(
    VueSocketIO,
    io('https://rmbets.site', {
      transports: ['websocket']
    }),
    { store }
  )
}
