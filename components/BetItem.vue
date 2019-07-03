<template>
  <v-card>
    <!--STEAM API DIALOG-->
    <v-dialog v-model="steamApiDialog" max-width="700px" min-height="600px">
      <v-card>
        <v-card-title>STEAM API DATA</v-card-title>
        <v-layout>
          <v-flex md1>
            <v-card-text>ID</v-card-text>
          </v-flex>
          <v-flex md4>
            <v-card-text>Radiant</v-card-text>
          </v-flex>
          <v-flex md4>
            <v-card-text>Dire</v-card-text>
          </v-flex>
          <v-flex md2>
            <v-card-text>Match ID</v-card-text>
          </v-flex>
          <v-flex md2>
            <v-card-text>Attach</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout
          style="border-top: gray 2px groove"
          v-for="(data, index) in $store.state.steamApiData"
          :key="data.match_id"
        >
          <v-flex md1>
            <v-card-text>{{ index + 1 }}</v-card-text>
          </v-flex>
          <v-flex md4>
            <v-card-text
            >{{ data.team_name_radiant || 'No Data' }}
            </v-card-text>
          </v-flex>
          <v-flex md4>
            <v-card-text>{{ data.team_name_dire || 'No Data' }}</v-card-text>
          </v-flex>
          <v-flex md2>
            <v-card-text>{{ data.match_id || 'No Data' }}</v-card-text>
          </v-flex>
          <v-flex md2>
            <v-btn @click="chooseSteamApiMatch(data.match_id)">Choose</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>

    <v-dialog v-model="playersDialog" max-width="700px" min-height="600px">
      <v-card>
        <v-card-title>Players List</v-card-title>
        <v-layout>
          <v-flex md5>
            <v-card-text>USER</v-card-text>
          </v-flex>
          <v-flex md5>
            <v-card-text>BANK</v-card-text>
          </v-flex>
          <v-flex md2>
            <v-card-text>Attach</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout
          style="border-top: gray 2px groove"
          v-for="(data, index) in $store.state.players"
          :key="data.match_id"
        >
          <v-flex md5>
            <v-card-text
            >{{ data.username|| 'No Data' }}
            </v-card-text>
          </v-flex>
          <v-flex md5>
            <v-card-text>{{ data.bank || 'No Data' }}</v-card-text>
          </v-flex>
          <v-flex md2>
            <v-btn @click="choosePlayer(dataId, index)">Choose</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
    <!--ПОЛНАЯ ВЕРСИЯ МАТЧА-->
    <v-container v-if="!reverse && !hide"
                 :class="{ live: isLive }">
      <v-card>
        <v-layout text-md-center style="border: gray 2px groove">
          <!--ЛОГО ТУРНИРА И КНОПКИ-->
          <v-flex md2>
            <v-img :src="tournamentLogo || 'NO DATA'"></v-img>
            <v-layout pa-1 align-center row justify-center>
              <v-btn @click="reverse = !reverse">
                <v-icon>repeat</v-icon>
              </v-btn>
              <v-btn @click="hide = !hide">
                <v-icon>minimize</v-icon>
              </v-btn>
            </v-layout>
            <v-layout row justify-center>
              <v-btn @click="steamApiDialog = !steamApiDialog">
                <v-icon>data_usage</v-icon>
              </v-btn>
              <v-btn @click="playersDialog = !playersDialog">
                <v-icon>fingerprint</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
          <!--КНОПКА ЛЕВОЙ КОМАНДЫ И КОЭФЦИЕНТЫ-->
          <v-flex md2 style="border: gray 2px groove">
            <v-layout class="justify-space-between text-md-center">
              <v-flex md6 v-bind:class="{active_team_card: bet.winSide === 1}">
                <v-layout column class="team_card"  @click="chooseWinner(1)">
                  <v-flex pa-2>
                    {{ teamA.NAME }}
                  </v-flex>
                  <v-flex class="pa-1">
                    <v-img :src="teamA.LOGO || 'NO DATA'"></v-img>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex style="border: gray 2px groove;" md6>
                <v-layout column>
                  <v-flex style="background-color: darkslategray;">
                    <v-card-text v-if="isLive">
                      <div class="odds">x{{ odds.live.team_A.odd / 100 }}</div>
                      <div class="max">
                        {{ odds.live.team_A.max / 100 }}
                      </div>
                    </v-card-text>
                    <v-card-text v-else>
                      <div class="odds">x{{ odds.soon.team_A.odd / 100 }}</div>
                      <div class="max">
                        {{ odds.soon.team_A.max }}
                      </div>
                    </v-card-text>
                  </v-flex>
                  <v-flex>
                    <v-card-text>100</v-card-text>
                  </v-flex>
                  <v-flex>
                    <v-card-text>46</v-card-text>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <!--ФУНКЦИОНАЛ СТАВОК-->
          <v-flex md3>
            <v-layout column>
              <v-flex class="pa-2">
                <v-layout>
                  <v-btn small fab @click="changeBetPower(0.05)">Min</v-btn>

                  <v-slider
                    v-model="bet.power"
                    :max="1"
                    :min="0.05"
                    :step="0.01"
                  >
                  </v-slider>
                  <v-btn small fab @click="changeBetPower(1)">Max</v-btn>
                </v-layout>
              </v-flex>
              <v-flex class="pa-1">
                {{ bet.power }}
              </v-flex>
              <v-flex>
                <v-btn @click="placeBet">
                  {{ bet.power }}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <!--КНОПКА ПРАВОЙ КОМАНДЫ И КОЭФИЦИЕНЫ-->
          <v-flex md2>
            <v-layout>
              <v-flex md6 style="border: gray 2px groove;" >
                <v-layout column>
                  <v-flex style="background-color: darkslategray;">
                    <v-card-text>
                      <div class="odds">x{{ odds.live.team_B.odd / 100 }}</div>
                      <div class="max">
                        {{ odds.live.team_B.max / 100 }}
                      </div>
                    </v-card-text>
                  </v-flex>
                  <v-flex>
                    <v-layout>
                      <v-flex>
                        <v-card-text>35</v-card-text>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex>
                    <v-layout>
                      <v-flex>
                        <v-card-text>14523</v-card-text>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex md6 style="border: gray 2px groove" v-bind:class="{active_team_card: bet.winSide === 2}">
                <v-layout column class="team_card" @click="chooseWinner(2)">
                  <v-flex pa-2>
                    {{ teamB.NAME }}
                  </v-flex>
                  <v-flex class="pa-1">
                    <v-img :src="teamB.LOGO || 'NO DATA'"></v-img>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <!--СТАТИСТИКА МАТЧА-->
          <v-flex @click="heroesIcons" :class="randomClass" md4>
            <v-layout v-if="matchIndex !== null" fill-height>
              <v-flex md1 style="margin-left: 10px" v-if="filteredPlayers">
                <v-layout
                  v-for="value in filteredPlayers.radiant_team"

                >
                  <v-flex class="hero_img"
                  >
                    <v-img :src="value.imgSrc || 'NO DATA'"></v-img
                    >
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex md5>
                <v-layout>
                  <v-flex
                    pa-2
                    class="score_title"
                    v-if="
                      $store.state.steamApiData[matchIndex].team_name_radiant
                    "
                    md6
                  >
                    <v-card-media
                    >{{
                      $store.state.steamApiData[matchIndex].team_name_radiant
                      }}
                    </v-card-media>
                  </v-flex>
                  <v-flex v-else md6>
                    <v-card-title>Radiant</v-card-title>
                  </v-flex>

                  <v-flex
                    pa-2
                    class="score_title"
                    v-if="$store.state.steamApiData[matchIndex].team_name_dire"
                    md6
                  >
                    <v-card-media
                    >{{
                      $store.state.steamApiData[matchIndex].team_name_dire
                      }}
                    </v-card-media>
                  </v-flex>
                  <v-flex v-else md6>
                    <v-card-title>Dire</v-card-title>
                  </v-flex>
                </v-layout>

                <v-layout pa-1>
                  <v-flex md6
                  >
                    <v-card-media style="color: greenyellow">{{
                      $store.state.steamApiData[matchIndex].game_time | gameTime
                      }}
                    </v-card-media>
                  </v-flex
                  >
                  <v-flex md6 v-if="this.radiant_win === true"
                  >
                    <v-card-media>Radiant Win</v-card-media>
                  </v-flex
                  >
                  <v-flex md6 v-else-if="this.radiant_win === false"
                  >
                    <v-card-media>Dire Win</v-card-media>
                  </v-flex
                  >
                  <v-flex md6 v-else>
                    <v-card-media>Live</v-card-media>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout pa-1>
                  <v-flex md5>
                    <v-card-media class="gold_lead"
                    >{{
                      $store.state.steamApiData[matchIndex].radiant_lead
                      | goldRadiantFilter
                      }}
                    </v-card-media>
                  </v-flex>
                  <v-flex md2>
                    <v-card-media>
                      <svg
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
                        </g>
                      </svg>
                    </v-card-media>
                  </v-flex>
                  <v-flex md5>
                    <v-card-media class="gold_lead"
                    >{{
                      $store.state.steamApiData[matchIndex].radiant_lead
                      | goldDireFilter
                      }}
                    </v-card-media>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout pa-1>
                  <v-flex class="text-md-right kills">
                    <v-card-media>{{
                      $store.state.steamApiData[matchIndex].radiant_score
                      }}
                    </v-card-media>
                  </v-flex>
                  <v-flex>
                    -
                  </v-flex>
                  <v-flex class="text-md-left kills">
                    <v-card-media>{{
                      $store.state.steamApiData[matchIndex].dire_score
                      }}
                    </v-card-media>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout pa-1>
                  <v-flex class="text-md-right kills_change">{{
                    this.team_radiant_kills_change
                    }}
                  </v-flex>
                  <v-flex
                  >
                    <svg
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
                      </g>
                    </svg
                    >
                  </v-flex>
                  <v-flex class="text-md-left kills_change">{{
                    this.team_dire_kills_change
                    }}
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex v-if="filteredPlayers" md1>
                <v-layout
                  v-for="value in filteredPlayers.dire_team"

                >
                  <v-flex class="hero_img"
                  >
                    <v-img :src="value.imgSrc || 'NO DATA'"></v-img
                    >
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex md5>
                <canvas
                  :id="this.randomClass"
                  width="170"
                  height="170"
                ></canvas>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <!--ПЕРЕВЕРНУТАЯ ПОЛНАЯ ВЕРСИЯ МАТЧА-->
    <v-container v-if="reverse">
      <v-btn @click="reverse = !reverse">
        <v-icon>repeat</v-icon>
      </v-btn>
    </v-container>
    <!--СВЕРНУТАЯ ВЕРСИЯ-->
    <v-container v-if="hide"
                 :class="{ live: isLive }"
                 text-md-center
                 justify-center
    >
      <v-card :class="this.randomClass">
        <v-layout align-center style="border: gray 2px groove">
          <v-flex md2>
            <v-img :src="tournamentLogo || 'NO DATA'"></v-img>
          </v-flex>
          <v-flex md1>
            <v-btn @click="hideAndMap">
              <v-icon>reorder</v-icon>
            </v-btn>
          </v-flex>
          <v-flex md1>
            <v-layout align-center>
              <v-flex md4>
                <v-img :src="teamA.LOGO || 'NO DATA'"></v-img>
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
  import sound from '@/assets/arpeggio.mp3'
  import sound2 from '@/assets/sound2.mp3'
  import sound3 from '@/assets/naruto_flute.mp3'
  import sound4 from '@/assets/in_the_end.mp3'
  import { Dota2Map } from './Dota2Map'


  export default {
    name: 'BetItem',

    filters: {
      to8num: function to8num(value) {
        // Аргументы: строка, система счисления
        return value.toString(8)
      },
      gameTime: function(value) {
        let sec_num = parseInt(value, 10) // don't forget the second param
        let hours = Math.floor(sec_num / 3600)
        let minutes = Math.floor((sec_num - hours * 3600) / 60)
        let seconds = sec_num - hours * 3600 - minutes * 60

        if (hours < 10) {
          hours = '0' + hours
        }
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        return hours + ':' + minutes + ':' + seconds
      },

      substr: function(value) {
        if (!value) return
        value = value.substr(0, 10)
        return value
      },
      goldRadiantFilter: function(value) {
        if (!value) return
        if (value > 0) return value
      },
      goldDireFilter: function(value) {
        if (!value) return
        if (value < 0) return value * -1
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
        randomClass: String,
        dota2Map: null,
        audio: null,
        steamApiDialog: false,
        playersDialog: false,
        steamApiMatch: 0,
        bet: {
          power: 0.1,
          winSide: false,
          playersInGame: {
            active: 0,
            inactive: 0
          }
        },
        filteredPlayers: [],
        deactivate_time: 0,
        buildingStateString: 0,
        buildingStateStringChange: 0,
        buildingState: {
          team1: {
            top: '00000',
            mid: '00001',
            bot: '11111',
            t4: '11'
          },
          team2: {
            top: '11111',
            mid: '11111',
            bot: '11111',
            t4: '11'
          }
        },
        testData: 0,
        radiant_win: null,
        team_radiant_kills: 0,
        team_dire_kills: 0,
        team_radiant_kills_change: 0,
        team_dire_kills_change: 0,
        radiant_lead: 0,
        score: {
          radiant_lead: 0,
          team_A: {
            name: 'Team A',
            kill: 0
          },
          team_B: {
            name: 'Team B',
            kill: 0
          }
        },
        odds: {
          locked: Number,
          live: {
            team_A: {
              odd: 0,
              max: 1000
            },
            team_B: {
              odd: 0,
              max: 1000
            }
          },
          soon: {
            team_A: {
              odd: 0,
              max: 'Free'
            },
            team_B: {
              odd: 0,
              max: 'Free'
            }
          }
        },
        reverse: false,
        hide: true
      }
    },

    computed: {
      isLive: function() {
        return this.status === 'live'
      },
      matchIndex: function() {
        let steamIndex = null
        this.$store.state.steamApiData.forEach((data, index) => {
          if (data.match_id === this.steamApiMatch) {
            steamIndex = index
          }
        })
        return steamIndex
      }
    },

    watch: {
      radiant_win: function() {
        this.someThing(sound4)
      },

      deactivate_time: function() {
        this.$socket.emit('check_winner', {
          data_id: this.dataId,
          match_id: this.steamApiMatch
        })
      },

      testData: function() {
        console.log('CHANGE testData')
      },
      // kills: function(val, oldVal) {
      //   console.log('change')
      //   console.log(val);
      //   console.log(oldVal)
      // },

      team_radiant_kills: function() {
        this.someThing(sound)
      },
      team_dire_kills: function() {
        this.someThing(sound)
      },

      buildingStateString: function() {
        this.someThing(sound2)
      }
    },

    created() {
      this.randomClass = this.$chance.string({ length: 10, pool: 'abcdeghreq' })
      console.log(this.randomClass)

      this.$store.subscribe((mutation, state) => {
        if (this.matchIndex !== null) {
          state.steamApiData.forEach((data, index) => {
            if (data.match_id === this.steamApiMatch) {
              if (
                this.team_radiant_kills === data.radiant_score &&
                this.team_dire_kills === data.dire_score
              ) {
                this.buildingStateStringChange =
                  data.building_state_string - this.buildingStateString
                this.buildingStateString = data.building_state_string
                this.radiant_lead = data.radiant_lead
                this.buildingState = data.building_state
                this.dota2Map.changeState(this.buildingState)
                this.deactivate_time = data.deactivate_time


              } else {
                this.buildingStateStringChange =
                  data.building_state_string - this.buildingStateString
                this.buildingStateString = data.building_state_string
                this.team_radiant_kills_change =
                  data.radiant_score - this.team_radiant_kills
                this.team_radiant_kills = data.radiant_score
                this.team_dire_kills_change =
                  data.dire_score - this.team_dire_kills
                this.team_dire_kills = data.dire_score
                this.radiant_lead = data.radiant_lead
                this.buildingState = data.building_state
                this.dota2Map.changeState(this.buildingState)
                this.deactivate_time = data.deactivate_time


              }
            }
          })
        }
      })

      this.$socket.on(`${this.dataId}`, data => {
        if (data.radiant_win !== undefined) {
          this.radiant_win = data.radiant_win
        } else {
          const json = JSON.parse(data)
          if (json.m_koef_live_a) {
            this.odds.live.team_A.odd = json.m_koef_live_a
          }
          if (json.m_koef_live_b) {
            this.odds.live.team_B.odd = json.m_koef_live_b
          }
          if (json.locked) {
            this.odds.locked = json.locked
          }
          if (json.live_restriction_RUB) {
            this.odds.live.team_A.max = json.live_restriction_RUB[0]
            this.odds.live.team_B.max = json.live_restriction_RUB[1]
          }

          if (json.m_koef_a) {
            this.odds.soon.team_A.odd = json.m_koef_a
          }
          if (json.m_koef_b) {
            this.odds.soon.team_B.odd = json.m_koef_b
          }
        }
      })
    },

    methods: {
      placeBet: function () {
        console.log(this.dataId)
        this.$socket.emit('place_bet', {
          dataId: this.dataId,
          winSide: this.bet.winSide
        })
      },

      choosePlayer: function(dataId, index) {
        this.$store.commit('playersMatchSync', {
          dataId,
          index
        })
        console.log(dataId)
        console.log(index)
      },

      heroesIcons: function() {
        console.log('HEROES')
        this.$axios.$post('https://www.rmbets.site/api/heroes', {
          match_id: this.steamApiMatch
        }).then(result => {
          this.filteredPlayers = result
        })
      },

      hideAndMap: function() {
        this.hide = !this.hide
        setTimeout(() => {
          const canvasElement = document.getElementById(
            this.randomClass
          )

          this.dota2Map = new Dota2Map(canvasElement)
          this.dota2Map.changeState(this.buildingState)
        }, 200)
      },

      func1: function() {
        this.testData = 15
      },

      playSound(sound) {
        let audio = new Audio(sound)

        audio.volume = 0.5
        audio.play()
      },

      dynamicClass(data) {
        console.log('DYNAMIC')
        return data
      },

      someThing(audio) {
        const className = this.randomClass

        try {
          this.playSound(audio)
          document.querySelector(`.${className}`).style.background = 'blue'
          setTimeout(() => {
            document.querySelector(`.${className}`).style.background = '#424242'
            setTimeout(() => {
              document.querySelector(`.${className}`).style.background = 'blue'
              setTimeout(() => {
                document.querySelector(`.${className}`).style.background =
                  '#424242'
                setTimeout(() => {
                  document.querySelector(`.${className}`).style.background =
                    'blue'
                  setTimeout(() => {
                    document.querySelector(`.${className}`).style.background =
                      '#424242'
                    setTimeout(() => {
                      document.querySelector(`.${className}`).style.background =
                        'blue'
                      setTimeout(() => {
                        document.querySelector(`.${className}`).style.background =
                          '#424242'
                        setTimeout(() => {
                          document.querySelector(
                            `.${className}`
                          ).style.background = 'blue'
                          setTimeout(() => {
                            document.querySelector(
                              `.${className}`
                            ).style.background = '#424242'
                          }, 500)
                        }, 500)
                      }, 500)
                    }, 500)
                  }, 500)
                }, 500)
              }, 500)
            }, 500)
          }, 500)
        } catch (e) {
          console.log(e)
        }
      },

      changeBetPower(power) {
        this.bet.power = power
      },
      chooseWinner(winner) {
        this.bet.winSide = winner
      },
      async chooseSteamApiMatch(data) {
        this.radiant_win = null
        this.steamApiMatch = data
        this.$socket.emit('check_winner', {
          data_id: this.dataId,
          match_id: this.steamApiMatch
        })
        setTimeout(() => {
          this.buildingState = this.$store.state.steamApiData[
            this.matchIndex
            ].building_state
        }, 100)

        setTimeout(() => {
          const canvasElement = document.getElementById(
            this.randomClass
          )

          this.dota2Map = new Dota2Map(canvasElement)
          this.dota2Map.changeState(this.buildingState)
        }, 200)

        this.playSound(sound4)
        this.heroesIcons()

      }
    },

    sockets: {
      updatematch_dota: function(data) {
        console.log(data)
      }
    }
  }
