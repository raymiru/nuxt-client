<template>

  <v-app dark>
    <v-dialog v-model="playersDialog" max-width="250px" min-height="600px">
      <v-card>
        <v-flex>
          <v-card-title>Players List</v-card-title>
        </v-flex>
        <v-flex md6>
          <v-layout>
            <v-flex><v-card-text>PLAYER</v-card-text></v-flex>
            <v-flex><v-card-text>{{chatObj.player}}</v-card-text></v-flex>
          </v-layout>
        </v-flex>
        <div
          style="border-top: gray 2px groove"
          v-for="(data, index) in $store.state.players"
          :key="index">
          <v-layout
          >
            <v-flex md6>
              <v-card-text>{{data.username}}</v-card-text>
            </v-flex>
            <v-flex md6>
              <v-btn @click="chooseChatPlayer(data.username)">Choose</v-btn>
            </v-flex>

          </v-layout>
        </div>
      </v-card>
    </v-dialog>

    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :disable-resize-watcher=true
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon> {{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>


        <v-flex md12>
          <v-card>
            <v-toolbar>
              <v-layout>
                <v-flex md6>
                  <v-layout>
                    <v-flex md7>
                      <v-toolbar-title>Chat</v-toolbar-title>
                    </v-flex>
                    <v-flex md5>
                      <v-toolbar-title style="font-size: 15px; margin-top: 5px">{{chatObj.onlineCount}}
                      </v-toolbar-title>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex md6>
                  <v-btn-toggle v-model="chat">
                    <v-btn value="dota2">DOTA2</v-btn>
                    <v-btn value="csgo">CSGO</v-btn>
                  </v-btn-toggle>
                </v-flex>

              </v-layout>
            </v-toolbar>
            <v-card-text>
              <v-list v-if="chat === 'dota2'" ref="chat" style="height: 250px; overflow: auto;">
                <template v-for="(item, index) in chatObj.chatLogs.dota2">
                  <p v-if="item" :key="index">{{ item.username }}: {{item.text}}</p>
                </template>
              </v-list>
            </v-card-text>
            <v-card-actions>

              <v-layout>
                <v-flex md8>
                  <v-text-field label="Message" v-model="chatObj.msg"single-line solo-inverted></v-text-field>
                </v-flex>
                <v-flex style="margin-top: 5px; margin-left: 5px" md2>
                  <v-layout>
                    <v-btn fab small @click="playersDialog = !playersDialog">
                      <v-icon >fingerprint</v-icon>
                    </v-btn>
                    <v-btn fab small @click="sendMsg(chatObj.player, chatObj.msg)">
                      <v-icon >send</v-icon>
                    </v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>

            </v-card-actions>
          </v-card>
        </v-flex>


      </v-list>

    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon
          v-html="miniVariant ? 'chevron_right' : 'chevron_left'"
        ></v-icon>
      </v-btn>
      <v-toolbar-title>MATCHES:</v-toolbar-title>
      <v-btn-toggle style="margin-left: 1%" v-model="$store.state.matches.mode">
        <v-btn value="now" @click="setMatchMode('now')">NOW</v-btn>
        <v-btn value="next" @click="setMatchMode('next')">NEXT</v-btn>
      </v-btn-toggle>
      <v-toolbar-title style="margin-left: 3%">STATUS:</v-toolbar-title>
      <v-btn-toggle style="margin-left: 1%" v-model="$store.state.matches.status">
        <v-btn value="live" @click="setMatchStatus('live')">LIVE</v-btn>
        <v-btn value="all" @click="setMatchStatus('all')">ALL</v-btn>
      </v-btn-toggle>
      <v-spacer></v-spacer>
      <v-toolbar-title>PLAYERS:</v-toolbar-title>
      <v-btn value="sync" @click="playersSyncRequest">SYNC</v-btn>
      <v-btn value="rand_reload" @click="allPlayersToReady">NOW</v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title style="margin-left: 3%">WATCHER</v-toolbar-title>
        <v-btn value="dota2" @click="updateWatcher('dota2')">DOTA2</v-btn>
      <v-btn value="csgo" @click="updateWatcher('csgo')">CSGO</v-btn>



      <v-alert @click="playerConnectAlert = !playerConnectAlert" text-md-center style="width: 1000px"
               v-model="playerConnectAlert"
               type="success"
               transition="scale-transition"

      >{{playerConnectUsername}} подключился!
      </v-alert>
      <v-alert @click="playerDisconnectAlert = !playerDisconnectAlert" text-md-center style="width: 1000px"
               v-model="playerDisconnectAlert"
               type="error"
               transition="scale-transition"

      >{{playerDisconnectUsername}} отключился!
      </v-alert>
      <v-alert @click="playerBetErrorAlert = !playerBetErrorAlert" text-md-center style="width: 1000px"
               v-model="playerBetErrorAlert"
               type="error"
               transition="scale-transition"

      >{{playerBetErrorUsername}} : {{playerBetErrorMsg}}
      </v-alert>
      <v-alert @click="newMatchAdded = !newMatchAdded" text-md-center style="width: 1000px"
               v-model="newMatchAdded"
               type="info"
               transition="scale-transition"

      >Добавлен новый LIVE матч!
      </v-alert>
    </v-toolbar>
    <v-content>
      <v-container-fluid>
        <nuxt keep-alive></nuxt>
      </v-container-fluid>
    </v-content>


  </v-app>
</template>

<script>

  import sound from '@/assets/error.mp3'


  export default {
    name: 'default',
    matchIndex: 0,
    data() {
      return {
        newMatchAdded: false,
        playersDialog: false,
        chat: 'dota2',
        chatObj: {
          msg: null,
          player: null,
          chatLogs: [],
          onlineCount: 0
        },
        dataIdsArr: [],
        logs: [1, 2, 3, 4, 'dasdas', 'dasdasd', 'dasdqweqweqsdas dasdasdsada sdasdas das123123123 12123', 312312],
        playerConnectUsername: null,
        playerDisconnectUsername: null,
        playerBetErrorUsername: null,
        playerBetErrorMsg: null,
        playerBetErrorAlert: null,
        playerConnectAlert: false,
        playerDisconnectAlert: false,
        errorMessage: 'Матчи не найдены. Проверьте Manager и Watcher',
        matchesLoaded: false,

        drawer: true,
        fixed: true,
        items: [
          { icon: 'apps', title: 'DOTA2', to: '/dota2' },
          { icon: 'apps', title: 'CSGO', to: '/csgo' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/matches' },
          { icon: 'account_circle', title: 'Players', to: '/players' }
        ],
        miniVariant: false,
        title: 'RMBETS'
      }
    },

    methods: {
      playSound(sound) {
        console.log('ADUOO')
        let audio = new Audio(sound)

        audio.volume = 0.5
        audio.play()
      },

      playersSyncRequest() {
        console.log('players sync request')
        this.$socket.emit('players_sync_request')
      },


      updateWatcher(game) {
        console.log(game)
        this.$socket.emit('update_watcher', game)
      },


      chooseChatPlayer(player) {
        this.chatObj.player = player
        this.playersDialog = !this.playersDialog
      },


      sendMsg (username, msg) {
        console.log({
          username,
          msg
        })
        this.$socket.emit('chat_msg', {
          username,
          msg
        })
      },

      setMatchMode: function(mode) {
        this.$store.commit('setMatchMode', mode)
      },

      setMatchStatus: function(status) {
        this.$store.commit('setMatchStatus', status)
      },

      allPlayersToReady: function() {
        this.$socket.emit('all_players_to_ready');
      }

    },

    mounted(){
      window.addEventListener('keydown', e => {
        // console.log(e)
        // console.log(this.$store.state.matches.DOTA2.now.length)
      })

    },

    computed: {


    },
    sockets: {
      auth: function() {
        this.$store.commit('errorMessageThrow', 'Матчи не найдены. Проверьте Manager и Watcher')
      },

      import_chat_dota2(data) {
        console.log(data)
        this.chatObj.chatLogs.dota2 = data.msgArray
        this.chatObj.onlineCount = data.onlineCount
      },

      import_chat_csgo(data) {
        console.log(data)
        this.chatObj.chatLogs.csgo = data.msgArray
        this.chatObj.onlineCount = data.onlineCount
      },

      import_matches_dota2_now: function(data) {
        let tempDataIdsArr = []
          data.forEach(elem => {
            tempDataIdsArr.push(elem.STATUS)
          })
          console.log('TEMPARR')
          console.log(tempDataIdsArr)
          if (JSON.stringify(tempDataIdsArr) !== JSON.stringify(this.dataIdsArr)) {
            console.log('DATA IDS NOT EQUALS')
            this.dataIdsArr = []
            this.dataIdsArr = tempDataIdsArr

            setTimeout(() => {
              this.newMatchAdded = false
            }, 7000)
            this.$socket.emit('data_ids_change')
          }

        this.$store.commit('matchesSyncDOTA2Now', data)

      },

      dota2_live_status_update: function() {

        this.newMatchAdded = !this.newMatchAdded
        setTimeout(() => {
          this.newMatchAdded = false
        }, 7000)
      },

      import_matches_dota2_next: function(data) {
        console.log(data)
        this.$store.commit('matchesSyncDOTA2Next', data)

      },

      import_matches_csgo_now: function(data) {
        console.log(data)
        this.$store.commit('matchesSyncCSGONow', data)
      },

      import_matches_csgo_next: function(data) {
        console.log(data)
        this.$store.commit('matchesSyncCSGONext', data)
      },

      live_score_api: function(data) {
        if (data) this.$store.commit('steamApiDataSync', data)
      },

      players_sync: function(data) {
        console.log(data)
        if (data) this.$store.commit('playersSync', data)
      },

      connect: function() {
        this.$store.commit('errorMessageThrow', 'Loading')
        this.$socket.emit('auth', {
          type: 'admin',
          username: 'admin'
        })
      },

      disconnect: function() {
        console.log(this.$socket)
        let i = 0
        const timeoutID = setInterval(() => {
          i++
          console.log(i)
          if (i === 10) {
            this.$store.commit('matchesSync', [])
            this.$store.commit('errorMessageThrow', 'Соедениение с manager потеряно')
            clearInterval(timeoutID)
          }
          if (this.$socket.connected) clearInterval(timeoutID)
        }, 1000)
      },

      notification(data) {
        console.log(data)
        if (data.event === 'player_connect') {
          this.playerConnectUsername = data.username
          this.playerDisconnectAlert = false
          this.playerConnectAlert = true
          setTimeout(() => {
            this.playerConnectAlert = false
          }, 7000)
        } else if (data.event === 'player_disconnect') {

          this.playerDisconnectUsername = data.username
          this.playerConnectAlert = false
          this.playerDisconnectAlert = true
          setTimeout(() => {
            this.playerDisconnectAlert = false
          }, 7000)
        }
      },

      bet_error(data) {
        this.playerBetErrorUsername = data.username
        this.playerBetErrorMsg = data.msg
        this.playerBetErrorAlert = !this.playerBetErrorAlert
        this.playSound(sound)
        setTimeout(() => {
          this.playerBetErrorAlert = false
        }, 7000)
      }
    },

    created() {
      if (!this.$socket.connected) {
        this.$store.commit('errorMessageThrow', 'Нет подключения к manager')
      }
    }
  }
</script>
