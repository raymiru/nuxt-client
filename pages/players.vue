<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform" >
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
    <v-layout >
      <v-flex>
        <v-data-table :headers="headers" :items="$store.state.players" >
          <template  class="playerItem" v-slot:items="props">
            <td class="td">{{props.item.username}}</td>
            <td class="td">{{props.item.auth_time}}</td>
            <td class="td">{{props.item.info.ip}}</td>
            <td class="td">{{props.item.info.screen.width}} x {{props.item.info.screen.height}}</td>
            <td class="td">{{props.item.info.os}} / {{props.item.info.browser}}</td>
            <td class="td">{{props.item.info.location}}</td>
            <td class="td">{{props.item.bank}}</td>
            <td class="td"><v-btn-toggle v-model="props.item.chat_status" ><v-btn fab @click="chatControl('standard', props.item.username)" value="standard">STD</v-btn><v-btn fab @click="chatControl('hide', props.item.username)" value="hide">HIDE</v-btn><v-btn  fab @click="chatControl('bottom', props.item.username)" value="bottom">BOT</v-btn></v-btn-toggle></td>

            <td class="td"><v-btn-toggle v-model="props.item.game"><v-btn fab value="dota2" @click="setGame('dota2', props.item.username)">DOTA2</v-btn><v-btn fab value="csgo" @click="setGame('csgo', props.item.username)">CSGO</v-btn></v-btn-toggle></td>
            <td class="td">{{props.item.status}}</td>
            <td class="td"><v-btn-toggle v-model="props.item.status" ><v-btn fab @click="setStatus('ready', props.item.username)" value="ready">READY</v-btn><v-btn fab @click="setStatus('moving', props.item.username)" value="moving">MOVE</v-btn><v-btn fab @click="setStatus('2window', props.item.username)" value="2window">2WIN</v-btn></v-btn-toggle></td>

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
      headers: [{ text: 'USER'}, {text: 'AUTH TIME'}, { text: 'IP' }, { text: 'SCREEN'}, { text: 'OS/BROWSER'},  { text: 'LOCATION'}, { text: 'BANK' }, {text: 'CHAT'}, {text: 'SET GAME'}, {text: 'STATUS'}, { text: 'SET STATUS'} ]
    }
  },
  methods: {
    chatControl(type, username) {
      console.log({
        type,
        username
      })
      this.$socket.emit('chat_control', {
        type,
        username
      })
    },


    setGame(game, username) {
      console.log('SET GAME')
      this.$socket.emit('set_game', {
        game,
        username
      })
    },

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
  .td {
    font-size: 13px;
  }

  .playerItem {
    background-color: red!important;
  }
</style>
