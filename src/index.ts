import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
//@ts-ignore
import Dossier from './components/dossier.vue'
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
window.DossierRubyCucumber = window.DossierRubyCucumber || function(meta) {
  
  Vue.config.devtools = true;

  store.commit('app/setMeta', meta);

  return new Vue({
    el: '#app',
    router,
    store,
    render: h => h(Dossier)
  })
}

