<template>
  <v-container>
    <div>
      MATCH
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Matches',

  data() {
    return {
      steam: []
    }
  },
  sockets: {
    steamApi: function(data) {
      this.steam = data
    }
  }
}
</script>

<style scoped></style>
