<template>
  <v-container>
    <div id="twitch-embed"></div>
  </v-container>
</template>

<script>
  import {Dota2Map} from '../components/Dota2Map'

export default {
  name: 'Matches',
  data() {
    return {
      dota2Map: null,
      steam: []
    }
  },
  sockets: {
    steamApi: function(data) {
      this.steam = data
    }
  },
  mounted() {
    const twitch = new Twitch.Embed("twitch-embed", {
      width: 854,
      height: 480,
      channel: "alohadancetv"
    });
  }

}
</script>

<style scoped></style>
