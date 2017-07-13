// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import MuseUI from 'muse-ui'
import store from './stores'
import './lib/vueFilters'

window._states = store.state

Vue.config.productionTip = false
Vue.use(MuseUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
