import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
//@ts-ignore
import Ace from './components/ace.vue'
//@ts-ignore
import Summary from './components/summary.vue'
//@ts-ignore
import Details from './components/details.vue'
import store from './store/index'

Vue.use(Vuex)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Summary }, 
  { path: '/:id', component: Details }
]

const router = new VueRouter({
  routes
})

//@ts-ignore
window.AceReports = window.AceReports || function(reportData) {
  
  Vue.config.devtools = true;
  
  if (!(reportData instanceof Array)) {
    reportData = [ reportData ]
  }

  store.commit('reports/set', reportData);

  return new Vue({
    el: '#app',
    router,
    store,
    render: h => h(Ace)
  })
}

