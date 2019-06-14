<template>
  <v-card>
    <v-container v-if="!reverse && !hide" :class="{ live: isLive }">
      <v-card>
        <v-layout text-md-center style="border: gray 2px groove">
          <v-flex style="border: gray 2px groove" md2>
            <v-layout column>
              <v-img :src="tournamentLogo"></v-img>
              <v-btn @click="reverse = !reverse"><v-icon>repeat</v-icon></v-btn>
              <v-btn @click="hide = !hide"><v-icon>minimize</v-icon></v-btn>
            </v-layout>
          </v-flex>
          <v-flex style="border: gray 2px groove" md2>
            <v-layout class="justify-space-between text-md-center">
              <v-flex md7>
                <v-layout column>
                  <v-flex>
                    <v-card-text>{{ teamA.NAME | substr }}</v-card-text>
                  </v-flex>
                  <v-flex class="pa-1">
                    <v-img :src="teamA.LOGO"></v-img>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex style="border: gray 2px groove;" md5>
                <v-layout column>
                  <v-flex style="background-color: darkslategray;">
                    <v-card-text>
                      <div style="font-size: 15px">
                        x{{ odds.team_A.odd / 100 }}
                      </div>
                      <div style="font-size: 10px">
                        {{ odds.team_A.max / 100 }}
                      </div>
                    </v-card-text>
                  </v-flex>
                  <v-flex>
                    <v-card-text>10</v-card-text>
                  </v-flex>
                  <v-flex>
                    <v-card-text>80</v-card-text>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md4>
            <v-slider> </v-slider>
          </v-flex>
          <v-flex md2>
            <v-layout>
              <v-flex style="border: gray 2px groove;" md5>
                <v-layout column>
                  <v-flex style="background-color: darkslategray;">
                    <v-card-text>
                      <div style="font-size: 15px">
                        x{{ odds.team_B.odd / 100 }}
                      </div>
                      <div style="font-size: 10px">
                        {{ odds.team_B.max / 100 }}
                      </div>
                    </v-card-text>
                  </v-flex>
                  <v-flex>
                    <v-layout class="dire"
                      ><v-flex md3
                        ><v-card-text
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="20"
                            height="20"
                            viewBox="0 0 172 172"
                            style=" fill:#000000;"
                          >
                            <g
                              fill="none"
                              fill-rule="nonzero"
                              stroke="none"
                              stroke-width="1"
                              stroke-linecap="butt"
                              stroke-linejoin="miter"
                              stroke-miterlimit="10"
                              stroke-dasharray=""
                              stroke-dashoffset="0"
                              font-family="none"
                              font-weight="none"
                              font-size="none"
                              text-anchor="none"
                              style="mix-blend-mode: normal"
                            >
                              <path d="M0,172v-172h172v172z" fill="none"></path>
                              <g fill="#ffffff">
                                <g id="surface1">
                                  <path
                                    d="M168.4525,0c-0.30906,0.01344 -0.65844,0.1075 -0.9675,0.215l-38.1625,12.685c-0.55094,0.18813 -1.11531,0.5375 -1.505,0.9675l-78.1525,85.6775l11.9325,8.385c0.98094,0.68531 1.86781,1.58563 2.58,2.58l8.2775,11.825l85.6775,-78.1525c0.43,-0.38969 0.77938,-0.95406 0.9675,-1.505l12.685,-38.1625c0.41656,-1.23625 0.17469,-2.62031 -0.7525,-3.5475c-0.68531,-0.68531 -1.63937,-1.00781 -2.58,-0.9675zM25.585,92.02c-0.76594,0.05375 -1.55875,0.30906 -2.15,0.86l-6.1275,5.6975c-0.68531,0.63156 -1.16906,1.54531 -1.1825,2.4725c-0.01344,0.94063 0.41656,1.81406 1.075,2.4725l51.2775,51.2775c0.645,0.645 1.45125,1.075 2.365,1.075c0.01344,0 0.09406,0 0.1075,0c0.92719,-0.01344 1.72,-0.41656 2.365,-1.075l5.805,-6.02c1.14219,-1.1825 1.26313,-3.06375 0.3225,-4.4075l-20.9625,-29.885c-0.22844,-0.3225 -0.5375,-0.63156 -0.86,-0.86l-29.885,-20.9625c-0.65844,-0.47031 -1.38406,-0.69875 -2.15,-0.645zM28.165,124.27l-13.4375,16.985c8.30438,1.16906 14.84844,7.71313 16.0175,16.0175l16.985,-13.4375zM12.04,147.92c-6.65156,0 -12.04,5.38844 -12.04,12.04c0,6.65156 5.38844,12.04 12.04,12.04c6.65156,0 12.04,-5.38844 12.04,-12.04c0,-6.65156 -5.38844,-12.04 -12.04,-12.04z"
                                  ></path>
                                </g>
                              </g>
                            </g></svg></v-card-text
                      ></v-flex>
                      <v-flex md9
                        ><v-card-text>35</v-card-text></v-flex
                      ></v-layout
                    >
                  </v-flex>
                  <v-flex>
                    <v-layout>
                      <v-flex md3
                        ><v-card-text
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="20"
                            height="20"
                            viewBox="0 0 172 172"
                            style=" fill:#000000;"
                          >
                            <g
                              fill="none"
                              fill-rule="nonzero"
                              stroke="none"
                              stroke-width="1"
                              stroke-linecap="butt"
                              stroke-linejoin="miter"
                              stroke-miterlimit="10"
                              stroke-dasharray=""
                              stroke-dashoffset="0"
                              font-family="none"
                              font-weight="none"
                              font-size="none"
                              text-anchor="none"
                              style="mix-blend-mode: normal"
                            >
                              <path d="M0,172v-172h172v172z" fill="none"></path>
                              <g fill="#ffffff">
                                <path
                                  d="M57.33333,17.2c-8.84564,0 -16.9336,2.08198 -23.22448,5.85651c-6.29088,3.77453 -11.17552,9.74507 -11.17552,17.07682c0,2.62056 0.64645,5.0552 1.73568,7.28984c-1.12645,1.09562 -1.7539,2.60553 -1.73568,4.17682v11.46667c0,2.6208 0.64648,5.05519 1.73568,7.28984c-1.12645,1.09562 -1.7539,2.60554 -1.73568,4.17683v11.46667c0,2.6208 0.64648,5.05519 1.73568,7.28984c-1.12645,1.09562 -1.7539,2.60554 -1.73568,4.17683v11.46667c0,2.6208 0.64648,5.05519 1.73568,7.28984c-1.12645,1.09562 -1.7539,2.60554 -1.73568,4.17683v11.46667c0,7.33243 4.8844,13.3025 11.17552,17.07683c6.29112,3.77432 14.38001,5.85651 23.22448,5.85651c8.84446,0 16.93337,-2.08219 23.22448,-5.85651c2.00298,-1.20168 3.83664,-2.64647 5.44219,-4.26641c1.60555,1.61994 3.43921,3.06473 5.44219,4.26641c6.29111,3.77432 14.38001,5.85651 23.22448,5.85651c8.84446,0 16.93337,-2.08219 23.22448,-5.85651c6.29112,-3.77432 11.17552,-9.7444 11.17552,-17.07683v-11.46667c0.0213,-1.57516 -0.60638,-3.08971 -1.73567,-4.18802c1.0864,-2.23215 1.73567,-4.66148 1.73567,-7.27864v-11.46667c0.0213,-1.57516 -0.60638,-3.08971 -1.73567,-4.18802c1.08643,-2.23213 1.73567,-4.66172 1.73567,-7.27864c0,-7.33175 -4.88464,-13.30229 -11.17552,-17.07683c-6.29088,-3.77453 -14.37884,-5.85651 -23.22448,-5.85651c-8.84564,0 -16.93359,2.08198 -23.22448,5.85651c-0.43643,0.26186 -0.79884,0.61312 -1.22058,0.89583c0.93606,-2.09026 1.51172,-4.33649 1.51172,-6.75234v-11.46667c0.0213,-1.57516 -0.60638,-3.08971 -1.73567,-4.18802c1.08643,-2.23213 1.73567,-4.66172 1.73567,-7.27865c0,-7.33175 -4.88464,-13.30229 -11.17552,-17.07682c-6.29088,-3.77453 -14.37884,-5.85651 -23.22448,-5.85651zM57.33333,28.66667c6.98653,0 13.23877,1.77097 17.32317,4.22161c4.08441,2.45065 5.61016,5.07751 5.61016,7.24505c0,2.16755 -1.52575,4.79441 -5.61016,7.24505c-4.08441,2.45065 -10.33665,4.22161 -17.32317,4.22161c-6.98652,0 -13.23877,-1.77097 -17.32318,-4.22161c-4.08441,-2.45065 -5.61016,-5.07751 -5.61016,-7.24505c0,-2.16755 1.52575,-4.79441 5.61016,-7.24505c4.08441,-2.45065 10.33665,-4.22161 17.32318,-4.22161zM34.4,57.35573c6.25093,3.67165 14.21558,5.71094 22.93333,5.71094c8.71776,0 16.6824,-2.03929 22.93333,-5.71094v5.71094c0,2.1677 -1.52537,4.79441 -5.61016,7.24505c-4.08478,2.45064 -10.33791,4.22161 -17.32317,4.22161c-6.98527,0 -13.23839,-1.77097 -17.32318,-4.22161c-4.08478,-2.45064 -5.61016,-5.07735 -5.61016,-7.24505zM114.66667,74.53333c6.98653,0 13.23877,1.77097 17.32317,4.22161c4.08441,2.45064 5.61016,5.07751 5.61016,7.24505c0,2.16754 -1.52575,4.79441 -5.61016,7.24505c-4.08441,2.45064 -10.33665,4.22161 -17.32317,4.22161c-6.98653,0 -13.23877,-1.77097 -17.32317,-4.22161c-4.08441,-2.45064 -5.61016,-5.07751 -5.61016,-7.24505c0,-2.16754 1.52575,-4.79441 5.61016,-7.24505c4.08441,-2.45064 10.33665,-4.22161 17.32317,-4.22161zM34.4,80.28906c6.25118,3.67145 14.21673,5.71094 22.93333,5.71094c8.7166,0 16.68216,-2.03948 22.93333,-5.71094v5.71094c0,2.1677 -1.52537,4.79441 -5.61016,7.24505c-4.08478,2.45064 -10.33791,4.22161 -17.32317,4.22161c-6.98527,0 -13.23839,-1.77097 -17.32318,-4.22161c-4.08478,-2.45064 -5.61016,-5.07735 -5.61016,-7.24505zM34.4,103.22239c6.25118,3.67145 14.21673,5.71094 22.93333,5.71094c8.7166,0 16.68216,-2.03948 22.93333,-5.71094v5.71094c0,2.1677 -1.52537,4.79441 -5.61016,7.24505c-4.08478,2.45064 -10.33791,4.22161 -17.32317,4.22161c-6.98527,0 -13.23839,-1.77097 -17.32318,-4.22161c-4.08478,-2.45064 -5.61016,-5.07735 -5.61016,-7.24505zM91.73333,103.22239c6.25093,3.67165 14.21558,5.71094 22.93333,5.71094c8.71776,0 16.6824,-2.03929 22.93333,-5.71094v5.71094c0,2.1677 -1.52537,4.79441 -5.61016,7.24505c-4.08478,2.45064 -10.33791,4.22161 -17.32317,4.22161c-6.98527,0 -13.23839,-1.77097 -17.32317,-4.22161c-4.08479,-2.45064 -5.61016,-5.07735 -5.61016,-7.24505zM34.4,126.15573c6.25118,3.67145 14.21673,5.71094 22.93333,5.71094c8.7166,0 16.68216,-2.03948 22.93333,-5.71094v5.71094c0,2.1677 -1.52537,4.79441 -5.61016,7.24505c-4.08478,2.45064 -10.33791,4.22161 -17.32317,4.22161c-6.98527,0 -13.23839,-1.77097 -17.32318,-4.22161c-4.08478,-2.45064 -5.61016,-5.07735 -5.61016,-7.24505zM91.73333,126.15573c6.25117,3.67145 14.21673,5.71094 22.93333,5.71094c8.7166,0 16.68216,-2.03948 22.93333,-5.71094v5.71094c0,2.1677 -1.52537,4.79441 -5.61016,7.24505c-4.08478,2.45064 -10.33791,4.22161 -17.32317,4.22161c-6.98527,0 -13.23839,-1.77097 -17.32317,-4.22161c-4.08479,-2.45064 -5.61016,-5.07735 -5.61016,-7.24505z"
                                ></path>
                              </g>
                            </g></svg></v-card-text
                      ></v-flex>
                      <v-flex md9><v-card-text>14523</v-card-text></v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex style="border: gray 2px groove" md7>
                <v-layout column>
                  <v-flex>
                    <v-card-text>{{ teamB.NAME | substr }}</v-card-text>
                  </v-flex>
                  <v-flex class="pa-1">
                    <v-img :src="teamB.LOGO"></v-img>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md2>
            <v-card-text>Additional Buttons</v-card-text>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <v-container v-if="reverse">
      <v-btn @click="reverse = !reverse"><v-icon>repeat</v-icon></v-btn>
    </v-container>
    <v-container
      v-if="hide"
      :class="{ live: isLive }"
      text-md-center
      justify-center
    >
      <v-card>
        <v-layout align-center style="border: gray 2px groove">
          <v-flex md2><v-img :src="tournamentLogo"></v-img></v-flex>
          <v-flex md1
            ><v-btn @click="hide = !hide"
              ><v-icon>reorder</v-icon></v-btn
            ></v-flex
          >
          <v-flex md1>
            <v-layout align-center>
              <v-flex md4>
                <v-img :src="teamA.LOGO"></v-img>
              </v-flex>
              <v-flex md8>
                <v-card-text>{{ teamA.NAME | substr }}</v-card-text>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex md1>
            <v-card-text>{{ teamB.NAME | substr }}</v-card-text>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'BetItem',
  filters: {
    substr: function(value) {
      if (!value) return
      value = value.substr(0, 14)
      return value
    }
  },
  props: {
    title: { type: String, default: 'string' },
    dataId: String,
    tournamentLogo: String,
    status: String,
    teamA: Object,
    teamB: Object
  },
  data() {
    return {
      odds: {
        locked: Number,
        team_A: {
          odd: 0,
          max: 1000
        },
        team_B: {
          odd: 0,
          max: 1000
        }
      },
      reverse: false,
      hide: true
    }
  },

  computed: {
    isLive: function() {
      return this.status === 'live'
    }
  },

  sockets: {
    updatematch_dota: function(data) {
      console.log(data)
    }
  },

  created() {
    this.$socket.on(`${this.dataId}`, data => {
      const json = JSON.parse(data)
      if (json.m_koef_live_a) {
        this.odds.team_A.odd = json.m_koef_live_a
      }
      if (json.m_koef_live_b) {
        this.odds.team_B.odd = json.m_koef_live_b
      }
      if (json.locked) {
        this.odds.locked = json.locked
      }
      if (json.live_restriction_RUB) {
        this.odds.team_A.max = json.live_restriction_RUB[0]
        this.odds.team_B.max = json.live_restriction_RUB[1]
      }
    })
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 14px;
  border: gray 1px groove;
}

.live {
  background-color: #2c8034;
}

.dire {
  background-color: brown;
}
</style>
