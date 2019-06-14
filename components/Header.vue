<template>
  <v-toolbar dark>
    <v-toolbar-title class="white--text" to="/">
      <v-list-tile to="/">D2BETS</v-list-tile>
    </v-toolbar-title>
    <v-list-tile icon to="/matches" nuxt>
      MATCHES
    </v-list-tile>

    <v-spacer></v-spacer>

    <v-spacer></v-spacer>
    <v-list-tile icon to="/players">
      ACCOUNTS
    </v-list-tile>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {}
  }
}
</script>
