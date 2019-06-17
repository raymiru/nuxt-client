<template>
  <v-container>
    <div class="aside_block map_wrap">
      <canvas id="map" width="220" height="220"></canvas>
    </div>
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
    const canvasElement = document.getElementById(`map`);

    this.dota2Map = new Dota2Map(canvasElement)
    this.dota2Map.changeState({
      "team1": {
        "top":"11111",
        "mid":"11111",
        "bot":"11111",
        "t4":"11"
      },
      "team2": {
        "top":"11111",
        "mid":"11111",
        "bot":"11111",
        "t4":"11"
      }
    })
  }
}
</script>

<style scoped></style>
