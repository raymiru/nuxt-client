<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-flex>
    <v-layout>
      <v-flex>
        <v-btn @click="all">all</v-btn>
        <v-btn @click="admin">admin</v-btn>
        <v-btn @click="watcher">watcher</v-btn>
        <v-btn @click="players">players</v-btn>
        <v-btn @click="playersArray">pl-Array</v-btn>

        <v-btn @click="testBet">TestBet</v-btn>
        <v-btn @click="testMove">TestMove</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-data-table :headers="headers" :items="$store.state.players" >
          <template class="playerItem" v-slot:items="props">
            <td>{{props.item.username}}</td>
            <td>{{props.item.info.ip}}</td>
            <td>{{props.item.info.screen.width}} x {{props.item.info.screen.height}}</td>
            <td>{{props.item.info.os}} / {{props.item.info.browser}}</td>
            <td>{{props.item.info.location}}</td>
            <td>150</td>
            <td><v-btn @click="enterBetsPage">Open</v-btn></td>
            <td><v-btn-toggle v-model="props.item.status" ><v-btn @click="setStatus('ready', props.item.username)" value="ready">READY</v-btn><v-btn @click="setStatus('moving', props.item.username)" value="moving">MOVING</v-btn><v-btn @click="setStatus('2window', props.item.username)" value="2window">2WINDOW</v-btn></v-btn-toggle></td>

          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: 'Players',
  data() {
    return {
      headers: [{ text: 'USER'}, { text: 'IP' }, { text: 'SCREEN'}, { text: 'OS/BROWSER'},  { text: 'LOCATION'}, { text: 'BANK' }, {text: 'OPEN SITE'}, { text: 'MODE'} ]
    }
  },
  methods: {
    setStatus(status, username) {
      console.log('SET STATUS')
      this.$socket.emit('set_status', {
        status,
        username
      })
    },

    testMove() {
      this.$socket.emit('test_move')
    },

    testBet() {
      this.$socket.emit('test_bet');
    },

    all() {
      this.$socket.emit('all')
    },
    admin() {
      this.$socket.emit('admin')
    },
    watcher() {
      this.$socket.emit('watcher')
    },
    players() {
      this.$socket.emit('players')
    },
    playersArray() {
      this.$socket.emit('players-array')
    },
    enterBetsPage() {
      this.$socket.emit('enter-bets-site');
    }
  }
}
</script>

<style scoped>
  .playerItem {
    background-color: red!important;
  }
</style>
