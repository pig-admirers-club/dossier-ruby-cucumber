import Vue from 'vue'
import Vuex from 'vuex'
import reports from './modules/reports'
import app from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    reports,
    app
  }
})