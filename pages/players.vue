<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-flex>
    <v-layout>
      <v-flex>
        <v-btn @click="all">all</v-btn>
        <v-btn @click="admin">admin</v-btn>
        <v-btn @click="watcher">watcher</v-btn>
        <v-btn @click="players">players</v-btn>
        <v-btn @click="playersArray">pl-Array</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-data-table :headers="headers" :items="$store.state.players">
          <template v-slot:items="props">
            <td>{{props.item.username}}</td>
            <td>{{props.item.info.ip}}</td>
            <td>{{props.item.info.screen.width}} x {{props.item.info.screen.height}}</td>
            <td>{{props.item.info.core}} / {{props.item.info.ram}}</td>
            <td>{{props.item.info.os}} / {{props.item.info.browser}}</td>
            <td></td>
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
      headers: [{ text: 'USER'}, { text: 'IP' }, { text: 'SCREEN'}, { text: 'CORE/RAM' }, { text: 'OS/BROWSER'}, { text: 'BANK' }, { text: 'MATCH' }, { text: 'LOCATION'}]
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped></style>