</script>

<style scoped>
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

  .odds {
    font-size: 15px;
  }

  .max {
    font-size: 11px;
  }

  .team_card {
    cursor: pointer;
  }
  .active_team_card {
    background-color: #d99b58;
    /* IE9, iOS 3.2+ */
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxsaW5lYXJHcmFkaWVudCBpZD0idnNnZyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiNjYTUyNTIiIHN0b3Atb3BhY2l0eT0iMSIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iI2U3ZTQ1ZSIgc3RvcC1vcGFjaXR5PSIxIiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50PjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjdnNnZykiIC8+PC9zdmc+);
    background-image: -webkit-gradient(linear, 0% 0%, 100% 100%, color-stop(0, rgb(202, 82, 82)), color-stop(1, rgb(231, 228, 94)));
    /* Android 2.3 */
    background-image: -webkit-repeating-linear-gradient(top left, rgb(202, 81, 82) -0.8%, rgb(231, 228, 94) 100%);
    /* IE10+ */
    background-image: repeating-linear-gradient(to bottom right, rgb(202, 81, 82) -0.8%, rgb(231, 228, 94) 100%);
    background-image: -ms-repeating-linear-gradient(top left, rgb(202, 81, 82) -0.8%, rgb(231, 228, 94) 100%);
  }

  .left_icon {
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 12px;
  }

  .center_kills {
    padding-top: 6px;
    padding-bottom: 6px;
    padding-right: 6px;
    color: orangered;
    background-color: whitesmoke;
  }

  .center_gold {
    padding-top: 6px;
    padding-bottom: 6px;
    padding-right: 6px;
    color: gold;
  }

  .right_kills {
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 6px;
    color: orangered;
    background-color: whitesmoke;
  }

  .right_gold {
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 6px;
    color: gold;
  }

  .left_razmen {
    padding-left: 40px;
  }

  .right_razmen {
    padding-right: 60px;
  }

  .kills_change {
    color: coral;
    font-size: 15px;
  }

  .gold_lead {
    font-size: 15px;
    color: gold;
  }

  .kills {
    font-size: 15px;
  }

  .score_title {
    font-size: 12px;
  }

  .hero_img {
    padding-top: 7px;
    padding-bottom: 7px;
  }
</style>
