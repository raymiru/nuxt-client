<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
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
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon
          v-html="miniVariant ? 'chevron_right' : 'chevron_left'"
        ></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container-fluid>
        <nuxt keep-alive />
      </v-container-fluid>
    </v-content>
    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed>
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: 'Матчи не найдены. Проверьте Manager и Watcher',
      matchesLoaded: false,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/matches' },
        { icon: 'account_circle', title: 'Players', to: '/players' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'RMBETS'
    }
  },
  sockets: {
    auth: function() {},

    import_matches: function(data) {
      console.log(data)
      this.$store.commit('matchesSync', data)
      this.$store.commit('errorMessageThrow', 'Матчи не найдены. Проверьте Manager и Watcher')
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
        username: null
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
