import Vue from 'vue'
import Dota2Api from 'dota2-api'

const da = Dota2Api.create('4DA49E795D91371C6C5226728380F221', 570)

Vue.prototype.$da = da
