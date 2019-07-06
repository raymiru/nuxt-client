<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :disable-resize-watcher = true
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
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon
          v-html="miniVariant ? 'chevron_right' : 'chevron_left'"
        ></v-icon>
      </v-btn>
      <v-btn-toggle v-model="$store.state.matches.mode">
        <v-btn value="now" @click="setMatchMode('now')">NOW</v-btn>
        <v-btn value="next" @click="setMatchMode('next')">NEXT</v-btn>
      </v-btn-toggle>

      <v-btn-toggle style="margin-left: 3%" v-model="$store.state.matches.status">
        <v-btn value="live" @click="setMatchStatus('live')">LIVE</v-btn>
        <v-btn value="all" @click="setMatchStatus('all')">ALL</v-btn>
      </v-btn-toggle>


      <v-toolbar-title v-text="title"></v-toolbar-title>

    </v-toolbar>
    <v-content>
      <v-container-fluid>
        <nuxt keep-alive></nuxt>
      </v-container-fluid>
    </v-content>

  </v-app>
</template>

<script>
export default {
  name: 'default',
  data() {
    return {
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
    setMatchMode: function(mode) {
      this.$store.commit('setMatchMode', mode)
    },

    setMatchStatus: function(status) {
      this.$store.commit('setMatchStatus', status)
    }

  },
  sockets: {
    auth: function() {
      this.$store.commit('errorMessageThrow', 'Матчи не найдены. Проверьте Manager и Watcher')
    },

    import_matches_dota2_now: function(data) {
      console.log(data)
      this.$store.commit('matchesSyncDOTA2Now', data)

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
    }
  },

  created() {
    if (!this.$socket.connected) {
      this.$store.commit('errorMessageThrow', 'Нет подключения к manager')
    }
  }
}
</script>
